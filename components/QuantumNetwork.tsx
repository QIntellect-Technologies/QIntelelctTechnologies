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
    0x5E62FF, // 0: AI - Nebula Indigo
    0x9966FF, // 1: Chatbots - Nebula Purple
    0x00f2ff, // 2: AI Reps - Electric Cyan
    0x7000ff, // 3: AX - Neon Violet
    0x00ff9d, // 4: CRM - Spring Green
    0x0066ff, // 5: Web - Vivid Blue
    0xbd00ff, // 6: ERP - Magenta
    0xff6a00, // 7: Mobile - Amber
    0x00e5ff, // 8: QIntellect - Ice Cyan
    0xff003c, // 9: AI Infra - Crimson
];

// ─────────────────────────────────────────────────────────
//  DOMAIN 0 — Artificial Intelligence: Neural Brain
// ─────────────────────────────────────────────────────────
const createAIBrainModel = (color: number) => {
    const group = new THREE.Group();
    const nodes: THREE.Mesh[] = [];
    const lineSegs: THREE.LineSegments[] = [];

    // Central brain sphere (wireframe)
    const brainGeo = new THREE.IcosahedronGeometry(0.7, 3);
    const brainMat = new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.25 });
    const brain = new THREE.Mesh(brainGeo, brainMat);
    group.add(brain);

    // Synapse node points scattered around brain
    const nodePositions = brainGeo.attributes.position;
    const nodeCount = Math.min(nodePositions.count, 80);
    const nodeMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending });
    for (let i = 0; i < nodeCount; i += 3) {
        const geo = new THREE.SphereGeometry(0.012, 8, 8);
        const node = new THREE.Mesh(geo, nodeMat.clone());
        node.position.set(
            nodePositions.getX(i),
            nodePositions.getY(i),
            nodePositions.getZ(i)
        );
        group.add(node);
        nodes.push(node);
    }

    // Synapse connection lines
    for (let i = 0; i < 30; i++) {
        const a = nodes[Math.floor(Math.random() * nodes.length)];
        const b = nodes[Math.floor(Math.random() * nodes.length)];
        if (!a || !b) continue;
        const pts = [a.position.clone(), b.position.clone()];
        const lGeo = new THREE.BufferGeometry().setFromPoints(pts);
        const lMat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.15, blending: THREE.AdditiveBlending });
        const line = new THREE.LineSegments(lGeo, lMat);
        group.add(line);
        lineSegs.push(line);
    }

    // Outer glow shell
    const glowGeo = new THREE.SphereGeometry(0.85, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.04, side: THREE.BackSide, blending: THREE.AdditiveBlending });
    group.add(new THREE.Mesh(glowGeo, glowMat));

    (group as any).userData = { isAIBrain: true, brain, nodes, lineSegs };
    return group;
};

// ─────────────────────────────────────────────────────────
//  DOMAIN 1 — Chatbots: Procedural Talking Robot Head
// ─────────────────────────────────────────────────────────
const createChatbotModel = (color: number) => {
    const group = new THREE.Group();
    const headGroup = new THREE.Group();
    group.add(headGroup);

    const headGeo = new THREE.SphereGeometry(0.48, 64, 64);
    const headMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: color, emissiveIntensity: 0.2, roughness: 0.2, metalness: 0.8 });
    headGroup.add(new THREE.Mesh(headGeo, headMat));

    const glowMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.4 });
    headGroup.add(new THREE.Mesh(new THREE.SphereGeometry(0.4, 32, 32), glowMat));

    const visorGeo = new THREE.SphereGeometry(0.5, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.6);
    const visor = new THREE.Mesh(visorGeo, new THREE.MeshBasicMaterial({ color: 0x050505, transparent: true, opacity: 0.9 }));
    visor.rotation.x = -Math.PI / 2.5;
    visor.position.z = 0.05;
    headGroup.add(visor);

    const barBase = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, side: THREE.DoubleSide });
    const eyeL = new THREE.Mesh(new THREE.PlaneGeometry(0.15, 0.04), barBase.clone());
    eyeL.position.set(-0.18, 0.1, 0.52);
    headGroup.add(eyeL);
    const eyeR = new THREE.Mesh(new THREE.PlaneGeometry(0.15, 0.04), barBase.clone());
    eyeR.position.set(0.18, 0.1, 0.52);
    headGroup.add(eyeR);

    const mouthMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, side: THREE.DoubleSide });
    const mouth = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 0.03), mouthMat);
    mouth.position.set(0, -0.15, 0.52);
    headGroup.add(mouth);

    const createRing = (radius: number, rotX: number, opacity: number) => {
        const r = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.005, 16, 100), new THREE.MeshBasicMaterial({ color, transparent: true, opacity, blending: THREE.AdditiveBlending }));
        r.rotation.x = rotX;
        return r;
    };
    const ring1 = createRing(0.7, Math.PI / 2.2, 0.25);
    const ring2 = createRing(0.85, -Math.PI / 3, 0.12);
    group.add(ring1, ring2);

    (group as any).userData = { isChatbot: true, headGroup, eyeL, eyeR, mouth, ring1, ring2 };
    return group;
};

