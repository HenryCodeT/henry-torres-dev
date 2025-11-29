'use client';

import { useRef, useState, memo } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Lottie from 'lottie-react';
import llamaAnimation from '@/public/animations/llama-placeholder.json';
import { useMousePosition } from '../hooks/useMousePosition';

const HeroSection = memo(function HeroSection() {
  const t = useTranslations('hero');
  const heroRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const { mousePosition, cursorPosition } = useMousePosition(32);

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  // Smooth spring animation for parallax
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const ySpring = useSpring(y, springConfig);

  const handleCTAClick = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-stone-light via-background to-sky-blue-light/20"
      style={{ perspective: '2000px' }}
    >
      {/* 3D Cubes in Hero Background */}
      <div className="absolute inset-0 z-0" style={{ transformStyle: 'preserve-3d' }}>
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`hero-cube-${i}`}
            className="absolute"
            style={{
              left: `${((i * 181) % 80) + 10}%`,
              top: `${((i * 263) % 70) + 15}%`,
              width: `${100 + (i * 27) % 120}px`,
              height: `${100 + (i * 27) % 120}px`,
              transformStyle: 'preserve-3d',
            }}
            animate={{
              rotateX: [0, 360],
              rotateY: [0, -360],
              y: [0, -40, 0],
              x: [0, (i % 2 === 0 ? 30 : -30), 0],
            }}
            transition={{
              rotateX: { duration: 18 + i * 3, repeat: Infinity, ease: 'linear' },
              rotateY: { duration: 22 + i * 2, repeat: Infinity, ease: 'linear' },
              y: { duration: 6 + i, repeat: Infinity, ease: 'easeInOut' },
              x: { duration: 8 + i * 0.5, repeat: Infinity, ease: 'easeInOut' },
            }}
          >
            <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
              {['front', 'back', 'right', 'left', 'top', 'bottom'].map((face) => {
                const size = 100 + (i * 27) % 120;
                const transforms = {
                  front: `translateZ(${size / 2}px)`,
                  back: `translateZ(-${size / 2}px) rotateY(180deg)`,
                  right: `rotateY(90deg) translateZ(${size / 2}px)`,
                  left: `rotateY(-90deg) translateZ(${size / 2}px)`,
                  top: `rotateX(90deg) translateZ(${size / 2}px)`,
                  bottom: `rotateX(-90deg) translateZ(${size / 2}px)`,
                };
                const colors = [
                  'from-terracotta/20 to-transparent',
                  'from-sky-blue/20 to-transparent',
                  'from-weaving-pink/20 to-transparent',
                ];
                return (
                  <div
                    key={face}
                    className={`absolute inset-0 bg-gradient-to-br ${colors[i % 3]} backdrop-blur-sm border border-white/10 rounded-lg`}
                    style={{ transform: transforms[face as keyof typeof transforms] }}
                  />
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
      {/* Main Content Container */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ opacity }}
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <motion.div
            className="text-center lg:text-left space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Greeting Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-stone-light/90 backdrop-blur-sm rounded-full shadow-sm border border-stone/10"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-2xl">👋</span>
              <span className="text-sm font-medium text-muted-foreground">
                {t('badge')}
              </span>
            </motion.div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="block text-foreground mb-2">{t('prefix')}</span>
              <span className="block bg-gradient-to-r from-terracotta via-weaving-pink to-sky-blue bg-clip-text text-transparent">
                {t('name')}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
              {t('title')} {t('subtitle')}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-terracotta">3+</div>
                <div className="text-sm text-muted-foreground">
                  {t('stats.yearsLabel')} {t('stats.yearsSubLabel')}
                </div>
              </div>
              {/* <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-sky-blue">50+</div>
                <div className="text-sm text-muted-foreground">
                  {t('stats.projectsLabel')} {t('stats.projectsSubLabel')}
                </div>
              </div> */}
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-weaving-pink">∞</div>
                <div className="text-sm text-muted-foreground">
                  {t('stats.linesLabel')} {t('stats.linesSubLabel')}
                </div>
              </div>
            </div>

            {/* CTA Buttons - 3D Style */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4" style={{ perspective: '1000px' }}>
              <motion.button
                onClick={() => handleCTAClick('projects')}
                className="group relative px-8 py-4 font-medium overflow-visible"
                style={{ transformStyle: 'preserve-3d' }}
                whileHover={{
                  scale: 1.05,
                  rotateX: -5,
                  rotateY: 5,
                }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  rotateX: [0, 2, 0],
                  rotateY: [0, -2, 0],
                }}
                transition={{
                  rotateX: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
                  rotateY: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
                }}
              >
                {/* Button 3D Cube Structure */}
                <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
                  {/* Front Face */}
                  <div
                    className="relative z-10 flex items-center gap-2 px-8 py-4 bg-gradient-to-br from-terracotta to-terracotta-dark text-white rounded-lg border border-terracotta-light/30"
                    style={{ transform: 'translateZ(20px)' }}
                  >
                    <span>{t('cta.viewWork')}</span>
                    <svg
                      className="w-5 h-5 transition-transform group-hover:translate-x-1"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                  {/* Top Face */}
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-terracotta-light to-terracotta rounded-t-lg"
                    style={{
                      transform: 'rotateX(90deg) translateZ(20px)',
                      transformOrigin: 'top',
                      height: '40px',
                    }}
                  />
                  {/* Right Face */}
                  <div
                    className="absolute right-0 top-0 bg-gradient-to-b from-terracotta-dark to-terracotta rounded-r-lg"
                    style={{
                      transform: 'rotateY(90deg) translateZ(20px)',
                      transformOrigin: 'right',
                      width: '40px',
                      height: '100%',
                    }}
                  />
                  {/* Shadow */}
                  <div className="absolute -inset-2 bg-terracotta/20 blur-xl -z-10" style={{ transform: 'translateZ(-10px)' }} />
                </div>
              </motion.button>

              <motion.button
                onClick={() => handleCTAClick('contact')}
                className="group relative px-8 py-4 font-medium overflow-visible"
                style={{ transformStyle: 'preserve-3d' }}
                whileHover={{
                  scale: 1.05,
                  rotateX: 5,
                  rotateY: -5,
                }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  rotateX: [0, -2, 0],
                  rotateY: [0, 2, 0],
                }}
                transition={{
                  rotateX: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
                  rotateY: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
                }}
              >
                {/* Button 3D Cube Structure */}
                <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
                  {/* Front Face */}
                  <div
                    className="relative z-10 px-8 py-4 bg-background border-2 border-terracotta text-terracotta rounded-lg group-hover:bg-terracotta group-hover:text-white transition-colors duration-300"
                    style={{ transform: 'translateZ(20px)' }}
                  >
                    {t('cta.getInTouch')}
                  </div>
                  {/* Top Face */}
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-terracotta/30 to-sky-blue/30 rounded-t-lg"
                    style={{
                      transform: 'rotateX(90deg) translateZ(20px)',
                      transformOrigin: 'top',
                      height: '40px',
                    }}
                  />
                  {/* Right Face */}
                  <div
                    className="absolute right-0 top-0 bg-gradient-to-b from-sky-blue/30 to-terracotta/30 rounded-r-lg"
                    style={{
                      transform: 'rotateY(90deg) translateZ(20px)',
                      transformOrigin: 'right',
                      width: '40px',
                      height: '100%',
                    }}
                  />
                  {/* Shadow */}
                  <div className="absolute -inset-2 bg-terracotta/10 blur-xl -z-10" style={{ transform: 'translateZ(-10px)' }} />
                </div>
              </motion.button>
            </div>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start pt-4">
              {(t.raw('techStack') as string[]).map(
                (tech, index) => (
                  <motion.span
                    key={tech}
                    className="px-3 py-1 bg-stone-light backdrop-blur-sm text-sm font-medium text-foreground rounded-full border border-stone/10"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                  >
                    {tech}
                  </motion.span>
                )
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.5 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2 cursor-pointer group"
          onClick={() => handleCTAClick('about')}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-sm text-muted-foreground group-hover:text-terracotta transition-colors">
            {t('scrollText')}
          </span>
          <svg
            className="w-6 h-6 text-terracotta"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
});

export default HeroSection;
