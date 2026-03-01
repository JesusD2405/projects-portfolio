"use client";
import { useState, useEffect, useRef } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import profileData from "@/helpers/profile-data";
import { TypingAnimation } from "@/components/core/terminal/animated-terminal";

/* ─────────────────────────────────────────────────────────────────
   Timing constants base values
───────────────────────────────────────────────────────────────── */
const NEOFETCH_CMD = "jesusdavid@ubuntu:~$ neofetch"; // prompt + cmd → full length for timing
const CAT_CMD = " cat social-links.txt"; // only the animated part (14 chars)
const T_INFO_ITEMS = 11; // title + sep + 7 rows + sep + about

/* ─────────────────────────────────────────────────────────────────
   FadeIn helper — appears after `delay` ms from mount
───────────────────────────────────────────────────────────────── */
function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  if (!mounted) return null;

  return (
    <span
      className={`fade-in-row ${className || ""}`}
      style={{ display: "block" }}
    >
      {children}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Ubuntu ASCII art
───────────────────────────────────────────────────────────────── */
const UBUNTU_ASCII = `                                                
                  +==========+                  
             +====================+             
          ============================          
        +=====================--=======+        
       =====================-.   .=======       
     ==============--::..::=-.   .-========     
    +===========--=.       .--:.:==========+    
    ==========-. .-=..:--:.......-==========    
   ==========:.  .:==========:.  .:==========   
  ==========:   .==============.   :==========  
  ======-:-=:  .================.   ==========  
  ====-.   .=: :================-:::-=========  
  ====-.   .=: :================-:::-=========  
  ======-:-=:. .================.   -=========  
  ==========:   .==============.   :==========  
   ==========:.  .:==========:.  .:==========   
    ==========-. .-=..:--:.......-==========    
    ============--=.       .-=::-===========    
     ==============-::....:=-.   .=========     
       =====================-.   .=======       
        +=====================--=======+        
          +==========================+          
             ======================             
                  ============                  
                                                `;

/* ─────────────────────────────────────────────────────────────────
   Info rows definition — order matches real neofetch output
───────────────────────────────────────────────────────────────── */
function buildInfoRows(langs: string) {
  return [
    /* 0 */ {
      type: "title" as const,
      content: (
        <p className="neofetch-title">
          <span className="terminal-key">jesusdavid</span>
          <span className="terminal-at">@</span>
          <span className="terminal-key">ubuntu</span>
        </p>
      ),
    },
    /* 1 */ { type: "sep" as const, content: null },
    /* 2 */ {
      type: "row" as const,
      content: (
        <>
          <span className="terminal-key">OS:</span>{" "}
          <span className="neofetch-value">Ubuntu 24.04 LTS Noble Numbat</span>
        </>
      ),
    },
    /* 3 */ {
      type: "row" as const,
      content: (
        <>
          <span className="terminal-key">Host:</span>{" "}
          <span className="neofetch-value">{profileData.name}</span>
        </>
      ),
    },
    /* 4 */ {
      type: "row" as const,
      content: (
        <>
          <span className="terminal-key">Role:</span>{" "}
          <span className="neofetch-value">{profileData.headline}</span>
        </>
      ),
    },
    /* 5 */ {
      type: "row" as const,
      content: (
        <>
          <span className="terminal-key">Location:</span>{" "}
          <span className="neofetch-value">{profileData.location}</span>
        </>
      ),
    },
    /* 6 */ {
      type: "row" as const,
      content: (
        <>
          <span className="terminal-key">Email:</span>{" "}
          <span className="neofetch-value">{profileData.email}</span>
        </>
      ),
    },
    /* 7 */ {
      type: "row" as const,
      content: (
        <>
          <span className="terminal-key">Experience:</span>{" "}
          <span className="neofetch-value">+8 años</span>
        </>
      ),
    },
    /* 8 */ {
      type: "row" as const,
      content: (
        <>
          <span className="terminal-key">Languages:</span>{" "}
          <span className="neofetch-value">{langs}</span>
        </>
      ),
    },
    /* 9  */ { type: "sep" as const, content: null },
    /* 10 */ {
      type: "about" as const,
      content: (
        <span
          dangerouslySetInnerHTML={{
            __html: profileData.about.replace(/\n/g, "<br />"),
          }}
        />
      ),
    },
  ] as const;
}

/* ─────────────────────────────────────────────────────────────────
   Main component
   Animation phases (controlled by a single phase state):
     0 → idle (before mount)
     1 → neofetch command is typing
     2 → output: logo + info rows animating
     3 → cat links.txt command is typing
     4 → link pills + cursor visible
───────────────────────────────────────────────────────────────── */
export function AboutSection() {
  const [phase, setPhase] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [animConfig, setAnimConfig] = useState({
    msPerChar: 65,
    infoStep: 550,
  });

  /** Anchor element at the bottom of the terminal — used for auto-scroll on mobile */
  const bottomRef = useRef<HTMLDivElement>(null);

  const langs = profileData.languages
    .map((l) => `${l.language} (${l.proficiency})`)
    .join(", ");

  const infoRows = buildInfoRows(langs);

  /* ── Animation phase sequencing ─────────────────────────────── */
  useEffect(() => {
    // Slower, more readable animation timings globally
    const msPerChar = 65;
    const infoStep = 550;

    setAnimConfig({ msPerChar, infoStep });

    const cmd1Done = NEOFETCH_CMD.length * msPerChar + 150;
    const infoDone = cmd1Done + T_INFO_ITEMS * infoStep + 800;
    const cmd2Done = infoDone + CAT_CMD.length * msPerChar + 150;
    const linksShow = cmd2Done + 80;

    setPhase(1);
    const t2 = setTimeout(() => setPhase(2), cmd1Done);
    const t3 = setTimeout(() => setPhase(3), infoDone);
    const t4 = setTimeout(() => setPhase(4), linksShow);
    return () => {
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  /* ── Auto-scroll to bottom on mobile during animation ── */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (!isMobile || !bottomRef.current) return;

    let interval: ReturnType<typeof setInterval>;

    // While animation is playing, continuously scroll down
    // so the viewport follows the typing/fade-in content.
    if (phase > 0 && phase < 4) {
      interval = setInterval(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
      }, 200);
    } else if (phase === 4) {
      // One final scroll when everything finishes
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
      }, 200);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [phase]);

  return (
    <div className="terminal-section about-terminal-section">
      {/* ── 1) Command: neofetch ──────────────────────────────── */}
      <div className="terminal-header">
        <span className="terminal-prompt">jesusdavid@ubuntu:~$</span>
        {phase >= 1 && (
          <TypingAnimation
            duration={animConfig.msPerChar}
            className="terminal-cmd"
          >
            {" neofetch"}
          </TypingAnimation>
        )}
      </div>

      {/* ── 2) Output: two-column neofetch layout ─────────────── */}
      {phase >= 2 && (
        <div className="terminal-output">
          <div className="neofetch-layout">
            {/* Left: ASCII art (appears instantly with the output) */}
            <pre className="terminal-ascii about-ascii-fade">
              {UBUNTU_ASCII}
            </pre>

            {/* Right: info rows fade in one by one */}
            <div className="neofetch-info">
              {infoRows.map((row, i) => {
                const delay = i * animConfig.infoStep;
                if (row.type === "sep") {
                  return (
                    <FadeIn
                      key={i}
                      delay={delay}
                      className="neofetch-separator"
                    >
                      ──────────────────────────
                    </FadeIn>
                  );
                }
                if (row.type === "about") {
                  return (
                    <FadeIn key={i} delay={delay} className="terminal-about">
                      {row.content}
                    </FadeIn>
                  );
                }
                return (
                  <FadeIn key={i} delay={delay}>
                    {row.content}
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── 3) Command: cat links.txt ─────────────────────────── */}
      {phase >= 3 && (
        <div className="terminal-header about-cmd-header">
          <span className="terminal-prompt">jesusdavid@ubuntu:~$</span>
          <TypingAnimation
            duration={animConfig.msPerChar}
            className="terminal-cmd"
          >
            {CAT_CMD}
          </TypingAnimation>
        </div>
      )}

      {/* ── 4) Link pills + blinking cursor ──────────────────── */}
      {phase >= 4 && (
        <>
          <div className="terminal-links">
            <a
              href={profileData.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={16} /> GitHub
            </a>
            <a
              href={profileData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={16} /> LinkedIn
            </a>
            <a href={`mailto:${profileData.email}`}>
              <Mail size={16} /> Email
            </a>
          </div>

          <div className="terminal-header about-cmd-header">
            <span className="terminal-prompt">jesusdavid@ubuntu:~$</span>
            <span className="terminal-cursor"> ▌</span>
          </div>
        </>
      )}

      {/* Scroll anchor — keeps bottom visible on mobile during animation */}
      <div ref={bottomRef} aria-hidden />
    </div>
  );
}
