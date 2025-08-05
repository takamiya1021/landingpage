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
    
    // --- Scene Setup ---
    const scene = new THREE.Scene();
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    
    // Canvas size setup
    function updateCanvasSize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        renderer.setSize(width, height);
        
        // Update camera aspect ratio
        const aspect = width / height;
        const d = 5;
        camera.left = -d * aspect;
        camera.right = d * aspect;
        camera.top = d;
        camera.bottom = -d;
        camera.updateProjectionMatrix();
    }

    // --- Camera Setup ---
    const aspect = window.innerWidth / window.innerHeight;
    const d = 5;
    const camera = new THREE.OrthographicCamera(-d * aspect, d * aspect, d, -d, 1, 1000);
    camera.position.set(0, 10, 5); // Move camera back for a slight angle
    camera.lookAt(scene.position);
    
    // Initial canvas size
    updateCanvasSize();
    
    // Window resize handler
    window.addEventListener('resize', updateCanvasSize);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    // --- Game Logic ---
    const GRID_SIZE = 3;
    const BLOCK_SIZE = 1;
    const BLOCK_HEIGHT = 0.5;
    const BLOCK_SPACING = 0.1;
    const totalBlockSize = BLOCK_SIZE + BLOCK_SPACING;
    const offset = (GRID_SIZE - 1) / 2 * totalBlockSize;

    let blocks = [];
    const animatingBlocks = [];
    const particles = [];

    function createParticles(position, color) {
        const particleCount = 30;
        const particleMaterial = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 1, side: THREE.DoubleSide });

        // Create a star shape
        const starShape = new THREE.Shape();
        const outerRadius = 0.1;
        const innerRadius = 0.05;
        const numPoints = 5;
        starShape.moveTo(0, outerRadius);
        for (let i = 0; i < numPoints * 2; i++) {
            const radius = i % 2 === 0 ? outerRadius : innerRadius;
            const angle = (i / (numPoints * 2)) * Math.PI * 2;
            starShape.lineTo(Math.sin(angle) * radius, Math.cos(angle) * radius);
        }
        starShape.closePath();
        const particleGeometry = new THREE.ShapeGeometry(starShape);

        for (let i = 0; i < particleCount; i++) {
            const particle = new THREE.Mesh(particleGeometry, particleMaterial.clone());
            particle.position.copy(position);
            particle.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);

            // Velocity for circular explosion
            const angle = Math.random() * 2 * Math.PI;
            const speed = 0.01 + Math.random() * 0.01;
            const velocity = new THREE.Vector3(
                Math.cos(angle) * speed,
                (Math.random()) * 0.1, // Slight upward pop
                Math.sin(angle) * speed
            );

            particles.push({ mesh: particle, velocity, lifetime: 1.0 });
            scene.add(particle);
        }
    }

    function createArrow() {
        const shape = new THREE.Shape();
        const s = 0.25; // Size of the arrow
        shape.moveTo(0, s);
        shape.lineTo(s, -s);
        shape.lineTo(-s, -s);
        shape.closePath();
        const geometry = new THREE.ShapeGeometry(shape);
        const material = new THREE.MeshBasicMaterial({ color: 0xffffff, depthTest: false });
        const arrow = new THREE.Mesh(geometry, material);
        arrow.renderOrder = 1; // Ensure it renders on top of the block
        return arrow;
    }

    function isSolvable(blockList) {
        let tempBlocks = JSON.parse(JSON.stringify(blockList));
        let movesMade;
        do {
            movesMade = false;
            const removableBlocks = [];
            for (const block of tempBlocks) {
                if (!checkCollision(block, true, tempBlocks).collision) { // Check if a block is clear to move
                    removableBlocks.push(block);
                }
            }

            if (removableBlocks.length > 0) {
                const removableKeys = new Set(removableBlocks.map(b => `${b.x},${b.z}`));
                tempBlocks = tempBlocks.filter(b => !removableKeys.has(`${b.x},${b.z}`));
                movesMade = true;
            }
        } while (movesMade);

        return tempBlocks.length === 0;
    }

    function init() {
        // Clear existing blocks
        blocks.forEach(block => {
            scene.remove(block.mesh);
            block.mesh.geometry.dispose();
            block.mesh.material.dispose();
        });
        blocks = [];
        document.getElementById('win-message').classList.add('hidden');

        // Create Board
        const boardGeometry = new THREE.BoxGeometry(GRID_SIZE * totalBlockSize, 0.1, GRID_SIZE * totalBlockSize);
        const boardMaterial = new THREE.MeshStandardMaterial({ color: 0xcccccc });
        const board = new THREE.Mesh(boardGeometry, boardMaterial);
        board.position.y = -BLOCK_HEIGHT / 2 - 0.05;
        // scene.add(board);

        const colors = [0xf7b934, 0x00aef2, 0xa069ff, 0x2f6e3b, 0xbf414e, 0xed8037];
        const directions = ['up', 'down', 'left', 'right'];
        
        let potentialBlocks = [];
        let solvable = false;
        let attempts = 0;

        while (!solvable && attempts < 100) { // Limit attempts to prevent infinite loops
            potentialBlocks = [];
            for (let i = 0; i < GRID_SIZE; i++) {
                for (let j = 0; j < GRID_SIZE; j++) {
                    const direction = directions[Math.floor(Math.random() * directions.length)];
                    potentialBlocks.push({ direction, x: i, z: j });
                }
            }
            solvable = isSolvable(potentialBlocks);
            attempts++;
        }

        if (!solvable) {
            console.error("Could not generate a solvable puzzle. Using last attempt.");
        }

        // Create the actual meshes for the solvable puzzle
        potentialBlocks.forEach(blockData => {
            const geometry = new THREE.BoxGeometry(BLOCK_SIZE, BLOCK_HEIGHT, BLOCK_SIZE);
            const material = new THREE.MeshStandardMaterial({ color: colors[Math.floor(Math.random() * colors.length)] });
            const block = new THREE.Mesh(geometry, material);

            block.position.set(
                blockData.x * totalBlockSize - offset,
                0,
                blockData.z * totalBlockSize - offset
            );

            const arrow = createArrow();
            arrow.position.y = BLOCK_HEIGHT / 2 + 0.01;
            arrow.rotation.x = -Math.PI / 2;

            switch (blockData.direction) {
                case 'up': break;
                case 'down': arrow.rotation.z = Math.PI; break;
                case 'left': arrow.rotation.z = Math.PI / 2; break;
                case 'right': arrow.rotation.z = -Math.PI / 2; break;
            }

            block.add(arrow);

            const newBlockData = { ...blockData, mesh: block };
            blocks.push(newBlockData);
            scene.add(block);
        });
    }

    function checkCollision(movingBlock, isSimulation, blockList) {
        const currentBlocks = isSimulation ? blockList : blocks;
        const { x, z, direction } = movingBlock;
        let nextX = x, nextZ = z;

        switch (direction) {
            case 'up': nextZ--; break;
            case 'down': nextZ++; break;
            case 'left': nextX--; break;
            case 'right': nextX++; break;
        }

        // Check for collision with other blocks
        while (nextX >= 0 && nextX < GRID_SIZE && nextZ >= 0 && nextZ < GRID_SIZE) {
            if (currentBlocks.some(b => b.x === nextX && b.z === nextZ)) {
                return { collision: true, newX: nextX, newZ: nextZ };
            }
            switch (direction) {
                case 'up': nextZ--; break;
                case 'down': nextZ++; break;
                case 'left': nextX--; break;
                case 'right': nextX++; break;
            }
        }
        return { collision: false, newX: nextX, newZ: nextZ };
    }

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    function onClick(event) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObjects(blocks.map(b => b.mesh));

        if (intersects.length > 0) {
            const clickedMesh = intersects[0].object;

            // Prevent starting a new animation on a block that is already animating
            if (animatingBlocks.some(b => b.mesh === clickedMesh)) return;

            const clickedBlock = blocks.find(b => b.mesh === clickedMesh);

            if (clickedBlock) {
                createParticles(clickedMesh.position, clickedMesh.material.color);

                // Create a simulated future state of the board for collision detection
                const simulatedBlockList = [];
                const animatingBlockMeshes = new Set(animatingBlocks.map(b => b.mesh));

                // 1. Add all non-animating (static) blocks to the list
                blocks.forEach(block => {
                    if (!animatingBlockMeshes.has(block.mesh)) {
                        simulatedBlockList.push(block);
                    }
                });

                // 2. Add the future positions of animating blocks that will collide and stop on the board
                animatingBlocks.forEach(anim => {
                    if (anim.isCollision) {
                        const finalX = Math.round((anim.targetPosition.x + offset) / totalBlockSize);
                        const finalZ = Math.round((anim.targetPosition.z + offset) / totalBlockSize);
                        // Add a representation of this block at its final grid position
                        simulatedBlockList.push({ ...anim.blockData, x: finalX, z: finalZ });
                    }
                });

                const { collision, newX, newZ } = checkCollision(clickedBlock, true, simulatedBlockList);
                const targetPosition = clickedMesh.position.clone();
                const moveDir = new THREE.Vector3();

                switch (clickedBlock.direction) {
                    case 'up': moveDir.z = -1; break;
                    case 'down': moveDir.z = 1; break;
                    case 'left': moveDir.x = -1; break;
                    case 'right': moveDir.x = 1; break;
                }

                if (collision) {
                    // Calculate the physical position of the grid cell where the collision occurs
                    const collisionPosX = newX * totalBlockSize - offset;
                    const collisionPosZ = newZ * totalBlockSize - offset;
                    const collisionPos = new THREE.Vector3(collisionPosX, 0, collisionPosZ);

                    // The target is one step before the collision point
                    targetPosition.copy(collisionPos.sub(moveDir.clone().multiplyScalar(totalBlockSize)));
                } else {
                    targetPosition.add(moveDir.multiplyScalar(10)); // Move far off-screen
                }

                // Add to the list of blocks to animate
                animatingBlocks.push({
                    mesh: clickedMesh,
                    blockData: clickedBlock,
                    targetPosition: targetPosition,
                    isCollision: collision
                });
            }
        }
    }

    function onWindowResize() {
        const aspect = window.innerWidth / window.innerHeight;
        camera.left = -d * aspect;
        camera.right = d * aspect;
        camera.top = d;
        camera.bottom = -d;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    // --- Event Listeners ---
    document.getElementById('reset-button').addEventListener('click', (event) => {
        event.stopPropagation();
        init();
    });
    document.getElementById('play-again-button').addEventListener('click', (event) => {
        event.stopPropagation();
        init();
    });
    window.addEventListener('click', onClick);
    window.addEventListener('resize', onWindowResize, false);

    // --- Initialisation ---
    init();
    onWindowResize(); // Set initial size correctly
    renderer.render(scene, camera);

    function animateParticles() {
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.mesh.position.add(p.velocity);
            p.velocity.y -= 0.002; // gravity
            p.lifetime -= 0.02;
            p.mesh.material.opacity = p.lifetime;

            if (p.lifetime <= 0) {
                scene.remove(p.mesh);
                p.mesh.geometry.dispose();
                p.mesh.material.dispose();
                particles.splice(i, 1);
            }
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        animateParticles();
        const speed = 0.1; // Constant speed for movement

        // Process all animating blocks
        for (let i = animatingBlocks.length - 1; i >= 0; i--) {
            const animation = animatingBlocks[i];
            const { mesh, blockData, targetPosition, isCollision } = animation;

            const oldPosition = mesh.position.clone();
            const direction = targetPosition.clone().sub(mesh.position).normalize();
            const distanceToTarget = mesh.position.distanceTo(targetPosition);

            // Move block by a constant speed, but don't overshoot the target
            const moveDistance = Math.min(speed, distanceToTarget);
            mesh.position.add(direction.multiplyScalar(moveDistance));

            const movement = mesh.position.clone().sub(oldPosition);
            const distance = movement.length();

            if (distance > 0.0001) { // Only rotate if it moved
                const moveDir = new THREE.Vector3();
                switch (blockData.direction) {
                    case 'up':    moveDir.set(0, 0, -1); break;
                    case 'down':  moveDir.set(0, 0, 1);  break;
                    case 'left':  moveDir.set(-1, 0, 0); break;
                    case 'right': moveDir.set(1, 0, 0);  break;
                }

                const rotationAxis = new THREE.Vector3().crossVectors(new THREE.Vector3(0, 1, 0), moveDir).normalize();
                const radius = BLOCK_HEIGHT;
                const rotationAngle = distance / radius;

                const quaternion = new THREE.Quaternion();
                quaternion.setFromAxisAngle(rotationAxis, rotationAngle);
                mesh.quaternion.premultiply(quaternion);
            }

            // Check if the animation is finished
            if (distanceToTarget < speed) {
                mesh.position.copy(targetPosition);
                mesh.quaternion.identity();

                if (isCollision) {
                    const newX = Math.round((targetPosition.x + offset) / totalBlockSize);
                    const newZ = Math.round((targetPosition.z + offset) / totalBlockSize);
                    blockData.x = newX;
                    blockData.z = newZ;
                } else {
                    const index = blocks.findIndex(b => b.mesh === mesh);
                    if (index > -1) {
                        blocks.splice(index, 1);
                    }
                    scene.remove(mesh);
                    mesh.geometry.dispose();
                    mesh.material.dispose();
                }

                animatingBlocks.splice(i, 1);

                if (blocks.length === 0) {
                    document.getElementById('win-message').classList.remove('hidden');
                }
            }
        }

        renderer.render(scene, camera);
    }

    animate();
});