// Conteúdo do site. Fonte da verdade: curriculo-mestre.md (pasta curriculums, privada).
// Regra: nada aqui pode citar nome de cliente, produto interno ou fato que não esteja no mestre.

export type L = { pt: string; en: string };

const l = (pt: string, en: string): L => ({ pt, en });

export const profile = {
  name: "Ranier Dalton do Couto",
  shortName: "Ranier Dalton",
  title: l("Consultor técnico SAP", "SAP Technical Consultant"),
  location: l("São Paulo, Brasil", "São Paulo, Brazil"),
  headline: l(
    "Sistemas, integrações e agentes de IA que resolvem processos reais.",
    "Systems, integrations and AI agents that solve real business processes.",
  ),
  headlineAccent: l("agentes de IA", "AI agents"),
  bio: l(
    "Desenvolvo e integro sistemas de gestão (SAP), automações e agentes de IA para empresas de educação, química, combustíveis e aviação. Hoje na Exed Consulting, entre projetos de clientes e o time de R&D.",
    "I build and integrate business management systems (SAP), automation and AI agents for companies in education, chemicals, fuel distribution and aviation. Currently at Exed Consulting, across client projects and the R&D team.",
  ),
  about: [
    l(
      "Consultor técnico SAP na Exed Consulting, com projetos para 4 clientes de segmentos diferentes (educação, química, distribuição de combustíveis e aviação executiva) e para o time de R&D. Meu trabalho vai além de implementar especificações: entendo o processo de negócio, avalio a arquitetura da solução e contribuo para a definição da abordagem técnica que mantém o Clean Core.",
      "SAP Technical Consultant at Exed Consulting, working on projects for 4 clients across education, chemicals, fuel distribution and business aviation, as well as for the R&D team. My work goes beyond implementing specs: I understand the business process, assess the solution architecture and contribute to defining the technical approach that keeps the core clean.",
    ),
    l(
      "Atuo com ABAP clássico (Enhancements, BAdIs, ALV, Adobe Forms, BOPF) e ABAP Cloud (RAP, CDS, Fiori) em S/4HANA Private e Public Edition, nos módulos TM, SD, MM e EWM, e com extensões side-by-side no SAP BTP: SAP CAP, SAP Build Process Automation, SAP Integration Suite (CPI) e integrações com SAP LBN, SAP Ariba e sistemas externos.",
      "I work with classic ABAP (Enhancements, BAdIs, ALV, Adobe Forms, BOPF) and ABAP Cloud (RAP, CDS, Fiori) on S/4HANA Private and Public Edition, in the TM, SD, MM and EWM modules, and with side-by-side SAP BTP extensions: SAP CAP, SAP Build Process Automation, SAP Integration Suite (CPI), and integrations with SAP LBN, SAP Ariba and external systems.",
    ),
    l(
      "Em R&D, desenvolvo agentes de IA com SAP Joule Studio e SAP AI Core, e aplicações com LLMs em Python, FastAPI e LangGraph, integradas via MCP. Também ministro treinamentos de SAP ABAP na Exed Academy.",
      "In R&D, I build AI agents with SAP Joule Studio and SAP AI Core, and LLM applications with Python, FastAPI and LangGraph, integrated via MCP. I also teach SAP ABAP training at Exed Academy.",
    ),
  ],
  hobby: l(
    "Fora do código, produzo beats de trap, rap e música eletrônica no FL Studio. Minha parte favorita é a mixagem.",
    "Away from code, I produce trap, rap and electronic beats in FL Studio. Mixing is my favorite part.",
  ),
  stats: [
    { value: "6×", label: l("SAP Certified", "SAP Certified") },
    { value: "3×", label: l("OCI Certified", "OCI Certified") },
    { value: "4", label: l("clientes atendidos", "clients served") },
    { value: "C1", label: l("inglês", "English") },
  ],
  contacts: {
    email: "ranierd.couto@gmail.com",
    linkedin: "https://www.linkedin.com/in/ranierdalton/",
    githubPersonal: "https://github.com/RanierDC",
    githubAcademic: "https://github.com/RanierDalton",
  },
};

