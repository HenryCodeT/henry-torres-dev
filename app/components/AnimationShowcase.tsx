'use client';

import { motion, useScroll, useTransform, useAnimation, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Lottie from 'lottie-react';

export default function AnimationShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeDemo, setActiveDemo] = useState<number>(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  return (
    <section
      ref={sectionRef}
      id="animations"
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-stone-light/50 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-terracotta via-weaving-pink to-sky-blue bg-clip-text text-transparent">
              Animation Technologies
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore interactive demonstrations of modern web animation libraries
          </p>
        </motion.div>

        {/* Demo Grid */}
        <div className="space-y-20">

          {/* 1. Lottie Animations Demo */}
          <LottieDemo />

          {/* 2. Framer Motion Advanced Demo */}
          <FramerMotionDemo />

          {/* 3. Three.js Placeholder */}
          <ThreeJsPlaceholder />

          {/* 4. WebGL Hover Effect Placeholder */}
          <WebGLPlaceholder />

          {/* 5. GSAP Timeline Demo */}
          <GSAPTimelineDemo />

        </div>
      </div>
    </section>
  );
}

// Lottie Demo Component
function LottieDemo() {
  const [isPlaying, setIsPlaying] = useState(true);

  // Simple animation data
  const animationData = {
    v: "5.7.4",
    fr: 60,
    ip: 0,
    op: 180,
    w: 500,
    h: 500,
    nm: "Circle Animation",
    ddd: 0,
    assets: [],
    layers: [{
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Circle",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 1, k: [{ t: 0, s: [0] }, { t: 180, s: [360] }] },
        p: { a: 0, k: [250, 250, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 1, k: [{ t: 0, s: [50, 50, 100] }, { t: 90, s: [100, 100, 100] }, { t: 180, s: [50, 50, 100] }] }
      },
      ao: 0,
      shapes: [{
        ty: "gr",
        it: [{
          ty: "el",
          p: { a: 0, k: [0, 0] },
          s: { a: 0, k: [200, 200] }
        }, {
          ty: "fl",
          c: { a: 0, k: [0.8, 0.3, 0.2, 1] }
        }],
        nm: "Circle",
        np: 2
      }],
      ip: 0,
      op: 180,
      st: 0
    }]
  };

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-terracotta/10 to-terracotta-light/10 rounded-3xl -z-10" />

      <div className="grid md:grid-cols-2 gap-8 p-8 rounded-3xl border border-terracotta/20">

        {/* Left: Info */}
        <div className="flex flex-col justify-center space-y-4">
          <div className="inline-block">
            <span className="text-5xl">🎬</span>
          </div>
          <h3 className="text-3xl font-bold text-foreground">Lottie Animations</h3>
          <p className="text-muted-foreground">
            Lightweight, scalable animations that work across platforms. Perfect for loading states, micro-interactions, and delightful UX moments.
          </p>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <span className="w-2 h-2 bg-terracotta rounded-full"></span>
              <span>Vector-based animations</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="w-2 h-2 bg-terracotta rounded-full"></span>
              <span>Exported from After Effects</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="w-2 h-2 bg-terracotta rounded-full"></span>
              <span>Small file sizes</span>
            </div>
          </div>

          <motion.button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-6 py-3 bg-terracotta text-white rounded-full font-medium w-fit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPlaying ? 'Pause' : 'Play'} Animation
          </motion.button>
        </div>

        {/* Right: Demo */}
        <div className="flex items-center justify-center bg-white/50 rounded-2xl p-8 min-h-[300px]">
          <Lottie
            animationData={animationData}
            loop={true}
            autoplay={isPlaying}
            style={{ width: 250, height: 250 }}
          />
        </div>
      </div>
    </motion.div>
  );
}