// ─────────────────────────────────────────────────────────
//  DOMAIN 2 — AI Customer Rep: Holographic Human + Ripple Rings
// ─────────────────────────────────────────────────────────
const createAIRepModel = (color: number) => {
    const group = new THREE.Group();
    const rings: { mesh: THREE.Mesh; delay: number }[] = [];

    // Head sphere
    const headGeo = new THREE.SphereGeometry(0.18, 32, 32);
    const headMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending, wireframe: true });
    const head = new THREE.Mesh(headGeo, headMat);
    head.position.y = 0.65;
    group.add(head);

    // Body silhouette (capsule-like using cylinders)
    const bodyCyl = new THREE.CylinderGeometry(0.15, 0.22, 0.65, 16, 1, true);
    const bodyMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.4, side: THREE.DoubleSide, wireframe: true, blending: THREE.AdditiveBlending });
    const body = new THREE.Mesh(bodyCyl, bodyMat);
    body.position.y = 0.15;
    group.add(body);

    // Energy ripple rings
    for (let i = 0; i < 5; i++) {
        const rGeo = new THREE.TorusGeometry(0.3 + i * 0.18, 0.004, 8, 80);
        const rMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.0, blending: THREE.AdditiveBlending });
        const ring = new THREE.Mesh(rGeo, rMat);
        ring.rotation.x = Math.PI / 2;
        ring.position.y = -0.4;
        group.add(ring);
        rings.push({ mesh: ring, delay: i * 0.4 });
    }

    // Outer wireframe human aura
    const auraGeo = new THREE.CapsuleGeometry(0.3, 0.8, 8, 16);
    const auraMat = new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.08 });
    const aura = new THREE.Mesh(auraGeo, auraMat);
    group.add(aura);

    (group as any).userData = { isAIRep: true, head, body, rings, aura };
    return group;
};

// ─────────────────────────────────────────────────────────
//  DOMAIN 3 — Microsoft Dynamics AX: Gears + Data Cube
// ─────────────────────────────────────────────────────────
const createDynamicsAxModel = (color: number) => {
    const group = new THREE.Group();
    const gears: THREE.Mesh[] = [];

    // Large center gear
    const gear1Geo = new THREE.TorusGeometry(0.45, 0.07, 8, 12);
    const gearMat = new THREE.MeshBasicMaterial({ color, wireframe: false, transparent: true, opacity: 0.6 });
    const gear1 = new THREE.Mesh(gear1Geo, gearMat);
    group.add(gear1);
    gears.push(gear1);

    // Gear teeth (small spheres around the ring)
    for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        const tooth = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.07, 0.05), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.8 }));
        tooth.position.set(Math.cos(angle) * 0.5, Math.sin(angle) * 0.5, 0);
        tooth.rotation.z = angle;
        gear1.add(tooth);
    }

    // Small satellite gear
    const gear2Geo = new THREE.TorusGeometry(0.22, 0.05, 8, 9);
    const gear2 = new THREE.Mesh(gear2Geo, new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.5 }));
    gear2.position.set(0.72, 0, 0);
    for (let i = 0; i < 9; i++) {
        const angle = (i / 9) * Math.PI * 2;
        const tooth = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.05, 0.04), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.7 }));
        tooth.position.set(Math.cos(angle) * 0.27, Math.sin(angle) * 0.27, 0);
        tooth.rotation.z = angle;
        gear2.add(tooth);
    }
    group.add(gear2);
    gears.push(gear2);

    // Floating data cube
    const cubeGeo = new THREE.BoxGeometry(0.3, 0.3, 0.3);
    const cubeEdges = new THREE.EdgesGeometry(cubeGeo);
    const cube = new THREE.LineSegments(cubeEdges, new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.8 }));
    cube.position.set(-0.72, 0.3, 0.1);
    group.add(cube);

    // Data particles  
    const ptGeo = new THREE.BufferGeometry();
    const ptPositions: number[] = [];
    for (let i = 0; i < 80; i++) {
        ptPositions.push((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 0.5);
    }
    ptGeo.setAttribute('position', new THREE.Float32BufferAttribute(ptPositions, 3));
    const pts = new THREE.Points(ptGeo, new THREE.PointsMaterial({ color, size: 0.02, transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending }));
    group.add(pts);

    (group as any).userData = { isDynamicsAx: true, gear1, gear2, cube, pts };
    return group;
};

