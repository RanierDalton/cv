import React from "react";
import { profile } from "@/lib/portfolio-data";
import { Github, Linkedin, Mail, ArrowUpRight, Sparkles, FileDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import sapLogo from "@/assets/sap_logo.jpeg";

const createImgLogo = (src: string, alt: string) => (
  <img src={src} alt={alt} className="h-full w-full object-contain" loading="lazy" />
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
  { name: "AWS", logo: createImgLogo("https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", "AWS") },
  { name: "Django", logo: createImgLogo("https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg", "Django") },
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
  { name: "Express", logo: createImgLogo("https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", "Express") },
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
  { name: "OCI", logo: createImgLogo("https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg", "OCI") },
  { name: "Flask", logo: createImgLogo("https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg", "Flask") },
  { name: "GitHub", logo: createImgLogo("https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", "GitHub") },
  { name: "C", logo: createImgLogo("https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg", "C") },
  {
    name: "Claude",
    logo: createSvgLogo(
      <svg viewBox="0 0 24 24" fill="currentColor" className="text-orange-500/90 h-full w-full p-0.5">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.8 14.5h-3.6l-.8 2.3H7.1l3.6-10.1h2.6l3.6 10.1h-2.3l-.8-2.3zm-1.8-5l-1.3 3.8h2.6L12 11.5z"/>
      </svg>
    ),
  },
  { name: "SAP RAP", logo: createImgLogo(sapLogo, "SAP RAP") },
  { name: "SAP HANA", logo: createImgLogo(sapLogo, "SAP HANA") },
  { name: "shell/bash", logo: createImgLogo("https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg", "shell/bash") },
  { name: "Arduino", logo: createImgLogo("https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg", "Arduino") },
];

export function Hero() {
  const { t } = useTranslation();

  // Duplicate items 4 times to ensure they scroll infinitely on any resolution without blanks
  const marquee1 = [...row1, ...row1, ...row1, ...row1];
  const marquee2 = [...row2, ...row2, ...row2, ...row2];

  return (
    <section id="sobre" className="relative overflow-hidden pt-32 pb-6 sm:pt-40 sm:pb-8">
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

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 z-20">
        <div className="inline-flex items-center gap-2 rounded-full border border-border glass px-4 py-1.5 text-xs font-semibold text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-indigo-glow" />
          {t("hero.status")}
        </div>

        <h1 className="mt-8 max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
          {profile.name.split(" ").slice(0, -1).join(" ")}{" "}
          <span className="text-gradient">{profile.name.split(" ").slice(-1)[0]}</span>
        </h1>

        <p className="mt-4 font-display text-lg font-medium text-indigo-glow sm:text-xl">
          {t("profile.role")}
        </p>

        <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {t("profile.bio")}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
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

      {/* Integrated Avenue Tech Carousel */}
      <div className="relative z-20 mt-16 pb-4">
        <h2 className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-indigo-glow mb-6 px-4">
          {t("sections.tech-title")}
        </h2>

        {/* Row 1 (slides left) */}
        <div className="relative flex w-full items-center overflow-x-hidden border-t border-border/20 bg-surface/20 py-4 backdrop-blur-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />

          <div className="flex animate-marquee-left whitespace-nowrap gap-16 items-center shrink-0">
            {marquee1.map((t, idx) => (
              <div key={`${t.name}-${idx}`} className="flex items-center gap-3.5">
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
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />

          <div className="flex animate-marquee-right whitespace-nowrap gap-16 items-center shrink-0">
            {marquee2.map((t, idx) => (
              <div key={`${t.name}-${idx}`} className="flex items-center gap-3.5">
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
