'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import type { Project } from '@/app/data/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
  onViewDetails: (project: Project) => void;
}

export default function ProjectCard({ project, index, onViewDetails }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const colorClasses = {
    terracotta: {
      bg: 'bg-terracotta',
      text: 'text-terracotta',
      border: 'border-terracotta',
      gradient: 'from-terracotta/20 to-transparent',
    },
    'sky-blue': {
      bg: 'bg-sky-blue',
      text: 'text-sky-blue',
      border: 'border-sky-blue',
      gradient: 'from-sky-blue/20 to-transparent',
    },
    'weaving-pink': {
      bg: 'bg-weaving-pink',
      text: 'text-weaving-pink',
      border: 'border-weaving-pink',
      gradient: 'from-weaving-pink/20 to-transparent',
    },
    'weaving-purple': {
      bg: 'bg-weaving-purple',
      text: 'text-weaving-purple',
      border: 'border-weaving-purple',
      gradient: 'from-weaving-purple/20 to-transparent',
    },
    'weaving-yellow': {
      bg: 'bg-weaving-yellow',
      text: 'text-weaving-yellow',
      border: 'border-weaving-yellow',
      gradient: 'from-weaving-yellow/20 to-transparent',
    },
  };

  const colors = colorClasses[project.color];

  return (
    <motion.div
      className="group relative bg-card-bg rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-stone/10"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Image Container with Gradient Overlay */}
      <div className="relative h-56 overflow-hidden bg-background">
        {/* Placeholder gradient instead of image */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-60`}
          animate={{
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.6 }}
        />

        {/* Project Icon/Emoji */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="text-8xl opacity-20"
            animate={{
              scale: isHovered ? 1.2 : 1,
              rotate: isHovered ? 5 : 0,
            }}
            transition={{ duration: 0.4 }}
          >
            {getCategoryIcon(project.category)}
          </motion.div>
        </div>

        {/* Year Badge */}
        <div className="absolute top-4 right-4">
          <div className={`px-3 py-1 ${colors.bg} text-white text-sm font-semibold rounded-full shadow-lg`}>
            {project.year}
          </div>
        </div>

        {/* Hover Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute bottom-4 left-4 right-4">
            <motion.button
              onClick={() => onViewDetails(project)}
              className="w-full py-2 bg-card-bg text-foreground rounded-full font-medium flex items-center justify-center gap-2 hover:bg-muted transition-colors border border-stone/10"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              View Details
              <svg
                className="w-4 h-4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6 bg-card-bg">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tags.slice(0, 3).map((tag, idx) => (
            <span
              key={tag}
              className={`px-2 py-1 text-xs font-medium ${colors.text} bg-${colors.bg}/10 rounded-full`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:${colors.text} transition-colors">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Role */}
        {project.role && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <svg
              className="w-4 h-4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>{project.role}</span>
          </div>
        )}

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs text-foreground bg-muted rounded border border-stone/20"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2 py-1 text-xs text-muted-foreground">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Links (if available) */}
        {project.links && (
          <div className="flex gap-3 mt-4 pt-4 border-t border-stone/10">
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-1 text-sm ${colors.text} hover:underline`}
                onClick={(e) => e.stopPropagation()}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Live Demo
              </a>
            )}
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-1 text-sm ${colors.text} hover:underline`}
                onClick={(e) => e.stopPropagation()}
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function getCategoryIcon(category: Project['category']): string {
  const icons = {
    web: '🌐',
    mobile: '📱',
    ai: '🤖',
    saas: '💼',
    ecommerce: '🛒',
  };
  return icons[category];
}
