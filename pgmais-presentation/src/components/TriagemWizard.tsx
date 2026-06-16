"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { ServiceConfig, TriagemData } from "@/lib/types";
import { saveTriagemData, resizeImg } from "@/lib/triagem-storage";

interface TriagemWizardProps {
  config: ServiceConfig;
  onStart: (data: TriagemData) => void;
  onSkip: () => void;
}

export default function TriagemWizard({ config, onStart, onSkip }: TriagemWizardProps) {
  const [tipo, setTipo] = useState<"personalizada" | "padrao" | null>(null);
  const [step, setStep] = useState<"escolha" | "form" | "confirmacao" | "intro">("escolha");
  const [empresa, setEmpresa] = useState("");
  const [cliente, setCliente] = useState("");
  const [cor, setCor] = useState("#172c66");
  const [logo, setLogo] = useState<string | null>(null);
  const [imagem, setImagem] = useState<string | null>(null);
  const [empresaError, setEmpresaError] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [imagemError, setImagemError] = useState(false);
  const [fechando, setFechando] = useState(false);
  const [triagemData, setTriagemData] = useState<TriagemData | null>(null);

  const handleEscolher = (t: "personalizada" | "padrao") => {
    setTipo(t);
    setStep("form");
  };

  const handleVoltar = () => {
    setStep("escolha");
    setTipo(null);
  };

  const handleConfirmarPadrao = () => {
    if (!empresa.trim()) {
      setEmpresaError(true);
      return;
    }
    const data: TriagemData = {
      type: "padrao",
      nome: empresa.trim(),
      nomeEmpresa: empresa.trim(),
      nomeCliente: cliente.trim(),
    };
    saveTriagemData(config.storageKey, data);
    setTriagemData(data);
    setStep("confirmacao");
  };

  const handleConfirmarPersonalizada = () => {
    let ok = true;
    if (!empresa.trim()) { setEmpresaError(true); ok = false; }
    if (!logo) { setLogoError(true); ok = false; }
    if (!imagem) { setImagemError(true); ok = false; }
    if (!ok) return;

    const data: TriagemData = {
      type: "personalizada",
      nome: empresa.trim(),
      nomeEmpresa: empresa.trim(),
      nomeCliente: cliente.trim(),
      cor,
      logo: logo!,
      imagem: imagem!,
    };
    saveTriagemData(config.storageKey, data);
    setTriagemData(data);
    setStep("confirmacao");
  };

  const handleIniciar = () => {
    if (triagemData) {
      setStep("intro");
      setTimeout(() => onStart(triagemData), 6000);
    }
  };

  const handlePular = () => {
    if (triagemData) {
      onStart(triagemData);
    }
  };

  const handleUpload = async (tipo: "logo" | "imagem", file: File) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const resized = await resizeImg(
        e.target!.result as string,
        tipo === "logo" ? 600 : 900,
        tipo === "logo" ? 400 : 720,
        tipo === "logo"
      );
      if (tipo === "logo") setLogo(resized);
      else setImagem(resized);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={`fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden ${fechando ? "triagem-fechando" : ""}`} style={{ background: "var(--color-gray-light)" }}>
      <div className="absolute w-[600px] h-[600px] rounded-full pointer-events-none opacity-18 blur-[90px] animate-[t-orb-drift_12s_ease-in-out_infinite]" style={{ background: "var(--color-navy)", top: "-200px", right: "-100px" }} />
      <div className="absolute w-[450px] h-[450px] rounded-full pointer-events-none opacity-18 blur-[90px] animate-[t-orb-drift_15s_ease-in-out_infinite_reverse]" style={{ background: "var(--color-navy)", bottom: "-150px", left: "-80px" }} />
      <div className="absolute w-[280px] h-[280px] rounded-full pointer-events-none opacity-18 blur-[90px] animate-[t-orb-drift_10s_ease-in-out_infinite]" style={{ background: "var(--primary-blue-400)", bottom: "20%", right: "8%", animationDelay: "3s" }} />

      {step !== "confirmacao" && step !== "intro" && (
        <div className="relative bg-white border-2 border-[var(--color-navy-20)] rounded-[28px] px-4 sm:px-[52px] py-6 sm:py-11 w-[95vw] sm:w-[700px] max-w-[calc(100vw-16px)] sm:max-w-[calc(100vw-32px)] max-h-[calc(100dvh-16px)] sm:max-h-[calc(100vh-32px)] overflow-y-auto scrollbar-none card-shadow">
          <div className="flex items-center gap-[14px] mb-7">
            <img src="/assets/PGMais - Logo.png" alt="PGMais" className="h-7 object-contain flex-shrink-0" />
            <div className="w-[1px] h-[18px] bg-[var(--color-navy-20)] flex-shrink-0" />
            <span className="text-[11px] font-semibold tracking-[1.2px] uppercase text-[var(--color-gray-400)]">Commercial Presentation Tool</span>
          </div>

          <div className="font-primary text-[32px] font-light text-[var(--color-gray-900)] leading-[1.15] mb-2 tracking-[-0.5px]">
            {config.name.split(" ").map((w, i, arr) => i === arr.length - 1 ? <strong key={i} className="font-extrabold text-[var(--color-navy)]">{w}</strong> : w + " ")}
          </div>
          <p className="text-sm text-[var(--color-gray-400)] mb-[34px] leading-[1.6]">
            Configure a experiência visual antes de iniciar a apresentação ao cliente
          </p>

          {tipo === null && (
            <div>
              <StepNav onBack={() => {}} label="Tipo de Apresentação" step="Etapa 1 de 2" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-[14px]">
                <ApresentacaoOpcao
                  badge="RECOMENDADO"
                  titulo="Apresentação Imersiva"
                  desc="Integre logo, cor da marca e foto do cliente para uma experiência totalmente personalizada."
                  onClick={() => handleEscolher("personalizada")}
                  destaque
                />
                <ApresentacaoOpcao
                  titulo="Apresentação Ágil"
                  desc="Inicie em segundos usando apenas o nome do cliente. Ideal para demonstrações rápidas."
                  onClick={() => handleEscolher("padrao")}
                />
              </div>
            </div>
          )}

          {tipo === "padrao" && (
            <div>
              <StepNav onBack={handleVoltar} label="Apresentação Ágil" step="Etapa 2 de 2" />
              <FormPadrao
                empresa={empresa} setEmpresa={setEmpresa}
                cliente={cliente} setCliente={setCliente}
                empresaError={empresaError} setEmpresaError={setEmpresaError}
                onConfirm={handleConfirmarPadrao}
              />
            </div>
          )}

          {tipo === "personalizada" && (
            <div>
              <StepNav onBack={handleVoltar} label="Apresentação Imersiva" step="Etapa 2 de 2" />
              <FormPersonalizada
                empresa={empresa} setEmpresa={setEmpresa}
                cliente={cliente} setCliente={setCliente}
                cor={cor} setCor={setCor}
                logo={logo} imagem={imagem}
                empresaError={empresaError} setEmpresaError={setEmpresaError}
                logoError={logoError} imagemError={imagemError}
                onUpload={handleUpload}
                onConfirm={handleConfirmarPersonalizada}
              />
            </div>
          )}
        </div>
      )}

      {step === "confirmacao" && triagemData && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-10 py-12" style={{ background: "linear-gradient(135deg, var(--tertiary-blue-900) 0%, var(--tertiary-blue-800) 40%, var(--color-navy) 80%)" }}>
          <div className="flex flex-col items-center text-center gap-9 max-w-[560px]">
            <h2 className="font-secondary text-2xl sm:text-[48px] font-light text-white/90 leading-[1.15] tracking-[-0.5px] sm:tracking-[-1.5px] text-center">
              Vamos personalizar a<br /><strong className="font-extrabold text-white">{config.name}?</strong>
            </h2>
            <button
              className="flex items-center justify-center gap-[10px] bg-white/12 border-2 border-white/32 backdrop-blur-[8px] text-white rounded-[16px] px-6 sm:px-12 py-3 sm:py-[18px] text-sm sm:text-[17px] font-bold font-secondary cursor-pointer tracking-[0.2px] w-full max-w-[280px] sm:max-w-[360px] transition-all duration-220 hover:bg-white/20 hover:border-white/55 hover:shadow-2xl hover:-translate-y-[2px]"
              onClick={handleIniciar}
            >
              Iniciar Jornada <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
            </button>
            <div>
              <button className="bg-none border-none text-sm text-white/32 cursor-pointer font-secondary hover:text-white/72" onClick={() => setStep("form")}>
                ← Alterar configurações
              </button>
            </div>
          </div>
        </div>
      )}

      {step === "intro" && triagemData && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-10 py-12" style={{ background: "linear-gradient(135deg, var(--tertiary-blue-900) 0%, var(--tertiary-blue-800) 40%, var(--color-navy) 80%)" }}>
          <LogoAnimation data={triagemData} config={config} onDone={() => {}} />
          <div className="text-center mt-10 opacity-0 animate-[t-fade-in_0.5s_ease_1.8s_forwards]">
            <button className="bg-none border-none text-[13px] text-white/30 cursor-pointer font-secondary hover:text-white/65 inline-flex items-center gap-[5px]" onClick={handlePular}>
              Pular <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function StepNav({ onBack, label, step }: { onBack: () => void; label: string; step: string }) {
  return (
    <div className="flex items-center gap-4 mb-7">
      <button
        className="flex items-center gap-[7px] bg-transparent border border-[var(--color-navy-20)] rounded-[10px] px-4 py-2 text-[13px] text-[var(--color-gray-600)] cursor-pointer font-secondary hover:bg-[var(--color-navy-05)] hover:border-[var(--color-navy)] hover:text-[var(--color-navy)] flex-shrink-0 whitespace-nowrap"
        onClick={onBack}
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
        Voltar
      </button>
      <div className="flex flex-col gap-[2px]">
        <span className="font-primary text-base font-bold text-[var(--color-navy)] tracking-[-0.2px]">{label}</span>
        <span className="text-[11px] font-medium tracking-[0.8px] uppercase text-[var(--color-gray-400)]">{step}</span>
      </div>
    </div>
  );
}

function ApresentacaoOpcao({ badge, titulo, desc, onClick, destaque }: { badge?: string; titulo: string; desc: string; onClick: () => void; destaque?: boolean }) {
  return (
    <div
      className={`relative rounded-[20px] px-[22px] pt-7 pb-[22px] cursor-pointer text-left overflow-hidden transition-all duration-220 hover:-translate-y-1 hover:shadow-lg ${destaque ? "bg-[var(--color-navy-10)] border-2 border-[var(--color-navy-20)] hover:border-[var(--color-navy)]" : "bg-[var(--color-navy-05)] border-2 border-[var(--color-navy-10)] hover:border-[var(--color-navy)]"}`}
      onClick={onClick}
    >
      {badge && (
        <span className="absolute top-[14px] right-[14px] bg-[var(--color-green)] text-[var(--color-navy)] text-[9px] font-bold tracking-[1.2px] px-[9px] py-1 rounded-[6px] uppercase">{badge}</span>
      )}
      <div className="w-[50px] h-[50px] bg-[var(--color-navy-10)] border border-[var(--color-navy-20)] rounded-[14px] flex items-center justify-center text-[22px] text-[var(--color-navy)] mb-4 transition-all duration-220 group-hover:bg-[var(--color-navy-20)] group-hover:border-[var(--color-navy)]">
        {destaque ? <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        : <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>}
      </div>
      <div className="font-primary text-base font-bold text-[var(--color-navy)] mb-[10px] tracking-[-0.2px]">{titulo}</div>
      <div className="text-[13px] text-[var(--color-gray-600)] leading-[1.6] mb-5">{desc}</div>
      <div className="text-[13px] font-semibold text-[var(--color-navy)] flex items-center gap-[6px] transition-all duration-200 group-hover:gap-[10px]">
        Configurar <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
      </div>
    </div>
  );
}

function FormPadrao({ empresa, setEmpresa, cliente, setCliente, empresaError, setEmpresaError, onConfirm }: any) {
  return (
    <div className="flex flex-col gap-3 sm:gap-[18px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-[14px]">
        <FormGroup label="Nome da empresa" icon="Building2" error={empresaError}>
          <input
            type="text"
            value={empresa}
            onChange={e => { setEmpresa(e.target.value); setEmpresaError(false); }}
            className={`bg-[var(--color-navy-05)] border ${empresaError ? "border-[var(--error-500)]" : "border-[var(--color-navy-20)]"} rounded-[12px] px-4 py-3 text-sm font-secondary text-[var(--color-gray-900)] outline-none transition-all duration-200 focus:border-[var(--color-navy)] focus:shadow-[0_0_0_3px_rgba(23,44,102,0.10)] focus:bg-white placeholder:text-[var(--color-gray-200)]`}
            placeholder="Ex: Banco Itaú, Claro, Magazine Luiza…"
          />
        </FormGroup>
        <FormGroup label="Nome do cliente">
          <input
            type="text"
            value={cliente}
            onChange={e => setCliente(e.target.value)}
            className="bg-[var(--color-navy-05)] border border-[var(--color-navy-20)] rounded-[12px] px-4 py-3 text-sm font-secondary text-[var(--color-gray-900)] outline-none transition-all duration-200 focus:border-[var(--color-navy)] focus:shadow-[0_0_0_3px_rgba(23,44,102,0.10)] focus:bg-white placeholder:text-[var(--color-gray-200)]"
            placeholder="Ex: João Silva, Maria Santos…"
          />
        </FormGroup>
      </div>
      <button className="flex items-center justify-center gap-2 bg-[var(--color-green)] text-[var(--color-navy)] border-none rounded-[14px] px-7 py-[14px] text-[15px] font-bold font-secondary cursor-pointer tracking-[0.2px] mt-1 overflow-hidden transition-all duration-220 hover:-translate-y-[2px] hover:shadow-lg active:translate-y-0" onClick={onConfirm}>
        Iniciar Apresentação <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
      </button>
    </div>
  );
}

function FormPersonalizada({ empresa, setEmpresa, cliente, setCliente, cor, setCor, logo, imagem, empresaError, setEmpresaError, logoError, imagemError, onUpload, onConfirm }: any) {
  return (
    <div className="flex flex-col gap-3 sm:gap-[18px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-[14px]">
        <FormGroup label="Nome da empresa" icon="Building2" error={empresaError}>
          <input
            type="text"
            value={empresa}
            onChange={e => { setEmpresa(e.target.value); setEmpresaError(false); }}
            className={`bg-[var(--color-navy-05)] border ${empresaError ? "border-[var(--error-500)]" : "border-[var(--color-navy-20)]"} rounded-[12px] px-4 py-3 text-sm font-secondary text-[var(--color-gray-900)] outline-none transition-all duration-200 focus:border-[var(--color-navy)] focus:shadow-[0_0_0_3px_rgba(23,44,102,0.10)] focus:bg-white placeholder:text-[var(--color-gray-200)]`}
            placeholder="Ex: Banco Itaú, Claro, Vivo…"
          />
        </FormGroup>
        <FormGroup label="Nome do cliente">
          <input
            type="text"
            value={cliente}
            onChange={e => setCliente(e.target.value)}
            className="bg-[var(--color-navy-05)] border border-[var(--color-navy-20)] rounded-[12px] px-4 py-3 text-sm font-secondary text-[var(--color-gray-900)] outline-none transition-all duration-200 focus:border-[var(--color-navy)] focus:shadow-[0_0_0_3px_rgba(23,44,102,0.10)] focus:bg-white placeholder:text-[var(--color-gray-200)]"
            placeholder="Ex: João Silva, Maria Santos…"
          />
        </FormGroup>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:gap-[14px]">
        <FormGroup label="Cor da marca" icon="Palette">
          <div className="flex items-center gap-[10px] bg-[var(--color-navy-05)] border border-[var(--color-navy-20)] rounded-[12px] px-[14px] py-[10px] h-[46px] relative cursor-pointer hover:border-[var(--color-navy)]" onClick={() => document.getElementById("cor-picker")?.click()}>
            <div className="w-6 h-6 rounded-[7px] border border-black/10 flex-shrink-0" style={{ background: cor }} />
            <input
              type="text"
              value={cor}
              maxLength={7}
              onChange={e => { const v = e.target.value; if (/^#[0-9a-fA-F]{0,6}$/.test(v)) setCor(v); }}
              className="text-[13px] font-secondary text-[var(--color-gray-800)] tracking-[0.8px] font-semibold flex-1 border-none bg-transparent outline-none cursor-text min-w-0 p-0"
              onClick={e => e.stopPropagation()}
            />
            <span className="text-[11px] text-[var(--color-gray-400)] whitespace-nowrap">Alterar</span>
            <input id="cor-picker" type="color" value={cor} onChange={e => setCor(e.target.value)} className="absolute left-0 bottom-[-4px] opacity-0 w-[1px] h-[1px] pointer-events-none" />
          </div>
        </FormGroup>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-[14px]">
        <UploadZone label="Logo da marca" icon="Image" value={logo} error={logoError} onUpload={(f: File) => onUpload("logo", f)} />
        <UploadZone label="Foto do cliente final" icon="UserSquare2" value={imagem} error={imagemError} onUpload={(f: File) => onUpload("imagem", f)} />
      </div>
      <button className="flex items-center justify-center gap-2 bg-[var(--color-green)] text-[var(--color-navy)] border-none rounded-[14px] px-7 py-[14px] text-[15px] font-bold font-secondary cursor-pointer tracking-[0.2px] mt-1 overflow-hidden transition-all duration-220 hover:-translate-y-[2px] hover:shadow-lg active:translate-y-0" onClick={onConfirm}>
        Iniciar Apresentação <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
      </button>
    </div>
  );
}

function FormGroup({ label, icon, error, children }: { label: string; icon?: string; error?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="flex items-center gap-[6px] text-[12px] font-semibold text-[var(--color-gray-600)] tracking-[0.4px] uppercase">
        {label}
      </label>
      {children}
    </div>
  );
}

function UploadZone({ label, icon, value, error, onUpload }: { label: string; icon: string; value: string | null; error?: boolean; onUpload: (file: File) => void }) {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) onUpload(file);
  };

  return (
    <FormGroup label={label}>
      <div
        className={`bg-[var(--color-navy-05)] border-2 border-dashed ${error ? "border-[var(--error-500)] bg-[var(--error-50)]" : "border-[var(--color-gray-200)]"} rounded-[14px] min-h-[106px] flex items-center justify-center cursor-pointer overflow-hidden transition-all duration-200 hover:border-[var(--color-navy)] hover:bg-[var(--color-navy-10)] relative`}
        onClick={() => document.getElementById(`upload-${label}`)?.click()}
        onDragOver={e => { e.preventDefault(); e.currentTarget.classList.add("border-[var(--color-navy)]", "bg-[var(--color-navy-10)]"); }}
        onDragLeave={e => { e.currentTarget.classList.remove("border-[var(--color-navy)]", "bg-[var(--color-navy-10)]"); }}
        onDrop={handleDrop}
      >
        <input type="file" id={`upload-${label}`} accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) onUpload(f); }} />
        {value ? (
          <img src={value} alt="" className="w-full h-full object-contain p-2" />
        ) : (
          <div className="flex flex-col items-center gap-[6px] pointer-events-none text-center font-secondary">
            <div className="w-9 h-9 bg-[var(--color-navy-10)] border border-[var(--color-navy-20)] rounded-[10px] flex items-center justify-center text-base text-[var(--color-navy)] mb-[2px]">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            </div>
            <span className="text-[13px] font-medium text-[var(--color-gray-600)]">Clique ou arraste aqui</span>
            <span className="text-[11px] text-[var(--color-gray-400)] tracking-[0.5px]">PNG · JPG · WEBP</span>
          </div>
        )}
      </div>
    </FormGroup>
  );
}

