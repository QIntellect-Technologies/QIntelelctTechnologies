
import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  CheckCircle2, 
  ArrowLeft, 
  ChevronRight, 
  Globe, 
  Shield, 
  Zap, 
  Database, 
  BrainCircuit, 
  Radio, 
  RefreshCw,
  Cpu,
  Server,
  Network,
  Lock,
  Code,
  Settings,
  MessageSquare,
  UserCheck,
  Terminal,
  Activity,
  Layers,
  Search,
  Share2,
  HardDrive,
  Cpu as ProcessorIcon
} from 'lucide-react';
import { SERVICES } from '../constants';

// --- SERVICE SPECIFIC VISUALIZATIONS ---

const TechnicalBlueprint = ({ id }: { id: string }) => {
  // 1. ARTIFICIAL INTELLIGENCE
  if (id === 'artificial-intelligence') {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-slate-900 text-white p-6 md:p-8 rounded-2xl shadow-2xl overflow-hidden relative border border-slate-800"
      >
        <div className="absolute top-0 right-0 p-12 opacity-10"><BrainCircuit className="w-64 h-64" /></div>
        <div className="relative z-10 space-y-6">
          <div className="flex items-center space-x-4">
             <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center text-blue-400"><ProcessorIcon className="w-6 h-6" /></div>
             <h3 className="text-2xl font-medium font-heading tracking-tight">Q-Neural Inference Engine</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 bg-slate-800 rounded-2xl border border-slate-700">
               <div className="text-[10px] font-mono text-blue-400 mb-2">MODALITY_INPUT</div>
               <div className="h-2 bg-slate-700 rounded-full overflow-hidden mb-4">
                  <motion.div animate={{ width: ['20%', '80%', '40%'] }} transition={{ duration: 3, repeat: Infinity }} className="h-full bg-blue-500" />
               </div>
               <p className="text-[10px] text-slate-400 font-light">Processing multi-modal enterprise data streams with sub-10ms latency.</p>
            </div>
            <div className="p-5 bg-slate-800 rounded-2xl border border-slate-700">
               <div className="text-[10px] font-mono text-green-400 mb-2">LOGIC_REASONING</div>
               <div className="flex space-x-1 mb-4">
                  {[1,2,3,4,5].map(i => <motion.div key={i} animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1, delay: i*0.2, repeat: Infinity }} className="w-full h-2 bg-green-500 rounded-full" />)}
               </div>
               <p className="text-[10px] text-slate-400 font-light">Proprietary Transformer-based decision nodes for sovereign logic.</p>
            </div>
            <div className="p-5 bg-slate-800 rounded-2xl border border-slate-700">
               <div className="text-[10px] font-mono text-purple-400 mb-2">OUTPUT_SYNC</div>
               <div className="flex items-center justify-center h-2 mb-4">
                  <div className="w-full h-0.5 bg-slate-700 relative">
                     <motion.div animate={{ left: ['0%', '100%'] }} transition={{ duration: 2, repeat: Infinity }} className="absolute -top-1 w-2 h-2 bg-purple-400 rounded-full shadow-[0_0_10px_#a855f7]" />
                  </div>
               </div>
               <p className="text-[10px] text-slate-400 font-light">Synchronizing intelligence across global ERP/CRM endpoints.</p>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // 2. WEB DEVELOPMENT
  if (id === 'web-development') {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="bg-white border-2 border-dashed border-blue-200 p-6 md:p-8 rounded-2xl shadow-xl relative overflow-hidden"
      >
        <div className="relative z-10 space-y-8">
           <div className="flex justify-between items-start">
              <div className="space-y-2">
                 <h3 className="text-2xl font-medium font-heading tracking-tight text-slate-900">Modern Architecture Stack</h3>
                 <p className="text-[10px] font-mono text-blue-600 uppercase tracking-widest">Blueprint_Rev_4.0_Production</p>
              </div>
              <Code className="w-10 h-10 text-blue-600" />
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                 <div className="flex items-center space-x-3 text-xs font-bold text-slate-400 uppercase tracking-widest">
                    <Layers className="w-4 h-4" /> <span>Frontend Resilience</span>
                 </div>
                 <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                    <div className="flex justify-between items-center text-[10px] font-mono"><span>REHYDRATION</span><span className="text-green-600">FAST</span></div>
                    <div className="flex justify-between items-center text-[10px] font-mono"><span>SSR_LATENCY</span><span className="text-green-600">12ms</span></div>
                    <div className="flex justify-between items-center text-[10px] font-mono"><span>EDGE_CACHING</span><span className="text-blue-600">ACTIVE</span></div>
                 </div>
              </div>
              <div className="space-y-4">
                 <div className="flex items-center space-x-3 text-xs font-bold text-slate-400 uppercase tracking-widest">
                    <Share2 className="w-4 h-4" /> <span>API Integrity</span>
                 </div>
                 <div className="p-6 bg-slate-900 text-white rounded-2xl space-y-4">
                    <div className="flex justify-between items-center text-[10px] font-mono text-blue-400"><span>THROUGHPUT</span><span>940req/s</span></div>
                    <div className="flex justify-between items-center text-[10px] font-mono text-blue-400"><span>AUTH_HANDSHAKE</span><span>SECURE</span></div>
                    <div className="flex justify-between items-center text-[10px] font-mono text-blue-400"><span>DATA_MIRROR</span><span>ENABLED</span></div>
                 </div>
              </div>
           </div>
        </div>
      </motion.div>
    );
  }

  // 3. IOT SOLUTIONS
  if (id === 'iot-solutions') {
    return (
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="bg-slate-900 text-white p-8 md:p-10 rounded-3xl shadow-2xl overflow-hidden relative border border-slate-800"
      >
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
           <div className="md:w-1/2 space-y-6">
              <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center text-blue-400"><Radio className="w-6 h-6" /></div>
              <h3 className="text-3xl font-medium font-heading tracking-tight">Mesh Network Topology</h3>
              <p className="text-sm text-slate-400 font-light leading-relaxed">Connecting 10,000+ edge devices with redundant signal paths and self-healing logic.</p>
           </div>
           <div className="md:w-1/2 relative h-48 flex items-center justify-center">
              <div className="w-24 h-24 bg-blue-600/20 rounded-full absolute animate-ping" />
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center relative z-10 shadow-[0_0_30px_#2563eb]">
                 <HardDrive className="w-8 h-8" />
              </div>
              {[0, 60, 120, 180, 240, 300].map(deg => (
                <motion.div 
                  key={deg}
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: deg/100 }}
                  className="absolute w-4 h-4 bg-blue-400 rounded-full"
                  style={{ transform: `rotate(${deg}deg) translate(80px)` }}
                />
              ))}
           </div>
        </div>
      </motion.div>
    );
  }

  // 4. ERP / DYNAMICS 365
  if (id === 'erp-solutions' || id === 'dynamics-365') {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white border border-slate-200 p-8 md:p-10 rounded-3xl shadow-xl relative overflow-hidden"
      >
        <div className="relative z-10 space-y-8">
           <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600 border border-green-100">
                 <Settings className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-medium font-heading tracking-tight text-slate-900">Enterprise Unified Data Plane</h3>
           </div>
           <div className="flex flex-col space-y-4">
              {['Finance & Operations', 'Supply Chain Logic', 'Customer Intelligence', 'Legacy Data Bridge'].map((module, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100 group hover:bg-slate-900 hover:text-white transition-all cursor-pointer"
                >
                   <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-slate-400 group-hover:text-blue-500">{i+1}</div>
                      <span className="text-sm font-bold uppercase tracking-widest">{module}</span>
                   </div>
                   <div className="flex space-x-1">
                      {[1,2,3].map(j => <div key={j} className="w-1 h-1 bg-green-500 rounded-full" />)}
                   </div>
                </motion.div>
              ))}
           </div>
        </div>
      </motion.div>
    );
  }

  // 5. EDI SOLUTIONS
  if (id === 'edi-solutions') {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="bg-slate-900 text-white p-12 rounded-[3.5rem] shadow-2xl overflow-hidden relative border border-slate-800"
      >
        <div className="relative z-10 space-y-10">
           <div className="flex justify-between items-center">
              <h3 className="text-3xl font-medium font-heading tracking-tight">Protocol Interchange Hub</h3>
              <RefreshCw className="w-8 h-8 text-blue-400 animate-spin-slow" />
           </div>
           <div className="flex items-center justify-between">
              <div className="text-center space-y-4">
                 <div className="px-6 py-3 bg-slate-800 rounded-xl border border-slate-700 font-mono text-xs">INTERNAL_XML</div>
                 <div className="w-0.5 h-12 bg-blue-500/30 mx-auto" />
              </div>
              <div className="flex-1 px-8">
                 <div className="p-8 bg-blue-600 rounded-[2.5rem] text-center shadow-[0_0_50px_rgba(37,99,235,0.4)]">
                    <span className="text-xs font-black uppercase tracking-[0.4em]">Translation Engine</span>
                    <div className="mt-4 flex justify-center space-x-2">
                       <div className="w-2 h-2 bg-white rounded-full animate-bounce" />
                       <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-100" />
                       <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-200" />
                    </div>
                 </div>
              </div>
              <div className="text-center space-y-4">
                 <div className="px-6 py-3 bg-slate-800 rounded-xl border border-slate-700 font-mono text-xs">AS2 / X12 / EDIFACT</div>
                 <div className="w-0.5 h-12 bg-blue-500/30 mx-auto" />
              </div>
           </div>
           <div className="text-center text-[10px] font-mono text-slate-500">REAL_TIME_INTERCHANGE_MIRROR_V1.0.4</div>
        </div>
      </motion.div>
    );
  }

  // 6. CHATBOTS / AI REP
  if (id === 'customized-chatbots' || id === 'ai-customer-representative') {
    return (
      <motion.div 
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="bg-white border-2 border-slate-900 p-8 rounded-2xl shadow-xl relative overflow-hidden"
      >
        <div className="relative z-10 space-y-8">
           <div className="flex items-center space-x-6">
              <div className="w-12 h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center"><MessageSquare className="w-6 h-6" /></div>
              <div className="space-y-1">
                 <h3 className="text-2xl font-medium font-heading tracking-tight text-slate-900">Conversational Pipeline</h3>
                 <p className="text-[10px] font-mono text-slate-400">Context_Aware_Loop_v9</p>
              </div>
           </div>
           <div className="space-y-6">
              <div className="flex items-center space-x-4">
                 <div className="px-3 py-1.5 bg-slate-100 rounded-lg text-[10px] font-bold text-slate-500">INPUT</div>
                 <div className="flex-1 h-0.5 bg-slate-100 relative">
                    <motion.div animate={{ left: ['0%', '100%'] }} transition={{ duration: 1.5, repeat: Infinity }} className="absolute -top-1 w-2 h-2 bg-blue-600 rounded-full" />
                 </div>
                 <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-[10px] font-mono">NATURAL_LANGUAGE_INTENT</div>
              </div>
              <div className="flex items-center space-x-4">
                 <div className="px-3 py-1.5 bg-slate-100 rounded-lg text-[10px] font-bold text-slate-500">BRAIN</div>
                 <div className="flex-1 h-0.5 bg-slate-100" />
                 <div className="p-4 bg-blue-600 text-white rounded-xl text-[10px] font-mono shadow-lg">VECTOR_DB_REDUNDANCY</div>
              </div>
              <div className="flex items-center space-x-4">
                 <div className="px-3 py-1.5 bg-slate-100 rounded-lg text-[10px] font-bold text-slate-500">ACTION</div>
                 <div className="flex-1 h-0.5 bg-slate-100" />
                 <div className="p-4 bg-slate-900 text-white rounded-xl text-[10px] font-mono">ERP_CRM_TOOL_CALLING</div>
              </div>
           </div>
        </div>
      </motion.div>
    );
  }

  return <div className="p-8 bg-slate-50 rounded-2xl border border-slate-200 text-slate-400 italic">Visualization Engine Initializing...</div>;
};

