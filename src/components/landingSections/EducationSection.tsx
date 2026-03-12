import profileData from "@/helpers/profile-data";
import { GraduationCap, ExternalLink } from "lucide-react";

export function EducationSection() {
  return (
    <div className="timeline-section">
      <div className="timeline-container">
        {profileData.education.map((e, i) => (
          <div
            key={i}
            className="timeline-item timeline-item-expanded"
            style={{ animationDelay: `${i * 0.12}s` }}
          >
            {/* Track: dot + vertical line */}
            <div className="timeline-track">
              <div className="timeline-dot timeline-dot-active">
                <GraduationCap size={14} />
              </div>
              {i < profileData.education.length - 1 && (
                <div className="timeline-line" />
              )}
            </div>

            {/* Card content — always expanded, no toggle button */}
            <div className="timeline-content edu-card">
              {/* Header */}
              <div className="edu-card-header">
                <div className="timeline-header-left">
                  <h3 className="timeline-role">
                    {e.logo ? (
                      <span className="company-logo-wrap">
                        <img
                          src={e.logo}
                          alt={e.institution}
                          className="company-logo-img"
                          onError={(ev) => {
                            const target = ev.currentTarget;
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
                          <GraduationCap size={14} />
                        </span>
                      </span>
                    ) : (
                      <span className="company-logo-wrap company-logo-wrap--icon">
                        <GraduationCap size={14} />
                      </span>
                    )}
                    {e.link ? (
                      <a
                        href={e.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="edu-institution-link"
                        onClick={(ev) => ev.stopPropagation()}
                      >
                        {e.institution}
                        <ExternalLink size={12} className="edu-institution-link-icon" />
                      </a>
                    ) : (
                      <span>{e.institution}</span>
                    )}
                  </h3>
                  <span className="timeline-company">{e.degree}</span>
                </div>

                <div className="timeline-header-right">
                  <span className="timeline-period">{e.period}</span>
                </div>
              </div>

              {/* Body — always visible */}
              <div className="edu-card-body">
                <p className="timeline-description">{e.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
