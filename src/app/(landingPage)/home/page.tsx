"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
// Components
import Dock from "@/components/core/dock/dock";
import DesktopWindow from "@/components/core/window/desktop-window";
// Data
import profileData from "@/helpers/profile-data";
// Icons
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  ExternalLink,
  Globe,
  ChevronDown,
  Briefcase,
} from "lucide-react";

const sectionTitles: Record<string, string> = {
  about: "Terminal — jesús@ubuntu",
  experience: "Archivos — Experiencia",
  projects: "Archivos — Proyectos",
  skills: "Editor de Texto — Habilidades",
  education: "Archivos — Educación",
  contact: "Thunderbird Mail — Contacto",
};

export default function Home() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const handleSectionChange = (section: string) => {
    setActiveSection(section === activeSection ? null : section);
  };

  const handleCloseWindow = () => {
    setActiveSection(null);
  };

  return (
    <div className="ubuntu-desktop">
      {/* Background Wallpaper - Responsive multi-resolution */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <picture style={{ position: "relative", display: "block", width: "100%", height: "100%" }}>
          <source
            srcSet="/imgs/backgrounds/numbat_wallpaper_color_3480x2160.png"
            media="(min-width: 2560px)"
          />
          <source
            srcSet="/imgs/backgrounds/numbat_wallpaper_color_2560x1440.png"
            media="(min-width: 1920px)"
          />
          <Image
            className="desktop-wallpaper"
            src="/imgs/backgrounds/numbat_wallpaper_color_1920x1080.png"
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
}

/* ===================== ABOUT SECTION ===================== */
function AboutSection() {
  return (
    <div className="terminal-section">
      <div className="terminal-header">
        <span className="terminal-prompt">jesusd@ubuntu:~$</span>
        <span className="terminal-cmd"> neofetch</span>
      </div>
      <div className="terminal-output">
        <div className="neofetch-layout">
          <pre className="terminal-ascii">
{`            .-/+oossssoo+/-.
        \`:+ssssssssssssssssss+:\`
      -+ssssssssssssssssssyyssss+-
    .ossssssssssssssssss dMMMNy sssso.
   /sssssssssss hdmmNNmmyNMMMMh ssssss/
  +sssssssss hm ydMMMMMMMMMMMN- ssssssss+
 /ssssssss hNMMM yNMMMMMMMMMMMMNh ssssssss/
.sssssssss dMMMNh ++mhMMMMMMMMMMMMNo sssssssss.
+sssssssss hMMMMMMd +MMMMMMMMMMMMMm+ sssssssss+
osssssssss dMMMMMMMd +MMMMMMMMMMMMMm+ sssssssso
osssssssss hMMMMMMMd +MMMMMMMMMMMMMm+ sssssssso
+sssssssss hMMMMMMm+ +MMMMMMMMMMMMMm+ sssssssss+
.sssssssss dMMMNho +mMMMMMMMMMMMMNo sssssssss.
 /ssssssss hNMMN yNMMMMMMMMMMMNh ssssssss/
  +sssssssss dm hNMMMMMMMMMMNm+ ssssssss+
   /sssssssssss hdmNNNNmyNMMMMh ssssss/
    .ossssssssssssssssss dMMMNy sssso.
      -+ssssssssssssssssssy ssss+-
        \`:+ssssssssssssssssss+:\`
            .-/+oossssoo+/-.`}
          </pre>
          <div className="neofetch-info">
            <p className="neofetch-title">
              <span className="terminal-key">jesusd</span>
              <span className="terminal-at">@</span>
              <span className="terminal-key">ubuntu</span>
            </p>
            <div className="neofetch-separator">──────────────────────────</div>
            <p>
              <span className="terminal-key">Name:</span> {profileData.name}
            </p>
            <p>
              <span className="terminal-key">Role:</span> {profileData.headline}
            </p>
            <p>
              <span className="terminal-key">Location:</span>{" "}
              <MapPin size={12} className="inline" /> {profileData.location}
            </p>
            <p>
              <span className="terminal-key">Email:</span> {profileData.email}
            </p>
            <p>
              <span className="terminal-key">Experience:</span> +7 años
            </p>
            <p>
              <span className="terminal-key">Languages:</span>{" "}
              {profileData.languages
                .map((l) => `${l.language} (${l.proficiency})`)
                .join(", ")}
            </p>
            <div className="neofetch-separator">──────────────────────────</div>
            <p className="terminal-about">{profileData.about}</p>
          </div>
        </div>
      </div>

      <div className="terminal-header" style={{ marginTop: "16px" }}>
        <span className="terminal-prompt">jesusd@ubuntu:~$</span>
        <span className="terminal-cmd"> cat links.txt</span>
      </div>
      <div className="terminal-links">
        <a
          href={profileData.github}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github size={16} /> {profileData.githubUser}
        </a>
        <a
          href={profileData.linkedin}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Linkedin size={16} /> LinkedIn
        </a>
        <a href={`mailto:${profileData.email}`}>
          <Mail size={16} /> {profileData.email}
        </a>
      </div>

      <div className="terminal-header" style={{ marginTop: "16px" }}>
        <span className="terminal-prompt">jesusd@ubuntu:~$</span>
        <span className="terminal-cursor">▌</span>
      </div>
    </div>
  );
}

/* ===================== EXPERIENCE TIMELINE SECTION ===================== */
function ExperienceSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <div className="timeline-section">
      <div className="timeline-container">
        {profileData.experience.map((exp, i) => {
          const isExpanded = expandedIndex === i;
          return (
            <div
              key={i}
              className={`timeline-item ${isExpanded ? "timeline-item-expanded" : ""}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Timeline line & dot */}
              <div className="timeline-track">
                <div className={`timeline-dot ${isExpanded ? "timeline-dot-active" : ""}`}>
                  <Briefcase size={14} />
                </div>
                {i < profileData.experience.length - 1 && (
                  <div className="timeline-line" />
                )}
              </div>

              {/* Content */}
              <div className="timeline-content">
                <button
                  className="timeline-header-btn"
                  onClick={() => setExpandedIndex(isExpanded ? null : i)}
                >
                  <div className="timeline-header-left">
                    <h3 className="timeline-role">{exp.role}</h3>
                    <span className="timeline-company">
                      {exp.company} · <Globe size={11} className="inline" /> {exp.location}
                    </span>
                  </div>
                  <div className="timeline-header-right">
                    <span className="timeline-period">{exp.period}</span>
                    <span className={`timeline-chevron ${isExpanded ? "timeline-chevron-open" : ""}`}>
                      <ChevronDown size={16} />
                    </span>
                  </div>
                </button>

                {/* Expandable Detail */}
                <div className={`timeline-detail ${isExpanded ? "timeline-detail-open" : ""}`}>
                  <p className="timeline-description">{exp.description}</p>
                  <div className="tech-tags">
                    {exp.tech.map((t) => (
                      <span key={t} className="tech-tag">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ===================== PROJECTS SECTION ===================== */
function ProjectsSection() {
  return (
    <div className="file-manager-section">
      <div className="file-sidebar">
        <h3>📁 Proyectos</h3>
        <ul>
          {profileData.projects.map((p, i) => (
            <li key={i} className="file-item">
              📂 {p.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="file-content">
        <div className="projects-grid">
          {profileData.projects.map((p, i) => (
            <div key={i} className="project-card">
              <div className="project-card-header">
                <h3>{p.name}</h3>
                {p.link !== "#" && (
                  <a href={p.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
              <p>{p.description}</p>
              <div className="tech-tags">
                {p.tech.map((t) => (
                  <span key={t} className="tech-tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ===================== ANIMATED SKILLS SECTION ===================== */
function SkillsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Trigger animation after mount
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="skills-dashboard" ref={sectionRef}>
      {profileData.skills.map((cat, catIdx) => (
        <div
          key={cat.category}
          className="skill-card-group"
          style={{ animationDelay: `${catIdx * 0.15}s` }}
        >
          <h3 className="skill-group-title">
            <span className="skill-group-icon">
              {catIdx === 0 ? "🎨" : catIdx === 1 ? "⚙️" : catIdx === 2 ? "🗄️" : "🛠️"}
            </span>
            {cat.category}
          </h3>
          <div className="skill-cards-grid">
            {cat.skills.map((skill, skillIdx) => (
              <SkillCircle
                key={skill.name}
                name={skill.name}
                level={skill.level}
                isVisible={isVisible}
                delay={catIdx * 150 + skillIdx * 80}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* Animated circular skill indicator */
function SkillCircle({
  name,
  level,
  isVisible,
  delay,
}: {
  name: string;
  level: number;
  isVisible: boolean;
  delay: number;
}) {
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = isVisible
    ? circumference - (level / 100) * circumference
    : circumference;

  const getColor = (lvl: number) => {
    if (lvl >= 90) return "#4CE94C";
    if (lvl >= 80) return "#E95420";
    if (lvl >= 70) return "#F5C211";
    return "#BB94A9";
  };

  return (
    <div className="skill-circle-card" style={{ animationDelay: `${delay}ms` }}>
      <div className="skill-circle-wrapper">
        <svg className="skill-circle-svg" viewBox="0 0 80 80">
          {/* Background circle */}
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="5"
          />
          {/* Progress circle */}
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke={getColor(level)}
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="skill-circle-progress"
            style={{
              transitionDelay: `${delay}ms`,
            }}
            transform="rotate(-90 40 40)"
          />
        </svg>
        <span className="skill-circle-value" style={{ color: getColor(level) }}>
          {level}
        </span>
      </div>
      <span className="skill-circle-name">{name}</span>
    </div>
  );
}

/* ===================== EDUCATION SECTION ===================== */
function EducationSection() {
  return (
    <div className="file-manager-section">
      <div className="file-sidebar">
        <h3>📁 Educación</h3>
        <ul>
          {profileData.education.map((e, i) => (
            <li key={i} className="file-item">
              🎓 {e.institution}
            </li>
          ))}
        </ul>
      </div>
      <div className="file-content">
        {profileData.education.map((e, i) => (
          <div key={i} className="experience-card">
            <div className="experience-header">
              <h3>{e.degree}</h3>
              <span className="experience-period">{e.period}</span>
            </div>
            <h4 className="experience-company">{e.institution}</h4>
            <p>{e.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ===================== CONTACT SECTION ===================== */
function ContactSection() {
  return (
    <div className="contact-section">
      <div className="contact-compose">
        <div className="compose-field">
          <label>Para:</label>
          <span>{profileData.email}</span>
        </div>
        <div className="compose-field">
          <label>Asunto:</label>
          <input type="text" placeholder="¡Trabajemos juntos!" />
        </div>
        <div className="compose-body">
          <textarea placeholder="Escribe tu mensaje aquí..." rows={8} />
        </div>
        <div className="compose-actions">
          <button className="compose-send-btn">
            <Mail size={16} />
            Enviar Mensaje
          </button>
        </div>
      </div>
      <div className="contact-info-sidebar">
        <h3>Contacto</h3>
        <div className="contact-links">
          <a href={`mailto:${profileData.email}`}>
            <Mail size={18} /> {profileData.email}
          </a>
          <a
            href={profileData.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size={18} /> {profileData.githubUser}
          </a>
          <a
            href={profileData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin size={18} /> LinkedIn Profile
          </a>
          <p className="contact-location">
            <MapPin size={18} /> {profileData.location}
          </p>
        </div>
      </div>
    </div>
  );
}
