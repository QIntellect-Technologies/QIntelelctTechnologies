
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BLOGS } from '../constants';
import { 
  Calendar, 
  User, 
  Clock, 
  ArrowLeft, 
  Share2, 
  ChevronRight, 
  Tag, 
  Mail, 
  TrendingUp,
  Cpu,
  Layers,
  ArrowRight,
  Bookmark,
  Terminal,
  Info,
  ShieldCheck,
  Zap,
  Activity,
  Download
} from 'lucide-react';

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const post = BLOGS.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32 text-center">
        <div className="space-y-6">
          <Info className="w-16 h-16 text-slate-200 mx-auto" />
          <h2 className="text-3xl font-medium font-heading">Logic Stream Not Found</h2>
          <Link to="/blog" className="inline-block px-8 py-3 bg-blue-600 text-white rounded-xl text-sm font-bold">Back to Archive</Link>
        </div>
      </div>
    );
  }

  const recentPosts = BLOGS.filter(p => p.id !== post.id).slice(0, 3);

  return (
    <div className="bg-white min-h-screen font-light selection:bg-blue-100 selection:text-blue-700">
      
      {/* 1. HERO HEADER */}
      <section className="relative pt-48 pb-32 overflow-hidden bg-slate-50">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white skew-x-12 translate-x-1/4 pointer-events-none" />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <Link to="/blog" className="inline-flex items-center text-slate-400 hover:text-blue-600 transition-colors mb-12 font-bold text-[10px] uppercase tracking-[0.4em]">
              <ArrowLeft className="w-4 h-4 mr-3" /> Technical Capability Archive
            </Link>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-12"
            >
              <div className="inline-flex items-center space-x-4 px-5 py-2 rounded-full bg-blue-600 text-white shadow-xl shadow-blue-500/20 text-[10px] font-black uppercase tracking-[0.4em]">
                 <Activity className="w-3.5 h-3.5" />
                 <span>{post.category.toUpperCase()} SECTOR</span>
              </div>
              
              <h1 className="text-5xl md:text-[6.5rem] font-medium text-slate-900 font-heading leading-[0.9] tracking-tighter">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-12 pt-12 border-t border-slate-200">
                <div className="flex items-center space-x-6">
                  <div className="w-16 h-16 rounded-2xl bg-slate-200 overflow-hidden ring-4 ring-white shadow-lg">
                    <img src={post.authorImage} className="w-full h-full object-cover" alt={post.author} />
                  </div>
                  <div>
                    <div className="text-sm font-black uppercase tracking-widest text-slate-900">{post.author}</div>
                    <div className="text-[10px] text-blue-600 uppercase tracking-widest font-black">{post.authorRole}</div>
                  </div>
                </div>
                <div className="h-10 w-px bg-slate-200 hidden md:block" />
                <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">
                  <Calendar className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. MAIN PUBLICATION AREA */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
            
            {/* Left Column: Long Form Article */}
            <div className="lg:col-span-8">
              <div className="relative rounded-2xl overflow-hidden shadow-4xl mb-16 border-4 border-white group">
                <img src={post.image} className="w-full aspect-video object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000" alt={post.title} />
                <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition-all" />
              </div>

              <div className="space-y-20 max-w-4xl mx-auto">
                {post.sections.map((section, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-10"
                  >
                    {section.heading && (
                      <h2 className="text-4xl md:text-5xl font-medium font-heading tracking-tighter text-slate-900 leading-tight border-l-4 border-blue-600 pl-8">
                        {section.heading}
                      </h2>
                    )}
                    
                    <div className="space-y-8">
                      {section.content.map((para, pIdx) => (
                        <p key={pIdx} className={`text-xl md:text-2xl text-slate-600 leading-relaxed font-light ${i === 0 && pIdx === 0 ? 'first-letter:text-8xl first-letter:font-heading first-letter:text-blue-600 first-letter:mr-4 first-letter:float-left first-letter:leading-none' : ''}`}>
                          {para}
                        </p>
                      ))}
                    </div>

                    {section.code && (
                      <div className="rounded-2xl bg-slate-900 p-8 font-mono text-sm text-blue-300 shadow-2xl relative overflow-hidden group">
                        <Terminal className="absolute top-6 right-6 w-6 h-6 text-slate-800" />
                        <pre className="overflow-x-auto">
                          <code>{section.code}</code>
                        </pre>
                        <div className="mt-6 flex items-center space-x-3 text-[9px] font-black text-slate-600 uppercase tracking-widest">
                           <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                           <span>Verified System Logic Pack</span>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Tags & Metadata Footer */}
              <div className="mt-32 pt-20 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-10">
                <div className="flex flex-wrap gap-4">
                  {post.tags.map(tag => (
                    <span key={tag} className="px-6 py-2.5 bg-slate-50 border border-slate-100 rounded-full text-[9px] font-black uppercase tracking-widest text-slate-500 flex items-center hover:bg-white hover:border-blue-200 transition-all cursor-default">
                      <Tag className="w-3.5 h-3.5 mr-2 text-blue-600" /> {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center space-x-8">
                  <button className="flex items-center space-x-3 text-[10px] font-black uppercase tracking-widest text-slate-900 hover:text-blue-600 transition-colors">
                    <Share2 className="w-4 h-4" />
                    <span>Distribute Logic</span>
                  </button>
                  <button className="flex items-center space-x-3 text-[10px] font-black uppercase tracking-widest text-slate-900 hover:text-blue-600 transition-colors">
                    <Bookmark className="w-4 h-4" />
                    <span>Archive Insight</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Sticky Technical Sidebar */}
            <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-16">
              
              {/* Technical Specifications List */}
              {post.technicalSpecs && (
                <div className="bg-slate-900 rounded-2xl p-8 text-white space-y-10 shadow-3xl border border-slate-800 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-[50px] translate-x-1/2 -translate-y-1/2" />
                  <div className="space-y-3 relative z-10">
                    <h3 className="text-2xl font-medium font-heading tracking-tight">Technical Specs</h3>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Logic Pack Verification</p>
                  </div>
                  <div className="space-y-6 relative z-10">
                    {post.technicalSpecs.map(spec => (
                      <div key={spec.label} className="flex justify-between items-end border-b border-slate-800 pb-4 group cursor-default">
                         <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest group-hover:text-slate-400 transition-colors">{spec.label}</span>
                         <span className="text-xl font-medium text-blue-400 font-heading">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                  <button className="w-full py-5 bg-white/5 border border-white/10 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] flex items-center justify-center space-x-3 hover:bg-white hover:text-slate-900 transition-all">
                     <Download className="w-4 h-4" />
                     <span>Download Protocol Docs</span>
                  </button>
                </div>
              )}

              {/* Gallery Section */}
              <div className="space-y-8 p-10 bg-slate-50 rounded-2xl border border-slate-100">
                 <div className="flex items-center justify-between">
                    <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em]">Domain Artifacts</h4>
                    <Layers className="w-4 h-4 text-slate-300" />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    {post.galleryImages.map((img, i) => (
                      <motion.div 
                        key={i} 
                        whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 2 : -2 }}
                        className="group aspect-square rounded-2xl overflow-hidden border border-white shadow-lg cursor-zoom-in bg-slate-200"
                      >
                         <img src={img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Gallery asset" />
                      </motion.div>
                    ))}
                    <div className="aspect-square rounded-2xl bg-white border border-dashed border-slate-200 flex flex-col items-center justify-center text-center p-6 space-y-3 group cursor-pointer hover:border-blue-300 transition-all">
                       <Zap className="w-5 h-5 text-blue-600 group-hover:animate-pulse" />
                       <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Full Blueprint Pack</span>
                    </div>
                 </div>
              </div>

              {/* Related Insights */}
              <div className="space-y-10 pt-8">
                <div className="flex items-center justify-between">
                  <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em]">Next Intelligence</h4>
                  <TrendingUp className="w-4 h-4 text-slate-300" />
                </div>
                <div className="space-y-8">
                  {recentPosts.map(p => (
                    <Link key={p.id} to={`/blog/${p.id}`} className="group block space-y-4">
                      <div className="flex items-center space-x-6 p-4 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all">
                        <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 border border-slate-200 shadow-md">
                          <img src={p.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={p.title} />
                        </div>
                        <div className="space-y-1">
                          <div className="text-[8px] font-black text-blue-600 uppercase tracking-widest">{p.category}</div>
                          <h5 className="text-sm font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">{p.title}</h5>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter Callout */}
              <div className="p-8 glass-card rounded-2xl border border-slate-100 text-center space-y-8 relative overflow-hidden group">
                <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                <div className="relative z-10">
                   <Mail className="w-10 h-10 text-blue-600 group-hover:text-white mx-auto mb-6 transition-colors" />
                   <div className="space-y-4">
                     <h4 className="text-xl font-medium font-heading text-slate-900 group-hover:text-white transition-colors">Strategic Feed</h4>
                     <p className="text-[10px] text-slate-500 group-hover:text-blue-100 font-bold uppercase tracking-widest transition-colors">High-fidelity analysis for CTOs.</p>
                   </div>
                   <button className="w-full py-4 bg-slate-900 text-white group-hover:bg-white group-hover:text-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest mt-10 transition-all shadow-xl">
                     Synchronize Now
                   </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 3. FOOTER CTA */}
      <section className="py-48 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, #3b82f6 1px, transparent 1px), linear-gradient(to bottom, #3b82f6 1px, transparent 1px)', backgroundSize: '150px 150px' }} />
        <div className="container mx-auto px-4 md:px-8 text-center relative z-10">
           <div className="max-w-5xl mx-auto space-y-16">
              <h2 className="text-5xl md:text-[9rem] font-medium tracking-tighter font-heading leading-none">Modernize Your <br /> <span className="text-blue-500">Corporate Logic.</span></h2>
              <p className="text-2xl text-slate-400 font-light leading-relaxed max-w-2xl mx-auto">Contact our technical office to schedule a capability audit session based on these architectural insights.</p>
              <div className="flex flex-wrap justify-center gap-6">
                 <Link to="/contact" className="px-12 py-6 bg-blue-600 text-white rounded-xl font-black text-[11px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-4xl">Book Technical Audit</Link>
                 <Link to="/services" className="px-12 py-6 border-2 border-slate-700 text-white rounded-xl font-black text-[11px] uppercase tracking-widest hover:bg-slate-800 transition-all shadow-4xl">Full Capability Archive</Link>
              </div>
           </div>
        </div>
      </section>
      
    </div>
  );
};

export default BlogDetail;
