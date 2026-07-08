import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { useActiveSection } from "@/hooks/useActiveSection";
import { ThemeToggle } from "./ThemeToggle";
import { useTranslation } from "react-i18next";
import { projects } from "@/lib/portfolio-data";

const nav = [
  { href: "#sobre", labelKey: "nav.about" },
  { href: "#trajetoria", labelKey: "nav.timeline" },
  { href: "#projetos", labelKey: "nav.projects" },
  { href: "#certificacoes", labelKey: "nav.certifications" },
];

type StatusMessage = {
  text: string;
  type: "S" | "E" | "W"; // Success, Error, Warning
} | null;

export function Nav() {
  const { t, i18n } = useTranslation();
  const active = useActiveSection(nav.map((n) => n.href.replace("#", "")));
  const [statusMsg, setStatusMsg] = useState<StatusMessage>(null);

  const currentLang = i18n.language?.startsWith("en") ? "en" : "pt";

  const toggleLanguage = () => {
    const nextLang = currentLang === "pt" ? "en" : "pt";
    i18n.changeLanguage(nextLang);
  };

  // Automatically clear status message after 4s
  useEffect(() => {
    if (statusMsg) {
      const timer = setTimeout(() => setStatusMsg(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [statusMsg]);

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
        <div className="hidden md:flex items-center gap-1.5 bg-surface-elevated/70 border border-indigo/40 hover:border-indigo/70 rounded-lg px-3 py-1.5 font-mono text-xs max-w-[340px] ml-4 shadow-[0_0_12px_rgba(99,102,241,0.08)] transition-all duration-200">
          <span className="text-indigo-glow font-bold">/n</span>
          <input
            type="text"
            placeholder={currentLang === "pt" ? "T-Code ou busca (ex: abap)" : "T-Code or search (ex: abap)"}
            className="bg-transparent border-none outline-none text-foreground w-[185px] placeholder:text-muted-foreground"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const raw = e.currentTarget.value.trim().toLowerCase();
                if (!raw) return;

                const val = raw.startsWith("/n") ? raw.slice(2).trim() : raw;
                
                // Multi-language T-Code mapping
                const sectionMap: Record<string, string> = {
                  // Portuguese T-Codes
                  sobre: "#sobre",
                  trajetoria: "#trajetoria",
                  projetos: "#projetos",
                  cert: "#certificacoes",
                  certificacoes: "#certificacoes",
                  contato: "#contato",
                  // English T-Codes
                  about: "#sobre",
                  timeline: "#trajetoria",
                  projects: "#projetos",
                  certs: "#certificacoes",
                  certifications: "#certificacoes",
                  contact: "#contato",
                };
                
                const target = sectionMap[val];
                if (target) {
                  window.location.hash = target;
                  setStatusMsg({
                    text: currentLang === "pt"
                      ? `S: Transação '/n${val}' executada com sucesso.`
                      : `S: Transaction '/n${val}' executed successfully.`,
                    type: "S",
                  });
                } else {
                  // Check projects for search matching
                  const matched = projects.filter((p) =>
                    p.title.toLowerCase().includes(val) ||
                    p.description.toLowerCase().includes(val) ||
                    p.stack.some((s) => s.toLowerCase().includes(val))
                  );

                  if (matched.length > 0) {
                    window.location.hash = "#projetos";
                    window.dispatchEvent(new CustomEvent("search-tcode", { detail: val }));
                    setStatusMsg({
                      text: currentLang === "pt"
                        ? `S: Busca bem-sucedida. Encontrado(s) ${matched.length} projeto(s).`
                        : `S: Search successful. Found ${matched.length} project(s).`,
                      type: "S",
                    });
                  } else {
                    setStatusMsg({
                      text: currentLang === "pt"
                        ? `E: Transação ou conteúdo '${val}' não encontrado.`
                        : `E: Transaction or content '${val}' not found.`,
                      type: "E",
                    });
                  }
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

      {/* Floating SAP GUI Style Status Bar */}
      {statusMsg && (
        <div 
          className="fixed bottom-4 left-4 z-50 rounded-lg border px-4 py-2.5 font-mono text-[11px] sm:text-xs flex items-center gap-2.5 shadow-lg bg-surface border-indigo/20 animate-in slide-in-from-bottom duration-300 select-none max-w-sm sm:max-w-md"
        >
          {statusMsg.type === "S" && (
            <>
              <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981] shrink-0" />
              <span className="text-emerald-500 font-bold">S:</span>
            </>
          )}
          {statusMsg.type === "E" && (
            <>
              <span className="h-2 w-2 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444] shrink-0" />
              <span className="text-red-500 font-bold">E:</span>
            </>
          )}
          {statusMsg.type === "W" && (
            <>
              <span className="h-2 w-2 rounded-full bg-amber-500 shadow-[0_0_8px_#f59e0b] shrink-0" />
              <span className="text-amber-500 font-bold">W:</span>
            </>
          )}
          <span className="text-foreground/90 font-semibold">{statusMsg.text.slice(3)}</span>
        </div>
      )}
    </header>
  );
}
