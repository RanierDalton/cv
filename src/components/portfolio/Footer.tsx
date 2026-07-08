import { profile } from "@/lib/portfolio-data";
import { Github, Linkedin, Mail, Link2 } from "lucide-react";

export function Footer() {
  return (
    <footer id="contato" className="border-t border-border/60 bg-surface/30 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <div className="font-display text-2xl font-bold tracking-tight">
              <span className="text-gradient">Vamos</span>
              <span className="text-foreground"> conversar?</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground max-w-md">
              Sinta-se à vontade para entrar em contato para novas oportunidades, projetos ou apenas para trocar ideias sobre desenvolvimento SAP, Cloud e Inteligência Artificial.
            </p>
            <p className="mt-8 text-xs text-muted-foreground/60">
              © {new Date().getFullYear()} · Ranier Dalton Couto. Construído com foco em inovação.
            </p>
          </div>

          <div className="flex flex-col items-start gap-4 md:items-end">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-glow">
              Contato & Redes
            </span>
            <div className="flex flex-wrap gap-3">
              <a
                href={`mailto:${profile.contacts.email}`}
                aria-label="Email"
                className="group relative inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface/50 text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:border-red-500/60 hover:text-red-400 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]"
              >
                <Mail className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
              </a>
              <a
                href={profile.contacts.linkedin}
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface/50 text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/60 hover:text-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]"
              >
                <Linkedin className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
              </a>
              <a
                href="https://linktr.ee/ranierdalton"
                aria-label="Linktree"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface/50 text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/60 hover:text-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
              >
                <Link2 className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
              </a>
              <a
                href={profile.contacts.githubPersonal}
                aria-label="GitHub Pessoal"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface/50 text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/60 hover:text-indigo-400 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]"
              >
                <Github className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
              </a>
              <a
                href={profile.contacts.githubAcademic}
                aria-label="GitHub Acadêmico"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface/50 text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/60 hover:text-indigo-400 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]"
              >
                <Github className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
