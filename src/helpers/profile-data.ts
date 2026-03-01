/**
 * Portfolio Data
 * Source: LinkedIn Profile (LINKEDIN_PROFILE_URL from .env)
 * Last updated: 2026-02-26
 *
 * To update: modify this file with data from your LinkedIn profile.
 * The LINKEDIN_PROFILE_URL env var is: process.env.LINKEDIN_PROFILE_URL
 */

export interface ExperienceProjectMedia {
  type: "image" | "video";
  url: string;
}

export interface ExperienceProject {
  title: string;
  url?: string; // Optional URL linking to the project
  preview?: string; // Optional URL for the preview image/gif on the card
  description: string;
  media?: ExperienceProjectMedia[]; // Optional array of media for the modal carousel
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  tech: string[];
  projects?: ExperienceProject[];
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
  location: "Ciudad Guayana (8050), Edo. Bolívar, Venezuela.",
  about:
    "Responsable, honesto y comunicativo. Desarrollo apps webs desde hace +8 años, también he tenido la oportunidad de liderar equipos pequeños de desarrollo, llevar empredimientos en la industria del desarrollo de software y aportar mi experiencia en ámbitos de educación. <br><br>¡Hola Mundo! así empezó todo.. Soy un apasionado por la tecnología y los desarrollos innovadores. <br><br>Me motiva aprender cada día, poder desarrollar mi capacidad en frente de buenos retos y disfrutar del camino.<br><br>“La mejor manera de predecir el futuro es inventarlo.” - Steve Jobs",
  github: "https://github.com/JesusD2405",
  githubUser: "JesusD2405",
  linkedin: "https://www.linkedin.com/in/jesus-david-perez/",
  languages: [
    { language: "Español", proficiency: "Nativo" },
    { language: "Inglés", proficiency: "A2" },
  ],

