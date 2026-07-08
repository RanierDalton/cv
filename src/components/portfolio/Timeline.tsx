import { useState, useEffect } from "react";
import { experience, education, type TimelineItem } from "@/lib/portfolio-data";
import { Briefcase, GraduationCap, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";

type Track = "experience" | "education";

export function Timeline() {
  const { t } = useTranslation();

  return (
    <section id="trajetoria" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          kicker={t("sections.timeline-subtitle")}
          title={t("sections.timeline-title")}
          subtitle={t("sections.timeline-description")}
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-2 lg:gap-12">
          <TimelineTrack
            track="experience"
            label={t("sections.timeline-exp")}
            icon={<Briefcase className="h-4 w-4" />}
            items={experience}
          />
          <TimelineTrack
            track="education"
            label={t("sections.timeline-edu")}
            icon={<GraduationCap className="h-4 w-4" />}
            items={education}
          />
        </div>
      </div>
    </section>
  );
}

function TimelineTrack({
  track,
  label,
  icon,
  items,
}: {
  track: Track;
  label: string;
  icon: React.ReactNode;
  items: TimelineItem[];
}) {
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);
  const current = items[index];
  const canPrev = index > 0;
  const canNext = index < items.length - 1;

  useEffect(() => {
    const handleSearchTimeline = (e: Event) => {
      const targetId = (e as CustomEvent).detail;
      const foundIndex = items.findIndex((item) => item.id === targetId);
      if (foundIndex !== -1) {
        setIndex(foundIndex);
      }
    };
    window.addEventListener("search-timeline", handleSearchTimeline);
    return () => window.removeEventListener("search-timeline", handleSearchTimeline);
  }, [items]);

  return (
    <div className="relative">
      <div className="mb-6 flex items-center justify-between">
        <div className="inline-flex items-center gap-2 rounded-lg border border-indigo/20 bg-surface/60 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-glow font-mono">
          {icon}
          {label}
        </div>
        <div className="flex items-center gap-1 font-mono">
          <button
            onClick={() => canPrev && setIndex((i) => i - 1)}
            disabled={!canPrev}
            aria-label={`${label} anterior`}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface transition-colors hover:border-indigo hover:text-indigo-glow disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => canNext && setIndex((i) => i + 1)}
            disabled={!canNext}
            aria-label={`${label} próximo`}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface transition-colors hover:border-indigo hover:text-indigo-glow disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* vertical rail */}
      <div className="relative">
        <div className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-indigo/60 via-border to-transparent" />

        {/* dots */}
        <div className="mb-6 flex flex-col gap-3 font-mono">
          {items.map((item, i) => {
            const active = i === index;
            return (
              <button
                key={item.id}
                onClick={() => setIndex(i)}
                className="group relative flex items-start gap-4 text-left"
              >
                <span
                  className={`relative z-10 mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-lg border transition-all ${
                    active
                      ? "border-indigo bg-indigo shadow-glow"
                      : "border-border bg-surface group-hover:border-indigo/60"
                  }`}
                >
                  {active ? (
                    <span className="text-[10px] font-bold text-primary-foreground">&gt;</span>
                  ) : (
                    <span className="text-[10px] font-semibold text-muted-foreground/40">-</span>
                  )}
                </span>
                <span className="min-w-0 flex-1 pb-1">
                  <span
                    className={`block font-display text-sm font-semibold transition-colors ${
                      active ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                    }`}
                  >
                    {t(`${track}.${item.id}.title`)}
                  </span>
                  <span className="block text-[11px] text-muted-foreground/80">
                    {t(`${track}.${item.id}.period`, { defaultValue: item.period })}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Console-style Card */}
        <article
          key={current.id}
          className="rounded-2xl border border-indigo/20 bg-surface-elevated/70 shadow-glow backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-500 flex flex-col overflow-hidden font-mono"
        >
          {/* Terminal Window Header */}
          <div className="bg-surface-elevated px-4 py-2 flex items-center justify-between border-b border-border/30 text-xs">
            <div className="flex gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-red-500/70"></div>
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/70"></div>
              <div className="h-2.5 w-2.5 rounded-full bg-green-500/70"></div>
            </div>
            <div className="text-muted-foreground/60 font-semibold truncate max-w-[200px] sm:max-w-xs">
              ~/trajetoria/{track}/{current.id}
            </div>
            <div className="w-8"></div>
          </div>

          <div className="p-6 sm:p-7 space-y-4">
            <div className="text-indigo-glow font-bold text-xs sm:text-sm">
              ranier@s4h:~$ <span className="text-foreground">cat details.txt</span>
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400">
                {t(`${track}.${current.id}.period`, { defaultValue: current.period })}
              </div>
              <h3 className="mt-1 font-display text-lg font-bold text-foreground sm:text-xl">
                {t(`${track}.${current.id}.title`)}
              </h3>
              <p className="text-xs font-medium text-muted-foreground/80">
                {t(`${track}.${current.id}.org`, { defaultValue: current.org })}
                {current.location && (
                  <span className="ml-2 inline-flex items-center gap-1 text-[11px]">
                    <MapPin className="h-3 w-3" />
                    {t(`${track}.${current.id}.location`, { defaultValue: current.location })}
                  </span>
                )}
              </p>
            </div>

            <p className="text-xs sm:text-sm leading-relaxed text-foreground/80">
              {t(`${track}.${current.id}.description`)}
            </p>

            <div className="flex flex-wrap gap-1.5 pt-2">
              {current.skills.map((s) => (
                <span
                  key={s}
                  className="rounded border border-indigo/20 bg-indigo/5 px-2.5 py-0.5 text-xs font-semibold text-indigo-glow hover:bg-indigo/10 transition-colors"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

export function SectionHeader({
  kicker,
  title,
  subtitle,
}: {
  kicker: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="font-mono">
      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-glow">
        # {kicker}
      </div>
      <h2 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
        $: {title}
      </h2>
      {subtitle && (
        <p className="mt-4 max-w-2xl text-xs sm:text-sm text-muted-foreground/80 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
