'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Lottie from 'lottie-react';
import llamaAnimation from '@/public/animations/llama-placeholder.json';

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

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

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
    >
      {/* Animated Background Patterns */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Geometric Peru-inspired patterns */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 opacity-10"
          style={{
            x: mousePosition.x * 20,
            y: mousePosition.y * 20,
          }}
        >
          <svg viewBox="0 0 100 100" className="text-weaving-pink">
            <polygon
              points="50,10 90,30 90,70 50,90 10,70 10,30"
              fill="currentColor"
            />
          </svg>
        </motion.div>

        <motion.div
          className="absolute bottom-20 right-10 w-40 h-40 opacity-10"
          style={{
            x: mousePosition.x * -15,
            y: mousePosition.y * -15,
          }}
        >
          <svg viewBox="0 0 100 100" className="text-weaving-yellow">
            <circle cx="50" cy="50" r="40" fill="currentColor" />
          </svg>
        </motion.div>

        <motion.div
          className="absolute top-1/2 left-1/4 w-24 h-24 opacity-10"
          style={{
            x: mousePosition.x * 25,
            y: mousePosition.y * 25,
          }}
        >
          <svg viewBox="0 0 100 100" className="text-weaving-purple">
            <rect x="10" y="10" width="80" height="80" fill="currentColor" />
          </svg>
        </motion.div>
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
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-stone/10"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-2xl">👋</span>
              <span className="text-sm font-medium text-muted-foreground">
                Hola! Welcome to my portfolio
              </span>
            </motion.div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="block text-foreground mb-2">I'm</span>
              <span className="block bg-gradient-to-r from-terracotta via-weaving-pink to-sky-blue bg-clip-text text-transparent">
                Henry Torres
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
              Full-Stack Developer crafting delightful web experiences with
              modern technologies
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-terracotta">4+</div>
                <div className="text-sm text-muted-foreground">
                  Years Experience
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-sky-blue">50+</div>
                <div className="text-sm text-muted-foreground">
                  Projects Completed
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-weaving-pink">∞</div>
                <div className="text-sm text-muted-foreground">
                  Lines of Code
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4">
              <motion.button
                onClick={() => handleCTAClick('projects')}
                className="group px-8 py-4 bg-terracotta text-white rounded-full font-medium transition-all duration-300 hover:shadow-xl hover:shadow-terracotta/30 relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  View My Work
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
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-terracotta-dark to-terracotta transition-transform group-hover:scale-110" />
              </motion.button>

              <motion.button
                onClick={() => handleCTAClick('contact')}
                className="px-8 py-4 border-2 border-terracotta text-terracotta rounded-full font-medium transition-all duration-300 hover:bg-terracotta hover:text-white hover:shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.button>
            </div>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start pt-4">
              {['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind'].map(
                (tech, index) => (
                  <motion.span
                    key={tech}
                    className="px-3 py-1 bg-white/60 backdrop-blur-sm text-sm font-medium text-foreground rounded-full border border-stone/10"
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

          {/* Right Side - Animated Llama */}
          <motion.div
            className="relative flex items-center justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ y: ySpring }}
          >
            <motion.div
              className="relative w-full max-w-md"
              style={{
                x: mousePosition.x * 10,
                y: mousePosition.y * 10,
              }}
              onHoverStart={() => setIsHovering(true)}
              onHoverEnd={() => setIsHovering(false)}
            >
              {/* Llama Container with Glow Effect */}
              <div className="relative">
                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-terracotta/20 via-weaving-pink/20 to-sky-blue/20 blur-3xl rounded-full"
                  animate={{
                    scale: isHovering ? 1.2 : 1,
                    opacity: isHovering ? 0.6 : 0.3,
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Lottie Animation */}
                <motion.div
                  animate={{
                    scale: isHovering ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Lottie
                    animationData={llamaAnimation}
                    loop={true}
                    className="w-full h-auto"
                  />
                </motion.div>

                {/* Decorative Elements around Llama */}
                <motion.div
                  className="absolute -top-8 -right-8 w-16 h-16"
                  animate={{
                    rotate: 360,
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                    scale: { duration: 2, repeat: Infinity },
                  }}
                >
                  <svg viewBox="0 0 100 100" className="text-weaving-yellow">
                    <circle cx="50" cy="50" r="8" fill="currentColor" />
                  </svg>
                </motion.div>

                <motion.div
                  className="absolute -bottom-4 -left-4 w-12 h-12"
                  animate={{
                    rotate: -360,
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    rotate: {
                      duration: 15,
                      repeat: Infinity,
                      ease: 'linear',
                    },
                    scale: {
                      duration: 2.5,
                      repeat: Infinity,
                      delay: 0.5,
                    },
                  }}
                >
                  <svg viewBox="0 0 100 100" className="text-weaving-pink">
                    <polygon
                      points="50,10 90,50 50,90 10,50"
                      fill="currentColor"
                    />
                  </svg>
                </motion.div>
              </div>

              {/* Speech Bubble */}
              <motion.div
                className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white px-6 py-3 rounded-2xl shadow-lg border border-stone/10 whitespace-nowrap"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <p className="text-sm font-medium text-foreground">
                  ¡Hola! Let's build something amazing! 🚀
                </p>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-r border-b border-stone/10" />
              </motion.div>
            </motion.div>
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
            Scroll to explore
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
}
