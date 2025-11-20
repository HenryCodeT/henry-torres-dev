'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, memo } from 'react';
import { useMousePosition } from '../hooks/useMousePosition';

const CustomCursor = memo(function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const { cursorPosition } = useMousePosition(16); // 60fps throttling

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      className="fixed pointer-events-none z-[9999]"
      animate={{
        x: cursorPosition.x - 40,
        y: cursorPosition.y - 40,
      }}
      transition={{
        type: 'spring',
        stiffness: 150,
        damping: 15,
      }}
      style={{ willChange: 'transform' }}
    >
      {/* Outer Ring */}
      <motion.div
        className="w-20 h-20 rounded-full border-2 border-terracotta/50"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      {/* Inner Dot */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-2 h-2 -mt-1 -ml-1 rounded-full bg-terracotta"
        animate={{
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      {/* Glow Effect */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-10 h-10 -mt-5 -ml-5 rounded-full bg-terracotta/20 blur-xl"
        animate={{
          scale: [1, 1.8, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.div>
  );
});

export default CustomCursor;
