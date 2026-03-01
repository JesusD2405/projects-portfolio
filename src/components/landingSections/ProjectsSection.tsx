import profileData from "@/helpers/profile-data";
import { ExternalLink } from "lucide-react";

export function ProjectsSection() {
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
