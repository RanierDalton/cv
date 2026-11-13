import type { ReactElement } from "react";

// Objetos em "traço de tinta" usados no hero e nos marcos do roadmap.
// Cada forma é um <g> centrado em (0,0); `s` escala. Cores vêm dos tokens do tema.

const INK = { stroke: "var(--ink-line)", strokeWidth: 2, strokeLinejoin: "round" as const };
const PAPER = { fill: "var(--ink-paper)" };
const SHADE = { fill: "var(--ink-shade)" };
const ACCENT = { fill: "var(--primary)" };

type P = { s?: number };

/** Cubo isométrico: sistemas / ERP. */
export function Cube({ s = 1 }: P) {
  return (
    <g transform={`scale(${s})`} {...INK}>
      <path {...PAPER} d="M0 -24 22 -12 0 0 -22 -12Z" />
      <path {...SHADE} d="M-22 -12v22L0 22V0Z" />
      <path {...ACCENT} d="M22 -12v22L0 22V0Z" />
    </g>
  );
}

/** Hexágono facetado: nó de integração. */
export function Hex({ s = 1 }: P) {
  return (
    <g transform={`scale(${s})`} {...INK}>
      <path {...PAPER} d="M0 -22 19 -11v22L0 22-19 11v-22Z" />
      <path {...ACCENT} d="M0 -22v22l19-11Z" />
      <path fill="none" d="M-19 -11 0 0v22" />
    </g>
  );
}

/** Card de app (Fiori / web). */
export function AppCard({ s = 1 }: P) {
  return (
    <g transform={`scale(${s})`} {...INK}>
      <rect {...PAPER} x="-34" y="-17" width="68" height="34" rx="7" />
      <circle {...ACCENT} cx="-18" cy="0" r="6" />
      <path fill="none" d="M-4 -5h28M-4 6h18" />
    </g>
  );
}

/** Cristal: IA. */
export function Crystal({ s = 1 }: P) {
  return (
    <g transform={`scale(${s})`} {...INK}>
      <path {...ACCENT} d="M0 -20 16 0 0 20 -16 0Z" />
      <path fill="none" d="M-16 0h32" strokeOpacity={0.5} />
    </g>
  );
}

/** Nó/pessoa: sobre. */
export function Node({ s = 1 }: P) {
  return (
    <g transform={`scale(${s})`} {...INK}>
      <circle {...PAPER} r="14" />
      <circle {...ACCENT} r="5" stroke="none" />
    </g>
  );
}

/** Seta: contato. */
export function Arrow({ s = 1 }: P) {
  return (
    <g transform={`scale(${s})`} {...INK}>
      <path {...ACCENT} d="M-15 -6h14v-9l16 15-16 15v-9h-14Z" />
    </g>
  );
}

export type MarkKind = "cube" | "card" | "crystal" | "node" | "arrow";

export const MARKS: Record<MarkKind, (p: P) => ReactElement> = {
  cube: Cube,
  card: AppCard,
  crystal: Crystal,
  node: Node,
  arrow: Arrow,
};
