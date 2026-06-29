"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { PortfolioProject } from '../types';

export default function PortfolioDetailClient({ project }: { project: PortfolioProject }) {
  return (
    <div className="pt-32 pb-24 bg-white font-light selection:bg-blue-100 selection:text-blue-700 min-h-screen">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        {/* Back Link */}
        <Link href="/portfolios" className="inline-flex items-center space-x-2 text-slate-500 hover:text-blue-600 transition-colors mb-12 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium tracking-wide">Back to Portfolios</span>
        </Link>

        {/* Header Section */}
        <div className="space-y-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-3 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.4em]"
          >
            <span>{project.category} / {project.domain}</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 font-heading tracking-tight"
          >
            {project.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-500 leading-relaxed max-w-3xl"
          >
            Client: <span className="font-medium text-slate-900">{project.client}</span>
          </motion.p>
        </div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden aspect-video shadow-2xl mb-24"
        >
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        </motion.div>

        {/* Project Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-24">
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-3xl font-bold text-slate-900 font-heading">Project Overview</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              {project.fullDescription || project.summary}
            </p>
            
            {project.roadmap && project.roadmap.length > 0 && (
              <div className="mt-16">
                <h2 className="text-3xl font-bold text-slate-900 font-heading mb-10">Implementation Roadmap</h2>
                <div className="space-y-8">
                  {project.roadmap.map((step, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex gap-6"
                    >
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold shrink-0">
                          {index + 1}
                        </div>
                        {index < project.roadmap!.length - 1 && <div className="w-0.5 h-full bg-blue-100 mt-2"></div>}
                      </div>
                      <div className="pb-8">
                        <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest block mb-2">{step.phase}</span>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                        <p className="text-slate-600 leading-relaxed">{step.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar / Metrics */}
          <div className="space-y-12">
            <div>
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6">Key Metrics</h3>
              <div className="space-y-4">
                {project.metrics.map((metric, i) => (
                  <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="text-3xl font-bold text-blue-600 mb-2">{metric.value}</div>
                    <div className="text-sm font-medium text-slate-600">{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech, i) => (
                  <span key={i} className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
