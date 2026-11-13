import { Music } from "lucide-react";
import { useTranslation } from "react-i18next";
import { profile, stack } from "@/lib/portfolio-data";
import { useL } from "@/lib/use-l";
import { Reveal, stagger } from "./Reveal";
import { SectionHeader } from "./Timeline";

export function About() {
  const { t } = useTranslation();
  const { tr } = useL();

  return (
    <section id="sobre" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <SectionHeader index="04" title={t("about.title")} />

      <div className="space-y-10 md:pl-32">
        <Reveal className="max-w-3xl space-y-5">
          {profile.about.map((p, i) => (
            <p
              key={i}
              className="reveal-item text-lg leading-relaxed text-foreground/85 first:text-xl first:text-foreground"
              style={stagger(i)}
            >
              {tr(p)}
            </p>
          ))}
        </Reveal>

        <Reveal>
          <h3 className="reveal-item mb-4 font-mono text-xs uppercase tracking-widest text-faint">
            {t("about.stack")}
          </h3>
          <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {stack.map((s, i) => (
              <div
                key={s.area.en}
                className="reveal-item border-t border-border pt-3"
                style={stagger(i + 1)}
              >
                <dt className="font-sans text-sm font-semibold text-foreground">{tr(s.area)}</dt>
                <dd className="mt-2 flex flex-wrap gap-1.5">
                  {s.items.map((it) => (
                    <span
                      key={it}
                      className="rounded border border-border px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                    >
                      {it}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal>
          <div className="reveal-item flex max-w-xl gap-4 border-l-2 border-primary pl-5">
            <Music className="mt-1 h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="font-mono text-xs text-faint">{t("about.offline")}</p>
              <p className="mt-1 text-muted-foreground">{tr(profile.hobby)}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