// ─────────────────────────────────────────────────────────
//  DOMAIN 4 — Dynamics 365 CRM: Hub + Orbiting Data Satellites
// ─────────────────────────────────────────────────────────
const createCRMModel = (color: number) => {
    const group = new THREE.Group();
    const satellites: { pivot: THREE.Group; speed: number }[] = [];

    // Central CRM hub
    const hubGeo = new THREE.SphereGeometry(0.25, 32, 32);
    const hubMat = new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.5, metalness: 0.8, roughness: 0.2 });
    const hub = new THREE.Mesh(hubGeo, hubMat);
    group.add(hub);

    // Pulsing outer shell
    const shellGeo = new THREE.SphereGeometry(0.35, 32, 32);
    const shell = new THREE.Mesh(shellGeo, new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.15 }));
    group.add(shell);

    // 6 Orbiting satellite nodes
    const orbitConfigs = [
        { radius: 0.65, axis: new THREE.Vector3(0, 1, 0), speed: 0.8 },
        { radius: 0.75, axis: new THREE.Vector3(1, 0, 0), speed: -0.6 },
        { radius: 0.6, axis: new THREE.Vector3(0.5, 0.5, 0).normalize(), speed: 1.0 },
        { radius: 0.8, axis: new THREE.Vector3(0, 1, 0.3).normalize(), speed: -0.5 },
        { radius: 0.55, axis: new THREE.Vector3(1, 0.5, 0).normalize(), speed: 0.7 },
        { radius: 0.7, axis: new THREE.Vector3(0.3, 0, 1).normalize(), speed: -0.9 },
    ];

    orbitConfigs.forEach(({ radius, axis, speed }, i) => {
        const pivot = new THREE.Group();
        // Orbit ring
        const orbitRingGeo = new THREE.TorusGeometry(radius, 0.003, 8, 80);
        const orbitLine = new THREE.Mesh(orbitRingGeo, new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.12 }));
        const axisNorm = axis.clone().normalize();
        orbitLine.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), axisNorm);
        group.add(orbitLine);

        // Satellite
        const satGeo = new THREE.OctahedronGeometry(0.06, 0);
        const satMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending });
        const sat = new THREE.Mesh(satGeo, satMat);
        sat.position.set(radius, 0, 0);
        pivot.add(sat);

        // Connection line from hub to sat
        const pts = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(radius, 0, 0)];
        const connLine = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.2 }));
        pivot.add(connLine);

        pivot.setRotationFromAxisAngle(axisNorm, (i / 6) * Math.PI * 2);
        group.add(pivot);
        satellites.push({ pivot, speed });
    });

    (group as any).userData = { isCRM: true, hub, shell, satellites };
    return group;
};

// ─────────────────────────────────────────────────────────
//  DOMAIN 5 — Web Development: Code Matrix
// ─────────────────────────────────────────────────────────
const createWebDevModel = (color: number) => {
    const group = new THREE.Group();
    const codeStrips: THREE.Group[] = [];

    // Digital Terminal Frame
    const frameGeo = new THREE.BoxGeometry(1.6, 1.0, 0.1);
    const frameLine = new THREE.LineSegments(new THREE.EdgesGeometry(frameGeo), new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.4 }));
    group.add(frameLine);

    // Header bar
    const headerGeo = new THREE.PlaneGeometry(1.56, 0.08);
    const headerMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.3, side: THREE.DoubleSide });
    const header = new THREE.Mesh(headerGeo, headerMat);
    header.position.set(0, 0.44, 0.06);
    group.add(header);

    // 3 window dots
    [-0.68, -0.6, -0.52].forEach((x, i) => {
        const dotMat = new THREE.MeshBasicMaterial({ color: i === 0 ? 0xff5f57 : i === 1 ? 0xffbd2e : 0x28c840, transparent: true, opacity: 0.9 });
        const dot = new THREE.Mesh(new THREE.CircleGeometry(0.025, 16), dotMat);
        dot.position.set(x, 0.44, 0.07);
        group.add(dot);
    });

    // Scrolling Code Strips
    const charGeo = new THREE.PlaneGeometry(0.07, 0.07);
    for (let i = 0; i < 18; i++) {
        const strip = new THREE.Group();
        const x = (i - 9) * 0.09 + 0.045;
        const speed = 0.4 + Math.random() * 1.4;
        for (let j = 0; j < 14; j++) {
            const charMat = new THREE.MeshBasicMaterial({
                color, transparent: true,
                opacity: 0.05 + (j / 14) * 0.75,
                blending: THREE.AdditiveBlending, side: THREE.DoubleSide
            });
            const char = new THREE.Mesh(charGeo, charMat);
            char.position.set(0, (j - 7) * 0.085, 0);
            strip.add(char);
        }
        strip.position.set(x, 0, 0.06);
        (strip as any).userData = { speed, startY: Math.random() * 0.5 };
        group.add(strip);
        codeStrips.push(strip);
    }

    // Central core (rotating icosahedron)
    const coreGeo = new THREE.IcosahedronGeometry(0.12, 0);
    const core = new THREE.Mesh(coreGeo, new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.9 }));
    group.add(core);

    (group as any).userData = { isWebDev: true, strips: codeStrips, core };
    return group;
};

