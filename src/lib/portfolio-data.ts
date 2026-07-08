export const profile = {
  name: "Ranier Dalton Couto",
  role: "Consultor BTP & IA · SAP ABAP Developer",
  location: "São Paulo, Brasil",
  bio: "Atualmente trabalho como Trainee em desenvolvimento SAP ABAP e BTP na Exed Consulting, com foco em SAP Fiori, serviços OData e iniciativas de R&D em React, Node.js e inteligência artificial — incluindo Agentic AI. Sou estudante de Ciência da Computação e técnico em Programação de Jogos Digitais, com interesse em soluções que conectem tecnologia, negócio e inovação.",
  tagline: "SAP ABAP · SAP BTP · SAP RAP · SAP CAP · Agentic AI · Python · Java",
  contacts: {
    email: "ranierd.couto@gmail.com",
    linkedin: "https://www.linkedin.com/in/ranierdalton/",
    githubPersonal: "https://github.com/RanierDC",
    githubAcademic: "https://github.com/RanierDalton",
  },
};

export type TimelineItem = {
  id: string;
  title: string;
  org: string;
  period: string;
  location?: string;
  description: string;
  skills: string[];
};

export const experience: TimelineItem[] = [
  {
    id: "exed-consultant",
    title: "Consultor BTP & IA",
    org: "Exed Consulting",
    period: "Abr 2026 — Presente",
    location: "São Paulo · Híbrido",
    description:
      "Desenvolvimento de extensões e integrações para ambientes SAP S/4HANA (arquiteturas side-by-side e in-app extensions) utilizando SAP BTP. Execução de testes e integração do SAP LBN (Logistics Business Network) com sistemas de transportadoras. Forte atuação com os módulos logísticos e de vendas (SD, EWM e TM). Construção de aplicações e agentes de IA (LLMs) com Python, LangGraph e FastAPI. Engajamento direto com clientes usando metodologia SAP Activate.",
    skills: ["SAP BTP", "SAP S/4HANA", "SAP LBN", "LangGraph", "FastAPI", "SAP Activate", "Agentic AI"],
  },
  {
    id: "exed-abap",
    title: "Consultor ABAP & BTP",
    org: "Exed Consulting",
    period: "Ago 2025 — Mar 2026",
    location: "São Paulo · Híbrido",
    description:
      "Atendimento a demandas reais de clientes, desenvolvendo soluções sistêmicas customizadas com foco profundo nos módulos HCM e SD. Lógicas de negócio e modelagem de dados em ABAP e CDS Views. Implementações complexas com Enhancements, BADIs, BAPIs, Adobe Forms e BOPF. Interfaces em SAP Fiori (Freestyle e Fiori Elements) e serviços OData via SAP Gateway.",
    skills: ["ABAP", "CDS Views", "Fiori", "OData", "SAP Gateway", "BAdI", "Adobe Forms"],
  },
  {
    id: "freelance-rpa",
    title: "Desenvolvedor Freelancer · RPA",
    org: "Freelance",
    period: "Mar 2024 — Jun 2024",
    location: "São Paulo",
    description:
      "Desenvolvimento de automações robóticas (RPA) em Python voltadas para otimização de fluxos fiscais. Criação de scripts para lançamento automatizado de notas de serviço em portais municipais, reduzindo o esforço operacional em aproximadamente 89% e a taxa de falhas de digitação para 1%.",
    skills: ["Python", "RPA", "Automação Fiscal", "Selenium"],
  },
];

export const education: TimelineItem[] = [
  {
    id: "sptech",
    title: "Bacharelado em Ciência da Computação",
    org: "São Paulo Tech School — SPTech",
    period: "Jul 2024 — Jul 2028",
    description:
      "Formação em backend com Java e Spring Boot, arquitetura de microserviços, mensageria com RabbitMQ, pipelines de dados (OLTP, OLAP, Data Lake, DW), Cloud e DevOps com AWS e Terraform.",
    skills: ["Java", "Spring Boot", "RabbitMQ", "AWS", "Terraform", "Data Engineering"],
  },
  {
    id: "etec",
    title: "Técnico em Programação de Jogos Digitais",
    org: "ETEC Professor Basilides de Godoy",
    period: "Jan 2021 — Dez 2023",
    description:
      "Desenvolvimento de jogos com Unity e C#, programação orientada a objetos, MySQL, desenvolvimento mobile com Android Studio (Java) e design visual e sonoro para jogos.",
    skills: ["Unity", "C#", "Java", "Android", "MySQL", "Game Design"],
  },
];

