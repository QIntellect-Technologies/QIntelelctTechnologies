import { Suspense, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Environment, AdaptiveDpr } from '@react-three/drei';
import { Bloom, DepthOfField, EffectComposer } from '@react-three/postprocessing';
import * as THREE from 'three';
import { DomainOrb } from './DomainOrb';
import { NeuralNetwork, ORB_POSITIONS } from './NeuralNetwork';

interface HeroCanvasProps {
    domainIndex: number;
}

/** Slow cinematic camera that follows mouse */
function CameraRig() {
    const mouse = useRef({ x: 0, y: 0 });
    const target = useRef(new THREE.Vector3(0, 0, 0));

    if (typeof window !== 'undefined') {
        window.onmousemove = (e: MouseEvent) => {
            mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
            mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
        };
    }

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        // Slow cinematic orbit
        const orbitX = Math.sin(t * 0.08) * 0.4;
        const orbitY = Math.cos(t * 0.06) * 0.15;

        // Blend orbit + mouse
        const targetX = orbitX + mouse.current.x * 0.3;
        const targetY = orbitY - mouse.current.y * 0.15;

        state.camera.position.x += (targetX - state.camera.position.x) * 0.025;
        state.camera.position.y += (targetY - state.camera.position.y) * 0.025;
        state.camera.lookAt(0, 0, -3);
    });

    return null;
}

/** Environment lighting and ambient glow */
function SceneLighting({ activeDomainIndex }: { activeDomainIndex: number }) {
    const colors = [
        '#00d4ff', '#a855f7', '#06b6d4', '#3b82f6', '#8b5cf6',
        '#6366f1', '#22d3ee', '#10b981', '#f59e0b', '#ec4899'
    ];
    const activeColor = colors[activeDomainIndex % colors.length];

    return (
        <>
            <ambientLight intensity={0.1} />
            <pointLight position={[0, 5, 2]} intensity={0.8} color={activeColor} />
            <pointLight position={[-5, -3, -2]} intensity={0.4} color="#3b82f6" />
            <pointLight position={[5, 3, -2]} intensity={0.4} color="#a855f7" />
        </>
    );
}

function Scene({ domainIndex }: { domainIndex: number }) {
    return (
        <>
            <CameraRig />
            <SceneLighting activeDomainIndex={domainIndex} />

            {/* Stars deep background */}
            <Stars
                radius={80}
                depth={60}
                count={2000}
                factor={3}
                saturation={0.5}
                fade
                speed={0.4}
            />

            {/* Neural connections */}
            <NeuralNetwork activeDomainIndex={domainIndex} />

            {/* Domain orbs */}
            {ORB_POSITIONS.map((pos, i) => (
                <DomainOrb
                    key={i}
                    index={i}
                    isActive={i === domainIndex}
                    position={pos}
                />
            ))}
        </>
    );
}

export default function HeroCanvas({ domainIndex }: HeroCanvasProps) {
    return (
        <div className="absolute inset-0 z-0" style={{ background: 'radial-gradient(ellipse at center, #0a0f1e 0%, #000000 100%)' }}>
            <Canvas
                camera={{ position: [0, 0, 6], fov: 60, near: 0.1, far: 200 }}
                gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
                dpr={[1, 1.5]}
            >
                <Suspense fallback={null}>
                    <Scene domainIndex={domainIndex} />
                    <AdaptiveDpr pixelated />
                    <EffectComposer>
                        <Bloom
                            intensity={1.5}
                            luminanceThreshold={0.2}
                            luminanceSmoothing={0.9}
                            mipmapBlur
                        />
                        <DepthOfField
                            focusDistance={0.01}
                            focalLength={0.15}
                            bokehScale={2}
                        />
                    </EffectComposer>
                </Suspense>
            </Canvas>
        </div>
    );
}