// ---------- Trajetória ----------

export type Role = { title: L; period: L; summary: L; bullets: L[] };
export type Experience = { org: string; period: L; location: L; roles: Role[] };

export const experience: Experience[] = [
  {
    org: "Exed Consulting",
    period: l("08/2025 – atual", "08/2025 – present"),
    location: l("São Paulo · Híbrido", "São Paulo · Hybrid"),
    roles: [
      {
        title: l("Consultor Técnico SAP Trainee", "SAP Technical Consultant Trainee"),
        period: l("04/2026 – atual", "04/2026 – present"),
        summary: l(
          "Projetos SAP para clientes de segmentos diferentes e agentes de IA no R&D. Instrutor de SAP ABAP na Exed Academy.",
          "SAP projects for clients across industries and AI agents in R&D. SAP ABAP instructor at Exed Academy.",
        ),
        bullets: [
          l(
            "Desenvolvo um agente de Contas a Pagar no SAP Joule Studio, com API em SAP CAP no Cloud Foundry integrada ao S/4HANA e ao SAP Ariba.",
            "Building an Accounts Payable agent on SAP Joule Studio, with an SAP CAP API on Cloud Foundry integrated with S/4HANA and SAP Ariba.",
          ),
          l(
            "Atuei no back-end em Python de uma plataforma interna de IA, com RAG, AI Gateway e agentes em LangGraph que já estão em produção.",
            "Worked on the Python back-end of an internal AI platform with RAG, an AI Gateway and LangGraph agents now in production.",
          ),
          l(
            "Implementei a transferência de material indireto no S/4HANA Cloud Public Edition com RAP, extensão no SAP BTP e aprovação no SAP Build Process Automation.",
            "Implemented indirect material transfer on S/4HANA Cloud Public Edition with RAP, an SAP BTP extension and approvals in SAP Build Process Automation.",
          ),
          l(
            "Dou treinamentos de SAP ABAP na Exed Academy: ABAP clássico, CDS Views, SAP Gateway e extensibilidade.",
            "Teach SAP ABAP courses at Exed Academy: classic ABAP, CDS Views, SAP Gateway and extensibility.",
          ),
        ],
      },
      {
        title: l("Estagiário SAP ABAP", "SAP ABAP Intern"),
        period: l("08/2025 – 03/2026", "08/2025 – 03/2026"),
        summary: l(
          "Apps Fiori com ABAP Cloud em cliente e um protótipo que virou produto interno do R&D.",
          "Fiori apps with ABAP Cloud for a client and a prototype that became an internal R&D product.",
        ),
        bullets: [
          l(
            "Desenvolvi 2 apps Fiori/SAPUI5 com ABAP Cloud para as regras do PNLD, ligando contratos e ordens de venda (SD) ao EWM.",
            "Developed 2 Fiori/SAPUI5 apps with ABAP Cloud for PNLD rules, linking contracts and sales orders (SD) to EWM.",
          ),
          l(
            "Participei do protótipo de um portal de RH integrado ao SAP HCM e o apresentei a CEO, CTO e líderes técnicos. O CTO decidiu transformá-lo em produto interno do R&D.",
            "Helped build an HR portal prototype integrated with SAP HCM and presented it to the CEO, CTO and technical leads. The CTO turned it into an internal R&D product.",
          ),
          l(
            "Desenvolvi grande parte desse produto em React com micro front-ends e back-end em Node.js, integrado ao S/4HANA via OData.",
            "Built most of the product in React with micro-frontends and a Node.js back-end integrated with S/4HANA via OData.",
          ),
        ],
      },
    ],
  },
  {
    org: "Freelance",
    period: l("03/2024 – 06/2024", "03/2024 – 06/2024"),
    location: l("São Paulo", "São Paulo"),
    roles: [
      {
        title: l("Desenvolvedor Autônomo (RPA)", "Freelance RPA Developer"),
        period: l("03/2024 – 06/2024", "03/2024 – 06/2024"),
        summary: l("Automação fiscal com Python.", "Tax automation with Python."),
        bullets: [
          l(
            "Automatizei o lançamento de notas fiscais de serviço no portal municipal de Barueri com Python e Selenium (RPA), reduzindo em cerca de 89% o esforço operacional e os erros de digitação para 1%.",
            "Automated service invoice entry on the Barueri municipal tax portal with Python and Selenium (RPA), cutting operational effort by about 89% and typing errors to 1%.",
          ),
        ],
      },
    ],
  },
];

