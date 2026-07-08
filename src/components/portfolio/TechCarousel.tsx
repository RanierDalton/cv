import sapLogo from "@/assets/sap_logo.jpeg";
import { useTranslation } from "react-i18next";

const techs = [
  { name: "SAP BTP", logo: sapLogo },
  { name: "SAP ABAP", logo: sapLogo },
  { name: "SAP CAP", logo: sapLogo },
  { name: "SAP RAP", logo: sapLogo },
  { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "FastAPI", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
  { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "Spring Boot", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
  { name: "AWS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
  { name: "Terraform", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg" },
  { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "C#", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
  { name: "Unity", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg" },
];

export function TechCarousel() {
  const { t } = useTranslation();

  // Triple the list to ensure there's always enough content to scroll infinitely on wide screens
  const marqueeItems = [...techs, ...techs, ...techs];

  return (
    <section className="relative w-full py-10 overflow-hidden bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-indigo-glow mb-8">
          {t("sections.tech-title")}
        </h2>
      </div>

      <div className="relative flex w-full items-center overflow-x-hidden border-y border-border/40 bg-surface/20 py-5 backdrop-blur-sm">
        {/* Shadow Overlays for fade edge effect */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />

        <div className="flex animate-marquee whitespace-nowrap gap-16 items-center shrink-0">
          {marqueeItems.map((t, idx) => (
            <div key={`${t.name}-${idx}`} className="flex items-center gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 border border-white/10 p-1.5 shadow-sm hover:border-indigo/50 hover:shadow-glow transition-all duration-300">
                <img 
                  src={t.logo} 
                  alt={t.name} 
                  className="h-full w-full object-contain"
                  loading="lazy" 
                />
              </div>
              <span className="font-display text-sm font-semibold tracking-wide text-foreground/80">
                {t.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
