"use client";
import { FC, useState, useCallback } from "react";
import {
  Terminal,
  Briefcase,
  FolderOpen,
  Code,
  GraduationCap,
  Mail,
  Grid3X3,
} from "lucide-react";
import { dockItems } from "@/helpers/routes";

const iconMap: Record<string, FC<{ size?: number; className?: string }>> = {
  terminal: Terminal,
  briefcase: Briefcase,
  "folder-open": FolderOpen,
  code: Code,
  "graduation-cap": GraduationCap,
  mail: Mail,
};

interface DockProps {
  activeSection: string | null;
  onSectionChange: (section: string) => void;
}

const Dock: FC<DockProps> = ({ activeSection, onSectionChange }) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [showActivities, setShowActivities] = useState(false);

  const handleItemClick = useCallback(
    (section: string) => {
      onSectionChange(section);
    },
    [onSectionChange]
  );

  return (
    <>
      {/* Dock Container - Left side like Ubuntu */}
      <aside className="dock-container">
        {/* Activities Button */}
        <button
          className="dock-activities-btn"
          onClick={() => setShowActivities(!showActivities)}
          title="Activities"
        >
          <Grid3X3 size={22} />
        </button>

        {/* Separator */}
        <div className="dock-separator" />

        {/* Dock Items */}
        <div className="dock-items">
          {dockItems.map((item) => {
            const IconComponent = iconMap[item.icon];
            const isActive = activeSection === item.section;
            const isHovered = hoveredItem === item.id;

            return (
              <div key={item.id} className="dock-item-wrapper">
                {/* Tooltip */}
                {isHovered && (
                  <div className="dock-tooltip">{item.label}</div>
                )}

                {/* Dock Icon Button */}
                <button
                  className={`dock-icon-btn ${isActive ? "dock-icon-active" : ""}`}
                  style={
                    {
                      "--icon-color": item.color,
                    } as React.CSSProperties
                  }
                  onClick={() => handleItemClick(item.section)}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  title={item.label}
                >
                  {IconComponent && (
                    <IconComponent size={24} className="dock-icon-svg" />
                  )}
                </button>

                {/* Active Indicator - Ubuntu orange dot */}
                {isActive && <div className="dock-active-indicator" />}
              </div>
            );
          })}
        </div>
      </aside>
    </>
  );
};

export default Dock;