// Framer Motion Advanced Demo
function FramerMotionDemo() {
  const [isExpanded, setIsExpanded] = useState(false);
  const controls = useAnimation();

  const cards = [
    { id: 1, title: 'Gesture', color: 'bg-sky-blue' },
    { id: 2, title: 'Layout', color: 'bg-weaving-pink' },
    { id: 3, title: 'Scroll', color: 'bg-weaving-yellow' },
  ];

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-blue/10 to-weaving-pink/10 rounded-3xl -z-10" />

      <div className="grid md:grid-cols-2 gap-8 p-8 rounded-3xl border border-sky-blue/20">

        {/* Left: Demo */}
        <div className="flex items-center justify-center bg-white/50 rounded-2xl p-8 min-h-[400px]">
          <div className="space-y-4 w-full max-w-xs">

            {/* Drag Demo */}
            <motion.div
              drag
              dragConstraints={{ left: 0, right: 200, top: 0, bottom: 0 }}
              className="w-20 h-20 bg-gradient-to-br from-terracotta to-terracotta-light rounded-2xl cursor-grab active:cursor-grabbing flex items-center justify-center text-white font-bold shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Drag
            </motion.div>

            {/* Layout Animation */}
            <motion.div layout onClick={() => setIsExpanded(!isExpanded)} className="cursor-pointer">
              <motion.div
                className="bg-gradient-to-r from-sky-blue to-sky-blue-light rounded-2xl p-4 text-white"
                layout
              >
                <motion.h4 layout className="font-bold">Layout Animation</motion.h4>
                <AnimatePresence>
                  {isExpanded && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="mt-2 text-sm"
                    >
                      Smooth transitions between layout states!
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>

            {/* Stagger Children */}
            <motion.div
              className="flex gap-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {cards.map((card) => (
                <motion.div
                  key={card.id}
                  className={`${card.color} text-white p-4 rounded-xl flex-1 text-center font-medium shadow-md`}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ y: -5 }}
                >
                  {card.title}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Right: Info */}
        <div className="flex flex-col justify-center space-y-4">
          <div className="inline-block">
            <span className="text-5xl">⚡</span>
          </div>
          <h3 className="text-3xl font-bold text-foreground">Framer Motion</h3>
          <p className="text-muted-foreground">
            Production-ready animation library for React. Create fluid, gesture-based interactions with ease.
          </p>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <span className="w-2 h-2 bg-sky-blue rounded-full"></span>
              <span>Drag & drop interactions</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="w-2 h-2 bg-sky-blue rounded-full"></span>
              <span>Layout animations</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="w-2 h-2 bg-sky-blue rounded-full"></span>
              <span>Scroll-based animations</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Three.js Placeholder
