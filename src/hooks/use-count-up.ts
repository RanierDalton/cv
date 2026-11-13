import { useEffect, useState } from "react";

/**
 * Conta de 0 até o número contido em `value` ("6×" → 0×…6×) quando `start` vira true.
 * Valores sem número (ex.: "C1") voltam inalterados. Respeita prefers-reduced-motion.
 */
export function useCountUp(value: string, start: boolean, duration = 900) {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : null;
  const suffix = match ? match[2] : "";
  const [n, setN] = useState<number | null>(null);

  useEffect(() => {
    if (!start || target === null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setN(target);
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);

  if (target === null || n === null) return value; // SSR e sem JS: valor final
  return `${n}${suffix}`;
}
