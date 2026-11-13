import type { ElementType, ReactNode } from "react";
import { useReveal } from "@/hooks/use-reveal";

/** Marca o bloco com data-visible ao entrar na tela; filhos com .reveal-item aparecem em cascata (--i). */
export function Reveal({
  as: Tag = "div",
  className,
  children,
  id,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  id?: string;
}) {
  const { ref, isVisible } = useReveal<HTMLElement>();
  return (
    <Tag ref={ref} id={id} className={className} data-visible={isVisible ? "true" : "false"}>
      {children}
    </Tag>
  );
}

/** Estilo inline com o índice da cascata. */
export const stagger = (i: number) => ({ "--i": i }) as React.CSSProperties;
