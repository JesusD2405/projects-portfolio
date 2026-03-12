import { useState } from "react";
import profileData, { Project } from "@/helpers/profile-data";
import { ExternalLink } from "lucide-react";
import {
  ProjectDetailModal,
  ModalProject,
} from "@/components/ProjectDetailModal";

/** Adapta un Project del perfil al formato ModalProject */
function toModalProject(p: Project): ModalProject {
  return {
    title: p.name,
    url: p.link && p.link !== "#" && p.link !== "" ? p.link : undefined,
    preview: p.preview,
    description: p.description,
    media: p.media,
  };
}

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="file-manager-section">
      <div className="hidden md:block file-sidebar">
        <h3>📁 Proyectos</h3>
        <ul>
          {profileData.projects.map((p, i) => (
            <li
              key={i}
              className="file-item"
              onClick={() => setSelectedProject(p)}
              style={{ cursor: "pointer" }}
            >
              📂 {p.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="file-content">
        <div className="projects-grid">
          {profileData.projects.map((p, i) => (
            <div
              key={i}
              className="project-card"
              onClick={() => setSelectedProject(p)}
              style={{ cursor: "pointer" }}
            >
              {/* Preview image */}
              {(p.preview || (p.link && p.link !== "#" && p.link !== "")) && (
                <div className="project-card-preview">
                  <img
                    src={
                      p.preview
                        ? p.preview
                        : `https://www.google.com/s2/favicons?domain=${new URL(p.link).hostname}&sz=128`
                    }
                    alt={p.name}
                    className={`project-card-preview-img${!p.preview ? " fallback-favicon" : ""}`}
                  />
                </div>
              )}

              <div className="project-card-header">
                <h3>{p.name}</h3>
                {p.link !== "#" && p.link !== "" && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
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

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectDetailModal
          project={toModalProject(selectedProject)}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}
