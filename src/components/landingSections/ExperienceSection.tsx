import { useState, useRef } from "react";
import profileData, { ExperienceProject } from "@/helpers/profile-data";
import {
  Briefcase,
  ChevronDown,
  Globe,
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

export function ExperienceSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedProject, setSelectedProject] =
    useState<ExperienceProject | null>(null);
  const [mediaIndex, setMediaIndex] = useState(0);

  const handleOpenProject = (project: ExperienceProject) => {
    setSelectedProject(project);
    setMediaIndex(0);
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
  };

  const currentMedia = selectedProject?.media
    ? selectedProject.media[mediaIndex]
    : undefined;

  const getProjectPreview = (proj: ExperienceProject) => {
    if (proj.preview) return proj.preview;
    if (proj.url) {
      try {
        const hostname = new URL(proj.url).hostname;
        return `https://www.google.com/s2/favicons?domain=${hostname}&sz=128`;
      } catch {
        return "";
      }
    }
    return "";
  };

  const handleNextMedia = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (
      selectedProject &&
      selectedProject.media &&
      mediaIndex < selectedProject.media.length - 1
    ) {
      setMediaIndex((m) => m + 1);
    }
  };

  const handlePrevMedia = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (mediaIndex > 0) {
      setMediaIndex((m) => m - 1);
    }
  };

  const lastScrollTime = useRef(0);
  const touchStartRef = useRef<number | null>(null);

  const handleNav = (
    deltaY: number,
    e: React.WheelEvent | React.TouchEvent,
  ) => {
    // Si hay un modal abierto, no hacemos scroll-snap
    if (selectedProject !== null) return;
    const now = Date.now();

    // Limitamos la velocidad del snap de items a 1 por segundo
    if (now - lastScrollTime.current < 800) {
      e.stopPropagation();
      return;
    }

    const direction = deltaY > 0 ? 1 : -1;
    const currentIndex = expandedIndex ?? 0;
    const nextIndex = currentIndex + direction;

    if (nextIndex >= 0 && nextIndex < profileData.experience.length) {
      // Cambiamos al nuevo item
      setExpandedIndex(nextIndex);
      lastScrollTime.current = now;
      e.stopPropagation(); // Evitamos que salte de página en DesktopWindow

      // Centramos el nuevo item en pantalla suavemente
      setTimeout(() => {
        itemRefs.current[nextIndex]?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 50);
    } else {
      // Estamos en el último o en el primero y queremos salir
      // Forzamos el scroll al extremo para que DesktopWindow lo detecte
      const mw = containerRef.current?.closest(".window-content");
      if (mw) {
        if (direction === -1) mw.scrollTop = 0;
        else mw.scrollTop = mw.scrollHeight;
      }
      // Dejamos que el evento propague hacia arriba a DesktopWindow
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (Math.abs(e.deltaY) > 20) {
      handleNav(e.deltaY, e);
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!selectedProject) {
      touchStartRef.current = e.touches[0].clientY;
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartRef.current === null || selectedProject !== null) return;
    const deltaY = touchStartRef.current - e.touches[0].clientY;

    if (Math.abs(deltaY) > 40) {
      handleNav(deltaY, e);
      // Reiniciamos el toque si logramos navegar para evitar saltos locos en pantalla
      touchStartRef.current = e.touches[0].clientY;
    }
  };

  const handleTouchEnd = () => {
    touchStartRef.current = null;
  };

  return (
    <div
      className="timeline-section"
      ref={containerRef}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="timeline-container">
        {profileData.experience.map((exp, i) => {
          const isExpanded = expandedIndex === i;
          return (
            <div
              key={i}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              data-index={i}
              className={`timeline-item ${isExpanded ? "timeline-item-expanded" : ""}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Timeline line & dot */}
              <div className="timeline-track">
                <div
                  className={`timeline-dot ${isExpanded ? "timeline-dot-active" : ""}`}
                >
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
                    <h3 className="timeline-role">
                      <i className="fa-solid fa-briefcase"></i>
                      {exp.company} &nbsp;
                      <Globe size={11} className="inline mr-2" /> &nbsp;
                      {exp.location}
                    </h3>
                    <span className="timeline-company">{exp.role}</span>
                  </div>
                  <div className="timeline-header-right">
                    <span className="timeline-period">{exp.period}</span>
                    <span
                      className={`timeline-chevron ${isExpanded ? "timeline-chevron-open" : ""}`}
                    >
                      <ChevronDown size={16} />
                    </span>
                  </div>
                </button>

                {/* Expandable Detail */}
                <div
                  className={`timeline-detail ${isExpanded ? "timeline-detail-open" : ""}`}
                >
                  <span
                    className="timeline-description"
                    dangerouslySetInnerHTML={{
                      __html: exp.description,
                    }}
                  />
                  <div className="tech-tags">
                    {exp.tech.map((t) => (
                      <span key={t} className="tech-tag">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Project Cards */}
                  {exp.projects && exp.projects.length > 0 && (
                    <div className="exp-projects-grid">
                      {exp.projects.map((proj, pIdx) => (
                        <button
                          key={pIdx}
                          className="exp-project-card"
                          onClick={() => handleOpenProject(proj)}
                        >
                          <img
                            src={getProjectPreview(proj)}
                            alt={proj.title}
                            className={`exp-project-preview ${!proj.preview && proj.url ? "fallback-favicon" : ""}`}
                          />
                          <div className="exp-project-overlay">
                            <span className="exp-project-title">
                              {proj.title}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="project-modal-backdrop" onClick={handleCloseProject}>
          <div
            className="project-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="project-modal-close"
              onClick={handleCloseProject}
            >
              <X size={20} />
            </button>
            <h2 className="project-modal-title">{selectedProject.title}</h2>

            {/* Media Carousel */}
            {selectedProject.media &&
            selectedProject.media.length > 0 &&
            currentMedia ? (
              <div className="project-carousel">
                {currentMedia.type === "video" ? (
                  <video
                    src={currentMedia.url}
                    className="project-carousel-media"
                    controls
                    autoPlay
                    muted
                  />
                ) : (
                  <img
                    src={currentMedia.url}
                    alt={selectedProject.title}
                    className="project-carousel-media"
                  />
                )}

                {/* Carousel Controls */}
                {selectedProject.media.length > 1 && (
                  <>
                    <button
                      className={`carousel-btn carousel-btn-prev ${mediaIndex === 0 ? "disabled" : ""}`}
                      onClick={handlePrevMedia}
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      className={`carousel-btn carousel-btn-next ${mediaIndex === selectedProject.media.length - 1 ? "disabled" : ""}`}
                      onClick={handleNextMedia}
                    >
                      <ChevronRight size={24} />
                    </button>

                    <div className="carousel-indicators">
                      {selectedProject.media.map((_, i) => (
                        <div
                          key={i}
                          className={`carousel-dot ${i === mediaIndex ? "active" : ""}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            ) : !selectedProject.preview && selectedProject.url ? (
              // Favicon Fallback if no media and no preview exist but url is available
              <div className="project-carousel fallback-modal-carousel">
                <img
                  src={getProjectPreview(selectedProject)}
                  alt={selectedProject.title}
                  className="project-carousel-media fallback-favicon-modal"
                />
              </div>
            ) : selectedProject.preview ? (
              // General Preview Fallback if media is empty but preview exists
              <div className="project-carousel">
                <img
                  src={selectedProject.preview}
                  alt={selectedProject.title}
                  className="project-carousel-media"
                />
              </div>
            ) : null}

            <p className="project-modal-desc">{selectedProject.description}</p>

            {selectedProject.url && (
              <a
                href={selectedProject.url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-modal-link-btn"
              >
                Ver Proyecto <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
