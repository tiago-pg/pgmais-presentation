"use client";

import { useState, useRef, useEffect } from "react";
import { downloadAs } from "@/lib/download";
import { ServiceConfig } from "@/lib/types";

interface ActionButtonsProps {
  config: ServiceConfig;
  blockServices: Record<string, string[]>;
  blockNames: Record<string, string>;
  hiddenBlocks: Set<string>;
  hiddenServices: Set<string>;
  historyLength: number;
  onUndo: () => void;
  onReset: () => void;
  onRestoreBlock: (id: string, services: string[]) => void;
  currentSlug: string;
}

export default function ActionButtons({
  config, blockServices, blockNames, hiddenBlocks, hiddenServices, historyLength,
  onUndo, onReset, onRestoreBlock, currentSlug,
}: ActionButtonsProps) {
  const [servicosOpen, setServicosOpen] = useState(false);
  const [blocosOpen, setBlocosOpen] = useState(false);
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const allBlockIds = Object.keys(blockServices);
  const restorableBlocks = allBlockIds.filter(id => hiddenBlocks.has(id));

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setServicosOpen(false); setBlocosOpen(false); setDownloadOpen(false); setMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const services = [
    { name: "Smart Journey Collection", slug: "smart-journey" },
    { name: "Gestão de Acordo", slug: "gestao-acordo" },
    { name: "Gestão de Fatura", slug: "gestao-fatura" },
    { name: "Jornada de Cobrança", slug: "jornada-cobranca" },
  ].filter(s => s.slug !== currentSlug);

  const btnClass = "bg-transparent border border-[var(--color-navy-20)] rounded-xl px-3 sm:px-[18px] py-2 sm:py-2 text-sm sm:text-lg text-[var(--color-gray-400)] cursor-pointer flex items-center gap-1 sm:gap-[6px] transition-all duration-200 font-secondary whitespace-nowrap hover:bg-[var(--color-navy-05)] hover:text-[var(--primary-blue-500)] hover:border-[var(--primary-blue-500)] disabled:opacity-30 disabled:cursor-not-allowed";

  const ButtonRow = () => (
    <>
      <div className="relative">
        <button className={`${btnClass} ${servicosOpen ? "active" : ""}`} onClick={(e) => { e.stopPropagation(); setServicosOpen(!servicosOpen); }}>
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
          <span className="hidden sm:inline">Solução ▾</span>
          <span className="sm:hidden">S▾</span>
        </button>
        {servicosOpen && dropdownMenu(services.map(s => ({ label: s.name, onClick: () => { window.location.href = `/${s.slug}`; } })))}
      </div>
      <button className={btnClass} onClick={onUndo} disabled={historyLength === 0} title="Desfazer">
        <span className="hidden sm:inline">↩ Desfazer</span>
        <span className="sm:hidden">↩</span>
      </button>
      <button className={btnClass} onClick={onReset} title="Resetar">
        <span className="hidden sm:inline">↺ Resetar</span>
        <span className="sm:hidden">↺</span>
      </button>
      <div className="relative">
        <button className={`${btnClass} ${blocosOpen ? "active" : ""}`} disabled={restorableBlocks.length === 0} onClick={(e) => { e.stopPropagation(); setBlocosOpen(!blocosOpen); }}>
          <span className="hidden sm:inline">＋ Blocos ▾</span>
          <span className="sm:hidden">＋▾</span>
        </button>
        {blocosOpen && dropdownMenu(
          restorableBlocks.length === 0
            ? [{ label: "Nenhum bloco removido", disabled: true }]
            : restorableBlocks.map(id => ({
                label: `${(blockNames[id] || id)}`,
                onClick: () => { onRestoreBlock(id, blockServices[id]); setBlocosOpen(false); },
              }))
        )}
      </div>
      <div className="relative">
        <button className={`${btnClass} ${downloadOpen ? "active" : ""}`} onClick={(e) => { e.stopPropagation(); setDownloadOpen(!downloadOpen); }}>
          <span className="hidden sm:inline">↓ Baixar ▾</span>
          <span className="sm:hidden">↓▾</span>
        </button>
        {downloadOpen && dropdownMenu([
          { label: "📄 PDF", onClick: () => { setDownloadOpen(false); downloadAs("pdf", config); } },
          { label: "🖼 JPG", onClick: () => { setDownloadOpen(false); downloadAs("jpg", config); } },
          { label: "🖼 PNG", onClick: () => { setDownloadOpen(false); downloadAs("png", config); } },
        ])}
      </div>
    </>
  );

  return (
    <div ref={menuRef} id="action-buttons" className="fixed sm:absolute z-50 top-2 sm:top-5 right-2 sm:right-[50px] flex gap-1 sm:gap-2 items-center">
      <div className="hidden sm:flex gap-2 items-center">
        <ButtonRow />
      </div>
      <div className="sm:hidden">
        <button className={btnClass} onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen); }}>
          ☰
        </button>
        {menuOpen && (
          <div className="absolute right-0 top-full mt-1 bg-white border border-[var(--color-navy-20)] rounded-[14px] p-2 min-w-[200px] shadow-lg flex flex-col gap-1 z-[9999]">
            <ButtonRow />
          </div>
        )}
      </div>
    </div>
  );

  function dropdownMenu(items: { label: string; onClick?: () => void; disabled?: boolean }[]) {
    return (
      <div className="absolute top-full left-0 mt-1 bg-white border border-[var(--color-navy-20)] rounded-[14px] p-[6px] min-w-[200px] shadow-lg flex flex-col gap-[3px] z-[9999]">
        {items.map((item, i) => (
          <button
            key={i}
            className={`bg-transparent border-none rounded-[9px] px-4 py-[11px] text-sm sm:text-[17px] text-[var(--gray-700)] cursor-pointer text-left font-secondary hover:bg-[var(--color-navy-05)] hover:text-[var(--color-navy)] w-full whitespace-nowrap ${item.disabled ? "opacity-50 cursor-default" : ""}`}
            onClick={item.onClick}
            disabled={item.disabled}
          >
            {item.label}
          </button>
        ))}
      </div>
    );
  }
}