// ─────────────────────────────────────────────────────────
//  DOMAIN 6 — EDI & ERP: Supply Chain Grid
// ─────────────────────────────────────────────────────────
const createERPModel = (color: number) => {
    const group = new THREE.Group();
    const nodeBoxes: THREE.Mesh[] = [];
    const flowLines: { line: THREE.Line; progress: number; speed: number }[] = [];
    const nodePositionsList: THREE.Vector3[] = [];

    // 3x3 grid of supply chain nodes
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            const pos = new THREE.Vector3((col - 1) * 0.65, (row - 1) * 0.55, 0);
            nodePositionsList.push(pos.clone());
            const box = new THREE.Mesh(
                new THREE.BoxGeometry(0.14, 0.14, 0.14),
                new THREE.MeshBasicMaterial({ color, wireframe: false, transparent: true, opacity: 0.5 })
            );
            const boxEdge = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(0.14, 0.14, 0.14)), new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.9 }));
            box.position.copy(pos);
            boxEdge.position.copy(pos);
            group.add(box, boxEdge);
            nodeBoxes.push(box);
        }
    }

    // Animated data flow lines between nodes
    const edges = [[0, 1], [1, 2], [3, 4], [4, 5], [6, 7], [7, 8], [0, 3], [3, 6], [1, 4], [4, 7], [2, 5], [5, 8], [0, 4], [4, 8]];
    edges.forEach(([a, b]) => {
        const pts = [nodePositionsList[a], nodePositionsList[b]];
        const geo = new THREE.BufferGeometry().setFromPoints(pts);
        const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.2 });
        const line = new THREE.Line(geo, mat);
        group.add(line);
        flowLines.push({ line, progress: Math.random(), speed: 0.4 + Math.random() * 0.6 });
    });

    // Moving data packet (small glowing sphere)
    const packetGeo = new THREE.SphereGeometry(0.04, 8, 8);
    const packetMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending });
    const packets: { mesh: THREE.Mesh; aIdx: number; bIdx: number; progress: number; speed: number }[] = [];
    for (let i = 0; i < 5; i++) {
        const eI = Math.floor(Math.random() * edges.length);
        const [a, b] = edges[eI];
        const mesh = new THREE.Mesh(packetGeo, packetMat.clone());
        group.add(mesh);
        packets.push({ mesh, aIdx: a, bIdx: b, progress: Math.random(), speed: 0.5 + Math.random() * 0.5 });
    }

    (group as any).userData = { isERP: true, nodeBoxes, packets, nodePositionsList };
    return group;
};

// ─────────────────────────────────────────────────────────
//  DOMAIN 7 — Mobile Development: Floating 3D Phone
// ─────────────────────────────────────────────────────────
const createMobileModel = (color: number) => {
    const group = new THREE.Group();

    // Phone body (rounded box outline)
    const phoneGeo = new THREE.BoxGeometry(0.45, 0.85, 0.06);
    const phoneLine = new THREE.LineSegments(new THREE.EdgesGeometry(phoneGeo), new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.8 }));
    group.add(phoneLine);

    // Phone screen area
    const screenGeo = new THREE.PlaneGeometry(0.36, 0.66);
    const screenMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.06, side: THREE.DoubleSide });
    const screen = new THREE.Mesh(screenGeo, screenMat);
    screen.position.z = 0.035;
    group.add(screen);

    // Home button indicator
    const btnGeo = new THREE.CircleGeometry(0.04, 16);
    const btn = new THREE.Mesh(btnGeo, new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.6 }));
    btn.position.set(0, -0.38, 0.04);
    group.add(btn);

    // App icons grid (3x4 on screen)
    const appIcons: THREE.Mesh[] = [];
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 3; col++) {
            const iconMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.3 + Math.random() * 0.4, blending: THREE.AdditiveBlending });
            const icon = new THREE.Mesh(new THREE.PlaneGeometry(0.08, 0.08), iconMat);
            icon.position.set((col - 1) * 0.12, 0.18 - row * 0.14, 0.04);
            group.add(icon);
            appIcons.push(icon);
        }
    }

    // Tap ripple rings
    const ripples: { mesh: THREE.Mesh; age: number; speed: number }[] = [];
    for (let i = 0; i < 3; i++) {
        const rMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.0 });
        const ripple = new THREE.Mesh(new THREE.RingGeometry(0, 0.05, 32), rMat);
        ripple.position.set((Math.random() - 0.5) * 0.3, (Math.random() - 0.5) * 0.5, 0.05);
        group.add(ripple);
        ripples.push({ mesh: ripple, age: i * 1.5, speed: 0.8 + Math.random() * 0.5 });
    }

    // Floating orbiting UI element
    const orbitGeo = new THREE.TorusGeometry(0.65, 0.004, 8, 80);
    const orbit = new THREE.Mesh(orbitGeo, new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.12 }));
    orbit.rotation.x = Math.PI / 4;
    group.add(orbit);

    (group as any).userData = { isMobile: true, phoneLine, appIcons, ripples, orbit };
    return group;
};

