import React, { useState, useEffect } from "react";
import { profile } from "@/lib/portfolio-data";
import { Github, Linkedin, Mail, ArrowUpRight, Sparkles, FileDown, Terminal, Music, Settings } from "lucide-react";
import { useTranslation } from "react-i18next";
import sapLogo from "@/assets/sap_logo.jpeg";
import oracleLogo from "@/assets/oracle_logo.jpeg";

const createImgLogo = (src: string, alt: string, extraClass = "") => (
  <img src={src} alt={alt} className={`h-full w-full object-contain ${extraClass}`} loading="lazy" />
);

const createSvgLogo = (children: React.ReactNode) => (
  <div className="h-full w-full flex items-center justify-center">{children}</div>
);

type TechItem = {
  name: string;
  logo: React.ReactNode;
};

const row1: TechItem[] = [
  { name: "SAP BTP", logo: createImgLogo(sapLogo, "SAP BTP") },
  { name: "Python", logo: createImgLogo("https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", "Python") },
  { name: "Docker", logo: createImgLogo("https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", "Docker") },
  { name: "PostgreSQL", logo: createImgLogo("https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", "PostgreSQL") },
  { name: "TypeScript", logo: createImgLogo("https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", "TypeScript") },
  { name: "AWS", logo: createImgLogo("https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", "AWS", "dark:invert") },
  { name: "Django", logo: createImgLogo("https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg", "Django", "dark:invert") },
  { name: "Git", logo: createImgLogo("https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", "Git") },
  { name: "C++", logo: createImgLogo("https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", "C++") },
  {
    name: "Gemini",
    logo: createSvgLogo(
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full p-0.5">
        <path d="M12 2C12 7.5 7.5 12 2 12C7.5 12 12 16.5 12 22C12 16.5 16.5 12 22 12C16.5 12 12 7.5 12 2Z" fill="url(#gemini-grad-hero)"/>
        <defs>
          <linearGradient id="gemini-grad-hero" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
            <stop stopColor="#4e82f7"/>
            <stop offset="0.5" stopColor="#9a6af7"/>
            <stop offset="1" stopColor="#e362c3"/>
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  { name: "SAP CAP", logo: createImgLogo(sapLogo, "SAP CAP") },
  { name: "Express", logo: createImgLogo("https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", "Express", "dark:invert") },
  { name: "Redis", logo: createImgLogo("https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg", "Redis") },
  { name: "Linux", logo: createImgLogo("https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg", "Linux") },
];

const row2: TechItem[] = [
  { name: "SAP ABAP", logo: createImgLogo(sapLogo, "SAP ABAP") },
  { name: "React", logo: createImgLogo("https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", "React") },
  { name: "Azure", logo: createImgLogo("https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg", "Azure") },
  {
    name: "n8n",
    logo: createSvgLogo(
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full p-0.5">
        <circle cx="6" cy="12" r="3" fill="#f14a3b" />
        <circle cx="18" cy="6" r="3" fill="#f14a3b" />
        <circle cx="18" cy="18" r="3" fill="#f14a3b" />
        <path d="M9 12L15 7M9 12L15 17" stroke="#f14a3b" strokeWidth="2" />
      </svg>
    ),
  },
  { name: "JavaScript", logo: createImgLogo("https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", "JavaScript") },
  { name: "OCI", logo: createImgLogo(oracleLogo, "OCI") },
  { name: "SAP RAP", logo: createImgLogo(sapLogo, "SAP RAP") },
  { name: "Flask", logo: createImgLogo("https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg", "Flask", "dark:invert") },
  { name: "GitHub", logo: createImgLogo("https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", "GitHub", "dark:invert") },
  { name: "C", logo: createImgLogo("https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg", "C") },
  { name: "shell/bash", logo: createImgLogo("https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg", "shell/bash", "dark:invert") },
  { name: "SAP HANA", logo: createImgLogo(sapLogo, "SAP HANA") },
  { name: "Arduino", logo: createImgLogo("https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg", "Arduino") },
];

export function Hero() {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState<"about" | "music">("about");
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [nameText, setNameText] = useState("");

  const fullText = activeTab === "about" ? t("profile.bio") : t("terminal.music.desc");

  // Effect to simulate typing animation in Terminal
  useEffect(() => {
    setIsTyping(true);
    let index = 0;
    setTypedText("");

    const timer = setInterval(() => {
      index++;
      if (index <= fullText.length) {
        setTypedText(fullText.substring(0, index));
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, 15); // Natural typing speed (slower)

    return () => clearInterval(timer);
  }, [activeTab, fullText]);

  // Effect to simulate title typing loop ($: Ranier Dalton do Couto)
  useEffect(() => {
    let isMounted = true;
    const fullTitle = "$: Ranier Dalton do Couto";
    let index = 0;
    let isDeleting = false;

    const tick = () => {
      if (!isMounted) return;
      const current = fullTitle.substring(0, index);
      setNameText(current);

      if (!isDeleting && index === fullTitle.length) {
        setTimeout(() => {
          isDeleting = true;
          tick();
        }, 4000); // Hold name for 4s
        return;
      }

      if (isDeleting && index === 3) { // Back to "$: "
        isDeleting = false;
        setTimeout(() => {
          tick();
        }, 1500); // Pause 1.5s
        return;
      }

      index = isDeleting ? index - 1 : index + 1;
      setTimeout(tick, isDeleting ? 60 : 120); // Slower typing (120ms write, 60ms delete)
    };

    tick();
    return () => {
      isMounted = false;
    };
  }, []);

  const currentLangCode = i18n.language?.startsWith("en") ? "EN" : "PT-BR";

  const marquee1 = [...row1, ...row1, ...row1, ...row1];
  const marquee2 = [...row2, ...row2, ...row2, ...row2];

  return (
    <section id="sobre" className="relative overflow-hidden pt-28 pb-6 sm:pt-36 sm:pb-8">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-hero opacity-90" aria-hidden />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden
      />
      {/* Fade-out background transition to the next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background via-background/40 to-transparent z-10" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 z-20 flex flex-col gap-10">
        
        {/* Top: Personal Presentation Header */}
        <div className="flex flex-col items-start text-left max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-border glass px-4 py-1.5 text-xs font-semibold text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-indigo-glow" />
            {t("hero.status")}
          </div>

          {/* Loop-Typing Monospace Header */}
          <h1 className="mt-6 text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl min-h-[70px] font-mono text-indigo-glow">
            {nameText}
            <span className="inline-block h-6 sm:h-8 w-[2px] bg-gradient-primary ml-1.5 animate-cursor-blink" />
          </h1>

          <p className="mt-2 font-display text-base font-semibold text-foreground/80 sm:text-lg">
            {t("profile.role")}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${profile.contacts.email}`}
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5"
            >
              <Mail className="h-4 w-4" />
              {profile.contacts.email}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <a
              href="./cv.pdf"
              download="Ranier_Dalton_CV.pdf"
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated px-5 py-2.5 text-sm font-semibold text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo hover:text-indigo-glow hover:shadow-glow"
            >
              <FileDown className="h-4 w-4" />
              {t("hero.download-cv")}
            </a>

            <div className="flex flex-wrap gap-2 sm:ml-2">
              <ContactPill href={profile.contacts.linkedin} icon={<Linkedin className="h-4 w-4" />}>
                LinkedIn
              </ContactPill>
              <ContactPill href={profile.contacts.githubPersonal} icon={<Github className="h-4 w-4" />}>
                {t("hero.personal-github")}
              </ContactPill>
              <ContactPill
                href={profile.contacts.githubAcademic}
                icon={<Github className="h-4 w-4" />}
              >
                {t("hero.academic-github")}
              </ContactPill>
            </div>
          </div>
        </div>

        {/* Bottom: Monospace Interactive Terminal Simulator (Widescreen Full Width) */}
        <div className="w-full">
          <div className="w-full rounded-2xl border border-indigo/25 bg-surface/85 shadow-glow backdrop-blur-md overflow-hidden font-mono text-sm text-foreground/90 flex flex-col min-h-[360px]">
            
            {/* Terminal Window Header */}
            <div className="bg-surface-elevated/70 px-4 py-3 flex items-center justify-between border-b border-border/30">
              <div className="flex gap-2">
                <div className="h-3.5 w-3.5 rounded-full bg-red-500/80 border border-red-600/40"></div>
                <div className="h-3.5 w-3.5 rounded-full bg-yellow-500/80 border border-yellow-600/40"></div>
                <div className="h-3.5 w-3.5 rounded-full bg-green-500/80 border border-green-600/40"></div>
              </div>
              <div className="text-xs text-muted-foreground font-semibold tracking-wider">
                ranier@s4h:~
              </div>
              <div className="w-12"></div>
            </div>

            {/* Terminal Tab Bar */}
            <div className="flex bg-surface-elevated/40 border-b border-border/20">
              <button
                onClick={() => setActiveTab("about")}
                className={`flex-1 py-2.5 px-4 flex items-center justify-center gap-2 border-r border-border/20 text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === "about"
                    ? "bg-surface/90 text-indigo-glow border-b-2 border-indigo-glow"
                    : "text-muted-foreground hover:bg-white/5"
                }`}
              >
                <Terminal className="h-3.5 w-3.5" />
                {t("terminal.tabs.about")}
              </button>
              <button
                onClick={() => setActiveTab("music")}
                className={`flex-1 py-2.5 px-4 flex items-center justify-center gap-2 text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === "music"
                    ? "bg-surface/90 text-indigo-glow border-b-2 border-indigo-glow"
                    : "text-muted-foreground hover:bg-white/5"
                }`}
              >
                <Music className="h-3.5 w-3.5" />
                {t("terminal.tabs.music")}
              </button>
            </div>

            {/* Terminal Inner Console Area */}
            <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between leading-relaxed text-xs sm:text-sm">
              <div>
                {/* TAB 1: ABOUT / BIO */}
                {activeTab === "about" && (
                  <div className="space-y-3">
                    <div className="text-indigo-glow font-bold">
                      {t("terminal.about.executing")}
                    </div>
                    <p className="text-foreground/90 whitespace-pre-wrap leading-relaxed">
                      {typedText}
                      {isTyping && <span className="inline-block h-3.5 w-2 bg-indigo-glow ml-1 animate-cursor-blink">▋</span>}
                    </p>
                  </div>
                )}

                {/* TAB 2: MUSIC HOBBIES (hobby.mp3) */}
                {activeTab === "music" && (
                  <div className="space-y-3">
                    <div className="text-indigo-glow font-bold">
                      {t("terminal.music.executing")}
                    </div>
                    <div className="text-cyan-400 opacity-90">
                      {t("terminal.music.playing")}
                    </div>

                    {/* Interactive CSS Audio Visualizer */}
                    <div className="flex h-16 items-end justify-center gap-1.5 my-3 p-3 rounded-xl border border-white/5 bg-white/5 overflow-hidden">
                      {Array.from({ length: 36 }).map((_, i) => {
                        const delay = (i % 6) * 0.12 + (i % 3) * 0.08;
                        const height = [45, 80, 95, 60, 85, 100, 70, 50, 90, 75, 40, 55][i % 12];
                        return (
                          <div
                            key={i}
                            className="w-1.5 bg-gradient-to-t from-indigo-500 via-indigo-glow to-cyan-400 rounded-full animate-soundwave origin-bottom"
                            style={{
                              height: `${height}%`,
                              animationDelay: `${delay}s`,
                            }}
                            aria-hidden="true"
                          />
                        );
                      })}
                    </div>

                    <div className="border-t border-border/20 pt-2 text-xs space-y-2">
                      <p className="text-foreground/80 leading-relaxed italic">
                        "{typedText}"
                        {isTyping && <span className="inline-block h-3 w-1.5 bg-indigo-glow ml-0.5 animate-cursor-blink">▋</span>}
                      </p>
                      <div className="text-foreground/90 pt-1 text-[11px]">
                        <span className="text-indigo-glow font-semibold">🎛️ </span>
                        {t("terminal.music.focus")}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Simulated SAP GUI / Fiori Status Bar */}
              <div className="mt-6 pt-2 border-t border-border/25 flex items-center justify-between text-[10px] text-muted-foreground/80 bg-surface-elevated/20 -mx-5 -mb-5 px-5 py-2 sm:px-6 font-semibold">
                <div className="flex items-center gap-1.5">
                  <Settings className="h-3 w-3 text-indigo-glow animate-spin-slow" />
                  <span>System: S4H (Client 100)</span>
                </div>
                <div>
                  <span>Lang: {currentLangCode}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></span>
                  <span>ONLINE</span>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* Integrated Avenue Tech Carousel */}
      <div className="relative z-20 mt-16 pb-4">
        <h2 className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-indigo-glow mb-6 px-4 font-mono">
          {t("sections.tech-title")}
        </h2>

        {/* Row 1 (slides left) */}
        <div className="relative flex w-full items-center overflow-x-hidden border-t border-border/20 bg-surface/20 py-4 backdrop-blur-sm">
          {/* Larger Edge Fade Overlays */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-background to-transparent z-10" />

          {/* Block 1 */}
          <div className="flex animate-marquee-left whitespace-nowrap gap-16 items-center shrink-0 pr-16">
            {row1.map((t, idx) => (
              <div key={`${t.name}-1-${idx}`} className="flex items-center gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 border border-white/10 p-2 shadow-sm hover:border-indigo/50 hover:shadow-glow hover:scale-110 transition-all duration-300">
                  {t.logo}
                </div>
                <span className="font-display text-sm font-semibold tracking-wide text-foreground/80">
                  {t.name}
                </span>
              </div>
            ))}
          </div>

          {/* Block 2 (Clone for perfect seamless looping) */}
          <div className="flex animate-marquee-left whitespace-nowrap gap-16 items-center shrink-0 pr-16" aria-hidden="true">
            {row1.map((t, idx) => (
              <div key={`${t.name}-2-${idx}`} className="flex items-center gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 border border-white/10 p-2 shadow-sm hover:border-indigo/50 hover:shadow-glow hover:scale-110 transition-all duration-300">
                  {t.logo}
                </div>
                <span className="font-display text-sm font-semibold tracking-wide text-foreground/80">
                  {t.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 (slides right) */}
        <div className="relative flex w-full items-center overflow-x-hidden border-t border-b border-border/20 bg-surface/20 py-4 backdrop-blur-sm">
          {/* Larger Edge Fade Overlays */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-background to-transparent z-10" />

          {/* Block 1 */}
          <div className="flex animate-marquee-right whitespace-nowrap gap-16 items-center shrink-0 pr-16">
            {row2.map((t, idx) => (
              <div key={`${t.name}-1-${idx}`} className="flex items-center gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 border border-white/10 p-2 shadow-sm hover:border-indigo/50 hover:shadow-glow hover:scale-110 transition-all duration-300">
                  {t.logo}
                </div>
                <span className="font-display text-sm font-semibold tracking-wide text-foreground/80">
                  {t.name}
                </span>
              </div>
            ))}
          </div>

          {/* Block 2 (Clone for perfect seamless looping) */}
          <div className="flex animate-marquee-right whitespace-nowrap gap-16 items-center shrink-0 pr-16" aria-hidden="true">
            {row2.map((t, idx) => (
              <div key={`${t.name}-2-${idx}`} className="flex items-center gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 border border-white/10 p-2 shadow-sm hover:border-indigo/50 hover:shadow-glow hover:scale-110 transition-all duration-300">
                  {t.logo}
                </div>
                <span className="font-display text-sm font-semibold tracking-wide text-foreground/80">
                  {t.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactPill({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-2 rounded-full border border-border glass px-4 py-2.5 text-sm font-medium text-foreground transition-all hover:border-indigo hover:text-indigo-glow"
    >
      {icon}
      {children}
      <ArrowUpRight className="h-3.5 w-3.5 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );
}
