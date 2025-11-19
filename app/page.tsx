import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import ServicesSection from './components/ServicesSection';
import ContactSection from './components/ContactSection';

export default function Home() {
  return (
    <div>
      {/* Hero Section with Animated Llama */}
      <HeroSection />

      {/* About Section with Timeline */}
      <AboutSection />

      {/* Skills Section - Montaña del Stack */}
      <SkillsSection />

      {/* Projects Section - Portfolio Showcase */}
      <ProjectsSection />

      {/* Services Section - What I Offer */}
      <ServicesSection />

      {/* Contact Section - Get In Touch */}
      <ContactSection />
    </div>
  );
}
