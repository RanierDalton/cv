import { useState } from "react";
import { experience, education, type TimelineItem } from "@/lib/portfolio-data";
import { Briefcase, GraduationCap, ChevronLeft, ChevronRight, MapPin } from "lucide-react";

type Track = "experience" | "education";

export function Timeline() {
  return (
    <section id="trajetoria" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          kicker="02 · Trajetória"
          title="Vida acadêmica e profissional"
          subtitle="Duas linhas do tempo em paralelo. Use as setas para navegar por cada momento."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-2 lg:gap-12">
          <TimelineTrack
            track="experience"
            label="Experiência"
            icon={<Briefcase className="h-4 w-4" />}
            items={experience}
          />
          <TimelineTrack
            track="education"
            label="Escolaridade"
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
  const [index, setIndex] = useState(0);
  const current = items[index];
  const canPrev = index > 0;
  const canNext = index < items.length - 1;

  return (
    <div className="relative">
      <div className="mb-6 flex items-center justify-between">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-glow">
          {icon}
          {label}
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => canPrev && setIndex((i) => i - 1)}
            disabled={!canPrev}
            aria-label={`${label} anterior`}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors hover:border-indigo hover:text-indigo-glow disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => canNext && setIndex((i) => i + 1)}
            disabled={!canNext}
            aria-label={`${label} próximo`}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors hover:border-indigo hover:text-indigo-glow disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* vertical rail */}
      <div className="relative">
        <div className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-indigo/60 via-border to-transparent" />

        {/* dots */}
        <div className="mb-6 flex flex-col gap-3">
          {items.map((item, i) => {
            const active = i === index;
            return (
              <button
                key={item.id}
                onClick={() => setIndex(i)}
                className="group relative flex items-start gap-4 text-left"
              >
                <span
                  className={`relative z-10 mt-1.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                    active
                      ? "border-indigo bg-indigo shadow-glow"
                      : "border-border bg-surface group-hover:border-indigo/60"
                  }`}
                >
                  {active && <span className="h-2 w-2 rounded-full bg-primary-foreground" />}
                </span>
                <span className="min-w-0 flex-1 pb-1">
                  <span
                    className={`block font-display text-sm font-semibold transition-colors ${
                      active ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                    }`}
                  >
                    {item.title}
                  </span>
                  <span className="block text-xs text-muted-foreground">{item.period}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* card */}
        <article
          key={current.id}
          className="rounded-2xl border border-border bg-surface-elevated p-6 shadow-card animate-in fade-in slide-in-from-bottom-2 duration-500 sm:p-7"
        >
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-indigo-glow">
            {current.period}
          </div>
          <h3 className="mt-2 font-display text-xl font-bold sm:text-2xl">{current.title}</h3>
          <p className="mt-1 text-sm font-medium text-muted-foreground">
            {current.org}
            {current.location && (
              <span className="ml-2 inline-flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {current.location}
              </span>
            )}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{current.description}</p>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {current.skills.map((s) => (
              <span
                key={s}
                className="tag-pill cursor-default rounded-md border border-border bg-surface px-2 py-0.5 text-xs font-medium text-foreground/80 hover:-translate-y-0.5 hover:border-indigo/60 hover:text-indigo-glow"
              >
                {s}
              </span>
            ))}
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
    <div>
      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-glow">
        {kicker}
      </div>
      <h2 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">{subtitle}</p>
      )}
    </div>
  );
}