export type Education = { title: L; org: string; period: L; description: L };

export const education: Education[] = [
  {
    title: l("Bacharelado em Ciência da Computação", "B.Sc. in Computer Science"),
    org: "São Paulo Tech School (SPTech)",
    period: l("07/2024 – 07/2028 (previsão)", "07/2024 – 07/2028 (expected)"),
    description: l(
      "Back-end com Java e Spring Boot, microsserviços, mensageria com RabbitMQ, pipelines de dados e Cloud/DevOps com AWS e Terraform.",
      "Back-end with Java and Spring Boot, microservices, RabbitMQ messaging, data pipelines and Cloud/DevOps with AWS and Terraform.",
    ),
  },
  {
    title: l(
      "Técnico em Programação de Jogos Digitais",
      "Technical Degree in Digital Game Programming",
    ),
    org: "ETEC Prof. Basilides de Godoy",
    period: l("01/2021 – 12/2023", "01/2021 – 12/2023"),
    description: l(
      "Unity e C#, orientação a objetos, MySQL e desenvolvimento mobile com Android Studio (Java).",
      "Unity and C#, object-oriented programming, MySQL and mobile development with Android Studio (Java).",
    ),
  },
];

// ---------- Cases (trabalho real, anônimo) ----------

// problem = o desafio, descrito só com fatos do mestre (sem dramatizar).
export type Case = { id: string; title: L; segment: L; problem: L; did: L; stack: string[] };

