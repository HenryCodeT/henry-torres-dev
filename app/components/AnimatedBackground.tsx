'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useMemo, memo } from 'react';
import { useMousePosition } from '../hooks/useMousePosition';

const AnimatedBackground = memo(function AnimatedBackground() {
  const [mounted, setMounted] = useState(false);
  const { mousePosition, cursorPosition } = useMousePosition(32); // Reduced frequency for background

  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate cubes with deterministic positions - REDUCED for performance
  const cubes = useMemo(() => {
    if (!mounted) return [];

    // Reduced from 8 to 4 cubes for better performance
    return Array.from({ length: 4 }, (_, i) => ({
      id: i,
      size: 60 + (i * 20) % 80,
      x: ((i * 127) % 90) + 5,
      y: ((i * 239) % 85) + 7,
      rotation: (i * 43) % 360,
      duration: 20 + (i * 3) % 15,
      delay: (i * 1) % 4,
      color: [
        'from-terracotta/20 to-terracotta-dark/10',
        'from-sky-blue/20 to-sky-blue-dark/10',
        'from-weaving-pink/20 to-weaving-purple/10',
        'from-weaving-yellow/20 to-weaving-green/10',
      ][i % 4],
    }));
  }, [mounted]);

  // Generate pyramids with deterministic positions - REDUCED for performance
  const pyramids = useMemo(() => {
    if (!mounted) return [];

    // Reduced from 6 to 3 pyramids for better performance
    return Array.from({ length: 3 }, (_, i) => ({
      id: i,
      size: 60 + (i * 25) % 80,
      x: ((i * 173) % 85) + 7,
      y: ((i * 211) % 80) + 10,
      rotation: (i * 67) % 360,
      duration: 25 + (i * 2) % 10,
      delay: (i * 1.5) % 3,
      color: [
        'from-terracotta/15 to-terracotta-light/8',
        'from-sky-blue/15 to-sky-blue-light/8',
        'from-weaving-yellow/15 to-weaving-pink/8',
      ][i % 3],
    }));
  }, [mounted]);

  if (!mounted) {
    return (
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-stone-light/30 to-background" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Base Gradient Background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--stone-light)) 50%, hsl(var(--background)) 100%)',
            'linear-gradient(225deg, hsl(var(--background)) 0%, hsl(var(--sky-blue-light)) 50%, hsl(var(--background)) 100%)',
            'linear-gradient(315deg, hsl(var(--background)) 0%, hsl(var(--terracotta-light)) 50%, hsl(var(--background)) 100%)',
            'linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--stone-light)) 50%, hsl(var(--background)) 100%)',
          ],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* 3D Geometric Figures Container */}
      <div className="absolute inset-0" style={{ perspective: '1500px' }}>
        {/* Pyramids */}
        {pyramids.map((pyramid) => {
          const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
          const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 1080;
          const distanceX = Math.abs(cursorPosition.x - (windowWidth * pyramid.x / 100));
          const distanceY = Math.abs(cursorPosition.y - (windowHeight * pyramid.y / 100));
          const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
          const maxDistance = 350;
          const influence = Math.max(0, 1 - distance / maxDistance);

          return (
            <motion.div
              key={`pyramid-${pyramid.id}`}
              className="absolute"
              style={{
                left: `${pyramid.x}%`,
                top: `${pyramid.y}%`,
                width: pyramid.size,
                height: pyramid.size,
                transformStyle: 'preserve-3d',
                willChange: 'transform',
              }}
              animate={{
                x: mousePosition.x * influence * 80,
                y: mousePosition.y * influence * 80,
                rotateX: [pyramid.rotation, pyramid.rotation + 360],
                rotateY: [0, 360],
                rotateZ: mousePosition.y * influence * 30,
              }}
              transition={{
                x: { type: 'spring', stiffness: 40, damping: 25 },
                y: { type: 'spring', stiffness: 40, damping: 25 },
                rotateX: {
                  duration: pyramid.duration,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: pyramid.delay,
                },
                rotateY: {
                  duration: pyramid.duration * 1.5,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: pyramid.delay,
                },
                rotateZ: { type: 'spring', stiffness: 40, damping: 25 },
              }}
            >
              {/* 3D Pyramid */}
              <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
                {/* Base */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${pyramid.color} backdrop-blur-sm border border-white/10`}
                  style={{
                    transform: `rotateX(90deg) translateZ(0px)`,
                  }}
                />
                {/* Side 1 */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${pyramid.color} backdrop-blur-sm border border-white/10`}
                  style={{
                    transformOrigin: 'bottom center',
                    transform: `rotateY(0deg) rotateX(-60deg) translateZ(${pyramid.size / 4}px)`,
                  }}
                />
                {/* Side 2 */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${pyramid.color} backdrop-blur-sm border border-white/10`}
                  style={{
                    transformOrigin: 'bottom center',
                    transform: `rotateY(90deg) rotateX(-60deg) translateZ(${pyramid.size / 4}px)`,
                  }}
                />
                {/* Side 3 */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${pyramid.color} backdrop-blur-sm border border-white/10`}
                  style={{
                    transformOrigin: 'bottom center',
                    transform: `rotateY(180deg) rotateX(-60deg) translateZ(${pyramid.size / 4}px)`,
                  }}
                />
                {/* Side 4 */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${pyramid.color} backdrop-blur-sm border border-white/10`}
                  style={{
                    transformOrigin: 'bottom center',
                    transform: `rotateY(270deg) rotateX(-60deg) translateZ(${pyramid.size / 4}px)`,
                  }}
                />
              </div>
            </motion.div>
          );
        })}

        {/* Cubes */}
        {cubes.map((cube) => {
          const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
          const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 1080;
          const distanceX = Math.abs(cursorPosition.x - (windowWidth * cube.x / 100));
          const distanceY = Math.abs(cursorPosition.y - (windowHeight * cube.y / 100));
          const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
          const maxDistance = 300;
          const influence = Math.max(0, 1 - distance / maxDistance);

          return (
            <motion.div
              key={cube.id}
              className="absolute"
              style={{
                left: `${cube.x}%`,
                top: `${cube.y}%`,
                width: cube.size,
                height: cube.size,
                transformStyle: 'preserve-3d',
                willChange: 'transform',
              }}
              animate={{
                x: mousePosition.x * influence * 100,
                y: mousePosition.y * influence * 100,
                rotateX: [cube.rotation, cube.rotation + 360],
                rotateY: [0, 360],
                rotateZ: mousePosition.x * influence * 45,
              }}
              transition={{
                x: { type: 'spring', stiffness: 50, damping: 20 },
                y: { type: 'spring', stiffness: 50, damping: 20 },
                rotateX: {
                  duration: cube.duration,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: cube.delay,
                },
                rotateY: {
                  duration: cube.duration * 1.2,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: cube.delay,
                },
                rotateZ: { type: 'spring', stiffness: 50, damping: 20 },
              }}
            >
              {/* 3D Cube */}
              <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
                {/* Front */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${cube.color} border border-white/30`}
                  style={{
                    transform: `translateZ(${cube.size / 2}px)`,
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  }}
                />
                {/* Back */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${cube.color} border border-white/30`}
                  style={{
                    transform: `translateZ(-${cube.size / 2}px) rotateY(180deg)`,
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  }}
                />
                {/* Right */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${cube.color} border border-white/30`}
                  style={{
                    transform: `rotateY(90deg) translateZ(${cube.size / 2}px)`,
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  }}
                />
                {/* Left */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${cube.color} border border-white/30`}
                  style={{
                    transform: `rotateY(-90deg) translateZ(${cube.size / 2}px)`,
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  }}
                />
                {/* Top */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${cube.color} border border-white/30`}
                  style={{
                    transform: `rotateX(90deg) translateZ(${cube.size / 2}px)`,
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  }}
                />
                {/* Bottom */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${cube.color} border border-white/30`}
                  style={{
                    transform: `rotateX(-90deg) translateZ(${cube.size / 2}px)`,
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Floating Particles - REDUCED for performance */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-terracotta/40 rounded-full"
          style={{
            left: `${(i * 29) % 100}%`,
            top: `${(i * 41) % 100}%`,
            willChange: 'transform, opacity',
          }}
          animate={{
            y: [0, -150, 0],
            x: [0, (i % 2 === 0 ? 50 : -50), 0],
            opacity: [0, 0.8, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: (i * 0.7) % 5 + 4,
            delay: (i * 0.3) % 3,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/60" />
    </div>
  );
});

export default AnimatedBackground;
