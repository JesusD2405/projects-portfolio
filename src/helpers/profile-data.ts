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
  logo?: string; // Optional URL for the company logo
  link?: string; // Optional URL for the company website
  projects?: ExperienceProject[];
}

export interface Education {
  logo?: string; // Optional URL for the company logo
  preview?: string; // Optional URL for the preview image/gif on the card
  degree: string;
  institution: string;
  period: string;
  description: string;
  link: string;
}

export interface Project {
  name: string;
  description: string;
  tech: string[];
  link: string;
  preview?: string; // Optional URL for the preview image/gif on the card
  media?: ExperienceProjectMedia[]; // Optional array of media for the modal carousel
}

export interface SkillCategory {
  category: string;
  skills: { name: string; level: number }[];
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  image?: string;
  read: boolean;
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
  notifications: NotificationItem[];
}

import baseProfileDataJson from "../../public/data/profile-data-es.json";

// Fallback exported for client components before they are migrated to the context
// (Will effectively serve as initial empty state to avoid 'undefined' errors)
const profileData: ProfileData = baseProfileDataJson as ProfileData;

export default profileData;