function ThreeJsPlaceholder() {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-weaving-purple/10 to-sky-blue/10 rounded-3xl -z-10" />

      <div className="p-8 rounded-3xl border border-weaving-purple/20">
        <div className="text-center space-y-4">
          <span className="text-6xl">🎲</span>
          <h3 className="text-3xl font-bold text-foreground">Three.js & 3D Web</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Immersive 3D experiences powered by WebGL. Interactive 3D models, scenes, and visual effects.
          </p>

          {/* Placeholder 3D Cube CSS Animation */}
          <div className="flex justify-center py-12">
            <div className="relative w-32 h-32" style={{ perspective: '1000px' }}>
              <motion.div
                className="w-full h-full bg-gradient-to-br from-weaving-purple to-sky-blue rounded-xl shadow-2xl"
                animate={{
                  rotateY: 360,
                  rotateX: 360,
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'linear'
                }}
                style={{
                  transformStyle: 'preserve-3d',
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
            <div className="p-4 bg-white/50 rounded-xl">
              <div className="font-bold text-weaving-purple">3D Models</div>
              <div className="text-sm text-muted-foreground">GLTF/GLB</div>
            </div>
            <div className="p-4 bg-white/50 rounded-xl">
              <div className="font-bold text-weaving-purple">Lighting</div>
              <div className="text-sm text-muted-foreground">Realistic</div>
            </div>
            <div className="p-4 bg-white/50 rounded-xl">
              <div className="font-bold text-weaving-purple">Physics</div>
              <div className="text-sm text-muted-foreground">Interactive</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// WebGL Placeholder
function WebGLPlaceholder() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-weaving-pink/10 to-weaving-yellow/10 rounded-3xl -z-10" />

      <div className="grid md:grid-cols-2 gap-8 p-8 rounded-3xl border border-weaving-pink/20">

        {/* Left: Info */}
        <div className="flex flex-col justify-center space-y-4">
          <span className="text-5xl">✨</span>
          <h3 className="text-3xl font-bold text-foreground">WebGL Effects</h3>
          <p className="text-muted-foreground">
            Hardware-accelerated visual effects using shaders. Create stunning hover effects and image transitions.
          </p>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <span className="w-2 h-2 bg-weaving-pink rounded-full"></span>
              <span>GPU-accelerated</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="w-2 h-2 bg-weaving-pink rounded-full"></span>
              <span>Custom shaders</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="w-2 h-2 bg-weaving-pink rounded-full"></span>
              <span>Distortion effects</span>
            </div>
          </div>
        </div>

        {/* Right: Demo */}
        <div className="flex items-center justify-center bg-white/50 rounded-2xl p-8">
          <motion.div
            className="relative w-64 h-64 rounded-2xl overflow-hidden cursor-pointer"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-weaving-pink via-weaving-purple to-weaving-yellow"
              animate={{
                scale: isHovered ? 1.2 : 1,
                rotate: isHovered ? 5 : 0,
              }}
              transition={{ duration: 0.5 }}
            />
            <motion.div
              className="absolute inset-0 backdrop-blur-sm bg-white/20"
              animate={{
                opacity: isHovered ? 0 : 1,
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">
              Hover Me
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// GSAP Timeline Demo
function GSAPTimelineDemo() {
  const [isAnimating, setIsAnimating] = useState(false);
  const controls = useAnimation();

  const startAnimation = async () => {
    setIsAnimating(true);
    await controls.start({
      x: [0, 100, 100, 0],
      y: [0, 0, 100, 100, 0],
      rotate: [0, 90, 180, 270, 360],
      scale: [1, 1.2, 0.8, 1.2, 1],
      transition: {
        duration: 3,
        times: [0, 0.25, 0.5, 0.75, 1],
        ease: "easeInOut"
      }
    });
    setIsAnimating(false);
  };

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-weaving-green/10 to-terracotta/10 rounded-3xl -z-10" />

      <div className="grid md:grid-cols-2 gap-8 p-8 rounded-3xl border border-weaving-green/20">

        {/* Left: Demo */}
        <div className="flex items-center justify-center bg-white/50 rounded-2xl p-8 min-h-[300px] relative">
          <motion.div
            animate={controls}
            className="w-20 h-20 bg-gradient-to-br from-weaving-green to-sky-blue rounded-2xl shadow-lg"
          />
        </div>

        {/* Right: Info */}
        <div className="flex flex-col justify-center space-y-4">
          <span className="text-5xl">🎯</span>
          <h3 className="text-3xl font-bold text-foreground">GSAP Timelines</h3>
          <p className="text-muted-foreground">
            Professional-grade animation sequencing. Create complex animation timelines with precise control.
          </p>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <span className="w-2 h-2 bg-weaving-green rounded-full"></span>
              <span>Precise timing control</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="w-2 h-2 bg-weaving-green rounded-full"></span>
              <span>Scroll-triggered animations</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="w-2 h-2 bg-weaving-green rounded-full"></span>
              <span>SVG morphing</span>
            </div>
          </div>

          <motion.button
            onClick={startAnimation}
            disabled={isAnimating}
            className="px-6 py-3 bg-weaving-green text-white rounded-full font-medium w-fit disabled:opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isAnimating ? 'Animating...' : 'Play Timeline'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
