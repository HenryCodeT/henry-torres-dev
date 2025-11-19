'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import type { TimelineItem as TimelineItemType } from '@/app/data/timeline';

interface TimelineItemProps {
  item: TimelineItemType;
  index: number;
}

export default function TimelineItem({ item, index }: TimelineItemProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const isEven = index % 2 === 0;

  const colorClasses = {
    terracotta: {
      bg: 'bg-terracotta',
      text: 'text-terracotta',
      border: 'border-terracotta',
      glow: 'shadow-terracotta/20',
    },
    'sky-blue': {
      bg: 'bg-sky-blue',
      text: 'text-sky-blue',
      border: 'border-sky-blue',
      glow: 'shadow-sky-blue/20',
    },
    'weaving-pink': {
      bg: 'bg-weaving-pink',
      text: 'text-weaving-pink',
      border: 'border-weaving-pink',
      glow: 'shadow-weaving-pink/20',
    },
    'weaving-purple': {
      bg: 'bg-weaving-purple',
      text: 'text-weaving-purple',
      border: 'border-weaving-purple',
      glow: 'shadow-weaving-purple/20',
    },
  };

  const colors = colorClasses[item.color];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative"
    >
      {/* Desktop Layout (side by side) */}
      <div className="hidden md:grid md:grid-cols-2 gap-8 items-center">
        {/* Left Side */}
        {isEven ? (
          <>
            {/* Content */}
            <motion.div
              className="text-right"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.6, delay: index * 0.2 + 0.2 }}
            >
              <TimelineContent item={item} colors={colors} align="right" />
            </motion.div>

            {/* Timeline Center */}
            <div className="relative flex justify-start">
              <TimelineIcon item={item} colors={colors} />
            </div>
          </>
        ) : (
          <>
            {/* Timeline Center */}
            <div className="relative flex justify-end">
              <TimelineIcon item={item} colors={colors} />
            </div>

            {/* Content */}
            <motion.div
              className="text-left"
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.6, delay: index * 0.2 + 0.2 }}
            >
              <TimelineContent item={item} colors={colors} align="left" />
            </motion.div>
          </>
        )}
      </div>

      {/* Mobile Layout (single column) */}
      <div className="md:hidden flex gap-4">
        <div className="flex flex-col items-center">
          <TimelineIcon item={item} colors={colors} />
        </div>
        <div className="flex-1 pb-8">
          <TimelineContent item={item} colors={colors} align="left" />
        </div>
      </div>
    </motion.div>
  );
}

function TimelineIcon({
  item,
  colors,
}: {
  item: TimelineItemType;
  colors: any;
}) {
  return (
    <motion.div
      className="relative z-10"
      whileHover={{ scale: 1.2, rotate: 10 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {/* Icon Circle */}
      <div
        className={`w-16 h-16 rounded-full ${colors.bg} flex items-center justify-center text-3xl shadow-lg ${colors.glow}`}
      >
        {item.icon}
      </div>

      {/* Year Badge */}
      <motion.div
        className={`absolute -bottom-6 left-1/2 -translate-x-1/2 px-3 py-1 ${colors.bg} text-white text-sm font-bold rounded-full shadow-md whitespace-nowrap`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {item.year}
      </motion.div>
    </motion.div>
  );
}

function TimelineContent({
  item,
  colors,
  align,
}: {
  item: TimelineItemType;
  colors: any;
  align: 'left' | 'right';
}) {
  return (
    <div
      className={`space-y-4 ${align === 'right' ? 'items-end' : 'items-start'}`}
    >
      {/* Title and Company */}
      <div>
        <h3
          className={`text-2xl font-bold ${colors.text} mb-1 ${align === 'right' ? 'text-right' : 'text-left'}`}
        >
          {item.title}
        </h3>
        <p
          className={`text-lg font-medium text-foreground ${align === 'right' ? 'text-right' : 'text-left'}`}
        >
          {item.company}
        </p>
        <p
          className={`text-sm text-muted-foreground flex items-center gap-1 ${align === 'right' ? 'justify-end' : 'justify-start'}`}
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
            <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {item.location}
        </p>
      </div>

      {/* Description */}
      <p
        className={`text-muted-foreground ${align === 'right' ? 'text-right' : 'text-left'}`}
      >
        {item.description}
      </p>

      {/* Achievements */}
      <div className="space-y-2">
        <h4
          className={`font-semibold text-foreground ${align === 'right' ? 'text-right' : 'text-left'}`}
        >
          Key Achievements:
        </h4>
        <ul
          className={`space-y-1 ${align === 'right' ? 'text-right' : 'text-left'}`}
        >
          {item.achievements.map((achievement, idx) => (
            <motion.li
              key={idx}
              className={`text-sm text-muted-foreground flex items-start gap-2 ${align === 'right' ? 'flex-row-reverse' : 'flex-row'}`}
              initial={{ opacity: 0, x: align === 'right' ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <span className={`${colors.text} mt-1 flex-shrink-0`}>•</span>
              <span>{achievement}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Technologies */}
      <div
        className={`flex flex-wrap gap-2 ${align === 'right' ? 'justify-end' : 'justify-start'}`}
      >
        {item.technologies.map((tech, idx) => (
          <motion.span
            key={tech}
            className={`px-3 py-1 text-xs font-medium ${colors.text} bg-white border ${colors.border} rounded-full`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + idx * 0.05 }}
            whileHover={{ scale: 1.1 }}
          >
            {tech}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
