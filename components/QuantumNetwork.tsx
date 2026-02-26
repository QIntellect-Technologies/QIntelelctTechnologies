import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

interface QuantumNetworkProps { domainIndex: number; videoUrl: string; }

const DOMAIN_COLORS = [
    0x5E62FF, 0x9966FF, 0x00f2ff, 0x7000ff,
    0x00ff9d, 0x0066ff, 0xbd00ff, 0xff6a00,
    0x00e5ff, 0xff003c,
];

// ── AI BRAIN ─────────────────────────────────────────────
const createAIBrainModel = (color: number) => {
    const group = new THREE.Group();
    const brainGeo = new THREE.IcosahedronGeometry(0.7, 4);
    const brain = new THREE.Mesh(brainGeo, new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.06, wireframe: true, transparent: true, opacity: 0.25 }));
    group.add(brain);
    const innerGeo = new THREE.IcosahedronGeometry(0.45, 2);
    const inner = new THREE.Mesh(innerGeo, new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.2, wireframe: true, transparent: true, opacity: 0.35 }));
    group.add(inner);
    const pGeo = new THREE.BufferGeometry();
    const pos = brainGeo.attributes.position;
    const nodePositions: number[] = [];
    const nodes: THREE.Mesh[] = [];
    for (let i = 0; i < Math.min(pos.count, 90); i += 2) {
        nodePositions.push(pos.getX(i), pos.getY(i), pos.getZ(i));
        const n = new THREE.Mesh(new THREE.SphereGeometry(0.013, 6, 6), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending }));
        n.position.set(pos.getX(i), pos.getY(i), pos.getZ(i));
        group.add(n); nodes.push(n);
    }
    for (let i = 0; i < 35; i++) {
        const a = nodes[Math.floor(Math.random() * nodes.length)];
        const b = nodes[Math.floor(Math.random() * nodes.length)];
        if (!a || !b) continue;
        const lGeo = new THREE.BufferGeometry().setFromPoints([a.position.clone(), b.position.clone()]);
        group.add(new THREE.Line(lGeo, new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.12, blending: THREE.AdditiveBlending })));
    }
    const shell = new THREE.Mesh(new THREE.SphereGeometry(0.9, 32, 32), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.03, side: THREE.BackSide, blending: THREE.AdditiveBlending }));
    group.add(shell);
    (group as any).userData = { isAIBrain: true, brain, inner, nodes };
    return group;
};

// ── CHATBOT ───────────────────────────────────────────────
const createChatbotModel = (color: number) => {
    const group = new THREE.Group();
    const headGroup = new THREE.Group();
    group.add(headGroup);
    headGroup.add(new THREE.Mesh(new THREE.SphereGeometry(0.48, 64, 64), new THREE.MeshStandardMaterial({ color: 0xccddff, emissive: color, emissiveIntensity: 0.1, roughness: 0.2, metalness: 0.85 })));
    headGroup.add(new THREE.Mesh(new THREE.SphereGeometry(0.4, 32, 32), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.18, blending: THREE.AdditiveBlending })));
    const visor = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.6), new THREE.MeshBasicMaterial({ color: 0x020410, transparent: true, opacity: 0.92 }));
    visor.rotation.x = -Math.PI / 2.5; visor.position.z = 0.05;
    headGroup.add(visor);
    const bMat = () => new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending, side: THREE.DoubleSide });
    const eyeL = new THREE.Mesh(new THREE.PlaneGeometry(0.16, 0.045), bMat()); eyeL.position.set(-0.18, 0.1, 0.52); headGroup.add(eyeL);
    const eyeR = new THREE.Mesh(new THREE.PlaneGeometry(0.16, 0.045), bMat()); eyeR.position.set(0.18, 0.1, 0.52); headGroup.add(eyeR);
    const mouth = new THREE.Mesh(new THREE.PlaneGeometry(0.22, 0.035), bMat()); mouth.position.set(0, -0.15, 0.52); headGroup.add(mouth);
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(0.72, 0.006, 16, 100), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.3, blending: THREE.AdditiveBlending })); ring1.rotation.x = Math.PI / 2.2; group.add(ring1);
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(0.88, 0.004, 16, 100), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.15, blending: THREE.AdditiveBlending })); ring2.rotation.x = -Math.PI / 3; group.add(ring2);
    (group as any).userData = { isChatbot: true, headGroup, eyeL, eyeR, mouth, ring1, ring2 };
    return group;
};

// ── AI REP ────────────────────────────────────────────────
const createAIRepModel = (color: number) => {
    const group = new THREE.Group();
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.19, 32, 32), new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.2, wireframe: true, transparent: true, opacity: 0.6 }));
    head.position.y = 0.65; group.add(head);
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.22, 0.7, 16, 1, true), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.35, side: THREE.DoubleSide, wireframe: true, blending: THREE.AdditiveBlending }));
    body.position.y = 0.15; group.add(body);
    const aura = new THREE.Mesh(new THREE.CapsuleGeometry(0.32, 0.85, 8, 16), new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.07 }));
    group.add(aura);
    const rings: { mesh: THREE.Mesh; delay: number }[] = [];
    for (let i = 0; i < 6; i++) {
        const r = new THREE.Mesh(new THREE.TorusGeometry(0.28 + i * 0.2, 0.004, 8, 80), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.0, blending: THREE.AdditiveBlending }));
        r.rotation.x = Math.PI / 2; r.position.y = -0.4;
        group.add(r); rings.push({ mesh: r, delay: i * 0.35 });
    }
    (group as any).userData = { isAIRep: true, head, body, rings, aura };
    return group;
};

