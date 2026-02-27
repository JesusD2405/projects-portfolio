export const RoutesPath = {
  HOME: "home",
};

export interface DockItem {
  id: string;
  label: string;
  icon: string;
  color: string;
  section: string;
}

export const dockItems: DockItem[] = [
  {
    id: "about",
    label: "About Me",
    icon: "terminal",
    color: "#300A24",
    section: "about",
  },
  {
    id: "experience",
    label: "Experience",
    icon: "briefcase",
    color: "#E95420",
    section: "experience",
  },
  {
    id: "projects",
    label: "Projects",
    icon: "folder-open",
    color: "#77216F",
    section: "projects",
  },
  {
    id: "skills",
    label: "Skills",
    icon: "code",
    color: "#0078D4",
    section: "skills",
  },
  {
    id: "education",
    label: "Education",
    icon: "graduation-cap",
    color: "#2C001E",
    section: "education",
  },
  {
    id: "contact",
    label: "Contact",
    icon: "mail",
    color: "#E95420",
    section: "contact",
  },
];
