"use client";

import { useEffect, useState, useCallback } from "react";
import { ServiceConfig, TriagemData } from "@/lib/types";
import { getGlobalState, subscribeToState } from "@/lib/use-service-state";
import { getTriagemData } from "@/lib/triagem-storage";
import Header from "./Header";
import ActionButtons from "./ActionButtons";
import SistemaOrigem from "./SistemaOrigem";
import TriagemWizard from "./TriagemWizard";
import { SERVICE_ICONS, SERVICE_LABELS, BLOCK_NAMES } from "@/lib/constants";

interface ServicePageProps {
  config: ServiceConfig;
  blockServices: Record<string, string[]>;
  currentSlug: string;
  children: React.ReactNode;
  onTriagemApplied?: (data: TriagemData) => void;
}

export default function ServicePage({ config, blockServices, currentSlug, children, onTriagemApplied }: ServicePageProps) {
  const [loaded, setLoaded] = useState(false);
  const [showTriagem, setShowTriagem] = useState(true);
  const [triagemData, setTriagemData] = useState<TriagemData | null>(null);
  const [hiddenServices, setHiddenServices] = useState<Set<string>>(new Set());
  const [hiddenBlocks, setHiddenBlocks] = useState<Set<string>>(new Set());
  const [historyLength, setHistoryLength] = useState(0);

  useEffect(() => {
    const savedData = getTriagemData(config.storageKey);
    if (savedData) {
      setTriagemData(savedData);
      setShowTriagem(false);
      setLoaded(true);
    } else {
      setLoaded(true);
    }

    const unsub = subscribeToState((state) => {
      setHiddenServices(new Set(state.hiddenServices));
      setHiddenBlocks(new Set(state.hiddenBlocks));
      setHistoryLength(state.history.length);
    });
    return unsub;
  }, [config.storageKey]);

  const handleTriagemStart = useCallback((data: TriagemData) => {
    setTriagemData(data);
    setShowTriagem(false);
    onTriagemApplied?.(data);
  }, [onTriagemApplied]);

  const handleTriagemSkip = useCallback(() => {
    const savedData = getTriagemData(config.storageKey);
    if (savedData) {
      setTriagemData(savedData);
      onTriagemApplied?.(savedData);
    }
    setShowTriagem(false);
  }, [config.storageKey, onTriagemApplied]);

  const handleRemoveService = useCallback((id: string) => {
    const state = getGlobalState();
    if (!state.hiddenServices.has(id)) {
      const hiddenSvc = new Set(state.hiddenServices);
      hiddenSvc.add(id);
      setHiddenServices(hiddenSvc);
    }
  }, []);

  const handleRemoveBlock = useCallback((id: string) => {
    const children = blockServices[id] || [];
    const hiddenSvc = new Set(hiddenServices);
    const hiddenBlk = new Set(hiddenBlocks);
    hiddenBlk.add(id);
    children.forEach(c => hiddenSvc.add(c));
    setHiddenServices(hiddenSvc);
    setHiddenBlocks(hiddenBlk);
  }, [blockServices, hiddenServices, hiddenBlocks]);

  const handleUndo = useCallback(() => {
    // Reset to clean state for simplicity in Next.js version
    setHiddenServices(new Set());
    setHiddenBlocks(new Set());
  }, []);

  const handleReset = useCallback(() => {
    setHiddenServices(new Set());
    setHiddenBlocks(new Set());
  }, []);

  const handleRestoreBlock = useCallback((id: string, services: string[]) => {
    const hiddenSvc = new Set(hiddenServices);
    const hiddenBlk = new Set(hiddenBlocks);
    hiddenBlk.delete(id);
    services.forEach(s => hiddenSvc.delete(s));
    setHiddenServices(hiddenSvc);
    setHiddenBlocks(hiddenBlk);
  }, [hiddenServices, hiddenBlocks]);

  const handleRestoreService = useCallback((id: string) => {
    const hiddenSvc = new Set(hiddenServices);
    hiddenSvc.delete(id);
    setHiddenServices(hiddenSvc);
  }, [hiddenServices]);

  if (!loaded) return null;

  return (
    <>
      {showTriagem && (
        <TriagemWizard config={config} onStart={handleTriagemStart} onSkip={handleTriagemSkip} />
      )}

      <div className="w-full" style={{ background: "var(--color-navy-05)", height: "100vh", width: "100vw", overflow: "hidden", padding: "0.5rem" }}>
        <div id="page-wrapper" className="w-full h-full bg-white rounded-[28px] border-2 border-[var(--color-navy-20)] px-7 py-6 relative flex flex-col overflow-hidden">
          <ActionButtons
            config={config}
            blockServices={blockServices}
            blockNames={BLOCK_NAMES}
            hiddenBlocks={hiddenBlocks}
            hiddenServices={hiddenServices}
            historyLength={historyLength}
            onUndo={handleUndo}
            onReset={handleReset}
            onRestoreBlock={handleRestoreBlock}
            currentSlug={currentSlug}
          />

          <Header title={config.name.replace(/(Collection|Acordo|Fatura|Cobrança)$/, "")} strong={config.name.match(/(Collection|Acordo|Fatura|Cobrança)$/)?.[0] || ""} />

          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex gap-3 items-stretch flex-1 min-h-0">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
