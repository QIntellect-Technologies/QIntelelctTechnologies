
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Zap, Target, Layers, BarChart, Code, BrainCircuit, MessageSquare, UserCheck, Settings, Database, RefreshCw, Radio } from 'lucide-react';
import { SERVICES } from '../constants';

const Services: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch(iconName) {
      case 'BrainCircuit': return <BrainCircuit className="w-8 h-8" />;
      case 'MessageSquare': return <MessageSquare className="w-8 h-8" />;
      case 'UserCheck': return <UserCheck className="w-8 h-8" />;
      case 'Settings': return <Settings className="w-8 h-8" />;
      case 'Code': return <Code className="w-8 h-8" />;
      case 'RefreshCw': return <RefreshCw className="w-8 h-8" />;
      case 'Database': return <Database className="w-8 h-8" />;
      case 'Radio': return <Radio className="w-8 h-8" />;
      default: return <Settings className="w-8 h-8" />;
    }
  };

  return (
    <div className="pt-48 pb-24 bg-white font-light selection:bg-blue-100 selection:text-blue-700">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Header Section */}
        <div className="max-w-4xl mb-32 space-y-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center space-x-3 px-4 py-1.5 rounded-full bg-blue-600/10 border border-blue-600/20 text-blue-600 text-[10px] font-black uppercase tracking-[0.4em]"
          >
            <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span>Capability Archive v4.2</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-[7rem] font-medium text-slate-900 font-heading leading-[0.9] tracking-tighter"
          >
            Enterprise-Grade <br /> <span className="text-blue-600">Specializations.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl text-slate-500 leading-relaxed font-light max-w-2xl"
          >
            From sovereign AI logic to global industrial mesh networks, we engineer the technical foundation of the future enterprise.
          </motion.p>
        </div>

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
