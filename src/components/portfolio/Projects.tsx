import { ArrowUpRight, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { projects, type Project } from "@/lib/portfolio-data";
import { useL } from "@/lib/use-l";

const GROUPS: Project["group"][] = ["pessoal", "uni", "jogos"];

/** "Mais projetos": recolhido por padrão, abre com altura animada (grid-rows 0fr → 1fr). */
export function Projects() {
  const { t } = useTranslation();
  const { tr } = useL();

  return (
    <section aria-labelledby="mais-projetos" className="mx-auto max-w-6xl px-4 pb-2 sm:px-6">
      <details className="group/more rounded-lg border border-border bg-card md:ml-32">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 [&::-webkit-details-marker]:hidden">
          <span>
            <span id="mais-projetos" className="font-display text-2xl text-foreground">
              {t("cases.more")}
            </span>
            <span className="ml-3 font-mono text-xs text-faint">{t("cases.moreHint")}</span>
          </span>
          <Plus className="h-5 w-5 shrink-0 text-primary transition-transform duration-300 group-open/more:rotate-45" />
        </summary>

        <div className="space-y-8 border-t border-border p-5">
          {GROUPS.map((g) => (
            <div key={g}>
              <p className="font-mono text-xs uppercase tracking-widest text-faint">
                {t(`cases.groups.${g}`)}
              </p>
              <ul className="mt-3 divide-y divide-border">
                {projects
                  .filter((p) => p.group === g)
                  .map((p) => (
                    <li key={p.id}>
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/item grid gap-1 py-4 sm:grid-cols-[12rem_1fr_auto] sm:items-baseline sm:gap-6"
                      >
                        <span className="font-sans font-semibold text-foreground group-hover/item:text-primary">
                          {p.title}
                        </span>
                        <span className="text-sm leading-relaxed text-muted-foreground">
                          {tr(p.description)}
                          <span className="mt-1 block font-mono text-xs text-faint">
                            {tr(p.period)} · {p.stack.join(" · ")}
                          </span>
                        </span>
                        <span className="inline-flex items-center gap-1 font-mono text-xs text-faint group-hover/item:text-primary">
                          {t("cases.repo")}
                          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/item:-translate-y-0.5 group-hover/item:translate-x-0.5" />
                        </span>
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </details>
    </section>
  );
}
