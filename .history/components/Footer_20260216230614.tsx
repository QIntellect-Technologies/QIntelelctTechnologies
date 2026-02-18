
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { name: 'Twitter / X', icon: Twitter, color: 'hover:bg-slate-900' },
    { name: 'Facebook', icon: Facebook, color: 'hover:bg-slate-900' },
    { name: 'Instagram', icon: Instagram, color: 'hover:bg-slate-900' },
    { name: 'LinkedIn', icon: Linkedin, color: 'hover:bg-slate-900' },
  ];

  const navLinks = [
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Works', href: '/portfolios' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-slate-50 to-white text-slate-900 py-32 px-6 md:px-12 overflow-hidden">
      {/* Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <h1 className="text-[15vw] font-black font-heading text-slate-200/20 uppercase tracking-tighter leading-none whitespace-nowrap">
          QIntellect <br /> Technologies
        </h1>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Social Section */}
        <div className="text-center mb-24 space-y-8">
          {/* Social Icon Badge */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block"
          >
            <div className="w-16 h-16 bg-slate-900 rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-3"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-heading">
              Get connected with QIntellect <br /> Technologies on social
            </h2>
            <p className="text-slate-600 text-lg">Don't miss our new updates!</p>
          </motion.div>

          {/* Social Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 pt-8"
          >
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-3 px-6 py-3 bg-white border-2 border-slate-900 rounded-full font-semibold text-slate-900 transition-all shadow-md hover:shadow-lg group"
                >
                  <span>{social.name}</span>
                  <div className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-4 h-4 text-white" strokeWidth={2.5} />
                  </div>
                </motion.a>
              );
            })}
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent my-16" />

        {/* Bottom Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col md:flex-row justify-between items-center gap-8"
        >
          {/* Links */}
          <div className="flex items-center gap-8 md:gap-12">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.href}
                className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors border-b-2 border-transparent hover:border-slate-900 pb-1"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-sm text-slate-600 text-center md:text-left">
            © 2026 QIntellect Technologies. All Rights Reserved.
          </p>

          {/* Back to Top */}
          <motion.button
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold shadow-lg hover:shadow-xl transition-all"
          >
            ↑
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