// ── DYNAMICS AX ───────────────────────────────────────────
const createDynamicsAxModel = (color: number) => {
    const group = new THREE.Group();
    const gMat = new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.1, metalness: 0.75, roughness: 0.3, transparent: true, opacity: 0.65 });
    const gear1 = new THREE.Mesh(new THREE.TorusGeometry(0.45, 0.07, 8, 14), gMat.clone()); group.add(gear1);
    for (let i = 0; i < 14; i++) { const a = (i / 14) * Math.PI * 2; const t = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.09, 0.06), gMat.clone()); t.position.set(Math.cos(a) * 0.52, Math.sin(a) * 0.52, 0); t.rotation.z = a; gear1.add(t); }
    const gear2 = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.055, 8, 10), new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.3, metalness: 0.8, roughness: 0.2, transparent: true, opacity: 0.6 }));
    for (let i = 0; i < 10; i++) { const a = (i / 10) * Math.PI * 2; const t = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.07, 0.04), gMat.clone()); t.position.set(Math.cos(a) * 0.29, Math.sin(a) * 0.29, 0); t.rotation.z = a; gear2.add(t); }
    gear2.position.set(0.74, 0, 0); group.add(gear2);
    const cube = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(0.32, 0.32, 0.32)), new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.85 }));
    cube.position.set(-0.75, 0.3, 0.1); group.add(cube);
    const pGeo = new THREE.BufferGeometry(); const pp: number[] = [];
    for (let i = 0; i < 100; i++) pp.push((Math.random() - 0.5) * 2.2, (Math.random() - 0.5) * 2.2, (Math.random() - 0.5) * 0.6);
    pGeo.setAttribute('position', new THREE.Float32BufferAttribute(pp, 3));
    const pts = new THREE.Points(pGeo, new THREE.PointsMaterial({ color, size: 0.02, transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending }));
    group.add(pts);
    (group as any).userData = { isDynamicsAx: true, gear1, gear2, cube, pts };
    return group;
};

// ── CRM ───────────────────────────────────────────────────
const createCRMModel = (color: number) => {
    const group = new THREE.Group();
    const hub = new THREE.Mesh(new THREE.SphereGeometry(0.27, 32, 32), new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.25, metalness: 0.85, roughness: 0.15 }));
    group.add(hub);
    group.add(new THREE.Mesh(new THREE.SphereGeometry(0.38, 32, 32), new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.12 })));
    const satellites: { pivot: THREE.Group; speed: number }[] = [];
    const configs = [
        { radius: 0.66, axis: new THREE.Vector3(0, 1, 0), speed: 0.8 }, { radius: 0.78, axis: new THREE.Vector3(1, 0, 0), speed: -0.6 },
        { radius: 0.62, axis: new THREE.Vector3(0.5, 0.5, 0).normalize(), speed: 1.1 }, { radius: 0.82, axis: new THREE.Vector3(0, 1, 0.3).normalize(), speed: -0.5 },
        { radius: 0.57, axis: new THREE.Vector3(1, 0.5, 0).normalize(), speed: 0.75 }, { radius: 0.72, axis: new THREE.Vector3(0.3, 0, 1).normalize(), speed: -0.95 },
    ];
    configs.forEach(({ radius, axis, speed }, i) => {
        const pivot = new THREE.Group();
        const orb = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.003, 8, 80), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.13 }));
        orb.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), axis.clone().normalize()); group.add(orb);
        const sat = new THREE.Mesh(new THREE.OctahedronGeometry(0.065, 0), new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.3, metalness: 0.75, roughness: 0.25 }));
        sat.position.set(radius, 0, 0); pivot.add(sat);
        const connPts = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(radius, 0, 0)];
        pivot.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(connPts), new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.22 })));
        pivot.setRotationFromAxisAngle(axis.clone().normalize(), (i / 6) * Math.PI * 2);
        group.add(pivot); satellites.push({ pivot, speed });
    });
    (group as any).userData = { isCRM: true, hub, satellites };
    return group;
};

// ── WEB DEV ───────────────────────────────────────────────
const createWebDevModel = (color: number) => {
    const group = new THREE.Group();
    group.add(new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(1.65, 1.05, 0.1)), new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.45 })));
    const hdr = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 0.09), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.28, side: THREE.DoubleSide }));
    hdr.position.set(0, 0.46, 0.06); group.add(hdr);
    [{ x: -0.7, c: 0xff5f57 }, { x: -0.62, c: 0xffbd2e }, { x: -0.54, c: 0x28c840 }].forEach(({ x, c }) => {
        const d = new THREE.Mesh(new THREE.CircleGeometry(0.026, 16), new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: 0.95 }));
        d.position.set(x, 0.46, 0.07); group.add(d);
    });
    const codeStrips: THREE.Group[] = [];
    const charGeo = new THREE.PlaneGeometry(0.07, 0.07);
    for (let i = 0; i < 20; i++) {
        const strip = new THREE.Group();
        const x = (i - 10) * 0.083 + 0.04;
        const speed = 0.35 + Math.random() * 1.5;
        for (let j = 0; j < 14; j++) {
            const char = new THREE.Mesh(charGeo, new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.04 + (j / 14) * 0.78, blending: THREE.AdditiveBlending, side: THREE.DoubleSide }));
            char.position.set(0, (j - 7) * 0.083, 0); strip.add(char);
        }
        strip.position.set(x, 0, 0.06); (strip as any).userData = { speed };
        group.add(strip); codeStrips.push(strip);
    }
    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.13, 0), new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.9 }));
    group.add(core);
    (group as any).userData = { isWebDev: true, strips: codeStrips, core };
    return group;
};

