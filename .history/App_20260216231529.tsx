
import React, { useEffect, useRef } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import CustomCursor from './components/CustomCursor';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Industries from './pages/Industries';
import Portfolios from './pages/Portfolios';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import { AnimatePresence, useScroll, useTransform, motion } from 'framer-motion';

// --- Global Neural Background with Parallax ---
const GlobalNeuralBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 5000], [0, -300]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let particles: { x: number; y: number; vx: number; vy: number; r: number; phase: number }[] = [];
    let animationFrameId: number;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    const init = () => {
      particles = [];
      const count = Math.floor(window.innerWidth / 12);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          r: Math.random() * 2 + 1,
          phase: Math.random() * Math.PI * 2
        });
      }
    };
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const time = Date.now() * 0.001;
      particles.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
        const pulse = Math.sin(time + p.phase) * 0.5 + 0.5;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * (0.9 + pulse * 0.3), 0, Math.PI * 2);
        ctx.shadowBlur = 10 * pulse; ctx.shadowColor = 'rgba(37, 99, 235, 0.4)';
        ctx.fillStyle = `rgba(37, 99, 235, ${0.4 + pulse * 0.2})`;
        ctx.fill(); ctx.shadowBlur = 0;
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]; const dx = p.x - p2.x; const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y);
            const lineOpacity = (1 - dist / 180) * 0.3;
            ctx.strokeStyle = `rgba(37, 99, 235, ${lineOpacity})`;
            ctx.lineWidth = 0.8; ctx.stroke();
          }
        }
      });
      animationFrameId = requestAnimationFrame(draw);
    };
    window.addEventListener('resize', resize);
    resize(); init(); draw();
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animationFrameId); };
  }, []);

  return (
    <motion.div style={{ y: parallaxY }} className="fixed inset-0 z-[-1] pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-[120%] bg-slate-50/10" />
    </motion.div>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="relative min-h-screen flex flex-col selection:bg-blue-100 selection:text-blue-700">
        <GlobalNeuralBackground />
        <Navbar />
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/service/:id" element={<ServiceDetail />} />
              <Route path="/industries" element={<Industries />} />
              <Route path="/portfolios" element={<Portfolios />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogDetail />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
        <ChatBot />
      </div>
    </Router>
  );
};

export default App;
