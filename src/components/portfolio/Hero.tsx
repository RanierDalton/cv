import { ArrowUpRight, Download, Github, Linkedin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { profile } from "@/lib/portfolio-data";
import { useL } from "@/lib/use-l";
import { useReveal } from "@/hooks/use-reveal";
import { useCountUp } from "@/hooks/use-count-up";
import { stagger } from "./Reveal";
import { HeroArt } from "./HeroArt";

const PROMPT = "ranier@s4h:~$ whoami";

function Stat({
  value,
  label,
  start,
  i,
}: {
  value: string;
  label: string;
  start: boolean;
  i: number;
}) {
  const shown = useCountUp(value, start);
  return (
    <div className="enter" style={stagger(i)}>
      <dt className="sr-only">{label}</dt>
      <dd
        className="font-display text-4xl leading-none tabular-nums text-foreground"
        aria-label={value}
      >
        {shown}
      </dd>
      <dd className="mt-2 font-mono text-xs text-faint">{label}</dd>
    </div>
  );
}

export function Hero() {
  const { t } = useTranslation();
  const { tr } = useL();

  const headline = tr(profile.headline);
  const accent = tr(profile.headlineAccent);
  const [before, after] = headline.split(accent);
  const cvFile = t("hero.cvFile");
  const stats = useReveal<HTMLDListElement>();

  return (
    <section
      id="top"
      className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center overflow-hidden px-4 pb-10 pt-24 sm:px-6"
    >
      <div className="hero-grain" aria-hidden />
      <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)]">
        <div className="relative z-10 min-w-0">
          <p className="enter font-mono text-[13px] text-faint" style={stagger(0)}>
            <span className="hidden text-primary dark:inline">
              <span
                className="typed"
                style={{ "--chars": PROMPT.length } as React.CSSProperties}
                aria-label={PROMPT}
              >
                {PROMPT}
              </span>
              &nbsp;&nbsp;
            </span>
            <span className="text-primary dark:hidden">—&nbsp;</span>
            {tr(profile.title)} · {tr(profile.location)}
          </p>

          <h1 className="mt-5 max-w-4xl text-[clamp(2.3rem,4.4vw,3.9rem)] leading-[1.04] text-foreground">
            <span className="enter block text-muted-foreground" style={stagger(1)}>
              {profile.shortName}.
            </span>
            <span className="enter block" style={stagger(2)}>
              {before}
              <em className="text-primary">{accent}</em>
              {after}
            </span>
          </h1>

          <p
            className="enter mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground"
            style={stagger(3)}
          >
            {tr(profile.bio)}
          </p>

          <dl
            ref={stats.ref}
            className="mt-9 grid max-w-3xl grid-cols-2 gap-y-5 border-t border-border pt-5 sm:grid-cols-4"
          >
            {profile.stats.map((s, i) => (
              <Stat
                key={s.value + s.label.en}
                value={s.value}
                label={tr(s.label)}
                start={stats.isVisible}
                i={4 + i}
              />
            ))}
          </dl>

          <div className="enter mt-8 flex flex-wrap items-center gap-3" style={stagger(8)}>
            <a
              href={`./${cvFile}`}
              download={cvFile}
              className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-ink-foreground transition-opacity hover:opacity-85"
            >
              <Download className="h-4 w-4" />
              {t("hero.downloadCv")}
            </a>
            <a
              href={`mailto:${profile.contacts.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-foreground/70 px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-foreground hover:text-background"
            >
              {t("hero.contact")}
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <span className="mx-1 hidden h-6 w-px bg-border sm:block" />
            <a
              href={profile.contacts.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href={profile.contacts.githubAcademic}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
        <HeroArt />
      </div>
    </section>
  );
}
