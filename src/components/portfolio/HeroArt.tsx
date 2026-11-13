import { useEffect, useState } from "react";
import { AppCard, Crystal, Cube, Hex } from "./ink-shapes";
import { DotField } from "./DotField";

// Composição em coordenadas do viewBox 520×480. Objetos e fios ficam só nesta coluna (nada sobre o texto).
const OBJECTS = [
  { id: "cube", x: 150, y: 120, s: 2.4, delay: 0, el: Cube },
  { id: "hex", x: 400, y: 110, s: 1.9, delay: -2.2, el: Hex },
  { id: "card", x: 300, y: 330, s: 2.1, delay: -4.1, el: AppCard },
  { id: "crystal", x: 455, y: 340, s: 1.5, delay: -1.3, el: Crystal },
  { id: "cube2", x: 105, y: 360, s: 1.2, delay: -3.3, el: Cube },
];

const WIRES = [
  "M205 112 C 270 80, 320 85, 360 105",
  "M150 180 C 150 260, 200 320, 228 330",
  "M400 160 C 420 230, 440 280, 452 312",
  "M372 330 C 400 340, 420 340, 432 340",
];

export function HeroArt() {
  // Só monta em telas largas (>= 1024px): no celular não há arte nem canvas rodando.
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const on = () => setWide(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  if (!wide) return <div aria-hidden className="hidden lg:block lg:h-[480px]" />;

  return (
    <div aria-hidden className="hero-art relative hidden h-[480px] w-full lg:block">
      <DotField className="dot-mask absolute inset-0 h-full w-full" />
      <svg viewBox="0 0 520 480" className="absolute inset-0 h-full w-full overflow-visible">
        {WIRES.map((d) => (
          <path key={d} d={d} className="ink-wire" />
        ))}
        {OBJECTS.map(({ id, x, y, s, delay, el: El }) => (
          <g key={id} transform={`translate(${x} ${y})`}>
            <g className="ink-float" style={{ animationDelay: `${delay}s` }}>
              <El s={s} />
            </g>
          </g>
        ))}
      </svg>
    </div>
  );
}
