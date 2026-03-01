"use client";
import {
  useState,
  useEffect,
  ReactNode,
  Children,
  isValidElement,
  cloneElement,
  ReactElement,
} from "react";

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
interface SequencedProps {
  /** Injected by <Terminal>: absolute delay before this child starts (ms) */
  _startDelay?: number;
  /** Injected by <Terminal>: callback fired when this child finishes */
  _onDone?: () => void;
}

/* ─────────────────────────────────────────────
   TypingAnimation
   Renders text character by character.
───────────────────────────────────────────── */
export interface TypingAnimationProps extends SequencedProps {
  children: string;
  /** Milliseconds per character (default 40) */
  duration?: number;
  className?: string;
  as?: React.ElementType;
}

export function TypingAnimation({
  children,
  duration = 40,
  className,
  as: Tag = "span",
  _startDelay = 0,
  _onDone,
}: TypingAnimationProps) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let cancelled = false;
    let interval: ReturnType<typeof setInterval> | null = null;

    const startTimer = setTimeout(() => {
      if (cancelled) return;
      let idx = 0;
      interval = setInterval(() => {
        if (cancelled) {
          if (interval) clearInterval(interval);
          return;
        }
        idx++;
        setDisplayed(children.slice(0, idx));
        if (idx >= children.length) {
          if (interval) clearInterval(interval);
          _onDone?.();
        }
      }, duration);
    }, _startDelay);

    return () => {
      cancelled = true;
      clearTimeout(startTimer);
      if (interval) clearInterval(interval);
      setDisplayed(""); // reset so Strict Mode second-run starts fresh
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Tag className={className}>{displayed}</Tag>;
}

/* ─────────────────────────────────────────────
   AnimatedSpan
   Fades-in instantly after its delay.
───────────────────────────────────────────── */
export interface AnimatedSpanProps extends SequencedProps {
  children: ReactNode;
  /** Extra delay on top of the sequenced start (ms, default 0) */
  delay?: number;
  className?: string;
}

export function AnimatedSpan({
  children,
  delay = 600,
  className,
  _startDelay = 0,
  _onDone,
}: AnimatedSpanProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
      _onDone?.();
    }, _startDelay + delay);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span
      className={className}
      style={{
        display: "block",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.25s ease",
      }}
    >
      {children}
    </span>
  );
}

/* ─────────────────────────────────────────────
   Terminal
   Sequences its TypingAnimation / AnimatedSpan
   children one after another.
───────────────────────────────────────────── */
export interface TerminalProps {
  children: ReactNode;
  className?: string;
  /** Whether to run children sequentially (default true) */
  sequence?: boolean;
}

export function Terminal({
  children,
  className,
  sequence = true,
}: TerminalProps) {
  // Build a flat list of children info: { el, estimatedDuration }
  // We schedule each child to start right after the previous finishes.
  // Because durations are probabilistic we track "done" callbacks.
  const childArray = Children.toArray(children).filter(
    isValidElement,
  ) as ReactElement<TypingAnimationProps | AnimatedSpanProps>[];

  // accumulated start delays (ms) per child index
  const [startDelays] = useState<number[]>(() => {
    if (!sequence) return childArray.map(() => 0);
    let acc = 0;
    return childArray.map((child) => {
      const delay = acc;
      // estimate duration for this child so next can start
      const props = child.props as TypingAnimationProps & AnimatedSpanProps;
      if (child.type === TypingAnimation) {
        const dur = props.duration ?? 40;
        const len =
          typeof props.children === "string" ? props.children.length : 0;
        acc += dur * len + 80; // 80ms buffer
      } else {
        acc += (props.delay ?? 0) + 120; // AnimatedSpan
      }
      return delay;
    });
  });

  const cloned = childArray.map((child, i) =>
    cloneElement(child, {
      key: i,
      _startDelay: startDelays[i],
    } as Partial<SequencedProps>),
  );

  return (
    <div
      className={`terminal-animated-root${className ? ` ${className}` : ""}`}
      style={{
        fontFamily: '"Ubuntu Mono", "Geist Mono", monospace',
        color: "#f0f0f0",
        background: "transparent",
      }}
    >
      {cloned}
    </div>
  );
}
