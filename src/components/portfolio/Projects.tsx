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

        {/* SAP Fiori Launchpad Group Tabs Bar */}
        <div className="mt-10 flex flex-wrap gap-2 border-b border-border/20 pb-4 font-mono text-xs">
          {categories.map((c) => {
            const active = filter === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setFilter(c.id)}
                className={`px-4 py-2 font-semibold transition-all rounded-lg border cursor-pointer ${
                  active
                    ? "bg-indigo/15 text-indigo-glow border-indigo/40 shadow-sm"
                    : "text-muted-foreground border-transparent hover:bg-white/5"
                }`}
              >
                {c.id === "Todos" ? t("sections.projects-all") : c.label}
              </button>
            );
          })}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-indigo/20 bg-surface-elevated/70 shadow-glow backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-indigo/50 hover:shadow-glow font-mono text-xs">
      
      {/* Terminal Window Header (Fiori Style) */}
      <div className="bg-surface-elevated/70 px-4 py-2 flex items-center justify-between border-b border-border/30 text-[10px]">
        <div className="flex gap-1">
          <div className="h-2 w-2 rounded-full bg-red-500/70"></div>
          <div className="h-2 w-2 rounded-full bg-yellow-500/70"></div>
          <div className="h-2 w-2 rounded-full bg-green-500/70"></div>
        </div>
        <div className="text-muted-foreground/60 font-semibold truncate max-w-[150px]">
          ~/projects/{project.id}
        </div>
        <div className="w-4"></div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between">
            <span className="rounded border border-indigo/20 bg-indigo/5 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-indigo-glow">
              {project.category}
            </span>
            <span className="text-[10px] text-muted-foreground/80">{project.period}</span>
          </div>

          <h3 className="mt-3 font-display text-base font-bold leading-snug text-foreground group-hover:text-indigo-glow transition-colors">
            {t(`projects.${project.id}.title`, { defaultValue: project.title })}
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-foreground/70">
            {t(`projects.${project.id}.description`)}
          </p>
        </div>

        {/* Target Objective */}
        <div className="flex items-start gap-2 rounded-lg border border-border/40 bg-surface/30 p-2.5">
          <Target className="mt-0.5 h-3.5 w-3.5 shrink-0 text-indigo-glow animate-pulse" />
          <p className="text-[11px] leading-relaxed text-foreground/80">
            {t(`projects.${project.id}.objectives`)}
          </p>
        </div>

        {/* Stacks */}
        <div className="flex flex-wrap gap-1">
          {project.stack.map((s) => (
            <span
              key={s}
              className="rounded border border-border/40 bg-surface-elevated px-2 py-0.5 text-[10px] text-foreground/80"
            >
              {s}
            </span>
          ))}
        </div>

        {/* Action Link & SAP Status bar */}
        <div className="border-t border-border/20 pt-3 flex items-center justify-between text-[10px] text-muted-foreground/80">
          <div>
            <span>T-Code: /n{project.id}</span>
          </div>
          {project.link ? (
            <div className="inline-flex items-center gap-0.5 text-indigo-glow font-bold">
              {t("sections.projects-repo")}
              <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          ) : (
            <div className="flex items-center gap-1 text-emerald-500 font-bold">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_#10b981]"></span>
              <span>BUILD: OK</span>
            </div>
          )}
        </div>
      </div>
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