// --- MAIN PAGE COMPONENT ---

const ServiceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const service = SERVICES.find(s => s.id === id);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32">
        <div className="text-center space-y-4 font-light">
          <h2 className="text-3xl font-medium">Service Not Found</h2>
          <Link to="/services" className="text-blue-600 font-medium">Back to Services</Link>
        </div>
      </div>
    );
  }

  const techImages: Record<string, string> = {
    'artificial-intelligence': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1932&auto=format&fit=crop',
    'iot-solutions': 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop',
    'edi-solutions': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
    'dynamics-365': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
    'web-development': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop',
    'erp-solutions': 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop',
    'customized-chatbots': 'https://images.unsplash.com/photo-1531746790731-6c087fecd05a?q=80&w=2012&auto=format&fit=crop',
    'ai-customer-representative': 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop'
  };

  const getIcon = (iconName: string) => {
    switch(iconName) {
      case 'BrainCircuit': return <BrainCircuit className="w-5 h-5" />;
      case 'MessageSquare': return <MessageSquare className="w-5 h-5" />;
      case 'UserCheck': return <UserCheck className="w-5 h-5" />;
      case 'Settings': return <Settings className="w-5 h-5" />;
      case 'Code': return <Code className="w-5 h-5" />;
      case 'RefreshCw': return <RefreshCw className="w-5 h-5" />;
      case 'Database': return <Database className="w-5 h-5" />;
      case 'Radio': return <Radio className="w-5 h-5" />;
      default: return <Settings className="w-5 h-5" />;
    }
  };

  return (
    <div ref={containerRef} className="bg-white min-h-screen font-light selection:bg-blue-100 selection:text-blue-700">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-48 pb-32 overflow-hidden bg-slate-50">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white skew-x-12 translate-x-1/3 pointer-events-none" />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <Link to="/services" className="inline-flex items-center text-slate-400 hover:text-blue-600 transition-colors mb-12 font-bold text-[10px] uppercase tracking-[0.3em]">
            <ArrowLeft className="w-4 h-4 mr-3" /> Technical Capability Archive
          </Link>
          <div className="flex flex-col lg:flex-row items-center gap-24">
            <div className="lg:w-1/2 space-y-10">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center space-x-4 px-5 py-2 rounded-full bg-blue-600 text-white shadow-xl shadow-blue-500/20 text-[10px] font-black uppercase tracking-[0.4em]"
              >
                 {getIcon(service.icon)}
                 <span>Sovereign Module: {service.id.toUpperCase()}</span>
              </motion.div>
              <h1 className="text-5xl md:text-[6.5rem] font-medium text-slate-900 font-heading leading-[0.9] tracking-tighter">
                {service.title.split(' (')[0]} <br />
                <span className="text-blue-600">Architectures.</span>
              </h1>
              <p className="text-2xl text-slate-500 leading-relaxed font-light max-w-xl">{service.shortDescription}</p>
              <div className="flex flex-wrap gap-4">
                {service.technologies.map(tech => (
                  <span key={tech} className="px-6 py-3 bg-white border border-slate-200 rounded-2xl text-[10px] font-black text-slate-900 uppercase tracking-widest shadow-sm">{tech}</span>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative p-2"
              >
                <div className="absolute inset-0 bg-blue-600 rounded-3xl rotate-3 opacity-5 -z-10" />
                <img 
                  src={techImages[service.id] || `https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop`} 
                  alt={service.title} 
                  className="rounded-3xl shadow-4xl aspect-[4/3] object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-1000"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CORE SPECIFICATIONS SECTION */}
      <section className="py-48 bg-white">
        <div className="container mx-auto px-4 md:px-8">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
              
              {/* Left Column: Visual Explanation */}
              <div className="lg:col-span-7 space-y-20">
                 <div className="space-y-6">
                    <span className="text-[11px] font-black text-blue-600 uppercase tracking-[0.5em]">The Technical Deep-Dive</span>
                    <h2 className="text-4xl md:text-7xl font-medium text-slate-900 font-heading tracking-tighter leading-tight">System Breakdown <br /> & Architecture.</h2>
                    <p className="text-xl text-slate-500 font-light leading-relaxed">{service.longDescription}</p>
                 </div>

                 {/* Unique Visualization */}
                 <TechnicalBlueprint id={service.id} />

                 <div className="space-y-12">
                    <h3 className="text-3xl font-medium font-heading tracking-tight text-slate-900">Functional Capability Matrix</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                       <div className="space-y-8">
                          <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em]">Integrated Features</h4>
                          <ul className="space-y-6">
                             {service.features.map((feat, i) => (
                               <li key={i} className="flex items-start space-x-4 group cursor-default">
                                  <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                                     <CheckCircle2 className="w-5 h-5" />
                                  </div>
                                  <span className="text-lg text-slate-700 font-light pt-1">{feat}</span>
                               </li>
                             ))}
                          </ul>
                       </div>
                       <div className="space-y-8">
                          <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em]">Key Business Outcomes</h4>
                          <ul className="space-y-6">
                             {service.benefits.map((benefit, i) => (
                               <li key={i} className="flex items-start space-x-4 group cursor-default">
                                  <div className="w-8 h-8 rounded-xl bg-green-50 flex items-center justify-center text-green-600 flex-shrink-0 group-hover:bg-green-600 group-hover:text-white transition-all shadow-sm">
                                     <Zap className="w-5 h-5" />
                                  </div>
                                  <span className="text-lg text-slate-700 font-light pt-1">{benefit}</span>
                               </li>
                             ))}
                          </ul>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Right Column: Technical Stats & CTA */}
              <div className="lg:col-span-5">
                 <div className="sticky top-32 space-y-12">
                    <div className="bg-slate-900 rounded-2xl p-8 text-white shadow-3xl space-y-12 border border-slate-800">
                       <div className="space-y-4">
                          <h3 className="text-2xl font-medium font-heading tracking-tight">Sovereign Metrics</h3>
                          <p className="text-slate-400 font-light leading-relaxed text-sm">Hard-coded reliability standards for {service.title} deployments.</p>
                       </div>
                       
                       <div className="space-y-8">
                          {[
                            { label: 'Uptime Integrity', value: '99.99%' },
                            { label: 'Latency Threshold', value: '< 20ms' },
                            { label: 'Data Encryption', value: 'AES-256' },
                            { label: 'Compliance', value: 'SOC2 / ISO' }
                          ].map(stat => (
                            <div key={stat.label} className="flex justify-between items-end border-b border-slate-800 pb-4">
                               <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</span>
                               <span className="text-xl font-medium text-blue-400 font-heading">{stat.value}</span>
                            </div>
                          ))}
                       </div>

                       <div className="space-y-6">
                          <p className="text-[10px] font-mono text-blue-500 uppercase tracking-[0.3em] text-center">SYSTEM_READY_FOR_DEPLOYMENT</p>
                          <Link to="/contact" className="block w-full py-5 bg-blue-600 text-white rounded-xl text-center text-[11px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-2xl">
                             Request Prototype Architecture
                          </Link>
                       </div>
                    </div>

                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="p-8 glass-card rounded-2xl border border-slate-100 flex flex-col items-center text-center space-y-6"
                    >
                       <Shield className="w-10 h-10 text-blue-600" />
                       <h5 className="text-xl font-medium text-slate-900 font-heading">Zero-Risk Implementation</h5>
                       <p className="text-xs text-slate-500 font-light leading-relaxed uppercase tracking-widest">Global Support | 24/7 Monitoring | Atomic Rollbacks</p>
                    </motion.div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* 3. IMPLEMENTATION LIFECYCLE (DETAILED STEPS) */}
      <section className="py-48 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, #3b82f6 1px, transparent 1px), linear-gradient(to bottom, #3b82f6 1px, transparent 1px)', backgroundSize: '150px 150px' }} />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
           <div className="max-w-4xl mb-40 space-y-10">
              <span className="text-[11px] font-black text-blue-400 uppercase tracking-[0.6em]">Engineering Roadmap</span>
              <h2 className="text-5xl md:text-[8.5rem] font-medium tracking-tighter font-heading leading-[0.85]">The Deployment <br /> <span className="text-blue-500">Lifecycle.</span></h2>
              <p className="text-2xl text-slate-400 font-light leading-relaxed max-w-2xl">A rigorous, four-phase engineering strategy built to ensure zero business disruption during modernization.</p>
           </div>

           <div className="grid grid-cols-1 gap-32">
              {service.implementationSteps.map((step, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col md:flex-row gap-16 md:gap-32 items-start relative group"
                >
                   {/* Step Number Badge */}
                   <div className="flex-shrink-0">
                      <div className="w-24 h-24 rounded-[2rem] bg-blue-600 text-white flex items-center justify-center font-black text-2xl shadow-2xl group-hover:scale-110 transition-transform">
                         0{i+1}
                      </div>
                   </div>

                   <div className="md:w-1/2 space-y-8">
                      <h3 className="text-4xl md:text-6xl font-medium font-heading tracking-tighter">{step.title}</h3>
                      <p className="text-xl text-slate-400 font-light leading-relaxed">{step.description}</p>
                   </div>
                   
                   <div className="md:w-1/2 w-full">
                      <div className="grid grid-cols-1 gap-4">
                         {step.details.map((detail, idx) => (
                           <div key={idx} className="p-8 bg-white/5 rounded-3xl border border-white/10 flex items-center justify-between group/detail hover:bg-white/10 transition-all">
                              <span className="text-sm font-medium tracking-tight text-slate-300">{detail}</span>
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                           </div>
                         ))}
                      </div>
                   </div>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* 4. DEEP ARCHITECTURE (IF APPLICABLE) */}
      {service.deepTechnicalDetail && (
        <section className="py-48 bg-white border-b border-slate-100">
           <div className="container mx-auto px-4 md:px-8">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-slate-50 rounded-[5rem] p-16 md:p-32 flex flex-col md:flex-row gap-24 items-center border border-slate-200"
              >
                 <div className="md:w-1/3">
                    <Terminal className="w-20 h-20 text-blue-600 mb-10" />
                    <h3 className="text-4xl font-medium font-heading tracking-tighter mb-6">Proprietary <br /> Engine Logic.</h3>
                    <div className="h-1 w-20 bg-blue-600" />
                 </div>
                 <div className="md:w-2/3">
                    <p className="text-3xl text-slate-900 font-light leading-snug tracking-tight">
                       {service.deepTechnicalDetail}
                    </p>
                 </div>
              </motion.div>
           </div>
        </section>
      )}

      {/* 5. FINAL CTA SECTION */}
      <section className="py-48 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 text-center relative z-10">
           <div className="max-w-5xl mx-auto space-y-20">
              <h2 className="text-5xl md:text-9xl font-medium text-slate-900 tracking-tighter font-heading leading-none">Modernize Your <br /> Logic Now.</h2>
              <p className="text-2xl text-slate-500 font-light leading-relaxed max-w-3xl mx-auto">Contact our technical office to schedule a full-scale capability audit and roadmap session for your {service.title} needs.</p>
              <div className="flex flex-wrap justify-center gap-10">
                 <Link to="/contact" className="px-20 py-10 bg-blue-600 text-white rounded-[3rem] font-black text-xs uppercase tracking-[0.3em] hover:bg-blue-700 transition-all shadow-4xl">Book Technical Audit</Link>
                 <Link to="/services" className="px-20 py-10 bg-slate-900 text-white rounded-[3rem] font-black text-xs uppercase tracking-[0.3em] hover:bg-slate-800 transition-all shadow-4xl">Explore Archive</Link>
              </div>
           </div>
        </div>
        {/* Abstract Background Elements */}
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px] -translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />
      </section>
      
    </div>
  );
};

export default ServiceDetail;
