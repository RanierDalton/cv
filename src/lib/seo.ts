import { profile } from "./portfolio-data";

export const SITE_URL = "https://ranier.is-a.dev/";
const OG_IMAGE = `${SITE_URL}og-image.png`;
const TITLE = "Ranier Dalton do Couto — Consultor técnico SAP · ABAP, BTP e IA agêntica";
const DESCRIPTION =
  "Consultor técnico SAP na Exed Consulting: sistemas, integrações e agentes de IA que resolvem processos reais. ABAP, RAP, CAP, SAP BTP, Integration Suite, SAP Joule e LangGraph. 6 certificações SAP e 3 OCI.";

/** Head compartilhado pelas rotas "/" e "/cv" (ambas apontam o canonical para a home). */
export function pageHead() {
  return {
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "Consultor SAP, SAP ABAP, ABAP Cloud, SAP RAP, SAP CAP, SAP BTP, SAP Integration Suite, SAP Fiori, SAP Joule, IA agêntica, Agentic AI, LangGraph, Ranier Dalton",
      },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: SITE_URL },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:locale:alternate", content: "en_US" },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Ranier Dalton do Couto — Consultor técnico SAP" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: profile.name,
          jobTitle: profile.title.pt,
          url: SITE_URL,
          image: OG_IMAGE,
          email: `mailto:${profile.contacts.email}`,
          worksFor: { "@type": "Organization", name: "Exed Consulting" },
          alumniOf: [
            { "@type": "CollegeOrUniversity", name: "São Paulo Tech School (SPTech)" },
            { "@type": "HighSchool", name: "ETEC Prof. Basilides de Godoy" },
          ],
          address: {
            "@type": "PostalAddress",
            addressLocality: "São Paulo",
            addressCountry: "BR",
          },
          sameAs: [
            profile.contacts.linkedin,
            profile.contacts.githubAcademic,
            profile.contacts.githubPersonal,
          ],
          knowsAbout: [
            "SAP ABAP",
            "ABAP Cloud",
            "SAP RAP",
            "SAP CAP",
            "SAP BTP",
            "SAP Integration Suite",
            "SAP Fiori",
            "SAP Joule",
            "Agentic AI",
            "LangGraph",
            "Python",
          ],
        }),
      },
    ],
  };
}