// ── ERP ───────────────────────────────────────────────────
const createERPModel = (color: number) => {
    const group = new THREE.Group();
    const nodePosList: THREE.Vector3[] = [];
    const nodeBoxes: THREE.Mesh[] = [];
    for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) {
        const pos = new THREE.Vector3((c - 1) * 0.65, (r - 1) * 0.55, 0);
        nodePosList.push(pos.clone());
        const box = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.15, 0.15), new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.15, metalness: 0.65, roughness: 0.35, transparent: true, opacity: 0.5 }));
        box.position.copy(pos);
        const edges = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(0.15, 0.15, 0.15)), new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.9 }));
        edges.position.copy(pos); group.add(box, edges); nodeBoxes.push(box);
    }
    const edges2 = [[0, 1], [1, 2], [3, 4], [4, 5], [6, 7], [7, 8], [0, 3], [3, 6], [1, 4], [4, 7], [2, 5], [5, 8], [0, 4], [4, 8]];
    edges2.forEach(([a, b]) => { const l = new THREE.Line(new THREE.BufferGeometry().setFromPoints([nodePosList[a], nodePosList[b]]), new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.18 })); group.add(l); });
    const packets: { mesh: THREE.Mesh; aIdx: number; bIdx: number; progress: number; speed: number }[] = [];
    const pMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending });
    for (let i = 0; i < 7; i++) {
        const eI = Math.floor(Math.random() * edges2.length); const [a, b] = edges2[eI];
        const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 8), pMat.clone());
        group.add(mesh); packets.push({ mesh, aIdx: a, bIdx: b, progress: Math.random(), speed: 0.4 + Math.random() * 0.6 });
    }
    (group as any).userData = { isERP: true, nodeBoxes, packets, nodePosList };
    return group;
};

