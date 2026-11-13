import { useTranslation } from "react-i18next";
import { cases } from "@/lib/portfolio-data";
import { useL } from "@/lib/use-l";
import { Reveal, stagger } from "./Reveal";
import { SectionHeader } from "./Timeline";

export function Cases() {
  const { t } = useTranslation();
  const { tr } = useL();

  return (
    <section id="cases" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <SectionHeader index="02" title={t("cases.title")} description={t("cases.description")} />

      <Reveal className="grid gap-4 md:pl-32 lg:grid-cols-2">
        {cases.map((c, i) => (
          <article
            key={c.id}
            className="reveal-item group flex flex-col rounded-lg border border-border bg-card p-6 transition-[transform,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-primary/60"
            style={stagger(i % 2)}
          >
            <p className="font-mono text-[11px] uppercase tracking-wider text-faint">
              {tr(c.segment)}
            </p>
            <h3 className="mt-3 text-2xl leading-snug text-foreground">{tr(c.title)}</h3>

            <dl className="mt-4 space-y-3 text-[15px] leading-relaxed">
              <div>
                <dt className="font-mono text-xs text-primary">{t("cases.problem")}</dt>
                <dd className="text-muted-foreground">{tr(c.problem)}</dd>
              </div>
              <div>
                <dt className="font-mono text-xs text-primary">{t("cases.did")}</dt>
                <dd className="text-foreground/85">{tr(c.did)}</dd>
              </div>
            </dl>

            <ul className="mt-auto flex flex-wrap gap-1.5 pt-5">
              {c.stack.map((s) => (
                <li
                  key={s}
                  className="rounded border border-border px-2 py-0.5 font-mono text-[11px] text-muted-foreground transition-colors group-hover:border-primary/40 group-hover:text-foreground"
                >
                  {s}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </Reveal>
    </section>
  );
}
