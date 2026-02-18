
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, animate } from 'framer-motion';
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
  Star,
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
  Activity as PulseIcon,
  Linkedin,
  Twitter,
  Instagram,
  BarChart3,
  Users,
  CheckCircle2,
  Bot,
  ClipboardCheck,
  BookOpen,
  Quote,
  Star as StarIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SERVICES } from '../constants';
import MagneticButton from '../components/MagneticButton';

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
    const nodeCount = Math.min(Math.floor((width * height) / 45000) + 10, 45); // Further reduced node count
    const connectionDist = 160; // Slightly tighter connections

    // Initialize Nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3, // Slower nodes
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.5 + 0.5
      });
    }

    let frameId: number;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Draw Connections (Lighter stroke)
      ctx.lineWidth = 0.5;
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx = node.x - other.x;
          const dy = node.y - other.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < connectionDist * connectionDist) {
            const dist = Math.sqrt(distSq);
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            const alpha = (1 - dist / connectionDist) * 0.15;
            ctx.strokeStyle = `rgba(37, 99, 235, ${alpha})`;
            ctx.stroke();

            if (Math.random() < 0.0005 && pulses.length < 15) {
              pulses.push({
                startNode: node,
                endNode: other,
                progress: 0,
                speed: 0.005 + Math.random() * 0.01
              });
            }
          }
        }

        // Draw Node (Simplified)
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(37, 99, 235, 0.3)';
        ctx.fill();
      }

      // Update & Draw Pulses (Removed ShadowBlur)
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.progress += p.speed;

        if (p.progress >= 1) {
          pulses.splice(i, 1);
          continue;
        }

        const px = p.startNode.x + (p.endNode.x - p.startNode.x) * p.progress;
        const py = p.startNode.y + (p.endNode.y - p.startNode.y) * p.progress;

        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(168, 85, 247, 0.8)';
        ctx.fill();
      }

      frameId = requestAnimationFrame(draw);
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
    };
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
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
        style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }} 
      />
    </div>
  );
};

// --- Typewriter Component for Hero ---
const TypewriterHeadline: React.FC = React.memo(() => {
  const words = ["Digital Core.", "AI Systems.", "Secure Tech.", "Future Platforms."];
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 1500);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 40 : 80);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  return (
    <span className="relative inline-block text-blue-600">
      {words[index].substring(0, subIndex)}
      <span className="inline-block w-[3px] h-[0.9em] bg-blue-600 ml-1 animate-pulse align-middle" />
    </span>
  );
});

// --- Animated Counter Component ---
const AnimatedCounter: React.FC<{ value: number; duration?: number }> = React.memo(({ value, duration = 2 }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate(count, value, { duration });
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    
    const unsubscribe = rounded.on("change", (latest) => setDisplay(latest));
    
    return () => {
      observer.disconnect();
      unsubscribe();
    };
  }, [value, duration]);

  return <span ref={ref}>{display}</span>;
});

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
      className="md:col-span-5 group relative overflow-visible rounded-2xl bg-white border border-slate-200/60 p-6 md:p-8 flex flex-col justify-between shadow-2xl transition-all duration-300 hover:shadow-blue-200/40 will-change-transform"
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

