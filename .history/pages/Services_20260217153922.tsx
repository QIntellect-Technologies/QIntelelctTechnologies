
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
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
  ArrowUpRight,
  Star,
  Rocket,
  Heart,
  Building2,
  Stethoscope,
  Banknote,
  Factory,
  ShoppingBag,
  Truck,
  GraduationCap
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
  const [activeStep, setActiveStep] = useState(0);
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
    { value: 200, suffix: '+', label: 'Projects Done' },
    { value: 98, suffix: '%', label: 'Happy Clients' },
    { value: 15, suffix: '+', label: 'Years' },
    { value: 50, suffix: '+', label: 'Experts' }
  ];

  // Auto-rotate steps
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white font-light selection:bg-blue-100 selection:text-blue-700 overflow-hidden">
      
      {/* ===== HERO SECTION ===== */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900" />
        
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{ 
            backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Floating Animated Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: Math.random() * 800 
            }}
            animate={{ 
              y: [null, Math.random() * -200, null],
              opacity: [0.2, 0.8, 0.2]
            }}
            transition={{ 
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}

        {/* Large Glowing Orbs */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-20 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 7, repeat: Infinity }}
          className="absolute bottom-20 left-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"
        />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center space-x-3 px-5 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
              >
                <motion.div 
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-blue-400"
                />
                <span className="text-blue-300 text-xs font-bold uppercase tracking-wider">QIntellect Services</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-5xl md:text-7xl font-bold text-white font-heading leading-[1.1] tracking-tight"
              >
                We Build
                <br />
                <ServiceTypewriter />
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-slate-300 leading-relaxed max-w-xl"
              >
                Smart technology solutions that help your business grow. AI, chatbots, web apps, and more — all made simple.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <Link to="/contact" className="group inline-flex items-center gap-3 px-8 py-4 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-400 transition-all shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-1">
                  Get Started
                  <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </Link>
                <Link to="/portfolios" className="group inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold border border-white/30 hover:bg-white/20 transition-all hover:-translate-y-1">
                  <Play className="w-5 h-5" />
                  See Our Work
                </Link>
              </motion.div>

              {/* Stats Row */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/10"
              >
                {stats.map((stat, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="text-center md:text-left"
                  >
                    <div className="text-3xl md:text-4xl font-bold text-white font-heading">
                      <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-sm text-slate-400 mt-1">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Right Side - Advanced Visual Design */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                {/* Main Visual - Stacked Images */}
                <div className="relative">
                  {/* Back Image */}
                  <motion.div 
                    initial={{ opacity: 0, x: 30, y: 30 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="absolute top-8 left-8 w-full h-[400px] rounded-3xl overflow-hidden"
                  >
                    <img 
                      src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop" 
                      alt="AI Technology" 
                      className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/40 to-purple-600/40" />
                  </motion.div>

                  {/* Front Image */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    whileHover={{ scale: 1.02 }}
                    className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20"
                  >
                    <img 
                      src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2065&auto=format&fit=crop" 
                      alt="AI Brain" 
                      className="w-full h-[400px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent" />
                    
                    {/* Animated Scan Line */}
                    <motion.div 
                      animate={{ y: ['-100%', '100%'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-50"
                    />
                    
                    {/* Overlay Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <motion.div 
                          animate={{ rotate: 360 }}
                          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                          className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center"
                        >
                          <BrainCircuit className="w-5 h-5 text-white" />
                        </motion.div>
                        <div>
                          <p className="text-white font-bold">Powered by AI</p>
                          <p className="text-blue-300 text-sm">Smart & Fast</p>
                        </div>
                      </div>
                      
                      {/* Progress Bars */}
                      <div className="space-y-2">
                        {['AI Power', 'Speed', 'Quality'].map((label, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <span className="text-xs text-slate-400 w-16">{label}</span>
                            <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${85 + i * 5}%` }}
                                transition={{ duration: 1.5, delay: 1 + i * 0.2 }}
                                className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Floating Service Cards */}
                <motion.div 
                  initial={{ opacity: 0, y: -20, x: 20 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-2xl p-4 border border-slate-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-slate-900">200+</p>
                      <p className="text-xs text-slate-500">Projects Done</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20, x: -20 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  whileHover={{ scale: 1.05, y: 5 }}
                  className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-2xl p-4 border border-slate-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-slate-900">5.0 Rating</p>
                      <p className="text-xs text-slate-500">Client Love</p>
                    </div>
                  </div>
                </motion.div>

                {/* Animated Service Tags */}
                <div className="absolute top-1/2 -right-8 space-y-3">
                  {['AI', 'Web', 'ERP'].map((tag, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.2 + i * 0.15 }}
                      whileHover={{ x: -5, scale: 1.05 }}
                      className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg text-sm font-bold text-blue-600 cursor-pointer"
                    >
                      {tag}
                    </motion.div>
                  ))}
                </div>

                {/* Glowing Ring */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute -bottom-10 -right-10 w-48 h-48 border-4 border-dashed border-blue-400/30 rounded-full"
                />
                
                {/* Pulsing Dots */}
                <motion.div 
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute top-1/4 -left-6 w-4 h-4 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50"
                />
                <motion.div 
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
                  className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
          >
            <motion.div 
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-blue-400 rounded-full"
            />
          </motion.div>
        </motion.div>
      </section>

      <div className="container mx-auto px-4 md:px-8">

        {/* ===== SERVICES SECTION HEADER ===== */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider rounded-full mb-6">
            What We Offer
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 font-heading mb-6">
            Our <span className="text-blue-600">Services</span>
          </h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            Complete technology solutions to help your business succeed in the digital world.
          </p>
        </motion.div>

        {/* ===== SERVICES GRID ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
          {SERVICES.map((service, i) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group relative bg-white rounded-3xl border border-slate-100 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              {/* Card Top Gradient */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Background Shape */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-50 to-transparent rounded-bl-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700" />

              <div className="relative p-8">
                {/* Icon */}
                <motion.div 
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/25 group-hover:shadow-xl group-hover:shadow-blue-500/40 transition-all"
                >
                  {getIcon(service.icon, "w-8 h-8")}
                </motion.div>
                
                {/* Content */}
                <h3 className="text-2xl font-bold text-slate-900 mb-4 font-heading tracking-tight group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-500 leading-relaxed mb-6">
                  {service.shortDescription}
                </p>
                
                {/* Features List */}
                <ul className="space-y-3 mb-8">
                  {service.features.slice(0, 3).map((feat, idx) => (
                    <motion.li 
                      key={idx} 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * idx }}
                      viewport={{ once: true }}
                      className="flex items-center text-sm text-slate-600"
                    >
                      <CheckCircle className="w-4 h-4 text-blue-500 mr-3 flex-shrink-0" />
                      {feat}
                    </motion.li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Link 
                  to={`/service/${service.id}`} 
                  className="group/btn inline-flex items-center justify-between w-full py-4 px-6 rounded-xl bg-slate-900 text-white hover:bg-blue-600 transition-all font-semibold text-sm relative overflow-hidden"
                >
                  <span className="relative z-10">Learn More</span>
                  <ArrowUpRight className="w-5 h-5 relative z-10 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ===== WHY CHOOSE US SECTION ===== */}
        <section className="py-24 mb-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #3b82f6 1px, transparent 0)', backgroundSize: '32px 32px' }} />
          
          <div className="relative z-10 px-8 md:px-16">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-2 bg-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider rounded-full mb-6">
                Why QIntellect
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white font-heading mb-6">
                Why Businesses <span className="text-blue-400">Choose Us</span>
              </h2>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                We deliver results that matter with technology you can trust.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Shield, title: 'Reliable & Secure', desc: 'Your data is safe with enterprise-grade security and 24/7 monitoring.' },
                { icon: Clock, title: 'Fast Delivery', desc: 'We work efficiently to get your solutions up and running quickly.' },
                { icon: Headphones, title: 'Always Here to Help', desc: 'Our support team is ready to assist you whenever you need.' },
                { icon: Award, title: 'Quality Guaranteed', desc: 'Every project meets the highest standards of quality and performance.' }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="group p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-blue-500/50 hover:bg-white/10 transition-all"
                >
                  <div className="w-14 h-14 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-500 group-hover:scale-110 transition-all">
                    <item.icon className="w-7 h-7 text-blue-400 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== OUR PROCESS SECTION ===== */}
        <section className="mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider rounded-full mb-6">
              How We Work
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-heading mb-6">
              Our Simple <span className="text-blue-600">Process</span>
            </h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">
              From idea to launch, we make it easy for you.
            </p>
          </motion.div>

          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-blue-500 to-blue-200 -translate-y-1/2" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
              {[
                { step: '01', title: 'Discovery', desc: 'We listen to your needs and understand your business goals.', icon: Target },
                { step: '02', title: 'Planning', desc: 'We create a clear roadmap and timeline for your project.', icon: Layers },
                { step: '03', title: 'Development', desc: 'Our team builds and tests your solution with care.', icon: Code },
                { step: '04', title: 'Launch & Support', desc: 'We deploy your solution and provide ongoing support.', icon: Zap }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  viewport={{ once: true }}
                  className="relative text-center"
                >
                  {/* Step Number Circle */}
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="relative z-10 w-24 h-24 mx-auto mb-8 bg-white rounded-full border-4 border-blue-500 flex items-center justify-center shadow-xl"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white">
                      <item.icon className="w-8 h-8" />
                    </div>
                  </motion.div>
                  
                  <div className="text-sm font-bold text-blue-500 uppercase tracking-wider mb-2">Step {item.step}</div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 font-heading">{item.title}</h3>
                  <p className="text-slate-500 leading-relaxed max-w-xs mx-auto">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== INDUSTRIES WE SERVE ===== */}
        <section className="mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider rounded-full mb-6">
              Industries
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-heading mb-6">
              Industries We <span className="text-blue-600">Serve</span>
            </h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">
              We bring expertise to many different industries.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: 'Healthcare', icon: '🏥' },
              { name: 'Finance', icon: '💰' },
              { name: 'Manufacturing', icon: '🏭' },
              { name: 'Retail', icon: '🛒' },
              { name: 'Logistics', icon: '🚚' },
              { name: 'Education', icon: '📚' }
            ].map((industry, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="group p-6 bg-white rounded-2xl border border-slate-100 shadow-lg hover:shadow-xl hover:border-blue-200 transition-all text-center"
              >
                <div className="text-4xl mb-4">{industry.icon}</div>
                <h3 className="font-bold text-slate-900">{industry.name}</h3>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ===== CTA SECTION ===== */}
        <section className="mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-12 md:p-20 overflow-hidden"
          >
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-32 -mb-32" />
            
            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold text-white font-heading mb-6"
              >
                Ready to Get Started?
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
                className="text-xl text-blue-100 mb-10"
              >
                Let's talk about how QIntellect can help your business grow with smart technology solutions.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
                className="flex flex-wrap justify-center gap-4"
              >
                <Link to="/contact" className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-600 rounded-full font-bold hover:bg-slate-100 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                  Contact Us Today
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/portfolios" className="inline-flex items-center gap-3 px-8 py-4 bg-transparent text-white rounded-full font-bold border-2 border-white/50 hover:bg-white/10 hover:border-white transition-all hover:-translate-y-1">
                  See Our Portfolio
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default Services;
