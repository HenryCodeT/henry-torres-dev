'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, memo } from 'react';
import { useTranslations } from 'next-intl';
import { services, workProcess, whyChooseMe, type Service } from '@/app/data/services';
import { useMousePosition } from '../hooks/useMousePosition';

const ServicesSection = memo(function ServicesSection() {
  const t = useTranslations('services');
  const sectionRef = useRef(null);
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const { mousePosition, cursorPosition } = useMousePosition(32);

  const handleContact = () => {
    const element = document.getElementById('contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-gradient-to-b from-background to-stone-light overflow-hidden"
      style={{ perspective: '2000px' }}
    >
      {/* 3D Cube Background */}
      <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
        {[...Array(5)].map((_, i) => {
          const cubeX = ((i * 193) % 88) + 6;
          const cubeY = ((i * 257) % 82) + 9;
          const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
          const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 1080;
          const distanceX = Math.abs(cursorPosition.x - (windowWidth * cubeX / 100));
          const distanceY = Math.abs(cursorPosition.y - (windowHeight * cubeY / 100));
          const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
          const maxDistance = 300;
          const influence = Math.max(0, 1 - distance / maxDistance);

          return (
            <motion.div
              key={`services-shape-${i}`}
              className="absolute"
              style={{
                left: `${cubeX}%`,
                top: `${cubeY}%`,
                width: `${65 + (i * 25) % 100}px`,
                height: `${65 + (i * 25) % 100}px`,
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
                rotateX: { duration: 28 + i * 2, repeat: Infinity, ease: 'linear' },
                rotateY: { duration: 24 + i * 3, repeat: Infinity, ease: 'linear' },
                rotateZ: { type: 'spring', stiffness: 50, damping: 20 },
              }}
            >
              {/* All Cubes */}
              <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
                {['front', 'back', 'right', 'left', 'top', 'bottom'].map((face) => {
                  const size = 65 + (i * 25) % 100;
                  const transforms = {
                    front: `translateZ(${size / 2}px)`,
                    back: `translateZ(-${size / 2}px) rotateY(180deg)`,
                    right: `rotateY(90deg) translateZ(${size / 2}px)`,
                    left: `rotateY(-90deg) translateZ(${size / 2}px)`,
                    top: `rotateX(90deg) translateZ(${size / 2}px)`,
                    bottom: `rotateX(-90deg) translateZ(${size / 2}px)`,
                  };
                  const colors = [
                    'from-terracotta/15 to-transparent',
                    'from-sky-blue/15 to-transparent',
                    'from-weaving-yellow/15 to-transparent',
                    'from-weaving-pink/15 to-transparent',
                    'from-weaving-purple/15 to-transparent',
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

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              isExpanded={expandedService === service.id}
              onToggleExpand={() =>
                setExpandedService(expandedService === service.id ? null : service.id)
              }
              onContact={handleContact}
            />
          ))}
        </div>

        {/* Work Process */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('workProcess.title')}
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('workProcess.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {workProcess.map((step, index) => (
              <ProcessStep key={step.step} step={step} index={index} />
            ))}
          </div>
        </motion.div>

        {/* Why Choose Me */}
        <motion.div
          className="bg-card-bg rounded-3xl p-8 md:p-12 shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('whyChooseMe.title')}
            </h3>
            <p className="text-muted-foreground">
              {t('whyChooseMe.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseMe.map((reason, index) => (
              <motion.div
                key={reason.id}
                className="text-center p-6 bg-muted rounded-2xl shadow-md hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-3">{reason.icon}</div>
                <h4 className="text-lg font-bold text-foreground mb-2">
                  {t(`why.${reason.id}.title`)}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {t(`why.${reason.id}.description`)}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <motion.button
              onClick={handleContact}
              className="px-8 py-4 bg-terracotta text-white rounded-full font-medium text-lg hover:bg-terracotta-dark transition-colors shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('whyChooseMe.cta')}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

function ServiceCard({
  service,
  index,
  isExpanded,
  onToggleExpand,
  onContact,
}: {
  service: Service;
  index: number;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onContact: () => void;
}) {
  const t = useTranslations('services');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const colorClasses = {
    terracotta: {
      bg: 'bg-terracotta',
      text: 'text-terracotta',
      border: 'border-terracotta',
      gradient: 'from-terracotta/20',
    },
    'sky-blue': {
      bg: 'bg-sky-blue',
      text: 'text-sky-blue',
      border: 'border-sky-blue',
      gradient: 'from-sky-blue/20',
    },
    'weaving-pink': {
      bg: 'bg-weaving-pink',
      text: 'text-weaving-pink',
      border: 'border-weaving-pink',
      gradient: 'from-weaving-pink/20',
    },
    'weaving-purple': {
      bg: 'bg-weaving-purple',
      text: 'text-weaving-purple',
      border: 'border-weaving-purple',
      gradient: 'from-weaving-purple/20',
    },
    'weaving-yellow': {
      bg: 'bg-weaving-yellow',
      text: 'text-weaving-yellow',
      border: 'border-weaving-yellow',
      gradient: 'from-weaving-yellow/20',
    },
  };

  const colors = colorClasses[service.color];

  return (
    <motion.div
      ref={ref}
      className={`relative bg-card-bg rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden ${
        service.popular ? 'ring-2 ring-weaving-purple' : ''
      }`}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
    >
      {/* Popular Badge */}
      {service.popular && (
        <div className="absolute top-4 right-4 z-10">
          <div className="px-3 py-1 bg-weaving-purple text-white text-xs font-bold rounded-full shadow-lg">
            {t('popular')}
          </div>
        </div>
      )}

      {/* Gradient Header */}
      <div className={`h-2 bg-gradient-to-r ${colors.gradient} to-transparent`} />

      <div className="p-6">
        {/* Icon */}
        <div className="text-5xl mb-4">{t(`items.${service.id}.icon`)}</div>

        {/* Title & Description */}
        <h3 className={`text-2xl font-bold ${colors.text} mb-2`}>
          {t(`items.${service.id}.title`)}
        </h3>
        <p className="text-muted-foreground mb-4">{t(`items.${service.id}.description`)}</p>

        {/* Pricing & Timeline */}
        {/* {(service.pricing || service.timeline) && (
          <div className="flex items-center gap-4 mb-4 pb-4 border-b border-stone/10">
            {service.pricing && (
              <div>
                <div className="text-xs text-muted-foreground">{t('pricing')}</div>
                <div className="font-bold text-foreground">{t(`items.${service.id}.pricing`)}</div>
              </div>
            )}
            {service.timeline && (
              <div>
                <div className="text-xs text-muted-foreground">{t('timeline')}</div>
                <div className="font-semibold text-foreground">{t(`items.${service.id}.timeline`)}</div>
              </div>
            )}
          </div>
        )} */}

        {/* Features */}
        <div className="mb-4">
          <h4 className="font-semibold text-foreground mb-2">{t('keyFeatures')}</h4>
          <ul className="space-y-2">
            {t.raw(`items.${service.id}.features`).slice(0, 3).map((feature: string, idx: number) => (
              <li key={idx} className="flex items-start gap-2 text-sm">
                <svg
                  className={`w-5 h-5 ${colors.text} flex-shrink-0 mt-0.5`}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Expand/Collapse Section */}
        <motion.div
          initial={false}
          animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          {/* Remaining Features */}
          {t.raw(`items.${service.id}.features`).length > 3 && (
            <ul className="space-y-2 mb-4">
              {t.raw(`items.${service.id}.features`).slice(3).map((feature: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <svg
                    className={`w-5 h-5 ${colors.text} flex-shrink-0 mt-0.5`}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Deliverables */}
          <div className="mb-4">
            <h4 className="font-semibold text-foreground mb-2">{t('deliverables')}</h4>
            <ul className="space-y-1">
              {t.raw(`items.${service.id}.deliverables`).map((item: string, idx: number) => (
                <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                  <span className={colors.text}>•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          <div className="mb-4">
            <h4 className="font-semibold text-foreground mb-2">{t('technologies')}</h4>
            <div className="flex flex-wrap gap-2">
              {t.raw(`items.${service.id}.technologies`).map((tech: string) => (
                <span
                  key={tech}
                  className={`px-2 py-1 text-xs ${colors.text} bg-${colors.bg}/10 rounded-full border ${colors.border}/20`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Buttons */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={onToggleExpand}
            className={`flex-1 px-4 py-2 border-2 ${colors.border} ${colors.text} rounded-full font-medium hover:bg-${colors.bg} hover:text-white transition-colors text-sm`}
          >
            {isExpanded ? t('showLess') : t('learnMore')}
          </button>
          <button
            onClick={onContact}
            className={`flex-1 px-4 py-2 ${colors.bg} text-white rounded-full font-medium hover:opacity-90 transition-opacity text-sm`}
          >
            {t('getStarted')}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function ProcessStep({
  step,
  index,
}: {
  step: typeof workProcess[0];
  index: number;
}) {
  const t = useTranslations('services');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  // Map step number to translation key
  const stepKeys = ['discovery', 'planning', 'development', 'testing', 'launch', 'support'];
  const stepKey = stepKeys[step.step - 1];

  return (
    <motion.div
      ref={ref}
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="bg-card-bg rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow h-full">
        {/* Step Number */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-terracotta to-weaving-pink text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
            {step.step}
          </div>
          <div className="text-3xl">{t(`process.${stepKey}.icon`)}</div>
        </div>

        {/* Content */}
        <h4 className="text-xl font-bold text-foreground mb-2">{t(`process.${stepKey}.title`)}</h4>
        <p className="text-sm text-muted-foreground mb-3">{t(`process.${stepKey}.description`)}</p>
        <div className="text-xs font-medium text-terracotta">
          ⏱ {t(`process.${stepKey}.duration`)}
        </div>
      </div>

      {/* Connecting Line (except last) */}
      {index < workProcess.length - 1 && (
        <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-terracotta/30 to-transparent" />
      )}
    </motion.div>
  );
}

export default ServicesSection;
