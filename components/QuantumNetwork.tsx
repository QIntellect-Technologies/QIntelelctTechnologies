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

        // Materials
        const primaryMat = new THREE.MeshPhongMaterial({
            color: color,
            transparent: true,
            opacity: 0.8,
            shininess: 100
        });
        const glowMat = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: 0.9,
            blending: THREE.AdditiveBlending
        });
        const darkMat = new THREE.MeshPhongMaterial({ color: 0x111111 });

        // Head (Capsule/Sphere hybrid look)
        const headGeo = new THREE.SphereGeometry(0.4, 32, 24);
        headGeo.scale(1, 1.1, 0.9);
        const head = new THREE.Mesh(headGeo, primaryMat);
        head.position.y = 0.2;
        group.add(head);

        // Visor/Eyes area
        const visorGeo = new THREE.SphereGeometry(0.35, 32, 24, 0, Math.PI * 2, 0.5, 0.8);
        const visor = new THREE.Mesh(visorGeo, darkMat);
        visor.position.y = 0.25;
        visor.position.z = 0.1;
        visor.scale.set(1, 0.4, 1);
        group.add(visor);

        // Glowing Eyes
        const eyeGeo = new THREE.SphereGeometry(0.04, 16, 16);
        const eyeL = new THREE.Mesh(eyeGeo, glowMat);
        eyeL.position.set(-0.15, 0.25, 0.4);
        group.add(eyeL);

        const eyeR = new THREE.Mesh(eyeGeo, glowMat);
        eyeR.position.set(0.15, 0.25, 0.4);
        group.add(eyeR);

        // Body / Base
        const bodyGeo = new THREE.CylinderGeometry(0.25, 0.4, 0.5, 32);
        const body = new THREE.Mesh(bodyGeo, primaryMat);
        body.position.y = -0.3;
        group.add(body);

        // Floating Ears/Antennae
        const earGeo = new THREE.TorusGeometry(0.1, 0.02, 16, 32);
        const earL = new THREE.Mesh(earGeo, primaryMat);
        earL.position.set(-0.45, 0.25, 0);
        earL.rotation.y = Math.PI / 2;
        group.add(earL);

        const earR = new THREE.Mesh(earGeo, primaryMat);
        earR.position.set(0.45, 0.25, 0);
        earR.rotation.y = Math.PI / 2;
        group.add(earR);

        // Speech Bubbles (3D Planes with Glow)
        const createBubble = (x: number, y: number, z: number, scale: number) => {
            const bGeo = new THREE.PlaneGeometry(0.4 * scale, 0.25 * scale);
            const bMat = new THREE.MeshBasicMaterial({
                color: color,
                transparent: true,
                opacity: 0.15,
                side: THREE.DoubleSide
            });
            const b = new THREE.Mesh(bGeo, bMat);
            b.position.set(x, y, z);

            // Edges for bubble
            const bEdges = new THREE.EdgesGeometry(bGeo);
            const bLine = new THREE.LineSegments(bEdges, new THREE.LineBasicMaterial({ color: color, opacity: 0.4, transparent: true }));
            b.add(bLine);

            // Three dots inside
            for (let i = 0; i < 3; i++) {
                const dot = new THREE.Mesh(new THREE.CircleGeometry(0.02 * scale, 16), new THREE.MeshBasicMaterial({ color: 0xffffff, opacity: 0.8, transparent: true }));
                dot.position.set((i - 1) * 0.1 * scale, 0, 0.01);
                b.add(dot);
            }
            return b;
        };

        const bubble1 = createBubble(-0.8, 0.6, 0.2, 1);
        const bubble2 = createBubble(-1.0, 0.2, -0.2, 0.8);
        const bubble3 = createBubble(-0.7, -0.2, 0.3, 0.6);

        group.add(bubble1, bubble2, bubble3);
        (group as any).userData = { bubbles: [bubble1, bubble2, bubble3] };

        return { group };
    };

    const createDomainModel = (index: number) => {
        const group = new THREE.Group();
        let geo: THREE.BufferGeometry | null = null;
        const color = DOMAIN_COLORS[index % DOMAIN_COLORS.length];

        // Specific "Wow" Models (v11 Fixes & Upgrades)
        if (index === 0) {
            // AI: Advanced Neural Neural Lattice
            geo = new THREE.IcosahedronGeometry(0.85, 3);
        } else if (index === 1) {
            // Chatbot: Premium 3D Robot
            const { group: robot } = createRobotModel(color);
            group.add(robot);
            return { group, geo: null };
        } else if (index === 3 || index === 4 || index === 6) {
            // Dynamics/ERP: High-Visibility Tech Crystal
            geo = new THREE.OctahedronGeometry(1.0, 1);
        } else {
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
            geo = geometries[index % geometries.length];
        }

        const edges = new THREE.EdgesGeometry(geo);
        const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({
            color: color,
            transparent: true,
            opacity: 0.6,
            linewidth: 1 // Only works on some drivers, but good to have
        }));

        const nodes = new THREE.Points(geo, new THREE.PointsMaterial({
            color: color,
            size: 0.025,
            transparent: true,
            opacity: 0.9,
            blending: THREE.AdditiveBlending
        }));

        group.add(line);
        group.add(nodes);

        // Cleanup the temporary geometry used for edges/points
        // Note: We don't dispose the geo here because it's shared by Points and Edges
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

            if (coreGroupRef.current) {
                const time = clock.getElapsedTime();

                // General rotation
                coreGroupRef.current.rotation.y += delta * 0.25;

                // Specific animation for Chatbot
                if (domainIndex === 1) {
                    // Floating effect
                    coreGroupRef.current.position.y += Math.sin(time * 1.5) * 0.001;

                    // Animate bubbles
                    if (coreGroupRef.current.children[0]) {
                        const robotGroup = coreGroupRef.current.children[0];
                        const bubbles = (robotGroup as any).userData?.bubbles;
                        if (bubbles) {
                            bubbles.forEach((b: THREE.Mesh, i: number) => {
                                b.position.y += Math.sin(time * 2 + i) * 0.002;
                                b.lookAt(camera.position);
                            });
                        }
                    }
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
