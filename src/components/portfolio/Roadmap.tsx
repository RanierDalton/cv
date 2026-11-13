import { useEffect, useRef, useState } from "react";
import { MARKS, type MarkKind } from "./ink-shapes";

type Point = { x: number; y: number; kind: MarkKind };

/** Distância, a partir da borda esquerda do índice, onde o fio corre (dentro da calha de 8rem). */
const LANE = 76;

/**
 * Fio tracejado que percorre a calha dos índices (≥ 768 px) ligando um marco por seção.
 * Os marcos vêm de elementos com data-road="<kind>" dentro de `containerId`.
 * O trecho percorrido se desenha com o scroll; o marco alcançado acende.
 */
export function Roadmap({ containerId }: { containerId: string }) {
  const [points, setPoints] = useState<Point[]>([]);
  const [height, setHeight] = useState(0);
  const drawRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const [reached, setReached] = useState(-1);

  // Mede posições dos marcos (relativas ao container).
  useEffect(() => {
    const container = document.getElementById(containerId);
    if (!container) return;
    const mq = window.matchMedia("(min-width: 768px)");

    const measure = () => {
      if (!mq.matches) return setPoints([]);
      const pts = [...container.querySelectorAll<HTMLElement>("[data-road]")].map((el) => {
        // offsetTop/Left ignoram transform (o reveal desloca 12px antes de aparecer).
        let x = 0;
        let y = 0;
        let node: HTMLElement | null = el;
        while (node && node !== container) {
          x += node.offsetLeft;
          y += node.offsetTop;
          node = node.offsetParent as HTMLElement | null;
        }
        return { x: x + LANE, y: y + el.offsetHeight / 2, kind: el.dataset.road as MarkKind };
      });
      setPoints(pts);
      setHeight(container.scrollHeight);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(container);
    mq.addEventListener("change", measure);
    window.addEventListener("load", measure);
    return () => {
      ro.disconnect();
      mq.removeEventListener("change", measure);
      window.removeEventListener("load", measure);
    };
  }, [containerId]);

  // Caminho: começa um pouco acima do primeiro marco e serpenteia levemente dentro da calha.
  const d = points.length
    ? points.reduce((acc, p, i) => {
        if (i === 0) return `M${p.x} ${p.y - 48} L${p.x} ${p.y}`;
        const a = points[i - 1];
        const wob = i % 2 ? 18 : -18;
        const dy = p.y - a.y;
        return `${acc} C ${a.x + wob} ${a.y + dy * 0.35}, ${p.x - wob} ${a.y + dy * 0.65}, ${p.x} ${p.y}`;
      }, "")
    : "";

  // Atualiza o desenho com o scroll.
  useEffect(() => {
    const path = drawRef.current;
    const container = document.getElementById(containerId);
    if (!path || !container || !d) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const L = path.getTotalLength();
    path.style.strokeDasharray = `${L}`;

    // Comprimento do caminho até cada marco (para saber quando acende).
    const marks = points.map((p) => {
      let lo = 0;
      let hi = L;
      for (let k = 0; k < 24; k++) {
        const mid = (lo + hi) / 2;
        if (path.getPointAtLength(mid).y < p.y) lo = mid;
        else hi = mid;
      }
      return hi;
    });

    let raf = 0;
    const update = () => {
      raf = 0;
      const top = container.getBoundingClientRect().top;
      const focusY = window.innerHeight * 0.6 - top; // linha de foco a 60% da tela
      let lo = 0;
      let hi = L;
      for (let k = 0; k < 22; k++) {
        const mid = (lo + hi) / 2;
        if (path.getPointAtLength(mid).y < focusY) lo = mid;
        else hi = mid;
      }
      const len = reduce ? L : lo;
      path.style.strokeDashoffset = `${L - len}`;
      const pt = path.getPointAtLength(len);
      dotRef.current?.setAttribute("cx", `${pt.x}`);
      dotRef.current?.setAttribute("cy", `${pt.y}`);
      let idx = -1;
      marks.forEach((m, i) => {
        if (len >= m - 2) idx = i;
      });
      setReached(reduce ? marks.length - 1 : idx);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [d, points, containerId]);

  if (!points.length) return null;

  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute left-0 top-0 z-0 hidden w-full overflow-visible md:block"
      style={{ height }}
    >
      <path d={d} className="road-base" />
      <path ref={drawRef} d={d} className="road-draw" />
      <circle ref={dotRef} r={4.5} fill="var(--primary)" />
      {points.map((p, i) => {
        const Shape = MARKS[p.kind];
        return (
          <g key={`${p.kind}-${i}`} transform={`translate(${p.x} ${p.y})`}>
            <g className="road-mark" data-on={i <= reached ? "true" : "false"}>
              <Shape s={0.85} />
            </g>
          </g>
        );
      })}
    </svg>
  );
}
