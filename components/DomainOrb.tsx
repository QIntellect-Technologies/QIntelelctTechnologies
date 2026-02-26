import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, MeshWobbleMaterial, Torus, Sphere, Octahedron, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';

const DOMAIN_CONFIGS = [
    { name: 'AI', color: '#00d4ff', emissive: '#003d5c', geometry: 'icosahedron', detail: 3 },
    { name: 'Chatbots', color: '#a855f7', emissive: '#3b0764', geometry: 'sphere', detail: 0 },
    { name: 'AI Rep', color: '#06b6d4', emissive: '#0c4a6e', geometry: 'octahedron', detail: 1 },
    { name: 'Dynamics AX', color: '#3b82f6', emissive: '#1e3a8a', geometry: 'torus', detail: 0 },
    { name: 'QIntellect', color: '#8b5cf6', emissive: '#4c1d95', geometry: 'icosahedron', detail: 1 },
    { name: 'Q-Engine', color: '#6366f1', emissive: '#312e81', geometry: 'sphere', detail: 0 },
    { name: 'Dynamics 365', color: '#22d3ee', emissive: '#164e63', geometry: 'octahedron', detail: 0 },
    { name: 'Web Dev', color: '#10b981', emissive: '#064e3b', geometry: 'icosahedron', detail: 2 },
    { name: 'EDI & ERP', color: '#f59e0b', emissive: '#78350f', geometry: 'torus', detail: 0 },
    { name: 'Mobile Dev', color: '#ec4899', emissive: '#500724', geometry: 'sphere', detail: 0 },
];

interface DomainOrbProps {
    index: number;
    isActive: boolean;
    position: [number, number, number];
}

function OrbGeometry({ type, detail }: { type: string; detail: number }) {
    if (type === 'torus') return <torusGeometry args={[0.55, 0.22, 16, 60]} />;
    if (type === 'octahedron') return <octahedronGeometry args={[0.7, detail]} />;
    if (type === 'icosahedron') return <icosahedronGeometry args={[0.65, detail]} />;
    return <sphereGeometry args={[0.65, 48, 48]} />;
}

export function DomainOrb({ index, isActive, position }: DomainOrbProps) {
    const meshRef = useRef<THREE.Mesh>(null!);
    const glowRef = useRef<THREE.Mesh>(null!);
    const ringRef = useRef<THREE.Mesh>(null!);
    const config = DOMAIN_CONFIGS[index % DOMAIN_CONFIGS.length];
    const color = new THREE.Color(config.color);
    const emissive = new THREE.Color(config.emissive);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (!meshRef.current) return;

        // Pulse glow when active
        const pulse = isActive ? 1 + Math.sin(t * 6) * 0.25 : 1;
        meshRef.current.scale.setScalar(pulse);

        // Spin the orbital ring
        if (ringRef.current) {
            ringRef.current.rotation.x = t * 0.5;
            ringRef.current.rotation.z = t * 0.3;
        }

        // Glow sphere opacity
        if (glowRef.current) {
            const mat = glowRef.current.material as THREE.MeshBasicMaterial;
            mat.opacity = isActive ? 0.25 + Math.sin(t * 4) * 0.1 : 0.05;
        }
    });

    return (
        <Float
            speed={1.5 + (index % 3) * 0.5}
            rotationIntensity={isActive ? 0.8 : 0.3}
            floatIntensity={isActive ? 1.2 : 0.6}
        >
            <group position={position}>
                {/* Outer glow sphere */}
                <mesh ref={glowRef}>
                    <sphereGeometry args={[1.1, 32, 32]} />
                    <meshBasicMaterial
                        color={config.color}
                        transparent
                        opacity={0.05}
                        side={THREE.BackSide}
                    />
                </mesh>

                {/* Main orb */}
                <mesh ref={meshRef}>
                    <OrbGeometry type={config.geometry} detail={config.detail} />
                    <MeshDistortMaterial
                        color={config.color}
                        emissive={config.emissive}
                        emissiveIntensity={isActive ? 2.5 : 0.6}
                        metalness={0.1}
                        roughness={0.05}
                        distort={isActive ? 0.35 : 0.15}
                        speed={isActive ? 6 : 2}
                        transparent
                        opacity={0.92}
                    />
                </mesh>

                {/* Orbital ring */}
                <mesh ref={ringRef}>
                    <torusGeometry args={[1.0, 0.006, 16, 120]} />
                    <meshBasicMaterial
                        color={config.color}
                        transparent
                        opacity={isActive ? 0.8 : 0.2}
                    />
                </mesh>

                {/* Secondary orbital ring */}
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[0.88, 0.004, 16, 100]} />
                    <meshBasicMaterial
                        color={config.color}
                        transparent
                        opacity={isActive ? 0.5 : 0.1}
                    />
                </mesh>
            </group>
        </Float>
    );
}