// ─────────────────────────────────────────────────────────
//  DOMAIN 8 — QIntellect: Crystal Lattice Sphere + Quantum Particles
// ─────────────────────────────────────────────────────────
const createQIntellectModel = (color: number) => {
    const group = new THREE.Group();

    // Crystal lattice (nested icosahedra)
    const sizes = [0.35, 0.55, 0.75];
    const lattices: THREE.Mesh[] = [];
    sizes.forEach((size, i) => {
        const geo = new THREE.IcosahedronGeometry(size, 1);
        const mat = new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.4 - i * 0.1 });
        const mesh = new THREE.Mesh(geo, mat);
        group.add(mesh);
        lattices.push(mesh);
    });

    // Central quantum core
    const coreGeo = new THREE.SphereGeometry(0.12, 32, 32);
    const coreMat = new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 1.0, metalness: 1.0, roughness: 0.0 });
    const core = new THREE.Mesh(coreGeo, coreMat);
    group.add(core);

    // Quantum particle field
    const ptCount = 200;
    const ptGeo = new THREE.BufferGeometry();
    const ptPos: number[] = [];
    const ptPhases: number[] = [];
    for (let i = 0; i < ptCount; i++) {
        const r = 0.5 + Math.random() * 0.5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        ptPos.push(r * Math.sin(phi) * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta), r * Math.cos(phi));
        ptPhases.push(Math.random() * Math.PI * 2);
    }
    ptGeo.setAttribute('position', new THREE.Float32BufferAttribute(ptPos, 3));
    const particles = new THREE.Points(ptGeo, new THREE.PointsMaterial({ color, size: 0.018, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending }));
    group.add(particles);

    // Energy arcs (thin torus rings at angles)
    const arcAngles = [0, Math.PI / 3, Math.PI * 2 / 3];
    const arcs: THREE.Mesh[] = [];
    arcAngles.forEach(angle => {
        const arc = new THREE.Mesh(new THREE.TorusGeometry(0.62, 0.004, 8, 100), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.3, blending: THREE.AdditiveBlending }));
        arc.rotation.y = angle;
        arc.rotation.x = Math.PI / 2;
        group.add(arc);
        arcs.push(arc);
    });

    (group as any).userData = { isQIntellect: true, lattices, core, particles, arcs, ptPhases };
    return group;
};

// ─────────────────────────────────────────────────────────
//  DOMAIN 9 — AI Infrastructure: Server Nexus + Data Beams
// ─────────────────────────────────────────────────────────
const createServerNexusModel = (color: number) => {
    const group = new THREE.Group();
    const serverPlanes: THREE.LineSegments[] = [];
    const beams: { line: THREE.Line; progress: number; speed: number }[] = [];

    // Stacked server rack layers
    for (let i = 0; i < 6; i++) {
        const y = (i - 2.5) * 0.2;
        const serverGeo = new THREE.BoxGeometry(1.0, 0.14, 0.5);
        const edges = new THREE.LineSegments(new THREE.EdgesGeometry(serverGeo), new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.4 + (i % 2) * 0.2 }));
        edges.position.y = y;
        group.add(edges);
        serverPlanes.push(edges);

        // LED indicators
        for (let j = 0; j < 4; j++) {
            const ledMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.6 + Math.random() * 0.4, blending: THREE.AdditiveBlending });
            const led = new THREE.Mesh(new THREE.CircleGeometry(0.015, 8), ledMat);
            led.position.set(-0.4 + j * 0.12, y, 0.26);
            group.add(led);
        }
    }

    // Data beam lines (shooting from top/bottom of rack)
    const beamEndpoints = [
        [new THREE.Vector3(-0.35, 0.7, 0), new THREE.Vector3(0.35, -0.7, 0)],
        [new THREE.Vector3(0.3, 0.7, 0), new THREE.Vector3(-0.3, -0.7, 0)],
        [new THREE.Vector3(0, 0.7, 0.2), new THREE.Vector3(0, -0.7, -0.2)],
    ];
    beamEndpoints.forEach(([start, end]) => {
        const geo = new THREE.BufferGeometry().setFromPoints([start, end]);
        const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.0 });
        const line = new THREE.Line(geo, mat);
        group.add(line);
        beams.push({ line, progress: Math.random(), speed: 1.5 + Math.random() });
    });

    // Outer cage wireframe
    const cage = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(1.15, 1.4, 0.65)), new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.1 }));
    group.add(cage);

    // Connection nodes at rack corners
    const nodePositions = [[-0.5, 0.75, 0], [0.5, 0.75, 0], [0.5, -0.75, 0], [-0.5, -0.75, 0]];
    const nodes: THREE.Mesh[] = [];
    nodePositions.forEach(([x, y, z]) => {
        const node = new THREE.Mesh(new THREE.SphereGeometry(0.04, 8, 8), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending }));
        node.position.set(x, y, z);
        group.add(node);
        nodes.push(node);
    });

    (group as any).userData = { isServer: true, serverPlanes, beams, nodes, cage };
    return group;
};

// ─────────────────────────────────────────────────────────
//  MAIN SWITCHER
// ─────────────────────────────────────────────────────────
const createDomainModel = (index: number) => {
    const color = DOMAIN_COLORS[index % DOMAIN_COLORS.length];
    switch (index) {
        case 0: return createAIBrainModel(color);
        case 1: return createChatbotModel(color);
        case 2: return createAIRepModel(color);
        case 3: return createDynamicsAxModel(color);
        case 4: return createCRMModel(color);
        case 5: return createWebDevModel(color);
        case 6: return createERPModel(color);
        case 7: return createMobileModel(color);
        case 8: return createQIntellectModel(color);
        case 9: return createServerNexusModel(color);
        default: return createAIBrainModel(color);
    }
};