export type Project = {
  id: string;
  title: string;
  description: string;
  objectives: string;
  stack: string[];
  period: string;
  link?: string;
  category: "SAP" | "IA" | "Backend" | "Games";
};

export const projects: Project[] = [
  {
    id: "infrawatch",
    title: "InfraWatch",
    description:
      "Solução acadêmica inovadora desenvolvida como projeto do 2º (segundo) semestre da faculdade para monitoramento inteligente de Render Farms, garantindo eficiência, previsibilidade e segurança no uso de infraestrutura de servidores de renderização.",
    objectives:
      "Oferecer visibilidade em tempo real do consumo de recursos dos servidores de renderização, antecipando gargalos e falhas.",
    stack: ["Python", "IoT", "Monitoramento", "Backend"],
    period: "Dez 2024 — Mai 2025",
    link: "https://github.com/InfraWatch-inc",
    category: "Backend",
  },
  {
    id: "solarway",
    title: "SolarWay",
    description:
      "Projeto de extensão acadêmico desenvolvido ao longo do 3º (terceiro) e 4º (quarto) semestres da faculdade, facilitando o acesso a projetos de instalação de placas solares e gerando impacto social positivo.",
    objectives:
      "Criar uma solução que contribua para a melhoria da qualidade de vida ao redor da SolarWay, empresa autônoma de energia solar.",
    stack: ["JavaScript", "Node.js", "React", "Extensão"],
    period: "Jul 2025 — Mai 2026",
    link: "https://github.com/Projeto-de-extensao-Grupo-06",
    category: "Backend",
  },
  {
    id: "cs2-stats-bot",
    title: "CS2 Stats Bot",
    description:
      "Bot de Discord em Python para rastrear e analisar estatísticas de jogadores e partidas de Counter-Strike, com persistência em MySQL e OCR assistido por IA.",
    objectives:
      "Automatizar a coleta de estatísticas de CS2 e fornecer análises rápidas para comunidades de jogadores no Discord.",
    stack: ["Python", "Discord API", "MySQL", "OCR", "IA"],
    period: "Férias 2025 — 2026",
    link: "https://github.com/RanierDalton/cs2-stats-bot",
    category: "IA",
  },
  {
    id: "monocromo",
    title: "Monocromo",
    description:
      "Jogo de ação e aventura ambientado em um mundo futurista distópico, desenvolvido como Trabalho de Conclusão de Curso do técnico em Programação de Jogos Digitais.",
    objectives:
      "Entregar uma experiência narrativa envolvente com quebra-cabeças, exploração e combate, consolidando os aprendizados do curso técnico.",
    stack: ["Unity", "C#", "Game Design", "TCC"],
    period: "2023",
    link: "https://github.com/RanierDC/Monocromo",
    category: "Games",
  },
  {
    id: "sap-lbn-integration",
    title: "Integração SAP LBN × Transportadoras",
    description:
      "Solução orientada a eventos para integração entre o SAP Logistics Business Network (LBN) e sistemas de transportadoras externas, conectando planos de integração através do SAP Integration Suite (CPI) e do SAP S/4HANA para unificar o rastreamento em tempo real.",
    objectives:
      "Reduzir latência de rastreio e eliminar reconciliação manual entre SAP e parceiros logísticos.",
    stack: ["SAP BTP", "CAP", "CPI", "S/4HANA", "OData", "Event-Driven", "SAP LBN"],
    period: "2026",
    category: "SAP",
  },
  {
    id: "nfe-rpa",
    title: "RPA · Notas Fiscais Eletrônicas",
    description:
      "Robô de emissão e conferência automática de NF-e integrando portal fiscal, ERP e repositório documental, reduzindo o esforço operacional em aproximadamente 89%.",
    objectives: "Reduzir taxa de erros de emissão para ~1% e liberar tempo do time fiscal.",
    stack: ["Python", "RPA", "NF-e", "Selenium"],
    period: "2024",
    category: "Backend",
  },
];

