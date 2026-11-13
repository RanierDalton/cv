import { useTheme } from "@/hooks/use-theme";
import { Moon, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";

export function ThemeToggle() {
  const { theme, toggle, mounted } = useTheme();
  const { t } = useTranslation();
  const dark = mounted && theme === "dark";

  return (
    <button
      type="button"
      onClick={(e) => toggle(e)}
      aria-label={dark ? t("nav.themeLight") : t("nav.themeDark")}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
