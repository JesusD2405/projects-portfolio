import profileData from "@/helpers/profile-data";

export function EducationSection() {
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