export const cases: Case[] = [
  {
    id: "ap-agent",
    title: l("Agente de IA de Contas a Pagar", "Accounts Payable AI agent"),
    segment: l(
      "Multinacional norte-americana de alimentos e bebidas",
      "U.S. food and beverage multinational",
    ),
    problem: l(
      "Reunir num agente de IA os dados de contas a pagar do S/4HANA e do SAP Ariba.",
      "Bring accounts payable data from S/4HANA and SAP Ariba into one AI agent.",
    ),
    did: l(
      "Desenvolvo o agente no SAP Joule Studio com uma API em SAP CAP no Cloud Foundry que reúne os dados dos dois sistemas, e participo das decisões de arquitetura.",
      "Building the agent on SAP Joule Studio with an SAP CAP API on Cloud Foundry that unifies data from both systems, and taking part in architecture decisions.",
    ),
    stack: ["SAP Joule Studio", "SAP CAP", "Cloud Foundry", "SAP AI Core", "S/4HANA", "SAP Ariba"],
  },
  {
    id: "ai-platform",
    title: l("Agentes de IA em produção", "AI agents in production"),
    segment: l("R&D interno", "Internal R&D"),
    problem: l(
      "Apoiar com IA a revisão de NDA e o recrutamento.",
      "Support NDA review and recruiting with AI.",
    ),
    did: l(
      "Atuei no back-end em Python de uma plataforma interna de conhecimento: RAG com embeddings, AI Gateway e agentes em LangGraph com Claude via AWS Bedrock, já em produção.",
      "Worked on the Python back-end of an internal knowledge platform: RAG with embeddings, an AI Gateway and LangGraph agents using Claude on AWS Bedrock, now in production.",
    ),
    stack: ["Python", "LangGraph", "RAG", "AWS Bedrock", "MCP"],
  },
  {
    id: "material-transfer",
    title: l("Transferência de material indireto", "Indirect material transfer"),
    segment: l("Projeto em S/4HANA Cloud Public Edition", "S/4HANA Cloud Public Edition project"),
    problem: l(
      "Transferir material indireto no S/4HANA Cloud Public Edition, com fluxo de aprovação.",
      "Transfer indirect material on S/4HANA Cloud Public Edition, with an approval flow.",
    ),
    did: l(
      "Implementei o processo com RAP e uma extensão no SAP BTP, com aprovação e notificações no SAP Build Process Automation.",
      "Implemented the process with RAP and an SAP BTP extension, with approvals and notifications in SAP Build Process Automation.",
    ),
    stack: ["RAP", "S/4HANA Cloud Public Edition", "SAP BTP", "SAP Build Process Automation"],
  },
  {
    id: "tax-reform",
    title: l(
      "Reforma Tributária na integração fiscal",
      "Brazil's Tax Reform in the tax integration",
    ),
    segment: l("Distribuidora de combustíveis e lubrificantes", "Fuel and lubricants distributor"),
    problem: l(
      "A integração com o motor fiscal Avalara gerava valores errados de IBS/CBS.",
      "The integration with the Avalara tax engine produced wrong IBS/CBS values.",
    ),
    did: l(
      "Achei por debug a exit que gerava o erro no SAP Integration Suite (CPI) e estendi a BAdI de nota fiscal para a Reforma Tributária.",
      "Debugged the exit causing the error on SAP Integration Suite (CPI) and extended the invoice BAdI for the Tax Reform.",
    ),
    stack: ["SAP Integration Suite (CPI)", "BAdI", "IBS/CBS", "ABAP"],
  },
  {
    id: "lbn-pod",
    title: l("Comprovantes de entrega via SAP LBN", "Proof of delivery via SAP LBN"),
    segment: l("Grupo educacional de grande porte", "Large Brazilian education group"),
    problem: l(
      "Enviar comprovantes de entrega (POD) do SAP TM a um sistema de validação de imagens.",
      "Send proof-of-delivery (POD) documents from SAP TM to an image validation system.",
    ),
    did: l(
      "Desenvolvi enhancements em BOPF no SAP TM para a integração nativa com o SAP LBN. Também adaptei o monitor de notas fiscais ao SAP TM num app Fiori e apoiei a UAT e o go-live no centro de distribuição.",
      "Built BOPF enhancements in SAP TM for the native SAP LBN integration. Also adapted the invoice monitor to SAP TM as a Fiori app and supported UAT and go-live at the distribution center.",
    ),
    stack: ["SAP TM", "BOPF", "SAP LBN", "SAP Fiori"],
  },
  {
    id: "hr-portal",
    title: l("Portal de RH", "HR portal"),
    segment: l("Produto interno do R&D", "Internal R&D product"),
    problem: l("Um portal de RH integrado ao SAP HCM.", "An HR portal integrated with SAP HCM."),
    did: l(
      "Participei do protótipo Fiori e o apresentei a CEO, CTO e líderes técnicos. Virou produto, e desenvolvi grande parte dele em React com micro front-ends e Node.js, integrado ao S/4HANA via OData.",
      "Helped build the Fiori prototype and presented it to the CEO, CTO and technical leads. It became a product, and I built most of it in React with micro-frontends and Node.js, integrated with S/4HANA via OData.",
    ),
    stack: ["SAP HCM", "SAP Fiori", "React", "Node.js", "OData"],
  },
  {
    id: "pnld",
    title: l(
      "Apps para um contrato com o governo federal",
      "Apps for a federal government contract",
    ),
    segment: l("Grupo educacional de grande porte", "Large Brazilian education group"),
    problem: l(
      "Aplicar as regras do PNLD, um contrato com o governo federal, de contratos e ordens de venda até o armazém.",
      "Apply PNLD rules (a federal government contract) from contracts and sales orders to the warehouse.",
    ),
    did: l(
      "Desenvolvi 2 apps Fiori/SAPUI5 com ABAP Cloud, ligando contratos e ordens de venda (SD) ao EWM.",
      "Developed 2 Fiori/SAPUI5 apps with ABAP Cloud, linking contracts and sales orders (SD) to EWM.",
    ),
    stack: ["ABAP Cloud", "SAP Fiori", "SAPUI5", "SD", "EWM"],
  },
];

