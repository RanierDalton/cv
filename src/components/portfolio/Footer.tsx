import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import { profile } from "@/lib/portfolio-data";
import { Reveal, stagger } from "./Reveal";

export function Footer() {
  const { t } = useTranslation();
  const links = [
    { href: `mailto:${profile.contacts.email}`, label: profile.contacts.email, icon: Mail },
    { href: profile.contacts.linkedin, label: "LinkedIn", icon: Linkedin },
    { href: profile.contacts.githubAcademic, label: "GitHub · RanierDalton", icon: Github },
    { href: profile.contacts.githubPersonal, label: "GitHub · RanierDC", icon: Github },
  ];

  return (
    <footer id="contato" className="border-t border-border">
      <Reveal className="mx-auto grid max-w-6xl gap-3 px-4 py-14 sm:px-6 sm:py-16 md:grid-cols-[8rem_1fr]">
        <span className="reveal-item font-mono text-[13px] text-primary" data-road="arrow">
          →
        </span>
        <div>
          <h2 className="reveal-item text-[clamp(2.4rem,6vw,4.5rem)] leading-none text-foreground">
            {t("footer.title")}
          </h2>
          <p className="reveal-item mt-4 max-w-xl text-lg text-muted-foreground" style={stagger(1)}>
            {t("footer.description")}
          </p>
          <ul className="mt-10 grid gap-x-8 sm:grid-cols-2">
            {links.map(({ href, label, icon: Icon }, i) => (
              <li key={href} className="reveal-item" style={stagger(i + 2)}>
                <a
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between border-b border-border py-4 text-foreground transition-colors hover:text-primary"
                >
                  <span className="flex items-center gap-3">
                    <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                    {label}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-12 font-mono text-[11px] text-faint">
            © {new Date().getFullYear()} · {t("footer.rights")}
          </p>
        </div>
      </Reveal>
    </footer>
  );
}