// --- Why Choose Us Section Component ---
const WhyChooseUs: React.FC = () => {
  const features = [
    {
      title: "Quality Services",
      desc: "Delivering high-fidelity technical solutions that exceed enterprise standards and operational benchmarks.",
      icon: BarChart3,
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      title: "Professional Experts",
      desc: "Our team consists of veteran engineers and AI researchers from top-tier global technology laboratories.",
      icon: Users,
      color: "text-indigo-600",
      bg: "bg-indigo-50"
    },
    {
      title: "99% Success Rates",
      desc: "A proven track record of successful deployments in mission-critical industrial and corporate environments.",
      icon: CheckCircle2,
      color: "text-emerald-600",
      bg: "bg-emerald-50"
    }
  ];

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-white skew-x-12 translate-x-1/4 pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left: Image Side */}
          <div className="lg:w-1/2 relative">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white z-10"
            >
              <img 
                src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop" 
                alt="Digital Agency Expertise" 
                className="w-full aspect-[4/5] object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-blue-900/10 pointer-events-none" />
            </motion.div>
            
            {/* Background pattern matching the image vibe */}
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px] opacity-20 -z-0" />
            
            {/* Floating Experience Badge */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-6 -right-6 p-6 bg-blue-600 text-white rounded-2xl shadow-2xl z-20"
            >
              <div className="text-3xl font-black font-heading">12+</div>
              <div className="text-[8px] font-bold uppercase tracking-widest opacity-80">Years Excellence</div>
            </motion.div>
          </div>

          {/* Right: Content Side */}
          <div className="lg:w-1/2 space-y-10">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <span className="text-[11px] font-black text-blue-600 uppercase tracking-[0.5em]">Way To Success</span>
                <div className="w-12 h-0.5 bg-blue-600" />
              </div>
              
              <h2 className="text-4xl md:text-6xl font-medium text-slate-900 leading-tight tracking-tighter font-heading">
                Reason for Choosing Our <br /> <span className="text-blue-600 italic uppercase">Digital Agency.</span>
              </h2>
              
              <p className="text-base text-slate-500 font-light leading-relaxed max-w-xl">
                There are many variations of passages of available but the majority have suffered alteration in some form, by injected hum randomised. We architect the future of interaction.
              </p>
            </div>

            <div className="space-y-8">
              {features.map((f, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start space-x-6 group"
                >
                  <div className={`flex-shrink-0 w-16 h-16 rounded-full ${f.bg} flex items-center justify-center border border-white shadow-lg group-hover:scale-110 group-hover:bg-slate-900 group-hover:text-white transition-all duration-500`}>
                    <f.icon className={`w-7 h-7 ${f.color} group-hover:text-white transition-colors`} />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-medium text-slate-900 font-heading tracking-tight underline decoration-blue-600/30 decoration-2 underline-offset-4">{f.title}</h4>
                    <p className="text-sm text-slate-500 font-light leading-relaxed max-w-sm">
                      {f.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

// --- Modern Service Card Visualizations ---
const ServiceVisualizer = ({ id }: { id: string }) => {
  if (id === 'artificial-intelligence') {
    return (
      <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500 rounded-full blur-[40px]" 
        />
        <svg className="w-full h-full" viewBox="0 0 200 200">
           <motion.circle cx="100" cy="100" r="40" stroke="rgba(37, 99, 235, 0.3)" fill="none" strokeWidth="0.5" />
           <motion.circle cx="100" cy="100" r="60" stroke="rgba(37, 99, 235, 0.2)" fill="none" strokeWidth="0.5" />
           {[0, 60, 120, 180, 240, 300].map(deg => {
              const x1 = 100 + Math.cos(deg * Math.PI / 180) * 40;
              const y1 = 100 + Math.sin(deg * Math.PI / 180) * 40;
              return (
                <motion.line 
                  key={deg}
                  x1={x1} y1={y1} x2="100" y2="100" 
                  stroke="rgba(37, 99, 235, 0.4)" 
                  strokeWidth="0.5" 
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              );
           })}
        </svg>
      </div>
    );
  }
  
  if (id === 'customized-chatbots') {
    return (
      <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-indigo-500/30 rounded-full animate-ping" />
        <div className="flex items-center justify-center h-full">
           <MessageSquare className="w-24 h-24 text-indigo-500/20" />
        </div>
      </div>
    );
  }

  if (id === 'ai-customer-representative') {
    return (
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(99,102,241,0.2),transparent_50%)]" />
        <div className="flex items-center justify-center h-full space-x-4">
           {[1,2,3].map(i => <motion.div key={i} animate={{ height: [10, 40, 10] }} transition={{ duration: 1, delay: i*0.2, repeat: Infinity }} className="w-1.5 bg-indigo-500/40 rounded-full" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
       <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-slate-900 rounded-full blur-[40px]" />
       <div className="grid grid-cols-6 gap-2 rotate-12 -translate-y-4">
          {Array.from({ length: 24 }).map((_, i) => (
            <motion.div 
              key={i} 
              animate={{ opacity: [0.1, 0.4, 0.1] }}
              transition={{ duration: 2, delay: i * 0.1, repeat: Infinity }}
              className="w-full aspect-square bg-slate-900/40 rounded-sm" 
            />
          ))}
       </div>
    </div>
  );
};

// --- Feature Ecosystem Component (Inspired by Aigocy) ---
const FeatureEcosystem: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const features = [
    {
      id: "agent",
      title: "Agent-Powered Workflows",
      desc: "Turn repetitive tasks into autonomous flows—agents plan, execute, and report with guardrails.",
      icon: Bot,
      side: "left",
      color: "blue"
    },
    {
      id: "eval",
      title: "Eval-First Quality",
      desc: "Measure accuracy, latency, safety, and cost from day one. Our evals keep models reliable.",
      icon: ClipboardCheck,
      side: "left",
      color: "indigo"
    },
    {
      id: "rag",
      title: "Private Knowledge RAG",
      desc: "Make your docs, tickets, and wikis instantly useful with retrieval augmented generation.",
      icon: BookOpen,
      side: "left",
      color: "slate"
    },
    {
      id: "ux",
      title: "Human-Centered AI UX",
      desc: "Interfaces, prompts, and error states designed for trust and adoption—smart and obvious.",
      icon: Users,
      side: "right",
      color: "blue"
    },
    {
      id: "secure",
      title: "Secure by Design",
      desc: "SSO/SAML, RBAC, secrets management, and compliance—ship AI that is enterprise-ready.",
      icon: ShieldCheck,
      side: "right",
      color: "indigo"
    },
    {
      id: "integrations",
      title: "Seamless Integrations",
      desc: "Plug into your stack (CRM, helpdesk, ERP, data warehouse) with webhooks and APIs.",
      icon: Zap,
      side: "right",
      color: "slate"
    }
  ];

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:40px_40px] opacity-30 pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20 space-y-4">
           <motion.span 
             initial={{ opacity: 0, y: 10 }}
             whileInView={{ opacity: 1, y: 0 }}
             className="px-4 py-1.5 rounded-full bg-slate-100 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500"
           >
             Unified Ecosystem
           </motion.span>
           <h2 className="text-5xl md:text-7xl font-medium text-slate-900 tracking-tighter font-heading italic uppercase">All Features in One.</h2>
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Desktop Central Hub & Lines Overlay */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none">
             <svg className="w-full h-full" viewBox="0 0 1000 600" fill="none">
                {/* Connecting Lines */}
                {features.map((f, i) => {
                   const isLeft = f.side === 'left';
                   const row = i % 3;
                   // Points are calibrated for a 1000x600 viewBox
                   const x1 = isLeft ? 400 : 600;
                   const y1 = 300;
                   const x2 = isLeft ? 300 : 700;
                   const y2 = row * 180 + 120;
                   
                   return (
                      <motion.path
                        key={f.id}
                        d={`M ${x1} ${y1} C ${isLeft ? x1-50 : x1+50} ${y1}, ${isLeft ? x2+50 : x2-50} ${y2}, ${x2} ${y2}`}
                        stroke={hoveredId === f.id ? "#2563eb" : "#e2e8f0"}
                        strokeWidth={hoveredId === f.id ? "3" : "1.5"}
                        strokeOpacity={hoveredId === f.id ? "1" : "0.5"}
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                      />
                   );
                })}
             </svg>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-0 items-center">
            {/* Left Column */}
            <div className="space-y-6 z-20">
              {features.filter(f => f.side === 'left').map((f) => (
                <motion.div
                  key={f.id}
                  onMouseEnter={() => setHoveredId(f.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  whileHover={{ x: 10, scale: 1.02 }}
                  className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-2xl hover:border-blue-100 transition-all duration-500 group cursor-pointer lg:mr-12"
                >
                  <div className="flex items-start gap-4">
                     <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-slate-950 flex items-center justify-center text-white group-hover:bg-blue-600 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                        <f.icon className="w-6 h-6" />
                     </div>
                     <div className="space-y-2">
                        <h3 className="text-xl font-medium font-heading tracking-tight group-hover:text-blue-600 transition-colors uppercase italic">{f.title}</h3>
                        <p className="text-sm text-slate-500 leading-relaxed font-light">{f.desc}</p>
                     </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Center Hub */}
            <div className="flex justify-center z-10">
               <motion.div 
                 initial={{ opacity: 0, scale: 0.8 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 className="w-56 h-56 sm:w-64 sm:h-64 rounded-[3.5rem] bg-gradient-to-br from-blue-600 to-indigo-700 p-1.5 shadow-[0_0_50px_rgba(37,99,235,0.2)] flex items-center justify-center relative group"
               >
                  <div className="absolute inset-0 bg-blue-600 rounded-[3.5rem] blur-3xl opacity-20 group-hover:opacity-40 transition-opacity animate-pulse" />
                  <div className="w-full h-full bg-white rounded-[3.2rem] flex flex-col items-center justify-center p-8 text-center space-y-4 relative overflow-hidden">
                     {/* Subtle Internal Grid */}
                     <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.05)_1px,transparent_1px)] bg-[size:15px_15px]" />
                     
                     <motion.div 
                       animate={{ rotate: 360 }}
                       transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                       className="w-20 h-20 bg-slate-900 rounded-2xl flex items-center justify-center relative z-10"
                     >
                        <Rocket className="w-10 h-10 text-white" />
                     </motion.div>
                     <div className="relative z-10">
                        <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">Enterprise Core</span>
                        <h4 className="text-2xl font-bold font-heading text-slate-900 mt-1">Q-System</h4>
                     </div>
                  </div>
               </motion.div>
            </div>

            {/* Right Column */}
            <div className="space-y-6 z-20">
              {features.filter(f => f.side === 'right').map((f) => (
                <motion.div
                  key={f.id}
                  onMouseEnter={() => setHoveredId(f.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  whileHover={{ x: -10, scale: 1.02 }}
                  className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-2xl hover:border-blue-100 transition-all duration-500 group cursor-pointer lg:ml-12"
                >
                  <div className="flex items-start gap-4">
                     <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-slate-950 flex items-center justify-center text-white group-hover:bg-blue-600 group-hover:-rotate-6 transition-all duration-500 shadow-lg">
                        <f.icon className="w-6 h-6" />
                     </div>
                     <div className="space-y-2">
                        <h3 className="text-xl font-medium font-heading tracking-tight group-hover:text-blue-600 transition-colors uppercase italic">{f.title}</h3>
                        <p className="text-sm text-slate-500 leading-relaxed font-light">{f.desc}</p>
                     </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Testimonial Section Component (Inspired by AI Image) ---
const TestimonialSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      text: "This AI product has completely transformed the way our team operates. From automating repetitive task providing smart insights, it's allowed us to focus more on strategy and branded active creativity!",
      name: "Jacob Jones",
      role: "Head of Digital Strategy, NovaTech",
      avatar: "https://i.pravatar.cc/150?u=jacob"
    },
    {
      text: "The integration process was seamless, and the results were immediate. Our efficiency has soared by 40% since adopting QIntellect's AI solutions for our workflow automation.",
      name: "Guy Hawkins",
      role: "Technical Lead, Aurora Systems",
      avatar: "https://i.pravatar.cc/150?u=guy"
    },
    {
      text: "Working with QIntellect was a game changer. Their deep understanding of AI and digital transformation helped us scale our operations globally with minimal friction.",
      name: "Eleanor Pena",
      role: "CEO, Streamline Corp",
      avatar: "https://i.pravatar.cc/150?u=eleanor"
    },
    {
      text: "The AI agency provided us with tools that we didn't even know were possible. Their predictive modeling has given us a massive competitive edge in the retail sector.",
      name: "Bessie Cooper",
      role: "Product Manager, RetailSync",
      avatar: "https://i.pravatar.cc/150?u=bessie"
    },
    {
      text: "Highly impressed with their attention to detail. The custom AI models they built for our customer support have reduced response times by nearly 70%. Highly recommended!",
      name: "Robert Fox",
      role: "Customer Success, GlobalEdge",
      avatar: "https://i.pravatar.cc/150?u=robert"
    },
    {
      text: "Expertise, professionalism, and innovation. That's how I'd describe QIntellect. They don't just provide services; they partner with you to ensure long-term success.",
      name: "Jane Cooper",
      role: "Founder, InnovateHQ",
      avatar: "https://i.pravatar.cc/150?u=jane"
    },
    {
      text: "Their vision for the future of AI is inspiring. We've seen a measurable ROI within the first quarter of implementing their digital intelligence framework.",
      name: "Cody Fisher",
      role: "Ops Director, FutureVision",
      avatar: "https://i.pravatar.cc/150?u=cody"
    },
    {
      text: "The most intuitive AI agency we've ever worked with. They speak both the language of technology and the language of business, bridging the gap perfectly.",
      name: "Arlene McCoy",
      role: "Marketing Head, BrandBoost",
      avatar: "https://i.pravatar.cc/150?u=arlene"
    },
    {
      text: "Security and scalability were our main concerns. QIntellect addressed both with a robust architecture that handles our massive data streams with ease.",
      name: "Theresa Webb",
      role: "CTO, SecureData",
      avatar: "https://i.pravatar.cc/150?u=theresa"
    },
    {
      text: "A truly remarkable experience. The team is responsive, intelligent, and dedicated. Our project was delivered on time and exceeded all our initial KPIs.",
      name: "Darrell Steward",
      role: "VP of Engineering, CloudX",
      avatar: "https://i.pravatar.cc/150?u=darrell"
    }
  ];

  const next = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 bg-[#F9FAFB] relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.15] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, #E5E7EB 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }} />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           {/* Left Section - Header + Cards */}
           <div className="lg:col-span-7">
              {/* Header */}
              <div className="mb-8">
                 <div className="flex items-center space-x-2.5 text-[#FF5722] mb-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-current" />
                    <span className="text-[11px] font-bold uppercase tracking-[0.35em]">TESTIMONIAL</span>
                 </div>
                 <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight font-heading">
                   Hear what our about customer <br /> say about our AI agency
                 </h2>
              </div>

              {/* Cards Section */}
              <div className="relative">
                 <div className="relative overflow-hidden pb-20">
                    <motion.div 
                      animate={{ x: -activeIndex * 380 }}
                      transition={{ duration: 0.6, ease: [0.25, 0.8, 0.25, 1] }}
                      className="flex gap-6"
                    >
                      {testimonials.map((t, i) => (
                         <div
                            key={i}
                            className="flex-shrink-0 w-[360px] bg-white p-8 rounded-[2rem] shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-slate-100"
                         >
                            {/* Stars */}
                            <div className="flex gap-1 mb-5">
                               {[1,2,3,4,5].map(s => (
                                 <StarIcon key={s} className="w-4 h-4 text-[#FF5722] fill-[#FF5722]" />
                               ))}
                            </div>

                            {/* Testimonial Text */}
                            <p className="text-[15px] text-slate-700 leading-relaxed mb-8 min-h-[140px]">
                               {t.text}
                            </p>

                            {/* Author Info */}
                            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                               <div className="flex items-center gap-3">
                                  <img 
                                    src={t.avatar} 
                                    alt={t.name} 
                                    className="w-11 h-11 rounded-full object-cover"
                                  />
                                  <div>
                                     <h4 className="text-sm font-bold text-slate-900">{t.name}</h4>
                                     <p className="text-[11px] text-slate-400">{t.role}</p>
                                  </div>
                               </div>
                               <Quote className="w-8 h-8 text-[#FF5722] opacity-20" />
                            </div>
                         </div>
                      ))}
                    </motion.div>
                 </div>

                 {/* Navigation Buttons */}
                 <div className="absolute bottom-0 left-0 flex gap-3">
                     <button 
                       onClick={prev}
                       className="w-10 h-10 rounded-full border-2 border-slate-200 bg-white flex items-center justify-center hover:bg-slate-900 hover:border-slate-900 hover:text-white transition-all shadow-sm"
                     >
                       <ArrowRight className="w-4 h-4 rotate-180" />
                     </button>
                     <button 
                       onClick={next}
                       className="w-10 h-10 rounded-full border-2 border-slate-200 bg-white flex items-center justify-center hover:bg-slate-900 hover:border-slate-900 hover:text-white transition-all shadow-sm"
                     >
                       <ArrowRight className="w-4 h-4" />
                     </button>
                 </div>
              </div>
           </div>

           {/* AI Image - Aligned with header and extends to card bottom */}
           <div className="lg:col-span-5 hidden lg:block">
              <div className="rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-white h-full">
                 <img 
                   src="/images/testimonial-img.jpg" 
                   alt="AI Professional" 
                   className="w-full h-full object-cover"
                 />
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

const Home: React.FC = () => {
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
      <section ref={heroRef} className="relative min-h-[95vh] flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden bg-white">
        {/* Animated Background */}
        <HeroNeuralBackground />

        {/* Floating Modern Shapes (Optimized: Removed expensive blur animation) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-[15%] w-64 h-64 bg-blue-500/5 rounded-full blur-[80px]" />
          <div className="absolute bottom-1/4 left-[10%] w-96 h-96 bg-indigo-500/5 rounded-full blur-[100px]" />
        </div>
        
        {/* Left Social Sidebar */}
        <div className="hidden lg:flex flex-col items-center absolute left-12 top-1/2 -translate-y-1/2 z-20">
          <div className="flex flex-col items-center space-y-8">
            <div className="flex flex-col items-center space-y-6 mb-4">
               <span className="text-[11px] font-bold text-slate-900 [writing-mode:vertical-lr] rotate-180 uppercase tracking-[0.3em]">
                 Follow Us
               </span>
               <div className="w-px h-12 bg-slate-900" />
            </div>
            <div className="flex flex-col space-y-6">
              <a href="#" className="text-slate-900 hover:text-blue-600 transition-colors"><Globe className="w-4 h-4" /></a>
              <a href="#" className="text-slate-900 hover:text-blue-600 transition-colors"><Linkedin className="w-4 h-4" /></a>
              <a href="#" className="text-slate-900 hover:text-blue-600 transition-colors"><Twitter className="w-4 h-4" /></a>
              <a href="#" className="text-slate-900 hover:text-blue-600 transition-colors"><Instagram className="w-4 h-4" /></a>
            </div>
          </div>
        </div>

        {/* Right Sidebar Decoration */}
        <div className="hidden lg:flex flex-col items-end absolute right-12 top-1/2 -translate-y-1/2 space-y-20 z-20">
          <div className="text-right space-y-4">
            <h4 className="text-sm font-bold text-slate-900 leading-snug font-heading uppercase tracking-tighter">
              Enterprise <br /> & Aesthetics <br /> Logic.
            </h4>
            <div className="w-24 h-px bg-slate-900 ml-auto" />
          </div>
          <div className="relative">
             <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden">
                <div className="w-8 h-16 bg-blue-600 rounded-r-full ml-auto" />
             </div>
          </div>
        </div>

        <motion.div 
          style={{ y: heroParallaxY, scale: heroScale, opacity: heroOpacity }}
          className="container mx-auto px-4 md:px-12 lg:px-24 relative z-10 will-change-transform"
        >
          <div className="flex flex-col space-y-16 max-w-7xl">
            
            <div className="space-y-6">
              {/* Blue Badge Pill */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center space-x-4 px-4 py-2 rounded-full bg-blue-600 text-white shadow-xl shadow-blue-500/20"
              >
                <span className="text-[11px] font-black uppercase tracking-[0.3em]">Since 2018</span>
                <div className="w-8 h-px bg-white/30" />
                <ArrowRight className="w-3 h-3" />
              </motion.div>
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                <div className="lg:col-span-12">
                  <motion.h1 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="text-6xl md:text-8xl lg:text-[7.5rem] font-medium text-slate-900 tracking-tighter leading-[0.85] font-heading uppercase"
                  >
                    We build <br />
                    high-performance <br />
                    <TypewriterHeadline />
                  </motion.h1>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
               {/* Left Group: Avatars & Play Button */}
               <div className="flex flex-col md:flex-row items-start md:items-center space-y-10 md:space-y-0 md:space-x-12">
                  <div className="flex flex-col space-y-4">
                     <div className="flex -space-x-4">
                        {[1, 2, 3, 4].map((i) => (
                           <motion.div 
                            key={i} 
                            whileHover={{ y: -5, scale: 1.1 }}
                            className="w-12 h-12 rounded-full border-4 border-white overflow-hidden bg-slate-200 shadow-lg"
                           >
                              <img src={`https://i.pravatar.cc/150?u=qintellect_${i}`} alt="user" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all" />
                           </motion.div>
                        ))}
                     </div>
                     <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">
                        Trusted by <span className="text-slate-900">500+</span> <br /> Global Enterprises.
                     </p>
                  </div>

                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center space-x-6 cursor-pointer group"
                  >
                     <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center text-white transition-all shadow-2xl relative overflow-hidden">
                        <Play className="w-6 h-6 fill-white relative z-10" />
                        <motion.div 
                          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute inset-0 bg-white/20 rounded-full" 
                        />
                     </div>
                     <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-slate-900 uppercase tracking-widest leading-tight">
                           Global Tech <br /> Architecture Agency.
                        </span>
                     </div>
                  </motion.div>
               </div>

               {/* Right Group: Description & Button */}
               <div className="flex flex-col space-y-10">
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 1 }}
                    className="text-base md:text-lg text-slate-500 leading-relaxed font-light max-w-lg"
                  >
                    Delivering technical excellence through custom software development, AI integration, and robust enterprise strategies. We solve the hard problems so you can scale faster.
                  </motion.p>
                  
                  <div className="flex items-center">
                     <MagneticButton to="/contact" className="px-12 py-5 bg-slate-900 text-white rounded-full font-black text-[10px] uppercase tracking-[0.4em] hover:bg-blue-600 transition-all shadow-2xl group flex items-center">
                        Lets Talk
                        <ArrowRight className="w-4 h-4 ml-4 group-hover:translate-x-2 transition-transform" />
                     </MagneticButton>
                  </div>
               </div>
            </div>
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

      {/* 2. ABOUT QINTELLECT: RE-DESIGNED AGENCY SECTION */}
      <section ref={philosophyRef} className="py-32 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-20 xl:gap-32">
            
            {/* Left Content */}
            <div className="lg:w-1/2 space-y-12 relative z-10">
              <div className="space-y-6">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center text-white">
                    <Star className="w-3 h-3 fill-white" />
                  </div>
                  <span className="text-[11px] font-black text-slate-900 uppercase tracking-[0.4em]">About QIntellect</span>
                </motion.div>

                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl md:text-6xl xl:text-7xl font-medium text-slate-900 leading-[1.1] tracking-tighter font-heading"
                >
                  We Engineering Your <br />
                  <span className="text-blue-600">Digital Success</span> With <br />
                  Technical Excellence
                </motion.h2>
              </div>

              <div className="flex flex-col md:flex-row items-start md:items-center gap-12 pt-4">
                <div className="flex flex-col">
                  <div className="text-7xl md:text-9xl font-medium text-slate-900 tracking-tighter flex items-start">
                    <AnimatedCounter value={12} />
                    <span className="text-blue-600 text-5xl mt-4 ml-1">+</span>
                  </div>
                  <span className="text-[11px] font-bold text-blue-600 uppercase tracking-[0.3em] mt-2">Years Of Experience</span>
                </div>

                <div className="hidden md:block w-px h-32 bg-slate-100" />

                <div className="space-y-8 flex-1">
                  <p className="text-lg text-slate-500 font-light leading-relaxed">
                    At QIntellect, we bring your vision to life by architecting engaging, impactful digital ecosystems that dominate markets and solve complex challenges.
                  </p>
                  
                  <MagneticButton to="/about" className="inline-flex items-center space-x-4 bg-slate-900 text-white px-10 py-5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:bg-blue-600 transition-all shadow-xl group">
                    <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-slate-900 -rotate-45 group-hover:rotate-0 transition-transform">
                      <ArrowRight className="w-3 h-3" />
                    </div>
                    <span>Explore More</span>
                  </MagneticButton>
                </div>
              </div>
            </div>

            {/* Right Image with Decor */}
            <div className="lg:w-1/2 relative">
              <motion.div 
                style={{ y: philImageY }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="relative rounded-[3rem] overflow-hidden shadow-3xl z-10 will-change-transform"
              >
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
                  alt="Team Collaboration" 
                  className="w-full aspect-square object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-blue-600/5 mix-blend-multiply" />
              </motion.div>

              {/* Decorative Squiggle SVG */}
              <svg className="absolute -top-12 -left-12 w-48 h-48 text-blue-100 -rotate-12 z-0" viewBox="0 0 200 200">
                <motion.path 
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 2 }}
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  d="M40,100 C40,40 160,40 160,100 C160,160 40,160 40,100 C40,70 100,70 100,100 C100,130 70,130 70,100" 
                />
              </svg>

              {/* Floating Element */}
              <motion.div 
                style={{ y: philCardY }}
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-8 -right-8 w-32 h-32 bg-white rounded-2xl shadow-2xl border border-slate-100 flex items-center justify-center z-20 will-change-transform"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">500+</div>
                  <div className="text-[8px] font-black uppercase text-slate-400 tracking-widest mt-1">Clients</div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. WHY CHOOSE US: RE-DESIGNED TO MATCH IMAGE STYLE */}
      <WhyChooseUs />

      {/* 4. CORE SERVICES DETAILED GRID SECTION */}
      <section className="py-24 bg-white/40 backdrop-blur-sm border-y border-white/40">
        <div className="container mx-auto px-4 md:px-8">
           <div className="max-w-4xl mb-16 space-y-4">
              <span className="text-[11px] font-black text-blue-600 uppercase tracking-[0.5em]">The Technical Stack</span>
              <h2 className="text-4xl md:text-7xl font-medium text-slate-900 leading-tight tracking-tighter font-heading">High-Fidelity <br /> Engineering.</h2>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {SERVICES.map((s, i) => {
                const colors: Record<string, string> = {
                  'artificial-intelligence': 'text-blue-600 border-blue-100 bg-blue-50/50',
                  'customized-chatbots': 'text-indigo-600 border-indigo-100 bg-indigo-50/50',
                  'ai-customer-representative': 'text-purple-600 border-purple-100 bg-purple-50/50',
                  'dynamics-365': 'text-blue-700 border-blue-200 bg-blue-100/30',
                  'web-development': 'text-slate-900 border-slate-200 bg-slate-50/50',
                  'edi-solutions': 'text-blue-800 border-blue-300 bg-blue-50/30'
                };
                
                const icons: Record<string, any> = {
                  'artificial-intelligence': BrainCircuit,
                  'customized-chatbots': MessageSquare,
                  'ai-customer-representative': UserCheck,
                  'dynamics-365': Settings,
                  'web-development': Code,
                  'edi-solutions': Database
                };

                const Icon = icons[s.id] || Code;

                return (
                  <motion.div 
                    key={s.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (i % 3) * 0.1, duration: 0.8 }}
                    className="group relative flex flex-col h-full p-8 md:p-10 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-2xl hover:-translate-y-3 transition-all duration-700 overflow-hidden"
                  >
                     {/* Background Visualizer */}
                     <ServiceVisualizer id={s.id} />

                     <div className="relative z-10 flex flex-col h-full">
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-10 transition-all duration-700 group-hover:rotate-6 group-hover:scale-110 shadow-lg ${colors[s.id] || 'text-blue-600 bg-blue-50'}`}>
                           <Icon className="w-7 h-7" />
                        </div>
                        
                        <div className="space-y-4 mb-10">
                           <h4 className="text-2xl font-medium text-slate-900 font-heading tracking-tight leading-none">
                              {s.title}
                           </h4>
                           <p className="text-sm text-slate-500 font-light leading-relaxed line-clamp-2">
                              {s.shortDescription}
                           </p>
                        </div>
                        
                        <div className="flex-grow space-y-4 mb-10">
                           {s.features.slice(0, 3).map((f, idx) => (
                             <div key={idx} className="flex items-center space-x-4 group/item">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-600/30 group-hover/item:bg-blue-600 transition-colors" />
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover/item:text-slate-900 transition-colors">
                                   {f}
                                </span>
                             </div>
                           ))}
                        </div>
                        
                        <Link 
                          to={`/service/${s.id}`} 
                          className="inline-flex items-center justify-between px-6 py-4 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.3em] group-hover:bg-blue-600 transition-all shadow-xl group/link"
                        >
                           <span>View Blueprint</span>
                           <ChevronRight className="w-4 h-4 translate-x-0 group-hover/link:translate-x-1 transition-transform" />
                        </Link>
                     </div>

                     {/* Subtle Gradient Accent */}
                     <div className="absolute top-0 right-0 w-1/2 h-px bg-gradient-to-l from-blue-600/0 via-blue-600/50 to-blue-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                     <div className="absolute bottom-0 left-0 w-px h-1/2 bg-gradient-to-t from-blue-600/0 via-blue-600/50 to-blue-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                  </motion.div>
                );
              })}
           </div>
        </div>
      </section>

      {/* 4.5 UNIFIED ECOSYSTEM SECTION (Inspired by Aigocy) */}
      <FeatureEcosystem />

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
                  className="group rounded-2xl overflow-hidden glass-card border border-white hover:shadow-2xl transition-all duration-1000 flex flex-col"
                >
                   <div className="h-48 overflow-hidden relative bg-slate-900">
                      <img src={ind.img} alt={ind.name} className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 opacity-90" />
                      <div className="absolute inset-0 bg-blue-900/10" />
                   </div>
                   <div className="p-6 space-y-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${ind.bg} ${ind.color} shadow-lg border border-white/50 group-hover:scale-110 transition-transform`}>
                        <ind.icon className="w-6 h-6" />
                      </div>
                      <h4 className="text-2xl font-medium text-slate-900 font-heading tracking-tight">{ind.name}</h4>
                      <p className="text-sm text-slate-500 font-light leading-relaxed">
                        {ind.desc}
                      </p>
                      <Link to="/contact" className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.4em] text-slate-900 group-hover:text-blue-600 transition-colors">Strategic Roadmap <ArrowRight className="w-4 h-4 ml-4" /></Link>
                   </div>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* 5.5 TESTIMONIALS SECTION (Inspired by AI Image) */}
      <TestimonialSection />

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
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8">
           <div className="bg-slate-900 rounded-[3rem] p-16 md:p-32 text-center text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-[1200px] h-[1200px] bg-blue-600/20 rounded-full blur-[200px] translate-x-1/2 -translate-y-1/2" />
              <div className="relative z-10 max-w-5xl mx-auto space-y-12">
                 <h2 className="text-4xl md:text-7xl font-medium font-heading leading-tight tracking-tighter uppercase">Architect Your <br /> Digital Future.</h2>
                 <p className="text-lg md:text-xl text-slate-400 font-light max-w-2xl mx-auto leading-relaxed">
                   Join the global enterprise leaders who rely on QIntellect for technical stability and future-proof innovation.
                 </p>
                 <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
                    <MagneticButton to="/contact" className="px-12 py-6 bg-blue-600 text-white rounded-full font-black hover:bg-blue-700 transition-all shadow-xl tracking-[0.2em] uppercase text-[10px]">
                      Book Strategy Session
                    </MagneticButton>
                    <MagneticButton to="/services" className="px-12 py-6 border border-white/20 text-white rounded-full font-black hover:bg-white/10 transition-all tracking-[0.2em] uppercase text-[10px]">
                      Explore Capabilities
                    </MagneticButton>
                 </div>
              </div>
           </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
