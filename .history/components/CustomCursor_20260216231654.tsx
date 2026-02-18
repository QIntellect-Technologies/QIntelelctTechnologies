import React, { useEffect, useRef } from 'react';
import { useMousePosition } from '../hooks/useMousePosition';

const CustomCursor: React.FC = () => {
  const mousePosition = useMousePosition();
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cursorRef.current && cursorDotRef.current) {
      cursorRef.current.style.left = `${mousePosition.x}px`;
      cursorRef.current.style.top = `${mousePosition.y}px`;
      
      cursorDotRef.current.style.left = `${mousePosition.x}px`;
      cursorDotRef.current.style.top = `${mousePosition.y}px`;
    }
  }, [mousePosition]);

  return (
    <>
      {/* Outer Circle Cursor */}
      <div
        ref={cursorRef}
        className="fixed w-8 h-8 pointer-events-none z-50 mix-blend-multiply transition-opacity duration-300"
        style={{
          border: '2px solid rgba(37, 99, 235, 0.6)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          willChange: 'transform'
        }}
      />
      
      {/* Inner Dot Cursor */}
      <div
        ref={cursorDotRef}
        className="fixed w-2 h-2 bg-blue-600 pointer-events-none z-50"
        style={{
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          willChange: 'transform'
        }}
      />
    </>
  );
};

export default CustomCursor;
