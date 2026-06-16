import { ServiceConfig, ServiceDefinition } from "./types";

export const SERVICES_ALL: ServiceDefinition[] = [
  { name: "Smart Journey Collection", slug: "smart-journey", key: "sjc_triagem" },
  { name: "Gestão de Acordo", slug: "gestao-acordo", key: "ga_triagem" },
  { name: "Gestão de Fatura", slug: "gestao-fatura", key: "gf_triagem" },
  { name: "Jornada de Cobrança", slug: "jornada-cobranca", key: "jc_triagem" },
];

export const SJC_CONFIG: ServiceConfig = {
  name: "Smart Journey Collection",
  filename: "Smart-Journey-Collection",
  storageKey: "sjc_triagem",
  columns: ["col-middle", "col-right"],
  tagline: {
    palavras: ["O", "mais", "completo", "ecossistema", "de", "relacionamento", "digital", "para", "cobrança"],
    destaques: new Set(["ecossistema", "relacionamento", "digital", "cobrança"]),
  },
};

export const GA_CONFIG: ServiceConfig = {
  name: "Gestão de Acordo",
  filename: "Gestao-de-Acordo",
  storageKey: "ga_triagem",
  columns: [],
  tagline: {
    palavras: ["Gestão", "de", "acordo", "inteligente", "e", "personalizada", "para", "cada", "cliente"],
    destaques: new Set(["inteligente", "personalizada"]),
  },
};

export const GF_CONFIG: ServiceConfig = {
  name: "Gestão de Fatura",
  filename: "Gestao-de-Fatura",
  storageKey: "gf_triagem",
  columns: [],
  tagline: {
    palavras: ["Controle", "completo", "do", "ciclo", "de", "vida", "da", "fatura", "do", "cliente"],
    destaques: new Set(["completo", "fatura", "cliente"]),
  },
};

export const JC_CONFIG: ServiceConfig = {
  name: "Jornada de Cobrança",
  filename: "Jornada-de-Cobranca",
  storageKey: "jc_triagem",
  columns: [],
  tagline: {
    palavras: ["Fluxo", "integrado", "e", "automatizado", "de", "toda", "a", "jornada", "de", "cobrança"],
    destaques: new Set(["integrado", "automatizado", "jornada", "cobrança"]),
  },
};

export const SJC_BLOCKS: Record<string, string[]> = {
  "block-channels": ["svc-sms", "svc-email", "svc-rcs", "svc-whats", "svc-ura", "svc-carta", "svc-ads"],
  "block-files": ["svc-boleto", "svc-carne", "svc-fatura"],
  "block-ia": ["svc-chatbot", "svc-voicebot", "svc-prediction", "svc-intention"],
  "block-receptivo": ["svc-texto", "svc-voz"],
  "block-insights": ["svc-report", "svc-dashboards", "svc-discovery", "svc-analytics"],
};

export const GA_BLOCKS: Record<string, string[]> = {
  "block-channels": ["svc-sms", "svc-email", "svc-rcs", "svc-whats", "svc-ura"],
  "block-atendimento": ["svc-ai", "svc-consultor"],
  "block-insights": ["svc-report", "svc-dashboards", "svc-discovery", "svc-analytics"],
};

export const GF_BLOCKS: Record<string, string[]> = {
  "block-channels": ["svc-sms", "svc-email", "svc-whats"],
  "block-files": ["svc-boleto", "svc-fatura"],
  "block-atendimento": ["svc-texto", "svc-voz"],
  "block-insights": ["svc-report", "svc-dashboards", "svc-discovery", "svc-analytics"],
  "block-service-tabs": ["svc-tab-ga", "svc-tab-gf", "svc-tab-jc"],
};

export const JC_BLOCKS: Record<string, string[]> = {
  "block-channels": ["svc-sms", "svc-email", "svc-rcs", "svc-whats", "svc-ura"],
  "block-files": ["svc-boleto", "svc-fatura"],
  "block-atendimento": ["svc-ai", "svc-consultor"],
  "block-insights": ["svc-report", "svc-dashboards", "svc-discovery", "svc-analytics"],
  "block-service-tabs": ["svc-tab-ga", "svc-tab-gf", "svc-tab-jc"],
};

