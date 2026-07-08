import { certifications } from "@/lib/portfolio-data";
import { ArrowUpRight, Calendar } from "lucide-react";
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

  if (normalized.includes("SAP")) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-900 to-indigo-950 text-white">
        <svg viewBox="0 0 40 20" className="h-4 fill-current text-blue-300">
          <path d="M7 14.5c0 1.8 1.4 2.5 3 2.5 1.5 0 2.5-0.7 2.5-1.8 0-1.1-1-1.4-2.8-1.7-2.2-0.4-3.7-1-3.7-3 0-2 1.8-3 3.8-3 2 0 3.5 1 3.5 3h-2c0-1-0.7-1.5-1.5-1.5-1 0-1.8 0.4-1.8 1.3 0 0.9 0.7 1.1 2.3 1.4 2.2 0.4 4.2 0.8 4.2 3.3 0 2.5-1.8 3.5-4.5 3.5-2.7 0-4.5-1.2-4.5-3.5h2zm11.5-8.5h2.2l4.8 14h-2.4l-1-3h-4.4l-1 3h-2.2l4.8-14zm2.6 9l-1.5-4.8-1.5 4.8h3zm8.9-9h4.5c2.7 0 4 1.3 4 3.2v0.5c0 1.8-1.3 3.2-4 3.2h-2.3V20h-2.2V6zm4.5 5c1.4 0 1.8-0.5 1.8-1.5V9c0-1-0.4-1.5-1.8-1.5h-2.3V11h2.3z" />
        </svg>
      </div>
    );
  }

  if (normalized.includes("ORACLE")) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-red-950 to-orange-950 text-white">
        <svg viewBox="0 0 50 15" className="h-3.5 fill-current text-red-400">
          <path d="M7.5 15C3.36 15 0 11.64 0 7.5S3.36 0 7.5 0s7.5 3.36 7.5 7.5-3.36 15-7.5 15zm0-2.5c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm9.5-12.5h3v5.5c0 2 1.5 3.5 3.5 3.5s3.5-1.5 3.5-3.5V0h3v5.5c0 3.5-3 6.5-6.5 6.5s-6.5-3-6.5-6.5V0zm18.5 12h2.5c1.5 0 2.5-1 2.5-2.5V9c0-1.5-1-2.5-2.5-2.5h-2.5V12zm-3-12h5.5c3 0 5.5 2.5 5.5 5.5v0.5c0 3-2.5 5.5-5.5 5.5H35.5V0h-3zm18.5 12V0h3v12h-3z" />
        </svg>
      </div>
    );
  }

  if (normalized.includes("IBM")) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-blue-950 text-white">
        <div className="flex flex-col gap-0.5 items-center w-full px-2">
          {/* Custom geometric representation of IBM's famous stripes */}
          <div className="h-0.5 w-10 bg-blue-400" />
          <div className="h-0.5 w-10 bg-blue-400" />
          <div className="h-0.5 w-10 bg-blue-400" />
          <div className="h-0.5 w-10 bg-blue-400" />
          <span className="text-[10px] font-black tracking-widest text-blue-300">IBM</span>
        </div>
      </div>
    );
  }

  // Fallback for EF SET / Others
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-teal-900 to-cyan-950 text-white">
      <div className="flex flex-col items-center">
        <span className="text-sm font-black tracking-tight text-teal-300">EF</span>
        <span className="text-[8px] font-medium tracking-wider text-teal-400/80 -mt-1">SET</span>
      </div>
    </div>
  );
}
