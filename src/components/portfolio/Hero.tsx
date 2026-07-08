import { profile } from "@/lib/portfolio-data";
import { Github, Linkedin, Mail, ArrowUpRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section id="sobre" className="relative overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32">
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
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-border glass px-4 py-1.5 text-xs font-medium text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-indigo-glow" />
          Disponível para novos projetos SAP & IA
        </div>

        <h1 className="mt-8 max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
          {profile.name.split(" ").slice(0, -1).join(" ")}{" "}
          <span className="text-gradient">{profile.name.split(" ").slice(-1)[0]}</span>
        </h1>

        <p className="mt-4 font-display text-lg font-medium text-indigo-glow sm:text-xl">
          {profile.role}
        </p>

        <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {profile.bio}
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

          <ContactPill href={profile.contacts.linkedin} icon={<Linkedin className="h-4 w-4" />}>
            LinkedIn
          </ContactPill>
          <ContactPill href={profile.contacts.githubPersonal} icon={<Github className="h-4 w-4" />}>
            GitHub · Pessoal
          </ContactPill>
          <ContactPill
            href={profile.contacts.githubAcademic}
            icon={<Github className="h-4 w-4" />}
          >
            GitHub · Acadêmico
          </ContactPill>
        </div>

        <div className="mt-14 flex flex-wrap gap-2">
          {profile.tagline.split(" · ").map((tag) => (
            <span
              key={tag}
              className="tag-pill rounded-full border border-border bg-surface/60 px-3 py-1 text-xs font-medium text-muted-foreground hover:-translate-y-0.5 hover:border-indigo/60 hover:text-indigo-glow"
            >
              {tag}
            </span>
          ))}
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