  experience: [
    {
      company: "Orsys Consulting, Inc.",
      role: "Full Stack Developer",
      period: "Nov 2023 – Presente",
      location: "Remoto — Puerto Rico",
      description:
        "- Desarrollador Web Full-Stack bajo, desarrollos en PHP y el framework Next.js 14.<br>- Manejo de Redux Toolkit y Tailwind CSS.<br>- Base de Datos Oracle.<br>- Soporte y actualizaciones de funcionalidades apps web bajo PHP, HTML, CSS, JS, JQUERY",
      tech: ["Next.js 14", "PHP", "Oracle DB", "Redux Toolkit", "Tailwind CSS"],
      projects: [
        {
          title: "Dorado - Gestión Municipal",
          url: "https://dorado.gestionmunicipalpr.com/",
          description: "",
          media: [],
        },
      ],
    },
    {
      company: "Omegasoft C.A.",
      role: "DevOps Developer",
      period: "Oct 2023 – Jul 2024",
      location: "Remoto — Caracas, Venezuela",
      description:
        "- Full-Stack Developer bajo frameworks Django Rest Framework y Next.js 14<br>- Manejo de Docker, Redux Toolkit y Tailwind Css<br>- Base de Datos PostgreSql<br>- Desarrollo de Integraciones Backend con Api de Odoo mediante comunicación XMLRPC<br>- Configuración y ambiente de despliegue de apps web bajo Linux Ubuntu Server 22.04 LTS / Nginx / Docker",
      tech: ["Django Rest Framework", "Next.js 14", "Docker", "Odoo"],
      projects: [
        {
          title: "Visor de Productos Web Responsive",
          preview: "projects/omegasoft/IMG-20240124-WA0001.jpg",
          description:
            "Visor de Productos con conexión mediante Api con Odoo. Sistema Web bajo Next.js/Django/Docker, permite la configuración para visualización de todo tipo de pantallas mediante un tipo de vista según orientación (Vertical/Horizontal), publicidades, categorías y productos.",
          media: [
            {
              type: "image",
              url: "projects/omegasoft/IMG-20240124-WA0001.jpg",
            },
            {
              type: "image",
              url: "projects/omegasoft/IMG-20240301-WA0015.jpg",
            },
            {
              type: "image",
              url: "projects/omegasoft/IMG-20240301-WA0016.jpg",
            },
            {
              type: "image",
              url: "projects/omegasoft/IMG-20240301-WA0017.jpg",
            },
            {
              type: "image",
              url: "projects/omegasoft/IMG-20240301-WA0018.jpg",
            },
            {
              type: "image",
              url: "projects/omegasoft/lk IMG-20240301-WA0019.jpg",
            },
            {
              type: "video",
              url: "projects/omegasoft/WhatsApp Video 2024-10-10 at 2.31.47 PM.mp4",
            },
          ],
        },
      ],
    },
    {
      company: "Cargobot",
      role: "Senior Frontend Developer",
      period: "Mar 2022 – Jul 2023",
      location: "Remoto — Miami, USA",
      description:
        "- Desarrollador Web Front-End bajo el framework Vue.<br>- Manejo de Vuex<br>- Rediseño de interfaces bajo arquitectura responsive<br>- Integraciones de funcionalidades, componentes y widgets con Amazon Freight, Macropoint, Green Screems, Chatbot.. En el ámbito de la gestión de carga<br>- Soporte y actualizaciones de funcionalidades front-end del core de la app web",
      tech: ["Vue.js", "Vuex", "Amazon Freight", "JavaScript"],
      projects: [
        {
          title: "Cargobot",
          url: "https://www.cargobot.io/",
          description: "",
          media: [],
        },
      ],
    },
    {
      company: "The Singular Factory",
      role: "Full Stack Developer",
      period: "Jul 2020 – Jul 2023",
      location: "Remoto — Las Palmas, España",
      description:
        "- Full-Stack Developer bajo frameworks Node, Django, Angular y Vue<br>- Manejo de Docker, GraphQl, Lenguaje SQL, Base de Datos PostgreSql / MySql y Migraciones de BD PostgreSql<br>- Desarrollo de Integraciones backend con Apis bancarias y pasarelas de pago como Stripe bajo Django Rest Framework y Node.Js<br>- Desarrollo en Django Rest Framework y Flask con arquitectura de microservicios",
      tech: [
        "Node.js",
        "Django",
        "Angular",
        "Vue.js",
        "Docker",
        "GraphQL",
        "PostgreSQL",
      ],
      projects: [
        {
          title: "CMED",
          url: "https://www.cmed-online.com",
          description:
            "Organiza tu vídeo consulta con especialistas médicos y utiliza nuestro sistema de mensajería segura para discutir tu caso con uno de nuestros especialistas",
          media: [],
        },
      ],
    },
    {
      company: "Trigo Technologies",
      role: "Full Stack Developer",
      period: "Jun 2020 – Dic 2021",
      location: "Ciudad Guayana, Venezuela",
      description:
        "Web Developer Full-Stack Js bajo los frameworks Angular, Electron y Nest. Patrón de diseño y desarrollo bajo Clean Architecture y Clean Code. Base de Datos NoSQL MongoDB y servicios en Firebase.",
      tech: ["Angular", "Electron", "Nest", "MongoDB", "Firebase"],
      projects: [
        {
          title: "Infoscreen GO",
          url: "https://www.youtube.com/watch?v=X54SpwPoG-o",
          description: "Sistema de selección y autopago.",
          media: [],
        },
      ],
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
      company: "Idepixel",
      role: "CTO & Software Architect",
      period: "Jun 2018 – Jun 2020",
      location: "Ciudad Guayana, Venezuela",
      description:
        "Dirección técnica y diseño de arquitectura de software para proyectos web y mobile.",
      tech: [
        "React",
        "Node.js",
        "PostgreSQL",
        "Docker",
        "Arquitectura de Software",
      ],
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
      name: "Portafolio Ubuntu (Proyecto Actual)",
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
        { name: "React / Next.js", level: 95 },
        { name: "Vue.js (Vuex)", level: 90 },
        { name: "Angular", level: 85 },
        { name: "TypeScript", level: 95 },
        { name: "Tailwind CSS", level: 95 },
        { name: "Redux / Redux Toolkit", level: 90 },
        { name: "jQuery", level: 90 },
      ],
    },
    {
      category: "Backend",
      skills: [
        { name: "Node.js / Express", level: 90 },
        { name: "Django / DRF", level: 95 },
        { name: "PHP / Laravel", level: 90 },
        { name: "GraphQL", level: 80 },
        { name: "REST APIs", level: 95 },
        { name: "WebSockets", level: 90 },
        { name: "C", level: 85 },
        { name: "C++", level: 70 },
      ],
    },
    {
      category: "Databases",
      skills: [
        { name: "Oracle DB", level: 80 },
        { name: "PostgreSQL", level: 95 },
        { name: "MySQL / MariaDB", level: 95 },
        { name: "SQL Server", level: 90 },
        { name: "MongoDB", level: 90 },
        { name: "Firebase", level: 70 },
      ],
    },
    {
      category: "DevOps & Tools",
      skills: [
        { name: "Linux", level: 95 },
        { name: "Docker", level: 90 },
        { name: "Git", level: 95 },
        { name: "CI/CD Pipelines", level: 90 },
      ],
    },
  ],
};

export default profileData;
