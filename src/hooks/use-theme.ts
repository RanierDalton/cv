import { useEffect, useState } from "react";

export type Theme = "dark" | "light";

const META_COLOR: Record<Theme, string> = { light: "#f5f2ec", dark: "#0b0d0c" };

// Primeira visita sempre no tema claro (sóbrio para recrutadores); a escolha persiste.
function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  try {
    return window.localStorage.getItem("theme") === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(theme);
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", META_COLOR[theme]);
  try {
    window.localStorage.setItem("theme", theme);
  } catch {
    /* modo privado: segue sem persistir */
  }
}

type VTDocument = Document & { startViewTransition?: (cb: () => void) => unknown };

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(getInitialTheme());
    setMounted(true);
    // Mantém o ícone em sincronia se outro controle trocar o tema.
    const obs = new MutationObserver(() =>
      setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light"),
    );
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  /** Alterna o tema; com evento de clique, revela o novo tema num círculo saindo do botão. */
  const toggle = (event?: { clientX: number; clientY: number }) => {
    const next: Theme = document.documentElement.classList.contains("dark") ? "light" : "dark";
    const doc = document as VTDocument;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (
      !doc.startViewTransition ||
      reduce ||
      !event ||
      (event.clientX === 0 && event.clientY === 0)
    ) {
      applyTheme(next);
      return;
    }
    const { clientX: x, clientY: y } = event;
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const style = document.documentElement.style;
    style.setProperty("--vt-x", `${x}px`);
    style.setProperty("--vt-y", `${y}px`);
    style.setProperty("--vt-r", `${r}px`);
    doc.startViewTransition(() => applyTheme(next));
  };

  return { theme, toggle, mounted };
}
