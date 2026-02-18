import React, { useEffect, useRef, useState } from 'react';

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 });
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement[]>([]);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });

      if (Math.random() > 0.7) {
        const trail = document.createElement('div');
        trail.className = 'fixed w-2 h-2 bg-blue-500 rounded-full pointer-events-none z-40 opacity-80';
        trail.style.left = `${event.clientX}px`;
        trail.style.top = `${event.clientY}px`;
        trail.style.transform = 'translate(-50%, -50%)';
        
        document.body.appendChild(trail);
        trailRef.current.push(trail);

        let opacity = 80;
        const fadeInterval = setInterval(() => {
          opacity -= 12;
          trail.style.opacity = `${opacity / 100}`;
          trail.style.transform = `translate(-50%, -50%) scale(${1 - (80 - opacity) / 80})`;
          
          if (opacity <= 0) {
            clearInterval(fadeInterval);
            trail.remove();
            trailRef.current = trailRef.current.filter(t => t !== trail);
          }
        }, 20);
      }
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

  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.style.left = `${smoothPosition.x}px`;
      cursorRef.current.style.top = `${smoothPosition.y}px`;
    }
  }, [smoothPosition]);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed w-6 h-6 pointer-events-none z-50"
        style={{
          border: '2px solid rgba(37, 99, 235, 0.7)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          willChange: 'transform, left, top',
          boxShadow: '0 0 8px rgba(37, 99, 235, 0.4)'
        }}
      />
      
      <div
        className="fixed w-1.5 h-1.5 bg-blue-600 rounded-full pointer-events-none z-50"
        style={{
          left: `${smoothPosition.x}px`,
          top: `${smoothPosition.y}px`,
          transform: 'translate(-50%, -50%)',
          willChange: 'transform, left, top',
          boxShadow: '0 0 4px rgba(37, 99, 235, 0.8)'
        }}
      />
    </>
  );
};

export default CustomCursor;
