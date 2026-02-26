import React, { useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

interface QuantumNetworkProps {
    domainIndex?: number;
}

const DOMAIN_CONFIGS = [
    { name: "AI", color: 0x2563eb, shape: "sphere" },       // 0: AI
    { name: "Chatbots", color: 0x4f46e5, shape: "torus" },  // 1: Chatbots
    { name: "AI Reps", color: 0x7c3aed, shape: "knot" },    // 2: AI Reps
    { name: "AX", color: 0x2563eb, shape: "box" },         // 3: Dynamics AX
    { name: "D365", color: 0x4f46e5, shape: "octa" },      // 4: Dynamics 365
    { name: "Web", color: 0x0891b2, shape: "plane" },      // 5: Web Dev
    { name: "ERP", color: 0x0284c7, shape: "cylinder" },   // 6: EDI & ERP
    { name: "Mobile", color: 0x4f46e5, shape: "icosa" },   // 7: Mobile Dev
];

const QuantumNetwork: React.FC<QuantumNetworkProps> = ({ domainIndex = 0 }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const particleCount = 15000;

    // Refs for animation state
    const positionsRef = useRef<Float32Array>(new Float32Array(particleCount * 3));
    const targetPositionsRef = useRef<Float32Array>(new Float32Array(particleCount * 3));
    const colorsRef = useRef<Float32Array>(new Float32Array(particleCount * 3));
    const currentDomainRef = useRef(domainIndex);

    // Generate shapes
    const getShapePoints = (shape: string, count: number) => {
        const pts = new Float32Array(count * 3);
        const tempObj = new THREE.Object3D();

        let sampler: THREE.BufferGeometry;
        switch (shape) {
            case "sphere": sampler = new THREE.SphereGeometry(1.2, 64, 64); break;
            case "torus": sampler = new THREE.TorusGeometry(1, 0.3, 16, 100); break;
            case "knot": sampler = new THREE.TorusKnotGeometry(0.8, 0.25, 128, 16); break;
            case "box": sampler = new THREE.BoxGeometry(1.5, 1.5, 1.5, 20, 20, 20); break;
            case "octa": sampler = new THREE.OctahedronGeometry(1.3, 2); break;
            case "plane": sampler = new THREE.PlaneGeometry(2.5, 2.5, 50, 50); break;
            case "cylinder": sampler = new THREE.CylinderGeometry(0.8, 0.8, 1.8, 32, 32); break;
            case "icosa": sampler = new THREE.IcosahedronGeometry(1.3, 1); break;
            default: sampler = new THREE.SphereGeometry(1.2, 32, 32);
        }

        const posAttr = sampler.getAttribute('position');
        for (let i = 0; i < count; i++) {
            const index = i % (posAttr.count);
            pts[i * 3] = posAttr.getX(index);
            pts[i * 3 + 1] = posAttr.getY(index);
            pts[i * 3 + 2] = posAttr.getZ(index);

            // Add slight randomness for "quantum" feel
            pts[i * 3] += (Math.random() - 0.5) * 0.05;
            pts[i * 3 + 1] += (Math.random() - 0.5) * 0.05;
            pts[i * 3 + 2] += (Math.random() - 0.5) * 0.05;
        }
        sampler.dispose();
        return pts;
    };

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.z = 3;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        const renderPass = new RenderPass(scene, camera);
        const bloomPass = new UnrealBloomPass(new THREE.Vector2(container.clientWidth, container.clientHeight), 0.6, 0.4, 0.9);
        const composer = new EffectComposer(renderer);
        composer.addPass(renderPass);
        composer.addPass(bloomPass);

        // Initial positions and targets
        const currentShape = DOMAIN_CONFIGS[domainIndex].shape;
        const initialPoints = getShapePoints(currentShape, particleCount);
        positionsRef.current.set(initialPoints);
        targetPositionsRef.current.set(initialPoints);

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positionsRef.current, 3));

        // Setup initial colors
        const initialColor = new THREE.Color(DOMAIN_CONFIGS[domainIndex].color);
        for (let i = 0; i < particleCount; i++) {
            colorsRef.current[i * 3] = initialColor.r;
            colorsRef.current[i * 3 + 1] = initialColor.g;
            colorsRef.current[i * 3 + 2] = initialColor.b;
        }
        geometry.setAttribute('color', new THREE.BufferAttribute(colorsRef.current, 3));

        const material = new THREE.PointsMaterial({
            size: 0.008,
            vertexColors: true,
            transparent: true,
            opacity: 0.7,
            blending: THREE.NormalBlending
        });

        const points = new THREE.Points(geometry, material);
        scene.add(points);

        // Background Starfield (Subtle)
        const starsGeom = new THREE.BufferGeometry();
        const starPos = new Float32Array(2000 * 3);
        for (let i = 0; i < 2000; i++) { starPos[i * 3] = (Math.random() - 0.5) * 10; starPos[i * 3 + 1] = (Math.random() - 0.5) * 10; starPos[i * 3 + 2] = (Math.random() - 0.5) * 10; }
        starsGeom.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
        const stars = new THREE.Points(starsGeom, new THREE.PointsMaterial({ color: 0x3b82f6, size: 0.005, transparent: true, opacity: 0.2 }));
        scene.add(stars);

        let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0;
        const onMouseMove = (e: MouseEvent) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        };
        window.addEventListener('mousemove', onMouseMove);

        const clock = new THREE.Clock();
        const animate = () => {
            const requestID = requestAnimationFrame(animate);
            const delta = clock.getDelta();

            // Animation: Morph particles
            const posAttr = geometry.getAttribute('position');
            const colAttr = geometry.getAttribute('color');
            const targetColor = new THREE.Color(DOMAIN_CONFIGS[currentDomainRef.current].color);

            for (let i = 0; i < particleCount; i++) {
                // Morph Position
                const ix = i * 3, iy = i * 3 + 1, iz = i * 3 + 2;
                positionsRef.current[ix] += (targetPositionsRef.current[ix] - positionsRef.current[ix]) * 0.05;
                positionsRef.current[iy] += (targetPositionsRef.current[iy] - positionsRef.current[iy]) * 0.05;
                positionsRef.current[iz] += (targetPositionsRef.current[iz] - positionsRef.current[iz]) * 0.05;

                posAttr.setXYZ(i, positionsRef.current[ix], positionsRef.current[iy], positionsRef.current[iz]);

                // Morph Color
                colorsRef.current[ix] += (targetColor.r - colorsRef.current[ix]) * 0.05;
                colorsRef.current[iy] += (targetColor.g - colorsRef.current[iy]) * 0.05;
                colorsRef.current[iz] += (targetColor.b - colorsRef.current[iz]) * 0.05;
                colAttr.setXYZ(i, colorsRef.current[ix], colorsRef.current[iy], colorsRef.current[iz]);
            }
            posAttr.needsUpdate = true;
            colAttr.needsUpdate = true;

            // Rotation & Parallax
            points.rotation.y += delta * 0.15;
            points.rotation.x += delta * 0.08;
            targetX += (mouseX - targetX) * 0.05;
            targetY += (mouseY - targetY) * 0.05;
            points.position.x = targetX * 0.2;
            points.position.y = -targetY * 0.2;
            stars.position.x = targetX * 0.05;

            // Camera movement
            camera.position.z += (3 + Math.sin(Date.now() * 0.001) * 0.5 - camera.position.z) * 0.05;
            camera.lookAt(scene.position);

            composer.render();
        };
        animate();

        const handleResize = () => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
            composer.setSize(container.clientWidth, container.clientHeight);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('resize', handleResize);
            container.removeChild(renderer.domElement);
            renderer.dispose();
            geometry.dispose();
            material.dispose();
            starsGeom.dispose();
        };
    }, []);

    // Handle domain changes (Morphing trigger)
    useEffect(() => {
        currentDomainRef.current = domainIndex;
        const newTargetPoints = getShapePoints(DOMAIN_CONFIGS[domainIndex].shape, particleCount);
        targetPositionsRef.current.set(newTargetPoints);

        // Trigger a camera pulse on change
        // We could use a ref to animate camera in the loop based on this flag
    }, [domainIndex]);

    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(255,255,255,0.7)_100%)] z-10" />
            <div ref={containerRef} className="w-full h-full opacity-60" />
            {/* Cinematic Noise */}
            <div className="absolute inset-0 opacity-[0.01] pointer-events-none z-20"
                style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }}
            />
        </div>
    );
};

export default QuantumNetwork;
