// Regras do conteúdo do site. Rodar: node --experimental-strip-types scripts/check-data.ts
import * as data from "../src/lib/portfolio-data.ts";

const errors: string[] = [];
const fail = (msg: string) => errors.push(msg);

// Todo objeto { pt, en } precisa ter os dois idiomas preenchidos.
function walk(value: unknown, path: string): void {
  if (Array.isArray(value)) return value.forEach((v, i) => walk(v, `${path}[${i}]`));
  if (value && typeof value === "object") {
    const o = value as Record<string, unknown>;
    if ("pt" in o || "en" in o) {
      if (typeof o.pt !== "string" || !o.pt.trim()) fail(`${path}.pt vazio`);
      if (typeof o.en !== "string" || !o.en.trim()) fail(`${path}.en vazio`);
      return;
    }
    for (const [k, v] of Object.entries(o)) walk(v, `${path}.${k}`);
  }
}
for (const [k, v] of Object.entries(data)) walk(v, k);

const { credentials, experience, cases, profile } = data;
const sap = credentials.filter((c) => c.issuer === "SAP");
if (sap.length !== 6) fail(`SAP = ${sap.length}, esperado 6`);
const oracle = credentials.filter((c) => c.issuer === "Oracle");
if (oracle.length !== 3) fail(`Oracle = ${oracle.length}, esperado 3`);
if (credentials.some((c) => /SAP BTP/.test(c.name) && /Solution Architect/.test(c.name)))
  fail("SAP BTP Solution Architect não deve aparecer");
if (credentials.some((c) => /Java Foundations/i.test(c.name))) fail("Oracle Java Foundations não deve aparecer");
if (experience[0]?.roles.length !== 2) fail("Exed precisa de 2 cargos");
if (cases.length !== 7) fail(`cases = ${cases.length}, esperado 7`);

const all = JSON.stringify(data);
if (all.includes("P&D")) fail("usar R&D, não P&D");
if (/Desenvolvedor|Developer/.test(profile.title.pt + profile.title.en)) fail("título não pode ser Desenvolvedor/Developer");
if (/Arquitet|Architect/.test(profile.title.pt + profile.title.en)) fail("título não pode ser Arquiteto");
if (/intermedi|B1/.test(JSON.stringify(data.languages))) fail("espanhol é básico");

if (errors.length) {
  console.error(errors.map((e) => "FAIL " + e).join("\n"));
  process.exit(1);
}
console.log("OK");