// ---------- Mais projetos ----------

export type Project = {
  id: string;
  title: string;
  description: L;
  stack: string[];
  period: L;
  link: string;
  group: "uni" | "pessoal" | "jogos";
};

export const projects: Project[] = [
  {
    id: "cs2-stats-bot",
    title: "CS2 Stats Bot",
    description: l(
      "Bot de Discord em Python que coleta e analisa estatísticas de partidas de Counter-Strike 2 com OCR assistido por IA e persistência em MySQL.",
      "Python Discord bot that collects and analyzes Counter-Strike 2 match statistics using AI-assisted OCR, with MySQL persistence.",
    ),
    stack: ["Python", "Discord API", "MySQL", "OCR", "IA"],
    period: l("2025 – 2026", "2025 – 2026"),
    link: "https://github.com/RanierDalton/cs2-stats-bot",
    group: "pessoal",
  },
  {
    id: "solarway",
    title: "SolarWay",
    description: l(
      "Projeto de extensão universitária para uma empresa de energia solar: aplicação web em Node.js e React que facilita o acesso a projetos de instalação de placas solares.",
      "University outreach project for a solar energy company: a Node.js and React web application that simplifies access to solar panel installation projects.",
    ),
    stack: ["Node.js", "React", "JavaScript"],
    period: l("07/2025 – 05/2026", "07/2025 – 05/2026"),
    link: "https://github.com/Projeto-de-extensao-Grupo-06",
    group: "uni",
  },
  {
    id: "infrawatch",
    title: "InfraWatch",
    description: l(
      "Monitoramento em tempo real de servidores de render farms em Python, antecipando gargalos e falhas de infraestrutura.",
      "Real-time Python monitoring of render farm servers, anticipating infrastructure bottlenecks and failures.",
    ),
    stack: ["Python", "Monitoramento", "Back-end"],
    period: l("12/2024 – 05/2025", "12/2024 – 05/2025"),
    link: "https://github.com/InfraWatch-inc",
    group: "uni",
  },
  {
    id: "feat-up",
    title: "FeatUp",
    description: l(
      "Modelagem de dados de uma rede social de colaboração entre produtores musicais: feats, playlists, feeds e preferências.",
      "Data modeling for a collaboration social network for music producers: feats, playlists, feeds and preferences.",
    ),
    stack: ["SQL", "Modelagem de dados"],
    period: l("1º semestre 2024", "1st semester 2024"),
    link: "https://github.com/RanierDalton/feat-up",
    group: "uni",
  },
  {
    id: "sinal-verde",
    title: "Sinal Verde",
    description: l(
      "Projeto acadêmico com sensores de distância que monitoram o fluxo de veículos e alimentam um painel analítico.",
      "Academic project using distance sensors to monitor vehicle flow and feed an analytics dashboard.",
    ),
    stack: ["JavaScript", "IoT", "Dashboard"],
    period: l("1º semestre 2024", "1st semester 2024"),
    link: "https://github.com/Carvalho003/sinal_verde",
    group: "uni",
  },
  {
    id: "monocromo",
    title: "Monocromo",
    description: l(
      "Jogo de ação e aventura num mundo futurista distópico, TCC do técnico em Programação de Jogos Digitais.",
      "Action-adventure game set in a dystopian future, the capstone project of the game programming technical degree.",
    ),
    stack: ["Unity", "C#", "Game Design"],
    period: l("2023", "2023"),
    link: "https://github.com/RanierDC/Monocromo",
    group: "jogos",
  },
  {
    id: "reddead2-wiki",
    title: "RedDead 2 Wiki",
    description: l(
      "App Android de fan wiki sobre Red Dead Redemption 2, com lore, guias de missões e consulta de itens.",
      "Android fan wiki app for Red Dead Redemption 2, with lore, mission guides and item lookup.",
    ),
    stack: ["Java", "Android Studio"],
    period: l("2022", "2022"),
    link: "https://github.com/RanierDC/RedDead2-Wiki",
    group: "jogos",
  },
  {
    id: "broken-control",
    title: "Broken Control",
    description: l(
      "Portal com notícias e 6 jogos clássicos jogáveis no navegador, feitos em HTML e JavaScript.",
      "Portal with news and 6 classic games playable in the browser, built with HTML and JavaScript.",
    ),
    stack: ["HTML", "CSS", "JavaScript"],
    period: l("2021", "2021"),
    link: "https://github.com/RanierDC/BrokenControl",
    group: "jogos",
  },
];

