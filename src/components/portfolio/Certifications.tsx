import { certifications } from "@/lib/portfolio-data";
import { ArrowUpRight, Calendar, Award } from "lucide-react";
import { SectionHeader } from "./Timeline";
import { useTranslation } from "react-i18next";

export function Certifications() {
  const { t } = useTranslation();

  return (
    <section id="certificacoes" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          kicker={t("sections.certifications-subtitle")}
          title={t("sections.certifications-title")}
          subtitle={t("sections.certifications-description")}
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
          {certifications.map((cert) => (
            <a
              key={cert.id}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-start gap-4 overflow-hidden rounded-xl border border-border bg-surface-elevated p-5 shadow-card transition-all hover:-translate-y-0.5 hover:border-indigo/60 hover:shadow-glow"
            >
              <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-xl overflow-hidden shadow-glow">
                <IssuerLogo issuer={cert.issuer} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-glow">
                    {cert.issuer}
                  </span>
                  <ArrowUpRight className="h-3 w-3 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <h3 className="mt-1 font-display text-sm font-bold leading-snug text-foreground">
                  {cert.name}
                </h3>
                <div className="mt-2 flex items-center gap-3 text-[11px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {cert.issued}
                  </span>
                  {cert.expires ? (
                    <span>· {t("sections.certifications-expires")} {cert.expires}</span>
                  ) : (
                    <span>· {t("sections.certifications-no-expiry")}</span>
                  )}
                </div>
                <div className="mt-3 flex flex-wrap gap-1">
                  {cert.skills.map((s) => (
                    <span
                      key={s}
                      className="tag-pill cursor-default rounded border border-border/60 bg-surface px-1.5 py-0.5 text-[10px] font-medium text-foreground/70 hover:-translate-y-0.5 hover:border-indigo/60 hover:text-indigo-glow"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function IssuerLogo({ issuer }: { issuer: string }) {
  const normalized = issuer.toUpperCase();

  const logoUrls: Record<string, string> = {
    SAP: "./sap_logo.jpeg",
    ORACLE: "./oracle_logo.jpeg",
    IBM: "./ibm_logo.jpeg",
    EF: "./efset_logo.jpeg",
  };

  const matchedKey = Object.keys(logoUrls).find((key) => normalized.includes(key));

  if (matchedKey) {
    return (
      <div className="w-full h-full bg-white flex items-center justify-center p-1">
        <img
          src={logoUrls[matchedKey]}
          alt={issuer}
          className="h-full w-full object-contain rounded-lg"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-950 to-slate-900 text-white">
      <Award className="h-6 w-6 text-indigo-glow" />
    </div>
  );
}
