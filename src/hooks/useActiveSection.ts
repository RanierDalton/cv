import { useEffect, useState } from "react";

/** Seção visível no momento ("" quando ainda está no topo, antes da primeira). */
export function useActiveSection(sectionIds: string[], offset = 140) {
  const [active, setActive] = useState("");
  const key = sectionIds.join("|");

  useEffect(() => {
    const ids = key.split("|");
    const handleScroll = () => {
      const y = window.scrollY + offset;
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.offsetTop <= y) return setActive(ids[i]);
      }
      setActive("");
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [key, offset]);

  return active;
}
