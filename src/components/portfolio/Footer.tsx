import { profile } from "@/lib/portfolio-data";
import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/60 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 sm:px-6 md:flex-row md:items-center">
        <div>
          <div className="font-display text-lg font-bold">
            <span className="text-gradient">Ranier</span>
            <span className="text-foreground"> Dalton Couto</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            © {new Date().getFullYear()} · Construído com foco em SAP, IA e engenharia de software.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={`mailto:${profile.contacts.email}`}
            aria-label="Email"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:border-indigo hover:text-indigo-glow"
          >
            <Mail className="h-4 w-4" />
          </a>
          <a
            href={profile.contacts.linkedin}
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:border-indigo hover:text-indigo-glow"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href={profile.contacts.githubPersonal}
            aria-label="GitHub Pessoal"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:border-indigo hover:text-indigo-glow"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href={profile.contacts.githubAcademic}
            aria-label="GitHub Acadêmico"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:border-indigo hover:text-indigo-glow"
          >
            <Github className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
