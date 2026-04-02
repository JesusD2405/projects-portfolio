"use client";

import { FC, useState, useRef, useEffect } from "react";
import {
  Languages,
  Wifi,
  Volume2,
  BatteryFull,
  ChevronDown,
} from "lucide-react";
import { useProfile } from "@/contexts/ProfileContext";

const Toolbar: FC = () => {
  const { language, setLanguage } = useProfile();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="system-tray flex gap-2">
      <div
        ref={langRef}
        className="tray-icons relative flex items-center gap-1"
        onClick={() => setIsLangOpen(!isLangOpen)}
      >
        <Languages size={16} />
        <span className="text-xs uppercase font-medium">{language}</span>

        {isLangOpen && (
          <div
            className="absolute top-8 right-0 py-1 w-28 rounded-md shadow-xl z-[200] overflow-hidden"
            style={{
              backgroundColor: "var(--ubuntu-panel)",
              border: "1px solid var(--ubuntu-window-border)",
              padding: "8px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                setLanguage("es");
                setIsLangOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-sm transition-colors hover:bg-white/10 ${
                language === "es" ? "text-white font-bold" : "text-white/70"
              }`}
            >
              Español 🇻🇪
            </button>
            <button
              onClick={() => {
                setLanguage("en");
                setIsLangOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-sm transition-colors hover:bg-white/10 ${
                language === "en" ? "text-white font-bold" : "text-white/70"
              }`}
            >
              English 🇺🇸
            </button>
          </div>
        )}
      </div>

      <div className="tray-icons">
        <Wifi size={16} />
        <Volume2 size={16} />
        <BatteryFull size={16} />
        <ChevronDown size={14} />
      </div>
    </div>
  );
};

export default Toolbar;
