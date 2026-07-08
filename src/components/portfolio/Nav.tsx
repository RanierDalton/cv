import { Link } from "@tanstack/react-router";
import { useActiveSection } from "@/hooks/useActiveSection";
import { ThemeToggle } from "./ThemeToggle";

const nav = [
  { href: "#sobre", label: "Sobre" },
  { href: "#trajetoria", label: "Trajetória" },
  { href: "#projetos", label: "Projetos" },
  { href: "#certificacoes", label: "Certificações" },
  { href: "#contato", label: "Contato" },
];

export function Nav() {
  const active = useActiveSection(nav.map((n) => n.href.replace("#", "")));

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-surface/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          to="/"
          className="group font-display text-lg font-bold tracking-tight"
        >
          <span className="text-gradient transition-all duration-300 group-hover:[filter:brightness(1.15)]">
            RC
          </span>
          <span className="text-foreground">.dev</span>
        </Link>

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
                  {item.label}
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
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
