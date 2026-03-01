import profileData from "@/helpers/profile-data";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";

export function ContactSection() {
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
