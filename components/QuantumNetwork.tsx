import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

interface QuantumNetworkProps {
    domainIndex: number;
    videoUrl: string;
}

const DOMAIN_COLORS = [
    0x5E62FF, // AI - Nebula Indigo
    0x9966FF, // Chatbots - Nebula Purple
    0x00f2ff, // AI Reps - Electric Cyan
    0x7000ff, // AX - Neon Violet
    0x00ff9d, // D365 - Spring Green
    0x0066ff, // Web - Vivid Blue
    0xbd00ff, // ERP - Magenta
    0x5E62FF, // Mobile - Nebula Indigo
];

const QuantumNetwork: React.FC<QuantumNetworkProps> = ({ domainIndex, videoUrl }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const prevVideoUrl = useRef(videoUrl);
    const [fade, setFade] = useState(false);
    const domainIndexRef = useRef(domainIndex);

    // Three.js Refs
    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const composerRef = useRef<EffectComposer | null>(null);

    // Objects for morphing & animation
    const coreGroupRef = useRef<THREE.Group | null>(null);
    const latticeRef = useRef<THREE.Object3D | null>(null);
    const ringsRef = useRef<THREE.Group | null>(null);

    const createRobotModel = (color: number) => {
        const group = new THREE.Group();

        // 0. Mechanical Neck / Base
        const neckGeo = new THREE.CylinderGeometry(0.1, 0.15, 0.2, 32);
        const neckMat = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.9, roughness: 0.1 });
        const neck = new THREE.Mesh(neckGeo, neckMat);
        neck.position.y = -0.6;
        group.add(neck);

        // 1. External Glass Head
        const headGroup = new THREE.Group();
        group.add(headGroup);

        const headGeo = new THREE.IcosahedronGeometry(0.5, 3);
        const headMat = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            metalness: 0,
            roughness: 0,
            transmission: 1,
            thickness: 0.5,
            transparent: true,
            opacity: 0.3,
            ior: 1.5
        });
        const head = new THREE.Mesh(headGeo, headMat);
        headGroup.add(head);

        // 2. Internal Glowing 'Brain'
        const brainGeo = new THREE.SphereGeometry(0.22, 32, 32);
        const brainMat = new THREE.MeshStandardMaterial({
            color: color,
            emissive: color,
            emissiveIntensity: 2.5,
            transparent: true,
            opacity: 0.9
        });
        const brain = new THREE.Mesh(brainGeo, brainMat);
        headGroup.add(brain);

        // Dark Visor / Face Area - Moved slightly out
        const visorGeo = new THREE.SphereGeometry(0.5, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.6);
        const visorMat = new THREE.MeshBasicMaterial({ color: 0x050505, transparent: true, opacity: 0.9 });
        const visor = new THREE.Mesh(visorGeo, visorMat);
        visor.rotation.x = -Math.PI / 2.5;
        visor.position.z = 0.05;
        headGroup.add(visor);

        // 2. Animated Light Bars (Eyes & Mouth)
        const barGeo = new THREE.PlaneGeometry(0.15, 0.04);
        const barMat = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: 0.9,
            blending: THREE.AdditiveBlending,
            side: THREE.DoubleSide
        });

        const eyeL = new THREE.Mesh(barGeo, barMat);
        eyeL.position.set(-0.18, 0.1, 0.52);
        headGroup.add(eyeL);

        const eyeR = new THREE.Mesh(barGeo, barMat);
        eyeR.position.set(0.18, 0.1, 0.52);
        headGroup.add(eyeR);

        // Mouth Bar (The "Talking" element)
        const mouthGeo = new THREE.PlaneGeometry(0.2, 0.03);
        const mouthMat = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: 0.9,
            blending: THREE.AdditiveBlending,
            side: THREE.DoubleSide
        });
        const mouth = new THREE.Mesh(mouthGeo, mouthMat);
        mouth.position.set(0, -0.15, 0.52);
        headGroup.add(mouth);

        // 3. Digital Halo / Orbitals
        const createRing = (radius: number, rotationX: number, opacity: number) => {
            const rGeo = new THREE.TorusGeometry(radius, 0.005, 16, 100);
            const rMat = new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity });
            const r = new THREE.Mesh(rGeo, rMat);
            r.rotation.x = rotationX;
            return r;
        };

        const ring1 = createRing(0.7, Math.PI / 2.2, 0.4);
        const ring2 = createRing(0.85, -Math.PI / 3, 0.2);
        group.add(ring1, ring2);

        // Store references for animation
        (group as any).userData = {
            isRobot: true,
            headGroup,
            brain, // Brain for pulsing
            eyeL,
            eyeR,
            mouth,
            ring1,
            ring2
        };

        return group;
    };

    const createCodeModel = (color: number) => {
        const group = new THREE.Group();
        const codeStrips: THREE.Group[] = [];

        // 1. Digital Matrix Tunnel (3D Depth)
        const strips: THREE.Group[] = [];
        const chars = "010101010101ABCDEFGHIKLMNOPQRSTUVWXYZ";

        for (let i = 0; i < 35; i++) {
            const strip = new THREE.Group();
            const x = (Math.random() - 0.5) * 2.5;
            const z = (Math.random() - 0.5) * 1.5;
            const speed = 0.4 + Math.random() * 0.8;

            for (let j = 0; j < 12; j++) {
                const charGeo = new THREE.PlaneGeometry(0.06, 0.06);
                const charMat = new THREE.MeshBasicMaterial({
                    color: Math.random() > 0.4 ? color : 0x00f2ff,
                    transparent: true,
                    opacity: 1 - (j / 12),
                    blending: THREE.AdditiveBlending,
                    side: THREE.DoubleSide
                });
                const char = new THREE.Mesh(charGeo, charMat);
                char.position.y = (j / 12) - 0.5;
                strip.add(char);
            }
            strip.position.set(x, 0, z);
            (strip as any).userData = { speed };
            group.add(strip);
            strips.push(strip);
        }

        // 2. Center "Logic Core"
        const coreGeo = new THREE.IcosahedronGeometry(0.25, 0);
        const coreMat = new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.7 });
        const core = new THREE.Mesh(coreGeo, coreMat);
        group.add(core);

        (group as any).userData = { isCode: true, strips, core };
        return group;
    };

    const createDomainModel = (index: number) => {
        const color = DOMAIN_COLORS[index % DOMAIN_COLORS.length];

        // AI Section
        if (index === 0) {
            const group = new THREE.Group();
            const geo = new THREE.IcosahedronGeometry(0.85, 3);
            const edges = new THREE.EdgesGeometry(geo);
            const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.6 }));
            const nodes = new THREE.Points(geo, new THREE.PointsMaterial({ color, size: 0.025, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending }));
            group.add(line, nodes);
            return { group, geo };
        }

        // Chatbot Section - RETURN ROBOT DIRECTLY
        if (index === 1) {
            const robotGroup = createRobotModel(color);
            return { group: robotGroup, geo: null };
        }

        // Web Development Section - NEW CODE MATRIX
        if (index === 5) {
            const codeGroup = createCodeModel(color);
            return { group: codeGroup, geo: null };
        }

        // Other Sections
        const group = new THREE.Group();
        const geometries = [
            new THREE.IcosahedronGeometry(0.85, 2),
            new THREE.TorusKnotGeometry(0.6, 0.25, 100, 16),
            new THREE.OctahedronGeometry(0.95, 1),
            new THREE.TorusGeometry(0.75, 0.3, 16, 50),
            new THREE.BoxGeometry(1.2, 1.2, 1.2, 2, 2, 2),
            new THREE.DodecahedronGeometry(0.85, 0),
            new THREE.SphereGeometry(0.85, 16, 16),
            new THREE.IcosahedronGeometry(0.85, 0)
        ];
        const geo = geometries[index % geometries.length];
        const edges = new THREE.EdgesGeometry(geo);
        const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.6 }));
        const nodes = new THREE.Points(geo, new THREE.PointsMaterial({ color, size: 0.025, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending }));
        group.add(line, nodes);
        return { group, geo };
    };

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const width = container.clientWidth;
        const height = container.clientHeight;

        const scene = new THREE.Scene();
        sceneRef.current = scene;

        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = 2.4;
        cameraRef.current = camera;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        const composer = new EffectComposer(renderer);
        const renderPass = new RenderPass(scene, camera);
        const bloomPass = new UnrealBloomPass(new THREE.Vector2(width, height), 0.7, 0.3, 0.85);
        composer.addPass(renderPass);
        composer.addPass(bloomPass);
        composerRef.current = composer;

        const coreGroup = new THREE.Group();
        scene.add(coreGroup);
        coreGroupRef.current = coreGroup;

        // Add Essential Scene Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 1.5, 10);
        pointLight.position.set(2, 2, 5);
        scene.add(pointLight);

        const chatbotLight = new THREE.PointLight(DOMAIN_COLORS[1], 2, 5);
        chatbotLight.position.set(0, 0, 1);
        scene.add(chatbotLight);

        const { group: initialModel } = createDomainModel(domainIndex);
        coreGroup.add(initialModel);
        latticeRef.current = initialModel;

        const ringsGroup = new THREE.Group();
        scene.add(ringsGroup);
        ringsRef.current = ringsGroup;

        const addRing = (radius: number, rotationX: number, speed: number) => {
            const ringGeo = new THREE.TorusGeometry(radius, 0.004, 16, 100);
            const ringMat = new THREE.MeshBasicMaterial({
                color: DOMAIN_COLORS[0],
                transparent: true,
                opacity: 0.15
            });
            const ring = new THREE.Mesh(ringGeo, ringMat);
            ring.rotation.x = rotationX;
            (ring as any).userData = { speed };
            ringsGroup.add(ring);
        };

        addRing(1.1, Math.PI / 2.5, 0.004);
        addRing(1.3, -Math.PI / 3.5, -0.002);
        addRing(1.5, Math.PI / 6, 0.001);

        let mouseX = 0, mouseY = 0;
        const onMouseMove = (e: MouseEvent) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        };
        window.addEventListener('mousemove', onMouseMove);

        const clock = new THREE.Clock();
        const animate = () => {
            const id = requestAnimationFrame(animate);
            const delta = clock.getDelta();
            const time = performance.now() * 0.001;

            if (coreGroupRef.current) {
                // Specific animation for Chatbot
                if (domainIndexRef.current === 1) {
                    // Floating effect
                    coreGroupRef.current.position.y += Math.sin(time * 1.5) * 0.0012;
                    coreGroupRef.current.position.x += Math.cos(time * 0.8) * 0.0006;

                    // Animate Procedural Robot
                    const robot = coreGroupRef.current.children[0];
                    if (robot && (robot as any).userData?.isRobot) {
                        const { headGroup, mouth, eyeL, eyeR, ring1, ring2 } = (robot as any).userData;

                        if (headGroup) {
                            headGroup.rotation.y = THREE.MathUtils.lerp(headGroup.rotation.y, mouseX * 0.6, 0.1);
                            headGroup.rotation.x = THREE.MathUtils.lerp(headGroup.rotation.x, -mouseY * 0.3, 0.1);

                            if (mouth) {
                                const pulse = Math.abs(Math.sin(time * 18)) * (0.3 + Math.random() * 0.7);
                                mouth.scale.y = 1 + pulse * 5;
                                if (mouth.material && 'opacity' in mouth.material) {
                                    (mouth.material as any).opacity = 0.6 + pulse * 0.4;
                                }
                            }

                            if (eyeL && eyeR) {
                                const blink = Math.sin(time * 0.8) > 0.98 ? 0.1 : 1;
                                eyeL.scale.y = blink;
                                eyeR.scale.y = blink;
                            }

                            if (ring1) ring1.rotation.z += delta * 0.4;
                            if ((robot as any).userData?.brain) {
                                (robot as any).userData.brain.scale.setScalar(1 + Math.sin(time * 5) * 0.12);
                                (robot as any).userData.brain.material.emissiveIntensity = 2 + Math.sin(time * 3) * 1;
                            }
                        }
                    }
                } else if (domainIndexRef.current === 5) {
                    // Web Development - Code Animation
                    const code = coreGroupRef.current.children[0];
                    if (code && (code as any).userData?.isCode) {
                        const { strips, core } = (code as any).userData;

                        strips.forEach((strip: THREE.Group) => {
                            const { speed } = (strip as any).userData;
                            strip.children.forEach((char: any) => {
                                char.position.y -= delta * speed;
                                if (char.position.y < -0.5) char.position.y = 0.5;

                                // Random flicker
                                if (Math.random() > 0.99) char.visible = !char.visible;
                                else if (Math.random() > 0.5) char.visible = true;
                            });
                        });

                        if (core) {
                            core.rotation.x += delta * 2;
                            core.rotation.y += delta * 1.5;
                        }
                    }
                    coreGroupRef.current.rotation.y += delta * 0.1;
                    coreGroupRef.current.rotation.x -= delta * 0.05;
                } else {
                    coreGroupRef.current.rotation.x += delta * 0.1;
                }

                coreGroupRef.current.position.x += (mouseX * 0.15 - coreGroupRef.current.position.x) * 0.1;
                coreGroupRef.current.position.y += (-mouseY * 0.15 - coreGroupRef.current.position.y) * 0.1;
            }

            if (ringsRef.current) {
                ringsRef.current.children.forEach((child) => {
                    child.rotation.z += (child as any).userData.speed;
                });
                ringsRef.current.rotation.y = mouseX * 0.05;
                ringsRef.current.rotation.x = -mouseY * 0.05;
            }

            composerRef.current?.render();
        };
        animate();

        const onResize = () => {
            if (!containerRef.current || !cameraRef.current || !composerRef.current || !rendererRef.current) return;
            const w = containerRef.current.clientWidth;
            const h = containerRef.current.clientHeight;
            cameraRef.current.aspect = w / h;
            cameraRef.current.updateProjectionMatrix();
            rendererRef.current.setSize(w, h);
            composerRef.current.setSize(w, h);
        };
        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('resize', onResize);
            container.removeChild(renderer.domElement);
            renderer.dispose();
            // Deep cleanup when component unmounts
            scene.traverse((obj) => {
                if (obj instanceof THREE.Mesh || obj instanceof THREE.LineSegments || obj instanceof THREE.Points) {
                    obj.geometry.dispose();
                    if (Array.isArray(obj.material)) {
                        obj.material.forEach(m => m.dispose());
                    } else {
                        obj.material.dispose();
                    }
                }
            });
        };
    }, []);

    // Morph Logic with DEEP Disposal Fix
    useEffect(() => {
        domainIndexRef.current = domainIndex;
        console.log(`[QuantumNetwork] Morphing to Domain: ${domainIndex} - ${DOMAIN_COLORS[domainIndex % DOMAIN_COLORS.length].toString(16)}`);

        if (coreGroupRef.current && latticeRef.current) {
            const oldLattice = latticeRef.current;
            coreGroupRef.current.remove(oldLattice);

            // Deep disposal of the old model to fix the "invisible/leaking" bug
            oldLattice.traverse((obj) => {
                if (obj instanceof THREE.Mesh || obj instanceof THREE.LineSegments || obj instanceof THREE.Points) {
                    obj.geometry.dispose();
                    if (Array.isArray(obj.material)) {
                        obj.material.forEach(m => m.dispose());
                    } else {
                        obj.material.dispose();
                    }
                }
            });

            const { group: nextLattice } = createDomainModel(domainIndex);
            coreGroupRef.current.add(nextLattice);
            latticeRef.current = nextLattice;
        }

        if (videoUrl !== prevVideoUrl.current) {
            setFade(true);
            const timeout = setTimeout(() => {
                if (videoRef.current) {
                    videoRef.current.src = videoUrl;
                    videoRef.current.play().catch(() => { });
                }
                setFade(false);
                prevVideoUrl.current = videoUrl;
            }, 300);
            return () => clearTimeout(timeout);
        }
    }, [domainIndex, videoUrl]);

    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-black">
            <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${fade ? 'opacity-0' : 'opacity-30'}`}
                src={videoUrl}
            />

            <div className="absolute inset-0 z-10 opacity-15 pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(rgba(94, 98, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(94, 98, 255, 0.1) 1px, transparent 1px)`,
                    backgroundSize: '80px 80px',
                    perspective: '1200px',
                    transform: 'rotateX(70deg) scale(1.5)',
                    transformOrigin: 'center bottom',
                    maskImage: 'radial-gradient(circle at center, black, transparent 90%)'
                }}
            />

            <div className="absolute top-[10%] right-[15%] w-[35%] h-[35%] bg-[#5E62FF]/10 blur-[140px] rounded-full z-10" />
            <div className="absolute bottom-[15%] left-[10%] w-[30%] h-[30%] bg-[#9966FF]/10 blur-[120px] rounded-full z-10" />

            <div ref={containerRef} className="w-full h-full relative z-20" />

            <div className="absolute inset-0 pointer-events-none opacity-[0.02] z-30"
                style={{
                    background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #fff 3px)',
                    backgroundSize: '100% 4px'
                }}
            />
        </div>
    );
};

export default QuantumNetwork;
