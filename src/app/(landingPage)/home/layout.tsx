import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jesús David Pérez | Full-Stack Software Developer Portfolio",
  description:
    "Portfolio de Jesús David Pérez, Full-Stack Developer con +8 años de experiencia en React, Next.js, Node.js, Django y Vue.js. Disponible para proyectos remotos desde Venezuela.",
  alternates: {
    canonical: "https://jesusd2405.github.io/projects-portfolio/home",
  },
  openGraph: {
    title: "Jesús David Pérez | Full-Stack Software Developer Portfolio",
    description:
      "Portfolio inspirado en Ubuntu 24.04 LTS. +8 años de experiencia en React, Next.js, Node.js, Django, Vue.js. Disponible remoto.",
    url: "https://jesusd2405.github.io/projects-portfolio/home",
    type: "profile",
  },
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
