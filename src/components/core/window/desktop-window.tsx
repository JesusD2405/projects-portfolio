"use client";
import { FC, ReactNode, useState } from "react";
import { X, Minus, Maximize2 } from "lucide-react";

interface DesktopWindowProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const DesktopWindow: FC<DesktopWindowProps> = ({
  title,
  isOpen,
  onClose,
  children,
}) => {
  const [isMaximized, setIsMaximized] = useState(false);

  if (!isOpen) return null;

  return (
    <div
      className={`desktop-window ${isMaximized ? "desktop-window-maximized" : ""}`}
    >
      {/* Title Bar */}
      <div className="window-titlebar">
        <div className="window-controls">
          <button
            className="window-btn window-btn-close"
            onClick={onClose}
            title="Close"
          >
            <X size={10} />
          </button>
          <button
            className="window-btn window-btn-minimize"
            onClick={() => {}}
            title="Minimize"
          >
            <Minus size={10} />
          </button>
          <button
            className="window-btn window-btn-maximize"
            onClick={() => setIsMaximized(!isMaximized)}
            title="Maximize"
          >
            <Maximize2 size={10} />
          </button>
        </div>
        <span className="window-title">{title}</span>
        <div className="window-controls-spacer" />
      </div>

      {/* Window Content */}
      <div className="window-content">{children}</div>
    </div>
  );
};

export default DesktopWindow;
