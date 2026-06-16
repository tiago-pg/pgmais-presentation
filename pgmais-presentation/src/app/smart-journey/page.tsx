"use client";

import { useState, useEffect } from "react";
import { TriagemData } from "@/lib/types";
import { getTriagemData } from "@/lib/triagem-storage";
import TriagemWizard from "@/components/TriagemWizard";
import ActionButtons from "@/components/ActionButtons";
import Header from "@/components/Header";
import SistemaOrigem from "@/components/SistemaOrigem";
import OneBlock from "@/components/OneBlock";
import PGChannelsBlock from "@/components/PGChannelsBlock";
import PGFilesBlock from "@/components/PGFilesBlock";
import PersonArea from "@/components/PersonArea";
import IAConversacionalBlock from "@/components/IAConversacionalBlock";
import ReceptivoBlock from "@/components/ReceptivoBlock";
import InsightsBlock from "@/components/InsightsBlock";
import Card from "@/components/Card";
import ConnectorLines from "@/components/ConnectorLines";
import { SJC_CONFIG, SJC_BLOCKS, BLOCK_NAMES } from "@/lib/constants";

export default function SmartJourneyPage() {
  const [showTriagem, setShowTriagem] = useState(true);
  const [triagemData, setTriagemData] = useState<TriagemData | null>(null);
  const [hiddenServices, setHiddenServices] = useState<Set<string>>(new Set());
  const [hiddenBlocks, setHiddenBlocks] = useState<Set<string>>(new Set());
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = getTriagemData(SJC_CONFIG.storageKey);
    if (saved) { setTriagemData(saved); setShowTriagem(false); }
    setLoaded(true);
  }, []);

  const toggleService = (id: string) => setHiddenServices(prev => { const n = new Set(prev); if (n.has(id)) n.delete(id); else n.add(id); return n; });
  const removeBlock = (id: string) => { const c = SJC_BLOCKS[id] || []; setHiddenBlocks(p => new Set([...p, id])); setHiddenServices(p => new Set([...p, ...c])); };

  if (!loaded) return null;

  const isHidden = (id: string) => hiddenBlocks.has(id);
  const connections = [
    { from: "connector-so", to: "connector-one" },
    { from: "connector-one", to: "connector-channels" },
    { from: "connector-channels", to: "connector-person" },
    { from: "connector-person", to: "connector-ia" },
    { from: "connector-ia", to: "connector-right" },
  ];

  return (
    <>
      {showTriagem && <TriagemWizard config={SJC_CONFIG} onStart={(d) => { setTriagemData(d); setShowTriagem(false); }} onSkip={() => setShowTriagem(false)} />}
      <div className="bg-[var(--color-navy-05)] min-h-dvh w-full overflow-x-hidden p-1 sm:p-2">
        <div id="page-wrapper" className="w-full bg-white rounded-[28px] border-2 border-[var(--color-navy-20)] p-3 sm:p-7 sm:pt-6 relative flex flex-col overflow-visible">
          <ActionButtons config={SJC_CONFIG} blockServices={SJC_BLOCKS} blockNames={BLOCK_NAMES}
            hiddenBlocks={hiddenBlocks} hiddenServices={hiddenServices} historyLength={hiddenServices.size}
            onUndo={() => { setHiddenServices(new Set()); setHiddenBlocks(new Set()); }}
            onReset={() => { setHiddenServices(new Set()); setHiddenBlocks(new Set()); }}
            onRestoreBlock={(id, svcs) => { setHiddenBlocks(p => { const n = new Set(p); n.delete(id); return n; }); setHiddenServices(p => { const n = new Set(p); svcs.forEach(s => n.delete(s)); return n; }); }}
            currentSlug="smart-journey"
          />
          <Header title="Smart Journey" strong="Collection" />
          <div className="flex-1 flex flex-col min-h-0 relative" id="connector-container-sjc">
            <div className="main-layout-row-parent service-layout-row flex flex-col xl:flex-row flex-wrap gap-3 items-stretch flex-1 min-h-0">
              <div id="connector-so" className="flex-shrink-0"><SistemaOrigem triagemData={triagemData} /></div>
              <div id="connector-one" className="service-flex-block" style={{ display: isHidden("block-one") ? "none" : undefined }}>
                <OneBlock onRemove={() => removeBlock("block-one")} />
              </div>
              <div id="connector-channels" className="service-flex-block flex flex-col sm:flex-row lg:flex-col gap-3 min-w-0" style={{ display: isHidden("block-channels") && isHidden("block-files") ? "none" : undefined }}>
                <PGChannelsBlock hidden={isHidden("block-channels")} hiddenServices={hiddenServices} serviceIds={SJC_BLOCKS["block-channels"]} onRemoveBlock={() => removeBlock("block-channels")} onRemoveService={toggleService} onRestoreService={toggleService} showCarta showAds />
                <PGFilesBlock hidden={isHidden("block-files")} hiddenServices={hiddenServices} serviceIds={SJC_BLOCKS["block-files"]} onRemoveBlock={() => removeBlock("block-files")} onRemoveService={toggleService} onRestoreService={toggleService} />
              </div>
              <div id="connector-person" className="service-flex-block" style={{ display: isHidden("block-one") && isHidden("block-channels") && isHidden("block-files") ? "none" : undefined }}>
                <PersonArea triagemData={triagemData} />
              </div>
              <div id="connector-ia" className="service-flex-block" style={{ display: isHidden("block-ia") ? "none" : undefined }}>
                <IAConversacionalBlock hidden={isHidden("block-ia")} hiddenServices={hiddenServices} serviceIds={SJC_BLOCKS["block-ia"]} onRemoveBlock={() => removeBlock("block-ia")} onRemoveService={toggleService} onRestoreService={toggleService} />
              </div>
              <div id="connector-right" className="service-flex-block min-w-0 max-w-full lg:max-w-[298px] flex flex-col gap-3" style={{ display: isHidden("block-receptivo") && isHidden("block-portal-auto") ? "none" : undefined }}>
                <ReceptivoBlock hidden={isHidden("block-receptivo")} hiddenServices={hiddenServices} serviceIds={SJC_BLOCKS["block-receptivo"]} onRemoveBlock={() => removeBlock("block-receptivo")} onRemoveService={toggleService} onRestoreService={toggleService} />
                <Card variant="white" hidden={isHidden("block-portal-auto")} className="flex items-center justify-center flex-1 min-h-[70px] sm:min-h-[91px]">
                  <div className="text-center cursor-pointer" onClick={() => removeBlock("block-portal-auto")}>
                    <span className="font-primary text-sm sm:text-lg font-bold text-[var(--color-navy)]">Portal de Autonegociação</span>
                    <img src="/assets/+PORTAL.svg" alt="+Portal" className="w-auto h-[50px] sm:h-[70px] object-contain mx-auto mt-1 sm:mt-[6px]" />
                  </div>
                </Card>
              </div>
            </div>
            <ConnectorLines connections={connections} containerId="connector-container-sjc" />
          </div>
          <div className="mt-2 sm:mt-[10px] flex-shrink-0 bg-white rounded-[26px] border-2 border-[var(--color-navy-20)]">
            <InsightsBlock hidden={isHidden("block-insights")} hiddenServices={hiddenServices} serviceIds={SJC_BLOCKS["block-insights"]} onRemoveBlock={() => removeBlock("block-insights")} onRemoveService={toggleService} onRestoreService={toggleService} />
          </div>
        </div>
      </div>
    </>
  );
}
