/**
 * Portfolio Data
 * Source: LinkedIn Profile (LINKEDIN_PROFILE_URL from .env)
 * Last updated: 2026-02-26
 *
 * To update: modify this file with data from your LinkedIn profile.
 * The LINKEDIN_PROFILE_URL env var is: process.env.LINKEDIN_PROFILE_URL
 */

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  tech: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  description: string;
}

export interface Project {
  name: string;
  description: string;
  tech: string[];
  link: string;
}

export interface SkillCategory {
  category: string;
  skills: { name: string; level: number }[];
}

export interface ProfileData {
  name: string;
  headline: string;
  email: string;
  location: string;
  about: string;
  github: string;
  githubUser: string;
  linkedin: string;
  languages: { language: string; proficiency: string }[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
  skills: SkillCategory[];
}

const profileData: ProfileData = {
  name: "Jesús David Pérez",
  headline: "Full-Stack Software Developer | Node.Js | Django | React | Vue.js",
  email: "jesusdavid2405@gmail.com",
  location: "Ciudad Guayana, Bolívar, Venezuela",
  about:
    "Emprendedor y Full-Stack Software Developer. Responsable, honesto y comunicativo. Llevo desarrollando aplicaciones web por más de 8 años. Orientado a la resolución de problemas y creación de aplicaciones escalables de alta calidad.",
  github: "https://github.com/JesusD2405",
  githubUser: "JesusD2405",
  linkedin: "https://www.linkedin.com/in/jesus-david-perez/",
  languages: [
    { language: "Español", proficiency: "Nativo" },
    { language: "Inglés", proficiency: "Profesional" },
  ],

  experience: [
    {
      company: "Orsys Consulting, Inc.",
      role: "Full Stack Developer",
      period: "Nov 2023 – Presente",
      location: "Remoto — Puerto Rico",
      description:
        "Desarrollo y soporte de sistemas web, manejo de actualizaciones para sistemas legacy en PHP y construcción de nuevas interfaces modernas con Next.js.",
      tech: ["Next.js 14", "PHP", "Oracle DB", "Redux Toolkit", "Tailwind CSS"],
    },
    {
      company: "Omegasoft C.A.",
      role: "DevOps Developer",
      period: "Oct 2023 – Jul 2024",
      location: "Remoto — Caracas, Venezuela",
      description:
        "Desarrollo DevOps con Django Rest Framework e integración con Odoo. Implementación de pipelines CI/CD con Docker.",
      tech: ["Django Rest Framework", "Next.js 14", "Docker", "Odoo"],
    },
    {
      company: "Cargobot",
      role: "Senior Frontend Developer",
      period: "Mar 2022 – Jul 2023",
      location: "Remoto — Miami, USA",
      description:
        "Desarrollo de interfaces avanzadas con Vue.js e integración con Amazon Freight para la gestión de transporte de carga.",
      tech: ["Vue.js", "Vuex", "Amazon Freight", "JavaScript"],
    },
    {
      company: "The Singular Factory",
      role: "Full Stack Developer",
      period: "Jul 2020 – Jul 2023",
      location: "Remoto — Las Palmas, España",
      description:
        "Desarrollo full-stack de aplicaciones web utilizando Node.js, Django, Angular y Vue. Implementación de servicios con GraphQL y PostgreSQL.",
      tech: ["Node.js", "Django", "Angular", "Vue.js", "Docker", "GraphQL", "PostgreSQL"],
    },
    {
      company: "GuayanaDev",
      role: "CEO & Founder",
      period: "Jun 2020 – Dic 2021",
      location: "Ciudad Guayana, Venezuela",
      description:
        "Fundación y liderazgo de empresa de desarrollo de software. Gestión de proyectos y equipos de desarrollo.",
      tech: ["Emprendimiento", "Gestión de Proyectos", "Liderazgo"],
    },
    {
      company: "idpixel",
      role: "CTO & Software Architect",
      period: "Jun 2018 – Jun 2020",
      location: "Ciudad Guayana, Venezuela",
      description:
        "Dirección técnica y diseño de arquitectura de software para proyectos web y mobile.",
      tech: ["React", "Node.js", "PostgreSQL", "Docker", "Arquitectura de Software"],
    },
    {
      company: "GuayanaDev",
      role: "CTO & Full Stack Developer",
      period: "Nov 2017 – Jun 2020",
      location: "Ciudad Guayana, Venezuela",
      description:
        "Dirección técnica y desarrollo full-stack de aplicaciones web para clientes diversos.",
      tech: ["Node.js", "React", "Vue.js", "Django", "MySQL"],
    },
  ],

  education: [
    {
      degree: "Ingeniero en Informática",
      institution: "Universidad Nacional Experimental de Guayana (UNEG)",
      period: "2013 – 2018",
      description:
        "Ingeniería en Informática con enfoque en desarrollo de software y arquitectura de sistemas.",
    },
    {
      degree: "Redes Profesionales y Soporte IP",
      institution: "J.G Tecnologías",
      period: "2015 – 2016",
      description:
        "Certificación en redes profesionales, soporte IP y administración de infraestructura de red.",
    },
  ],

  projects: [
    {
      name: "Portfolio Ubuntu",
      description:
        "Portfolio web inspirado en Ubuntu 24.04 LTS con emulación de escritorio GNOME. Construido con Next.js y Chakra UI.",
      tech: ["Next.js", "React", "TypeScript", "TailwindCSS", "Chakra UI"],
      link: "https://github.com/JesusD2405/projects-portfolio",
    },
  ],

  skills: [
    {
      category: "Frontend",
      skills: [
        { name: "React / Next.js", level: 92 },
        { name: "Vue.js (Vuex)", level: 88 },
        { name: "Angular", level: 75 },
        { name: "TypeScript", level: 90 },
        { name: "Tailwind CSS", level: 85 },
        { name: "Redux / Redux Toolkit", level: 82 },
        { name: "jQuery", level: 70 },
      ],
    },
    {
      category: "Backend",
      skills: [
        { name: "Node.js / Express", level: 90 },
        { name: "Django / DRF", level: 88 },
        { name: "PHP / Laravel", level: 72 },
        { name: "GraphQL", level: 78 },
        { name: "REST APIs", level: 95 },
        { name: "WebSockets", level: 80 },
        { name: "C++", level: 60 },
      ],
    },
    {
      category: "Databases",
      skills: [
        { name: "Oracle DB", level: 80 },
        { name: "PostgreSQL", level: 85 },
        { name: "MySQL / MariaDB", level: 82 },
        { name: "Firebase", level: 70 },
      ],
    },
    {
      category: "DevOps & Tools",
      skills: [
        { name: "Docker", level: 85 },
        { name: "Git / GitHub", level: 92 },
        { name: "Linux / Ubuntu", level: 88 },
        { name: "CI/CD Pipelines", level: 75 },
      ],
    },
  ],
};

export default profileData;