export const BLOCK_NAMES: Record<string, string> = {
  "block-pg-contact": "PG Contact",
  "block-one": "O.N.E.",
  "block-channels": "PGChannels",
  "block-files": "PGFiles",
  "block-ia": "Inteligência Artificial Conversacional",
  "block-receptivo": "Receptivo Multicanal",
  "block-atendimento": "Atendimento",
  "block-portal-auto": "Portal de Autonegociação",
  "block-portal-ga": "Portal de Autonegociação",
  "block-insights": "pg+ Insights",
};

export const PHONE_ACTIONS = [
  { icon: "ScanLine", label: "Copiar código de barras" },
  { icon: "QrCode", label: "Pix copie e cole" },
  { icon: "ExternalLink", label: "Portal de negociação" },
  { icon: "MessageCircle", label: "WhatsApp de negociação" },
  { icon: "Phone", label: "Central de atendimento" },
];

export const ONE_ITEMS = [
  "Segmentação", "Estratégia", "Next Best Action", "Rastreabilidade", "Resultados",
];

export function darkenHex(hex: string, amount: number): string {
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);
  r = Math.max(0, Math.round(r * (1 - amount)));
  g = Math.max(0, Math.round(g * (1 - amount)));
  b = Math.max(0, Math.round(b * (1 - amount)));
  return "#" + [r, g, b].map(v => v.toString(16).padStart(2, "0")).join("");
}

export const ASSET_PATH = "/assets/";
export const ICONE_PATH = "/icones/";

export function assetSrc(name: string): string {
  if (name.endsWith(".svg")) return `${ASSET_PATH}${name}`;
  if (name.startsWith("data:")) return name;
  return `${ASSET_PATH}${name}`;
}

export const SERVICE_ICONS: Record<string, string> = {
  "svc-sms": "SMS.svg",
  "svc-email": "EMAIL.svg",
  "svc-rcs": "RCS.svg",
  "svc-whats": "WHATS.svg",
  "svc-ura": "URA.svg",
  "svc-carta": "CARTA.svg",
  "svc-ads": "ADS.svg",
  "svc-boleto": "BOLETO.svg",
  "svc-carne": "CARNE.svg",
  "svc-fatura": "FATURA.svg",
  "svc-chatbot": "CHATBOT.svg",
  "svc-voicebot": "VOICEBOT.svg",
  "svc-prediction": "PREDICTION.svg",
  "svc-intention": "INTENTION.svg",
  "svc-texto": "TEXTO.svg",
  "svc-voz": "VOZ.svg",
  "svc-ai": "+AI.svg",
  "svc-consultor": "CONSULTOR.svg",
  "svc-report": "REPORT.svg",
  "svc-dashboards": "DASHBOARDS.svg",
  "svc-discovery": "DISCOVERY.svg",
  "svc-analytics": "ANALYTICS.svg",
};

export const SERVICE_LABELS: Record<string, string> = {
  "svc-sms": "SMS",
  "svc-email": "Email",
  "svc-rcs": "RCS",
  "svc-whats": "Whats",
  "svc-ura": "URA",
  "svc-carta": "Carta",
  "svc-ads": "ADS",
  "svc-boleto": "Boleto",
  "svc-carne": "Carnê",
  "svc-fatura": "Fatura",
  "svc-chatbot": "Chatbot",
  "svc-voicebot": "VoiceBot",
  "svc-prediction": "Prediction",
  "svc-intention": "Intention",
  "svc-texto": "Texto",
  "svc-voz": "Voz",
  "svc-ai": "+AI",
  "svc-consultor": "Consultor",
  "svc-report": "Report",
  "svc-dashboards": "Dashboards",
  "svc-discovery": "Discovery",
  "svc-analytics": "Analytics",
};
