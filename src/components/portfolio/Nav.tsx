import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useActiveSection } from "@/hooks/useActiveSection";
import { profile } from "@/lib/portfolio-data";
import { useL } from "@/lib/use-l";
import { ThemeToggle } from "./ThemeToggle";

const nav = [
  { id: "trajetoria", key: "nav.timeline" },
  { id: "cases", key: "nav.cases" },
  { id: "credenciais", key: "nav.credentials" },
  { id: "sobre", key: "nav.about" },
];

export function Nav() {
  const { t, i18n } = useTranslation();
  const { lang } = useL();
  const active = useActiveSection(nav.map((n) => n.id));
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const links = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [bar, setBar] = useState({ x: 0, w: 0 });

  // Indicador que desliza até o link da seção ativa.
  useLayoutEffect(() => {
    const measure = () => {
      const el = active ? links.current[active] : null;
      setBar(el ? { x: el.offsetLeft, w: el.offsetWidth } : { x: 0, w: 0 });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active, lang]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "en" ? "en" : "pt-BR";
  }, [lang]);

  const toggleLanguage = () => i18n.changeLanguage(lang === "pt" ? "en" : "pt");

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${
        scrolled || open
          ? "border-b border-border bg-background/90 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="font-display text-xl tracking-tight text-foreground">
          {profile.shortName}
          <span className="text-primary">.</span>
        </a>

        <nav aria-label="Principal" className="relative hidden items-center gap-7 md:flex">
          <span
            aria-hidden
            className="absolute -bottom-1.5 left-0 h-px bg-primary transition-[transform,width,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ transform: `translateX(${bar.x}px)`, width: bar.w, opacity: bar.w ? 1 : 0 }}
          />
          {nav.map((item) => (
            <a
              key={item.id}
              ref={(el) => {
                links.current[item.id] = el;
              }}
              href={`#${item.id}`}
              aria-current={active === item.id ? "true" : undefined}
              className={`font-mono text-[13px] transition-colors hover:text-foreground ${
                active === item.id ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {t(item.key)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleLanguage}
            aria-label={t("nav.switchLang")}
            className="inline-flex h-9 items-center rounded-full border border-border px-3 font-mono text-xs text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
          >
            {lang === "pt" ? "EN" : "PT"}
          </button>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={t("nav.menu")}
            aria-expanded={open}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div aria-hidden className="read-progress absolute inset-x-0 bottom-0 h-0.5 bg-primary" />

      {open && (
        <nav aria-label="Principal" className="border-t border-border px-4 pb-4 md:hidden">
          {nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setOpen(false)}
              className="block border-b border-border py-3 font-mono text-sm text-foreground last:border-0"
            >
              {t(item.key)}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
