
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TEAM } from '../constants';
import { 
  Shield, 
  Trophy, 
  Cpu, 
  Globe, 
  Zap, 
  Fingerprint,
  Layers,
  ArrowRight,
  History,
  Target,
  Eye,
  Microchip,
  Network,
  Compass,
  Star,
  Activity,
  Box,
  Monitor,
  Users
} from 'lucide-react';

// Animated Typewriter Component for About Page
const TypewriterText: React.FC = React.memo(() => {
  const words = ["Innovation.", "Intelligence.", "Excellence.", "Technology.", "Transformation."];
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

const AnimatedValueCard = ({ title, desc, icon: Icon, color, delay }: any) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      className="group relative p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
    >
      <div className={`absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-bl-full -mr-8 -mt-8 transition-transform duration-700 group-hover:scale-150 group-hover:bg-blue-50/50`} />
      
      <div className="relative z-10">
        <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center text-white mb-5 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500`}>
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-medium text-slate-900 font-heading mb-3 tracking-tight">{title}</h3>
        <p className="text-slate-500 font-light leading-relaxed text-sm">
          {desc}
        </p>
      </div>
    </motion.div>
  );
};

const TimelineItem = ({ year, title, desc, index }: any) => {
  const isEven = index % 2 === 0;
  return (
    <div className="relative flex items-center justify-between mb-16 last:mb-0">
      <div className={`hidden md:block w-1/2 ${isEven ? 'pr-20 text-right' : 'order-last pl-20 text-left'}`}>
        <motion.div
          initial={{ opacity: 0, x: isEven ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-6xl font-black text-blue-600/10 font-heading mb-2 block">{year}</span>
          <h4 className="text-xl font-medium text-slate-900 mb-4 font-heading">{title}</h4>
          <p className="text-slate-500 font-light text-sm leading-relaxed max-w-md ml-auto mr-0 md:mr-auto md:ml-0">{desc}</p>
        </motion.div>
      </div>

      <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 flex flex-col items-center">
        <motion.div 
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          className="w-4 h-4 rounded-full bg-blue-600 ring-4 ring-blue-100 z-10" 
        />
        <div className="w-px h-full bg-slate-100 absolute top-4 bottom-0 -z-0" />
      </div>

      <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${!isEven ? 'md:pr-20 md:text-right' : 'md:pl-20 md:text-left'}`}>
        <div className="md:hidden">
          <span className="text-4xl font-black text-blue-600/10 font-heading mb-2 block">{year}</span>
          <h4 className="text-xl font-medium text-slate-900 mb-2 font-heading">{title}</h4>
          <p className="text-slate-500 font-light text-sm leading-relaxed">{desc}</p>
        </div>
        {/* Supporting graphic for even/odd items */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className={`hidden md:flex items-center ${isEven ? 'justify-start' : 'justify-end'}`}
        >
          <div className="w-24 h-24 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center">
            {isEven ? <Box className="w-10 h-10 text-blue-200" /> : <Monitor className="w-10 h-10 text-blue-200" />}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const About: React.FC = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const historyMilestones = [
    { year: '2012', title: 'The Genesis', desc: 'Founded in Silicon Valley to solve enterprise ERP fragmentation for manufacturing giants.' },
    { year: '2015', title: 'Neural Expansion', desc: 'Deployed the first proprietary AI engine for predictive supply chain management.' },
    { year: '2018', title: 'Global Sync', desc: 'Opened hubs in London and Singapore, establishing a 24/7 global support ecosystem.' },
    { year: '2022', title: 'Sovereign Edge', desc: 'Launched the Sovereign Edge framework, setting new standards for industrial data privacy.' },
    { year: '2025', title: 'The Intelligence Age', desc: 'Pioneering autonomous enterprise logic and zero-latency global synchronization.' }
  ];

  const coreValues = [
    {
      title: 'AI-Powered Innovation',
      desc: 'We harness the power of artificial intelligence to create intelligent solutions that transform businesses and drive growth in the digital age.',
      icon: Cpu,
      color: 'bg-orange-600',
      delay: 0.1
    },
    {
      title: 'Data-Driven Excellence',
      desc: 'Our mission is to unlock insights from data, utilizing advanced analytics and machine learning to deliver exceptional value to our clients.',
      icon: Activity,
      color: 'bg-orange-500',
      delay: 0.2
    },
    {
      title: 'Future-Ready Technology',
      desc: 'We build scalable, intelligent systems that adapt and evolve with emerging technologies, ensuring our clients stay ahead of the curve.',
      icon: Network,
      color: 'bg-orange-700',
      delay: 0.3
    },
    {
      title: 'Human-Centric AI',
      desc: 'Technology should empower people. We design AI solutions that enhance human capabilities and create meaningful, positive impact.',
      icon: Target,
      color: 'bg-orange-400',
      delay: 0.4
    }
  ];

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <div ref={containerRef} className="bg-white font-light selection:bg-orange-100 selection:text-orange-700 overflow-hidden">
      
      {/* Force solid navbar */}
      <style>{`
        nav .container > div {
          background: rgba(255, 255, 255, 0.95) !important;
          backdrop-filter: blur(12px) !important;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08) !important;
          border: 1px solid rgba(226, 232, 240, 1) !important;
        }
      `}</style>
      
      {/* HERO BANNER SECTION */}
      <section className="relative h-[70vh] md:h-[80vh] flex items-center justify-center overflow-hidden pt-24">
        {/* Background Image with AI Theme */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3")' }}
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
            <span className="text-white/95 text-xs font-medium uppercase tracking-wider">AI Technology Leaders</span>
          </motion.div>

          {/* Main Title with Animation */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 font-heading"
          >
            About <span className="text-blue-400">Intelligence</span>
          </motion.h1>

          {/* Animated Description with Typewriter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto font-light"
          >
            Delivering <TypewriterText />
          </motion.div>

          {/* Additional Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8 font-light"
          >
            Transforming businesses through cutting-edge AI solutions, intelligent automation, 
            and enterprise technology that drives real results and measurable growth.
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
            <span className="text-blue-400 text-sm font-medium">About</span>
          </motion.nav>

          {/* Animated Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-8 flex flex-wrap justify-center gap-8 md:gap-16"
          >
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">12+</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-medium">Years Experience</div>
            </div>
            <div className="w-px bg-slate-600/50" />
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">500+</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-medium">Projects Delivered</div>
            </div>
            <div className="w-px bg-slate-600/50" />
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">98%</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-medium">Client Satisfaction</div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* 2. ABOUT OUR COMPANY SECTION - Exact Reference Design */}
      <section className="py-24 px-4 md:px-8 bg-gradient-to-b from-white via-blue-50/30 to-white relative overflow-hidden">
        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left Side - Image Grid Layout (Proper Grid) */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="flex gap-4">
                {/* Left Column - Tall Image */}
                <div className="w-[45%]">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="rounded-3xl overflow-hidden shadow-xl h-[480px]"
                  >
                    <img 
                      src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1470&auto=format&fit=crop" 
                      alt="AI Development Team" 
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </div>

                {/* Right Column - Two Stacked Images */}
                <div className="w-[55%] flex flex-col gap-4">
                  {/* Top Image */}
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="rounded-3xl overflow-hidden shadow-xl h-[232px]"
                  >
                    <img 
                      src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1470&auto=format&fit=crop" 
                      alt="AI Team Meeting" 
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  {/* Bottom Image */}
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="rounded-3xl overflow-hidden shadow-xl h-[232px]"
                  >
                    <img 
                      src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1470&auto=format&fit=crop" 
                      alt="AI Innovation Team" 
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </div>
              </div>

              {/* Center Circular Badge with Rotating Text */}
              <div className="absolute top-1/2 left-[42%] transform -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="relative w-28 h-28 md:w-32 md:h-32 bg-white rounded-full p-1 shadow-2xl">
                  {/* Rotating Text Circle */}
                  <motion.svg 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 100 100"
                  >
                    <defs>
                      <path id="circlePath" d="M 50 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                    </defs>
                    <text className="text-[7px] fill-blue-600 font-bold uppercase tracking-[0.2em]">
                      <textPath href="#circlePath">
                        • QIntellect • AI Solutions • Innovation • Tech •
                      </textPath>
                    </text>
                  </motion.svg>
                  
                  {/* Center Icon */}
                  <div className="absolute inset-4 md:inset-5 bg-blue-500 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                    <Cpu className="w-7 h-7 md:w-8 md:h-8 text-white" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              {/* Header Label */}
              <div className="flex items-center space-x-3">
                <span className="text-blue-600 text-sm font-bold uppercase tracking-[0.2em]">About Our Company</span>
                <div className="w-12 h-0.5 bg-blue-500" />
              </div>
              
              {/* Main Heading */}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight font-heading">
                We Deliver Cutting-Edge AI Solutions To Transform Your Business.
              </h2>

              {/* Description */}
              <p className="text-base text-slate-500 leading-relaxed font-light">
                At QIntellect Technologies, we pioneer intelligent solutions that transform business operations. Our expertise in artificial intelligence, enterprise systems, and digital transformation delivers measurable results. We bridge the gap between cutting-edge research and practical applications, empowering organizations to achieve unprecedented growth and efficiency.
              </p>

              {/* Experience Box */}
              <motion.div
                whileHover={{ y: -3 }}
                className="flex items-center space-x-4 p-5 bg-slate-100/80 rounded-full w-fit shadow-sm"
              >
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md flex-shrink-0">
                  <Trophy className="w-7 h-7 text-blue-600" />
                </div>
                <div>
                  <div className="text-lg font-bold text-slate-900">We have more than 12+ years of</div>
                  <div className="text-base font-semibold text-slate-700">AI services experience</div>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-slate-900 text-white font-bold rounded-full flex items-center space-x-3 shadow-lg hover:shadow-xl hover:bg-slate-800 transition-all"
                >
                  <span className="uppercase text-sm tracking-wider">Discover More</span>
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </motion.button>

                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium">Call Anytime</div>
                    <div className="text-base font-bold text-slate-900">+1 (555) 123-4567</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. OUR MISSION SECTION - Different Design */}
      <section className="py-24 px-4 md:px-8 bg-slate-900 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1470&auto=format&fit=crop')] bg-cover bg-center" />
        </div>
        <div className="absolute top-20 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400/10 rounded-full blur-[120px]" />
        
        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Side - Content */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Header */}
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <span className="text-blue-400 text-sm font-bold uppercase tracking-[0.2em]">Our Mission</span>
              </div>
              
              {/* Main Heading */}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight font-heading">
                Empowering Businesses With Intelligent AI Solutions
              </h2>

              {/* Description */}
              <p className="text-lg text-slate-300 leading-relaxed">
                We are committed to democratizing artificial intelligence, making powerful AI tools accessible to businesses of all sizes. Our mission is to bridge the gap between complex technology and practical business applications.
              </p>

              {/* Mission Points */}
              <div className="space-y-4">
                {[
                  { icon: Zap, title: 'Innovation First', desc: 'Pioneering cutting-edge AI research and development' },
                  { icon: Users, title: 'Client Success', desc: 'Your growth and success is our primary objective' },
                  { icon: Shield, title: 'Ethical AI', desc: 'Building responsible and transparent AI systems' }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex items-start space-x-4 p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all"
                  >
                    <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg">{item.title}</h4>
                      <p className="text-slate-400 text-sm">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Side - Image with Stats Overlay */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Main Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1470&auto=format&fit=crop" 
                  alt="AI Innovation" 
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                
                {/* Floating Stats Card */}
                <motion.div
                  whileHover={{ y: -5 }}
                  className="absolute bottom-6 left-6 right-6 p-6 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20"
                >
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-3xl font-bold text-white">500+</div>
                      <div className="text-xs text-slate-300 uppercase tracking-wider">Projects</div>
                    </div>
                    <div className="border-x border-white/20">
                      <div className="text-3xl font-bold text-blue-400">98%</div>
                      <div className="text-xs text-slate-300 uppercase tracking-wider">Success</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-white">24/7</div>
                      <div className="text-xs text-slate-300 uppercase tracking-wider">Support</div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Decorative Element */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500 rounded-2xl -z-10" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 border-2 border-blue-500/30 rounded-2xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. OUR VISION SECTION - Light Theme */}
      <section className="py-24 px-4 md:px-8 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50 rounded-full -translate-y-1/2 translate-x-1/2" />
        
        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Side - Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative order-2 lg:order-1"
            >
              <div className="relative">
                {/* Main Image */}
                <div className="rounded-3xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1470&auto=format&fit=crop" 
                    alt="Future Technology" 
                    className="w-full h-[480px] object-cover"
                  />
                </div>
                
                {/* Floating Badge */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-6 -right-6 w-32 h-32 bg-blue-500 rounded-3xl flex items-center justify-center shadow-xl"
                >
                  <div className="text-center text-white">
                    <Eye className="w-8 h-8 mx-auto mb-1" />
                    <span className="text-xs font-bold uppercase">Vision</span>
                  </div>
                </motion.div>

                {/* Bottom Card */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="absolute -bottom-6 left-6 right-6 p-5 bg-white rounded-2xl shadow-xl border border-slate-100"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Compass className="w-7 h-7 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">Leading the Future</div>
                      <div className="text-xs text-slate-500">Global AI Innovation Hub</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Side - Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8 order-1 lg:order-2"
            >
              {/* Header */}
              <div className="flex items-center space-x-3">
                <span className="text-blue-600 text-sm font-bold uppercase tracking-[0.2em]">Our Vision</span>
                <div className="w-12 h-0.5 bg-blue-500" />
              </div>
              
              {/* Main Heading */}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight font-heading">
                Shaping Tomorrow's Intelligent World Today
              </h2>

              {/* Description */}
              <p className="text-lg text-slate-500 leading-relaxed">
                We envision a future where AI seamlessly integrates into every aspect of business operations, creating a world of limitless possibilities where technology serves humanity's greatest aspirations.
              </p>

              {/* Vision Goals */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { num: '01', title: 'Global Leadership', desc: 'Becoming the #1 AI solutions provider' },
                  { num: '02', title: 'Sustainable Tech', desc: 'Building eco-friendly AI infrastructure' },
                  { num: '03', title: 'Accessibility', desc: 'AI for businesses of all sizes' },
                  { num: '04', title: 'Innovation Hub', desc: 'Continuous R&D excellence' }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-lg transition-all"
                  >
                    <span className="text-3xl font-bold text-blue-100">{item.num}</span>
                    <h4 className="text-slate-900 font-bold mt-2">{item.title}</h4>
                    <p className="text-slate-500 text-sm mt-1">{item.desc}</p>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-blue-600 text-white font-bold rounded-full flex items-center space-x-3 shadow-lg hover:shadow-xl hover:bg-blue-700 transition-all"
              >
                <span className="uppercase text-sm tracking-wider">Join Our Journey</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-xl shadow-blue-200">
                    <Target className="w-5 h-5" />
                  </div>
                  <h2 className="text-3xl font-medium font-heading tracking-tight text-slate-900">Our Mission</h2>
                </div>
                <p className="text-lg text-slate-500 leading-relaxed font-light">
                  To empower enterprises with <span className="text-slate-900 font-medium">sovereign technical frameworks</span> that eliminate friction and catalyze unprecedented growth. We bridge legacy foundations with the logic of tomorrow.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  {[
                    { title: 'Reliability', val: '99.99%' },
                    { title: 'Efficiency', val: '+40%' }
                  ].map((stat, i) => (
                    <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="text-xl font-heading font-medium text-blue-600">{stat.val}</div>
                      <div className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">{stat.title} Target</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6 pt-6 border-t border-slate-100">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white shadow-xl shadow-slate-200">
                    <Eye className="w-5 h-5" />
                  </div>
                  <h2 className="text-3xl font-medium font-heading tracking-tight text-slate-900">Our Vision</h2>
                </div>
                <p className="text-lg text-slate-500 leading-relaxed font-light">
                  A world where global commerce is orchestrated by <span className="text-slate-900 font-medium">self-healing systems</span> that operate with absolute transparency, zero operational risk, and ethical precision.
                </p>
                <div className="inline-flex items-center space-x-3 px-3 py-1.5 bg-blue-50 rounded-lg text-blue-700 text-xs font-bold uppercase tracking-widest">
                  <Compass className="w-3.5 h-3.5" />
                  <span>The North Star for Industrial AI</span>
                </div>
              </div>
            </motion.div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-6 md:space-y-8">
                  <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="aspect-[4/5] rounded-2xl overflow-hidden shadow-xl"
                  >
                    <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-700" alt="Enterprise" />
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="p-6 bg-blue-600 text-white rounded-2xl shadow-xl"
                  >
                    <Star className="w-8 h-8 mb-4 text-blue-200" />
                    <h3 className="text-xl font-heading mb-3">Unmatched Precision</h3>
                    <p className="text-sm font-light leading-relaxed opacity-90">Our deployment strategies are verified for zero-downtime transition in mission-critical environments.</p>
                  </motion.div>
                </div>
                <div className="space-y-6 md:space-y-8 pt-12 md:pt-16">
                  <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="p-6 bg-slate-900 text-white rounded-2xl shadow-xl"
                  >
                    <Network className="w-8 h-8 mb-4 text-blue-500" />
                    <h3 className="text-xl font-heading mb-3">Sovereign Logic</h3>
                    <p className="text-sm font-light leading-relaxed opacity-90">Building internal neural clusters that ensure your data never leaves the corporate perimeter.</p>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="aspect-[4/5] rounded-2xl overflow-hidden shadow-xl"
                  >
                    <img src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Collaboration" />
                  </motion.div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. CORE VALUES: INTERACTIVE BENTO GRID */}
      <section className="py-16 bg-slate-900 relative overflow-hidden">
        {/* Decorative Grid */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, #3b82f6 1px, transparent 1px), linear-gradient(to bottom, #3b82f6 1px, transparent 1px)', backgroundSize: '100px 100px' }} />
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center mb-12 space-y-4">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-[11px] font-black text-blue-400 uppercase tracking-[0.7em]"
            >
              The Structural Ethics
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-medium text-white font-heading tracking-tighter leading-tight"
            >
              Our Core <span className="text-blue-500">Values.</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((val, i) => (
              <AnimatedValueCard key={i} {...val} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. HISTORY: THE SCROLLING CHRONOLOGY */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
            <div className="space-y-6">
              <span className="text-[11px] font-black text-blue-600 uppercase tracking-[0.5em]">The Lineage of Innovation</span>
              <h2 className="text-4xl md:text-6xl font-medium text-slate-900 tracking-tighter leading-none font-heading">The Path of <br /> Precision.</h2>
            </div>
            <div className="hidden lg:flex items-center space-x-4 p-5 bg-slate-50 rounded-2xl border border-slate-100">
               <History className="w-6 h-6 text-blue-600" />
               <div>
                  <div className="text-sm font-bold text-slate-900">12 Years</div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-widest">Of Technical Mastery</div>
               </div>
            </div>
          </div>

          <div className="relative max-w-6xl mx-auto py-8">
            {historyMilestones.map((ms, i) => (
              <TimelineItem key={i} {...ms} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. LEADERSHIP: THE EXECUTIVE OFFICE */}
      <section className="py-16 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
            <div className="lg:w-1/2 space-y-12">
               <div className="space-y-6">
                  <span className="text-[11px] font-black text-blue-600 uppercase tracking-[0.5em]">Executive Office</span>
                  <h2 className="text-3xl md:text-5xl font-medium text-slate-900 leading-tight tracking-tighter font-heading">Global Minds, <br /> Technical Rigor.</h2>
                  <p className="text-base text-slate-500 font-light leading-relaxed">
                    Our leadership is an intersection of industry veterans from legacy giants and avant-garde researchers from global AI laboratories.
                  </p>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {TEAM.map((member, i) => (
                   <motion.div 
                     key={i}
                     whileHover={{ y: -8 }}
                     className="group flex flex-col"
                   >
                     <div className="relative rounded-2xl overflow-hidden mb-4 aspect-[3/4] shadow-xl border-2 border-white">
                       <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                       />
                       <div className="absolute inset-0 bg-blue-600/5 group-hover:bg-transparent transition-all" />
                     </div>
                     <h4 className="text-base font-medium text-slate-900 font-heading tracking-tight">{member.name}</h4>
                     <p className="text-[9px] font-black text-blue-600 uppercase tracking-[0.2em]">{member.role}</p>
                   </motion.div>
                 ))}
               </div>
            </div>

            <div className="lg:w-1/2 relative">
               <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                  <img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1400" className="w-full aspect-square object-cover" alt="Office Space" />
                  <div className="absolute inset-0 bg-blue-900/10" />
               </div>
               <motion.div 
                 initial={{ x: 30, opacity: 0 }}
                 whileInView={{ x: 0, opacity: 1 }}
                 className="absolute -top-10 -right-10 glass-card p-6 rounded-2xl shadow-2xl max-w-sm hidden xl:block border border-white"
               >
                  <Trophy className="w-8 h-8 text-blue-600 mb-4" />
                  <h5 className="text-lg font-medium text-slate-900 font-heading mb-3">Sector Authority</h5>
                  <p className="text-xs text-slate-500 font-light leading-relaxed">Recognized as the premier technical architecture partner for high-growth industrial logistics.</p>
               </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION: THE FUTURE RECRUITMENT */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8">
           <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-blue-600 rounded-2xl p-10 md:p-12 text-center text-white relative overflow-hidden shadow-2xl"
           >
              {/* Animated Circles */}
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2 animate-pulse" />
              
              <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                 <h2 className="text-3xl md:text-5xl font-medium font-heading tracking-tighter leading-tight">Become Part of <br /> the Intelligence.</h2>
                 <p className="text-base text-blue-100 font-light leading-relaxed">Join the global enterprise leaders who rely on QIntellect for technical stability and innovation.</p>
                 <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    <Link to="/contact" className="px-6 py-3 bg-white text-blue-600 rounded-lg font-black text-[10px] uppercase tracking-[0.3em] hover:bg-slate-50 transition-all shadow-xl">Book Strategy Session</Link>
                    <Link to="/services" className="px-6 py-3 border border-blue-400 text-white rounded-lg font-black text-[10px] uppercase tracking-[0.3em] hover:bg-blue-700 transition-all">Explore Capabilities</Link>
                 </div>
              </div>
           </motion.div>
        </div>
      </section>
      
    </div>
  );
};

export default About;
