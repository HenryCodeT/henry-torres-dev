'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import TimelineItem from './TimelineItem';
import { timelineData, aboutStats } from '@/app/data/timeline';

export default function AboutSection() {
  const sectionRef = useRef(null);
  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: true, margin: '-100px' });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-gradient-to-b from-stone-light to-background overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-block px-4 py-2 bg-terracotta/10 text-terracotta font-semibold rounded-full mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            About Me
          </motion.span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            My Journey in{' '}
            <span className="bg-gradient-to-r from-terracotta via-weaving-pink to-sky-blue bg-clip-text text-transparent">
              Tech
            </span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            From junior developer to tech lead, here's how I've grown over the
            past 4 years building amazing products and helping teams succeed.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-20 md:mb-32"
          initial={{ opacity: 0, y: 30 }}
          animate={isStatsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          {aboutStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-stone/10 hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={
                isStatsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <motion.div
                className={`text-4xl md:text-5xl font-bold text-${stat.color} mb-2`}
                initial={{ scale: 0 }}
                animate={isStatsInView ? { scale: 1 } : { scale: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  delay: index * 0.1 + 0.2,
                }}
              >
                {stat.value}
              </motion.div>
              <div className="text-sm md:text-base text-muted-foreground font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Timeline Section */}
        <div className="relative">
          {/* Timeline Line (Desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-terracotta via-sky-blue to-weaving-purple opacity-30" />

          {/* Timeline Line (Mobile) */}
          <div className="md:hidden absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-terracotta via-sky-blue to-weaving-purple opacity-30" />

          {/* Timeline Items */}
          <div className="space-y-12 md:space-y-24">
            {timelineData.map((item, index) => (
              <TimelineItem key={item.year} item={item} index={index} />
            ))}
          </div>
        </div>

        {/* Personal Note */}
        <motion.div
          className="mt-20 md:mt-32 text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="p-8 md:p-12 bg-gradient-to-br from-white/90 to-stone-light/90 backdrop-blur-sm rounded-3xl shadow-xl border border-stone/10">
            <div className="text-6xl mb-6">💡</div>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              What Drives Me
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              I'm passionate about creating digital experiences that make a
              difference. Whether it's building scalable architectures,
              optimizing performance, or mentoring fellow developers, I believe
              in continuous learning and pushing the boundaries of what's
              possible with code.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Based in beautiful Peru 🇵🇪, I work with clients worldwide to
              bring their ideas to life through clean code, thoughtful design,
              and innovative solutions.
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <motion.button
                onClick={() => {
                  const element = document.getElementById('projects');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3 bg-terracotta text-white rounded-full font-medium hover:bg-terracotta-dark transition-colors shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View My Work
              </motion.button>
              <motion.button
                onClick={() => {
                  const element = document.getElementById('contact');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3 border-2 border-terracotta text-terracotta rounded-full font-medium hover:bg-terracotta hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Let's Connect
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Skills Preview */}
        <motion.div
          className="mt-16 md:mt-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Core Technologies
            </h3>
            <p className="text-muted-foreground">
              Tools and technologies I use to build amazing products
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {[
              'React',
              'Next.js',
              'TypeScript',
              'Node.js',
              'Tailwind CSS',
              'PostgreSQL',
              'Docker',
              'AWS',
              'GraphQL',
              'MongoDB',
              'Redis',
              'Kubernetes',
            ].map((tech, index) => (
              <motion.span
                key={tech}
                className="px-4 py-2 bg-white text-foreground font-medium rounded-full shadow-md border border-stone/10 hover:shadow-lg hover:scale-105 transition-all duration-200"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{
                  y: -5,
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
