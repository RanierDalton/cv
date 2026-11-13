import { useTranslation } from "react-i18next";
import type { L } from "./portfolio-data";

export type Lang = "pt" | "en";

/** Idioma ativo e um resolvedor para textos bilíngues ({ pt, en }). */
export function useL() {
  const { i18n } = useTranslation();
  const lang: Lang = i18n.language?.startsWith("en") ? "en" : "pt";
  const tr = (v: L) => v[lang] || v.pt;
  return { lang, tr };
}
