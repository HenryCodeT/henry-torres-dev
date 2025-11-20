import { lazy, Suspense } from 'react';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';

// Lazy load heavy components for better initial load performance
const SkillsSection = lazy(() => import('./components/SkillsSection'));
const ProjectsSection = lazy(() => import('./components/ProjectsSection'));
const ServicesSection = lazy(() => import('./components/ServicesSection'));
const ContactSection = lazy(() => import('./components/ContactSection'));

function LoadingFallback() {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-terracotta" />
    </div>
  );
}

export default function Home() {
  return (
    <div>
      {/* Hero Section - Lottie + Framer Motion */}
      <HeroSection />

      {/* About Section - Framer Motion Advanced */}
      <AboutSection />

      {/* Skills Section - Three.js 3D */}
      <Suspense fallback={<LoadingFallback />}>
        <SkillsSection />
      </Suspense>

      {/* Projects Section - WebGL Effects */}
      <Suspense fallback={<LoadingFallback />}>
        <ProjectsSection />
      </Suspense>

      {/* Services Section - GSAP Timelines */}
      <Suspense fallback={<LoadingFallback />}>
        <ServicesSection />
      </Suspense>

      {/* Contact Section */}
      <Suspense fallback={<LoadingFallback />}>
        <ContactSection />
      </Suspense>
    </div>
  );
}
