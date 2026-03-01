"use client";
import { FC, ReactNode, useState, useRef } from "react";
import { X, Minus, Maximize2 } from "lucide-react";

interface DesktopWindowProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onReachBoundary?: (direction: "next" | "prev") => void;
  children: ReactNode;
}

const DesktopWindow: FC<DesktopWindowProps> = ({
  title,
  isOpen,
  onClose,
  onReachBoundary,
  children,
}) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const lastTrigger = useRef(0);
  const touchStartRef = useRef<number | null>(null);

  if (!isOpen) return null;

  const checkBoundary = (deltaY: number) => {
    if (!onReachBoundary || !contentRef.current) return;
    const now = Date.now();

    // Prevent multiple rapid section jumps (debounce of 800ms)
    if (now - lastTrigger.current < 800) return;

    const el = contentRef.current;
    const isAtBottom =
      Math.ceil(el.scrollTop + el.clientHeight) >= el.scrollHeight - 2;
    const isAtTop = el.scrollTop <= 2;

    if (deltaY > 0 && isAtBottom) {
      onReachBoundary("next");
      lastTrigger.current = now;
    } else if (deltaY < 0 && isAtTop) {
      onReachBoundary("prev");
      lastTrigger.current = now;
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    checkBoundary(e.deltaY);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartRef.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartRef.current === null) return;
    const deltaY = touchStartRef.current - e.touches[0].clientY;

    // Require a minimum swipe distance to avoid overly sensitive jumps
    if (Math.abs(deltaY) > 30) {
      checkBoundary(deltaY);
      touchStartRef.current = e.touches[0].clientY; // Reset touch anchor to avoid rapid consecutive triggers on one swipe
    }
  };

  const handleTouchEnd = () => {
    touchStartRef.current = null;
  };

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
            onClick={onClose}
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
      <div
        className="window-content"
        ref={contentRef}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {children}
      </div>
    </div>
  );
};

export default DesktopWindow;