// ─────────────────────────────────────────────────────────
//  REACT COMPONENT
// ─────────────────────────────────────────────────────────
const QuantumNetwork: React.FC<QuantumNetworkProps> = ({ domainIndex, videoUrl }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const prevVideoUrl = useRef(videoUrl);
    const [fade, setFade] = useState(false);

    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const composerRef = useRef<EffectComposer | null>(null);
    const coreGroupRef = useRef<THREE.Group | null>(null);
    const currentModelRef = useRef<THREE.Group | null>(null);
    const domainIndexRef = useRef(domainIndex);
    const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

    // Init Three.js scene ONCE
    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const width = container.clientWidth;
        const height = container.clientHeight;

        const scene = new THREE.Scene();
        sceneRef.current = scene;

        const camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 1000);
        camera.position.z = 2.6;
        cameraRef.current = camera;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        const composer = new EffectComposer(renderer);
        const renderPass = new RenderPass(scene, camera);
        const bloomPass = new UnrealBloomPass(new THREE.Vector2(width, height), 1.2, 0.5, 0.75);
        composer.addPass(renderPass);
        composer.addPass(bloomPass);
        composerRef.current = composer;

        // Lighting
        scene.add(new THREE.AmbientLight(0xffffff, 0.5));
        const keyLight = new THREE.PointLight(0xffffff, 2, 15);
        keyLight.position.set(3, 3, 5);
        scene.add(keyLight);
        const fillLight = new THREE.PointLight(0x8888ff, 1, 10);
        fillLight.position.set(-3, -2, 3);
        scene.add(fillLight);

        const coreGroup = new THREE.Group();
        scene.add(coreGroup);
        coreGroupRef.current = coreGroup;

        // Initial model
        const initialModel = createDomainModel(domainIndexRef.current);
        coreGroup.add(initialModel);
        currentModelRef.current = initialModel;

        // Global orbital rings
        const ringsGroup = new THREE.Group();
        scene.add(ringsGroup);
        [1.2, 1.5, 1.8].forEach((r, i) => {
            const geo = new THREE.TorusGeometry(r, 0.003, 8, 100);
            const mat = new THREE.MeshBasicMaterial({ color: DOMAIN_COLORS[0], transparent: true, opacity: 0.08 });
            const ring = new THREE.Mesh(geo, mat);
            ring.rotation.x = [Math.PI / 2.5, -Math.PI / 3.5, Math.PI / 6][i];
            (ring as any).userData = { speed: [0.003, -0.002, 0.001][i] };
            ringsGroup.add(ring);
        });

        // Mouse tracking
        const onMouseMove = (e: MouseEvent) => {
            mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
            mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
        };
        window.addEventListener('mousemove', onMouseMove);

        const clock = new THREE.Clock();

        const animate = () => {
            requestAnimationFrame(animate);
            const delta = clock.getDelta();
            const time = clock.getElapsedTime();
            const { x: mouseX, y: mouseY } = mouseRef.current;
            const dIdx = domainIndexRef.current;
            const model = currentModelRef.current;
            const ud = model ? (model as any).userData : null;

            if (coreGroupRef.current) {
                // Mouse parallax for all domains
                coreGroupRef.current.position.x += (mouseX * 0.12 - coreGroupRef.current.position.x) * 0.06;
                coreGroupRef.current.position.y += (-mouseY * 0.12 - coreGroupRef.current.position.y) * 0.06;

                // ── Domain 0: AI Brain ──────────────────────────
                if (dIdx === 0 && ud?.isAIBrain) {
                    ud.brain.rotation.y += delta * 0.3;
                    ud.brain.rotation.x += delta * 0.1;
                    ud.nodes.forEach((n: THREE.Mesh, i: number) => {
                        const pulse = Math.sin(time * 3 + i * 0.5) * 0.5 + 0.5;
                        (n.material as THREE.MeshBasicMaterial).opacity = 0.3 + pulse * 0.7;
                        n.scale.setScalar(0.8 + pulse * 0.5);
                    });
                    coreGroupRef.current.rotation.y += delta * 0.15;

                    // ── Domain 1: Chatbot ───────────────────────────
                } else if (dIdx === 1 && ud?.isChatbot) {
                    const { headGroup, mouth, eyeL, eyeR, ring1, ring2 } = ud;
                    coreGroupRef.current.position.y += Math.sin(time * 1.5) * 0.0008;
                    headGroup.rotation.y = THREE.MathUtils.lerp(headGroup.rotation.y, mouseX * 0.6, 0.1);
                    headGroup.rotation.x = THREE.MathUtils.lerp(headGroup.rotation.x, -mouseY * 0.3, 0.1);
                    if (mouth) {
                        const pulse = Math.abs(Math.sin(time * 18)) * (0.3 + Math.random() * 0.7);
                        mouth.scale.y = 1 + pulse * 5;
                        if ('opacity' in mouth.material) (mouth.material as any).opacity = 0.6 + pulse * 0.4;
                    }
                    if (eyeL && eyeR) { const b = Math.sin(time * 0.8) > 0.98 ? 0.1 : 1; eyeL.scale.y = b; eyeR.scale.y = b; }
                    if (ring1) ring1.rotation.z += delta * 0.5;
                    if (ring2) ring2.rotation.z -= delta * 0.25;

                    // ── Domain 2: AI Rep ────────────────────────────
                } else if (dIdx === 2 && ud?.isAIRep) {
                    ud.head.rotation.y += delta * 0.3;
                    ud.body.rotation.y += delta * 0.1;
                    ud.aura.rotation.y -= delta * 0.05;
                    ud.rings.forEach(({ mesh, delay }: { mesh: THREE.Mesh; delay: number }, i: number) => {
                        const t = (time * 0.6 + delay) % 3.0;
                        const progress = t / 3.0;
                        mesh.scale.setScalar(0.3 + progress * 2.5);
                        (mesh.material as THREE.MeshBasicMaterial).opacity = (1 - progress) * 0.5;
                    });
                    coreGroupRef.current.rotation.y += delta * 0.08;

                    // ── Domain 3: Dynamics AX ───────────────────────
                } else if (dIdx === 3 && ud?.isDynamicsAx) {
                    ud.gear1.rotation.z += delta * 0.5;
                    ud.gear2.rotation.z -= delta * 1.05;
                    ud.cube.rotation.x += delta * 0.8;
                    ud.cube.rotation.y += delta * 0.5;
                    ud.pts.rotation.y += delta * 0.2;
                    coreGroupRef.current.rotation.y += delta * 0.12;
                    coreGroupRef.current.rotation.x += delta * 0.04;

                    // ── Domain 4: CRM ───────────────────────────────
                } else if (dIdx === 4 && ud?.isCRM) {
                    const { hub, shell, satellites } = ud;
                    const pulse = Math.sin(time * 3) * 0.5 + 0.5;
                    (hub.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.3 + pulse * 0.7;
                    shell.rotation.y += delta * 0.2;
                    satellites.forEach(({ pivot, speed }: { pivot: THREE.Group; speed: number }) => {
                        pivot.rotation.y += delta * speed * 0.5;
                        pivot.rotation.x += delta * speed * 0.2;
                    });
                    coreGroupRef.current.rotation.y += delta * 0.1;

                    // ── Domain 5: Web Dev ───────────────────────────
                } else if (dIdx === 5 && ud?.isWebDev) {
                    ud.strips.forEach((strip: THREE.Group) => {
                        const { speed } = (strip as any).userData;
                        strip.children.forEach((char: any) => {
                            char.position.y -= delta * speed;
                            if (char.position.y < -0.55) char.position.y = 0.55;
                            if (Math.random() > 0.99) char.visible = !char.visible;
                            else if (Math.random() > 0.5) char.visible = true;
                        });
                    });
                    ud.core.rotation.x += delta * 2;
                    ud.core.rotation.y += delta * 1.5;
                    coreGroupRef.current.rotation.y += delta * 0.08;

                    // ── Domain 6: ERP ───────────────────────────────
                } else if (dIdx === 6 && ud?.isERP) {
                    ud.nodeBoxes.forEach((box: THREE.Mesh, i: number) => {
                        const pulse = Math.sin(time * 2 + i * 0.7) * 0.5 + 0.5;
                        (box.material as THREE.MeshBasicMaterial).opacity = 0.2 + pulse * 0.5;
                        box.rotation.y += delta * 0.3;
                    });
                    ud.packets.forEach((pk: { mesh: THREE.Mesh; aIdx: number; bIdx: number; progress: number; speed: number }) => {
                        pk.progress += delta * pk.speed;
                        if (pk.progress > 1) { pk.progress = 0; }
                        const a = ud.nodePositionsList[pk.aIdx];
                        const b = ud.nodePositionsList[pk.bIdx];
                        pk.mesh.position.lerpVectors(a, b, pk.progress);
                    });
                    coreGroupRef.current.rotation.y += delta * 0.1;

                    // ── Domain 7: Mobile ────────────────────────────
                } else if (dIdx === 7 && ud?.isMobile) {
                    ud.appIcons.forEach((icon: THREE.Mesh, i: number) => {
                        const pulse = Math.sin(time * 2 + i * 0.8) * 0.5 + 0.5;
                        (icon.material as THREE.MeshBasicMaterial).opacity = 0.15 + pulse * 0.5;
                    });
                    ud.ripples.forEach((rp: { mesh: THREE.Mesh; age: number; speed: number }) => {
                        rp.age += delta * rp.speed;
                        if (rp.age > 3) rp.age = 0;
                        const progress = rp.age / 3;
                        rp.mesh.scale.setScalar(1 + progress * 4);
                        (rp.mesh.material as THREE.MeshBasicMaterial).opacity = (1 - progress) * 0.5;
                    });
                    ud.orbit.rotation.z += delta * 0.4;
                    // Gentle float
                    coreGroupRef.current.position.y += Math.sin(time * 1.2) * 0.0008;
                    coreGroupRef.current.rotation.y += delta * 0.1;
                    coreGroupRef.current.rotation.x = Math.sin(time * 0.5) * 0.1;

                    // ── Domain 8: QIntellect ────────────────────────
                } else if (dIdx === 8 && ud?.isQIntellect) {
                    const { lattices, core, particles, arcs } = ud;
                    lattices.forEach((l: THREE.Mesh, i: number) => {
                        l.rotation.y += delta * (0.2 + i * 0.15) * (i % 2 === 0 ? 1 : -1);
                        l.rotation.x += delta * (0.1 + i * 0.05);
                    });
                    const corePulse = Math.sin(time * 4) * 0.5 + 0.5;
                    (core.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.5 + corePulse;
                    core.scale.setScalar(1 + corePulse * 0.2);
                    particles.rotation.y += delta * 0.3;
                    particles.rotation.x += delta * 0.1;
                    arcs.forEach((arc: THREE.Mesh, i: number) => {
                        arc.rotation.z += delta * (0.3 + i * 0.1) * (i % 2 === 0 ? 1 : -1);
                    });
                    coreGroupRef.current.rotation.y += delta * 0.12;

                    // ── Domain 9: Server Nexus ──────────────────────
                } else if (dIdx === 9 && ud?.isServer) {
                    const { serverPlanes, beams, nodes } = ud;
                    serverPlanes.forEach((s: THREE.LineSegments, i: number) => {
                        const pulse = Math.sin(time * 3 + i * 0.5) * 0.5 + 0.5;
                        (s.material as THREE.LineBasicMaterial).opacity = 0.2 + pulse * 0.4;
                    });
                    beams.forEach((bm: any) => {
                        bm.progress += delta * bm.speed;
                        if (bm.progress > 1) bm.progress = 0;
                        (bm.line.material as THREE.LineBasicMaterial).opacity = Math.sin(bm.progress * Math.PI) * 0.9;
                    });
                    nodes.forEach((n: THREE.Mesh, i: number) => {
                        const pulse = Math.sin(time * 4 + i * 1.5) * 0.5 + 0.5;
                        (n.material as THREE.MeshBasicMaterial).opacity = 0.4 + pulse * 0.6;
                        n.scale.setScalar(0.8 + pulse * 0.5);
                    });
                    coreGroupRef.current.rotation.y += delta * 0.1;
                    coreGroupRef.current.rotation.x = Math.sin(time * 0.3) * 0.08;
                }
            }

            // Animate global orbit rings
            const rings = sceneRef.current?.children.find(c => c.children.some(ch => (ch as any).userData?.speed));
            if (rings) {
                rings.children.forEach(r => {
                    r.rotation.z += (r as any).userData?.speed ?? 0;
                });
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
            if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
            renderer.dispose();
        };
    }, []);

    // Domain change — swap model
    useEffect(() => {
        domainIndexRef.current = domainIndex;
        if (!coreGroupRef.current) return;

        // Dispose old model
        const old = currentModelRef.current;
        if (old) {
            coreGroupRef.current.remove(old);
            old.traverse((obj: any) => {
                if (obj.geometry) obj.geometry.dispose();
                if (obj.material) {
                    if (Array.isArray(obj.material)) obj.material.forEach((m: any) => m.dispose());
                    else obj.material.dispose();
                }
            });
        }

        // Reset group rotation for clean transition
        coreGroupRef.current.rotation.set(0, 0, 0);
        coreGroupRef.current.position.set(0, 0, 0);

        const newModel = createDomainModel(domainIndex);
        coreGroupRef.current.add(newModel);
        currentModelRef.current = newModel;

        // Update bloom color
        if (composerRef.current) {
            const bloom = composerRef.current.passes.find((p: any) => p instanceof UnrealBloomPass) as UnrealBloomPass | undefined;
            if (bloom) bloom.strength = 1.2;
        }
    }, [domainIndex]);

    // Video swap
    useEffect(() => {
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
    }, [videoUrl]);

    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-black">
            {/* Subtle video texture (very low opacity) */}
            <video
                ref={videoRef}
                autoPlay muted loop playsInline
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${fade ? 'opacity-0' : 'opacity-10'}`}
                src={videoUrl}
            />

            {/* Perspective grid */}
            <div className="absolute inset-0 z-10 opacity-10 pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(rgba(94, 98, 255, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(94, 98, 255, 0.15) 1px, transparent 1px)`,
                    backgroundSize: '80px 80px',
                    perspective: '1200px',
                    transform: 'rotateX(70deg) scale(1.5)',
                    transformOrigin: 'center bottom',
                    maskImage: 'radial-gradient(circle at center, black, transparent 90%)'
                }}
            />

            {/* Ambient glows */}
            <div className="absolute top-[10%] right-[15%] w-[35%] h-[35%] bg-[#5E62FF]/8 blur-[140px] rounded-full z-10" />
            <div className="absolute bottom-[15%] left-[10%] w-[30%] h-[30%] bg-[#9966FF]/8 blur-[120px] rounded-full z-10" />

            {/* Three.js canvas */}
            <div ref={containerRef} className="w-full h-full relative z-20" />

            {/* Film grain overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.015] z-30"
                style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #fff 3px)', backgroundSize: '100% 4px' }}
            />
        </div>
    );
};

export default QuantumNetwork;
