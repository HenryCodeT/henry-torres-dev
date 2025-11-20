'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * Optimized hook for mouse position with throttling
 * Reduces unnecessary re-renders and improves performance
 */
export function useMousePosition(throttleMs = 16) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let rafId: number | null = null;
    let lastTime = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const currentTime = Date.now();
      
      // Throttle using requestAnimationFrame for smooth 60fps
      if (currentTime - lastTime >= throttleMs) {
        lastTime = currentTime;
        
        if (rafId) cancelAnimationFrame(rafId);
        
        rafId = requestAnimationFrame(() => {
          const x = (e.clientX / window.innerWidth) * 2 - 1;
          const y = (e.clientY / window.innerHeight) * 2 - 1;
          
          setMousePosition({ x, y });
          setCursorPosition({ x: e.clientX, y: e.clientY });
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [throttleMs]);

  return { mousePosition, cursorPosition };
}

