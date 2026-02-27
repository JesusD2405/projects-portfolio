import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// Components
import { Provider } from "@/components/chakra-ui/provider";
import Navbar from "@/components/core/navbar/navbar";
// Data
import profileData from "@/helpers/profile-data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const BASE_URL = "https://jesusd2405.github.io/projects-portfolio";

// ─── Comprehensive SEO Metadata ───────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  // ── Basics ──
  title: {
    default: "Jesús David Pérez | Full-Stack Software Developer",
    template: "%s | Jesús David Pérez",
  },
  description:
    "Full-Stack Software Developer con +8 años de experiencia. Especialista en React, Next.js, Node.js, Django y Vue.js. Disponible para proyectos remotos. Ciudad Guayana, Venezuela.",
  keywords: [
    "Full-Stack Developer",
    "Software Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js",
    "Django",
    "Vue.js",
    "TypeScript",
    "JavaScript",
    "Portfolio",
    "Remote Developer",
    "Venezuela",
    "Jesús David Pérez",
    "JesusD2405",
    "Web Developer",
    "Frontend Developer",
    "Backend Developer",
    "Docker",
    "GraphQL",
    "PostgreSQL",
  ],
  authors: [
    {
      name: profileData.name,
      url: profileData.linkedin,
    },
  ],
  creator: profileData.name,
  publisher: profileData.name,

  // ── Open Graph (Facebook, LinkedIn, WhatsApp) ──
  openGraph: {
    type: "profile",
    locale: "es_VE",
    alternateLocale: "en_US",
    url: BASE_URL,
    siteName: "Jesús David Pérez — Portfolio",
    title: "Jesús David Pérez | Full-Stack Software Developer",
    description:
      "Full-Stack Software Developer con +8 años de experiencia. React, Next.js, Node.js, Django, Vue.js. Portfolio inspirado en Ubuntu 24.04 LTS.",
    images: [
      {
        url: `${BASE_URL}/imgs/og/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Jesús David Pérez — Full-Stack Software Developer Portfolio",
        type: "image/png",
      },
    ],
    firstName: "Jesús David",
    lastName: "Pérez",
    username: "JesusD2405",
  },

  // ── Twitter / X Card ──
  twitter: {
    card: "summary_large_image",
    title: "Jesús David Pérez | Full-Stack Software Developer",
    description:
      "Full-Stack Developer con +8 años de experiencia. React, Next.js, Node.js, Django, Vue.js.",
    images: [`${BASE_URL}/imgs/og/og-image.png`],
    creator: "@JesusD2405",
  },

  // ── Canonical & Alternates ──
  alternates: {
    canonical: BASE_URL,
    languages: {
      "es-VE": BASE_URL,
      "en-US": BASE_URL,
    },
  },

  // ── Indexing & Robots ──
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── App & PWA hints ──
  applicationName: "Jesús David Pérez Portfolio",
  category: "technology",
  classification: "Software Development, Portfolio",

  // ── Verification (fill when you get codes from Search Console) ──
  // verification: {
  //   google: "YOUR_GOOGLE_SITE_VERIFICATION_TOKEN",
  // },
};

// ─── Structured Data (JSON-LD) ────────────────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profileData.name,
  jobTitle: profileData.headline,
  email: profileData.email,
  url: BASE_URL,
  sameAs: [profileData.github, profileData.linkedin],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ciudad Guayana",
    addressRegion: "Bolívar",
    addressCountry: "VE",
  },
  knowsAbout: [
    "React",
    "Next.js",
    "Node.js",
    "Django",
    "Vue.js",
    "TypeScript",
    "GraphQL",
    "Docker",
    "PostgreSQL",
    "Full-Stack Development",
    "Software Architecture",
    "DevOps",
  ],
  worksFor: {
    "@type": "Organization",
    name: "Orsys Consulting, Inc.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Puerto Rico",
      addressCountry: "US",
    },
  },
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "Universidad Nacional Experimental de Guayana (UNEG)",
  },
  hasOccupation: {
    "@type": "Occupation",
    name: "Full-Stack Software Developer",
    occupationLocation: {
      "@type": "Country",
      name: "Venezuela",
    },
    estimatedSalary: {
      "@type": "MonetaryAmountDistribution",
      name: "base",
      currency: "USD",
      duration: "P1M",
      percentile10: 2000,
      percentile25: 3000,
      median: 4500,
    },
    skills:
      "React, Next.js, Node.js, Django, Vue.js, TypeScript, Docker, GraphQL, PostgreSQL",
    experienceRequirements: "8+ years",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Favicon set */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="imgs/icons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="imgs/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="imgs/icons/favicon-16x16.png"
        />
        <link rel="manifest" href="imgs/icons/site.webmanifest" />
        <link rel="icon" href="imgs/icons/favicon.ico" />

        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#300A24" />
        <meta name="msapplication-TileColor" content="#300A24" />
        <meta name="color-scheme" content="dark light" />

        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <Provider>
          <Navbar />
          {children}
        </Provider>
      </body>
    </html>
  );
}
