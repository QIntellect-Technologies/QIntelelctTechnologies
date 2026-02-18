
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight, Search, Circle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticButton from './MagneticButton';

const StatusTypewriter: React.FC = React.memo(() => {
  const statuses = ["Available for Projects", "QIntellect EST. 2012", "HQ: New York, NY", "Innovation First"];
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === statuses[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 2000);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % statuses.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 30 : 60);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  return (
    <div className="flex items-center space-x-2">
      <div className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </div>
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest min-w-[150px]">
        {statuses[index].substring(0, subIndex)}
        <span className="inline-block w-[1px] h-[0.9em] bg-emerald-500 ml-0.5 animate-pulse align-middle" />
      </span>
    </div>
  );
});

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Check if we're on About page or other pages that need solid navbar
  const needsSolidNavbar = location.pathname === '/about' || location.pathname === '/services' || location.pathname === '/blog' || location.pathname === '/contact' || location.pathname.startsWith('/service/');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Industries', path: '/industries' },
    { name: 'Portfolios', path: '/portfolios' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled || needsSolidNavbar ? 'py-2' : 'py-6'}`}>
      <div className="container mx-auto px-4 md:px-8">
        <div className={`relative transition-all duration-300 rounded-2xl px-6 py-3 flex items-center justify-between ${scrolled || needsSolidNavbar ? 'bg-white/95 backdrop-blur-md shadow-xl shadow-slate-200/40 border border-slate-100' : 'bg-transparent'}`}>
          <div className="flex items-center space-x-12">
            <Link to="/" className="flex items-center space-x-3 group">
              <img src="/images/logo.png" alt="QIntellect Technologies" className="h-16 w-auto" />
            </Link>

            <div className="hidden xl:block">
              <StatusTypewriter />
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 hover:text-blue-600 relative group ${location.pathname === link.path ? 'text-blue-600' : 'text-slate-900'}`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-500 group-hover:w-full ${location.pathname === link.path ? 'w-full' : ''}`} />
              </Link>
            ))}
            
            <div className="flex items-center space-x-6 border-l border-slate-200 pl-10">
              <button className="text-slate-900 hover:text-blue-600 transition-colors">
                <Search className="w-5 h-5 text-slate-400 hover:text-blue-600" />
              </button>
              <MagneticButton to="/contact" className="bg-slate-900 text-white px-8 py-3.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:bg-blue-600 transition-all shadow-xl flex items-center group">
                LET&apos;S TALK
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </MagneticButton>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button className="lg:hidden text-slate-900" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden fixed inset-0 bg-white z-40 flex flex-col items-center justify-center p-8"
          >
            <div className="flex flex-col items-center space-y-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  className="text-3xl font-medium text-slate-900 hover:text-blue-600 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Link to="/contact" className="bg-blue-600 text-white px-10 py-4 rounded-xl text-lg font-medium">
                Start Project
              </Link>
            </div>
            <button className="absolute top-8 right-8 text-slate-900" onClick={() => setIsOpen(false)}>
              <X className="w-8 h-8" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
