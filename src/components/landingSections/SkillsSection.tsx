import { useState, useEffect, useRef } from "react";
import profileData from "@/helpers/profile-data";

export function SkillsSection() {
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
