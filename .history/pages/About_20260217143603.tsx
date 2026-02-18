
import React, { useRef, useEffect } from 'react';
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
  Monitor
} from 'lucide-react';

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

  useEffect(() => {
    // Force navbar background on About page
    const navbar = document.querySelector('nav');
    if (navbar) {
      const navContent = navbar.querySelector('div > div');
      if (navContent) {
        navContent.classList.remove('bg-transparent');
        navContent.classList.add('bg-white/95', 'backdrop-blur-md', 'shadow-lg', 'border', 'border-slate-100');
      }
    }
    return () => {
      const navbar = document.querySelector('nav');
      if (navbar) {
        const navContent = navbar.querySelector('div > div');
        if (navContent && window.scrollY <= 20) {
          navContent.classList.add('bg-transparent');
          navContent.classList.remove('bg-white/95', 'backdrop-blur-md', 'shadow-lg', 'border', 'border-slate-100');
        }
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="bg-white font-light selection:bg-orange-100 selection:text-orange-700 overflow-hidden">
      
      {/* HERO BANNER SECTION */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden pt-24">
        {/* Background Image with AI Theme */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2265&auto=format&fit=crop&ixlib=rb-4.0.3")' }}
        >
          {/* Dark Black Overlay */}
          <div className="absolute inset-0 bg-black/75" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 container mx-auto px-6 text-center">
          {/* Main Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 font-heading"
          >
            About
          </motion.h1>

          {/* Breadcrumb Navigation */}
          <motion.nav 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center space-x-2"
          >
            <Link 
              to="/" 
              className="text-gray-300 hover:text-white transition-colors duration-300 text-sm"
            >
              Home
            </Link>
            <ArrowRight className="w-4 h-4 text-gray-400" />
            <span className="text-white text-sm">About</span>
          </motion.nav>
        </div>
      </section>

      {/* 2. SOPHISTICATED CONTENT SECTION */}
      <section className="py-20 px-4 md:px-8 bg-white relative overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-orange-600/5 rounded-full blur-[120px]" />
        
        <div className="container mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="lg:w-3/5 space-y-8">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center space-x-3 px-6 py-2 rounded-full bg-orange-600 text-white shadow-xl shadow-orange-500/20 text-[10px] font-black uppercase tracking-[0.4em]"
              >
                <Microchip className="w-3 h-3" />
                <span>Intelligence Redefined</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-7xl font-medium text-slate-900 font-heading leading-tight md:leading-[0.9] tracking-tighter"
              >
                Building Tomorrow's <br /> 
                <span className="text-orange-600">AI Solutions.</span>
              </motion.h1>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="space-y-6 text-base text-slate-500 leading-relaxed font-light max-w-2xl border-l-4 border-orange-600 pl-8"
              >
                <p>
                  At QIntellect Technologies, we harness the transformative power of artificial intelligence to create intelligent solutions that redefine business operations and drive unprecedented growth.
                </p>
                <p>
                  Since our founding, we have been at the forefront of AI innovation, bridging the gap between cutting-edge research and practical business applications that deliver measurable results.
                </p>
              </motion.div>

              <div className="flex flex-wrap gap-8 pt-6">
                <div className="space-y-1">
                  <div className="text-4xl font-medium text-slate-900 tracking-tighter">12Y+</div>
                  <div className="text-[10px] font-bold text-orange-600 uppercase tracking-widest">AI Innovation</div>
                </div>
                <div className="space-y-1">
                  <div className="text-4xl font-medium text-slate-900 tracking-tighter">500+</div>
                  <div className="text-[10px] font-bold text-orange-600 uppercase tracking-widest">Smart Solutions</div>
                </div>
              </div>
            </div>

            <motion.div 
              style={{ y: parallaxY }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="lg:w-2/5 relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white group">
                <img 
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1400" 
                  alt="High Tech Lab" 
                  className="w-full aspect-[4/5] object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-blue-900/10 pointer-events-none" />
                
                {/* Overlay Component */}
                <div className="absolute bottom-4 left-4 right-4 p-4 glass-card rounded-xl border border-white/40">
                   <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                        <Zap className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-slate-900">SYSTEM_READY</span>
                        <span className="text-[9px] text-slate-500 uppercase font-mono tracking-widest">Logic Engine v9.0</span>
                      </div>
                   </div>
                </div>
              </div>
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
