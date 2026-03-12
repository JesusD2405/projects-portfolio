import { useState, useRef, useEffect, useCallback } from "react";
import profileData, { ExperienceProject } from "@/helpers/profile-data";
import { Briefcase, ChevronDown, Globe, ExternalLink } from "lucide-react";
import { ProjectDetailModal } from "@/components/ProjectDetailModal";

export function ExperienceSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedProject, setSelectedProject] =
    useState<ExperienceProject | null>(null);

  const handleOpenProject = (project: ExperienceProject) => {
    setSelectedProject(project);
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
  };

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

  // ─── Detect mobile once on mount ────────────────────────────────────────────
  const isMobile = useRef(false);
  useEffect(() => {
    isMobile.current =
      /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) ||
      window.matchMedia("(pointer: coarse)").matches;
  }, []);

  // ─── Throttle refs (separate per device) ───────────────────────────────────
  const lastScrollTime = useRef(0);
  // Touch: store gesture start position (reset only on touchEnd, not mid-move)
  const touchStartY = useRef<number | null>(null);
  // Prevent double-fire on a single swipe
  const touchNavigating = useRef(false);

  // ─── Core navigation ────────────────────────────────────────────────────────
  const navigate = useCallback(
    (direction: 1 | -1, stopFn: () => void) => {
      if (selectedProject !== null) return;

      const now = Date.now();
      // Faster on desktop (550ms), a bit more lenient on mobile (700ms)
      const throttle = isMobile.current ? 700 : 550;
      if (now - lastScrollTime.current < throttle) {
        stopFn();
        return;
      }

      const currentIndex = expandedIndex ?? 0;
      const nextIndex = currentIndex + direction;

      if (nextIndex >= 0 && nextIndex < profileData.experience.length) {
        lastScrollTime.current = now;
        stopFn(); // Prevent propagation to parent window
        setExpandedIndex(nextIndex);

        // Wait for React to render the expanded item, then center it.
        // Using rAF + small delay is more reliable than a fixed timeout.
        requestAnimationFrame(() => {
          setTimeout(() => {
            itemRefs.current[nextIndex]?.scrollIntoView({
              behavior: "smooth",
              block: "nearest",
            });
          }, 80);
        });
      } else {
        // At boundary — let the event propagate so DesktopWindow can switch sections
        const mw = containerRef.current?.closest(".window-content");
        if (mw) {
          mw.scrollTop = direction === -1 ? 0 : mw.scrollHeight;
        }
      }
    },
    [expandedIndex, selectedProject],
  );

  // ─── Wheel (desktop) ────────────────────────────────────────────────────────
  const handleWheel = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      if (Math.abs(e.deltaY) < 20) return;
      navigate(e.deltaY > 0 ? 1 : -1, () => e.stopPropagation());
    },
    [navigate],
  );

  // ─── Touch (mobile) ─────────────────────────────────────────────────────────
  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (selectedProject !== null) return;
      touchStartY.current = e.touches[0].clientY;
      touchNavigating.current = false;
    },
    [selectedProject],
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      // Skip if no start recorded, modal open, or already navigated this swipe
      if (
        touchStartY.current === null ||
        selectedProject !== null ||
        touchNavigating.current
      )
        return;

      const deltaY = touchStartY.current - e.touches[0].clientY;
      if (Math.abs(deltaY) < 45) return; // Minimum swipe distance

      touchNavigating.current = true; // Lock: one navigation per swipe
      navigate(deltaY > 0 ? 1 : -1, () => e.stopPropagation());
    },
    [navigate, selectedProject],
  );

  const handleTouchEnd = useCallback(() => {
    touchStartY.current = null;
    touchNavigating.current = false;
  }, []);

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
                      {exp.logo ? (
                        exp.link ? (
                          <a
                            href={exp.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="company-logo-wrap company-logo-wrap--link"
                            onClick={(ev) => ev.stopPropagation()}
                            title={exp.company}
                          >
                            <img
                              src={exp.logo}
                              alt={exp.company}
                              className="company-logo-img"
                              onError={(e) => {
                                const target = e.currentTarget;
                                target.style.display = "none";
                                const fallback =
                                  target.nextElementSibling as HTMLElement | null;
                                if (fallback) fallback.style.display = "flex";
                              }}
                            />
                            <span
                              className="company-logo-fallback"
                              style={{ display: "none" }}
                            >
                              <Briefcase size={14} />
                            </span>
                          </a>
                        ) : (
                          <span className="company-logo-wrap">
                            <img
                              src={exp.logo}
                              alt={exp.company}
                              className="company-logo-img"
                              onError={(e) => {
                                const target = e.currentTarget;
                                target.style.display = "none";
                                const fallback =
                                  target.nextElementSibling as HTMLElement | null;
                                if (fallback) fallback.style.display = "flex";
                              }}
                            />
                            <span
                              className="company-logo-fallback"
                              style={{ display: "none" }}
                            >
                              <Briefcase size={14} />
                            </span>
                          </span>
                        )
                      ) : (
                        <Briefcase size={14} />
                      )}
                      {exp.link ? (
                        <a
                          href={exp.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="edu-institution-link"
                          onClick={(ev) => ev.stopPropagation()}
                        >
                          {exp.company}
                          <ExternalLink
                            size={12}
                            className="edu-institution-link-icon"
                          />
                        </a>
                      ) : (
                        <span>{exp.company}</span>
                      )}
                      <Globe size={11} className="inline" /> &nbsp;
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
        <ProjectDetailModal
          project={selectedProject}
          onClose={handleCloseProject}
        />
      )}
    </div>
  );
}
