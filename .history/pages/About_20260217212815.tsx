
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
  Users,
  Twitter,
  Linkedin,
  Instagram,
  Quote
} from 'lucide-react';

// Animated Typewriter Component for About Page
const TypewriterText: React.FC = React.memo(() => {
  const words = ["AI Solutions.", "Smart Chatbots.", "Web Development.", "Dynamics 365.", "Business Growth."];
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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="relative flex items-center justify-between mb-20 last:mb-0">
      {/* Left Content */}
      <div className={`hidden md:block w-1/2 ${isEven ? 'pr-16 text-right' : 'order-last pl-16 text-left'}`}>
        <motion.div
          initial={{ opacity: 0, x: isEven ? -80 : 80, rotateY: isEven ? -15 : 15 }}
          animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          {/* Animated Year */}
          <motion.span
            initial={{ scale: 0.5, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-7xl font-black bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent font-heading mb-3 block"
          >
            {year}
          </motion.span>

          {/* Title with underline animation */}
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "100%" } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`h-1 bg-gradient-to-r from-blue-500 to-blue-300 mb-4 ${isEven ? 'ml-auto' : 'mr-auto'}`}
            style={{ maxWidth: '120px' }}
          />

          <motion.h4
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-2xl font-bold text-slate-900 mb-4 font-heading"
          >
            {title}
          </motion.h4>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className={`text-slate-500 font-light text-base leading-relaxed max-w-sm ${isEven ? 'ml-auto' : 'mr-auto'}`}
          >
            {desc}
          </motion.p>
        </motion.div>
      </div>

      {/* Center Line & Dot */}
      <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 flex flex-col items-center">
        {/* Animated Dot */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={isInView ? { scale: 1, rotate: 0 } : {}}
          transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
          className="relative z-10"
        >
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 ring-4 ring-blue-100 shadow-lg shadow-blue-500/30" />
          {/* Pulse effect */}
          <motion.div
            animate={{ scale: [1, 1.8, 1], opacity: [0.8, 0, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-blue-500 rounded-full"
          />
        </motion.div>

        {/* Animated Line */}
        <motion.div
          initial={{ height: 0 }}
          animate={isInView ? { height: "100%" } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-0.5 bg-gradient-to-b from-blue-400 to-blue-100 absolute top-6 -z-0"
          style={{ minHeight: "120px" }}
        />
      </div>

      {/* Right Side - Card for Mobile / Icon for Desktop */}
      <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${!isEven ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
        {/* Mobile Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="md:hidden bg-white p-6 rounded-2xl shadow-xl border border-slate-100"
        >
          <span className="text-4xl font-black bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent font-heading mb-2 block">{year}</span>
          <h4 className="text-xl font-bold text-slate-900 mb-2 font-heading">{title}</h4>
          <p className="text-slate-500 font-light text-sm leading-relaxed">{desc}</p>
        </motion.div>

        {/* Desktop Icon Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
          animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4, type: "spring" }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          className={`hidden md:flex items-center ${isEven ? 'justify-start' : 'justify-end'}`}
        >
          <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-100 flex items-center justify-center shadow-xl hover:shadow-2xl transition-all cursor-pointer group">
            {index === 0 && <Zap className="w-12 h-12 text-blue-500 group-hover:scale-110 transition-transform" />}
            {index === 1 && <Cpu className="w-12 h-12 text-blue-500 group-hover:scale-110 transition-transform" />}
            {index === 2 && <Globe className="w-12 h-12 text-blue-500 group-hover:scale-110 transition-transform" />}
            {index === 3 && <Shield className="w-12 h-12 text-blue-500 group-hover:scale-110 transition-transform" />}
            {index === 4 && <Network className="w-12 h-12 text-blue-500 group-hover:scale-110 transition-transform" />}
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
    { year: '2012', title: 'Company Founded', desc: 'QIntellect Technologies started with a simple goal - help businesses grow with smart technology solutions.' },
    { year: '2015', title: 'AI Solutions Launch', desc: 'We built our first AI-powered chatbots and customer service tools for businesses worldwide.' },
    { year: '2018', title: 'Global Expansion', desc: 'Expanded our services globally with Dynamics 365, ERP systems, and EDI solutions.' },
    { year: '2022', title: 'Innovation Leader', desc: 'Became a trusted partner for web development, enterprise solutions, and digital transformation.' },
    { year: '2025', title: 'Future Ready', desc: 'Leading the way in AI customer representatives and intelligent business automation.' }
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
            <span className="text-white/95 text-xs font-medium uppercase tracking-wider">QIntellect Technologies</span>
          </motion.div>

          {/* Main Title with Animation */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 font-heading"
          >
            About <span className="text-blue-400">QIntellect</span>
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
            We build smart AI solutions, powerful chatbots, and enterprise systems
            that help your business grow faster and work smarter.
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
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">∞</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-medium">Innovation</div>
            </div>
            <div className="w-px bg-slate-600/50" />
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">500+</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-medium">Innovation & Growth</div>
            </div>
            <div className="w-px bg-slate-600/50" />
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">98%</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-medium">Excellence</div>
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
                        • QIntellect • Smart Solutions • AI • Growth •
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
                We Build Smart Solutions That Help Your Business Grow.
              </h2>

              {/* Description */}
              <p className="text-base text-slate-500 leading-relaxed font-light">
                QIntellect Technologies is your trusted partner for AI solutions, custom chatbots, Dynamics 365, web development, EDI, and ERP systems. We make technology simple and powerful. Our team works closely with you to understand your needs and deliver solutions that actually work. No complicated tech talk - just real results for your business.
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
                  <div className="text-lg font-bold text-slate-900">Building the Future</div>
                  <div className="text-base font-semibold text-slate-700">Smart Business Solutions</div>
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
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
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
                Helping Businesses Succeed With Smart Technology
              </h2>

              {/* Description */}
              <p className="text-lg text-slate-300 leading-relaxed">
                At QIntellect Technologies, our mission is simple: make powerful technology easy for every business. We build AI chatbots, enterprise systems, and web solutions that save you time, cut costs, and help you serve customers better.
              </p>

              {/* Mission Points */}
              <div className="space-y-4">
                {[
                  { icon: Zap, title: 'Simple & Powerful', desc: 'A that works without the headache' },
                  { icon: Users, title: 'Your Success First', desc: 'We win when your business grows' },
                  { icon: Shield, title: 'Always Reliable', desc: '24/7 support you can count on' }
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
                      <div className="text-sm font-bold text-slate-900">Your Growth Partner</div>
                      <div className="text-xs text-slate-500">QIntellect Technologies</div>
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
                Building the Future of Smart Business Technology
              </h2>

              {/* Description */}
              <p className="text-lg text-slate-500 leading-relaxed">
                We see a future where every business, big or small, has access to powerful AI and enterprise tools. QIntellect Technologies is making this happen - one solution at a time.
              </p>

              {/* Vision Goals */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { num: '01', title: 'Trusted Partner', desc: 'Be the go-to tech partner for growing businesses' },
                  { num: '02', title: 'Easy Solutions', desc: 'Make complex technology simple to use' },
                  { num: '03', title: 'Global Reach', desc: 'Help businesses everywhere succeed' },
                  { num: '04', title: 'Always Better', desc: 'Never stop improving our solutions' }
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
                <span className="uppercase text-sm tracking-wider">Get Started Today</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS - STEP BY STEP PROCESS */}
      <section className="py-24 px-4 md:px-8 bg-slate-900 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.3) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 right-20 w-[400px] h-[400px] border border-blue-500/10 rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-20 left-20 w-[300px] h-[300px] border border-blue-500/10 rounded-full"
          />
        </div>

        <div className="container mx-auto relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="flex items-center justify-center space-x-3 mb-6">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-3 h-3 bg-blue-500 rounded-full"
              />
              <span className="text-blue-400 text-sm font-bold uppercase tracking-[0.3em]">How It Works</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="w-3 h-3 bg-blue-500 rounded-full"
              />
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight font-heading mb-6">
              How <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">QIntellect</span> Works
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Simple steps to transform your business with smart technology
            </p>
          </motion.div>

          {/* Process Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {[
              {
                step: '01',
                title: 'Tell Us Your Needs',
                desc: 'Share your business goals and challenges. We listen first to understand what you really need.',
                icon: Target
              },
              {
                step: '02',
                title: 'We Plan Together',
                desc: 'Our team creates a clear plan with the right mix of AI, chatbots, web, or enterprise solutions.',
                icon: Layers
              },
              {
                step: '03',
                title: 'Build & Test',
                desc: 'We build your solution and test everything to make sure it works perfectly for your business.',
                icon: Cpu
              },
              {
                step: '04',
                title: 'Launch & Support',
                desc: 'Go live with confidence. Our team supports you 24/7 to keep things running smoothly.',
                icon: Shield
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="relative group"
              >
                {/* Connector Line */}
                {i < 3 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-blue-500/50 to-transparent z-0" />
                )}

                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 h-full hover:bg-white/10 hover:border-blue-500/30 transition-all duration-500">
                  {/* Step Number */}
                  <motion.div
                    whileHover={{ rotate: 10 }}
                    className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-shadow"
                  >
                    <item.icon className="w-8 h-8 text-white" />
                  </motion.div>

                  {/* Step Badge */}
                  <div className="absolute top-6 right-6 text-5xl font-black text-white/5 group-hover:text-blue-500/10 transition-colors">
                    {item.step}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>

                  {/* Hover Glow */}
                  <div className="absolute inset-0 rounded-3xl bg-blue-500/0 group-hover:bg-blue-500/5 transition-colors duration-500" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Services We Provide */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Our Services
            </h3>
            <p className="text-slate-400">Everything you need to grow your business with smart technology</p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
            {[
              { name: 'Artificial Intelligence (AI)', icon: Cpu, color: 'from-purple-500 to-purple-600' },
              { name: 'Customized Chatbots', icon: Microchip, color: 'from-blue-500 to-blue-600' },
              { name: 'AI Customer Representative', icon: Users, color: 'from-green-500 to-green-600' },
              { name: 'Dynamics 365', icon: Globe, color: 'from-orange-500 to-orange-600' },
              { name: 'Web Development', icon: Monitor, color: 'from-pink-500 to-pink-600' },
              { name: 'EDI Solutions', icon: Network, color: 'from-cyan-500 to-cyan-600' },
              { name: 'ERP Systems', icon: Layers, color: 'from-yellow-500 to-yellow-600' }
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -8, scale: 1.05 }}
                className="group cursor-pointer"
              >
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 hover:border-blue-500/30 transition-all duration-300">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`w-14 h-14 mx-auto mb-4 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center shadow-lg`}
                  >
                    <service.icon className="w-7 h-7 text-white" />
                  </motion.div>
                  <h4 className="text-white font-semibold text-sm leading-tight group-hover:text-blue-400 transition-colors">
                    {service.name}
                  </h4>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center mt-16"
          >
            <Link
              to="/services"
              className="inline-flex items-center space-x-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all"
            >
              <span className="uppercase text-sm tracking-wider">Explore All Services</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 6. HISTORY: THE SCROLLING CHRONOLOGY - POWERFUL ANIMATED VERSION */}
      <section className="py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-hidden relative">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{
              rotate: { duration: 60, repeat: Infinity, ease: "linear" },
              scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              rotate: -360,
              scale: [1, 1.2, 1]
            }}
            transition={{
              rotate: { duration: 50, repeat: Infinity, ease: "linear" },
              scale: { duration: 10, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-blue-200/20 rounded-full blur-3xl"
          />
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <motion.span
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center space-x-3 text-sm font-bold text-blue-600 uppercase tracking-[0.3em]"
              >
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-3 h-3 bg-blue-500 rounded-full"
                />
                <span>Our Journey</span>
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight leading-none font-heading"
              >
                The QIntellect <br />
                <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-transparent">
                  Story.
                </span>
              </motion.h2>
            </motion.div>

            {/* Stats Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4, type: "spring" }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="hidden lg:flex items-center space-x-5 p-6 bg-white rounded-3xl border border-slate-100 shadow-xl shadow-blue-500/5"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg"
              >
                <History className="w-8 h-8 text-white" />
              </motion.div>
              <div>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="text-3xl font-black text-slate-900"
                >
                  Innovation
                </motion.div>
                <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">Helping Businesses Grow</div>
              </div>
            </motion.div>
          </div>

          {/* Timeline */}
          <div className="relative max-w-6xl mx-auto py-12">
            {/* Center Line Glow */}
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0 w-1 bg-gradient-to-b from-blue-500 via-blue-400 to-transparent rounded-full shadow-lg shadow-blue-500/30"
            />

            {historyMilestones.map((ms, i) => (
              <TimelineItem key={i} {...ms} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. AI EXPERT TEAM SECTION - Temporarily Hidden */}
      {/* <TeamSection /> */}

      {/* 6. TESTIMONIALS SECTION */}
      <TestimonialSection />

    </div>
  );
};

// --- AI Expert Team Section ---
const TeamSection: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState(0);

  const teamMembers = [
    {
      name: "Imran Khalid",
      role: "Chief AI Architect",
      image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=800&auto=format&fit=crop",
      description: "We value curiosity, collaboration, and a can do attitude. Oh, and coffee lots of coffee. Come join a team celebrates your unique skills and helps you",
      skills: [
        { name: "Artificial Intelligence", level: 90 },
        { name: "Machine Learning", level: 85 }
      ],
      experience: "∞",
      socials: {
        facebook: "#",
        twitter: "#",
        linkedin: "#",
        pinterest: "#"
      }
    },
    {
      name: "Hooria Shahdi",
      role: "Lead Data Scientist",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800&auto=format&fit=crop",
      description: "Passionate about transforming raw data into actionable insights that drive business growth. With expertise in deep learning and neural networks, I help organizations unlock the power of AI.",
      skills: [
        { name: "Data Science", level: 95 },
        { name: "Deep Learning", level: 88 }
      ],
      experience: "10+",
      socials: {
        facebook: "#",
        twitter: "#",
        linkedin: "#",
        pinterest: "#"
      }
    },
    {
      name: "Malaika",
      role: "Robotics & AI Specialist",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop",
      description: "We value curiosity, collaboration, and a can do attitude. Oh, and coffee lots of coffee. Come join a team celebrates your unique skills and helps you",
      skills: [
        { name: "Artificial Intelligence", level: 90 },
        { name: "Robotics Management", level: 70 }
      ],
      experience: "10+",
      socials: {
        facebook: "#",
        twitter: "#",
        linkedin: "#",
        pinterest: "#"
      }
    },
    {
      name: "Ubaid",
      role: "Computer Vision Engineer",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop",
      description: "Specializing in computer vision and image processing technologies. My work focuses on building intelligent systems that can see, understand, and interact with the visual world.",
      skills: [
        { name: "Computer Vision", level: 92 },
        { name: "Neural Networks", level: 87 }
      ],
      experience: "8+",
      socials: {
        facebook: "#",
        twitter: "#",
        linkedin: "#",
        pinterest: "#"
      }
    }
  ];

  const currentMember = teamMembers[selectedMember];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-gradient-to-tr from-blue-100 to-slate-50 rounded-full blur-3xl opacity-30" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2.5 text-blue-600 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-current" />
            <span className="text-[11px] font-bold uppercase tracking-[0.35em]">OUR TEAM</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight font-heading">
            Meet The QIntellect Team.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Sidebar - Team Member List */}
          <div className="lg:col-span-3 space-y-4">
            {teamMembers.map((member, index) => (
              <motion.button
                key={index}
                onClick={() => setSelectedMember(index)}
                whileHover={{ x: 8 }}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 ${selectedMember === index
                    ? 'bg-slate-50 shadow-md ring-2 ring-blue-500/20'
                    : 'bg-white hover:bg-slate-50 shadow-sm'
                  }`}
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-16 h-16 rounded-xl object-cover ring-2 ring-white"
                  />
                  {selectedMember === index && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-white" />
                  )}
                </div>
                <div className="text-left">
                  <h4 className="text-sm font-bold text-slate-900">{member.name}</h4>
                  <p className="text-xs text-slate-500">{member.role}</p>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Center - Main Image */}
          <div className="lg:col-span-4">
            <motion.div
              key={selectedMember}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="relative rounded-[3rem] overflow-hidden bg-gradient-to-br from-slate-100 to-slate-50 p-2 shadow-2xl">
                <img
                  src={currentMember.image}
                  alt={currentMember.name}
                  className="w-full aspect-[3/4] object-cover rounded-[2.7rem]"
                />

                {/* Experience Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-slate-900 text-white px-6 py-3 rounded-full shadow-xl"
                >
                  <div className="text-2xl font-bold">{currentMember.experience}</div>
                  <div className="text-xs">
                    <div className="font-bold">Professional</div>
                    <div className="opacity-80">Experience</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Right - Details */}
          <div className="lg:col-span-5">
            <motion.div
              key={selectedMember}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Name & Role */}
              <div>
                <h3 className="text-3xl font-bold text-slate-900 mb-2">{currentMember.name}</h3>
                <p className="text-blue-600 font-medium">{currentMember.role}</p>
              </div>

              {/* Description */}
              <p className="text-slate-600 leading-relaxed">
                {currentMember.description}
              </p>

              {/* Skills */}
              <div className="space-y-4">
                {currentMember.skills.map((skill, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-slate-900">{skill.name}</span>
                      <span className="text-sm font-bold text-slate-900">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-3 pt-4">
                <a href={currentMember.socials.facebook} className="w-10 h-10 rounded-full bg-slate-100 hover:bg-blue-500 hover:text-white flex items-center justify-center transition-all">
                  <Globe className="w-4 h-4" />
                </a>
                <a href={currentMember.socials.twitter} className="w-10 h-10 rounded-full bg-slate-100 hover:bg-blue-500 hover:text-white flex items-center justify-center transition-all">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href={currentMember.socials.linkedin} className="w-10 h-10 rounded-full bg-slate-100 hover:bg-blue-500 hover:text-white flex items-center justify-center transition-all">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href={currentMember.socials.pinterest} className="w-10 h-10 rounded-full bg-slate-100 hover:bg-blue-500 hover:text-white flex items-center justify-center transition-all">
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Decorative 3D Element (Bottom Right) */}
      <motion.div
        animate={{
          rotate: [0, 10, 0],
          y: [0, -20, 0]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="hidden lg:block absolute bottom-12 right-12 w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-[2rem] shadow-2xl opacity-80 blur-sm"
      />
    </section>
  );
};

// --- Testimonial Section ---
const TestimonialSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      text: "QIntellect's AI solutions completely transformed how our team operates. Their customized chatbot handles 80% of our customer inquiries, letting us focus on growth strategy and innovation!",
      name: "Jacob Jones",
      role: "Head of Digital Strategy, NovaTech",
      avatar: "https://i.pravatar.cc/150?u=jacob"
    },
    {
      text: "The Dynamics 365 implementation by QIntellect was flawless. They unified our CRM and ERP data into a single source of truth. Our operational efficiency jumped 40% in the first quarter.",
      name: "Guy Hawkins",
      role: "Technical Lead, Aurora Systems",
      avatar: "https://i.pravatar.cc/150?u=guy"
    },
    {
      text: "From AI Customer Representatives to EDI modernization, QIntellect handled our entire digital transformation. Their deep understanding of enterprise systems helped us scale globally with minimal friction.",
      name: "Eleanor Pena",
      role: "CEO, Streamline Corp",
      avatar: "https://i.pravatar.cc/150?u=eleanor"
    },
    {
      text: "QIntellect built us a web platform that's lightning fast and SEO-optimized. Combined with their AI-powered product recommendation engine, our online sales increased by 65% in six months.",
      name: "Bessie Cooper",
      role: "Product Manager, RetailSync",
      avatar: "https://i.pravatar.cc/150?u=bessie"
    },
    {
      text: "Their AI Customer Representative reduced our support response times by 70%. The sentiment analysis and multi-lingual voice capabilities are incredibly sophisticated. Highly recommended!",
      name: "Robert Fox",
      role: "Customer Success, GlobalEdge",
      avatar: "https://i.pravatar.cc/150?u=robert"
    },
    {
      text: "QIntellect modernized our entire EDI infrastructure and ERP system. Partner onboarding went from weeks to hours, and our supply chain now runs with complete transparency.",
      name: "Jane Cooper",
      role: "Founder, InnovateHQ",
      avatar: "https://i.pravatar.cc/150?u=jane"
    },
    {
      text: "Their ERP implementation connected our finance, HR, and supply chain into one unified system. We saw measurable ROI within the first quarter. QIntellect knows enterprise technology.",
      name: "Cody Fisher",
      role: "Ops Director, FutureVision",
      avatar: "https://i.pravatar.cc/150?u=cody"
    },
    {
      text: "QIntellect speaks both the language of AI technology and business strategy. Their chatbot solution integrated seamlessly with our Dynamics 365 CRM, bridging gaps we didn't know existed.",
      name: "Arlene McCoy",
      role: "Marketing Head, BrandBoost",
      avatar: "https://i.pravatar.cc/150?u=arlene"
    }
  ];

  const next = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
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
              <div className="flex items-center space-x-2.5 text-blue-600 mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-current" />
                <span className="text-[11px] font-bold uppercase tracking-[0.35em]">CLIENT SUCCESS</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight font-heading">
                What Our Clients Say About <br /> QIntellect Technologies
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
                        {[1, 2, 3, 4, 5].map(s => (
                          <Star key={s} className="w-4 h-4 text-blue-500 fill-blue-500" />
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
                        <Quote className="w-8 h-8 text-blue-500 opacity-20" />
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Navigation Buttons */}
              <div className="absolute bottom-0 left-0 flex gap-3">
                <button
                  onClick={prev}
                  className="w-10 h-10 rounded-full border-2 border-slate-200 bg-white flex items-center justify-center hover:bg-blue-500 hover:border-blue-500 hover:text-white transition-all shadow-sm"
                >
                  <ArrowRight className="w-4 h-4 rotate-180" />
                </button>
                <button
                  onClick={next}
                  className="w-10 h-10 rounded-full border-2 border-slate-200 bg-white flex items-center justify-center hover:bg-blue-500 hover:border-blue-500 hover:text-white transition-all shadow-sm"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* AI Image - Modern Tailwind Design */}
          <div className="lg:col-span-5 hidden lg:block">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              whileHover={{ y: -8 }}
              className="relative h-[520px] group cursor-pointer"
            >
              {/* Main Card */}
              <div className="relative h-full rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-slate-100 via-white to-slate-50 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:shadow-[0_30px_80px_rgba(59,130,246,0.15)] transition-all duration-500 ring-1 ring-slate-200/50 hover:ring-blue-500/30 hover:ring-2">

                {/* Inner Image Container */}
                <div className="relative h-full rounded-[2rem] overflow-hidden bg-slate-900">
                  <motion.img
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
                    src="/images/testimonial-img.jpg"
                    alt="AI Professional"
                    className="w-full h-full object-cover filter grayscale-[10%] group-hover:grayscale-0 transition-all duration-700"
                  />

                  {/* Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-transparent to-blue-400/10 opacity-40 group-hover:opacity-60 transition-opacity duration-500 mix-blend-overlay" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/30 group-hover:to-slate-900/50 transition-all duration-500" />

                  {/* Animated Corner Indicators */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="absolute top-5 left-5 w-12 h-12 border-l-[3px] border-t-[3px] border-blue-500 rounded-tl-xl opacity-70 group-hover:opacity-100 group-hover:w-16 group-hover:h-16 transition-all duration-500"
                  />
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="absolute bottom-5 right-5 w-12 h-12 border-r-[3px] border-b-[3px] border-blue-400 rounded-br-xl opacity-70 group-hover:opacity-100 group-hover:w-16 group-hover:h-16 transition-all duration-500"
                  />

                  {/* Floating Badge */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="absolute top-6 right-6 backdrop-blur-md bg-white/90 px-4 py-2 rounded-full shadow-lg border border-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  >
                    <span className="text-xs font-bold text-blue-600 tracking-wider">AI POWERED</span>
                  </motion.div>

                  {/* Bottom Info Bar */}
                  <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-900/95 via-slate-900/80 to-transparent backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-5"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                      <span className="text-white text-sm font-medium">Innovation in Action</span>
                    </div>
                  </motion.div>
                </div>

              </div>

              {/* Floating Background Glow */}
              <div className="absolute inset-0 -z-10 rounded-[2.5rem] bg-gradient-to-br from-blue-500/10 via-blue-400/5 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              {/* Subtle Outer Ring on Hover */}
              <div className="absolute -inset-1 rounded-[2.8rem] bg-gradient-to-br from-blue-500/20 via-blue-400/10 to-transparent opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500 -z-10" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
