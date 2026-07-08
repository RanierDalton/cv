import { useState } from "react";
import { projects, type Project } from "@/lib/portfolio-data";
import { ArrowUpRight, Target } from "lucide-react";
import { SectionHeader } from "./Timeline";
import { useTranslation } from "react-i18next";

const categories: Array<{ id: Project["category"] | "Todos"; label: string }> = [
  { id: "Todos", label: "Todos" },
  { id: "SAP", label: "SAP" },
  { id: "IA", label: "IA" },
  { id: "Backend", label: "Backend" },
  { id: "Games", label: "Games" },
];

export function Projects() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<Project["category"] | "Todos">("Todos");
  const filtered = filter === "Todos" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projetos" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          kicker={t("sections.projects-subtitle")}
          title={t("sections.projects-title")}
          subtitle={t("sections.projects-description")}
        />

        <div className="mt-10 flex flex-wrap gap-2">
          {categories.map((c) => {
            const active = filter === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setFilter(c.id)}
                className={`filter-pill rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${
                  active
                    ? "border-indigo bg-gradient-primary text-primary-foreground shadow-glow"
                    : "border-border text-muted-foreground hover:-translate-y-0.5 hover:border-indigo/60 hover:text-foreground"
                }`}
              >
                {c.id === "Todos" ? t("sections.projects-all") : c.label}
              </button>
            );
          })}
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const { t } = useTranslation();

  const content = (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface-elevated p-6 shadow-card transition-all hover:-translate-y-1 hover:border-indigo/60 hover:shadow-glow">
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-primary opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30"
        aria-hidden
      />
      <div className="flex items-center justify-between">
        <span className="rounded-md border border-border bg-surface px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-indigo-glow">
          {project.category}
        </span>
        <span className="text-xs text-muted-foreground">{project.period}</span>
      </div>

      <h3 className="mt-4 font-display text-lg font-bold leading-tight">
        {t(`projects.${project.id}.title`, { defaultValue: project.title })}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {t(`projects.${project.id}.description`)}
      </p>

      <div className="mt-4 flex items-start gap-2 rounded-lg border border-border/60 bg-surface/60 p-3">
        <Target className="mt-0.5 h-3.5 w-3.5 shrink-0 text-indigo-glow" />
        <p className="text-xs leading-relaxed text-foreground/80">
          {t(`projects.${project.id}.objectives`)}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.stack.map((s) => (
          <span
            key={s}
            className="tag-pill cursor-default rounded-md bg-accent/60 px-2 py-0.5 text-[11px] font-medium text-accent-foreground hover:-translate-y-0.5 hover:bg-indigo/20 hover:text-indigo-glow"
          >
            {s}
          </span>
        ))}
      </div>

      {project.link && (
        <div className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-indigo-glow">
          {t("sections.projects-repo")}
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      )}
    </article>
  );

  if (project.link) {
    return (
      <a href={project.link} target="_blank" rel="noopener noreferrer" className="block h-full">
        {content}
      </a>
    );
  }
  return content;
}
