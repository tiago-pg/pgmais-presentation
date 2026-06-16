export interface ServiceConfig {
  name: string;
  filename: string;
  storageKey: string;
  columns: string[];
  tagline: {
    palavras: string[];
    destaques: Set<string>;
  };
}

export interface ServiceDefinition {
  name: string;
  slug: string;
  key: string;
}

export interface TriagemData {
  type: "padrao" | "personalizada";
  nome: string;
  nomeEmpresa: string;
  nomeCliente: string;
  cor?: string;
  logo?: string;
  imagem?: string;
}

export interface HistoryEntry {
  type: "service" | "block";
  id: string;
  children?: string[];
  auto?: boolean;
}

export interface AppState {
  hiddenServices: Set<string>;
  hiddenBlocks: Set<string>;
  history: HistoryEntry[];
  triagemData: TriagemData | null;
  isTriagemOpen: boolean;
  serviceLoaded: boolean;
}

export type AppAction =
  | { type: "REMOVE_SERVICE"; id: string }
  | { type: "REMOVE_BLOCK"; id: string; children: string[] }
  | { type: "UNDO" }
  | { type: "RESET_ALL" }
  | { type: "RESTORE_SERVICE"; id: string }
  | { type: "RESTORE_BLOCK"; id: string; services: string[] }
  | { type: "SET_TRIAGEM_DATA"; data: TriagemData | null }
  | { type: "SET_TRIAGEM_OPEN"; open: boolean }
  | { type: "SET_SERVICE_LOADED"; loaded: boolean }
  | { type: "INIT_FROM_STORAGE"; hiddenServices: string[]; hiddenBlocks: string[] }
  | { type: "BATCH_UPDATE"; hiddenServices: string[]; hiddenBlocks: string[] };
