import { ArrowUpRight, Award } from "lucide-react";
import { useTranslation } from "react-i18next";
import { award, courses, credentials, languages, type Credential } from "@/lib/portfolio-data";
import { useL } from "@/lib/use-l";
import { Reveal, stagger } from "./Reveal";
import { SectionHeader } from "./Timeline";

import sapLogo from "@/assets/sap_logo.jpeg";
import oracleLogo from "@/assets/oracle_logo.jpeg";
import ibmLogo from "@/assets/ibm_logo.jpeg";
import efsetLogo from "@/assets/efset_logo.jpeg";

const LOGO: Record<Credential["issuer"], string> = {
  SAP: sapLogo,
  Oracle: oracleLogo,
  IBM: ibmLogo,
  "EF SET": efsetLogo,
};
const ISSUERS: Credential["issuer"][] = ["SAP", "Oracle", "IBM", "EF SET"];

function CredentialCard({ c, i }: { c: Credential; i: number }) {
  const { t } = useTranslation();
  const body = (
    <>
      <div className="flex items-start gap-3">
        <img
          src={LOGO[c.issuer]}
          alt={`Logo ${c.issuer}`}
          width={36}
          height={36}
          loading="lazy"
          className="h-9 w-9 shrink-0 rounded object-contain"
        />
        <h4 className="font-sans text-[15px] font-semibold leading-snug text-foreground">
          {c.name}
        </h4>
      </div>
      <p className="mt-3 font-mono text-[11px] text-faint">
        {t("credentials.issued")} {c.issued}
        {c.expires && ` · ${t("credentials.expires")} ${c.expires}`}
      </p>
      {c.link && (
        <span className="mt-3 inline-flex items-center gap-1 font-mono text-xs text-primary">
          {t("credentials.validate")}
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      )}
    </>
  );
  const cls =
    "reveal-item group flex h-full flex-col rounded-lg border border-border bg-card p-5 transition-[transform,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]";
  return c.link ? (
    <a
      href={c.link}
      target="_blank"
      rel="noopener noreferrer"
      className={`${cls} hover:-translate-y-0.5 hover:border-primary/60`}
      style={stagger(i)}
    >
      {body}
    </a>
  ) : (
    <div className={cls} style={stagger(i)}>
      {body}
    </div>
  );
}

export function Certifications() {
  const { t } = useTranslation();
  const { tr } = useL();

  return (
    <section id="credenciais" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <SectionHeader
        index="03"
        mark="crystal"
        title={t("credentials.title")}
        description={t("credentials.description")}
      />

      <div className="space-y-10 md:pl-32">
        <Reveal>
          <div className="reveal-item flex items-center gap-4 rounded-lg border border-primary/40 bg-primary/5 p-5">
            <Award className="h-8 w-8 shrink-0 text-primary" />
            <div>
              <p className="font-mono text-xs text-primary">
                {t("credentials.award")} · {award.date}
              </p>
              <p className="font-display text-2xl text-foreground">{tr(award.name)}</p>
              <p className="text-sm text-muted-foreground">{award.org}</p>
            </div>
          </div>
        </Reveal>

        {ISSUERS.map((issuer) => {
          const list = credentials.filter((c) => c.issuer === issuer);
          return (
            <Reveal key={issuer}>
              <h3 className="reveal-item mb-4 font-mono text-xs uppercase tracking-widest text-faint">
                {issuer} <span className="text-primary">· {list.length}</span>
              </h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((c, i) => (
                  <CredentialCard key={c.id} c={c} i={i + 1} />
                ))}
              </div>
            </Reveal>
          );
        })}

        <Reveal className="grid gap-8 sm:grid-cols-2">
          <div className="reveal-item">
            <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-faint">
              {t("credentials.courses")}
            </h3>
            <ul className="divide-y divide-border border-y border-border">
              {courses.map((c) => (
                <li key={c.name.en} className="flex items-baseline justify-between gap-4 py-3">
                  <span className="text-sm text-foreground">
                    {tr(c.name)} <span className="text-muted-foreground">· {c.org}</span>
                  </span>
                  <span className="shrink-0 font-mono text-[11px] text-faint">{c.date}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal-item" style={stagger(1)}>
            <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-faint">
              {t("credentials.languages")}
            </h3>
            <ul className="divide-y divide-border border-y border-border">
              {languages.map((l) => (
                <li key={l.name.en} className="flex items-baseline justify-between py-3">
                  <span className="text-sm text-foreground">{tr(l.name)}</span>
                  <span className="font-mono text-xs text-primary">{tr(l.level)}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
