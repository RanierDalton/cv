import { Link } from "@tanstack/react-router";
import { useActiveSection } from "@/hooks/useActiveSection";
import { ThemeToggle } from "./ThemeToggle";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const nav = [
  { href: "#sobre", labelKey: "nav.about" },
  { href: "#trajetoria", labelKey: "nav.timeline" },
  { href: "#projetos", labelKey: "nav.projects" },
  { href: "#certificacoes", labelKey: "nav.certifications" },
];

export function Nav() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const active = useActiveSection(nav.map((n) => n.href.replace("#", "")));

  const currentLang = i18n.language?.startsWith("en") ? "en" : "pt";

  const toggleLanguage = () => {
    const nextLang = currentLang === "pt" ? "en" : "pt";
    i18n.changeLanguage(nextLang);
  };

  return (
    <header 
      className="fixed inset-x-0 top-0 z-50 border-b border-border/40 backdrop-blur-xl transition-colors duration-200"
      style={{
        backgroundColor: isOpen 
          ? "var(--background)" 
          : "color-mix(in oklab, var(--surface) 85%, transparent)"
      }}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          to="/"
          onClick={() => setIsOpen(false)}
          className="group font-display text-lg font-bold tracking-tight shrink-0"
        >
          <span className="text-gradient transition-all duration-300 group-hover:[filter:brightness(1.15)]">
            RC
          </span>
          <span className="text-foreground">.dev</span>
        </Link>

        {/* SAP GUI Command Field (T-Code Navigator) */}
        <div className="hidden md:flex items-center gap-1.5 bg-surface-elevated/60 border border-border/40 rounded-lg px-2.5 py-1 font-mono text-xs max-w-[240px] ml-4 hover:border-indigo/50 transition-all duration-200">
          <span className="text-indigo-glow font-bold">/n</span>
          <input
            type="text"
            placeholder="T-Code (ex: projetos)"
            className="bg-transparent border-none outline-none text-foreground w-[125px] placeholder:text-muted-foreground"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const val = e.currentTarget.value.trim().toLowerCase();
                const sectionMap: Record<string, string> = {
                  sobre: "#sobre",
                  trajetoria: "#trajetoria",
                  projetos: "#projetos",
                  cert: "#certificacoes",
                  certificacoes: "#certificacoes",
                };
                const target = sectionMap[val] || sectionMap[val.replace("/n", "")];
                if (target) {
                  window.location.hash = target;
                  e.currentTarget.value = "";
                }
              }
            }}
          />
          <button 
            onClick={(e) => {
              const input = e.currentTarget.previousElementSibling as HTMLInputElement;
              const val = input.value.trim().toLowerCase();
              const sectionMap: Record<string, string> = {
                sobre: "#sobre",
                trajetoria: "#trajetoria",
                projetos: "#projetos",
                cert: "#certificacoes",
                certificacoes: "#certificacoes",
              };
              const target = sectionMap[val] || sectionMap[val.replace("/n", "")];
              if (target) {
                window.location.hash = target;
                input.value = "";
              }
            }}
            className="h-4 w-4 bg-emerald-500 rounded flex items-center justify-center text-[9px] text-white font-bold hover:bg-emerald-400 transition-colors cursor-pointer" 
            title="Execute T-Code"
          >
            ✓
          </button>
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
            className="glass relative inline-flex h-10 px-3 items-center justify-center rounded-full border border-border text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-all hover:border-indigo hover:text-indigo-glow hover:shadow-glow"
          >
            {currentLang === "pt" ? "EN" : "PT"}
          </button>
          
          <ThemeToggle />

          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            className="glass relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:border-indigo hover:text-foreground md:hidden"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-x-0 top-16 bottom-0 z-40 bg-background flex flex-col p-6 md:hidden animate-in slide-in-from-top duration-300 border-t border-border/40">
          <nav className="flex flex-col gap-4 mt-4">
            {nav.map((item) => {
              const isActive = active === item.href.replace("#", "");
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center py-3 text-lg font-semibold transition-all border-b border-border/20 ${
                    isActive ? "text-indigo-glow" : "text-muted-foreground"
                  }`}
                >
                  {t(item.labelKey)}
                </a>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
