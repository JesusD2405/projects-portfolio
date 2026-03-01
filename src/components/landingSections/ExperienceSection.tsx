import { useState } from "react";
import profileData from "@/helpers/profile-data";
import { Briefcase, ChevronDown, Globe } from "lucide-react";

export function ExperienceSection() {
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
