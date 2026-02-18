import React, { useEffect, useRef, useState } from 'react';

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
      
      const target = event.target as HTMLElement;
      setIsHovering(!!target.closest('button, a, .group, [role="button"]'));
    };

    const smoothFollow = () => {
      setSmoothPosition(prev => ({
        x: prev.x + (mousePosition.x - prev.x) * 0.15,
        y: prev.y + (mousePosition.y - prev.y) * 0.15
      }));
      animationFrameRef.current = requestAnimationFrame(smoothFollow);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animationFrameRef.current = requestAnimationFrame(smoothFollow);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mousePosition]);

  return (
    <div
      ref={cursorRef}
      className="fixed pointer-events-none z-[9999] transition-transform duration-300 ease-out"
      style={{
        left: `${smoothPosition.x}px`,
        top: `${smoothPosition.y}px`,
        transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`,
      }}
    >
      {/* Unique Tech Ring Design */}
      <div className="relative flex items-center justify-center">
        {/* Outer Brackets */}
        <div className={`absolute w-8 h-8 border-2 border-blue-600/30 rounded-full transition-all duration-500 ${isHovering ? 'rotate-180 scale-125' : 'rotate-0'}`} />
        
        {/* Corner Brackets */}
        <div className="absolute inset-0 flex flex-wrap w-10 h-10">
          <div className="w-1/2 h-1/2 border-t-2 border-l-2 border-blue-600 rounded-tl-sm opacity-60" />
          <div className="w-1/2 h-1/2 border-t-2 border-r-2 border-blue-600 rounded-tr-sm opacity-20" />
          <div className="w-1/2 h-1/2 border-b-2 border-l-2 border-blue-600 rounded-bl-sm opacity-20" />
          <div className="w-1/2 h-1/2 border-b-2 border-r-2 border-blue-600 rounded-br-sm opacity-60" />
        </div>

        {/* Inner Pulsing Core */}
        <div className={`w-1.5 h-1.5 bg-blue-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.8)] ${isHovering ? 'scale-0' : 'scale-100 animate-pulse'}`} />
        
        {/* Hover Icon (only visible on hover) */}
        <div className={`absolute transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
          <div className="w-4 h-4 border-2 border-blue-600 rounded-full flex items-center justify-center">
             <div className="w-1 h-1 bg-blue-600 rounded-full" />
          </div>
        </div>
      </div>

      {/* Lagging Soft Glow */}
      <div 
        className="absolute -z-10 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl pointer-events-none"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </div>
  );
};

export default CustomCursor;
