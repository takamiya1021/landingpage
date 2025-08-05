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
    
    // --- Three.js Setup ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#c'), antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0); // Set clear color to transparent
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Canvas size setup
    function updateCanvasSize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    }
    
    // Initial canvas size
    updateCanvasSize();
    
    // Window resize handler
    window.addEventListener('resize', updateCanvasSize);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    // --- Camera Setup ---
    let cameraRadius = 9;
    
    // --- Controls ---
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.enableRotate = true;
    controls.enableZoom = false;
    controls.minDistance = cameraRadius;
    controls.maxDistance = cameraRadius;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;
    
    // Set initial camera position
    camera.position.set(6, 6, 6);
    camera.lookAt(0, 0, 0);
    controls.target.set(0, 0, 0);
    controls.update();

    // --- Game Logic ---
    const levels = {
        1: { size: 3 },
        2: { size: 4 },
        3: { size: 5 }
    };
    let currentLevel = 1;
    let CUBE_SIZE = levels[currentLevel].size;

    const BLOCK_SIZE = 1;
    const BLOCK_SPACING = 0.1;
    let totalBlockSize = BLOCK_SIZE + BLOCK_SPACING;
    let offset = (CUBE_SIZE - 1) / 2 * totalBlockSize;

    let blocks = [];

    function createArrow() {
        const arrowGroup = new THREE.Group();
        const material = new THREE.MeshBasicMaterial({ color: 0xffffff });

        // Arrowhead
        const coneGeometry = new THREE.ConeGeometry(0.15, 0.25, 16);
        const cone = new THREE.Mesh(coneGeometry, material);
        cone.position.y = 0.2;

        // Arrow shaft
        const cylinderGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.4, 16);
        const cylinder = new THREE.Mesh(cylinderGeometry, material);
        
        arrowGroup.add(cone);
        arrowGroup.add(cylinder);
        arrowGroup.scale.set(0.8, 0.8, 0.8);
        
        return arrowGroup;
    }

    function init(level) {
        currentLevel = level;
        CUBE_SIZE = levels[currentLevel].size;
        cameraRadius = CUBE_SIZE * 3; // Dynamically set camera distance
        // Update camera distance for new level
        controls.minDistance = cameraRadius;
        controls.maxDistance = cameraRadius;
        const currentPos = camera.position.normalize().multiplyScalar(cameraRadius);
        camera.position.copy(currentPos);
        controls.update();

        totalBlockSize = BLOCK_SIZE + BLOCK_SPACING;
        offset = (CUBE_SIZE - 1) / 2 * totalBlockSize;


        document.getElementById('level-display').textContent = `Level ${currentLevel}`;

        // Clear existing blocks
        blocks.forEach(block => scene.remove(block.mesh));
        blocks = [];
        document.getElementById('game-clear').classList.add('hidden');

        const colors = [0xf7b934, 0x00aef2, 0xa069ff, 0x2f6e3b, 0xbf414e, 0xed8037];
        const orientations = [
            { face: 'x', direction: 'x' }, { face: '-x', direction: '-x' },
            { face: 'y', direction: 'y' },
            { face: 'z', direction: 'z' }, { face: '-z', direction: '-z' }
        ];

        // --- Generate a guaranteed solvable puzzle by working backwards ---
        let blocksToGenerate = [];
        for (let i = 0; i < CUBE_SIZE; i++) {
            for (let j = 0; j < CUBE_SIZE; j++) {
                for (let k = 0; k < CUBE_SIZE; k++) {
                    blocksToGenerate.push({ x: i, y: j, z: k });
                }
            }
        }

        const finalPuzzle = [];
        while (blocksToGenerate.length > 0) {
            let removableCandidates = [];
            for (const block of blocksToGenerate) {
                const clearDirections = [];
                for (const dir of orientations.map(o => o.direction)) {
                    if (!checkCollision(block, dir, blocksToGenerate, CUBE_SIZE)) {
                        clearDirections.push(dir);
                    }
                }
                if (clearDirections.length > 0) {
                    removableCandidates.push({ block, clearDirections });
                }
            }

            if (removableCandidates.length === 0) {
                console.error("Error generating puzzle: No removable blocks found. This should not happen.");
                break;
            }

            const candidate = removableCandidates[Math.floor(Math.random() * removableCandidates.length)];
            const assignedDirection = candidate.clearDirections[Math.floor(Math.random() * candidate.clearDirections.length)];
            
            const finalBlock = { ...candidate.block, direction: assignedDirection };
            finalPuzzle.push(finalBlock);

            blocksToGenerate = blocksToGenerate.filter(b => b !== candidate.block);
        }

        // Create the actual meshes for the solvable puzzle
        finalPuzzle.forEach(blockData => {
            const geometry = new THREE.BoxGeometry(BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
            const material = new THREE.MeshStandardMaterial({
                color: colors[Math.floor(Math.random() * colors.length)],
                roughness: 0.7
            });
            const block = new THREE.Mesh(geometry, material);

            block.position.set(
                blockData.x * totalBlockSize - offset,
                blockData.y * totalBlockSize - offset,
                blockData.z * totalBlockSize - offset
            );

            const arrow = createArrow();
            const arrowOffset = BLOCK_SIZE / 2;

            const V_UP = new THREE.Vector3(0, 1, 0);
            const directionVectors = {
                'y': new THREE.Vector3(0, 1, 0),
                '-y': new THREE.Vector3(0, -1, 0),
                'x': new THREE.Vector3(1, 0, 0),
                '-x': new THREE.Vector3(-1, 0, 0),
                'z': new THREE.Vector3(0, 0, 1),
                '-z': new THREE.Vector3(0, 0, -1)
            };

            const targetDirection = directionVectors[blockData.direction];
            arrow.position.copy(targetDirection).multiplyScalar(arrowOffset);

            if (!targetDirection.equals(V_UP)) {
                const quaternion = new THREE.Quaternion();
                quaternion.setFromUnitVectors(V_UP, targetDirection);
                arrow.setRotationFromQuaternion(quaternion);
            }

            block.add(arrow);

            blockData.mesh = block;
            blocks.push(blockData);
            scene.add(block);
        });
    }

    function checkCollision(movingBlock, direction, blockList, size) {
        const allBlocks = blockList || blocks;
        const cubeSize = size || CUBE_SIZE;
        const { x, y, z } = movingBlock;

        let currentX = x;
        let currentY = y;
        let currentZ = z;

        const step = (dir) => {
            switch (dir) {
                case 'x': currentX++; break;
                case '-x': currentX--; break;
                case 'y': currentY++; break;
                case '-y': currentY--; break;
                case 'z': currentZ++; break;
                case '-z': currentZ--; break;
            }
        };

        // Start checking from the next block in the direction of movement
        step(direction);

        while (
            currentX >= 0 && currentX < cubeSize &&
            currentY >= 0 && currentY < cubeSize &&
            currentZ >= 0 && currentZ < cubeSize
        ) {
            // Check if any block exists at the current coordinates
            if (allBlocks.some(b => b.x === currentX && b.y === currentY && b.z === currentZ)) {
                return true; // Collision found
            }
            // Move to the next position in the path
            step(direction);
        }

        return false; // No collision found in the entire path
    }

    function createTrail(position, color) {
        const trailMaterial = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            blending: THREE.AdditiveBlending, // Make it glow
            depthWrite: false
        });
        const trailGeometry = new THREE.SphereGeometry(0.25, 8, 8); // Increased size
        const trailParticle = new THREE.Mesh(trailGeometry, trailMaterial);
        trailParticle.position.copy(position);
        scene.add(trailParticle);

        let life = 0;
        const maxLife = 0.4; // Slightly longer lifespan

        function animateTrail() {
            if (life >= maxLife) {
                scene.remove(trailParticle);
                trailParticle.geometry.dispose();
                trailParticle.material.dispose();
                return;
            }
            // Shrink the particle over its lifetime
            const lifePercent = life / maxLife;
            trailParticle.scale.setScalar(1 - lifePercent);

            life += 1/60; // Assuming 60fps
            requestAnimationFrame(animateTrail);
        }
        animateTrail();
    }

    function createParticles(position, color) {
        const particleCount = 50;
        const particleMaterial = new THREE.MeshBasicMaterial({ color: color });

        for (let i = 0; i < particleCount; i++) {
            const particleGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
            const particle = new THREE.Mesh(particleGeometry, particleMaterial);
            particle.position.copy(position);

            const velocity = new THREE.Vector3(
                (Math.random() - 0.5) * 4,
                (Math.random() - 0.5) * 4,
                (Math.random() - 0.5) * 4
            );

            scene.add(particle);

            let life = 0;
            const maxLife = 0.5 + Math.random() * 0.5; // Particle lives for 0.5 to 1.0 seconds

            function updateParticle() {
                if (life >= maxLife) {
                    scene.remove(particle);
                    particle.geometry.dispose();
                    // Material is shared, so don't dispose it here
                    return;
                }
                particle.position.add(velocity.clone().multiplyScalar(0.02));
                particle.scale.multiplyScalar(0.98);
                life += 0.02;
                requestAnimationFrame(updateParticle);
            }
            updateParticle();
        }
        // Dispose the shared material after a delay
        setTimeout(() => {
            particleMaterial.dispose();
        }, 1500);
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
            const clickedBlock = blocks.find(b => b.mesh === clickedMesh);

            if (clickedBlock && !checkCollision(clickedBlock, clickedBlock.direction)) {
                // Remove block from collision logic immediately
                const index = blocks.indexOf(clickedBlock);
                if (index > -1) {
                    blocks.splice(index, 1);
                }

                // Animate block out
                const targetPosition = clickedMesh.position.clone();
                const moveDir = new THREE.Vector3();
                switch (clickedBlock.direction) {
                    case 'x': moveDir.x = 1; break;
                    case '-x': moveDir.x = -1; break;
                    case 'y': moveDir.y = 1; break;
                    case '-y': moveDir.y = -1; break;
                    case 'z': moveDir.z = 1; break;
                    case '-z': moveDir.z = -1; break;
                }
                targetPosition.add(moveDir.multiplyScalar(3)); // Move it further away

                let animationFrame;
                function animateOut() {
                    // Create trail effect
                    createTrail(clickedMesh.position, clickedMesh.material.color);

                    clickedMesh.position.lerp(targetPosition, 0.1);
                    if (clickedMesh.position.distanceTo(targetPosition) < 0.1) {
                        createParticles(clickedMesh.position, clickedMesh.material.color);
                        scene.remove(clickedMesh);
                        clickedMesh.geometry.dispose();
                        clickedMesh.material.dispose();
                        
                        if (blocks.length === 0) {
                            if (currentLevel < Object.keys(levels).length) {
                                document.getElementById('game-clear-message').textContent = `Level ${currentLevel} Clear!`;
                                document.getElementById('play-again-button').textContent = 'Next Level';
                            } else {
                                document.getElementById('game-clear-message').textContent = 'Congratulations! You Cleared All Levels!';
                                document.getElementById('play-again-button').textContent = 'Play Again';
                            }
                            document.getElementById('game-clear').classList.remove('hidden');
                        }
                        cancelAnimationFrame(animationFrame);
                        return;
                    }
                    animationFrame = requestAnimationFrame(animateOut);
                }
                animateOut();
            }
        }
    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    // --- Event Listeners ---
    document.getElementById('reset-button').addEventListener('click', (event) => {
        event.stopPropagation();
        init(currentLevel); // Reset current level
    });
    document.getElementById('play-again-button').addEventListener('click', (event) => {
        event.stopPropagation();
        if (currentLevel < Object.keys(levels).length) {
            init(currentLevel + 1); // Go to next level
        } else {
            init(1); // Restart from level 1
        }
    });
    window.addEventListener('click', onClick);
    window.addEventListener('resize', onWindowResize);

    // --- Animation Loop ---
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }

    init(1);
    animate();
});