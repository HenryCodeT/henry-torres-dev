'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface MountainProps {
  className?: string;
}

export default function Mountain({ className = '' }: MountainProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isNight, setIsNight] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now);
      const hour = now.getHours();
      setIsNight(hour >= 19 || hour < 6);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  return (
    <svg
      viewBox="0 0 800 600"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Gradients for mountain layers */}
        <linearGradient id="peakGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(280, 50%, 45%)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="hsl(280, 50%, 35%)" stopOpacity="0.9" />
        </linearGradient>

        <linearGradient id="summitGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(200, 70%, 50%)" stopOpacity="0.85" />
          <stop offset="100%" stopColor="hsl(200, 70%, 40%)" stopOpacity="0.85" />
        </linearGradient>

        <linearGradient id="midGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(340, 65%, 55%)" stopOpacity="0.8" />
          <stop offset="100%" stopColor="hsl(340, 65%, 45%)" stopOpacity="0.8" />
        </linearGradient>

        <linearGradient id="baseGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(45, 90%, 60%)" stopOpacity="0.75" />
          <stop offset="100%" stopColor="hsl(45, 90%, 50%)" stopOpacity="0.75" />
        </linearGradient>

        <linearGradient id="foundationGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(14, 45%, 45%)" stopOpacity="0.7" />
          <stop offset="100%" stopColor="hsl(14, 45%, 35%)" stopOpacity="0.7" />
        </linearGradient>

        {/* Sky gradients */}
        <linearGradient id="daySkyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(200, 70%, 85%)" />
          <stop offset="100%" stopColor="hsl(200, 70%, 95%)" />
        </linearGradient>

        <linearGradient id="nightSkyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(230, 45%, 15%)" />
          <stop offset="100%" stopColor="hsl(230, 40%, 25%)" />
        </linearGradient>

        {/* Shadow filter */}
        <filter id="dropShadow">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
          <feOffset dx="2" dy="2" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.3" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background sky with gradient */}
      <motion.rect
        width="800"
        height="600"
        fill={isNight ? "url(#nightSkyGradient)" : "url(#daySkyGradient)"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Sun or Moon */}
      {isNight ? (
        <>
          {/* Moon */}
          <motion.circle
            cx="700"
            cy="100"
            r="40"
            fill="hsl(50, 20%, 90%)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.9 }}
            transition={{ duration: 1, delay: 0.3 }}
          />
          {/* Moon crater */}
          <motion.circle
            cx="690"
            cy="95"
            r="8"
            fill="hsl(50, 20%, 80%)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.5 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <motion.circle
            cx="710"
            cy="110"
            r="6"
            fill="hsl(50, 20%, 80%)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.5 }}
            transition={{ duration: 1, delay: 0.6 }}
          />
          {/* Stars */}
          {[
            { cx: 100, cy: 50, delay: 0.7 },
            { cx: 200, cy: 80, delay: 0.8 },
            { cx: 300, cy: 60, delay: 0.9 },
            { cx: 500, cy: 70, delay: 1.0 },
            { cx: 600, cy: 50, delay: 1.1 },
            { cx: 150, cy: 150, delay: 1.2 },
            { cx: 550, cy: 180, delay: 1.3 }
          ].map((star, i) => (
            <motion.circle
              key={`star-${i}`}
              cx={star.cx}
              cy={star.cy}
              r="2"
              fill="white"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 2,
                delay: star.delay,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          ))}
        </>
      ) : (
        /* Sun */
        <motion.circle
          cx="700"
          cy="100"
          r="40"
          fill="hsl(45, 100%, 65%)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 1, delay: 0.3 }}
        />
      )}

      {/* Clouds */}
      <motion.g
        initial={{ x: -100, opacity: 0 }}
        animate={{
          x: [0, 30, 0],
          y: [0, -10, 0],
          opacity: isNight ? [0.2, 0.3, 0.2] : [0.4, 0.5, 0.4]
        }}
        transition={{
          duration: 4,
          delay: 0.5,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        <ellipse cx="150" cy="120" rx="50" ry="25" fill={isNight ? "hsl(230, 20%, 40%)" : "white"} />
        <ellipse cx="180" cy="115" rx="40" ry="20" fill={isNight ? "hsl(230, 20%, 40%)" : "white"} />
        <ellipse cx="120" cy="125" rx="35" ry="18" fill={isNight ? "hsl(230, 20%, 40%)" : "white"} />
      </motion.g>

      <motion.g
        initial={{ x: 100, opacity: 0 }}
        animate={{
          x: [0, -40, 0],
          y: [0, 8, 0],
          opacity: isNight ? [0.15, 0.25, 0.15] : [0.3, 0.4, 0.3]
        }}
        transition={{
          duration: 5,
          delay: 0.7,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        <ellipse cx="600" cy="150" rx="60" ry="30" fill={isNight ? "hsl(230, 20%, 40%)" : "white"} />
        <ellipse cx="640" cy="145" rx="45" ry="22" fill={isNight ? "hsl(230, 20%, 40%)" : "white"} />
      </motion.g>

      {/* Mountain Layers - Bottom to Top */}

      {/* Foundation Layer (triangle base) - Level 1 */}
      <motion.path
        d="M 100 600 L 400 200 L 700 600 Z"
        fill="url(#foundationGradient)"
        stroke="hsl(14, 45%, 30%)"
        strokeWidth="2"
        filter="url(#dropShadow)"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />

      {/* Base Layer (trapezoid) - Level 2 */}
      <motion.path
        d="M 175 500 L 250 400 L 550 400 L 625 500 Z"
        fill="url(#baseGradient)"
        stroke="hsl(45, 90%, 45%)"
        strokeWidth="2"
        filter="url(#dropShadow)"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      />

      {/* Mid-Mountain Layer (trapezoid) - Level 3 */}
      <motion.path
        d="M 250 400 L 275 330 L 525 330 L 550 400 Z"
        fill="url(#midGradient)"
        stroke="hsl(340, 65%, 40%)"
        strokeWidth="2"
        filter="url(#dropShadow)"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      />

      {/* Summit Layer (trapezoid) - Level 4 */}
      <motion.path
        d="M 275 330 L 325 280 L 475 280 L 525 330 Z"
        fill="url(#summitGradient)"
        stroke="hsl(200, 70%, 35%)"
        strokeWidth="2"
        filter="url(#dropShadow)"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      />

      {/* Peak (trapezoid) - Level 5 */}
      <motion.path
        d="M 325 280 L 380 200 L 420 200 L 475 280 Z"
        fill="url(#peakGradient)"
        stroke="hsl(280, 50%, 30%)"
        strokeWidth="2"
        filter="url(#dropShadow)"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      />

      {/* Snow cap on peak */}
      <motion.path
        d="M 375 200 L 400 180 L 425 200 Z"
        fill="white"
        opacity="0.9"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.9 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        style={{ transformOrigin: '400px 205px' }}
      />

      {/* Decorative elements */}
      {/* Trees on foundation */}
      {[150, 200, 300, 500, 600, 650].map((x, i) => (
        <motion.g
          key={`tree-${i}`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 0.4, delay: 1.5 + i * 0.1 }}
          style={{ transformOrigin: `${x}px 580px` }}
        >
          {/* Tree trunk */}
          <rect
            x={x - 3}
            y={550}
            width="6"
            height="30"
            fill="hsl(30, 30%, 30%)"
          />
          {/* Tree foliage */}
          <polygon
            points={`${x},530 ${x - 15},550 ${x + 15},550`}
            fill="hsl(150, 45%, 35%)"
          />
          <polygon
            points={`${x},540 ${x - 12},555 ${x + 12},555`}
            fill="hsl(150, 45%, 40%)"
          />
        </motion.g>
      ))}

      {/* Flag at peak */}
      <motion.g
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: 'spring',
          stiffness: 200,
          delay: 1.5,
        }}
        style={{ transformOrigin: '400px 180px' }}
      >
        {/* Flag pole */}
        <line
          x1="400"
          y1="180"
          x2="400"
          y2="130"
          stroke="hsl(0, 0%, 30%)"
          strokeWidth="3"
        />
        {/* Flag */}
        <motion.path
          d="M 400 130 L 450 145 L 400 160 Z"
          fill="hsl(14, 45%, 45%)"
          animate={{ d: ['M 400 130 L 450 145 L 400 160 Z', 'M 400 130 L 475 145 L 400 160 Z', 'M 400 130 L 450 145 L 400 160 Z'] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.g>

      {/* Time display in top-right corner */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {/* Background for time */}
        <rect
          x="620"
          y="15"
          width="165"
          height="40"
          rx="8"
          fill={isNight ? "hsl(230, 40%, 20%)" : "hsl(200, 60%, 90%)"}
          opacity="0.9"
        />
        {/* Time text */}
        <text
          x="702"
          y="42"
          fontFamily="monospace"
          fontSize="18"
          fontWeight="bold"
          fill={isNight ? "hsl(50, 80%, 80%)" : "hsl(200, 70%, 30%)"}
          textAnchor="middle"
        >
          {formatTime(currentTime)}
        </text>
      </motion.g>
    </svg>
  );
}
