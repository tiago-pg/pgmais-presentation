"use client";

import { TriagemData, ServiceConfig } from "./types";

let _triagemLogo: string | null = null;
let _triagemImagem: string | null = null;

export function getTriagemLogo() { return _triagemLogo; }
export function getTriagemImagem() { return _triagemImagem; }
export function setTriagemLogo(val: string | null) { _triagemLogo = val; }
export function setTriagemImagem(val: string | null) { _triagemImagem = val; }

export function triagemEscolher(tipo: "personalizada" | "padrao") {
  return tipo;
}

export function triagemConfirmarPadrao(config: ServiceConfig, empresa: string, cliente: string): TriagemData | null {
  if (!empresa.trim()) return null;
  const data: TriagemData = {
    type: "padrao",
    nome: empresa.trim(),
    nomeEmpresa: empresa.trim(),
    nomeCliente: cliente.trim(),
  };
  sessionStorage.setItem(config.storageKey, JSON.stringify(data));
  return data;
}

export function triagemConfirmarPersonalizada(
  config: ServiceConfig,
  empresa: string,
  cliente: string,
  cor: string,
  logo: string,
  imagem: string
): TriagemData | null {
  if (!empresa.trim() || !logo || !imagem) return null;
  const data: TriagemData = {
    type: "personalizada",
    nome: empresa.trim(),
    nomeEmpresa: empresa.trim(),
    nomeCliente: cliente.trim(),
    cor,
    logo,
    imagem,
  };
  sessionStorage.setItem(config.storageKey, JSON.stringify(data));
  return data;
}

export function getTriagemData(storageKey: string): TriagemData | null {
  if (typeof window === "undefined") return null;
  const saved = sessionStorage.getItem(storageKey);
  if (!saved) return null;
  try { return JSON.parse(saved); } catch { return null; }
}

export function saveTriagemData(storageKey: string, data: TriagemData) {
  sessionStorage.setItem(storageKey, JSON.stringify(data));
}

export function resizeImg(dataUrl: string, maxW: number, maxH: number, keepTransparency: boolean): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxW / img.width, maxH / img.height);
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);
      const cv = document.createElement("canvas");
      cv.width = w;
      cv.height = h;
      const ctx = cv.getContext("2d")!;
      if (keepTransparency) ctx.clearRect(0, 0, w, h);
      ctx.drawImage(img, 0, 0, w, h);
      resolve(keepTransparency ? cv.toDataURL("image/png") : cv.toDataURL("image/jpeg", 0.85));
    };
    img.src = dataUrl;
  });
}
