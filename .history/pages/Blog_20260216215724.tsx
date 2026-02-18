
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BLOGS } from '../constants';
import { Calendar, User, Clock, ChevronRight, Search, Filter, Tag, Layers } from 'lucide-react';

const Blog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(BLOGS.map(blog => blog.category))];

  const filteredBlogs = BLOGS.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
            <span>Technical Insights v5.0</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-medium text-slate-900 font-heading leading-[0.9] tracking-tighter"
          >
            The Engineering <br /> <span className="text-blue-600">Archive.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-500 leading-relaxed font-light max-w-2xl"
          >
            A curated record of architectural patterns, strategic blueprints, and high-fidelity research into the future of enterprise logic.
          </motion.p>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-8 mb-20 items-center justify-between sticky top-24 z-30 py-4 bg-white/80 backdrop-blur-xl">
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-blue-600 transition-colors" />
            <input 
              type="text" 
              placeholder="Query the archive..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-16 pr-8 py-3.5 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all text-sm font-medium"
            />
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                  selectedCategory === cat 
                  ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20' 
                  : 'bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode='popLayout'>
            {filteredBlogs.map((post, i) => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 30 }}
                transition={{ duration: 0.6, delay: (i % 6) * 0.05 }}
                className="group flex flex-col h-full bg-white glass-card rounded-2xl border border-slate-100 overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-700"
              >
                <Link to={`/blog/${post.id}`} className="block h-48 overflow-hidden relative">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-[8px] font-black uppercase tracking-widest shadow-xl">
                    {post.category}
                  </div>
                  <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition-all pointer-events-none" />
                </Link>

                <div className="p-6 flex flex-col flex-grow space-y-6">
                  <div className="flex items-center space-x-4 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-3 h-3" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-medium text-slate-900 font-heading tracking-tight leading-snug group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-slate-500 text-xs font-light leading-relaxed flex-grow line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                     {post.tags.slice(0, 2).map(tag => (
                       <span key={tag} className="text-[8px] font-black uppercase tracking-widest text-slate-400 flex items-center bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
                         <Tag className="w-2 h-2 mr-1.5 text-blue-600" /> {tag}
                       </span>
                     ))}
                  </div>

                  <Link 
                    to={`/blog/${post.id}`} 
                    className="inline-flex items-center justify-between w-full py-3 px-5 rounded-xl bg-slate-900 text-white hover:bg-blue-600 transition-all font-black text-[9px] uppercase tracking-widest relative z-10 shadow-2xl mt-2"
                  >
                    Open Blueprint
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredBlogs.length === 0 && (
          <div className="py-48 text-center space-y-6">
            <Search className="w-16 h-16 text-slate-200 mx-auto" />
            <h3 className="text-2xl font-medium text-slate-400 font-heading uppercase tracking-widest">Logic Stream Not Found</h3>
            <button 
              onClick={() => {setSearchTerm(''); setSelectedCategory('All');}}
              className="text-blue-600 font-black text-[10px] uppercase tracking-widest border-b border-blue-600 pb-1"
            >
              Reset Logic Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
