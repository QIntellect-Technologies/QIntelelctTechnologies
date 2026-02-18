import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  // Physics-based smooth tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Hide on touch devices
    if ('ontouchstart' in window) {
      return;
    }
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      const target = e.target as HTMLElement;
      setIsHovering(!!target.closest('button, a, .group, [role="button"], .interactive'));
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* Neural Core */}
      <motion.div
        style={{
          left: cursorX,
          top: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="absolute"
      >
        <div className={`relative flex items-center justify-center transition-all duration-500 ${isHovering ? 'scale-150' : 'scale-100'}`}>
          {/* Main AI Core */}
          <div className="w-4 h-4 rounded-full bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.8)] flex items-center justify-center">
             <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          </div>

          {/* Neural Orbit Ring 1 */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute w-12 h-12 border border-blue-600/20 rounded-full"
          />

          {/* Neural Orbit Ring 2 */}
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute w-16 h-16 border border-indigo-400/10 rounded-full"
          />

          {/* Floating Synapse Particles */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2 + i,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute"
              style={{ width: 24 + i * 10, height: 24 + i * 10 }}
            >
              <div 
                className="w-1 h-1 bg-blue-400 rounded-full absolute top-0 left-1/2 -translate-x-1/2 shadow-[0_0_5px_rgba(37,99,235,0.5)]"
              />
            </motion.div>
          ))}
          
          {/* Data Flow Lines (only shows on hover) */}
          {isHovering && (
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-20 h-20 border-2 border-dashed border-blue-400/30 rounded-full animate-[spin_10s_linear_infinite]"
              />
            </div>
          )}
        </div>
      </motion.div>

      {/* Atmospheric Data Mist */}
      <motion.div
        style={{
          left: cursorX,
          top: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="absolute -z-10 w-40 h-40 bg-blue-500/5 rounded-full blur-[60px]"
      />
    </div>
  );
};

export default CustomCursor;