// ---------- Credenciais ----------

export type Credential = {
  id: string;
  name: string;
  issuer: "SAP" | "Oracle" | "IBM" | "EF SET";
  issued: string; // MM/AAAA
  expires?: string;
  link?: string;
  skills: string[];
};

export const credentials: Credential[] = [
  {
    id: "sap-baip",
    name: "SAP Certified – Solution Architect – SAP Business AI Platform",
    issuer: "SAP",
    issued: "10/2026",
    expires: "10/2027",
    link: "https://www.credly.com/badges/920fb0f6-6252-4dc3-bcc4-11eca51e9c9f",
    skills: ["Solution Architecture", "SAP BTP", "SAP Business AI"],
  },
  {
    id: "sap-abap-cloud",
    name: "SAP Certified – Back-End Developer – ABAP Cloud",
    issuer: "SAP",
    issued: "05/2026",
    expires: "05/2027",
    link: "https://www.credly.com/badges/de6ae0fe-9100-47e5-8075-41f4ddbdb9b0",
    skills: ["ABAP Cloud", "RAP", "S/4HANA"],
  },
  {
    id: "sap-fiori",
    name: "SAP Certified – SAP Fiori Application Developer",
    issuer: "SAP",
    issued: "11/2026",
    expires: "11/2027",
    link: "https://www.credly.com/badges/ce6ee021-7a26-41e7-ad4c-167e23b707d5",
    skills: ["SAP Fiori", "SAPUI5", "Fiori Elements"],
  },
  {
    id: "sap-cap",
    name: "SAP Certified – Back-End Developer – SAP Cloud Application Programming Model",
    issuer: "SAP",
    issued: "05/2026",
    expires: "05/2027",
    link: "https://www.credly.com/badges/59b04c03-9ab8-47ec-b981-1b7d7388ed36",
    skills: ["SAP CAP", "Node.js", "SAP BTP"],
  },
  {
    id: "sap-build",
    name: "SAP Certified – SAP Build Developer",
    issuer: "SAP",
    issued: "05/2026",
    expires: "05/2027",
    link: "https://www.credly.com/badges/27ae4df1-f68c-4a96-88ab-e9e8914032ea",
    skills: ["SAP Build", "Process Automation", "Low-code"],
  },
  {
    id: "sap-activate",
    name: "SAP Certified – Project Manager – SAP Activate",
    issuer: "SAP",
    issued: "06/2026",
    expires: "06/2027",
    link: "https://www.credly.com/badges/791873c8-408a-4185-844f-ad25d4e8a1ae",
    skills: ["SAP Activate", "Project Management"],
  },
  {
    id: "oracle-agentic-ai",
    name: "Oracle Cloud Infrastructure – Agentic AI Foundations Associate",
    issuer: "Oracle",
    issued: "07/2026",
    expires: "07/2028",
    link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=53A83A38EBEB4228E311E6FE52D5B675E5CC6E1CEDBDA8E0B0AE870F07555F8D",
    skills: ["Agentic AI", "MCP", "OCI AI Agents"],
  },
  {
    id: "oracle-ai-foundations",
    name: "Oracle Cloud AI Foundations",
    issuer: "Oracle",
    issued: "05/2026",
    expires: "05/2028",
    link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=9657B6991556DFA3C64AED0D28D48FC58A861F62D5A923A41BF017898FB53E02",
    skills: ["AI", "Machine Learning", "OCI"],
  },
  {
    id: "oracle-cloud-foundations",
    name: "Oracle Cloud Infrastructure – Foundations Associate",
    issuer: "Oracle",
    issued: "04/2026",
    expires: "04/2028",
    link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=8EC12614D76FD8A9E9CC5D4F61DC3ABDF13E5E31A0F0A52856293AAEB92E0350",
    skills: ["Cloud Computing", "OCI"],
  },
  {
    id: "ibm-ai-fundamentals",
    name: "IBM Artificial Intelligence Fundamentals",
    issuer: "IBM",
    issued: "06/2025",
    link: "https://www.credly.com/badges/91446c3b-1738-4837-8dcf-0487d2ea0889",
    skills: ["AI", "Generative AI"],
  },
  {
    id: "efset-c1",
    name: "EF SET English Certificate – C1 Advanced",
    issuer: "EF SET",
    issued: "09/2025",
    link: "https://cert.efset.org/pt/tFDDat",
    skills: ["English C1"],
  },
];

