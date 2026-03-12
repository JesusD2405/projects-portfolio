import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, ExternalLink, Maximize2 } from "lucide-react";
import { ExperienceProjectMedia } from "@/helpers/profile-data";

/** Interfaz normalizada para el modal, compatible con ExperienceProject y Project */
export interface ModalProject {
  title: string;
  url?: string;
  preview?: string;
  description: string;
  media?: ExperienceProjectMedia[];
}

interface ProjectDetailModalProps {
  project: ModalProject;
  onClose: () => void;
}

// ────────────────────────────────────────────────
// Fullscreen Viewer (standalone, portado sobre el backdrop del modal)
// ────────────────────────────────────────────────
interface FullscreenViewerProps {
  media: ExperienceProjectMedia[];
  startIndex: number;
  onClose: () => void;
}

function FullscreenViewer({ media, startIndex, onClose }: FullscreenViewerProps) {
  const [index, setIndex] = useState(startIndex);
  const current = media[index];

  const goPrev = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);
  const goNext = useCallback(
    () => setIndex((i) => Math.min(media.length - 1, i + 1)),
    [media.length],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, goPrev, goNext]);

  return (
    <div className="fullscreen-viewer-backdrop" onClick={onClose}>
      {/* Close btn */}
      <button
        className="fullscreen-viewer-close"
        onClick={onClose}
        aria-label="Cerrar pantalla completa"
      >
        <X size={22} />
      </button>

      {/* Counter */}
      {media.length > 1 && (
        <div className="fullscreen-viewer-counter">
          {index + 1} / {media.length}
        </div>
      )}

      {/* Media */}
      <div className="fullscreen-viewer-media-wrap" onClick={(e) => e.stopPropagation()}>
        {current.type === "video" ? (
          <video
            key={index}
            src={current.url}
            className="fullscreen-viewer-media"
            controls
            autoPlay
            muted
          />
        ) : (
          <img
            key={index}
            src={current.url}
            alt={`media-${index}`}
            className="fullscreen-viewer-media"
          />
        )}
      </div>

      {/* Prev / Next */}
      {media.length > 1 && (
        <>
          <button
            className={`fullscreen-viewer-btn fullscreen-viewer-btn-prev${index === 0 ? " disabled" : ""}`}
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            aria-label="Anterior"
          >
            <ChevronLeft size={32} />
          </button>
          <button
            className={`fullscreen-viewer-btn fullscreen-viewer-btn-next${index === media.length - 1 ? " disabled" : ""}`}
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            aria-label="Siguiente"
          >
            <ChevronRight size={32} />
          </button>

          {/* Dot indicators */}
          <div className="fullscreen-viewer-dots">
            {media.map((_, i) => (
              <button
                key={i}
                className={`fullscreen-viewer-dot${i === index ? " active" : ""}`}
                onClick={(e) => { e.stopPropagation(); setIndex(i); }}
                aria-label={`Ir a imagen ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ────────────────────────────────────────────────
// Main modal
// ────────────────────────────────────────────────
export function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  const [mediaIndex, setMediaIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  const currentMedia = project.media ? project.media[mediaIndex] : undefined;

  const getProjectPreview = (proj: ModalProject) => {
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
    if (project.media && mediaIndex < project.media.length - 1) {
      setMediaIndex((m) => m + 1);
    }
  };

  const handlePrevMedia = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (mediaIndex > 0) {
      setMediaIndex((m) => m - 1);
    }
  };

  const openFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFullscreen(true);
  };

  return (
    <>
      <div className="project-modal-backdrop" onClick={onClose}>
        <div
          className="project-modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <button className="project-modal-close" onClick={onClose}>
            <X size={20} />
          </button>
          <h2 className="project-modal-title">{project.title}</h2>

          {/* Media Carousel */}
          {project.media && project.media.length > 0 && currentMedia ? (
            <div className="project-carousel">
              {/* Fullscreen trigger overlay */}
              <button
                className="carousel-fullscreen-btn"
                onClick={openFullscreen}
                aria-label="Ver en pantalla completa"
                title="Pantalla completa"
              >
                <Maximize2 size={16} />
              </button>

              {currentMedia.type === "video" ? (
                <video
                  src={currentMedia.url}
                  className="project-carousel-media carousel-media-clickable"
                  controls
                  autoPlay
                  muted
                  onClick={openFullscreen}
                />
              ) : (
                <img
                  src={currentMedia.url}
                  alt={project.title}
                  className="project-carousel-media carousel-media-clickable"
                  onClick={openFullscreen}
                />
              )}

              {/* Carousel Controls */}
              {project.media.length > 1 && (
                <>
                  <button
                    className={`carousel-btn carousel-btn-prev ${mediaIndex === 0 ? "disabled" : ""}`}
                    onClick={handlePrevMedia}
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    className={`carousel-btn carousel-btn-next ${mediaIndex === project.media.length - 1 ? "disabled" : ""}`}
                    onClick={handleNextMedia}
                  >
                    <ChevronRight size={24} />
                  </button>

                  <div className="carousel-indicators">
                    {project.media.map((_, i) => (
                      <div
                        key={i}
                        className={`carousel-dot ${i === mediaIndex ? "active" : ""}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          ) : !project.preview && project.url ? (
            // Favicon Fallback
            <div className="project-carousel fallback-modal-carousel">
              <img
                src={getProjectPreview(project)}
                alt={project.title}
                className="project-carousel-media fallback-favicon-modal"
              />
            </div>
          ) : project.preview ? (
            // General Preview Fallback — también clickeable a fullscreen
            <div className="project-carousel">
              <button
                className="carousel-fullscreen-btn"
                onClick={() => setFullscreen(true)}
                aria-label="Ver en pantalla completa"
                title="Pantalla completa"
              >
                <Maximize2 size={16} />
              </button>
              <img
                src={project.preview}
                alt={project.title}
                className="project-carousel-media carousel-media-clickable"
                onClick={() => setFullscreen(true)}
              />
            </div>
          ) : null}

          <p className="project-modal-desc">{project.description}</p>

          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="project-modal-link-btn"
            >
              Ver Proyecto <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>

      {/* Fullscreen Viewer — montado fuera del modal-content para cubrir todo */}
      {fullscreen && project.media && project.media.length > 0 && (
        <FullscreenViewer
          media={project.media}
          startIndex={mediaIndex}
          onClose={() => setFullscreen(false)}
        />
      )}
      {fullscreen && (!project.media || project.media.length === 0) && project.preview && (
        <FullscreenViewer
          media={[{ type: "image", url: project.preview }]}
          startIndex={0}
          onClose={() => setFullscreen(false)}
        />
      )}
    </>
  );
}
