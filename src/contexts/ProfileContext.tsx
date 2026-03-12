"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { ProfileData } from "@/helpers/profile-data";
import baseProfileData from "@/helpers/profile-data";

export type Language = "es" | "en";

interface ProfileContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  profileData: ProfileData | null;
  isLoading: boolean;
}

const ProfileContext = createContext<ProfileContextProps | undefined>(
  undefined
);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguageState] = useState<Language>("es");
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load saved language or detect browser language on mount
  useEffect(() => {
    const savedLang = localStorage.getItem("portfolio-language") as Language;
    if (savedLang && (savedLang === "es" || savedLang === "en")) {
      setLanguageState(savedLang);
    } else {
      const browserLang = navigator.language;
      if (browserLang.toLowerCase().startsWith("en")) {
        setLanguageState("en");
      } else {
        setLanguageState("es");
      }
    }
  }, []);

  // Fetch data when language changes
  useEffect(() => {
    let isMounted = true;
    const fetchProfileData = async () => {
      setIsLoading(true);
      try {
        // Dynamic fetch of the JSON data located in /public/data/
        const res = await fetch(`/projects-portfolio/data/profile-data-${language}.json`);
        if (!res.ok) throw new Error("Failed to fetch profile data");
        const data = await res.json();
        if (isMounted) {
          setProfileData(data);
        }
      } catch (error) {
        console.error("Error loading profile data:", error);
        // Fallback to Spanish static data just in case
        if (isMounted) setProfileData(baseProfileData);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchProfileData();

    return () => {
      isMounted = false;
    };
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("portfolio-language", lang);
  };

  return (
    <ProfileContext.Provider
      value={{ language, setLanguage, profileData, isLoading }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};
