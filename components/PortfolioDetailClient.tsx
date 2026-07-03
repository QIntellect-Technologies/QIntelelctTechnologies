"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  CheckCircle,
  ExternalLink,
  Target,
  Layers,
  Code,
  Zap,
  Shield,
  Camera,
  Wifi,
  MapPin,
  Clock,
  Bell,
  MessageCircle,
  Users,
  Database
} from 'lucide-react';
import Link from 'next/link';
import { PortfolioProject } from '../types';

// Map emoji/string icons to Lucide for the feature cards
const iconMap: Record<string, React.ElementType> = {
  // AI Attendance
  '🎯': Target,
  '☁️': Database,
  '📍': MapPin,
  '📊': Layers,
  '🤖': MessageCircle,
  '📶': Wifi,
  '⏱️': Clock,
  '🚨': Bell,
  '📷': Camera,
  // Swift Sales
  '🌐': Users,
  '📦': Database,
  '🔒': Shield,
  // Johana Restaurant
  '💬': MessageCircle,
  '🖱️': Target,
  '🌍': Users,
  '🧾': Code,
  '💳': Zap,
  '🍽️': Clock,
};

const getFeatureIcon = (emoji: string) => {
  const Icon = iconMap[emoji] || Shield;
  return Icon;
};

// Images to cycle through per roadmap step (generic professional images)
const roadmapImages = [
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop',
];

