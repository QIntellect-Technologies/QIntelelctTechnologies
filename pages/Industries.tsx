
import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
   Activity,
   ShoppingCart,
   Factory,
   Truck,
   Car,
   DollarSign,
   ArrowRight,
   CheckCircle2,
   Globe,
   Zap,
   Shield,
   Cpu,
   Layers,
   Search,
   ChevronRight,
   Database,
   Network,
   Clock,
   Terminal,
   MousePointer2,
   Settings,
   Share2,
   HardDrive,
   Users,
   Repeat,
   ExternalLink,
   Code,
   Cpu as ProcessorIcon,
   Hotel,
   Stethoscope,
   Megaphone,
   Banknote,
   GraduationCap,
   Package,
   Laptop
} from 'lucide-react';
import { INDUSTRIES } from '../constants';
import useSEO from '../hooks/useSEO';

const IndustryBlueprint = ({ type }: { type: string }) => {
   // Sector-specific abstract visualizations
   switch (type) {
      case 'healthcare':
         return (
            <div className="relative h-48 bg-blue-600 rounded-2xl overflow-hidden p-5 shadow-2xl border border-blue-400">
               <div className="absolute top-0 right-0 p-6 opacity-10"><Activity className="w-20 h-20" /></div>
               <div className="relative z-10 space-y-3">
                  <div className="flex items-center space-x-3 text-blue-200 text-[10px] font-black uppercase tracking-widest">
                     <Shield className="w-4 h-4" /> <span>Data Sovereignty Plane</span>
                  </div>
                  <div className="flex space-x-2">
                     {[1, 2, 3, 4].map(i => (
                        <motion.div
                           key={i}
                           animate={{ height: [30, 60, 30] }}
                           transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                           className="w-3 bg-white/20 rounded-full"
                        />
                     ))}
                  </div>
                  <p className="text-blue-100 text-[10px] font-light max-w-[200px]">Real-time encrypted patient telemetry streams with sub-50ms synchronization.</p>
               </div>
            </div>
         );
      case 'manufacturing':
      case 'automotive':
         return (
            <div className="relative h-48 bg-slate-900 rounded-2xl overflow-hidden p-5 shadow-2xl border border-slate-700">
               <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
               <div className="relative z-10 flex flex-col justify-between h-full">
                  <div className="flex justify-between items-start">
                     <div className="space-y-1">
                        <h4 className="text-white text-lg font-heading font-medium">{type === 'automotive' ? 'JIT Supply Mirror' : 'Digital Twin Mirror'}</h4>
                        <p className="text-[8px] font-mono text-blue-400">UNIT_ID: QINT-{type.toUpperCase()}-092</p>
                     </div>
                     {type === 'automotive' ? <Car className="text-blue-500 w-6 h-6" /> : <Factory className="text-blue-500 w-6 h-6" />}
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                     {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-1 bg-slate-700 rounded-full overflow-hidden">
                           <motion.div animate={{ width: ['0%', '100%'] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }} className="h-full bg-blue-500" />
                        </div>
                     ))}
                  </div>
                  <p className="text-slate-500 text-[9px] uppercase font-bold tracking-widest">Efficiency Threshold: {type === 'automotive' ? '99.8%' : '+14%'}</p>
               </div>
            </div>
         );
      case 'retail':
      case 'ecommerce':
         return (
            <div className="relative h-48 bg-white border-2 border-dashed border-blue-200 rounded-2xl overflow-hidden p-5 shadow-xl">
               <div className="relative z-10 space-y-4">
                  <div className="flex items-center space-x-3">
                     <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shadow-sm"><ShoppingCart className="w-5 h-5" /></div>
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Omnichannel Sync</span>
                  </div>
                  <div className="flex -space-x-2">
                     {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[9px] font-bold text-slate-400">U{i}</div>)}
                     <div className="w-8 h-8 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center text-[9px] font-bold text-white shadow-lg">+1M</div>
                  </div>
                  <p className="text-slate-500 text-[10px] font-light leading-relaxed">Personalization engine scaling to 10M+ unique consumer profiles globally.</p>
               </div>
            </div>
         );
      default:
         return (
            <div className="relative h-48 bg-slate-50 rounded-2xl overflow-hidden p-5 border border-slate-100">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5"><Globe className="w-24 h-24" /></div>
               <div className="relative z-10 space-y-3">
                  <div className="w-8 h-8 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center"><Layers className="w-4 h-4 text-blue-600" /></div>
                  <h4 className="text-base font-heading font-medium text-slate-900">Global Resilience Plane</h4>
                  <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest leading-relaxed">99.99% Operational Continuity across all delivery regions.</p>
               </div>
            </div>
         );
   }
};