function LogoAnimation({ data, config, onDone }: { data: TriagemData; config: ServiceConfig; onDone: () => void }) {
  const [showPg, setShowPg] = useState(false);
  const [showCli, setShowCli] = useState(false);
  const [taglineWords, setTaglineWords] = useState<{ word: string; destaque: boolean; revealed: boolean }[]>([]);

  useEffect(() => {
    const t1 = setTimeout(() => setShowPg(true), 250);
    const t2 = setTimeout(() => setShowCli(true), 700);
    const words = config.tagline.palavras.map((p, i) => ({
      word: p,
      destaque: config.tagline.destaques.has(p.toLowerCase()),
      revealed: false,
    }));
    setTaglineWords(words);
    words.forEach((_, i) => {
      setTimeout(() => {
        setTaglineWords(prev => prev.map((w, j) => j === i ? { ...w, revealed: true } : w));
      }, 1600 + i * 350);
    });
    const tEnd = setTimeout(() => onDone(), 6000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(tEnd); };
  }, []);

  return (
    <div className="flex flex-col items-center gap-12">
      <div className="flex items-center gap-6">
        <div className={`transition-all duration-650 ease-[cubic-bezier(0.22,0.68,0,1.1)] ${showPg ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}>
          <img src="/assets/PGMais_Logo_Vertical_Reduzida 23.svg" alt="PG+" className="h-[88px] object-contain" />
        </div>
        <div className={`transition-all duration-650 ease-[cubic-bezier(0.22,0.68,0,1.1)] ${showCli ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}>
          {data.type === "personalizada" && data.logo ? (
            <img src={data.logo} alt={data.nome} className="max-h-[88px] max-w-[200px] object-contain brightness-0 invert" />
          ) : (
            <div className="font-primary text-[40px] font-extrabold text-white text-center leading-[1.2] max-w-[180px] drop-shadow-lg">{data.nome}</div>
          )}
        </div>
      </div>
      <div className="flex flex-wrap justify-center items-baseline gap-[7px] min-h-[52px] text-center">
        {taglineWords.map((w, i) => (
          <span
            key={i}
            className={`text-[28px] font-normal inline-block leading-[1.5] transition-all duration-450 ease-[cubic-bezier(0.22,0.68,0,1.1)] ${w.destaque ? "font-bold text-white" : "text-white/72"} ${w.revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[10px]"}`}
          >
            {w.word}
          </span>
        ))}
      </div>
    </div>
  );
}
