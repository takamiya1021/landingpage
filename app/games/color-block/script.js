function waitForThree() {
    return new Promise((resolve) => {
        if (typeof THREE !== 'undefined') {
            resolve();
        } else {
            const checkThree = setInterval(() => {
                if (typeof THREE !== 'undefined') {
                    clearInterval(checkThree);
                    resolve();
                }
            }, 50);
        }
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    // Three.jsの読み込み完了を待つ
    await waitForThree();
    console.log('Three.js loaded successfully');
    console.log('THREE version:', THREE.REVISION);
    
    // --- Constants ---
    const GRID_UNIT = 1;
    const BOARD_COLS = 6;
    const BOARD_ROWS = 6;
    const BLOCK_HEIGHT = 0.8;
    const BOARD_THICKNESS = 0.5;
    const WALL_THICKNESS = 0.2;

    const COLORS = {
        yellow: new THREE.MeshStandardMaterial({ color: 0xf7b934, roughness: 0.7, emissive: 0x000000 }),
        blue:   new THREE.MeshStandardMaterial({ color: 0x00aef2, roughness: 0.7, emissive: 0x000000 }),
        purple: new THREE.MeshStandardMaterial({ color: 0xa069ff, roughness: 0.7, emissive: 0x000000 }),
        green:  new THREE.MeshStandardMaterial({ color: 0x2f6e3b, roughness: 0.7, emissive: 0x000000 }),
        red:    new THREE.MeshStandardMaterial({ color: 0xbf414e, roughness: 0.7, emissive: 0x000000 }),
        orange: new THREE.MeshStandardMaterial({ color: 0xed8037, roughness: 0.7, emissive: 0x000000 }),
    };

    // --- Basic Setup ---
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
    renderer.shadowMap.enabled = true;
    renderer.setPixelRatio(window.devicePixelRatio);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    
    // Canvas size setup
    function updateCanvasSize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        console.log('Canvas resized to:', width, 'x', height);
    }

    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(BOARD_COLS / 2, 18, BOARD_ROWS / 2 + 7.5);
    camera.lookAt(BOARD_COLS / 2, 0, BOARD_ROWS / 2);
    
    // Initial canvas size
    updateCanvasSize();
    
    // Window resize handler will be added later to avoid duplication

    // --- Lighting ---
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
dirLight.position.set(8, 15, 10);
dirLight.castShadow = true;
dirLight.shadow.mapSize.width = 2048;
dirLight.shadow.mapSize.height = 2048;
scene.add(dirLight);

    // --- Game Objects & Logic ---
    const boardGroup = new THREE.Group();
    scene.add(boardGroup);

    let blocks = [];
    let blockMeshes = [];

    const level = {
        blocks: [
            { id: 1, x: 0, z: 0, width: 2, depth: 2, color: 'yellow' },
            { id: 2, x: 2, z: 0, width: 2, depth: 2, color: 'blue' },
            { id: 3, x: 4, z: 0, width: 1, depth: 3, color: 'purple' },
            { id: 4, x: 5, z: 0, width: 1, depth: 2, color: 'red' },
            { id: 5, x: 5, z: 2, width: 1, depth: 2, color: 'green' },
            { id: 6, x: 5, z: 4, width: 1, depth: 1, color: 'red' },
            { id: 7, x: 0, z: 5, width: 2, depth: 1, color: 'blue' },
            { id: 8, x: 0, z: 2, width: 1, depth: 3, color: 'purple' },
            { id: 9, x: 3, z: 5, width: 3, depth: 1, color: 'orange' },
            { id: 10, x: 1, z: 2, width: 3, depth: 1, color: 'yellow' },
        ],
        goals: [
            { side: 'top', start: 3, end: 6, color: 'yellow' },
            { side: 'right', start: 0, end: 3, color: 'purple' },
            { side: 'bottom', start: 0, end: 2, color: 'green' },
            { side: 'bottom', start: 2, end: 4, color: 'red' },
            { side: 'bottom', start: 4, end: 6, color: 'blue' },
            { side: 'left', start: 4, end: 5, color: 'orange' },
        ]
    };

    function createEdges(mesh) {
        const edges = new THREE.EdgesGeometry(mesh.geometry);
        const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.5 }));
        mesh.add(line);
    }

    function setupLevel() {
        console.log('Setting up level...');
        while(boardGroup.children.length > 0){
            const obj = boardGroup.children[0];
            boardGroup.remove(obj);
            if(obj.geometry) obj.geometry.dispose();
        }
        blocks = [];
        blockMeshes = [];
        document.getElementById('game-over-message').classList.add('hidden');

        const boardGeometry = new THREE.BoxGeometry(BOARD_COLS * GRID_UNIT, BOARD_THICKNESS, BOARD_ROWS * GRID_UNIT);
        const boardMaterial = new THREE.MeshStandardMaterial({ color: 0x6f81ab });
        const board = new THREE.Mesh(boardGeometry, boardMaterial);
        board.position.set(BOARD_COLS / 2, -BOARD_THICKNESS / 2, BOARD_ROWS / 2);
        board.receiveShadow = true;
        boardGroup.add(board);

        const gridHelper = new THREE.GridHelper(BOARD_COLS, BOARD_COLS, 0xffffff, 0xffffff);
        gridHelper.position.set(BOARD_COLS / 2, 0.01, BOARD_ROWS / 2);
        gridHelper.material.transparent = true;
        gridHelper.material.opacity = 0.2;
        boardGroup.add(gridHelper);

        const wallMaterial = new THREE.MeshStandardMaterial({ color: 0x465173 });
        const sides = { top: BOARD_COLS, bottom: BOARD_COLS, left: BOARD_ROWS, right: BOARD_ROWS };

        for (const side in sides) {
            const length = sides[side];
            const sideGoals = level.goals.filter(g => g.side === side).sort((a, b) => a.start - b.start);
            let currentPos = 0;

            sideGoals.forEach(goal => {
                if (goal.start > currentPos) {
                    createWallSegment(side, currentPos, goal.start, wallMaterial);
                }
                createWallSegment(side, goal.start, goal.end, COLORS[goal.color]);
                currentPos = goal.end;
            });

            if (currentPos < length) {
                createWallSegment(side, currentPos, length, wallMaterial);
            }
        }

        level.blocks.forEach((blockData, index) => {
            const block = { ...blockData };
            const geometry = new THREE.BoxGeometry(block.width * GRID_UNIT, BLOCK_HEIGHT, block.depth * GRID_UNIT);
            const mesh = new THREE.Mesh(geometry, COLORS[block.color].clone());
            mesh.castShadow = false;
            mesh.position.set(
                block.x + block.width / 2,
                BLOCK_HEIGHT / 2,
                block.z + block.depth / 2
            );
            mesh.userData.block = block;
            block.mesh = mesh;
            blocks.push(block);
            blockMeshes.push(mesh);
            boardGroup.add(mesh);
            createEdges(mesh);
            console.log(`Block ${index} created:`, block.color, 'at position:', mesh.position, 'in scene:', mesh.parent !== null);
        });
        console.log('Level setup complete. Block meshes:', blockMeshes.length);
        console.log('Board group children:', boardGroup.children.length);
        console.log('Scene children:', scene.children.length);
    }

    

    function createArrowIcon() {
        const shape = new THREE.Shape();
        const s = 0.1; // Triangle size
        shape.moveTo(0, s);
        shape.lineTo(s, -s);
        shape.lineTo(-s, -s);
        shape.closePath();

        const geometry = new THREE.ShapeGeometry(shape);
        const material = new THREE.MeshBasicMaterial({ color: 0xffffff, depthTest: false });
        const arrowMesh = new THREE.Mesh(geometry, material);
        arrowMesh.renderOrder = 1; // Ensure it renders on top
        return arrowMesh;
    }

    function createWallSegment(side, start, end, material) {
        const length = end - start;
        const center = (start + end) / 2;
        const wallHeight = BLOCK_HEIGHT + BOARD_THICKNESS;
        let segment;

        if (side === 'top' || side === 'bottom') {
            segment = new THREE.Mesh(new THREE.BoxGeometry(length + (start === 0 || end === BOARD_COLS ? WALL_THICKNESS : 0), wallHeight, WALL_THICKNESS), material);
            segment.position.x = center + (start === 0 ? -WALL_THICKNESS / 2 : (end === BOARD_COLS ? WALL_THICKNESS / 2 : 0));
            segment.position.z = (side === 'top' ? -WALL_THICKNESS / 2 : BOARD_ROWS + WALL_THICKNESS / 2);
        } else { // left or right
            segment = new THREE.Mesh(new THREE.BoxGeometry(WALL_THICKNESS, wallHeight, length), material);
            segment.position.x = (side === 'left' ? -WALL_THICKNESS / 2 : BOARD_COLS + WALL_THICKNESS / 2);
            segment.position.z = center;
        }
        segment.position.y = (BLOCK_HEIGHT - BOARD_THICKNESS) / 2;
        boardGroup.add(segment);
        createEdges(segment);

        // If this is a goal, add an arrow
        if (material.color.getHexString() !== '465173') { // Check against the hex color of wallMaterial
            const arrow = createArrowIcon();
            arrow.rotation.x = -Math.PI / 2; // Lay flat

            switch (side) {
                case 'top':
                    arrow.position.set(0, wallHeight / 2 + 0.01, 0);
                    // No z-rotation needed
                    break;
                case 'bottom':
                    arrow.position.set(0, wallHeight / 2 + 0.01, 0);
                    arrow.rotation.z = Math.PI;
                    break;
                case 'left':
                    arrow.position.set(0, wallHeight / 2 + 0.01, 0);
                    arrow.rotation.z = Math.PI / 2;
                    break;
                case 'right':
                    arrow.position.set(0, wallHeight / 2 + 0.01, 0);
                    arrow.rotation.z = -Math.PI / 2;
                    break;
            }
            segment.add(arrow);
        }
    }

    function createParticles(position, color) {
        const particleCount = 20;
        const particleMaterial = COLORS[color].clone();
        const particleGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);

        for (let i = 0; i < particleCount; i++) {
            const particle = new THREE.Mesh(particleGeometry, particleMaterial);
            particle.position.copy(position);
            const velocity = new THREE.Vector3(
                (Math.random() - 0.5) * 4,
                (Math.random() - 0.5) * 4,
                (Math.random() - 0.5) * 4
            );
            scene.add(particle);

            let life = 0;
            const maxLife = 1 + Math.random();
            function updateParticle() {
                if (life >= maxLife) {
                    scene.remove(particle);
                    particle.geometry.dispose();
                    return;
                }
                particle.position.add(velocity.clone().multiplyScalar(0.02));
                particle.rotation.x += 0.1;
                particle.rotation.y += 0.1;
                life += 0.02;
                requestAnimationFrame(updateParticle);
            }
            updateParticle();
        }
    }

    // --- Interaction --- 
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let selectedBlock = null;
    let selectionOutline = null;
    const dragPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const dragOffset = new THREE.Vector3();

    function onPointerDown(event) {
        try {
            event.preventDefault();
            
            // Safety check
            if (!canvas || !camera || !raycaster) {
                console.error('Required objects not initialized:', {canvas, camera, raycaster});
                return;
            }
            
            const rect = canvas.getBoundingClientRect();
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

            console.log('=== Pointer Down Event ===');
            console.log('Mouse coordinates:', { x: mouse.x, y: mouse.y });
            console.log('Canvas rect:', rect);
            console.log('Event coordinates:', { clientX: event.clientX, clientY: event.clientY });
            console.log('Block meshes available:', blockMeshes.length);
        
        raycaster.setFromCamera(mouse, camera);
        // Don't check children (true -> false) to avoid edge lines
        const intersects = raycaster.intersectObjects(blockMeshes, false);
        console.log('Raycaster results - blockMeshes:', blockMeshes.length, 'intersects:', intersects.length);
        
        // Filter for objects with valid block data
        const validIntersects = intersects.filter(intersect => 
            intersect.object.userData && intersect.object.userData.block
        );
        
        console.log('Valid block intersects:', validIntersects.length);
        if (validIntersects.length > 0) {
            console.log('First valid intersection:', validIntersects[0].object.userData.block);
        }

        if (validIntersects.length > 0) {
            selectedBlock = validIntersects[0].object;
            if (selectedBlock.material.emissive) {
                selectedBlock.material.emissive.setHex(0x555555);
            } else {
                selectedBlock.material.emissive = new THREE.Color(0x555555);
            }

            const edges = new THREE.EdgesGeometry(selectedBlock.geometry);
            selectionOutline = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 4, polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1 }));
            selectedBlock.add(selectionOutline);

            dragPlane.constant = -selectedBlock.position.y;
            raycaster.ray.intersectPlane(dragPlane, dragOffset);
            dragOffset.sub(selectedBlock.position);
        }
        } catch (error) {
            console.error('Error in onPointerDown:', error);
            console.error('Error stack:', error.stack);
        }
    }

    function onPointerMove(event) {
        if (!selectedBlock) return;
        
        try {
            event.preventDefault();
            const rect = canvas.getBoundingClientRect();
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);

            const intersectPoint = new THREE.Vector3();
            raycaster.ray.intersectPlane(dragPlane, intersectPoint);

            const newPosition = intersectPoint.sub(dragOffset);
            const blockData = selectedBlock.userData.block;
            
            if (!blockData) {
                console.error('Block data not found on selected block');
                selectedBlock = null;
                return;
            }
        const startPosition = new THREE.Vector3(
            blockData.x + blockData.width / 2,
            BLOCK_HEIGHT / 2,
            blockData.z + blockData.depth / 2
        );

        const delta = newPosition.clone().sub(startPosition);

        // Clamp movement to be either horizontal or vertical
        if (Math.abs(delta.x) > Math.abs(delta.z)) {
            newPosition.z = startPosition.z;
        } else {
            newPosition.x = startPosition.x;
        }

        const proposedPos = newPosition.clone();

        // Check for collisions along the path
        const checkSteps = 5;
        let validPosition = selectedBlock.position.clone();
        const moveVector = proposedPos.clone().sub(validPosition);

        for (let i = 1; i <= checkSteps; i++) {
            const intermediatePos = validPosition.clone().add(moveVector.clone().multiplyScalar(i / checkSteps));
            if (!checkCollision(selectedBlock, intermediatePos)) {
                 selectedBlock.position.copy(intermediatePos);
            } else {
                break; 
            }
        }
        } catch (error) {
            console.error('Error in onPointerMove:', error);
            selectedBlock = null;
        }
    }

    function checkCollision(movedBlock, newPosition) {
        const movedBlockData = movedBlock.userData.block;
        const collisionMargin = 0.1; // Make collision box slightly smaller

        const movedBox = new THREE.Box2(
            new THREE.Vector2(
                newPosition.x - movedBlockData.width / 2 + collisionMargin,
                newPosition.z - movedBlockData.depth / 2 + collisionMargin
            ),
            new THREE.Vector2(
                newPosition.x + movedBlockData.width / 2 - collisionMargin,
                newPosition.z + movedBlockData.depth / 2 - collisionMargin
            )
        );

        // Wall collision
        const canExit = level.goals.some(g => {
            if (g.color !== movedBlockData.color) return false;
            const blockExitPos = {
                x: newPosition.x - movedBlockData.width / 2,
                z: newPosition.z - movedBlockData.depth / 2
            };
            if (g.side === 'top' && movedBox.min.y < 0) return blockExitPos.x >= g.start && (blockExitPos.x + movedBlockData.width) <= g.end;
            if (g.side === 'bottom' && movedBox.max.y > BOARD_ROWS) return blockExitPos.x >= g.start && (blockExitPos.x + movedBlockData.width) <= g.end;
            if (g.side === 'left' && movedBox.min.x < 0) return blockExitPos.z >= g.start && (blockExitPos.z + movedBlockData.depth) <= g.end;
            if (g.side === 'right' && movedBox.max.x > BOARD_COLS) return blockExitPos.z >= g.start && (blockExitPos.z + movedBlockData.depth) <= g.end;
            return false;
        });

        if (!canExit) {
            if (movedBox.min.x < 0 || movedBox.max.x > BOARD_COLS || movedBox.min.y < 0 || movedBox.max.y > BOARD_ROWS) {
                return true;
            }
        }


        // Other block collision
        for (const otherBlock of blocks) {
            if (otherBlock.id === movedBlockData.id) continue;

            const otherBox = new THREE.Box2(
                new THREE.Vector2(
                    otherBlock.x + collisionMargin,
                    otherBlock.z + collisionMargin
                ),
                new THREE.Vector2(
                    otherBlock.x + otherBlock.width - collisionMargin,
                    otherBlock.z + otherBlock.depth - collisionMargin
                )
            );

            if (movedBox.intersectsBox(otherBox)) {
                return true;
            }
        }

        return false;
    }

    function onPointerUp(event) {
        if (!selectedBlock) return;

        try {
            if (selectionOutline) {
                selectedBlock.remove(selectionOutline);
                selectionOutline.geometry.dispose();
                selectionOutline.material.dispose();
                selectionOutline = null;
            }

            if (selectedBlock.material.emissive) {
                selectedBlock.material.emissive.setHex(0x000000);
            }
            
            const blockData = selectedBlock.userData.block;
            if (!blockData) {
                console.error('Block data not found on selected block in onPointerUp');
                selectedBlock = null;
                return;
            }
        const startGridX = blockData.x;
        const startGridZ = blockData.z;

        const endGridX = Math.round(selectedBlock.position.x - blockData.width / 2);
        const endGridZ = Math.round(selectedBlock.position.z - blockData.depth / 2);

        let targetX = startGridX;
        let targetZ = startGridZ;

        if (Math.abs(endGridX - startGridX) > Math.abs(endGridZ - startGridZ)) {
            targetX = endGridX;
        } else {
            targetZ = endGridZ;
        }

        const stepX = Math.sign(targetX - startGridX);
        const stepZ = Math.sign(targetZ - startGridZ);

        let finalX = startGridX;
        let finalZ = startGridZ;

        while (finalX !== targetX || finalZ !== targetZ) {
            const nextX = finalX + stepX;
            const nextZ = finalZ + stepZ;

            const canExit = level.goals.some(g => {
                if (g.color !== blockData.color) return false;
                if (g.side === 'top' && nextZ < 0) return nextX >= g.start && (nextX + blockData.width) <= g.end;
                if (g.side === 'bottom' && nextZ + blockData.depth > BOARD_ROWS) return nextX >= g.start && (nextX + blockData.width) <= g.end;
                if (g.side === 'left' && nextX < 0) return nextZ >= g.start && (nextZ + blockData.depth) <= g.end;
                if (g.side === 'right' && nextX + blockData.width > BOARD_COLS) return nextZ >= g.start && (nextZ + blockData.depth) <= g.end;
                return false;
            });

            if (canExit) {
                finalX = nextX;
                finalZ = nextZ;
                break;
            }

            if (nextX < 0 || nextX + blockData.width > BOARD_COLS || nextZ < 0 || nextZ + blockData.depth > BOARD_ROWS) break;

            let collision = false;
            for (const otherBlock of blocks) {
                if (otherBlock.id === blockData.id) continue;
                if (nextX < otherBlock.x + otherBlock.width && nextX + blockData.width > otherBlock.x &&
                    nextZ < otherBlock.z + otherBlock.depth && nextZ + blockData.depth > otherBlock.z) {
                    collision = true;
                    break;
                }
            }
            if (collision) break;

            finalX = nextX;
            finalZ = nextZ;
        }

        blockData.x = finalX;
        blockData.z = finalZ;
        const finalPosition = new THREE.Vector3(
            finalX + blockData.width / 2,
            BLOCK_HEIGHT / 2,
            finalZ + blockData.depth / 2
        );
        selectedBlock.position.copy(finalPosition);

        if (finalX < 0 || finalX + blockData.width > BOARD_COLS || finalZ < 0 || finalZ + blockData.depth > BOARD_ROWS) {
            createParticles(selectedBlock.position, blockData.color);
            boardGroup.remove(selectedBlock);
            const index = blocks.findIndex(b => b.id === blockData.id);
            if (index > -1) blocks.splice(index, 1);
            const meshIndex = blockMeshes.findIndex(m => m === selectedBlock);
            if (meshIndex > -1) blockMeshes.splice(meshIndex, 1);
            console.log('Block removed. Remaining blocks:', blocks.length, 'meshes:', blockMeshes.length);
            
            if (blocks.length === 0) {
                document.getElementById('game-over-message').classList.remove('hidden');
            }
        }

        selectedBlock = null;
        } catch (error) {
            console.error('Error in onPointerUp:', error);
            selectedBlock = null;
            if (selectionOutline) {
                selectedBlock.remove(selectionOutline);
                selectionOutline = null;
            }
        }
    }

    // --- Event Listeners ---
    const resetButton = document.getElementById('reset-button');
    const playAgainButton = document.getElementById('play-again-button');
    resetButton.addEventListener('click', setupLevel);
    playAgainButton.addEventListener('click', setupLevel);

    // Add event listeners with error handling
    try {
        canvas.addEventListener('pointerdown', onPointerDown);
        canvas.addEventListener('pointermove', onPointerMove);
        canvas.addEventListener('pointerup', onPointerUp);
        window.addEventListener('resize', onWindowResize);
        console.log('Event listeners added successfully to canvas:', canvas);
        
        // Test click anywhere on canvas
        canvas.addEventListener('click', (e) => {
            console.log('Canvas clicked at:', e.clientX, e.clientY);
        });
        
    } catch (error) {
        console.error('Error adding event listeners:', error);
    }

    // --- Animation Loop ---
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

    function onWindowResize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    }

    // Initialize and start the game
    onWindowResize();
    setupLevel();
    animate();
    
    // Log initial state for debugging
    console.log('Game initialized. Canvas:', canvas);
    console.log('Initial blockMeshes count:', blockMeshes.length);
});