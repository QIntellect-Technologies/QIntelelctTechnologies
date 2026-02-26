import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';

const QuantumNetwork: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

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
            1.5, // strength
            0.4, // radius
            0.85 // threshold
        );

        const composer = new EffectComposer(renderer);
        composer.addPass(renderScene);
        composer.addPass(bloomPass);

        // --- Globe Point Cloud ---
        const globeGroup = new THREE.Group();
        scene.add(globeGroup);

        const pointCount = 12000;
        const positions = new Float32Array(pointCount * 3);
        const colors = new Float32Array(pointCount * 3);
        const sizes = new Float32Array(pointCount);

        const color1 = new THREE.Color(0x3b82f6); // blue-500
        const color2 = new THREE.Color(0x8b5cf6); // violet-500

        for (let i = 0; i < pointCount; i++) {
            // Spherical distribution
            const phi = Math.acos(-1 + (2 * i) / pointCount);
            const theta = Math.sqrt(pointCount * Math.PI) * phi;
            const r = 1;

            const x = r * Math.cos(theta) * Math.sin(phi);
            const y = r * Math.sin(theta) * Math.sin(phi);
            const z = r * Math.cos(phi);

            // Add some noise to make it look "quantum"
            const noise = (Math.random() - 0.5) * 0.02;
            positions[i * 3] = x + noise;
            positions[i * 3 + 1] = y + noise;
            positions[i * 3 + 2] = z + noise;

            const mixedColor = color1.clone().lerp(color2, Math.random());
            colors[i * 3] = mixedColor.r;
            colors[i * 3 + 1] = mixedColor.g;
            colors[i * 3 + 2] = mixedColor.b;
            sizes[i] = Math.random() * 2 + 1;
        }

        const globeGeometry = new THREE.BufferGeometry();
        globeGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        globeGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        globeGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const globeMaterial = new THREE.PointsMaterial({
            size: 0.008,
            vertexColors: true,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending,
        });

        const globePoints = new THREE.Points(globeGeometry, globeMaterial);
        globeGroup.add(globePoints);

        // --- Dynamic Connections & Pulses ---
        const connectionsGroup = new THREE.Group();
        globeGroup.add(connectionsGroup);

        const pulseMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        const arcs: { curve: THREE.QuadraticBezierCurve3; line: THREE.Line; pulse: THREE.Mesh; progress: number; speed: number }[] = [];

        for (let i = 0; i < 40; i++) {
            const startPhi = Math.random() * Math.PI * 2;
            const startTheta = Math.random() * Math.PI;
            const endPhi = Math.random() * Math.PI * 2;
            const endTheta = Math.random() * Math.PI;

            const v1 = new THREE.Vector3().setFromSphericalCoords(1.01, startTheta, startPhi);
            const v2 = new THREE.Vector3().setFromSphericalCoords(1.01, endTheta, endPhi);

            const mid = v1.clone().lerp(v2, 0.5).normalize().multiplyScalar(1.3);
            const curve = new THREE.QuadraticBezierCurve3(v1, mid, v2);

            const points = curve.getPoints(50);
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const line = new THREE.Line(geometry, new THREE.LineBasicMaterial({
                color: 0x3b82f6,
                transparent: true,
                opacity: 0.2
            }));
            connectionsGroup.add(line);

            const pulseGeometry = new THREE.SphereGeometry(0.008, 8, 8);
            const pulse = new THREE.Mesh(pulseGeometry, pulseMaterial);
            connectionsGroup.add(pulse);

            arcs.push({
                curve,
                line,
                pulse,
                progress: Math.random(),
                speed: 0.002 + Math.random() * 0.003
            });
        }

        // --- Starfield ---
        const starCount = 2000;
        const starPositions = new Float32Array(starCount * 3);
        for (let i = 0; i < starCount; i++) {
            starPositions[i * 3] = (Math.random() - 0.5) * 10;
            starPositions[i * 3 + 1] = (Math.random() - 0.5) * 10;
            starPositions[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
        const starGeometry = new THREE.BufferGeometry();
        starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
        const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.005, transparent: true, opacity: 0.4 });
        const stars = new THREE.Points(starGeometry, starMaterial);
        scene.add(stars);

        // --- Interaction ---
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;

        const handleMouseMove = (event: MouseEvent) => {
            mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
            mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
        };

        window.addEventListener('mousemove', handleMouseMove);

        // --- Animation Loop ---
        const clock = new THREE.Clock();

        const animate = () => {
            requestAnimationFrame(animate);
            const delta = clock.getDelta();

            // Rotation
            globeGroup.rotation.y += delta * 0.1;
            globeGroup.rotation.x += delta * 0.05;

            // Parallax
            targetX += (mouseX - targetX) * 0.05;
            targetY += (mouseY - targetY) * 0.05;
            globeGroup.position.x = targetX * 0.15;
            globeGroup.position.y = -targetY * 0.15;
            stars.position.x = targetX * 0.05;
            stars.position.y = -targetY * 0.05;

            // Update Pulses
            arcs.forEach(arc => {
                arc.progress += arc.speed;
                if (arc.progress >= 1) arc.progress = 0;
                const pos = arc.curve.getPointAt(arc.progress);
                arc.pulse.position.copy(pos);
            });

            composer.render();
        };

        animate();

        // --- Resize ---
        const handleResize = () => {
            const w = container.clientWidth;
            const h = container.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
            composer.setSize(w, h);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            container.removeChild(renderer.domElement);
            renderer.dispose();
            globeGeometry.dispose();
            globeMaterial.dispose();
            starGeometry.dispose();
            starMaterial.dispose();
            pulseMaterial.dispose();
            arcs.forEach(arc => {
                arc.pulse.geometry.dispose();
                arc.line.geometry.dispose();
            });
        };
    }, []);

    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#0a0f1e]">
            {/* Dark Cinematic Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(10,15,30,0.4)_100%)] z-10" />

            <div ref={containerRef} className="w-full h-full opacity-80" />

            {/* Mesh Noise Texture for Film Grain Feel */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-20"
                style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }}
            />
        </div>
    );
};

export default QuantumNetwork;
