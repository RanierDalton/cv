import { useEffect, useRef } from "react";

/**
 * Campo de pontos (meio-tom) que ondula e acende em volta do cursor.
 * Cores lidas dos tokens (--foreground / --primary) e relidas ao trocar o tema.
 * Pausa fora da tela; com prefers-reduced-motion desenha um quadro estático.
 */
export function DotField({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    let t = 0;
    const mouse = { x: -1e4, y: -1e4 };
    let colors = { ink: "#171512", accent: "#0b5cad", dark: false };

    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      colors = {
        ink: cs.getPropertyValue("--foreground").trim() || "#171512",
        accent: cs.getPropertyValue("--primary").trim() || "#0b5cad",
        dark: document.documentElement.classList.contains("dark"),
      };
    };

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const gap = 13;
      for (let y = gap / 2; y < h; y += gap) {
        for (let x = gap / 2; x < w; x += gap) {
          const wave = Math.sin(x * 0.02 + t) * Math.cos(y * 0.024 - t * 0.8);
          const d = Math.hypot(x - mouse.x, y - mouse.y);
          const glow = Math.max(0, 1 - d / 120);
          const r = 0.6 + (wave + 1) * 0.45 + glow * 1.6;
          ctx.globalAlpha = glow > 0.04 ? 0.35 + glow * 0.6 : colors.dark ? 0.32 : 0.2;
          ctx.fillStyle = glow > 0.04 || colors.dark ? colors.accent : colors.ink;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = () => {
      t += 0.012;
      draw();
      if (visible) raf = requestAnimationFrame(loop);
    };

    readColors();
    resize();
    if (reduce) draw();
    else raf = requestAnimationFrame(loop);

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      if (reduce) draw();
    };
    const onLeave = () => {
      mouse.x = mouse.y = -1e4;
      if (reduce) draw();
    };
    const host = canvas.parentElement ?? canvas;
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);

    const ro = new ResizeObserver(() => {
      resize();
      draw();
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible && !reduce) raf = requestAnimationFrame(loop);
    });
    io.observe(canvas);

    const mo = new MutationObserver(() => {
      readColors();
      draw();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      cancelAnimationFrame(raf);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={className} />;
}
