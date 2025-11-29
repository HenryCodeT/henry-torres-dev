'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, memo } from 'react';
import { useTranslations } from 'next-intl';
import TimelineItem from './TimelineItem';
import { timelineData, aboutStats } from '@/app/data/timeline';
import { useMousePosition } from '../hooks/useMousePosition';

const AboutSection = memo(function AboutSection() {
  const t = useTranslations('about');
  const sectionRef = useRef(null);
  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: true, margin: '-100px' });
  const { mousePosition, cursorPosition } = useMousePosition(32);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-gradient-to-b from-stone-light to-background overflow-hidden"
      style={{ perspective: '2000px' }}
    >
      {/* 3D Cube Background */}
      <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
        {[...Array(4)].map((_, i) => {
          const cubeX = ((i * 137) % 80) + 10;
          const cubeY = ((i * 271) % 70) + 15;
          const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
          const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 1080;
          const distanceX = Math.abs(cursorPosition.x - (windowWidth * cubeX / 100));
          const distanceY = Math.abs(cursorPosition.y - (windowHeight * cubeY / 100));
          const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
          const maxDistance = 300;
          const influence = Math.max(0, 1 - distance / maxDistance);

          return (
            <motion.div
              key={`about-cube-${i}`}
              className="absolute"
              style={{
                left: `${cubeX}%`,
                top: `${cubeY}%`,
                width: `${80 + (i * 23) % 100}px`,
                height: `${80 + (i * 23) % 100}px`,
                transformStyle: 'preserve-3d',
              }}
              animate={{
                x: mousePosition.x * influence * 100,
                y: mousePosition.y * influence * 100,
                rotateX: [0, 360],
                rotateY: [0, 360],
                rotateZ: mousePosition.x * influence * 45,
              }}
              transition={{
                x: { type: 'spring', stiffness: 50, damping: 20 },
                y: { type: 'spring', stiffness: 50, damping: 20 },
                rotateX: { duration: 20 + i * 3, repeat: Infinity, ease: 'linear' },
                rotateY: { duration: 25 + i * 2, repeat: Infinity, ease: 'linear' },
                rotateZ: { type: 'spring', stiffness: 50, damping: 20 },
              }}
            >
              <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
                {/* Cube faces with gradient colors */}
                {['front', 'back', 'right', 'left', 'top', 'bottom'].map((face) => {
                  const transforms = {
                    front: `translateZ(${(80 + (i * 23) % 100) / 2}px)`,
                    back: `translateZ(-${(80 + (i * 23) % 100) / 2}px) rotateY(180deg)`,
                    right: `rotateY(90deg) translateZ(${(80 + (i * 23) % 100) / 2}px)`,
                    left: `rotateY(-90deg) translateZ(${(80 + (i * 23) % 100) / 2}px)`,
                    top: `rotateX(90deg) translateZ(${(80 + (i * 23) % 100) / 2}px)`,
                    bottom: `rotateX(-90deg) translateZ(${(80 + (i * 23) % 100) / 2}px)`,
                  };
                  const colors = [
                    'from-terracotta/15 to-transparent',
                    'from-sky-blue/15 to-transparent',
                    'from-weaving-pink/15 to-transparent',
                  ];
                  return (
                    <div
                      key={face}
                      className={`absolute inset-0 bg-gradient-to-br ${colors[i % 3]} backdrop-blur-sm border border-white/5 rounded-lg`}
                      style={{ transform: transforms[face as keyof typeof transforms] }}
                    />
                  );
                })}
              </div>
            </motion.div>
          );
        })}
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
            {t('badge')}
          </motion.span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            {t('title')}{' '}
            <span className="bg-gradient-to-r from-terracotta via-weaving-pink to-sky-blue bg-clip-text text-transparent">
              {t('titleHighlight')}
            </span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          ref={statsRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mb-20 md:mb-32 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isStatsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          {aboutStats.map((stat, index) => (
            <motion.div
              key={stat.key}
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
                {t(`stats.${stat.key}`)}
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
          <div className="p-8 md:p-12 bg-stone-light/90 from-white/90 to-stone-light/90 backdrop-blur-sm rounded-3xl shadow-xl border border-stone/10">
            <div className="text-6xl mb-6">{t('personalNote.icon')}</div>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              {t('personalNote.title')}
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              {t('personalNote.paragraph1')}
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('personalNote.paragraph2')}
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
                {t('personalNote.cta.viewWork')}
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
                {t('personalNote.cta.letsConnect')}
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
              {t('skills.title')}
            </h3>
            <p className="text-muted-foreground">
              {t('skills.subtitle')}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {[
              'React',
              'Next.js',
              'TypeScript',
              'JavaScript',
              'Redux',
              'Tailwind CSS',
              'REST APIs',
              'Node.js',
              'SQL',
              '.NET',
              'LINQ',
              'Azure DevOps',
              'GitHub Actions',
              'Prisma',
              'MongoDB',
              'PostgreSQL',
              'Jest',
              'Python',
              'Vercel',
              'SCRUM / Agile'
            ].map((tech, index) => (
              <motion.span
                key={tech}
                className="px-4 py-2 bg-stone-light text-foreground font-medium rounded-full shadow-md border border-stone/10 hover:shadow-lg hover:scale-105 transition-all duration-200"
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
});

export default AboutSection;
