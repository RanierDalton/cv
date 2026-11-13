import { ArrowUpRight, Download, Github, Linkedin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { profile } from "@/lib/portfolio-data";
import { useL } from "@/lib/use-l";

export function Hero() {
  const { t } = useTranslation();
  const { tr } = useL();

  const headline = tr(profile.headline);
  const accent = tr(profile.headlineAccent);
  const [before, after] = headline.split(accent);
  const cvFile = t("hero.cvFile");

  return (
    <section id="top" className="relative mx-auto max-w-6xl px-4 pb-20 pt-32 sm:px-6 sm:pt-40 lg:pb-28">
      <p className="font-mono text-[13px] text-faint">
        <span className="hidden text-primary dark:inline">ranier@s4h:~$ whoami&nbsp;&nbsp;</span>
        <span className="text-primary dark:hidden">—&nbsp;</span>
        {tr(profile.title)} · {tr(profile.location)}
      </p>

      <h1 className="mt-6 max-w-4xl text-[clamp(2.6rem,7vw,5.4rem)] leading-[1.02] text-foreground">
        <span className="block text-muted-foreground">{profile.shortName}.</span>
        {before}
        <em className="text-primary">{accent}</em>
        {after}
      </h1>

      <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground">{tr(profile.bio)}</p>

      <dl className="mt-12 grid max-w-3xl grid-cols-2 gap-y-6 border-t border-border pt-6 sm:grid-cols-4">
        {profile.stats.map((s) => (
          <div key={s.value + s.label.en}>
            <dt className="sr-only">{tr(s.label)}</dt>
            <dd className="font-display text-4xl leading-none text-foreground">{s.value}</dd>
            <dd className="mt-2 font-mono text-xs text-faint">{tr(s.label)}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-10 flex flex-wrap items-center gap-3">
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
    </section>
  );
}