// ── MOBILE ────────────────────────────────────────────────
const createMobileModel = (color: number) => {
    const group = new THREE.Group();

    // ── Phone body shell (solid metallic frame)
    const bodyGeo = new THREE.BoxGeometry(0.48, 0.96, 0.055);
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x1a1a2e, metalness: 0.95, roughness: 0.1 });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    group.add(body);

    // Phone frame outline (bright edge highlight)
    const frameEdge = new THREE.LineSegments(
        new THREE.EdgesGeometry(bodyGeo),
        new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.6 })
    );
    group.add(frameEdge);

    // ── Screen glass surface
    const screenGeo = new THREE.PlaneGeometry(0.4, 0.82);
    const screenMat = new THREE.MeshStandardMaterial({ color: 0x0a0a1a, metalness: 0.0, roughness: 0.05, transparent: true, opacity: 0.95 });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.z = 0.03;
    group.add(screenMesh);

    // Screen glow (subtle color wash behind screen)
    const glowGeo = new THREE.PlaneGeometry(0.38, 0.78);
    const glowMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.04, side: THREE.DoubleSide, blending: THREE.AdditiveBlending });
    const glowMesh = new THREE.Mesh(glowGeo, glowMat);
    glowMesh.position.z = 0.032;
    group.add(glowMesh);

    // ── Dynamic Island / Notch (pill shape at top)
    const notch = new THREE.Mesh(
        new THREE.CapsuleGeometry(0.025, 0.06, 8, 16),
        new THREE.MeshBasicMaterial({ color: 0x000000 })
    );
    notch.rotation.z = Math.PI / 2;
    notch.position.set(0, 0.37, 0.035);
    group.add(notch);

    // ── UI Card rows on screen (simulated app UI)
    const uiCards: THREE.Mesh[] = [];
    const cardConfigs = [
        { y: 0.22, w: 0.32, h: 0.1, op: 0.18 },
        { y: 0.09, w: 0.32, h: 0.07, op: 0.12 },
        { y: -0.02, w: 0.28, h: 0.07, op: 0.10 },
        { y: -0.13, w: 0.32, h: 0.09, op: 0.14 },
        { y: -0.24, w: 0.26, h: 0.06, op: 0.09 },
    ];
    cardConfigs.forEach(({ y, w, h, op }) => {
        const card = new THREE.Mesh(
            new THREE.PlaneGeometry(w, h),
            new THREE.MeshBasicMaterial({ color, transparent: true, opacity: op, blending: THREE.AdditiveBlending, side: THREE.DoubleSide })
        );
        card.position.set(0, y, 0.034);
        group.add(card);
        uiCards.push(card);
    });

    // Small accent dots on cards (like notification dots, icons)
    for (let i = 0; i < 5; i++) {
        const dot = new THREE.Mesh(
            new THREE.CircleGeometry(0.018, 12),
            new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending })
        );
        dot.position.set(-0.13, cardConfigs[i].y, 0.036);
        group.add(dot);
    }

    // ── Bottom home bar indicator
    const homeBar = new THREE.Mesh(
        new THREE.PlaneGeometry(0.12, 0.01),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending })
    );
    homeBar.position.set(0, -0.38, 0.035);
    group.add(homeBar);

    // ── Side volume buttons (left side)
    [-0.14, -0.06].forEach(y => {
        const btn = new THREE.Mesh(
            new THREE.BoxGeometry(0.015, 0.07, 0.03),
            new THREE.MeshStandardMaterial({ color: 0x333355, metalness: 0.9, roughness: 0.1 })
        );
        btn.position.set(-0.252, y, 0);
        group.add(btn);
    });

    // ── Power button (right side)
    const pwrBtn = new THREE.Mesh(
        new THREE.BoxGeometry(0.015, 0.1, 0.03),
        new THREE.MeshStandardMaterial({ color: 0x333355, metalness: 0.9, roughness: 0.1 })
    );
    pwrBtn.position.set(0.252, 0.05, 0);
    group.add(pwrBtn);

    // ── 4 Floating UI component panels orbiting the phone
    const floatingPanels: { pivot: THREE.Group; speed: number; panel: THREE.Mesh }[] = [];
    const panelDefs = [
        { radius: 0.75, y: 0.25, speed: 0.5, w: 0.24, h: 0.16, startAngle: 0 },
        { radius: 0.82, y: -0.1, speed: -0.4, w: 0.20, h: 0.12, startAngle: Math.PI * 0.5 },
        { radius: 0.70, y: 0.05, speed: 0.65, w: 0.22, h: 0.14, startAngle: Math.PI },
        { radius: 0.78, y: -0.25, speed: -0.55, w: 0.18, h: 0.10, startAngle: Math.PI * 1.5 },
    ];
    panelDefs.forEach(({ radius, y, speed, w, h, startAngle }) => {
        const pivot = new THREE.Group();
        pivot.rotation.y = startAngle;

        // Panel background
        const panel = new THREE.Mesh(
            new THREE.PlaneGeometry(w, h),
            new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.12, side: THREE.DoubleSide, blending: THREE.AdditiveBlending })
        );
        panel.position.set(radius, y, 0);

        // Panel frame edge
        const pEdge = new THREE.LineSegments(
            new THREE.EdgesGeometry(new THREE.PlaneGeometry(w, h)),
            new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.55 })
        );
        pEdge.position.set(radius, y, 0);

        // Small code lines on panel
        for (let j = 0; j < 3; j++) {
            const lineW = (0.4 + Math.random() * 0.5) * w;
            const lineMesh = new THREE.Mesh(
                new THREE.PlaneGeometry(lineW, 0.008),
                new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending })
            );
            lineMesh.position.set(radius - (w - lineW) * 0.5, y + (j - 1) * 0.035, 0.001);
            pivot.add(lineMesh);
        }

        // Connecting line from phone to panel
        const connPts = [new THREE.Vector3(0.24, y, 0), new THREE.Vector3(radius - w * 0.5, y, 0)];
        const conn = new THREE.Line(
            new THREE.BufferGeometry().setFromPoints(connPts),
            new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.2 })
        );
        pivot.add(panel, pEdge, conn);
        group.add(pivot);
        floatingPanels.push({ pivot, speed, panel });
    });

    // ── Outer glow ring around phone
    const glowRing = new THREE.Mesh(
        new THREE.TorusGeometry(0.55, 0.003, 8, 80),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.2, blending: THREE.AdditiveBlending })
    );
    glowRing.rotation.x = Math.PI / 2;
    group.add(glowRing);

    (group as any).userData = {
        isMobile: true, uiCards, floatingPanels, glowRing, glowMesh, frameEdge
    };
    return group;
};


// ── QINTELLECT ────────────────────────────────────────────
const createQIntellectModel = (color: number) => {
    const group = new THREE.Group();
    const lattices: THREE.Mesh[] = [];
    [{ s: 0.38, op: 0.35 }, { s: 0.58, op: 0.22 }, { s: 0.78, op: 0.12 }].forEach(({ s, op }) => {
        const l = new THREE.Mesh(new THREE.IcosahedronGeometry(s, 1), new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.06, wireframe: true, transparent: true, opacity: op }));
        group.add(l); lattices.push(l);
    });
    const core = new THREE.Mesh(new THREE.SphereGeometry(0.13, 32, 32), new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.7, metalness: 1.0, roughness: 0.0 }));
    group.add(core);
    const ptGeo = new THREE.BufferGeometry(); const pp: number[] = [];
    for (let i = 0; i < 250; i++) { const r = 0.55 + Math.random() * 0.5, t = Math.random() * Math.PI * 2, p2 = Math.acos(2 * Math.random() - 1); pp.push(r * Math.sin(p2) * Math.cos(t), r * Math.sin(p2) * Math.sin(t), r * Math.cos(p2)); }
    ptGeo.setAttribute('position', new THREE.Float32BufferAttribute(pp, 3));
    const particles = new THREE.Points(ptGeo, new THREE.PointsMaterial({ color, size: 0.019, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending }));
    group.add(particles);
    const arcs: THREE.Mesh[] = [];
    [0, Math.PI / 3, Math.PI * 2 / 3].forEach(a => { const arc = new THREE.Mesh(new THREE.TorusGeometry(0.65, 0.005, 8, 100), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending })); arc.rotation.y = a; arc.rotation.x = Math.PI / 2; group.add(arc); arcs.push(arc); });
    (group as any).userData = { isQIntellect: true, lattices, core, particles, arcs };
    return group;
};

