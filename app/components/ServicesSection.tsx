'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { services, workProcess, whyChooseMe, type Service } from '@/app/data/services';

export default function ServicesSection() {
  const sectionRef = useRef(null);
  const [expandedService, setExpandedService] = useState<string | null>(null);

  const handleContact = () => {
    const element = document.getElementById('contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-gradient-to-b from-background to-stone-light overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
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
            Services
          </motion.span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            How I Can{' '}
            <span className="bg-gradient-to-r from-terracotta via-weaving-pink to-sky-blue bg-clip-text text-transparent">
              Help You
            </span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            From web development to AI integration, I offer comprehensive
            solutions tailored to your needs
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
              My Work Process
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A proven methodology ensuring successful project delivery
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
          className="bg-gradient-to-br from-white to-stone-light rounded-3xl p-8 md:p-12 shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Work With Me
            </h3>
            <p className="text-muted-foreground">
              What sets me apart from other developers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseMe.map((reason, index) => (
              <motion.div
                key={reason.title}
                className="text-center p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-3">{reason.icon}</div>
                <h4 className="text-lg font-bold text-foreground mb-2">
                  {reason.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {reason.description}
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
              Let's Discuss Your Project
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

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
      className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden ${
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
            POPULAR
          </div>
        </div>
      )}

      {/* Gradient Header */}
      <div className={`h-2 bg-gradient-to-r ${colors.gradient} to-transparent`} />

      <div className="p-6">
        {/* Icon */}
        <div className="text-5xl mb-4">{service.icon}</div>

        {/* Title & Description */}
        <h3 className={`text-2xl font-bold ${colors.text} mb-2`}>
          {service.title}
        </h3>
        <p className="text-muted-foreground mb-4">{service.description}</p>

        {/* Pricing & Timeline */}
        {(service.pricing || service.timeline) && (
          <div className="flex items-center gap-4 mb-4 pb-4 border-b border-stone/10">
            {service.pricing && (
              <div>
                <div className="text-xs text-muted-foreground">Pricing</div>
                <div className="font-bold text-foreground">{service.pricing}</div>
              </div>
            )}
            {service.timeline && (
              <div>
                <div className="text-xs text-muted-foreground">Timeline</div>
                <div className="font-semibold text-foreground">{service.timeline}</div>
              </div>
            )}
          </div>
        )}

        {/* Features */}
        <div className="mb-4">
          <h4 className="font-semibold text-foreground mb-2">Key Features:</h4>
          <ul className="space-y-2">
            {service.features.slice(0, 3).map((feature, idx) => (
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
          {service.features.length > 3 && (
            <ul className="space-y-2 mb-4">
              {service.features.slice(3).map((feature, idx) => (
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
            <h4 className="font-semibold text-foreground mb-2">Deliverables:</h4>
            <ul className="space-y-1">
              {service.deliverables.map((item, idx) => (
                <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                  <span className={colors.text}>•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          <div className="mb-4">
            <h4 className="font-semibold text-foreground mb-2">Technologies:</h4>
            <div className="flex flex-wrap gap-2">
              {service.technologies.map((tech) => (
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
            {isExpanded ? 'Show Less' : 'Learn More'}
          </button>
          <button
            onClick={onContact}
            className={`flex-1 px-4 py-2 ${colors.bg} text-white rounded-full font-medium hover:opacity-90 transition-opacity text-sm`}
          >
            Get Started
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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow h-full">
        {/* Step Number */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-terracotta to-weaving-pink text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
            {step.step}
          </div>
          <div className="text-3xl">{step.icon}</div>
        </div>

        {/* Content */}
        <h4 className="text-xl font-bold text-foreground mb-2">{step.title}</h4>
        <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
        <div className="text-xs font-medium text-terracotta">
          ⏱ {step.duration}
        </div>
      </div>

      {/* Connecting Line (except last) */}
      {index < workProcess.length - 1 && (
        <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-terracotta/30 to-transparent" />
      )}
    </motion.div>
  );
}
