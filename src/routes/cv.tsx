import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { Timeline } from "@/components/portfolio/Timeline";
import { Cases } from "@/components/portfolio/Cases";
import { Projects } from "@/components/portfolio/Projects";
import { Certifications } from "@/components/portfolio/Certifications";
import { About } from "@/components/portfolio/About";
import { Footer } from "@/components/portfolio/Footer";
import { BackToTop } from "@/components/portfolio/BackToTop";
import { Roadmap } from "@/components/portfolio/Roadmap";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/cv")({
  head: () => pageHead(),
  component: Index,
});

export function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main id="page" className="relative">
        <Roadmap containerId="page" />
        <Hero />
        <Timeline />
        <Cases />
        <Projects />
        <Certifications />
        <About />
        <Footer />
      </main>
      <BackToTop />
    </div>
  );
}
