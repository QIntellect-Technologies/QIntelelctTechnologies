
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ChevronRight, 
  Zap, 
  Target, 
  Layers, 
  BarChart, 
  Code, 
  BrainCircuit, 
  MessageSquare, 
  UserCheck, 
  Settings, 
  Database, 
  RefreshCw, 
  Radio,
  CheckCircle,
  Shield,
  Clock,
  Headphones,
  Award,
  TrendingUp,
  Users,
  Globe,
  Sparkles,
  Play,
  ArrowUpRight
} from 'lucide-react';
import { SERVICES } from '../constants';

// Animated Typewriter Component
const ServiceTypewriter: React.FC = React.memo(() => {
  const words = ["AI Solutions", "Smart Chatbots", "Web Development", "Dynamics 365", "ERP Systems", "EDI Solutions"];
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
    <span className="relative inline-block text-blue-500">
      {words[index].substring(0, subIndex)}
      <span className="inline-block w-[3px] h-[0.9em] bg-blue-500 ml-1 animate-pulse align-middle" />
    </span>
  );
});

// Animated Counter Component
const AnimatedCounter: React.FC<{ target: number; suffix?: string; duration?: number }> = ({ target, suffix = '', duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    
    let start = 0;
    const increment = target / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const Services: React.FC = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const getIcon = (iconName: string, size: string = "w-8 h-8") => {
    switch(iconName) {
      case 'BrainCircuit': return <BrainCircuit className={size} />;
      case 'MessageSquare': return <MessageSquare className={size} />;
      case 'UserCheck': return <UserCheck className={size} />;
      case 'Settings': return <Settings className={size} />;
      case 'Code': return <Code className={size} />;
      case 'RefreshCw': return <RefreshCw className={size} />;
      case 'Database': return <Database className={size} />;
      case 'Radio': return <Radio className={size} />;
      default: return <Settings className={size} />;
    }
  };

  const stats = [
    { value: 200, suffix: '+', label: 'Projects Delivered' },
    { value: 98, suffix: '%', label: 'Client Satisfaction' },
    { value: 15, suffix: '+', label: 'Years Experience' },
    { value: 50, suffix: '+', label: 'Expert Team' }
  ];

  return (
    <div className="bg-white font-light selection:bg-blue-100 selection:text-blue-700 overflow-hidden">
      
      {/* ===== HERO SECTION ===== */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #3b82f6 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        
        {/* Floating Shapes */}
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-32 right-20 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute bottom-32 left-10 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl"
        />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center space-x-3 px-5 py-2 rounded-full bg-blue-600/10 border border-blue-600/20"
              >
                <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                <span className="text-blue-600 text-xs font-bold uppercase tracking-wider">QIntellect Services</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-5xl md:text-7xl font-bold text-slate-900 font-heading leading-[1.1] tracking-tight"
              >
                We Build
                <br />
                <ServiceTypewriter />
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-slate-600 leading-relaxed max-w-xl"
              >
                From AI and smart chatbots to Dynamics 365 and web development — we help your business grow with modern technology solutions.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <Link to="/contact" className="group inline-flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-1">
                  Get Started
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/portfolios" className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-900 rounded-full font-semibold border-2 border-slate-200 hover:border-blue-500 hover:text-blue-600 transition-all hover:-translate-y-1">
                  <Play className="w-5 h-5" />
                  View Our Work
                </Link>
              </motion.div>

              {/* Stats Row */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-slate-100"
              >
                {stats.map((stat, i) => (
                  <div key={i} className="text-center md:text-left">
                    <div className="text-3xl md:text-4xl font-bold text-slate-900 font-heading">
                      <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right Side - Service Icons Grid */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative hidden lg:block"
            >
              <div className="relative w-full aspect-square">
                {/* Central Circle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/30">
                  <div className="text-center text-white">
                    <Sparkles className="w-10 h-10 mx-auto mb-2" />
                    <span className="text-sm font-bold">QIntellect</span>
                  </div>
                </div>

                {/* Orbiting Service Icons */}
                {SERVICES.slice(0, 7).map((service, i) => {
                  const angle = (i * 360 / 7) - 90;
                  const radius = 180;
                  const x = Math.cos(angle * Math.PI / 180) * radius;
                  const y = Math.sin(angle * Math.PI / 180) * radius;
                  
                  return (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                      whileHover={{ scale: 1.15 }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                      style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
                    >
                      <Link to={`/service/${service.id}`} className="group block w-20 h-20 bg-white rounded-2xl shadow-lg border border-slate-100 flex items-center justify-center hover:shadow-xl hover:border-blue-200 transition-all">
                        <div className="text-blue-600 group-hover:scale-110 transition-transform">
                          {getIcon(service.icon, "w-8 h-8")}
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}

                {/* Connecting Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <circle 
                    cx="50%" 
                    cy="50%" 
                    r="180" 
                    fill="none" 
                    stroke="#e2e8f0" 
                    strokeWidth="1" 
                    strokeDasharray="8 8"
                    className="animate-spin"
                    style={{ animationDuration: '60s' }}
                  />
                </svg>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-slate-300 rounded-full flex justify-center pt-2"
          >
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      <div className="container mx-auto px-4 md:px-8">

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, i) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: (i % 3) * 0.1 }}
              viewport={{ once: true }}
              className="group p-6 bg-white glass-card rounded-2xl border border-white hover:border-blue-300 shadow-xl hover:shadow-3xl hover:-translate-y-3 transition-all duration-700 flex flex-col relative overflow-hidden h-full"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-bl-full z-0 group-hover:scale-150 transition-transform duration-1000" />
              
              <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center mb-8 group-hover:shadow-2xl group-hover:rotate-6 transition-all shadow-xl relative z-10">
                {getIcon(service.icon)}
              </div>
              
              <div className="relative z-10 flex-grow">
                 <h3 className="text-2xl font-medium text-slate-900 mb-4 font-heading tracking-tight">{service.title}</h3>
                 <p className="text-slate-500 font-light leading-relaxed text-sm mb-8">
                   {service.shortDescription}
                 </p>
                 
                 <ul className="space-y-3 mb-8">
                   {service.features.slice(0, 3).map((feat, idx) => (
                     <li key={idx} className="flex items-center text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-4 shadow-sm" />
                        {feat}
                     </li>
                   ))}
                 </ul>
              </div>

              <Link to={`/service/${service.id}`} className="inline-flex items-center justify-between w-full py-4 px-6 rounded-xl bg-slate-900 text-white hover:bg-blue-600 transition-all font-black text-[10px] uppercase tracking-widest relative z-10 shadow-lg">
                View Full Blueprint
                <ChevronRight className="w-5 h-5" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Methodology Section */}
        <div className="mt-48 p-10 md:p-16 rounded-2xl bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, #3b82f6 1px, transparent 1px), linear-gradient(to bottom, #3b82f6 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
          <div className="relative z-10 flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/2 space-y-10">
              <div className="space-y-6">
                <span className="text-[11px] font-black text-blue-400 uppercase tracking-[0.5em]">Global Standards</span>
                <h2 className="text-5xl md:text-8xl font-medium tracking-tighter font-heading leading-tight">Delivery <br /> <span className="text-blue-500">Excellence.</span></h2>
              </div>
              <p className="text-xl text-slate-400 font-light leading-relaxed">We utilize a proprietary Agile-Enterprise hybrid model that ensures rapid iteration while maintaining strict global compliance.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-10">
                {[
                  { title: 'Discovery & Audit', icon: Target },
                  { title: 'Architectural Blueprint', icon: Layers },
                  { title: 'Rapid Execution', icon: Zap },
                  { title: 'Governance & Scaling', icon: BarChart }
                ].map((step, i) => (
                  <div key={i} className="flex items-center space-x-6">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 flex-shrink-0">
                      <step.icon className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-sm tracking-tight">{step.title}</h4>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
                 <img 
                  src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=2069&auto=format&fit=crop" 
                  alt="Process Roadmap" 
                  className="w-full aspect-square object-cover grayscale-[40%] opacity-80"
                />
                <div className="absolute inset-0 bg-blue-900/10 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
