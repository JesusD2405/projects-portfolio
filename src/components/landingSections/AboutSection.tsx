"use client";
import { useState, useEffect, useRef } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import profileData from "@/helpers/profile-data";
import { TypingAnimation } from "@/components/core/terminal/animated-terminal";

/* ─────────────────────────────────────────────────────────────────
   Timing constants (ms)
───────────────────────────────────────────────────────────────── */
// chars × ms-per-char  +  buffer
const NEOFETCH_CMD = "jesusdavid@ubuntu:~$ neofetch"; // prompt + cmd → full length for timing
const CAT_CMD = " cat social-links.txt"; // only the animated part (14 chars)

const T_CMD1_DONE = NEOFETCH_CMD.length * 35 + 150; // ~1200ms
const T_INFO_STEP = 160; // delay between each info row
const T_INFO_ITEMS = 11; // title + sep + 7 rows + sep + about
const T_INFO_DONE = T_CMD1_DONE + T_INFO_ITEMS * T_INFO_STEP + 400; // last row + buffer
const T_CMD2_DONE = T_INFO_DONE + CAT_CMD.length * 35 + 150; // cat command done
const T_LINKS_SHOW = T_CMD2_DONE + 80;

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
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <span
      className={className}
      style={{
        display: "block",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.22s ease",
      }}
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
  /** Anchor element at the bottom of the terminal — used for auto-scroll on mobile */
  const bottomRef = useRef<HTMLDivElement>(null);

  const langs = profileData.languages
    .map((l) => `${l.language} (${l.proficiency})`)
    .join(", ");

  const infoRows = buildInfoRows(langs);

  /* ── Animation phase sequencing ─────────────────────────────── */
  useEffect(() => {
    setPhase(1);
    const t2 = setTimeout(() => setPhase(2), T_CMD1_DONE);
    const t3 = setTimeout(() => setPhase(3), T_INFO_DONE);
    const t4 = setTimeout(() => setPhase(4), T_LINKS_SHOW);
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
          <TypingAnimation duration={35} className="terminal-cmd">
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
                const delay = i * T_INFO_STEP;
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
          <TypingAnimation duration={35} className="terminal-cmd">
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