export const award = {
  name: l("Destaque em Excelência Técnica", "Technical Excellence Award"),
  org: "Exed Consulting",
  date: "08/2026",
};

export const courses: { name: L; org: string; date: string }[] = [
  {
    name: l("SAP ABAP para Programadores (92 horas)", "SAP ABAP for Programmers (92 hours)"),
    org: "Exed Academy",
    date: "09/2025",
  },
  { name: l("Datadog Foundation", "Datadog Foundation"), org: "Datadog", date: "04/2025" },
  { name: l("Inglês Avançado 2", "Advanced English 2"), org: "Senac São Paulo", date: "12/2024" },
  {
    name: l("Comunicação para Líderes", "Communication for Leaders"),
    org: "Impacta Tecnologia",
    date: "12/2023",
  },
  {
    name: l("CC50 – Ciência da Computação de Harvard", "CC50 – Harvard's Computer Science course"),
    org: "Fundação Estudar",
    date: "07/2023",
  },
];

export const languages: { name: L; level: L }[] = [
  { name: l("Português", "Portuguese"), level: l("nativo", "native") },
  { name: l("Inglês", "English"), level: l("C1 (EF SET)", "C1 (EF SET)") },
  { name: l("Espanhol", "Spanish"), level: l("básico", "basic") },
];

// ---------- Stack ----------

export const stack: { area: L; items: string[] }[] = [
  {
    area: l("ABAP & S/4HANA", "ABAP & S/4HANA"),
    items: [
      "ABAP Cloud",
      "RAP",
      "CDS Views",
      "BOPF",
      "BAdIs",
      "Enhancements",
      "ALV",
      "Adobe Forms",
      "OData/SAP Gateway",
      "SAP Fiori/SAPUI5",
    ],
  },
  {
    area: l("SAP BTP & Integração", "SAP BTP & Integration"),
    items: [
      "SAP CAP",
      "Cloud Foundry",
      "SAP Build Process Automation",
      "SAP Joule Studio",
      "SAP AI Core",
      "SAP Integration Suite (CPI)",
      "SAP LBN",
    ],
  },
  { area: l("Módulos", "Modules"), items: ["TM", "SD", "MM", "EWM", "HCM", "SAP Activate"] },
  {
    area: l("IA", "AI"),
    items: ["Agentes de IA", "LLMs", "RAG", "LangGraph", "MCP", "AWS Bedrock"],
  },
  {
    area: l("Desenvolvimento", "Development"),
    items: ["Python", "FastAPI", "Node.js", "TypeScript", "Java", "React", "SQL/SAP HANA"],
  },
  {
    area: l("Cloud & DevOps", "Cloud & DevOps"),
    items: ["AWS", "SAP BTP", "Git", "GitHub Actions"],
  },
];
