import { Link } from "@tanstack/react-router";
import { useActiveSection } from "@/hooks/useActiveSection";
import { ThemeToggle } from "./ThemeToggle";
import { useTranslation } from "react-i18next";

const nav = [
  { href: "#sobre", labelKey: "nav.about" },
  { href: "#trajetoria", labelKey: "nav.timeline" },
  { href: "#projetos", labelKey: "nav.projects" },
  { href: "#certificacoes", labelKey: "nav.certifications" },
];

export function Nav() {
  const { t, i18n } = useTranslation();
  const active = useActiveSection(nav.map((n) => n.href.replace("#", "")));

  const currentLang = i18n.language?.startsWith("en") ? "en" : "pt";

  const toggleLanguage = () => {
    const nextLang = currentLang === "pt" ? "en" : "pt";
    i18n.changeLanguage(nextLang);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-surface/85 backdrop-blur-xl transition-colors duration-200 shadow-sm dark:shadow-none">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          to="/"
          className="group font-display text-lg font-bold tracking-tight shrink-0"
        >
          <span className="text-gradient transition-all duration-300 group-hover:[filter:brightness(1.15)]">
            RC
          </span>
          <span className="text-foreground">.dev</span>
        </Link>

        {/* SAP GUI Command Field (T-Code Navigator & Search Center) */}
        <div className="hidden md:flex items-center gap-1.5 bg-surface-elevated/70 border border-indigo/30 hover:border-indigo/60 rounded-lg px-3 py-1.5 font-mono text-xs max-w-[260px] ml-4 shadow-[0_0_12px_rgba(99,102,241,0.05)] transition-all duration-200">
          <span className="text-indigo-glow font-bold">/n</span>
          <input
            type="text"
            placeholder="T-Code ou busca (ex: abap)"
            className="bg-transparent border-none outline-none text-foreground w-[150px] placeholder:text-muted-foreground"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const raw = e.currentTarget.value.trim().toLowerCase();
                const val = raw.startsWith("/n") ? raw.slice(2).trim() : raw;
                
                const sectionMap: Record<string, string> = {
                  sobre: "#sobre",
                  trajetoria: "#trajetoria",
                  projetos: "#projetos",
                  cert: "#certificacoes",
                  certificacoes: "#certificacoes",
                  contato: "#contato",
                };
                
                const target = sectionMap[val];
                if (target) {
                  window.location.hash = target;
                } else if (val) {
                  window.location.hash = "#projetos";
                  // Dispatch search event to filter projects
                  window.dispatchEvent(new CustomEvent("search-tcode", { detail: val }));
                }
                e.currentTarget.value = "";
              }
            }}
          />
        </div>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => {
            const isActive = active === item.href.replace("#", "");
            return (
              <a
                key={item.href}
                href={item.href}
                className="nav-link group relative px-3 py-2 text-sm font-medium"
              >
                <span
                  className={`transition-colors duration-200 ${
                    isActive ? "text-foreground" : "text-muted-foreground"
                  } group-hover:text-foreground`}
                >
                  {t(item.labelKey)}
                </span>
                <span
                  className={`absolute bottom-1 left-3 right-3 h-0.5 rounded-full bg-gradient-primary transition-all duration-300 ${
                    isActive ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
                  } group-hover:scale-x-100 group-hover:opacity-100`}
                />
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleLanguage}
            aria-label={currentLang === "pt" ? "Switch to English" : "Mudar para Português"}
            className="glass relative inline-flex h-10 px-3 items-center justify-center rounded-full border border-border text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-all hover:border-indigo hover:text-indigo-glow hover:shadow-glow cursor-pointer"
          >
            {currentLang === "pt" ? "EN" : "PT"}
          </button>
          
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
