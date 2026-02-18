
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

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
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'py-3' : 'py-6'}`}>
      <div className="container mx-auto px-4 md:px-8">
        <div className={`relative transition-all duration-300 rounded-2xl px-6 py-3 flex items-center justify-between ${scrolled ? 'bg-white shadow-xl shadow-slate-200/40 border border-slate-100' : 'bg-transparent'}`}>
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-xl">Q</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-slate-900 tracking-tighter leading-none">QINTELLECT</span>
              <span className="text-[9px] font-semibold text-blue-600 tracking-[0.2em] uppercase mt-0.5">Technologies</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className={`text-sm font-medium transition-colors duration-300 hover:text-blue-600 ${location.pathname === link.path ? 'text-blue-600' : 'text-slate-500'}`}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/contact" className="bg-blue-600 text-white px-7 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 flex items-center group">
              Consultation
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
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