export type Certification = {
  id: string;
  name: string;
  issuer: string;
  issued: string;
  expires?: string;
  skills: string[];
  link: string;
};

export const certifications: Certification[] = [
  {
    id: "sap-solution-architect",
    name: "SAP Certified - Solution Architect - SAP BTP",
    issuer: "SAP",
    issued: "Mai 2026",
    expires: "Mai 2027",
    skills: ["Solution Architecture", "SAP BTP", "Cloud Architecture"],
    link: "https://www.credly.com/badges/ad3f0c26-2dde-4f0c-9060-24cb24da6bc3",
  },
  {
    id: "sap-activate-pm",
    name: "SAP Certified - Project Manager - SAP Activate",
    issuer: "SAP",
    issued: "Mai 2026",
    expires: "Mai 2027",
    skills: ["Project Management", "SAP Activate", "Agile Methodologies"],
    link: "https://www.credly.com/badges/791873c8-408a-4185-844f-ad25d4e8a1ae",
  },
  {
    id: "oracle-ai-foundations",
    name: "Oracle Cloud AI Foundations",
    issuer: "Oracle",
    issued: "Mai 2026",
    expires: "Mai 2028",
    skills: ["Inteligência Artificial", "Oracle Cloud", "OCI"],
    link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=9657B6991556DFA3C64AED0D28D48FC58A861F62D5A923A41BF017898FB53E02",
  },
  {
    id: "sap-cap",
    name: "SAP Certified — Backend Developer · SAP Cloud Application Programming Model",
    issuer: "SAP",
    issued: "Mai 2026",
    expires: "Mai 2027",
    skills: ["SAP CAP", "SAP BTP", "S/4HANA"],
    link: "https://www.credly.com/badges/59b04c03-9ab8-47ec-b981-1b7d7388ed36",
  },
  {
    id: "sap-build",
    name: "SAP Certified — SAP Build Developer",
    issuer: "SAP",
    issued: "Mai 2026",
    expires: "Mai 2027",
    skills: ["SAP Build", "SAP S/4HANA", "Low-Code"],
    link: "https://www.credly.com/badges/27ae4df1-f68c-4a96-88ab-e9e8914032ea",
  },
  {
    id: "sap-abap-cloud",
    name: "SAP Certified — Back-End Developer · ABAP Cloud",
    issuer: "SAP",
    issued: "Mai 2026",
    expires: "Mai 2027",
    skills: ["SAP ABAP", "ABAP Cloud", "S/4HANA"],
    link: "https://www.credly.com/badges/de6ae0fe-9100-47e5-8075-41f4ddbdb9b0",
  },
  {
    id: "oracle-cloud-foundations",
    name: "Oracle Cloud Foundations",
    issuer: "Oracle",
    issued: "Abr 2026",
    expires: "Abr 2028",
    skills: ["Cloud Computing", "Data Lakes", "OCI"],
    link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=8EC12614D76FD8A9E9CC5D4F61DC3ABDF13E5E31A0F0A52856293AAEB92E0350",
  },
  {
    id: "efset-c1",
    name: "EF SET English Certificate · C1 Advanced",
    issuer: "EF SET",
    issued: "Set 2025",
    skills: ["Inglês C1"],
    link: "https://cert.efset.org/pt/tFDDat",
  },
  {
    id: "ibm-ai-fundamentals",
    name: "Artificial Intelligence Fundamentals",
    issuer: "IBM",
    issued: "Mai 2026",
    skills: ["Artificial Intelligence", "Generative AI", "IBM Watson"],
    link: "https://www.credly.com/badges/91446c3b-1738-4837-8dcf-0487d2ea0889",
  },
];
