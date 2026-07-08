import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { Timeline } from "@/components/portfolio/Timeline";
import { Projects } from "@/components/portfolio/Projects";
import { Certifications } from "@/components/portfolio/Certifications";
import { Footer } from "@/components/portfolio/Footer";
import { profile } from "@/lib/portfolio-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ranier Dalton Couto — Consultor SAP BTP & IA · Portfólio" },
      {
        name: "description",
        content:
          "Portfólio de Ranier Dalton Couto — Consultor SAP BTP & IA na Exed Consulting. SAP ABAP, RAP, CAP, S/4HANA, Fiori, Agentic AI, Python e integrações corporativas.",
      },
      { name: "keywords", content: "SAP ABAP, SAP BTP, SAP CAP, SAP RAP, Fiori, S/4HANA, IA, Agentic AI, Ranier Dalton, Consultor SAP" },
      { property: "og:title", content: "Ranier Dalton Couto — Consultor SAP BTP & IA" },
      { property: "og:description", content: "Portfólio profissional: SAP, IA agêntica, integrações corporativas e engenharia de software." },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: profile.name,
          jobTitle: profile.role,
          email: `mailto:${profile.contacts.email}`,
          address: { "@type": "PostalAddress", addressLocality: "São Paulo", addressCountry: "BR" },
          sameAs: [
            profile.contacts.linkedin,
            profile.contacts.githubPersonal,
            profile.contacts.githubAcademic,
          ],
          knowsAbout: [
            "SAP ABAP",
            "SAP BTP",
            "SAP CAP",
            "SAP RAP",
            "SAP S/4HANA",
            "SAP Fiori",
            "Agentic AI",
            "Python",
            "Java",
          ],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <Timeline />
        <Projects />
        <Certifications />
      </main>
      <Footer />
    </div>
  );
}