const Industries: React.FC = () => {
   useSEO({
      title: 'Industries We Serve | AI & ERP Solutions Across All Sectors',
      description: 'QIntellect Technologies delivers AI, chatbot, ERP, EDI, and Dynamics 365 solutions across healthcare, retail, manufacturing, logistics, finance, education, and more industries worldwide.',
      keywords: 'industry AI solutions, healthcare AI, manufacturing ERP, retail technology, logistics software, finance automation, education technology, enterprise software industries',
      canonical: 'https://www.qintellecttechnologies.com/industries',
      structuredData: {
         '@context': 'https://schema.org',
         '@type': 'WebPage',
         name: 'Industries We Serve',
         url: 'https://www.qintellecttechnologies.com/industries',
         description: 'AI, ERP, and enterprise technology solutions for all major industries.',
      }
   });

   const { scrollYProgress } = useScroll();
   const scaleX = useSpring(scrollYProgress, {
      stiffness: 100,
      damping: 30,
      restDelta: 0.001
   });

   const industries = INDUSTRIES.slice(0, 9); // Use our new INDUSTRIES constant

   const technicalVerticals = [
      { name: 'Microsoft Dynamics AX', desc: 'Enterprise-wide power for complex finance and operations.', icon: Database },
      { name: 'Microsoft Dynamics CRM', desc: 'Transforming customer data into actionable intelligence.', icon: Users },
      { name: 'Integrated EDI', desc: 'Seamless data exchange embedded within your core ERP.', icon: Repeat },
      { name: 'ERP Integrations', desc: 'Bridging the gap between legacy cores and modern clouds.', icon: Settings },
      { name: 'Application Programming Interfaces (APIs)', desc: 'Atomic connectivity for the modern distributed enterprise.', icon: Code },
      { name: 'B2B ECommerce', desc: 'High-volume digital trade portals with deep ERP sync.', icon: ShoppingCart }
   ];

   return (
      <div className="bg-white font-light selection:bg-blue-100 selection:text-blue-700">

         {/* Progress Bar */}
         <motion.div className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-[60]" style={{ scaleX }} />

         {/* 1. HERO SECTION */}
         <section className="pt-48 pb-32 relative overflow-hidden bg-slate-50">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-white skew-x-12 translate-x-1/3 pointer-events-none" />
            <div className="container mx-auto px-4 md:px-8 relative z-10">
               <div className="max-w-4xl space-y-10">
                  <motion.div
                     initial={{ opacity: 0, x: -20 }}
                     animate={{ opacity: 1, x: 0 }}
                     className="inline-flex items-center space-x-3 px-4 py-1.5 rounded-full bg-blue-600/10 border border-blue-600/20 text-blue-600 text-[10px] font-black uppercase tracking-[0.4em]"
                  >
                     <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                     <span>Sector Mastery v5.2</span>
                  </motion.div>

                  <motion.h1
                     initial={{ opacity: 0, y: 30 }}
                     animate={{ opacity: 1, y: 0 }}
                     className="text-4xl md:text-6xl font-medium text-slate-900 font-heading leading-[0.85] tracking-tighter"
                  >
                     Scaling <span className="text-blue-600">Enterprise</span> <br /> Resilience.
                  </motion.h1>

                  <motion.p
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.1 }}
                     className="text-xl text-slate-500 leading-relaxed font-light max-w-2xl"
                  >
                     We provide sector-specific technical knowledge that ensures operational stability and competitive advantage in high-stakes global industries.
                  </motion.p>
               </div>
            </div>
         </section>

         {/* 2. INDUSTRY DEEP DIVES (PARALLAX BLOCKS) */}
         <section className="py-24">
            <div className="container mx-auto px-4 md:px-8">
               <div className="grid grid-cols-1 gap-32">
                  {industries.map((ind, i) => (
                     <div key={ind.id} className={`flex flex-col lg:flex-row gap-16 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>

                        {/* Visual Column */}
                        <motion.div
                           initial={{ opacity: 0, scale: 0.9 }}
                           whileInView={{ opacity: 1, scale: 1 }}
                           viewport={{ once: true }}
                           className="lg:w-1/2 w-full space-y-6"
                        >
                           <IndustryBlueprint type={ind.id} />
                           <div className="grid grid-cols-3 gap-4">
                              {ind.technologies.slice(0, 3).map(t => (
                                 <div key={t} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex flex-col items-center text-center space-y-2 shadow-sm hover:shadow-md transition-all">
                                    <Terminal className="w-3 h-3 text-blue-600" />
                                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-900">{t}</span>
                                 </div>
                              ))}
                           </div>
                           <div className="p-5 bg-blue-600 text-white rounded-2xl shadow-2xl flex items-center justify-between group cursor-default">
                              <div className="space-y-1">
                                 <span className="text-[9px] font-black uppercase tracking-widest text-blue-200">Industry Solutions</span>
                                 <h5 className="text-xl font-medium font-heading">Success Rate</h5>
                              </div>
                              <div className="text-4xl font-medium font-heading tracking-tighter group-hover:scale-110 transition-transform">95%</div>
                           </div>
                        </motion.div>

                        {/* Content Column */}
                        <div className="lg:w-1/2 space-y-8">
                           <div className="space-y-4">
                              <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.5em]">Industry Solutions</span>
                              <h2 className="text-3xl md:text-5xl font-medium text-slate-900 font-heading tracking-tighter leading-tight">{ind.title}</h2>
                              <p className="text-lg text-slate-500 font-light leading-relaxed">{ind.shortDescription}</p>
                           </div>

                           <div className="space-y-4 pt-4">
                              <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em]">Key Features</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                 {ind.features.slice(0, 4).map(feat => (
                                    <div key={feat} className="flex items-center space-x-3 p-4 bg-white border border-slate-100 rounded-xl group hover:border-blue-300 transition-all shadow-sm">
                                       <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                          <CheckCircle2 className="w-3.5 h-3.5" />
                                       </div>
                                       <span className="text-xs font-medium text-slate-700">{feat}</span>
                                    </div>
                                 ))}
                              </div>
                           </div>

                           <div className="pt-6 flex gap-4">
                              <Link
                                 to={`/industries/${ind.id}`}
                                 className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl group"
                              >
                                 Explore Solutions <ChevronRight className="w-4 h-4 ml-3 group-hover:translate-x-2 transition-transform" />
                              </Link>
                              <Link
                                 to="/contact"
                                 className="inline-flex items-center px-8 py-4 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-700 transition-all shadow-xl group"
                              >
                                 Get Started <ChevronRight className="w-4 h-4 ml-3 group-hover:translate-x-2 transition-transform" />
                              </Link>
                           </div>
                        </div>

                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* 3. TECHNICAL VERTICALS GRID (NEW SECTION) */}
         <section className="py-48 bg-slate-50 border-y border-slate-200">
            <div className="container mx-auto px-4 md:px-8">
               <div className="text-center mb-32 space-y-6 max-w-3xl mx-auto">
                  <span className="text-[11px] font-black text-blue-600 uppercase tracking-[0.5em]">Technical Domains</span>
                  <h2 className="text-5xl md:text-7xl font-medium text-slate-900 font-heading tracking-tighter leading-tight">Domain Specialized <br /> Capabilities.</h2>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {technicalVerticals.map((vert, i) => (
                     <motion.div
                        key={vert.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ y: -5 }}
                        className="group p-6 bg-white rounded-2xl border border-slate-100 shadow-lg flex flex-col justify-between h-full hover:border-blue-200 transition-all"
                     >
                        <div className="space-y-6">
                           <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform">
                              <vert.icon className="w-6 h-6" />
                           </div>
                           <div className="space-y-3">
                              <h3 className="text-xl font-medium font-heading text-slate-900 tracking-tight">{vert.name}</h3>
                              <p className="text-xs text-slate-500 font-light leading-relaxed">{vert.desc}</p>
                           </div>
                        </div>
                        <div className="pt-8 border-t border-slate-50 mt-8">
                           <Link to="/contact" className="inline-flex items-center text-[10px] font-black text-blue-600 uppercase tracking-widest group-hover:text-slate-900 transition-colors">
                              Capability Audit <ArrowRight className="w-4 h-4 ml-3" />
                           </Link>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* 4. EDI WORKSTREAM PHILOSOPHY (NEW SECTION) */}
         <section className="py-48 bg-slate-900 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-blue-600/10 rounded-full blur-[200px] -translate-y-1/2 translate-x-1/2" />
            <div className="container mx-auto px-4 md:px-8 relative z-10">
               <div className="flex flex-col lg:flex-row gap-32 items-center">
                  <div className="lg:w-1/2 space-y-12">
                     <div className="space-y-6">
                        <span className="text-[11px] font-black text-blue-400 uppercase tracking-[0.6em]">Managed Operations</span>
                        <h2 className="text-5xl md:text-6xl font-medium tracking-tighter font-heading leading-none">Global EDI <br /> Synchronization.</h2>
                        <p className="text-2xl text-slate-400 font-light leading-relaxed">
                           We eliminate the complexity of trading partner management with redundant, fully-monitored interchange networks.
                        </p>
                     </div>

                     <div className="space-y-6">
                        {[
                           { title: 'EDI for Suppliers', desc: 'Automating upstream procurement and inventory sync.', icon: Truck },
                           { title: 'EDI for Retailers', desc: 'Downstream fulfillment and real-time order ingestion.', icon: ShoppingCart },
                           { title: 'Fully Managed EDI', desc: '24/7 technical oversight and partner onboarding.', icon: Shield }
                        ].map((item, i) => (
                           <div key={i} className="flex items-start space-x-6 p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all cursor-default group">
                              <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                 <item.icon className="w-6 h-6" />
                              </div>
                              <div className="space-y-1">
                                 <h4 className="text-xl font-bold font-heading">{item.title}</h4>
                                 <p className="text-sm text-slate-500 font-light">{item.desc}</p>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>

                  <div className="lg:w-1/2 relative">
                     <div className="relative p-6 bg-white/5 rounded-2xl border border-white/10 shadow-4xl backdrop-blur-sm">
                        <div className="space-y-8">
                           <div className="flex justify-between items-center">
                              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400">Interchange Mirror V4.2</h4>
                              <Activity className="text-green-500 w-5 h-5 animate-pulse" />
                           </div>

                           <div className="flex items-center justify-between">
                              <div className="text-center space-y-4">
                                 <div className="w-16 h-16 bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700 shadow-xl">
                                    <ProcessorIcon className="w-8 h-8 text-slate-400" />
                                 </div>
                                 <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Supplier_Core</span>
                              </div>
                              <div className="flex-1 px-6 relative">
                                 <div className="h-0.5 bg-blue-600/30 w-full relative">
                                    <motion.div
                                       animate={{ left: ['0%', '100%'] }}
                                       transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                       className="absolute -top-1 w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6]"
                                    />
                                 </div>
                              </div>
                              <div className="text-center space-y-4">
                                 <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center shadow-[0_0_40px_rgba(37,99,235,0.4)]">
                                    <Database className="w-8 h-8 text-white" />
                                 </div>
                                 <span className="text-[9px] font-mono text-blue-400 uppercase tracking-widest font-bold">Enterprise_ERP</span>
                              </div>
                           </div>

                           <div className="grid grid-cols-2 gap-4">
                              <div className="p-4 bg-slate-800 rounded-xl border border-slate-700">
                                 <div className="text-[8px] font-mono text-slate-500 mb-2 uppercase">LATENCY_SYNC</div>
                                 <div className="text-lg font-bold font-heading text-blue-400">0.12ms</div>
                              </div>
                              <div className="p-4 bg-slate-800 rounded-xl border border-slate-700">
                                 <div className="text-[8px] font-mono text-slate-500 mb-2 uppercase">UPTIME_SLA</div>
                                 <div className="text-lg font-bold font-heading text-green-400">99.999%</div>
                              </div>
                           </div>

                           <div className="p-4 bg-white/5 border border-white/5 rounded-xl font-mono text-[9px] text-blue-300/50 leading-relaxed">
                              $ INITIALIZING_PARTNER_SYNC...<br />
                              $ ESTABLISHING_AS2_TUNNEL: SECURE<br />
                              $ INGESTING_X12_850_STREAM...<br />
                              $ SUCCESS: SYSTEM_NOMINAL
                           </div>
                        </div>
                     </div>

                     <div className="absolute -bottom-10 -left-10 glass-card p-8 rounded-2xl shadow-4xl border border-white/10 hidden xl:block max-w-xs">
                        <HardDrive className="w-10 h-10 text-blue-600 mb-4" />
                        <p className="text-xs text-slate-400 leading-relaxed font-light">Redundant storage clusters across 4 global regions ensure zero data loss policy.</p>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* 5. FINAL CTA SECTION */}
         <section className="py-48 relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-8 text-center relative z-10">
               <div className="max-w-6xl mx-auto space-y-16">
                  <h2 className="text-5xl md:text-7xl font-medium text-slate-900 tracking-tighter font-heading leading-none">Architect Your <br /> Corporate Shift.</h2>
                  <p className="text-2xl text-slate-500 font-light max-w-3xl mx-auto leading-relaxed">
                     Contact our technical office to schedule a capability audit and strategic roadmap session for your specific sector needs.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
                     <Link to="/contact" className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-black hover:bg-blue-700 transition-all shadow-4xl tracking-widest uppercase text-xs">Book Strategy Session</Link>
                     <Link to="/about" className="px-10 py-5 border-2 border-slate-200 text-slate-900 rounded-2xl font-black hover:bg-slate-900 hover:text-white transition-all shadow-4xl tracking-widest uppercase text-xs">Full Archive</Link>
                  </div>
               </div>
            </div>
            {/* Abstract Background Decoration */}
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[150px] -translate-x-1/2 translate-y-1/2" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[150px] translate-x-1/2 -translate-y-1/2" />
         </section>

      </div>
   );
};

export default Industries;
