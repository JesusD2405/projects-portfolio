"use client";
import { useState, useRef } from "react";
import { useProfile } from "@/contexts/ProfileContext";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type FieldErrors = Partial<Record<keyof FormState, string>>;

type Status = "idle" | "loading" | "success" | "error";

const INITIAL_FORM: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export function ContactSection() {
  const { profileData } = useProfile();
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string>("");
  const firstErrorRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(
    null,
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (fieldErrors[name as keyof FormState]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setFieldErrors({});
    setServerError("");

    try {
      const res = await fetch("/projects-portfolio/api/new-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.status === 422 && data.errors) {
        setFieldErrors(data.errors as FieldErrors);
        setStatus("idle");
        return;
      }

      if (!res.ok) {
        setServerError(data.error || "Error desconocido. Intenta de nuevo.");
        setStatus("error");
        return;
      }

      setStatus("success");
      setForm(INITIAL_FORM);
    } catch {
      setServerError("No se pudo conectar con el servidor.");
      setStatus("error");
    }
  };

  const isLoading = status === "loading";

  if (!profileData) return null;

  return (
    <div className="contact-section">
      {/* ── Compose Form ── */}
      <div className="contact-compose">
        {status === "success" ? (
          <div className="contact-success">
            <CheckCircle size={48} className="contact-success-icon" />
            <h3>¡Mensaje enviado!</h3>
            <p>
              Gracias por escribirme, <strong>{form.name || "amigo"}</strong>.
              Te responderé lo antes posible.
            </p>
            <button
              className="compose-send-btn"
              onClick={() => setStatus("idle")}
            >
              Enviar otro mensaje
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            {/* To (readonly) */}
            <div className="compose-field">
              <label>Para:</label>
              <span>{profileData.email}</span>
            </div>

            {/* Name */}
            <div className="compose-field">
              <label htmlFor="contact-name">Nombre:</label>
              <input
                id="contact-name"
                name="name"
                type="text"
                placeholder="Tu nombre completo"
                value={form.name}
                onChange={handleChange}
                disabled={isLoading}
                autoComplete="name"
                ref={(el) => {
                  if (fieldErrors.name) firstErrorRef.current = el;
                }}
                className={fieldErrors.name ? "field-error" : ""}
              />
            </div>
            {fieldErrors.name && (
              <div className="compose-field-error">{fieldErrors.name}</div>
            )}

            {/* Email */}
            <div className="compose-field">
              <label htmlFor="contact-email">Email:</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                placeholder="tu@email.com"
                value={form.email}
                onChange={handleChange}
                disabled={isLoading}
                autoComplete="email"
                className={fieldErrors.email ? "field-error" : ""}
              />
            </div>
            {fieldErrors.email && (
              <div className="compose-field-error">{fieldErrors.email}</div>
            )}

            {/* Subject */}
            <div className="compose-field">
              <label htmlFor="contact-subject">Asunto:</label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                placeholder="¡Trabajemos juntos!"
                value={form.subject}
                onChange={handleChange}
                disabled={isLoading}
                className={fieldErrors.subject ? "field-error" : ""}
              />
            </div>
            {fieldErrors.subject && (
              <div className="compose-field-error">{fieldErrors.subject}</div>
            )}

            {/* Message */}
            <div className="compose-body">
              <textarea
                id="contact-message"
                name="message"
                placeholder="Escribe tu mensaje aquí..."
                rows={8}
                value={form.message}
                onChange={handleChange}
                disabled={isLoading}
                className={fieldErrors.message ? "field-error" : ""}
              />
            </div>
            {fieldErrors.message && (
              <div className="compose-field-error">{fieldErrors.message}</div>
            )}

            {/* Server error */}
            {status === "error" && serverError && (
              <div className="compose-server-error">
                <AlertCircle size={15} />
                {serverError}
              </div>
            )}

            <div className="compose-actions">
              <button
                type="submit"
                className="compose-send-btn"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 size={16} className="spin" />
                    Enviando…
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Enviar Mensaje
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* ── Info Sidebar ── */}
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
