import { useTranslation } from "react-i18next";
import { education, experience } from "@/lib/portfolio-data";
import { useL } from "@/lib/use-l";
import { Reveal, stagger } from "./Reveal";
import type { MarkKind } from "./ink-shapes";

export function SectionHeader({
  index,
  title,
  description,
  mark,
}: {
  index: string;
  title: string;
  description?: string;
  mark?: MarkKind;
}) {
  return (
    <Reveal className="mb-8 grid gap-3 border-t border-border pt-5 md:grid-cols-[8rem_1fr]">
      <span className="reveal-item font-mono text-[13px] text-primary" data-road={mark}>
        {index}
      </span>
      <div>
        <h2
          className="reveal-item text-3xl leading-tight text-foreground sm:text-4xl"
          style={stagger(1)}
        >
          {title}
        </h2>
        {description && (
          <p className="reveal-item mt-3 max-w-2xl text-muted-foreground" style={stagger(2)}>
            {description}
          </p>
        )}
      </div>
    </Reveal>
  );
}

export function Timeline() {
  const { t } = useTranslation();
  const { tr } = useL();

  return (
    <section id="trajetoria" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <SectionHeader
        index="01"
        mark="cube"
        title={t("timeline.title")}
        description={t("timeline.description")}
      />

      <div className="space-y-10 md:pl-32">
        {experience.map((exp) => (
          <Reveal key={exp.org} as="article" className="relative">
            <header className="reveal-item flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <h3 className="text-3xl text-foreground">{exp.org}</h3>
              <p className="font-mono text-xs text-faint">
                {tr(exp.period)} · {tr(exp.location)}
              </p>
            </header>

            <ol className="mt-6 space-y-8 border-l border-border pl-6">
              {exp.roles.map((role, i) => (
                <li key={role.title.en} className="reveal-item relative" style={stagger(i + 1)}>
                  <span
                    aria-hidden
                    className="absolute -left-[29px] top-2 h-2.5 w-2.5 rounded-full border-2 border-primary bg-background"
                  />
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6">
                    <h4 className="font-sans text-lg font-semibold text-foreground">
                      {tr(role.title)}
                    </h4>
                    <span className="font-mono text-xs text-primary">{tr(role.period)}</span>
                  </div>
                  <p className="mt-1 text-muted-foreground">{tr(role.summary)}</p>
                  <ul className="mt-3 space-y-2">
                    {role.bullets.map((b) => (
                      <li
                        key={b.en}
                        className="relative pl-5 text-[15px] leading-relaxed text-foreground/85"
                      >
                        <span
                          aria-hidden
                          className="absolute left-0 top-[0.7em] h-px w-2.5 bg-faint"
                        />
                        {tr(b)}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </Reveal>
        ))}

        <Reveal as="div">
          <p className="reveal-item font-mono text-[13px] uppercase tracking-widest text-faint">
            {t("timeline.education")}
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {education.map((e, i) => (
              <article
                key={e.org}
                className="reveal-item rounded-lg border border-border bg-card p-5"
                style={stagger(i + 1)}
              >
                <p className="font-mono text-xs text-primary">{tr(e.period)}</p>
                <p className="mt-2 font-sans text-base font-semibold text-foreground">
                  {tr(e.title)}
                </p>
                <p className="text-sm text-muted-foreground">{e.org}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {tr(e.description)}
                </p>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
