
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { 
  ChevronRight, 
  Play, 
  BrainCircuit,
  MessageSquare,
  UserCheck,
  Settings,
  Code,
  RefreshCw,
  Database,
  Radio,
  Target,
  Zap,
  Rocket,
  ArrowRight,
  Activity,
  ShoppingCart,
  Factory,
  ShieldCheck,
  Cpu,
  Layers,
  Terminal,
  Search,
  Globe,
  Monitor,
  Lock,
  Cpu as ProcessorIcon,
  Activity as PulseIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SERVICES } from '../constants';

// --- Neural Hero Background Component ---
const HeroNeuralBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }

    interface Pulse {
      startNode: Node;
      endNode: Node;
      progress: number;
      speed: number;
    }

    const nodes: Node[] = [];
    const pulses: Pulse[] = [];
    const nodeCount = Math.floor((width * height) / 25000) + 20; // Density-based node count
    const connectionDist = 200;

    // Initialize Nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Update & Draw Nodes
      nodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(37, 99, 235, 0.4)';
        ctx.fill();

        // Check for connections and draw lines
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            const alpha = (1 - dist / connectionDist) * 0.2;
            ctx.strokeStyle = `rgba(37, 99, 235, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();

            // Randomly spawn pulses on valid connections
            if (Math.random() < 0.001 && pulses.length < 30) {
              pulses.push({
                startNode: node,
                endNode: other,
                progress: 0,
                speed: 0.005 + Math.random() * 0.015
              });
            }
          }
        }
      });

      // Update & Draw Pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.progress += p.speed;

        if (p.progress >= 1) {
          pulses.splice(i, 1);
          continue;
        }

        const px = p.startNode.x + (p.endNode.x - p.startNode.x) * p.progress;
        const py = p.startNode.y + (p.endNode.y - p.startNode.y) * p.progress;

        const gradient = ctx.createRadialGradient(px, py, 0, px, py, 6);
        gradient.addColorStop(0, 'rgba(168, 85, 247, 1)'); // Purple
        gradient.addColorStop(1, 'rgba(168, 85, 247, 0)');

        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(168, 85, 247, 0.8)';
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      requestAnimationFrame(draw);
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    draw();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-slate-50">
      {/* Background Radial Overlays */}
      <div className="absolute top-0 right-0 w-[80%] h-[80%] bg-[radial-gradient(circle_at_70%_30%,rgba(37,99,235,0.08)_0%,transparent_70%)]" />
      <div className="absolute bottom-0 left-0 w-[60%] h-[60%] bg-[radial-gradient(circle_at_30%_70%,rgba(168,85,247,0.05)_0%,transparent_70%)]" />
      
      <canvas 
        ref={canvasRef} 
        className="w-full h-full opacity-60"
      />
      
      {/* Mesh Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" 
        style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }} 
      />
    </div>
  );
};

// --- Typewriter Component for Hero ---
const TypewriterHeadline: React.FC = () => {
  const words = ["Intelligence.", "Resilience.", "Scalability.", "Stability."];
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 2000);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 75 : 150);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  return (
    <span className="relative inline-block text-blue-600">
      {words[index].substring(0, subIndex)}
      <span className="inline-block w-[4px] h-[0.8em] bg-blue-600 ml-2 animate-pulse align-middle" />
    </span>
  );
};

// --- Web Development Tilt Card Component ---
const WebDevBentoCard: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const features = [
    { label: 'Progressive Web Apps', icon: Globe, detail: 'Offline capability & native feel.', color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Secure Architecture', icon: Lock, detail: 'Atomic rollbacks & Zero Trust.', color: 'text-indigo-500', bg: 'bg-indigo-50' },
    { label: 'SEO Optimization', icon: Search, detail: 'Maximized search visibility.', color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { label: 'API First Design', icon: Terminal, detail: 'Headless mesh integration.', color: 'text-purple-500', bg: 'bg-purple-50' }
  ];

  return (
    <motion.div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="md:col-span-5 group relative overflow-visible rounded-3xl bg-white border border-slate-200/60 p-6 md:p-8 flex flex-col justify-between shadow-2xl transition-all duration-300 hover:shadow-blue-200/40"
    >
      {/* 3D Depth Elements */}
      <div 
        style={{ transform: "translateZ(75px)", transformStyle: "preserve-3d" }}
        className="relative z-20 space-y-6"
      >
        <div className="flex justify-between items-start">
           <div className="space-y-1">
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.5em] flex items-center">
                <Monitor className="w-3 h-3 mr-3" /> Technical Core
              </span>
              <h3 className="text-3xl md:text-4xl font-medium font-heading text-slate-900 tracking-tighter leading-none">
                Web <br /> <span className="text-blue-600">Architectures.</span>
              </h3>
              <div className="flex items-center space-x-2 mt-4">
                 <div className="px-3 py-1 bg-slate-900 text-[8px] font-mono text-blue-400 rounded-full border border-slate-700">
                  BUILD_MANIFEST_V4.2
                 </div>
                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              </div>
           </div>
           <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-blue-500/40 transition-all duration-500 group-hover:rotate-6">
              <Code className="w-6 h-6" />
           </div>
        </div>
        
        <p className="text-slate-500 font-light text-sm md:text-base leading-relaxed max-w-sm">
          Engineering high-performance, enterprise-grade web platforms that bridge the gap between complex backend logic and seamless user experience.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((f, i) => (
            <motion.div 
              key={i} 
              whileHover={{ scale: 1.02, y: -2 }}
              className="flex flex-col p-4 bg-slate-50/80 backdrop-blur-sm rounded-2xl border border-slate-100 group/feat hover:bg-white hover:border-blue-200 hover:shadow-lg transition-all duration-300"
            >
               <div className={`w-8 h-8 ${f.bg} ${f.color} rounded-lg flex items-center justify-center mb-3 transition-transform group-hover/feat:rotate-3`}>
                  <f.icon className="w-4 h-4" />
               </div>
               <span className="text-[10px] text-slate-900 font-black uppercase tracking-widest leading-tight mb-1">{f.label}</span>
               <span className="text-[9px] text-slate-400 font-medium uppercase tracking-wider">{f.detail}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background Decor */}
      <div 
        style={{ transform: "translateZ(20px)" }}
        className="absolute inset-0 opacity-[0.03] pointer-events-none p-4 font-mono text-[8px] overflow-hidden whitespace-nowrap z-0"
      >
        {Array.from({ length: 40 }).map((_, i) => (
          <div key={i}>const node = await Registry.deploy("v4.2", {`{ secure: true, edge: "global" }`}); sync(node);</div>
        ))}
      </div>

      {/* Button with 3D Pop */}
      <div 
        style={{ transform: "translateZ(50px)" }}
        className="pt-6 relative z-20"
      >
         <Link to="/service/web-development" className="w-full py-4 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.3em] text-center block hover:bg-blue-600 transition-all shadow-2xl relative overflow-hidden group/btn">
            <span className="relative z-10 flex items-center justify-center">
              Explore Technical Specs <ChevronRight className="w-3 h-3 ml-3" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
         </Link>
      </div>
    </motion.div>
  );
};

const Home: React.FC = () => {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  
  // Parallax Setup
  const heroRef = useRef(null);
  const philosophyRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const { scrollYProgress: philScroll } = useScroll({ target: philosophyRef, offset: ["start end", "end start"] });

  const heroParallaxY = useTransform(heroScroll, [0, 1], [0, 200]);
  const heroScale = useTransform(heroScroll, [0, 1], [1, 0.95]);
  const heroOpacity = useTransform(heroScroll, [0, 1], [1, 0.5]);
  
  const philImageY = useTransform(philScroll, [0, 1], [100, -100]);
  const philCardY = useTransform(philScroll, [0, 1], [50, -50]);

  return (
    <div className="bg-transparent text-slate-900 font-light selection:bg-blue-100 selection:text-blue-700 overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section ref={heroRef} className="relative min-h-[95vh] flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden">
        {/* Animated Background */}
        <HeroNeuralBackground />
        
        <motion.div 
          style={{ y: heroParallaxY, scale: heroScale, opacity: heroOpacity }}
          className="container mx-auto px-4 md:px-8 relative z-10"
        >
          <div className="flex flex-col items-center text-center space-y-12 max-w-7xl mx-auto">
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center space-x-3 px-6 py-2.5 rounded-full bg-white/80 backdrop-blur-xl border border-blue-600/20 text-blue-600 text-[11px] font-black uppercase tracking-[0.5em] shadow-xl"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse shadow-[0_0_15px_rgba(37,99,235,0.6)]" />
              <span>Sovereign Enterprise Logic</span>
            </motion.div>
            
            <div className="space-y-6 relative">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="text-4xl md:text-7xl font-medium text-slate-900 tracking-tighter leading-[0.9] font-heading"
              >
                Architecting <br />
                Global <TypewriterHeadline />
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 1 }}
                className="text-base md:text-xl text-slate-500 leading-relaxed max-w-3xl mx-auto font-light"
              >
                High-end technical consultancy for Fortune 500 corporations. We deploy secure AI frameworks, resilient IoT mesh networks, and scalable enterprise architectures.
              </motion.p>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 pt-6"
            >
              <Link to="/contact" className="w-full sm:w-auto px-12 py-5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-2xl flex items-center justify-center group relative overflow-hidden">
                <span className="relative z-10 tracking-widest uppercase text-[10px]">Book Strategy</span>
                <ChevronRight className="w-4 h-4 ml-2 relative z-10 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link to="/services" className="w-full sm:w-auto flex items-center justify-center space-x-4 group text-slate-600 hover:text-blue-600 transition-colors bg-white/60 px-8 py-5 rounded-xl backdrop-blur-md border border-slate-200">
                <Play className="w-4 h-4 fill-blue-600 text-blue-600" />
                <span className="font-bold tracking-widest uppercase text-[10px]">Technical Specs</span>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Floating Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-300"
        >
          <div className="w-px h-12 bg-gradient-to-b from-blue-600 to-transparent mx-auto" />
        </motion.div>
      </section>

      {/* 2. TECHNICAL CORE CAPABILITIES: COMMAND CENTER GRID */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-4 md:px-8">
          
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-0.5 bg-blue-600 rounded-full" />
                <span className="text-[11px] font-black text-blue-600 uppercase tracking-[0.5em]">Command Center</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-medium text-slate-900 tracking-tighter font-heading">Core Ecosystem Visualization</h2>
            </div>
            <div className="bg-slate-900 text-white px-6 py-3 rounded-xl flex items-center space-x-4 shadow-xl border border-slate-700">
               <PulseIcon className="w-4 h-4 text-green-400 animate-pulse" />
               <div className="flex flex-col">
                  <span className="text-[9px] font-mono text-slate-400 leading-none">SYSTEM_LOAD</span>
                  <span className="text-xs font-mono font-bold leading-none mt-1">0.12ms LATENCY</span>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-auto">
            
            {/* AI Card - Large Hero Item */}
            <motion.div 
              onMouseEnter={() => setHoveredTech('ai')}
              onMouseLeave={() => setHoveredTech(null)}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-7 md:row-span-2 group relative overflow-hidden rounded-3xl bg-slate-900 text-white p-8 md:p-10 border border-slate-800 shadow-2xl"
              whileHover={{ y: -5 }}
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
                <BrainCircuit className="w-48 h-48" />
              </div>
              
              <div className="relative z-10 h-full flex flex-col justify-between space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-2xl shadow-blue-500/40">
                      <BrainCircuit className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest">Neural_Logic_v2</span>
                      <h3 className="text-2xl md:text-4xl font-medium font-heading tracking-tight">Artificial Intelligence</h3>
                    </div>
                  </div>
                  <p className="text-lg text-slate-400 font-light leading-relaxed max-w-xl">
                    Deploying proprietary Transformer-based models for enterprise process optimization and autonomous logic.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Inference Rate</div>
                    <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                       <motion.div animate={{ width: hoveredTech === 'ai' ? '94%' : '0%' }} className="h-full bg-blue-50" />
                    </div>
                    <div className="text-xs font-mono text-blue-400">94.2% OPTIMIZED</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Accuracy Delta</div>
                    <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                       <motion.div animate={{ width: hoveredTech === 'ai' ? '99%' : '0%' }} className="h-full bg-green-500" />
                    </div>
                    <div className="text-xs font-mono text-green-400">+0.04% CONFIDENCE</div>
                  </div>
                </div>

                <Link to="/service/artificial-intelligence" className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.4em] text-blue-400 hover:text-white transition-colors">
                  View Neural Architecture <ChevronRight className="w-3 h-3 ml-2" />
                </Link>
              </div>
            </motion.div>

            {/* Web Development - The Re-designed Blueprint Card */}
            <WebDevBentoCard />

            {/* IoT & Edge Computing - Real-time Visualization Card */}
            <motion.div 
              onMouseEnter={() => setHoveredTech('iot')}
              onMouseLeave={() => setHoveredTech(null)}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="md:col-span-5 group relative overflow-hidden rounded-3xl bg-blue-600 text-white p-8 flex flex-col justify-between shadow-2xl shadow-blue-500/20"
              whileHover={{ y: -5 }}
            >
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1)_0%,transparent_60%)]" />
               <div className="relative z-10 space-y-4">
                 <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                       <Radio className="w-5 h-5" />
                    </div>
                    <div>
                       <span className="text-[10px] font-bold text-blue-200 uppercase tracking-widest">Real-time Edge</span>
                       <h3 className="text-xl font-medium font-heading">IoT Ecosystems</h3>
                    </div>
                 </div>
                 <p className="text-xs text-blue-50 font-light leading-relaxed">
                   Connecting physical assets with digital twin simulations for comprehensive operational visibility.
                 </p>
               </div>

               <div className="relative h-16 mt-4 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center overflow-hidden">
                  <div className="flex space-x-1 items-end h-8">
                    {[0.2, 0.5, 0.3, 0.8, 0.6, 0.9, 0.4, 0.7].map((h, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ height: '20%' }}
                        animate={{ height: hoveredTech === 'iot' ? `${h * 100}%` : '20%' }}
                        transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse', delay: i * 0.1 }}
                        className="w-1.5 bg-blue-200 rounded-full" 
                      />
                    ))}
                  </div>
                  <div className="absolute top-2 right-4 text-[7px] font-mono text-blue-200">SIGNAL_STRENGTH: 98%</div>
               </div>
            </motion.div>

            {/* D365 / ERP - Data Cards */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="md:col-span-4 group relative overflow-hidden rounded-3xl bg-white border border-slate-100 p-6 shadow-xl hover:-translate-y-2 transition-transform">
               <div className="space-y-4">
                 <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center text-slate-900 border border-slate-100">
                       <Settings className="w-4 h-4" />
                    </div>
                    <h3 className="text-lg font-bold font-heading text-slate-900">Dynamics 365</h3>
                 </div>
                 <p className="text-[11px] text-slate-500 leading-relaxed font-light">
                    Unifying global ERP and CRM silos into a single source of enterprise truth.
                 </p>
                 <div className="space-y-2">
                    <div className="flex justify-between text-[8px] font-bold text-slate-400">
                       <span>INTEGRATION_SYNC</span>
                       <span>OK</span>
                    </div>
                    <div className="w-full h-1 bg-slate-100 rounded-full">
                       <div className="w-full h-full bg-green-500 rounded-full" />
                    </div>
                 </div>
                 <Link to="/service/dynamics-365" className="inline-flex items-center text-[8px] font-black uppercase tracking-widest text-blue-600">
                    Module Archive <ArrowRight className="w-3 h-3 ml-2" />
                 </Link>
               </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="md:col-span-4 group relative overflow-hidden rounded-3xl bg-white border border-slate-100 p-6 shadow-xl hover:-translate-y-2 transition-transform">
               <div className="space-y-4">
                 <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center text-slate-900 border border-slate-100">
                       <Database className="w-4 h-4" />
                    </div>
                    <h3 className="text-lg font-bold font-heading text-slate-900">Enterprise ERP</h3>
                 </div>
                 <p className="text-[11px] text-slate-500 leading-relaxed font-light">
                    Legacy modernization and SAP-to-Cloud migration strategies for complex supply chains.
                 </p>
                 <div className="flex items-center space-x-3">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping" />
                    <span className="text-[8px] font-mono text-slate-400">DATA_MIRROR_ACTIVE</span>
                 </div>
                 <Link to="/service/erp-solutions" className="inline-flex items-center text-[8px] font-black uppercase tracking-widest text-blue-600">
                    ERP Roadmap <ArrowRight className="w-3 h-3 ml-2" />
                 </Link>
               </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="md:col-span-4 group relative overflow-hidden rounded-3xl bg-white border border-slate-100 p-6 shadow-xl hover:-translate-y-2 transition-transform">
               <div className="space-y-4">
                 <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center text-slate-900 border border-slate-100">
                       <RefreshCw className="w-4 h-4" />
                    </div>
                    <h3 className="text-lg font-bold font-heading text-slate-900">EDI Exchange</h3>
                 </div>
                 <p className="text-[11px] text-slate-500 leading-relaxed font-light">
                    AS2-compliant global interchange translation and secure partner management.
                 </p>
                 <div className="flex -space-x-1.5">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-5 h-5 rounded-full border border-white bg-blue-100 text-[7px] flex items-center justify-center font-bold text-blue-600">P{i}</div>
                    ))}
                    <div className="px-1.5 h-5 rounded-full border border-white bg-slate-100 text-[7px] flex items-center justify-center font-bold text-slate-400">+14 Partners</div>
                 </div>
                 <Link to="/service/edi-solutions" className="inline-flex items-center text-[8px] font-black uppercase tracking-widest text-blue-600">
                    Protocol Docs <ArrowRight className="w-3 h-3 ml-2" />
                 </Link>
               </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. ABOUT QINTELLECT SECTION */}
      <section ref={philosophyRef} className="py-48 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8">
           <div className="flex flex-col lg:flex-row gap-32 items-center">
              <div className="lg:w-1/2 space-y-12">
                <div className="space-y-6">
                  <span className="text-[11px] font-black text-blue-600 uppercase tracking-[0.5em]">The Engineering Philosophy</span>
                  <h2 className="text-5xl md:text-[5.5rem] font-medium text-slate-900 leading-[0.95] tracking-tighter font-heading">Sovereign Logic. <br /> Global Resilience.</h2>
                  <p className="text-2xl text-slate-500 font-light leading-relaxed">
                    QIntellect was founded on a singular premise: that enterprise infrastructure should be as agile as a startup, yet as resilient as a global superpower.
                  </p>
                </div>
                
                <div className="space-y-10 text-slate-500 font-light leading-relaxed text-xl">
                   <p>
                     Since 2012, we have been at the forefront of the digital industrial revolution. Our team of lead systems architects and AI researchers work exclusively with high-growth corporations to build "Sovereign Intelligence".
                   </p>
                </div>

                <div className="grid grid-cols-2 gap-12 pt-10 border-t border-slate-100">
                   <div className="space-y-3">
                      <h4 className="text-6xl font-medium text-blue-600 tracking-tighter">12Y+</h4>
                      <p className="text-[11px] text-slate-400 font-bold uppercase tracking-[0.4em]">Sector Leadership</p>
                   </div>
                   <div className="space-y-3">
                      <h4 className="text-6xl font-medium text-blue-600 tracking-tighter">500+</h4>
                      <p className="text-[11px] text-slate-400 font-bold uppercase tracking-[0.4em]">Global Deployments</p>
                   </div>
                </div>

                <div className="pt-8">
                  <Link to="/about" className="inline-flex items-center px-12 py-6 bg-slate-900 text-white rounded-2xl text-[11px] font-bold uppercase tracking-widest hover:bg-blue-600 transition-all shadow-2xl">
                     Our Full Mission <ArrowRight className="w-6 h-6 ml-4" />
                  </Link>
                </div>
              </div>

              <div className="lg:w-1/2 relative">
                 <motion.div style={{ y: philImageY }} className="relative rounded-[4rem] overflow-hidden shadow-2xl border-4 border-white bg-white">
                    <img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069&auto=format&fit=crop" alt="Digital Infrastructure Hub" className="w-full aspect-[4/5] object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-1000" />
                    <div className="absolute inset-0 bg-blue-900/10" />
                 </motion.div>
                 
                 <motion.div 
                   style={{ y: philCardY }}
                   className="absolute -bottom-16 -left-16 glass-card p-12 rounded-[3.5rem] shadow-2xl space-y-8 max-w-sm hidden xl:block border border-white/60"
                 >
                    <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-xl">
                       <ShieldCheck className="w-9 h-9" />
                    </div>
                    <div className="space-y-4">
                       <h5 className="text-2xl font-medium text-slate-900 font-heading">Zero-Risk Sync</h5>
                       <p className="text-sm text-slate-500 font-light leading-relaxed">Our proprietary "Strangle Pattern" ensures zero downtime during legacy-to-cloud migrations.</p>
                       <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: '100%' }}
                            transition={{ duration: 2 }}
                            className="h-full bg-blue-600" 
                          />
                       </div>
                    </div>
                 </motion.div>
              </div>
           </div>
        </div>
      </section>

      {/* 4. CORE SERVICES DETAILED GRID SECTION */}
      <section className="py-48 bg-white/40 backdrop-blur-sm border-y border-white/40">
        <div className="container mx-auto px-4 md:px-8">
           <div className="max-w-4xl mb-24 space-y-6">
              <span className="text-[11px] font-black text-blue-600 uppercase tracking-[0.5em]">The Technical Stack</span>
              <h2 className="text-5xl md:text-8xl font-medium text-slate-900 leading-tight tracking-tighter font-heading">High-Fidelity <br /> Engineering.</h2>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {SERVICES.map((s, i) => (
                <motion.div 
                  key={s.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 3) * 0.1 }}
                  className="group p-12 bg-white glass-card rounded-[4rem] border border-white hover:border-blue-300 shadow-xl hover:shadow-3xl hover:-translate-y-3 transition-all duration-700 flex flex-col relative overflow-hidden"
                >
                   <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-bl-full z-0 group-hover:scale-150 transition-transform duration-1000" />
                   
                   <div className="w-20 h-20 bg-blue-600 text-white rounded-3xl flex items-center justify-center mb-12 group-hover:shadow-2xl group-hover:rotate-6 transition-all shadow-xl relative z-10">
                      <Code className="w-10 h-10" />
                   </div>
                   
                   <h4 className="text-3xl font-medium text-slate-900 mb-6 font-heading tracking-tight relative z-10">{s.title}</h4>
                   <p className="text-slate-500 font-light leading-relaxed text-base mb-12 flex-grow relative z-10">
                     {s.shortDescription}
                   </p>
                   
                   <ul className="space-y-4 mb-12 relative z-10">
                      {s.features.slice(0, 3).map((f, idx) => (
                        <li key={idx} className="flex items-center text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
                           <div className="w-2 h-2 rounded-full bg-blue-600 mr-5 shadow-sm" />
                           {f}
                        </li>
                      ))}
                   </ul>
                   
                   <Link to={`/service/${s.id}`} className="inline-flex items-center text-[11px] font-black uppercase tracking-[0.4em] text-blue-600 group-hover:text-slate-900 transition-colors relative z-10">
                      View Blueprint <ChevronRight className="w-5 h-5 ml-3" />
                   </Link>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* 5. INDUSTRY SECTOR EXPERTISE */}
      <section className="py-48">
        <div className="container mx-auto px-4 md:px-8">
           <div className="flex flex-col lg:flex-row justify-between items-end mb-32 gap-12">
              <div className="space-y-6 max-w-3xl">
                 <span className="text-[11px] font-black text-blue-600 uppercase tracking-[0.5em]">Vertical Impact</span>
                 <h2 className="text-5xl md:text-8xl font-medium text-slate-900 leading-tight tracking-tighter font-heading">Global Leadership.</h2>
              </div>
              <Link to="/industries" className="px-12 py-6 glass-card border-2 border-slate-200 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all mb-4">Explore All Sectors</Link>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              {[
                { 
                  name: 'Smart Manufacturing', 
                  icon: Factory, 
                  color: 'text-orange-500', 
                  bg: 'bg-orange-50', 
                  img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop',
                  desc: 'Industry 4.0 frameworks that synchronize global production lines with predictive maintenance logic.'
                },
                { 
                  name: 'Digital Healthcare', 
                  icon: Activity, 
                  color: 'text-green-500', 
                  bg: 'bg-green-50', 
                  img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop',
                  desc: 'Sovereign data architectures for medical research and patient management, meeting strict global standards.'
                },
                { 
                  name: 'Intelligent Retail', 
                  icon: ShoppingCart, 
                  color: 'text-purple-500', 
                  bg: 'bg-purple-50', 
                  img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop',
                  desc: 'Unifying global supply chains with omnichannel consumer intelligence and real-time demand sync.'
                }
              ].map(ind => (
                <motion.div 
                  key={ind.name} 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group rounded-[5rem] overflow-hidden glass-card border border-white hover:shadow-4xl transition-all duration-1000 flex flex-col"
                >
                   <div className="h-80 overflow-hidden relative bg-slate-900">
                      <img src={ind.img} alt={ind.name} className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 opacity-90" />
                      <div className="absolute inset-0 bg-blue-900/10" />
                   </div>
                   <div className="p-16 space-y-10">
                      <div className={`w-20 h-20 rounded-3xl flex items-center justify-center ${ind.bg} ${ind.color} shadow-lg border border-white/50 group-hover:scale-110 transition-transform`}>
                        <ind.icon className="w-10 h-10" />
                      </div>
                      <h4 className="text-4xl font-medium text-slate-900 font-heading tracking-tight">{ind.name}</h4>
                      <p className="text-lg text-slate-500 font-light leading-relaxed">
                        {ind.desc}
                      </p>
                      <Link to="/contact" className="inline-flex items-center text-[11px] font-black uppercase tracking-[0.4em] text-slate-900 group-hover:text-blue-600 transition-colors">Strategic Roadmap <ArrowRight className="w-5 h-5 ml-5" /></Link>
                   </div>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* 6. THE DELIVERY FRAMEWORK */}
      <section className="py-48 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-blue-600/10 rounded-full blur-[200px] -translate-y-1/2 translate-x-1/2" />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
           <div className="text-center mb-40 space-y-10 max-w-4xl mx-auto">
              <span className="text-[11px] font-black text-blue-400 uppercase tracking-[0.7em]">The QIntellect Blueprint</span>
              <h2 className="text-5xl md:text-9xl font-medium tracking-tighter font-heading leading-tight">Architected for <br /> Certainty.</h2>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-4 gap-20 relative">
              <div className="absolute top-1/2 left-0 w-full h-px bg-white/10 hidden md:block" />
              {[
                { title: 'Discovery', desc: 'Technical debt analysis.', icon: Target },
                { title: 'Blueprint', desc: 'Secure architecture design.', icon: Layers },
                { title: 'Execution', desc: 'Agile development cycles.', icon: Zap },
                { title: 'Evolution', desc: 'Strategic scaling phase.', icon: Rocket }
              ].map((step, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative z-10 text-center space-y-12 group"
                >
                   <div className="w-24 h-24 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center mx-auto group-hover:bg-blue-600 group-hover:border-blue-400 transition-all duration-700 shadow-2xl relative">
                      <step.icon className="w-10 h-10 text-blue-400 group-hover:text-white" />
                      <div className="absolute -top-3 -right-3 w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-[10px] font-black border border-slate-700 text-slate-500">0{i+1}</div>
                   </div>
                   <div className="space-y-6">
                      <h4 className="text-3xl font-medium font-heading tracking-tight">{step.title}</h4>
                      <p className="text-base text-slate-400 font-light leading-relaxed px-6">{step.desc}</p>
                   </div>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* 7. FINAL CALL TO ACTION */}
      <section className="py-32">
        <div className="container mx-auto px-4 md:px-8">
           <div className="bg-blue-600 rounded-[7rem] p-24 md:p-48 text-center text-white relative overflow-hidden shadow-[0_60px_120px_-30px_rgba(37,99,235,0.5)]">
              <div className="absolute top-0 right-0 w-[1200px] h-[1200px] bg-white/10 rounded-full blur-[200px] translate-x-1/2 -translate-y-1/2" />
              <div className="relative z-10 max-w-6xl mx-auto space-y-20">
                 <h2 className="text-5xl md:text-[8.5rem] font-medium font-heading leading-none tracking-tighter">Architect Your <br /> Corporate Future.</h2>
                 <p className="text-2xl md:text-4xl text-blue-100 font-light max-w-4xl mx-auto leading-relaxed">
                   Join the global enterprise leaders who rely on QIntellect for technical stability and future-proof innovation.
                 </p>
                 <div className="flex flex-col sm:flex-row items-center justify-center gap-12">
                    <Link to="/contact" className="px-20 py-10 bg-white text-blue-600 rounded-3xl font-black hover:bg-slate-100 transition-all shadow-3xl tracking-[0.2em] uppercase text-xs">Book Strategy Session</Link>
                    <Link to="/services" className="px-20 py-10 border-2 border-blue-300 text-white rounded-3xl font-black hover:bg-blue-700 transition-all tracking-[0.2em] uppercase text-xs">Explore Capabilities</Link>
                 </div>
              </div>
           </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