// ── SERVER NEXUS ──────────────────────────────────────────
const createServerNexusModel = (color: number) => {
    const group = new THREE.Group();
    const serverPlanes: THREE.LineSegments[] = [];
    for (let i = 0; i < 6; i++) {
        const y = (i - 2.5) * 0.21;
        const s = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(1.05, 0.15, 0.52)), new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.35 + (i % 2) * 0.25 }));
        s.position.y = y; group.add(s); serverPlanes.push(s);
        for (let j = 0; j < 5; j++) { const led = new THREE.Mesh(new THREE.CircleGeometry(0.014, 8), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.6 + Math.random() * 0.4, blending: THREE.AdditiveBlending })); led.position.set(-0.42 + j * 0.13, y, 0.27); group.add(led); }
    }
    const beams: { line: THREE.Line; progress: number; speed: number }[] = [];
    [[new THREE.Vector3(-0.35, 0.75, 0), new THREE.Vector3(0.38, -0.75, 0)], [new THREE.Vector3(0.3, 0.75, 0), new THREE.Vector3(-0.3, -0.75, 0)], [new THREE.Vector3(0, 0.75, 0.22), new THREE.Vector3(0, -0.75, -0.22)]].forEach(([s, e]) => {
        const l = new THREE.Line(new THREE.BufferGeometry().setFromPoints([s, e]), new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.0 }));
        group.add(l); beams.push({ line: l, progress: Math.random(), speed: 1.4 + Math.random() });
    });
    group.add(new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(1.2, 1.45, 0.68)), new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.09 })));
    const nodes: THREE.Mesh[] = [[-0.52, 0.77, 0], [0.52, 0.77, 0], [0.52, -0.77, 0], [-0.52, -0.77, 0]].map(([x, y, z]) => {
        const n = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 8), new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.3, transparent: true, opacity: 0.9 }));
        n.position.set(x, y, z); group.add(n); return n;
    });
    (group as any).userData = { isServer: true, serverPlanes, beams, nodes };
    return group;
};

