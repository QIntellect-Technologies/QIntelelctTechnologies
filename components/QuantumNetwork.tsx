import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

interface QuantumNetworkProps {
    domainIndex?: number;
}

const DOMAIN_COLORS = [
    0x2563eb, // 0: AI - Blue 600
    0x4f46e5, // 1: Chatbots - Indigo 600
    0x7c3aed, // 2: AI Reps - Violet 600
    0x2563eb, // 3: Dynamics AX - Blue 600
    0x4f46e5, // 4: Dynamics 365 - Indigo 600
    0x0891b2, // 5: Web Dev - Cyan 600
    0x0284c7, // 6: EDI & ERP - Sky 600
    0x4f46e5, // 7: Mobile Dev - Indigo 600
];

const QuantumNetwork: React.FC<QuantumNetworkProps> = ({ domainIndex = 0 }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const globeColorRef = useRef(new THREE.Color(DOMAIN_COLORS[0]));

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const width = container.clientWidth;
        const height = container.clientHeight;

        // --- Scene & Camera ---
        const scene = new THREE.Scene();
        scene.background = null;

        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = 2.5;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // --- Post-Processing (Bloom) ---
        const renderScene = new RenderPass(scene, camera);
        const bloomPass = new UnrealBloomPass(
            new THREE.Vector2(width, height),
            0.8, // reduced strength for light theme
            0.3, // radius
            0.9  // threshold - keep it high to only bloom brightest parts
        );

        const composer = new EffectComposer(renderer);
        composer.addPass(renderScene);
        composer.addPass(bloomPass);

        // --- Globe Point Cloud ---
        const globeGroup = new THREE.Group();
        scene.add(globeGroup);

        const pointCount = 10000;
        const positions = new Float32Array(pointCount * 3);
        const colors = new Float32Array(pointCount * 3);
        const sizes = new Float32Array(pointCount);

        for (let i = 0; i < pointCount; i++) {
            const phi = Math.acos(-1 + (2 * i) / pointCount);
            const theta = Math.sqrt(pointCount * Math.PI) * phi;
            const r = 1;

            positions[i * 3] = r * Math.cos(theta) * Math.sin(phi);
            positions[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
            positions[i * 3 + 2] = r * Math.cos(phi);

            // Initial color
            const c = globeColorRef.current;
            colors[i * 3] = c.r;
            colors[i * 3 + 1] = c.g;
            colors[i * 3 + 2] = c.b;
            sizes[i] = Math.random() * 2 + 1;
        }

        const globeGeometry = new THREE.BufferGeometry();
        globeGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        globeGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        globeGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const globeMaterial = new THREE.PointsMaterial({
            size: 0.007,
            vertexColors: true,
            transparent: true,
            opacity: 0.4, // lower opacity for light theme
            blending: THREE.NormalBlending, // use normal blending for light theme
        });

        const globePoints = new THREE.Points(globeGeometry, globeMaterial);
        globeGroup.add(globePoints);

        // --- Dynamic Connections ---
        const connectionsGroup = new THREE.Group();
        globeGroup.add(connectionsGroup);

        const arcs: { curve: THREE.QuadraticBezierCurve3; line: THREE.Line; pulse: THREE.Mesh; progress: number; speed: number }[] = [];
        const arcMaterial = new THREE.LineBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.1 });
        const pulseMaterial = new THREE.MeshBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.6 });

        for (let i = 0; i < 35; i++) {
            const v1 = new THREE.Vector3().setFromSphericalCoords(1.01, Math.random() * Math.PI, Math.random() * Math.PI * 2);
            const v2 = new THREE.Vector3().setFromSphericalCoords(1.01, Math.random() * Math.PI, Math.random() * Math.PI * 2);
            const mid = v1.clone().lerp(v2, 0.5).normalize().multiplyScalar(1.25);
            const curve = new THREE.QuadraticBezierCurve3(v1, mid, v2);

            const points = curve.getPoints(50);
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const line = new THREE.Line(geometry, arcMaterial.clone());
            connectionsGroup.add(line);

            const pulse = new THREE.Mesh(new THREE.SphereGeometry(0.006, 8, 8), pulseMaterial.clone());
            connectionsGroup.add(pulse);

            arcs.push({ curve, line, pulse, progress: Math.random(), speed: 0.002 + Math.random() * 0.002 });
        }

        // --- Interaction ---
        let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0;
        const handleMouseMove = (e: MouseEvent) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        };
        window.addEventListener('mousemove', handleMouseMove);

        // --- Animation Loop ---
        const clock = new THREE.Clock();
        const animate = () => {
            requestAnimationFrame(animate);
            const delta = clock.getDelta();

            globeGroup.rotation.y += delta * 0.08;
            globeGroup.rotation.x += delta * 0.04;

            targetX += (mouseX - targetX) * 0.05;
            targetY += (mouseY - targetY) * 0.05;
            globeGroup.position.x = targetX * 0.12;
            globeGroup.position.y = -targetY * 0.12;

            // Smooth color transition
            const targetColor = new THREE.Color(DOMAIN_COLORS[domainIndex % DOMAIN_COLORS.length]);
            globeColorRef.current.lerp(targetColor, 0.05);

            const colorAttr = globeGeometry.getAttribute('color') as THREE.BufferAttribute;
            for (let i = 0; i < pointCount; i++) {
                colorAttr.setXYZ(i, globeColorRef.current.r, globeColorRef.current.g, globeColorRef.current.b);
            }
            colorAttr.needsUpdate = true;

            arcs.forEach(arc => {
                arc.progress += arc.speed;
                if (arc.progress >= 1) arc.progress = 0;
                arc.pulse.position.copy(arc.curve.getPointAt(arc.progress));
                (arc.pulse.material as THREE.MeshBasicMaterial).color.copy(globeColorRef.current);
                (arc.line.material as THREE.LineBasicMaterial).color.copy(globeColorRef.current);
            });

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
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            container.removeChild(renderer.domElement);
            renderer.dispose();
            globeGeometry.dispose();
            globeMaterial.dispose();
            arcs.forEach(arc => {
                arc.pulse.geometry.dispose();
                (arc.pulse.material as THREE.Material).dispose();
                arc.line.geometry.dispose();
                (arc.line.material as THREE.Material).dispose();
            });
        };
    }, [domainIndex]);

    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-slate-50">
            {/* Soft Light Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(248,250,252,0.8)_100%)] z-10" />
            <div ref={containerRef} className="w-full h-full opacity-60" />
            <div className="absolute inset-0 opacity-[0.015] pointer-events-none z-20"
                style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }}
            />
        </div>
    );
};

export default QuantumNetwork;
