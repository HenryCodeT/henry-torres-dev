'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, memo } from 'react';
import { useTranslations } from 'next-intl';
import Mountain from './Mountain';
import { skillMountain, skillCategories, type Skill } from '@/app/data/skills';
import { useMousePosition } from '../hooks/useMousePosition';

const SkillsSection = memo(function SkillsSection() {
  const t = useTranslations('skills');
  const sectionRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);
  const { mousePosition, cursorPosition } = useMousePosition(32);

  const categories = [
    { id: null, label: t('categories.all'), icon: '🗻' },
    { id: 'frontend', label: t('categories.frontend'), icon: '⚛️' },
    { id: 'backend', label: t('categories.backend'), icon: '🔧' },
    { id: 'devops', label: t('categories.devops'), icon: '🚀' },
    { id: 'ai', label: t('categories.ai'), icon: '🤖' },
  ];

  const filterSkills = (skills: Skill[]) => {
    if (!selectedCategory) return skills;
    const categorySkills = skillCategories[selectedCategory as keyof typeof skillCategories];
    return skills.filter(skill => categorySkills.includes(skill.name));
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-gradient-to-b from-background to-stone-light overflow-hidden"
      style={{ perspective: '2000px' }}
    >
      {/* 3D Geometric Background */}
      <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`skills-shape-${i}`}
            className="absolute"
            style={{
              left: `${((i * 173) % 85) + 5}%`,
              top: `${((i * 241) % 75) + 10}%`,
              width: `${70 + (i * 19) % 90}px`,
              height: `${70 + (i * 19) % 90}px`,
              transformStyle: 'preserve-3d',
            }}
            animate={{
              rotateX: i % 2 === 0 ? [0, 360] : [360, 0],
              rotateY: [0, 360],
              z: [0, 50, 0],
            }}
            transition={{
              rotateX: { duration: 22 + i * 2, repeat: Infinity, ease: 'linear' },
              rotateY: { duration: 18 + i * 3, repeat: Infinity, ease: 'linear' },
              z: { duration: 6 + i, repeat: Infinity, ease: 'easeInOut' },
            }}
          >
            {/* All Cubes */}
            <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
              {['front', 'back', 'right', 'left', 'top', 'bottom'].map((face) => {
                const size = 70 + (i * 19) % 90;
                const transforms = {
                  front: `translateZ(${size / 2}px)`,
                  back: `translateZ(-${size / 2}px) rotateY(180deg)`,
                  right: `rotateY(90deg) translateZ(${size / 2}px)`,
                  left: `rotateY(-90deg) translateZ(${size / 2}px)`,
                  top: `rotateX(90deg) translateZ(${size / 2}px)`,
                  bottom: `rotateX(-90deg) translateZ(${size / 2}px)`,
                };
                const colors = [
                  'from-sky-blue/15 to-transparent',
                  'from-weaving-pink/15 to-transparent',
                  'from-weaving-purple/15 to-transparent',
                  'from-terracotta/15 to-transparent',
                  'from-weaving-yellow/15 to-transparent',
                ];
                return (
                  <div
                    key={face}
                    className={`absolute inset-0 bg-gradient-to-br ${colors[i % 5]} border border-white/30`}
                    style={{
                      transform: transforms[face as keyof typeof transforms],
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    }}
                  />
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-block px-4 py-2 bg-sky-blue/10 text-sky-blue font-semibold rounded-full mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            {t('badge')}
          </motion.span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            <span className="bg-gradient-to-r from-sky-blue via-weaving-pink to-weaving-purple bg-clip-text text-transparent">
              {t('title')}
            </span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('description')}
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.id || 'all'}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-sky-blue text-white shadow-lg shadow-sky-blue/30'
                  : 'bg-stone-light text-foreground border border-stone/20 hover:border-sky-blue hover:text-sky-blue'
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="mr-2">{category.icon}</span>
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Mountain Visualization */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Mountain SVG */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <div className="relative">
              <Mountain className="w-full h-auto drop-shadow-2xl" />

              {/* Legend */}
              <motion.div
                className="mt-6 p-6 bg-stone-light backdrop-blur-sm rounded-2xl shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-2xl">🗻</span>
                  {t('legend.title')}
                </h3>
                <div className="space-y-2 text-sm">
                  {skillMountain.map((layer, index) => (
                    <div key={layer.name} className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full bg-${layer.color}`} />
                      <span className="font-medium text-foreground">{layer.name}:</span>
                      <span className="text-muted-foreground text-xs">{layer.elevation}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Skills Layers */}
          <motion.div
            className="order-1 lg:order-2 space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {skillMountain.map((layer, layerIndex) => {
              const filteredSkills = filterSkills(layer.skills);
              if (filteredSkills.length === 0 && selectedCategory) return null;

              return (
                <SkillLayer
                  key={layer.name}
                  layer={{ ...layer, skills: filteredSkills }}
                  index={layerIndex}
                  onSkillHover={setHoveredSkill}
                />
              );
            })}
          </motion.div>
        </div>

        {/* Skill Detail Modal */}
        {hoveredSkill && (
          <motion.div
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 max-w-md w-full mx-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <div className="bg-white rounded-2xl shadow-2xl p-6 border border-stone/10">
              <div className="flex items-start gap-4">
                <div className="text-4xl">{hoveredSkill.icon}</div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-foreground mb-1">
                    {hoveredSkill.name}
                  </h4>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i < hoveredSkill.level
                              ? 'bg-sky-blue'
                              : 'bg-stone-light'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Level {hoveredSkill.level}/5
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {hoveredSkill.description}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Stats Footer */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {[
            { value: skillMountain.reduce((sum, layer) => sum + layer.skills.length, 0), label: t('stats.technologies'), icon: '⚡' },
            { value: skillMountain.filter(layer => layer.skills.some(s => s.level >= 4)).length, label: t('stats.expertAreas'), icon: '🎯' },
            { value: '3+', label: t('stats.yearsLearning'), icon: '📚' },
            { value: '100%', label: t('stats.passion'), icon: '❤️' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-sky-blue mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
});

const SkillLayer = memo(function SkillLayer({
  layer,
  index,
  onSkillHover,
}: {
  layer: typeof skillMountain[0];
  index: number;
  onSkillHover: (skill: Skill | null) => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const colorClasses = {
    terracotta: 'bg-terracotta',
    'sky-blue': 'bg-sky-blue',
    'weaving-pink': 'bg-weaving-pink',
    'weaving-purple': 'bg-weaving-purple',
    'weaving-yellow': 'bg-weaving-yellow',
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative"
    >
      {/* Layer Header */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`w-3 h-3 rounded-full ${colorClasses[layer.color]}`}
        />
        <div>
          <h3 className="text-xl font-bold text-foreground">{layer.name}</h3>
          <p className="text-sm text-muted-foreground">{layer.elevation}</p>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="flex flex-wrap gap-3">
        {layer.skills.map((skill, skillIndex) => (
          <motion.button
            key={skill.name}
            className="group relative px-4 py-2.5 bg-stone-light rounded-full border-2 border-stone/10 hover:border-sky-blue transition-all duration-300 shadow-sm hover:shadow-md"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
            }
            transition={{
              duration: 0.3,
              delay: index * 0.15 + skillIndex * 0.05,
            }}
            whileHover={{ scale: 1.05, y: -2 }}
            onHoverStart={() => onSkillHover(skill)}
            onHoverEnd={() => onSkillHover(null)}
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">{skill.icon}</span>
              <span className="font-medium text-foreground">{skill.name}</span>
              <div className="flex gap-0.5 ml-1">
                {[...Array(skill.level)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 h-1 rounded-full bg-sky-blue"
                  />
                ))}
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
});

export default SkillsSection;
