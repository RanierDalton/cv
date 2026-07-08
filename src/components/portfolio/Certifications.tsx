import { useState, useEffect } from "react";
import { certifications } from "@/lib/portfolio-data";
import { ArrowUpRight, Calendar, Award, X } from "lucide-react";
import { SectionHeader } from "./Timeline";
import { useTranslation } from "react-i18next";

import sapLogo from "@/assets/sap_logo.jpeg";
import oracleLogo from "@/assets/oracle_logo.jpeg";
import ibmLogo from "@/assets/ibm_logo.jpeg";
import efsetLogo from "@/assets/efset_logo.jpeg";

export function Certifications() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const handleSearchCerts = (e: Event) => {
      const query = (e as CustomEvent).detail;
      setSearchTerm(query || "");
    };
    window.addEventListener("search-certs", handleSearchCerts);
    return () => window.removeEventListener("search-certs", handleSearchCerts);
  }, []);

  const filtered = certifications.filter((cert) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      cert.name.toLowerCase().includes(term) ||
      cert.issuer.toLowerCase().includes(term) ||
      cert.skills.some((s) => s.toLowerCase().includes(term))
    );
  });

  return (
    <section id="certificacoes" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          kicker={t("sections.certifications-subtitle")}
          title={t("sections.certifications-title")}
          subtitle={t("sections.certifications-description")}
        />

        {/* Active Search Badge */}
        {searchTerm && (
          <div className="mt-6 flex justify-start font-mono text-xs">
            <div className="flex items-center gap-2 bg-indigo/10 border border-indigo/30 rounded-lg px-3 py-1.5 text-indigo-glow text-[11px] font-bold">
              <span>Busca ativa: "{searchTerm}"</span>
              <button
                onClick={() => setSearchTerm("")}
                className="hover:text-red-400 transition-colors cursor-pointer"
                title="Limpar busca"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          </div>
        )}

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
          {filtered.map((cert) => (
            <a
              key={cert.id}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-indigo/20 bg-surface-elevated/70 p-5 shadow-glow backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo/50 hover:shadow-glow font-mono text-xs"
            >
              <div className="flex items-start gap-4">
                <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-xl overflow-hidden shadow-sm bg-white/5 border border-white/10">
                  <IssuerLogo issuer={cert.issuer} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-glow">
                      {cert.issuer}
                    </span>
                    <ArrowUpRight className="h-3 w-3 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  <h3 className="mt-1 font-display text-sm font-bold leading-snug text-foreground group-hover:text-indigo-glow transition-colors">
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
                        className="rounded border border-border/40 bg-surface px-2 py-0.5 text-[10px] text-foreground/80"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* CLI Verification footer bar */}
              <div className="border-t border-border/20 pt-3 mt-4 flex items-center justify-between text-[10px] text-muted-foreground/80">
                <div className="truncate max-w-[190px] sm:max-w-xs">
                  <span>$ verify_badge --id {cert.id.substring(0, 12)}...</span>
                </div>
                <div className="flex items-center gap-1 text-emerald-500 font-bold">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_#10b981]"></span>
                  <span>VERIFIED ✔</span>
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
    SAP: sapLogo,
    ORACLE: oracleLogo,
    IBM: ibmLogo,
    EF: efsetLogo,
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
