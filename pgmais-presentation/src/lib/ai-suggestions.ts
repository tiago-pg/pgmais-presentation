"use client";

type CompanyProfile = {
  nome: string;
  setor: string;
  porte: string;
  recomendacao: {
    tipo: "personalizada" | "padrao";
    cor: string;
    servicos: string[];
    mensagem: string;
  };
};

const COMPANY_DB: Record<string, CompanyProfile> = {
  itau: {
    nome: "Banco Itaú",
    setor: "Financeiro/Bancos",
    porte: "Grande",
    recomendacao: { tipo: "personalizada", cor: "#003d6b", servicos: ["svc-sms","svc-email","svc-whats","svc-carta","svc-ura","svc-chatbot","svc-voicebot"], mensagem: "Perfil identificado: Grande banco com alta demanda de cobrança digital. Recomendamos jornada multicanal completa." },
  },
  claro: {
    nome: "Claro",
    setor: "Telecom",
    porte: "Grande",
    recomendacao: { tipo: "personalizada", cor: "#ed1c24", servicos: ["svc-sms","svc-email","svc-whats","svc-ura","svc-chatbot"], mensagem: "Perfil identificado: Operadora com grande base de clientes. Foco em canais digitais de alto volume." },
  },
  magazine: {
    nome: "Magazine Luiza",
    setor: "Varejo",
    porte: "Grande",
    recomendacao: { tipo: "personalizada", cor: "#e20134", servicos: ["svc-sms","svc-email","svc-whats","svc-rcs","svc-chatbot"], mensagem: "Perfil identificado: Varejo com forte presença digital. Recomendamos canais de alto engajamento." },
  },
  vivo: {
    nome: "Vivo",
    setor: "Telecom",
    porte: "Grande",
    recomendacao: { tipo: "personalizada", cor: "#660099", servicos: ["svc-sms","svc-email","svc-ura","svc-carta","svc-voicebot"], mensagem: "Perfil identificado: Telecom com base massiva. Foco em automação e IA conversacional." },
  },
};

export function suggestFromCompanyName(nome: string): CompanyProfile | null {
  const key = Object.keys(COMPANY_DB).find(k => nome.toLowerCase().includes(k));
  return key ? COMPANY_DB[key] : null;
}

export function suggestFromSegment(setor: string): Partial<CompanyProfile["recomendacao"]> | null {
  const s = setor.toLowerCase();
  if (s.includes("banco") || s.includes("financeiro")) return { cor: "#003d6b", servicos: ["svc-sms","svc-email","svc-whats","svc-carta","svc-ura","svc-chatbot","svc-voicebot"] };
  if (s.includes("telecom") || s.includes("operadora")) return { cor: "#660099", servicos: ["svc-sms","svc-email","svc-whats","svc-ura","svc-chatbot"] };
  if (s.includes("varejo") || s.includes("loja") || s.includes("comércio")) return { cor: "#e20134", servicos: ["svc-sms","svc-email","svc-whats","svc-rcs"] };
  if (s.includes("saúde") || s.includes("plano")) return { cor: "#009639", servicos: ["svc-sms","svc-email","svc-whats","svc-chatbot"] };
  if (s.includes("educação") || s.includes("ensino")) return { cor: "#002776", servicos: ["svc-email","svc-whats","svc-sms"] };
  return null;
}

export const COMPANY_SUGGESTIONS = Object.keys(COMPANY_DB).map(k => COMPANY_DB[k].nome);
