"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, ChevronRight, Search, Circle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticButton from './MagneticButton';

const StatusTypewriter: React.FC = React.memo(() => {
  const statuses = ["Available for Projects", "QIntellect EST. 2012", "Innovation First"];
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
      <span className="text-[8px] font-bold text-slate-600 uppercase tracking-widest min-w-[120px]">
        {statuses[index].substring(0, subIndex)}
        <span className="inline-block w-[1px] h-[0.9em] bg-emerald-500 ml-0.5 animate-pulse align-middle" />
      </span>
    </div>
  );
});

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const router = useRouter();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  // Check if we're on About page or other pages that need solid navbar
  const needsSolidNavbar = pathname === '/about' || pathname === '/services' || pathname === '/blog' || pathname === '/contact' || pathname?.startsWith('/service/');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Industries', path: '/industries' },
    { name: 'Portfolios', path: '/portfolios' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled || needsSolidNavbar ? 'py-2' : 'py-4'}`}>
      <div className="container mx-auto px-4 md:px-8">
        <div className={`relative transition-all duration-300 rounded-2xl px-1 py-3 flex items-center justify-between ${scrolled || needsSolidNavbar || pathname === '/' ? 'bg-white/80 backdrop-blur-lg shadow-xl shadow-slate-200/20 border border-white/40' : 'bg-transparent'}`}>
          <div className="flex items-center space-x-3 lg:space-x-6 xl:space-x-12 flex-1 min-w-0">
            <Link href="/" className="flex items-center space-x-3 group">
              <img loading="lazy" src="/images/logo-small.png" width="40" height="40" alt="QIntellect Technologies" className="h-10 lg:h-16 w-auto" />
            </Link>

            {/* Company name — mobile only, between logo and hamburger */}
            <span className="lg:hidden text-sm font-bold text-slate-900 tracking-tight">QIntellect Technologies</span>

            <div className="hidden xl:block">
              <StatusTypewriter />
            </div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center space-x-8 ml-8 xl:ml-16 pl-6 border-l border-slate-200/50">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 hover:text-[#5E62FF] relative group whitespace-nowrap ${pathname === link.path ? 'text-[#5E62FF]' : 'text-slate-900'}`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-[#5E62FF] transition-all duration-500 group-hover:w-full ${pathname === link.path ? 'w-full' : ''}`} />
                </Link>
              ))}
            </div>
          </div>

          {/* Action Buttons — fixed-width block, search is an absolute overlay so nothing ever shifts */}
          <div className="hidden lg:flex items-center gap-7 flex-shrink-0 ml-20">
            {/* Search icon + absolutely-positioned expanding input overlay */}
            <div className="relative flex items-center">
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 210, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute right-7 top-1/2 -translate-y-1/2 bg-white shadow-lg border border-slate-200 rounded-full overflow-hidden z-40"
                  >
                    <form onSubmit={handleSearchSubmit} className="px-4 py-1.5">
                      <input
                        type="text"
                        autoFocus
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="text-sm bg-transparent text-slate-900 outline-none w-full"
                        onBlur={() => {
                          if (!searchQuery) setIsSearchOpen(false);
                        }}
                      />
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`relative z-50 transition-colors ${isSearchOpen ? 'text-[#5E62FF]' : 'text-slate-400 hover:text-[#5E62FF]'}`}
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
            <MagneticButton to="/contact" className="bg-slate-900 text-white px-8 py-3.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#5E62FF] transition-all shadow-xl flex items-center group whitespace-nowrap">
              LET&apos;S TALK
              <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </MagneticButton>
          </div>

          {/* Mobile Toggle - absolute on mobile so it doesn't affect nav alignment */}
          <button className="lg:hidden text-slate-900 absolute right-6 top-1/2 -translate-y-1/2" onClick={() => setIsOpen(!isOpen)}>
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
            <div className="flex flex-col items-center space-y-5 w-full">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className="text-xl font-semibold text-slate-800 hover:text-blue-600 transition-colors tracking-wide"
                >
                  {link.name}
                </Link>
              ))}
              <Link href="/contact" className="mt-4 bg-blue-600 text-white px-8 py-3.5 rounded-xl text-base font-semibold w-full max-w-xs text-center">
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