// ── SWITCHER ──────────────────────────────────────────────
const createDomainModel = (index: number): THREE.Group => {
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

// ── COMPONENT ─────────────────────────────────────────────
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
    const mouseRef = useRef({ x: 0, y: 0 });
    const keyLightRef = useRef<THREE.PointLight | null>(null);
    const fillLightRef = useRef<THREE.PointLight | null>(null);
    const modelOpacityRef = useRef(1);
    const fadingInRef = useRef(false);
    const cameraAngleRef = useRef(0);
    // Text-to-3D sync: when domain changes, trigger a pulse (1.0 → 0.0 decay)
    const syncPulseRef = useRef(0);

    useEffect(() => {
        if (!containerRef.current) return;
        const container = containerRef.current;
        const width = container.clientWidth, height = container.clientHeight;

        const scene = new THREE.Scene();
        // Upgrade 1: Cinematic dark fog — creates depth and atmosphere
        scene.fog = new THREE.FogExp2(0x020410, 0.18);
        sceneRef.current = scene;

        const camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 1000);
        camera.position.set(0, 0, 2.6);
        cameraRef.current = camera;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 0.9;
        container.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        const composer = new EffectComposer(renderer);
        composer.addPass(new RenderPass(scene, camera));
        const bloom = new UnrealBloomPass(new THREE.Vector2(width, height), 0.3, 0.4, 0.88);
        composer.addPass(bloom);
        composerRef.current = composer;

        // Lighting — single neutral key light (no neon colors)
        scene.add(new THREE.AmbientLight(0xffffff, 0.3));
        const keyLight = new THREE.PointLight(0xffffff, 1.2, 20);
        keyLight.position.set(3, 4, 5); scene.add(keyLight); keyLightRef.current = keyLight;
        const fillLight = new THREE.PointLight(0xffffff, 0.4, 15);
        fillLight.position.set(-3, -2, 3); scene.add(fillLight); fillLightRef.current = fillLight;

        // Upgrade 4: Depth layering — background nebula planes at z=-3
        const bgGroup = new THREE.Group();
        bgGroup.position.z = -3;
        for (let i = 0; i < 5; i++) {
            const bGeo = new THREE.PlaneGeometry(3 + Math.random() * 3, 3 + Math.random() * 3);
            const bMat = new THREE.MeshBasicMaterial({ color: DOMAIN_COLORS[i % DOMAIN_COLORS.length], transparent: true, opacity: 0.012, side: THREE.DoubleSide });
            const bMesh = new THREE.Mesh(bGeo, bMat);
            bMesh.position.set((Math.random() - 0.5) * 4, (Math.random() - 0.5) * 3, Math.random() * 1.5);
            bMesh.rotation.z = Math.random() * Math.PI;
            bgGroup.add(bMesh);
        }
        scene.add(bgGroup);

        // Global ambient particle star-field (mid-ground z=-1.5)
        const starGeo = new THREE.BufferGeometry();
        const starPos: number[] = [];
        for (let i = 0; i < 300; i++) starPos.push((Math.random() - 0.5) * 6, (Math.random() - 0.5) * 6, (Math.random() - 0.5) * 4 - 1.5);
        starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPos, 3));
        const starField = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0x8899cc, size: 0.01, transparent: true, opacity: 0.2, blending: THREE.AdditiveBlending }));
        scene.add(starField);

        // Global thin orbital rings
        const ringsGroup = new THREE.Group(); scene.add(ringsGroup);
        [{ r: 1.25, rx: Math.PI / 2.5, sp: 0.003 }, { r: 1.55, rx: -Math.PI / 3.5, sp: -0.002 }, { r: 1.85, rx: Math.PI / 6, sp: 0.0015 }].forEach(({ r, rx, sp }) => {
            const ring = new THREE.Mesh(new THREE.TorusGeometry(r, 0.003, 8, 100), new THREE.MeshBasicMaterial({ color: 0x5E62FF, transparent: true, opacity: 0.07 }));
            ring.rotation.x = rx; (ring as any).userData = { sp }; ringsGroup.add(ring);
        });

        const coreGroup = new THREE.Group(); scene.add(coreGroup); coreGroupRef.current = coreGroup;
        const initialModel = createDomainModel(domainIndexRef.current);
        coreGroup.add(initialModel); currentModelRef.current = initialModel;

        const onMouseMove = (e: MouseEvent) => { mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2; mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2; };
        window.addEventListener('mousemove', onMouseMove);

        const clock = new THREE.Clock();
        const targetLightColor = new THREE.Color(DOMAIN_COLORS[0]);
        const currentLightColor = new THREE.Color(DOMAIN_COLORS[0]);

        const animate = () => {
            requestAnimationFrame(animate);
            const delta = clock.getDelta();
            const time = clock.getElapsedTime();
            const { x: mx, y: my } = mouseRef.current;
            const dIdx = domainIndexRef.current;
            const model = currentModelRef.current;
            const ud = model ? (model as any).userData : null;

            // ── Cinematic camera orbit ────────────────────────
            cameraAngleRef.current += delta * 0.06;
            const camRadius = 2.6 + Math.sin(time * 0.08) * 0.18;
            if (cameraRef.current) {
                const orbitX = Math.sin(cameraAngleRef.current) * camRadius * 0.12;
                const orbitY = Math.cos(cameraAngleRef.current * 0.7) * camRadius * 0.06;
                cameraRef.current.position.x += (orbitX + mx * 0.08 - cameraRef.current.position.x) * 0.04;
                cameraRef.current.position.y += (orbitY - my * 0.06 - cameraRef.current.position.y) * 0.04;
                cameraRef.current.position.z = camRadius;
                cameraRef.current.lookAt(0, 0, 0);
            }

            // Upgrade 3: Text-to-3D sync pulse — decay over ~1.5 seconds
            if (syncPulseRef.current > 0) {
                syncPulseRef.current = Math.max(0, syncPulseRef.current - delta * 0.7);
                if (model && coreGroupRef.current) {
                    const pScale = 1 + syncPulseRef.current * 0.18;
                    coreGroupRef.current.scale.setScalar(pScale);
                }
            } else if (coreGroupRef.current) {
                const s = coreGroupRef.current.scale.x;
                if (s !== 1) coreGroupRef.current.scale.setScalar(THREE.MathUtils.lerp(s, 1, 0.08));
            }

            // ── Dynamic light: keep lights neutral, do NOT colorize them
            // (Removing colored light lerp to avoid the neon overlit look)

            // ── Star field drift ──────────────────────────────
            starField.rotation.y += delta * 0.015;
            starField.rotation.x += delta * 0.008;

            // ── Global rings ──────────────────────────────────
            ringsGroup.children.forEach((r: any) => { r.rotation.z += r.userData.sp; });
            ringsGroup.rotation.y = mx * 0.04;
            ringsGroup.rotation.x = -my * 0.04;

            // ── Model fade-in ─────────────────────────────────
            if (fadingInRef.current && model) {
                modelOpacityRef.current = Math.min(1, modelOpacityRef.current + delta * 2.5);
                model.traverse((obj: any) => { if (obj.material?.transparent) obj.material.opacity = Math.min(obj.material.opacity + delta * 2.5 * 0.5, 1); });
                if (modelOpacityRef.current >= 1) fadingInRef.current = false;
            }

            if (!coreGroupRef.current || !ud) { composerRef.current?.render(); return; }
            const cg = coreGroupRef.current;

            // Mouse parallax for core group
            cg.position.x += (mx * 0.1 - cg.position.x) * 0.05;
            cg.position.y += (-my * 0.1 - cg.position.y) * 0.05;

            // ── Domain animations ─────────────────────────────
            if (dIdx === 0 && ud.isAIBrain) {
                ud.brain.rotation.y += delta * 0.28; ud.brain.rotation.x += delta * 0.1;
                ud.inner.rotation.y -= delta * 0.4; ud.inner.rotation.z += delta * 0.15;
                ud.nodes.forEach((n: THREE.Mesh, i: number) => { const p = Math.sin(time * 3 + i * 0.6) * 0.5 + 0.5; (n.material as THREE.MeshBasicMaterial).opacity = 0.3 + p * 0.7; n.scale.setScalar(0.8 + p * 0.5); });
                cg.rotation.y += delta * 0.12;
            } else if (dIdx === 1 && ud.isChatbot) {
                cg.position.y += Math.sin(time * 1.5) * 0.0006;
                ud.headGroup.rotation.y = THREE.MathUtils.lerp(ud.headGroup.rotation.y, mx * 0.55, 0.1);
                ud.headGroup.rotation.x = THREE.MathUtils.lerp(ud.headGroup.rotation.x, -my * 0.28, 0.1);
                const pulse = Math.abs(Math.sin(time * 18)) * (0.3 + Math.random() * 0.7);
                ud.mouth.scale.y = 1 + pulse * 5.5;
                if (ud.mouth.material?.opacity !== undefined) (ud.mouth.material as any).opacity = 0.6 + pulse * 0.4;
                const blink = Math.sin(time * 0.8) > 0.98 ? 0.08 : 1;
                ud.eyeL.scale.y = blink; ud.eyeR.scale.y = blink;
                ud.ring1.rotation.z += delta * 0.55; ud.ring2.rotation.z -= delta * 0.28;
            } else if (dIdx === 2 && ud.isAIRep) {
                ud.head.rotation.y += delta * 0.35; ud.body.rotation.y += delta * 0.1; ud.aura.rotation.y -= delta * 0.04;
                ud.rings.forEach(({ mesh, delay }: any) => { const t = (time * 0.55 + delay) % 3.2; const p = t / 3.2; mesh.scale.setScalar(0.25 + p * 2.8); (mesh.material as THREE.MeshBasicMaterial).opacity = (1 - p) * 0.55; });
                cg.rotation.y += delta * 0.07;
            } else if (dIdx === 3 && ud.isDynamicsAx) {
                ud.gear1.rotation.z += delta * 0.55; ud.gear2.rotation.z -= delta * 1.15;
                ud.cube.rotation.x += delta * 0.9; ud.cube.rotation.y += delta * 0.6;
                ud.pts.rotation.y += delta * 0.18; cg.rotation.y += delta * 0.1; cg.rotation.x += delta * 0.04;
            } else if (dIdx === 4 && ud.isCRM) {
                const p = Math.sin(time * 3) * 0.5 + 0.5;
                (ud.hub.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.15 + p * 0.35;
                ud.satellites.forEach(({ pivot, speed }: any) => { pivot.rotation.y += delta * speed * 0.5; pivot.rotation.x += delta * speed * 0.18; });
                cg.rotation.y += delta * 0.09;
            } else if (dIdx === 5 && ud.isWebDev) {
                ud.strips.forEach((strip: THREE.Group) => {
                    const { speed } = (strip as any).userData;
                    strip.children.forEach((char: any) => { char.position.y -= delta * speed; if (char.position.y < -0.55) char.position.y = 0.55; if (Math.random() > 0.99) char.visible = !char.visible; else if (Math.random() > 0.5) char.visible = true; });
                });
                ud.core.rotation.x += delta * 2; ud.core.rotation.y += delta * 1.5; cg.rotation.y += delta * 0.07;
            } else if (dIdx === 6 && ud.isERP) {
                ud.nodeBoxes.forEach((box: THREE.Mesh, i: number) => { const p = Math.sin(time * 2 + i * 0.7) * 0.5 + 0.5; (box.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.08 + p * 0.2; box.rotation.y += delta * 0.35; });
                ud.packets.forEach((pk: any) => { pk.progress += delta * pk.speed; if (pk.progress > 1) pk.progress = 0; pk.mesh.position.lerpVectors(ud.nodePosList[pk.aIdx], ud.nodePosList[pk.bIdx], pk.progress); });
                cg.rotation.y += delta * 0.09;
            } else if (dIdx === 7 && ud.isMobile) {
                // Animate floating UI panels orbiting the phone
                ud.floatingPanels?.forEach(({ pivot, speed }: any) => {
                    pivot.rotation.y += delta * speed;
                });
                // Animate UI cards — sequential opacity waves
                ud.uiCards?.forEach((card: THREE.Mesh, i: number) => {
                    const p = Math.sin(time * 1.5 + i * 0.7) * 0.5 + 0.5;
                    (card.material as THREE.MeshBasicMaterial).opacity = 0.06 + p * 0.16;
                });
                // Screen glow breathe
                if (ud.glowMesh?.material) (ud.glowMesh.material as THREE.MeshBasicMaterial).opacity = 0.03 + Math.sin(time * 2) * 0.02;
                // Glow ring slow spin
                if (ud.glowRing) ud.glowRing.rotation.z += delta * 0.2;
                // Gentle float and slight tilt
                cg.position.y += Math.sin(time * 1.1) * 0.0007;
                cg.rotation.y += delta * 0.08;
                cg.rotation.x = Math.sin(time * 0.4) * 0.06;
            } else if (dIdx === 8 && ud.isQIntellect) {
                ud.lattices.forEach((l: THREE.Mesh, i: number) => { l.rotation.y += delta * (0.22 + i * 0.14) * (i % 2 === 0 ? 1 : -1); l.rotation.x += delta * (0.1 + i * 0.05); });
                const cp = Math.sin(time * 4) * 0.5 + 0.5;
                (ud.core.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.4 + cp * 0.4;
                ud.core.scale.setScalar(1 + cp * 0.12);
                ud.particles.rotation.y += delta * 0.28; ud.particles.rotation.x += delta * 0.1;
                ud.arcs.forEach((arc: THREE.Mesh, i: number) => { arc.rotation.z += delta * (0.35 + i * 0.1) * (i % 2 === 0 ? 1 : -1); });
                cg.rotation.y += delta * 0.11;
            } else if (dIdx === 9 && ud.isServer) {
                ud.serverPlanes.forEach((s: THREE.LineSegments, i: number) => { const p = Math.sin(time * 3 + i * 0.55) * 0.5 + 0.5; (s.material as THREE.LineBasicMaterial).opacity = 0.18 + p * 0.5; });
                ud.beams.forEach((bm: any) => { bm.progress += delta * bm.speed; if (bm.progress > 1) bm.progress = 0; (bm.line.material as THREE.LineBasicMaterial).opacity = Math.sin(bm.progress * Math.PI) * 0.95; });
                ud.nodes.forEach((n: THREE.Mesh, i: number) => { const p = Math.sin(time * 4 + i * 1.5) * 0.5 + 0.5; (n.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.15 + p * 0.3; n.scale.setScalar(0.9 + p * 0.25); });
                cg.rotation.y += delta * 0.09; cg.rotation.x = Math.sin(time * 0.3) * 0.07;
            }

            composerRef.current?.render();
        };
        animate();

        const onResize = () => {
            if (!containerRef.current || !cameraRef.current || !composerRef.current || !rendererRef.current) return;
            const w = containerRef.current.clientWidth, h = containerRef.current.clientHeight;
            cameraRef.current.aspect = w / h; cameraRef.current.updateProjectionMatrix();
            rendererRef.current.setSize(w, h); composerRef.current.setSize(w, h);
        };
        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('resize', onResize);
            if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
            renderer.dispose();
        };
    }, []);

    // Domain change — crossfade swap
    useEffect(() => {
        domainIndexRef.current = domainIndex;
        if (!coreGroupRef.current) return;

        const old = currentModelRef.current;
        if (old) {
            coreGroupRef.current.remove(old);
            old.traverse((obj: any) => { if (obj.geometry) obj.geometry.dispose(); if (obj.material) { if (Array.isArray(obj.material)) obj.material.forEach((m: any) => m.dispose()); else obj.material.dispose(); } });
        }

        coreGroupRef.current.rotation.set(0, 0, 0);
        coreGroupRef.current.position.set(0, 0, 0);
        coreGroupRef.current.scale.setScalar(1);

        const newModel = createDomainModel(domainIndex);
        // Start transparent for fade-in
        newModel.traverse((obj: any) => { if (obj.material?.transparent) obj.material.opacity = 0; });
        coreGroupRef.current.add(newModel);
        currentModelRef.current = newModel;
        modelOpacityRef.current = 0;
        fadingInRef.current = true;
        // Text-to-3D sync: trigger a scale+brightness pulse
        syncPulseRef.current = 1.0;
    }, [domainIndex]);

    // Video swap
    useEffect(() => {
        if (videoUrl !== prevVideoUrl.current) {
            setFade(true);
            const t = setTimeout(() => { if (videoRef.current) { videoRef.current.src = videoUrl; videoRef.current.play().catch(() => { }); } setFade(false); prevVideoUrl.current = videoUrl; }, 300);
            return () => clearTimeout(t);
        }
    }, [videoUrl]);

    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#020410]">
            <video ref={videoRef} autoPlay muted loop playsInline src={videoUrl}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${fade ? 'opacity-0' : 'opacity-[0.08]'}`} />

            {/* Perspective grid floor */}
            <div className="absolute inset-0 z-10 opacity-[0.12] pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(94,98,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(94,98,255,0.18) 1px, transparent 1px)`, backgroundSize: '80px 80px', perspective: '1200px', transform: 'rotateX(72deg) scale(1.6) translateY(20%)', transformOrigin: 'center bottom', maskImage: 'radial-gradient(circle at center, black, transparent 85%)' }} />

            {/* Ambient glows — these tint based on CSS animations */}
            <div className="absolute top-[8%] right-[12%] w-[38%] h-[38%] rounded-full z-10" style={{ background: `radial-gradient(circle, rgba(94,98,255,0.12), transparent 70%)`, filter: 'blur(60px)' }} />
            <div className="absolute bottom-[12%] left-[8%] w-[32%] h-[32%] rounded-full z-10" style={{ background: `radial-gradient(circle, rgba(153,102,255,0.1), transparent 70%)`, filter: 'blur(80px)' }} />
            <div className="absolute top-[40%] left-[40%] w-[25%] h-[25%] rounded-full z-10" style={{ background: `radial-gradient(circle, rgba(0,242,255,0.06), transparent 70%)`, filter: 'blur(100px)' }} />

            {/* Three.js canvas container */}
            <div ref={containerRef} className="w-full h-full relative z-20" />

            {/* Film grain */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.018] z-30" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #fff 3px)', backgroundSize: '100% 4px' }} />

            {/* Vignette */}
            <div className="absolute inset-0 z-30 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 50%, rgba(2,4,16,0.65) 100%)' }} />
        </div>
    );
};

export default QuantumNetwork;
