import { useTheme } from "@/hooks/use-theme";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, toggle, mounted } = useTheme();

  return (
    <button
      onClick={toggle}
      aria-label={theme === "dark" ? "Ativar modo claro" : "Ativar modo escuro"}
      className="glass relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border transition-all hover:border-indigo hover:shadow-glow"
    >
      {mounted && theme === "dark" ? (
        <Sun className="h-4 w-4 text-indigo-glow" />
      ) : (
        <Moon className="h-4 w-4 text-indigo" />
      )}
    </button>
  );
}
