import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ORB_POSITIONS: [number, number, number][] = [
    [-4.5, 1.2, -3],   // AI
    [-3.2, -1.0, -2],   // Chatbots
    [-1.8, 2.0, -4],   // AI Rep
    [-0.5, -1.8, -2.5], // Dynamics AX
    [1.0, 1.5, -3],   // QIntellect
    [2.5, -0.5, -2],   // Q-Engine
    [3.5, 2.0, -4],   // Dynamics 365
    [4.8, -1.0, -3],   // Web Dev
    [-2.5, 3.0, -5],   // EDI & ERP
    [1.5, -3.0, -4],   // Mobile Dev
];

const CONNECTIONS = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5],
    [5, 6], [6, 7], [7, 8], [8, 9], [9, 0],
    [0, 4], [1, 5], [2, 6], [3, 7], [4, 8],
];

interface DataLineProps {
    start: number;
    end: number;
    active: boolean;
}

function DataLine({ start, end, active }: DataLineProps) {
    const particleRef = useRef<THREE.Mesh>(null!);
    const lineRef = useRef<THREE.Line>(null!);
    const progress = useRef(Math.random());

    const { points, geometry } = useMemo(() => {
        const s = new THREE.Vector3(...ORB_POSITIONS[start]);
        const e = new THREE.Vector3(...ORB_POSITIONS[end]);
        const mid = s.clone().lerp(e, 0.5).add(new THREE.Vector3(0, (Math.random() - 0.5) * 1.5, 0));
        const curve = new THREE.QuadraticBezierCurve3(s, mid, e);
        const pts = curve.getPoints(50);
        const geo = new THREE.BufferGeometry().setFromPoints(pts);
        return { points: pts, geometry: geo };
    }, [start, end]);

    const lineMaterial = useMemo(() =>
        new THREE.LineBasicMaterial({
            color: new THREE.Color('#334155'),
            transparent: true,
            opacity: 0.08,
        }),
        []
    );

    const lineObject = useMemo(() => new THREE.Line(geometry, lineMaterial), [geometry, lineMaterial]);

    useFrame((_, delta) => {
        progress.current = (progress.current + delta * (active ? 0.7 : 0.2)) % 1;

        if (particleRef.current) {
            const idx = Math.floor(progress.current * (points.length - 1));
            const pt = points[Math.min(idx, points.length - 1)];
            particleRef.current.position.set(pt.x, pt.y, pt.z);
            (particleRef.current.material as THREE.MeshBasicMaterial).color.set(
                active ? '#00ffff' : '#475569'
            );
        }

        lineMaterial.opacity = active ? 0.4 : 0.06;
        lineMaterial.color.set(active ? '#00d4ff' : '#334155');
    });

    return (
        <group>
            <primitive object={lineObject} ref={lineRef} />
            <mesh ref={particleRef}>
                <sphereGeometry args={[0.028, 6, 6]} />
                <meshBasicMaterial color="#00ffff" />
            </mesh>
        </group>
    );
}

interface NeuralNetworkProps {
    activeDomainIndex: number;
}

export function NeuralNetwork({ activeDomainIndex }: NeuralNetworkProps) {
    return (
        <group>
            {CONNECTIONS.map(([s, e], i) => (
                <DataLine
                    key={`dl-${i}`}
                    start={s}
                    end={e}
                    active={s === activeDomainIndex || e === activeDomainIndex}
                />
            ))}
        </group>
    );
}

export { ORB_POSITIONS };
