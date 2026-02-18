
import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
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
  const [activeStep, setActiveStep] = useState(0);

  const getIcon = (iconName: string, size: string = "w-8 h-8") => {
    switch (iconName) {
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
    { value: 98, suffix: '%', label: 'Excellence' },
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

      {/* ===== HERO BANNER SECTION ===== */}
      <section className="relative h-[70vh] md:h-[80vh] flex items-center justify-center overflow-hidden pt-24">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-no-repeat"
          style={{ backgroundImage: 'url("/images/cover-image.jpg")', backgroundSize: '100% auto', backgroundPosition: 'center center' }}
        >
          {/* Gradient Black Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/95 via-slate-900/90 to-slate-800/85" />

          {/* Animated Grid Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.2) 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }} />
          </div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 container mx-auto px-6 text-center">
          {/* Animated Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500/20 backdrop-blur-md border border-blue-400/30 rounded-full mb-6"
          >
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            <span className="text-white/95 text-xs font-medium uppercase tracking-wider">QIntellect Services</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 font-heading"
          >
            Our <span className="text-blue-400">Services</span>
          </motion.h1>

          {/* Description with Typewriter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto font-light"
          >
            Building <ServiceTypewriter />
          </motion.div>

          {/* Additional Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8 font-light"
          >
            Smart technology solutions to help your business grow.
            AI, chatbots, web apps, Dynamics 365, and more — all made simple.
          </motion.p>

          {/* Breadcrumb Navigation */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex items-center justify-center space-x-2 mb-12"
          >
            <Link
              to="/"
              className="text-slate-400 hover:text-white transition-colors duration-300 text-sm"
            >
              Home
            </Link>
            <ArrowRight className="w-4 h-4 text-slate-500" />
            <span className="text-blue-400 text-sm font-medium">Services</span>
          </motion.nav>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-8 flex flex-wrap justify-center gap-8 md:gap-16"
          >
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">7+</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-medium">Services Offered</div>
            </div>
            <div className="w-px bg-slate-600/50" />
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">200+</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-medium">Projects Done</div>
            </div>
            <div className="w-px bg-slate-600/50" />
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">98%</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-medium">Happy Clients</div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
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
        <section className="py-24 mb-32 relative overflow-hidden bg-gradient-to-b from-slate-50 to-white">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-100/50 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #cbd5e1 1px, transparent 0)',
              backgroundSize: '32px 32px'
            }} />
          </div>

          <div className="relative z-10 container mx-auto px-4 md:px-8">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider rounded-full mb-6">
                Why QIntellect
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-heading mb-6">
                Why Businesses <span className="text-blue-600">Choose Us</span>
              </h2>
              <p className="text-xl text-slate-500 max-w-2xl mx-auto">
                We make technology simple. Our team is here to help you succeed.
              </p>
            </motion.div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Shield, title: 'Safe & Secure', desc: 'Your data is protected 24/7', color: 'from-blue-500 to-blue-600', lightColor: 'bg-blue-50', textColor: 'text-blue-600' },
                { icon: Rocket, title: 'Fast Results', desc: 'Quick delivery, no delays', color: 'from-purple-500 to-purple-600', lightColor: 'bg-purple-50', textColor: 'text-purple-600' },
                { icon: Heart, title: 'We Care', desc: 'Your success is our goal', color: 'from-pink-500 to-pink-600', lightColor: 'bg-pink-50', textColor: 'text-pink-600' },
                { icon: Award, title: 'Top Quality', desc: 'Best in class solutions', color: 'from-amber-500 to-amber-600', lightColor: 'bg-amber-50', textColor: 'text-amber-600' }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-100 overflow-hidden"
                >
                  {/* Hover gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                  {/* Icon */}
                  <div className={`w-16 h-16 ${item.lightColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className={`w-8 h-8 ${item.textColor}`} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">{item.title}</h3>
                  <p className="text-slate-500 leading-relaxed">{item.desc}</p>

                  {/* Bottom accent line */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${item.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
                </motion.div>
              ))}
            </div>

            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
              className="mt-16 flex justify-center"
            >
              <div className="inline-flex items-center gap-4 px-8 py-4 bg-blue-600 text-white rounded-full shadow-xl shadow-blue-600/25">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Award className="w-6 h-6" />
                </motion.div>
                <span className="font-bold">15+ Years of Trust</span>
                <div className="w-px h-6 bg-white/30" />
                <span className="text-blue-100">Innovation Partners</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ===== OUR PROCESS SECTION ===== */}
        <section className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider rounded-full mb-6">
              How We Work
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-heading mb-6">
              4 Simple <span className="text-blue-600">Steps</span>
            </h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">
              Easy process from start to finish
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Steps */}
            <div className="space-y-6">
              {[
                { step: '01', title: 'Tell Us Your Needs', desc: 'Share your ideas with us. We listen and understand.', icon: Target, image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop' },
                { step: '02', title: 'We Make a Plan', desc: 'Our team creates a clear roadmap for you.', icon: Layers, image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop' },
                { step: '03', title: 'Build & Test', desc: 'We build your solution and test it well.', icon: Code, image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop' },
                { step: '04', title: 'Launch & Support', desc: 'Go live! We stay with you for support.', icon: Zap, image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop' }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  onMouseEnter={() => setActiveStep(i)}
                  className={`group p-6 rounded-2xl border-2 transition-all duration-500 cursor-pointer ${activeStep === i
                      ? 'bg-blue-50 border-blue-500 shadow-xl'
                      : 'bg-white border-slate-100 hover:border-blue-200'
                    }`}
                >
                  <div className="flex items-start gap-5">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${activeStep === i
                        ? 'bg-blue-500 shadow-lg shadow-blue-500/30'
                        : 'bg-slate-100 group-hover:bg-blue-100'
                      }`}>
                      <item.icon className={`w-8 h-8 transition-colors ${activeStep === i ? 'text-white' : 'text-slate-600 group-hover:text-blue-600'}`} />
                    </div>
                    <div className="flex-1">
                      <div className={`text-sm font-bold mb-1 ${activeStep === i ? 'text-blue-500' : 'text-slate-400'}`}>
                        Step {item.step}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                      <p className="text-slate-500">{item.desc}</p>
                    </div>
                    <motion.div
                      animate={{ scale: activeStep === i ? 1 : 0.8, opacity: activeStep === i ? 1 : 0.3 }}
                      className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center"
                    >
                      <ChevronRight className="w-5 h-5 text-white" />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right - Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeStep}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                    src={[
                      'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop',
                      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop',
                      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop',
                      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop'
                    ][activeStep]}
                    alt="Process Step"
                    className="w-full h-[500px] object-cover"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent" />

                {/* Step Indicator */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex gap-2 mb-4">
                    {[0, 1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        animate={{
                          width: activeStep === i ? 40 : 10,
                          backgroundColor: activeStep === i ? '#3b82f6' : '#ffffff50'
                        }}
                        className="h-2 rounded-full"
                      />
                    ))}
                  </div>
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-white"
                  >
                    <p className="text-2xl font-bold">
                      {['Discovery', 'Planning', 'Development', 'Launch'][activeStep]}
                    </p>
                  </motion.div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-6 -right-6 w-20 h-20 bg-blue-500 rounded-2xl shadow-xl flex items-center justify-center"
              >
                <span className="text-2xl font-bold text-white">0{activeStep + 1}</span>
              </motion.div>
            </motion.div>
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
              Who We <span className="text-blue-600">Help</span>
            </h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">
              We work with many industries to bring smart solutions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Healthcare', icon: Stethoscope, image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=80&w=2091&auto=format&fit=crop', desc: 'Smart systems for hospitals and clinics' },
              { name: 'Finance', icon: Banknote, image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop', desc: 'Secure solutions for banks and firms' },
              { name: 'Manufacturing', icon: Factory, image: 'https://images.unsplash.com/photo-1565034946487-077d23d7f4f1?q=80&w=2070&auto=format&fit=crop', desc: 'Automation for factories and plants' },
              { name: 'Retail', icon: ShoppingBag, image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop', desc: 'E-commerce and store solutions' },
              { name: 'Logistics', icon: Truck, image: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=2070&auto=format&fit=crop', desc: 'Tracking and delivery systems' },
              { name: 'Education', icon: GraduationCap, image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop', desc: 'Learning platforms and tools' }
            ].map((industry, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group relative rounded-3xl overflow-hidden shadow-xl h-72 cursor-pointer"
              >
                {/* Background Image */}
                <img
                  src={industry.image}
                  alt={industry.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent group-hover:from-blue-900 group-hover:via-blue-900/60 transition-all duration-500" />

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-500 transition-all"
                  >
                    <industry.icon className="w-7 h-7 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-2">{industry.name}</h3>
                  <p className="text-slate-300 text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    {industry.desc}
                  </p>
                </div>

                {/* Hover Arrow */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  className="absolute top-6 right-6 w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ArrowUpRight className="w-5 h-5 text-slate-900" />
                </motion.div>
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
            className="relative rounded-3xl overflow-hidden"
          >
            {/* Background */}
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
                alt="Office"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-blue-900/90 to-slate-900/95" />
            </div>

            {/* Animated Elements */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute top-10 right-10 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"
            />
            <motion.div
              animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 7, repeat: Infinity }}
              className="absolute bottom-10 left-10 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl"
            />

            <div className="relative z-10 p-12 md:p-20">
              <div className="max-w-3xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-blue-500/30"
                >
                  <Rocket className="w-10 h-10 text-white" />
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-4xl md:text-6xl font-bold text-white font-heading mb-6"
                >
                  Ready to Start?
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  viewport={{ once: true }}
                  className="text-xl text-slate-300 mb-10"
                >
                  Let's build something amazing together. Talk to us today!
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: true }}
                  className="flex flex-wrap justify-center gap-4"
                >
                  <Link to="/contact" className="group inline-flex items-center gap-3 px-10 py-5 bg-blue-500 text-white rounded-full font-bold hover:bg-blue-400 transition-all shadow-lg shadow-blue-500/30 hover:shadow-xl hover:-translate-y-1 text-lg">
                    Get Free Quote
                    <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                      <ArrowRight className="w-6 h-6" />
                    </motion.div>
                  </Link>
                  <Link to="/portfolios" className="inline-flex items-center gap-3 px-10 py-5 bg-white/10 backdrop-blur-sm text-white rounded-full font-bold border-2 border-white/30 hover:bg-white/20 hover:border-white transition-all hover:-translate-y-1 text-lg">
                    <Play className="w-6 h-6" />
                    See Our Work
                  </Link>
                </motion.div>

                {/* Trust Badges */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  viewport={{ once: true }}
                  className="flex flex-wrap justify-center gap-8 mt-12 pt-12 border-t border-white/10"
                >
                  {[
                    { icon: Shield, text: 'Secure' },
                    { icon: Clock, text: 'Fast' },
                    { icon: Award, text: 'Quality' },
                    { icon: Heart, text: 'Care' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-white/80">
                      <item.icon className="w-5 h-5" />
                      <span className="font-semibold">{item.text}</span>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default Services;
