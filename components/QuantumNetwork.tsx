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
    0x00f2ff, // AI - Electric Cyan
    0x7000ff, // Chatbots - Neon Violet
    0x00ff9d, // AI Reps - Spring Green
    0x0066ff, // AX - Vivid Blue
    0xbd00ff, // D365 - Magenta
    0x00d8ff, // Web - Sky Blue
    0x3decff, // ERP - Bright Cyan
    0x7000ff, // Mobile - Neon Violet
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
    const pointsRef = useRef<THREE.Points | null>(null);
    const geometryRef = useRef<THREE.BufferGeometry | null>(null);

    const particleCount = 8000; // Reduced for SHARPNESS
    const positionsRef = useRef(new Float32Array(particleCount * 3));
    const targetPositionsRef = useRef(new Float32Array(particleCount * 3));
    const colorsRef = useRef(new Float32Array(particleCount * 3));

    const getShapePoints = (index: number) => {
        const pts = new Float32Array(particleCount * 3);
        const shapes = ['sphere', 'torus', 'knot', 'box', 'octa', 'plane', 'cylinder', 'icosa'];
        const shape = shapes[index % shapes.length];

        let sampler: THREE.BufferGeometry;
        switch (shape) {
            case 'sphere': sampler = new THREE.SphereGeometry(1.2, 50, 50); break;
            case 'torus': sampler = new THREE.TorusGeometry(1, 0.3, 16, 100); break;
            case 'knot': sampler = new THREE.TorusKnotGeometry(0.8, 0.25, 128, 16); break;
            case 'box': sampler = new THREE.BoxGeometry(1.5, 1.5, 1.5, 20, 20, 20); break;
            case 'octa': sampler = new THREE.OctahedronGeometry(1.3, 2); break;
            case 'plane': sampler = new THREE.PlaneGeometry(2.5, 2.5, 40, 40); break;
            case 'cylinder': sampler = new THREE.CylinderGeometry(0.8, 0.8, 1.8, 32, 32); break;
            case 'icosa': sampler = new THREE.IcosahedronGeometry(1.3, 1); break;
            default: sampler = new THREE.SphereGeometry(1.2, 32, 32);
        }

        const posAttr = sampler.getAttribute('position');
        for (let i = 0; i < particleCount; i++) {
            const idx = i % posAttr.count;
            pts[i * 3] = posAttr.getX(idx) + (Math.random() - 0.5) * 0.03;
            pts[i * 3 + 1] = posAttr.getY(idx) + (Math.random() - 0.5) * 0.03;
            pts[i * 3 + 2] = posAttr.getZ(idx) + (Math.random() - 0.5) * 0.03;
        }
        sampler.dispose();
        return pts;
    };

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const width = container.clientWidth;
        const height = container.clientHeight;

        const scene = new THREE.Scene();
        sceneRef.current = scene;

        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = 2.8;
        cameraRef.current = camera;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        const composer = new EffectComposer(renderer);
        const renderPass = new RenderPass(scene, camera);
        // Reduced Bloom for Sharpness (v8)
        const bloomPass = new UnrealBloomPass(new THREE.Vector2(width, height), 0.6, 0.4, 0.9);
        composer.addPass(renderPass);
        composer.addPass(bloomPass);
        composerRef.current = composer;

        // Particle System
        const initialPoints = getShapePoints(domainIndex);
        positionsRef.current.set(initialPoints);
        targetPositionsRef.current.set(initialPoints);

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positionsRef.current, 3));

        const initialColor = new THREE.Color(DOMAIN_COLORS[domainIndex % DOMAIN_COLORS.length]);
        for (let i = 0; i < particleCount; i++) {
            colorsRef.current[i * 3] = initialColor.r;
            colorsRef.current[i * 3 + 1] = initialColor.g;
            colorsRef.current[i * 3 + 2] = initialColor.b;
        }
        geometry.setAttribute('color', new THREE.BufferAttribute(colorsRef.current, 3));
        geometryRef.current = geometry;

        // SHARP Material (using a circular texture would be better, but we'll use size & alpha for now)
        const material = new THREE.PointsMaterial({
            size: 0.008,
            vertexColors: true,
            transparent: true,
            opacity: 0.7,
            blending: THREE.AdditiveBlending
        });

        const points = new THREE.Points(geometry, material);
        scene.add(points);
        pointsRef.current = points;

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

            if (geometryRef.current && pointsRef.current) {
                const posAttr = geometryRef.current.getAttribute('position');
                const colAttr = geometryRef.current.getAttribute('color');
                const targetColor = new THREE.Color(DOMAIN_COLORS[domainIndex % DOMAIN_COLORS.length]);

                for (let i = 0; i < particleCount; i++) {
                    const ix = i * 3, iy = i * 3 + 1, iz = i * 3 + 2;
                    positionsRef.current[ix] += (targetPositionsRef.current[ix] - positionsRef.current[ix]) * 0.08;
                    positionsRef.current[iy] += (targetPositionsRef.current[iy] - positionsRef.current[iy]) * 0.08;
                    positionsRef.current[iz] += (targetPositionsRef.current[iz] - positionsRef.current[iz]) * 0.08;
                    posAttr.setXYZ(i, positionsRef.current[ix], positionsRef.current[iy], positionsRef.current[iz]);

                    colorsRef.current[ix] += (targetColor.r - colorsRef.current[ix]) * 0.08;
                    colorsRef.current[iy] += (targetColor.g - colorsRef.current[iy]) * 0.08;
                    colorsRef.current[iz] += (targetColor.b - colorsRef.current[iz]) * 0.08;
                    colAttr.setXYZ(i, colorsRef.current[ix], colorsRef.current[iy], colorsRef.current[iz]);
                }
                posAttr.needsUpdate = true;
                colAttr.needsUpdate = true;

                pointsRef.current.rotation.y += delta * 0.1;
                pointsRef.current.rotation.x += delta * 0.05;
                pointsRef.current.position.x += (mouseX * 0.15 - pointsRef.current.position.x) * 0.1;
                pointsRef.current.position.y += (-mouseY * 0.15 - pointsRef.current.position.y) * 0.1;
            }

            composerRef.current?.render();
        };
        animate();

        const onResize = () => {
            if (!containerRef.current || !cameraRef.current || !rendererRef.current || !composerRef.current) return;
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
            geometry.dispose();
            material.dispose();
        };
    }, []);

    // Handle domain/video changes
    useEffect(() => {
        if (domainIndex !== undefined) {
            targetPositionsRef.current.set(getShapePoints(domainIndex));
        }

        if (videoUrl !== prevVideoUrl.current) {
            setFade(true);
            const timeout = setTimeout(() => {
                if (videoRef.current) {
                    videoRef.current.src = videoUrl;
                    videoRef.current.play();
                }
                setFade(false);
                prevVideoUrl.current = videoUrl;
            }, 300);
            return () => clearTimeout(timeout);
        }
    }, [domainIndex, videoUrl]);

    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#0a0f1e]">
            {/* Background Video Layer - SUBTLE SUBTLE (v8) */}
            <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${fade ? 'opacity-0' : 'opacity-20'}`}
                src={videoUrl}
            />

            {/* CLEAN OVERLAYS - No Blur (v8) */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1e] via-transparent to-[#0a0f1e] z-10 opacity-60" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(10,15,30,0.4)_100%)] z-10" />

            {/* 3D Particle Layer */}
            <div ref={containerRef} className="w-full h-full relative z-20" />

            {/* Pure Black Bottom Mask for Section Transition */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0a0f1e] to-transparent z-25" />
        </div>
    );
};

export default QuantumNetwork;
