'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, memo } from 'react';
import { useTranslations } from 'next-intl';
import ProjectCard from './ProjectCard';
import { projects, projectCategories, type Project } from '@/app/data/projects';
import { useMousePosition } from '../hooks/useMousePosition';

const ProjectsSection = memo(function ProjectsSection() {
  const t = useTranslations('projects');
  const sectionRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { mousePosition, cursorPosition } = useMousePosition(32);

  const filteredProjects =
    selectedCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-gradient-to-b from-stone-light to-background overflow-hidden"
      style={{ perspective: '2000px' }}
    >
      {/* 3D Cube Grid Background */}
      <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
        {[...Array(5)].map((_, i) => {
          const cubeX = ((i * 157) % 85) + 7;
          const cubeY = ((i * 229) % 80) + 10;
          const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
          const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 1080;
          const distanceX = Math.abs(cursorPosition.x - (windowWidth * cubeX / 100));
          const distanceY = Math.abs(cursorPosition.y - (windowHeight * cubeY / 100));
          const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
          const maxDistance = 300;
          const influence = Math.max(0, 1 - distance / maxDistance);

          return (
            <motion.div
              key={`projects-cube-${i}`}
              className="absolute"
              style={{
                left: `${cubeX}%`,
                top: `${cubeY}%`,
                width: `${75 + (i * 21) % 95}px`,
                height: `${75 + (i * 21) % 95}px`,
                transformStyle: 'preserve-3d',
              }}
              animate={{
                x: mousePosition.x * influence * 100,
                y: mousePosition.y * influence * 100,
                rotateX: [0, 360],
                rotateY: [0, -360],
                rotateZ: mousePosition.x * influence * 45,
              }}
              transition={{
                x: { type: 'spring', stiffness: 50, damping: 20 },
                y: { type: 'spring', stiffness: 50, damping: 20 },
                rotateX: { duration: 25 + i * 2, repeat: Infinity, ease: 'linear' },
                rotateY: { duration: 20 + i * 3, repeat: Infinity, ease: 'linear' },
                rotateZ: { type: 'spring', stiffness: 50, damping: 20 },
              }}
            >
            <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
              {['front', 'back', 'right', 'left', 'top', 'bottom'].map((face) => {
                const size = 75 + (i * 21) % 95;
                const transforms = {
                  front: `translateZ(${size / 2}px)`,
                  back: `translateZ(-${size / 2}px) rotateY(180deg)`,
                  right: `rotateY(90deg) translateZ(${size / 2}px)`,
                  left: `rotateY(-90deg) translateZ(${size / 2}px)`,
                  top: `rotateX(90deg) translateZ(${size / 2}px)`,
                  bottom: `rotateX(-90deg) translateZ(${size / 2}px)`,
                };
                const colors = [
                  'from-weaving-pink/15 to-transparent',
                  'from-weaving-purple/15 to-transparent',
                  'from-sky-blue/15 to-transparent',
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
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-block px-4 py-2 bg-weaving-pink/10 text-weaving-pink font-semibold rounded-full mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            {t('badge')}
          </motion.span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            {t('title')}{' '}
            <span className="bg-gradient-to-r from-weaving-pink via-sky-blue to-weaving-purple bg-clip-text text-transparent">
              {t('titleHighlight')}
            </span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('subtitle')}
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
          {projectCategories.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-weaving-pink text-white shadow-lg shadow-weaving-pink/30'
                  : 'bg-white text-foreground border border-stone/20 hover:border-weaving-pink hover:text-weaving-pink'
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="mr-2">{category.icon}</span>
              {t(`categories.${category.id}`)}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Count */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          key={selectedCategory}
        >
          <p className="text-sm text-muted-foreground">
            {t('showing')} <span className="font-semibold text-foreground">{filteredProjects.length}</span> {filteredProjects.length === 1 ? t('project') : t('projects')}
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
              >
                <ProjectCard
                  project={project}
                  index={index}
                  onViewDetails={setSelectedProject}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-foreground mb-2">
              {t('emptyState.title')}
            </h3>
            <p className="text-muted-foreground">
              {t('emptyState.subtitle')}
            </p>
          </motion.div>
        )}

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {[
            { value: projects.length, label: t('stats.totalProjects'), icon: '🎯' },
            { value: projects.filter(p => p.client).length, label: t('stats.clientsServed'), icon: '🤝' },
            { value: '100%', label: t('stats.successRate'), icon: '✅' },
            { value: '3+', label: t('stats.yearsBuilding'), icon: '🚀' },
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
              <div className="text-3xl font-bold text-weaving-pink mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
});

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const t = useTranslations('projects');
  const colorClasses = {
    terracotta: 'bg-terracotta',
    'sky-blue': 'bg-sky-blue',
    'weaving-pink': 'bg-weaving-pink',
    'weaving-purple': 'bg-weaving-purple',
    'weaving-yellow': 'bg-weaving-yellow',
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25 }}
        >
          {/* Header with gradient */}
          <div className={`relative h-64 bg-gradient-to-br ${colorClasses[project.color]} p-8 text-white`}>
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="relative z-10 h-full flex flex-col justify-end">
              <div className="text-sm font-semibold mb-2 opacity-90">
                {project.year} • {project.role}
              </div>
              <h2 className="text-4xl font-bold mb-2">{project.title}</h2>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-white/20 backdrop-blur-sm text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Description */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                {t('modal.aboutProject')}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {project.longDescription}
              </p>
            </div>

            {/* Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  {t('modal.keyHighlights')}
                </h3>
                <ul className="space-y-3">
                  {project.highlights.map((highlight, idx) => (
                    <motion.li
                      key={idx}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <div className={`w-6 h-6 rounded-full ${colorClasses[project.color]} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-muted-foreground">{highlight}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}

            {/* Technologies */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                {t('modal.technologiesUsed')}
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-stone-light text-foreground rounded-lg border border-stone/20 font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            {project.links && (
              <div className="flex flex-wrap gap-4 pt-6 border-t border-stone/10">
                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-6 py-3 ${colorClasses[project.color]} text-white rounded-full font-medium hover:opacity-90 transition-opacity flex items-center gap-2`}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    {t('modal.viewLiveDemo')}
                  </a>
                )}
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 border-2 border-stone/20 text-foreground rounded-full font-medium hover:border-foreground transition-colors flex items-center gap-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    {t('modal.viewOnGithub')}
                  </a>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}

export default ProjectsSection;
