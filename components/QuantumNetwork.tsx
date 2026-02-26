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
    0x5E62FF, // Nebula Indigo
    0x9966FF, // Nebula Purple
    0x00f2ff, // Electric Cyan
    0x7000ff, // Neon Violet
    0x00ff9d, // Spring Green
    0x0066ff, // Vivid Blue
    0xbd00ff, // Magenta
    0x5E62FF, // Nebula Indigo
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
    const latticeRef = useRef<THREE.LineSegments | null>(null);
    const ringsRef = useRef<THREE.Group | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const width = container.clientWidth;
        const height = container.clientHeight;

        const scene = new THREE.Scene();
        sceneRef.current = scene;

        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = 2.4; // Precision distance
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

        // --- Core Group ---
        const coreGroup = new THREE.Group();
        scene.add(coreGroup);
        coreGroupRef.current = coreGroup;

        const createDomainModel = (index: number) => {
            let geo: THREE.BufferGeometry;

            // Domain-Specific Models
            if (index === 0) {
                // AI: Neural Network Brain
                geo = new THREE.IcosahedronGeometry(0.85, 3);
            } else if (index === 1) {
                // Chatbots: Conversational Orb (Double Torus structure)
                geo = new THREE.TorusKnotGeometry(0.65, 0.2, 120, 24);
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
            const color = DOMAIN_COLORS[index % DOMAIN_COLORS.length];
            const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({
                color: color,
                transparent: true,
                opacity: 0.5
            }));

            // Glowing nodes
            const nodes = new THREE.Points(geo, new THREE.PointsMaterial({
                color: color,
                size: 0.02,
                transparent: true,
                opacity: 0.8,
                blending: THREE.AdditiveBlending
            }));
            line.add(nodes);

            return line;
        };

        const initialModel = createDomainModel(domainIndex);
        coreGroup.add(initialModel);
        latticeRef.current = initialModel;

        // --- Precision Orbital Rings (Downscaled) ---
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

        // --- Animation Loop ---
        let mouseX = 0, mouseY = 0;
        const onMouseMove = (e: MouseEvent) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        };
        window.addEventListener('mousemove', onMouseMove);

        const clock = new THREE.Clock();
        const animate = () => {
            requestAnimationFrame(animate);
            const delta = clock.getDelta();

            if (coreGroupRef.current) {
                coreGroupRef.current.rotation.y += delta * 0.25; // Smoother, faster auto-motion
                coreGroupRef.current.rotation.x += delta * 0.1;
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
        };
    }, []);

    // Morph Logic
    useEffect(() => {
        if (coreGroupRef.current && latticeRef.current) {
            coreGroupRef.current.remove(latticeRef.current);
            latticeRef.current.children.forEach(c => {
                if (c instanceof THREE.Points) (c.material as THREE.Material).dispose();
            });
            latticeRef.current.geometry.dispose();
            (latticeRef.current.material as THREE.Material).dispose();

            const createDomainModel = (index: number) => {
                let geo: THREE.BufferGeometry;
                if (index === 0) geo = new THREE.IcosahedronGeometry(0.85, 3);
                else if (index === 1) geo = new THREE.TorusKnotGeometry(0.65, 0.2, 120, 24);
                else {
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
                const color = DOMAIN_COLORS[index % DOMAIN_COLORS.length];
                const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({
                    color: color, transparent: true, opacity: 0.5
                }));
                const nodes = new THREE.Points(geo, new THREE.PointsMaterial({
                    color: color, size: 0.02, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending
                }));
                line.add(nodes);
                return line;
            };

            const nextLattice = createDomainModel(domainIndex);
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
            {/* Background Video Layer - Subtle */}
            <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${fade ? 'opacity-0' : 'opacity-30'}`}
                src={videoUrl}
            />

            {/* 3D PERSPECTIVE GRID */}
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

            {/* NEBULA AMBIENT LIGHTS */}
            <div className="absolute top-[10%] right-[15%] w-[35%] h-[35%] bg-[#5E62FF]/10 blur-[140px] rounded-full z-10" />
            <div className="absolute bottom-[15%] left-[10%] w-[30%] h-[30%] bg-[#9966FF]/10 blur-[120px] rounded-full z-10" />

            {/* MAIN 3D CANVAS LAYER */}
            <div ref={containerRef} className="w-full h-full relative z-20" />

            {/* SCIFI SCANLINES */}
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
