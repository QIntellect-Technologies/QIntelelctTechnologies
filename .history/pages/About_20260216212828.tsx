
import React, { useRef } from 'react';
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
      className="group relative p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
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
      title: 'Technical Sovereignty',
      desc: 'We engineer systems that ensure absolute data ownership and operational autonomy, bypassing the constraints of black-box providers.',
      icon: Fingerprint,
      color: 'bg-blue-600',
      delay: 0.1
    },
    {
      title: 'Structural Resilience',
      desc: 'Our mission is to build infrastructure that never fails, utilizing self-healing mesh networks and redundant AI logic paths.',
      icon: Shield,
      color: 'bg-indigo-600',
      delay: 0.2
    },
    {
      title: 'Ethical Intelligence',
      desc: 'AI as a tool of human empowerment. We focus on transparent neural systems that augment expertise rather than replace it.',
      icon: Cpu,
      color: 'bg-slate-900',
      delay: 0.3
    },
    {
      title: 'Infinite Scalability',
      desc: 'Architected for tomorrow. Every module is deployed with horizontal expansion in mind, growing alongside global operations.',
      icon: Layers,
      color: 'bg-blue-500',
      delay: 0.4
    }
  ];

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <div ref={containerRef} className="bg-white font-light selection:bg-blue-100 selection:text-blue-700 overflow-hidden">
      
      {/* 1. SOPHISTICATED HERO SECTION */}
      <section className="relative pt-24 pb-16 px-4 md:px-8 overflow-hidden bg-slate-50">
        <div className="absolute top-0 right-0 w-2/3 h-full bg-white skew-x-12 translate-x-1/3 pointer-events-none" />
        
        {/* Abstract Background Graphic */}
        <div className="absolute left-10 top-40 w-64 h-64 bg-blue-600/5 rounded-full blur-[100px] animate-pulse" />
        
        <div className="container mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="lg:w-3/5 space-y-8">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center space-x-3 px-6 py-2 rounded-full bg-blue-600 text-white shadow-xl shadow-blue-500/20 text-[10px] font-black uppercase tracking-[0.4em]"
              >
                <Globe className="w-3 h-3" />
                <span>The Global Mandate</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-7xl font-medium text-slate-900 font-heading leading-tight md:leading-[0.9] tracking-tighter"
              >
                Engineering <br /> 
                <span className="text-blue-600">Autonomy.</span>
              </motion.h1>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-6 text-base text-slate-500 leading-relaxed font-light max-w-2xl border-l-4 border-blue-600 pl-8"
              >
                <p>
                  At QIntellect Technologies, we redefine the relationship between enterprise and infrastructure. We don't just provide software; we architect the nervous systems of global organizations.
                </p>
                <p>
                  Since our inception, we have bridged the gap between avant-garde research and the high-stakes requirements of global industrial operations.
                </p>
              </motion.div>

              <div className="flex flex-wrap gap-8 pt-6">
                <div className="space-y-1">
                  <div className="text-4xl font-medium text-slate-900 tracking-tighter">12Y+</div>
                  <div className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Industry Leadership</div>
                </div>
                <div className="space-y-1">
                  <div className="text-4xl font-medium text-slate-900 tracking-tighter">500+</div>
                  <div className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Global Deployments</div>
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
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white group">
                <img 
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1400" 
                  alt="High Tech Lab" 
                  className="w-full aspect-[4/5] object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-blue-900/10 pointer-events-none" />
                
                {/* Overlay Component */}
                <div className="absolute bottom-4 left-4 right-4 p-4 glass-card rounded-2xl border border-white/40">
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
                    className="aspect-[4/5] rounded-3xl overflow-hidden shadow-xl"
                  >
                    <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-700" alt="Enterprise" />
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="p-8 bg-blue-600 text-white rounded-3xl shadow-xl"
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
                    className="p-8 bg-slate-900 text-white rounded-3xl shadow-xl"
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
                    className="aspect-[4/5] rounded-3xl overflow-hidden shadow-xl"
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
                     whileHover={{ y: -10 }}
                     className="group flex flex-col"
                   >
                     <div className="relative rounded-3xl overflow-hidden mb-4 aspect-[3/4] shadow-xl border-2 border-white">
                       <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                       />
                       <div className="absolute inset-0 bg-blue-600/5 group-hover:bg-transparent transition-all" />
                     </div>
                     <h4 className="text-lg font-medium text-slate-900 font-heading tracking-tight">{member.name}</h4>
                     <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">{member.role}</p>
                   </motion.div>
                 ))}
               </div>
            </div>

            <div className="lg:w-1/2 relative">
               <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
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
      {/* 6. CALL TO ACTION: THE FUTURE RECRUITMENT */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8">
           <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-blue-600 rounded-3xl p-12 md:p-16 text-center text-white relative overflow-hidden shadow-2xl"
           >
              {/* Animated Circles */}
              <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/10 rounded-full blur-[150px] translate-x-1/2 -translate-y-1/2 animate-pulse" />
              
              <div className="relative z-10 max-w-4xl mx-auto space-y-8">
                 <h2 className="text-4xl md:text-6xl font-medium font-heading tracking-tighter leading-tight">Become Part of <br /> the Intelligence.</h2>
                 <p className="text-lg text-blue-100 font-light leading-relaxed">Join the global enterprise leaders who rely on QIntellect for technical stability, data sovereignty, and future-proof innovation.</p>
                 <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Link to="/contact" className="px-8 py-4 bg-white text-blue-600 rounded-xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-slate-50 transition-all shadow-xl">Book Strategy Session</Link>
                    <Link to="/services" className="px-8 py-4 border-2 border-blue-400 text-white rounded-xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-blue-700 transition-all">Explore Capabilities</Link>
                 </div>
              </div>
           </motion.div>
        </div>
      </section>
      
    </div>
  );
};

export default About;
