"use client";
import { useState } from "react";
import Image from "next/image";
import { NextPage } from "next";
// Components
import Dock from "@/components/core/dock/dock";
import DesktopWindow from "@/components/core/window/desktop-window";
import { AboutSection } from "@/components/landingSections/AboutSection";
import { ExperienceSection } from "@/components/landingSections/ExperienceSection";
import { ProjectsSection } from "@/components/landingSections/ProjectsSection";
import { SkillsSection } from "@/components/landingSections/SkillsSection";
import { EducationSection } from "@/components/landingSections/EducationSection";
import { ContactSection } from "@/components/landingSections/ContactSection";

const sectionTitles: Record<string, string> = {
  about: "Terminal — jesusdavid@ubuntu",
  experience: "Archivos — Experiencia",
  projects: "Archivos — Proyectos",
  skills: "Editor de Texto — Habilidades",
  education: "Archivos — Educación",
  contact: "Thunderbird Mail — Contacto",
};

const sectionOrder = [
  "about",
  "experience",
  "projects",
  "skills",
  "education",
  "contact",
];

const LandingPage: NextPage = () => {
  const [activeSection, setActiveSection] = useState<string | null>("about");

  const handleSectionChange = (section: string) => {
    setActiveSection(section === activeSection ? null : section);
  };

  const handleCloseWindow = () => {
    setActiveSection(null);
  };

  const handleReachBoundary = (direction: "next" | "prev") => {
    if (!activeSection) return;

    const currentIndex = sectionOrder.indexOf(activeSection);
    if (currentIndex === -1) return;

    if (direction === "next" && currentIndex < sectionOrder.length - 1) {
      setActiveSection(sectionOrder[currentIndex + 1]);
    } else if (direction === "prev" && currentIndex > 0) {
      setActiveSection(sectionOrder[currentIndex - 1]);
    }
  };

  return (
    <div className="ubuntu-desktop">
      {/* Background Wallpaper - Responsive multi-resolution */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <picture
          style={{
            position: "relative",
            display: "block",
            width: "100%",
            height: "100%",
          }}
        >
          {/* Mobile portrait wallpaper (official Ubuntu 24.04 LTS Noble Numbat) */}
          <source
            srcSet="imgs/backgrounds/mobile_numbat_color_1728x3840.jpg"
            media="(max-width: 767px)"
          />
          <source
            srcSet="imgs/backgrounds/numbat_wallpaper_color_3480x2160.png"
            media="(min-width: 2560px)"
          />
          <source
            srcSet="imgs/backgrounds/numbat_wallpaper_color_2560x1440.png"
            media="(min-width: 1920px)"
          />
          <Image
            className="desktop-wallpaper"
            src="imgs/backgrounds/numbat_wallpaper_color_1920x1080.png"
            alt="Ubuntu 24.04 LTS Noble Numbat Wallpaper"
            quality={90}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </picture>
      </div>

      {/* Dock */}
      <Dock
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />

      {/* Desktop Window */}
      <DesktopWindow
        title={activeSection ? sectionTitles[activeSection] || "" : ""}
        isOpen={activeSection !== null}
        onClose={handleCloseWindow}
        onReachBoundary={handleReachBoundary}
      >
        {activeSection === "about" && <AboutSection />}
        {activeSection === "experience" && <ExperienceSection />}
        {activeSection === "projects" && <ProjectsSection />}
        {activeSection === "skills" && <SkillsSection />}
        {activeSection === "education" && <EducationSection />}
        {activeSection === "contact" && <ContactSection />}
      </DesktopWindow>
    </div>
  );
};

export default LandingPage;
