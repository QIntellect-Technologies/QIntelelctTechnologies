
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { PORTFOLIO_PROJECTS } from '../constants';
import { 
  ExternalLink, 
  Layers, 
  Target, 
  Terminal, 
  ChevronRight, 
  Shield, 
  Zap, 
  ArrowRight,
  Cpu,
  Database,
  RefreshCw,
  Code,
  MessageSquare,
  Settings
} from 'lucide-react';

const Portfolios: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'All' | 'AI' | 'Chatbot' | 'ERP' | 'EDI' | 'Web' | 'Dynamics'>('All');
  
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  const categories = ['All', 'AI', 'Chatbot', 'ERP', 'EDI', 'Web', 'Dynamics'] as const;

  const filteredProjects = activeCategory === 'All' 
    ? PORTFOLIO_PROJECTS 
    : PORTFOLIO_PROJECTS.filter(p => p.category === activeCategory);

  const getIcon = (category: string) => {
    switch(category) {
      case 'AI': return <BrainCircuit className="w-5 h-5" />;
      case 'Chatbot': return <MessageSquare className="w-5 h-5" />;
      case 'ERP': return <Database className="w-5 h-5" />;
      case 'EDI': return <RefreshCw className="w-5 h-5" />;
      case 'Web': return <Code className="w-5 h-5" />;
      case 'Dynamics': return <Settings className="w-5 h-5" />;
      default: return <Layers className="w-5 h-5" />;
    }
  };

  return (
    <div ref={containerRef} className="pt-48 pb-24 bg-white font-light selection:bg-blue-100 selection:text-blue-700">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Header Section */}
        <div className="max-w-4xl mb-32 space-y-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center space-x-3 px-4 py-1.5 rounded-full bg-blue-600/10 border border-blue-600/20 text-blue-600 text-[10px] font-black uppercase tracking-[0.4em]"
          >
            <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span>Architectural Record v5.0</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-medium text-slate-900 font-heading leading-[0.85] tracking-tighter"
          >
            Global <br /> <span className="text-blue-600">Deployments.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl text-slate-500 leading-relaxed font-light max-w-2xl"
          >
            A high-fidelity archive of enterprise-scale systems. Each project represents a sovereign technical breakthrough in its respective domain.
          </motion.p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                activeCategory === cat 
                ? 'bg-blue-600 text-white border-blue-600 shadow-xl shadow-blue-500/20' 
                : 'bg-transparent text-slate-400 border-slate-100 hover:border-blue-200 hover:text-blue-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, delay: (i % 2) * 0.1 }}
                className="group flex flex-col space-y-8"
              >
                {/* Visual Frame with Parallax-ish Hover */}
                <div className="relative rounded-2xl overflow-hidden aspect-[16/10] shadow-3xl bg-slate-900 border border-slate-100">
                   <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-blue-900/10 pointer-events-none" />
                  
                  {/* Floating Tech Tag */}
                  <div className="absolute top-6 left-6 p-4 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/60 flex items-center space-x-4">
                     <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                        {getIcon(project.category)}
                     </div>
                     <div className="flex flex-col">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Architectural Domain</span>
                        <span className="text-xs font-bold text-slate-900">{project.domain}</span>
                     </div>
                  </div>

                  {/* Metrics Badge */}
                  <div className="absolute bottom-6 right-6 flex space-x-4">
                     {project.metrics.map((m, idx) => (
                       <div key={idx} className="p-4 bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-white/10 text-white shadow-xl">
                          <div className="text-2xl font-heading font-medium tracking-tighter text-blue-400">{m.value}</div>
                          <div className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-400 mt-1">{m.label}</div>
                       </div>
                     ))}
                  </div>
                </div>

                {/* Content Area */}
                <div className="px-6 space-y-8">
                   <div className="flex justify-between items-start">
                      <div className="space-y-3">
                         <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.5em]">{project.client}</span>
                         <h2 className="text-3xl md:text-4xl font-medium text-slate-900 font-heading tracking-tighter leading-none">{project.title}</h2>
                      </div>
                      <button className="w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-sm">
                         <ExternalLink className="w-5 h-5" />
                      </button>
                   </div>

                   <p className="text-lg text-slate-500 font-light leading-relaxed max-w-2xl">
                     {project.summary}
                   </p>

                   <div className="flex flex-wrap gap-3 pt-2">
                      {project.stack.map(s => (
                        <div key={s} className="px-4 py-1.5 bg-slate-50 rounded-lg text-[9px] font-black text-slate-400 uppercase tracking-widest border border-slate-100 flex items-center">
                           <Terminal className="w-3 h-3 mr-2 text-blue-600" />
                           {s}
                        </div>
                      ))}
                   </div>

                   <div className="pt-6 border-t border-slate-100">
                      <button className="inline-flex items-center text-[10px] font-black uppercase tracking-[0.4em] text-slate-900 hover:text-blue-600 transition-colors">
                        View System Blueprint <ChevronRight className="w-4 h-4 ml-3" />
                      </button>
                   </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom CTA Section */}
        <section className="mt-48 py-24 bg-slate-900 rounded-3xl text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[200px] -translate-y-1/2 translate-x-1/2" />
           <div className="container mx-auto px-4 text-center relative z-10 space-y-16">
              <h2 className="text-5xl md:text-8xl font-medium tracking-tighter font-heading leading-tight">Start Your <br /> <span className="text-blue-500">Succession.</span></h2>
              <p className="text-2xl text-slate-400 font-light max-w-2xl mx-auto">
                Join the ranks of the global intelligence leaders. Architect your enterprise roadmap with our lead systems consultants.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-10 pt-8">
                 <button className="px-10 py-5 bg-blue-600 text-white rounded-3xl font-black hover:bg-blue-700 transition-all shadow-4xl tracking-widest uppercase text-xs">Request Strategy Session</button>
                 <button className="px-10 py-5 border-2 border-white/10 text-white rounded-3xl font-black hover:bg-white hover:text-slate-900 transition-all tracking-widest uppercase text-xs">Technical Docs</button>
              </div>
           </div>
        </section>
      </div>
    </div>
  );
};

export default Portfolios;

// Helper component for local use if not in constants
const BrainCircuit = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .52 5.886 3 3 0 1 0 5.988.216" />
    <path d="M9 13a4.5 4.5 0 0 0 3-4" />
    <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
    <path d="M3.477 10.896a4 4 0 0 1 .52-5.77" />
    <path d="M6.001 20a3 3 0 0 1-5.988-.216" />
    <path d="M12 19a3 3 0 1 1 5.997-.125 4 4 0 0 1 2.526-5.77 4 4 0 0 1-.52-5.886 3 3 0 1 1-5.988-.216" />
    <path d="M15 11a4.5 4.5 0 0 1-3 4" />
    <path d="M17.997 18.875a3 3 0 0 1-.398-1.375" />
    <path d="M20.523 13.104a4 4 0 0 0-.52 5.77" />
    <path d="M17.999 4a3 3 0 0 0 5.988.216" />
  </svg>
);