export default function PortfolioDetailClient({ project }: { project: PortfolioProject }) {
  const [activeStep, setActiveStep] = useState(0);

  // Auto-rotate roadmap steps
  useEffect(() => {
    if (!project.roadmap || project.roadmap.length === 0) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % project.roadmap!.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [project.roadmap]);

  return (
    <div className="bg-white min-h-screen font-light selection:bg-blue-100 selection:text-blue-700">

      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-no-repeat"
          style={{ backgroundImage: 'url("/images/cover-image.jpg")', backgroundSize: '100% auto', backgroundPosition: 'center center' }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/95 via-slate-900/90 to-slate-800/85" />
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.2) 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }} />
          </div>
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center pt-32 pb-16">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center space-x-2 mb-8"
          >
            <Link href="/" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">Home</Link>
            <ChevronRight className="w-4 h-4 text-slate-500" />
            <Link href="/portfolios" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">Portfolio</Link>
            <ChevronRight className="w-4 h-4 text-slate-500" />
            <span className="text-blue-400 text-sm font-medium">{project.title}</span>
          </motion.nav>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center space-x-3 px-5 py-2.5 bg-blue-500/20 backdrop-blur-md border border-blue-400/30 rounded-full mb-8"
          >
            <div className="w-2.5 h-2.5 bg-blue-400 rounded-full animate-pulse" />
            <span className="text-white/95 text-sm font-medium uppercase tracking-wider">
              {project.category} / {project.domain}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 font-heading"
          >
            {project.title}
          </motion.h1>

          {/* Summary */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10 font-light"
          >
            {project.summary}
          </motion.p>

          {/* Stats Row */}
          {project.metrics.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap justify-center gap-8 md:gap-16 mb-10"
            >
              {project.metrics.slice(0, 3).map((metric, i) => (
                <React.Fragment key={i}>
                  <div className="text-center">
                    <div className="text-3xl md:text-5xl font-bold text-white mb-2">{metric.value}</div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider font-medium">{metric.label}</div>
                  </div>
                  {i < Math.min(2, project.metrics.length - 1) && (
                    <div className="w-px bg-slate-600/50" />
                  )}
                </React.Fragment>
              ))}
            </motion.div>
          )}

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              href="/contact"
              className="group px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/25 flex items-center gap-2"
            >
              Get This System <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/portfolios"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-xl font-semibold hover:bg-white/20 transition-all flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" /> Back to Portfolio
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/50 rounded-full" />
          </div>
        </motion.div>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ===== OVERVIEW SECTION ===== */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img
                  loading="lazy"
                  src={project.image}
                  alt={project.title}
                  className="w-full h-[500px] object-cover"
                />
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
                className="absolute -bottom-8 -right-8 bg-blue-600 text-white p-6 rounded-2xl shadow-xl"
              >
                <div className="text-4xl font-bold">∞</div>
                <div className="text-blue-100 text-sm mt-1">Continuous Uptime</div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider rounded-full">
                Understanding {project.title}
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-heading">
                {project.title}
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                {project.fullDescription || project.summary}
              </p>
              <div className="pt-2">
                <p className="text-sm text-slate-500 mb-3 font-medium uppercase tracking-wider">Technologies Used</p>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech, i) => (
                    <span key={i} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== KEY FEATURES — SERVICE CARD STYLE ===== */}
      {project.features && project.features.length > 0 && (
        <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
          <div className="container mx-auto px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider rounded-full mb-6">
                What You Get
              </span>
              <h2 className="text-4xl md:text-6xl font-bold text-slate-900 font-heading mb-6">
                Key <span className="text-blue-600">Features</span>
              </h2>
              <p className="text-xl text-slate-500 max-w-2xl mx-auto">
                Everything this system delivers — fully automated, out of the box
              </p>
            </motion.div>

            {/* SERVICE CARD GRID — exact same format as ServicesClient */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {project.features.map((feature, i) => {
                const Icon = getFeatureIcon(feature.icon);
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -10 }}
                    className="group relative bg-white rounded-3xl border border-slate-100 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col"
                  >
                    {/* Card Top Gradient */}
                    <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    {/* Background Shape */}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-50 to-transparent rounded-bl-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700" />

                    <div className="relative p-8 flex flex-col flex-1">
                      {/* Icon */}
                      <motion.div
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/25 group-hover:shadow-xl group-hover:shadow-blue-500/40 transition-all"
                      >
                        <Icon className="w-8 h-8" />
                      </motion.div>

                      {/* Title */}
                      <h3 className="text-2xl font-bold text-slate-900 mb-4 font-heading tracking-tight group-hover:text-blue-600 transition-colors">
                        {feature.title}
                      </h3>

                      {/* Description as subtitle */}
                      <p className="text-slate-500 leading-relaxed mb-6 flex-1">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ===== HARDWARE OPTIONS ===== */}
      {project.hardwareOptions && project.hardwareOptions.length > 0 && (
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider rounded-full mb-6">
                Flexible Deployment
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-heading mb-6">
                Choose Your <span className="text-blue-600">Hardware</span> Option
              </h2>
              <p className="text-xl text-slate-500 max-w-3xl mx-auto">
                Whether you need enterprise-grade infrastructure or a budget-friendly setup, we have you covered
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {project.hardwareOptions.map((option, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className={`group relative rounded-3xl border-2 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col ${
                    option.recommended
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-100 bg-white'
                  }`}
                >
                  {option.recommended && (
                    <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 to-blue-600" />
                  )}
                  <div className="relative p-8 flex flex-col flex-1">
                    {option.recommended && (
                      <span className="inline-block mb-4 px-3 py-1 bg-blue-600 text-white text-xs font-black uppercase tracking-widest rounded-full self-start">
                        Recommended
                      </span>
                    )}
                    <motion.div
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg transition-all ${
                        option.recommended
                          ? 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-blue-500/25'
                          : 'bg-gradient-to-br from-slate-500 to-slate-600 shadow-slate-500/25'
                      }`}
                    >
                      <Camera className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className={`text-2xl font-bold mb-4 font-heading tracking-tight group-hover:text-blue-600 transition-colors ${
                      option.recommended ? 'text-blue-900' : 'text-slate-900'
                    }`}>
                      {option.name}
                    </h3>
                    <p className="text-slate-500 leading-relaxed flex-1">
                      {option.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== ROADMAP — EXACT SERVICES PAGE STEPS + IMAGE SLIDER PATTERN ===== */}
      {project.roadmap && project.roadmap.length > 0 && (
        <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
          <div className="container mx-auto px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider rounded-full mb-6">
                How We Work
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-heading mb-6">
                {project.roadmap.length} <span className="text-blue-600">Simple</span> Steps
              </h2>
              <p className="text-xl text-slate-500 max-w-2xl mx-auto">
                Easy process from start to finish
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left — Clickable Steps */}
              <div className="space-y-6">
                {project.roadmap.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    onMouseEnter={() => setActiveStep(i)}
                    onClick={() => setActiveStep(i)}
                    className={`group p-6 rounded-2xl border-2 transition-all duration-500 cursor-pointer ${
                      activeStep === i
                        ? 'bg-blue-50 border-blue-500 shadow-xl'
                        : 'bg-white border-slate-100 hover:border-blue-200'
                    }`}
                  >
                    <div className="flex items-start gap-5">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all flex-shrink-0 ${
                        activeStep === i
                          ? 'bg-blue-500 shadow-lg shadow-blue-500/30'
                          : 'bg-slate-100 group-hover:bg-blue-100'
                      }`}>
                        <span className={`text-xl font-bold transition-colors ${
                          activeStep === i ? 'text-white' : 'text-slate-600 group-hover:text-blue-600'
                        }`}>
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className={`text-sm font-bold mb-1 ${activeStep === i ? 'text-blue-500' : 'text-slate-400'}`}>
                          {step.phase}
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                        <p className="text-slate-500">{step.description}</p>
                      </div>
                      <motion.div
                        animate={{ scale: activeStep === i ? 1 : 0.8, opacity: activeStep === i ? 1 : 0.3 }}
                        className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0"
                      >
                        <ChevronRight className="w-5 h-5 text-white" />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Right — Animated Image */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeStep}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.5 }}
                      src={project.roadmapImages?.[activeStep % project.roadmapImages.length] || roadmapImages[activeStep % roadmapImages.length]}
                      alt={project.roadmap[activeStep]?.title}
                      className="w-full h-[500px] object-cover"
                    />
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent" />

                  {/* Step Indicators */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex gap-2 mb-4">
                      {project.roadmap.map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{
                            width: activeStep === i ? 40 : 10,
                            backgroundColor: activeStep === i ? '#3b82f6' : '#ffffff50'
                          }}
                          className="h-2 rounded-full"
                        />
                      ))}
                    </div>
                    <motion.div
                      key={activeStep}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-white"
                    >
                      <p className="text-2xl font-bold">
                        {project.roadmap[activeStep]?.title}
                      </p>
                    </motion.div>
                  </div>
                </div>

                {/* Floating Step Number */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-6 -right-6 w-20 h-20 bg-blue-500 rounded-2xl shadow-xl flex items-center justify-center"
                >
                  <span className="text-2xl font-bold text-white">
                    {String(activeStep + 1).padStart(2, '0')}
                  </span>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* ===== CTA SECTION ===== */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-16 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '30px 30px'
              }} />
            </div>
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center space-x-3 px-5 py-2.5 bg-blue-500/20 border border-blue-400/30 rounded-full mb-8"
              >
                <div className="w-2.5 h-2.5 bg-blue-400 rounded-full animate-pulse" />
                <span className="text-white/95 text-sm font-medium uppercase tracking-wider">Ready to deploy?</span>
              </motion.div>
              <h2 className="text-4xl md:text-6xl font-bold text-white font-heading mb-6">
                Want This System<br />
                <span className="text-blue-400">For Your Business?</span>
              </h2>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
                Talk to our team and we will tailor the {project.title} to your exact requirements, infrastructure, and budget.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="group px-10 py-5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/25 flex items-center gap-2 text-lg"
                >
                  Start the Conversation <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/portfolios"
                  className="px-10 py-5 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-xl font-semibold hover:bg-white/20 transition-all flex items-center gap-2 text-lg"
                >
                  <ExternalLink className="w-5 h-5" /> View More Projects
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
