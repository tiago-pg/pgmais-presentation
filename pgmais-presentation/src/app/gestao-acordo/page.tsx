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
import PersonArea from "@/components/PersonArea";
import AtendimentoBlock from "@/components/AtendimentoBlock";
import PortalAutoBlock from "@/components/PortalAutoBlock";
import InsightsBlock from "@/components/InsightsBlock";
import { GA_CONFIG, GA_BLOCKS, BLOCK_NAMES, darkenHex } from "@/lib/constants";

export default function GestaoAcordoPage() {
  const [showTriagem, setShowTriagem] = useState(true);
  const [triagemData, setTriagemData] = useState<TriagemData | null>(null);
  const [hiddenServices, setHiddenServices] = useState<Set<string>>(new Set());
  const [hiddenBlocks, setHiddenBlocks] = useState<Set<string>>(new Set());
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = getTriagemData(GA_CONFIG.storageKey);
    if (saved) { setTriagemData(saved); setShowTriagem(false); }
    setLoaded(true);
  }, []);

  const toggleService = (id: string) => setHiddenServices(prev => { const n = new Set(prev); if (n.has(id)) n.delete(id); else n.add(id); return n; });
  const removeBlock = (id: string) => { const c = GA_BLOCKS[id] || []; setHiddenBlocks(p => new Set([...p, id])); setHiddenServices(p => new Set([...p, ...c])); };
  const isHidden = (id: string) => hiddenBlocks.has(id);

  if (!loaded) return null;

  return (
    <>
      {showTriagem && <TriagemWizard config={GA_CONFIG} onStart={(d) => { setTriagemData(d); setShowTriagem(false); if (d.type === "personalizada" && d.cor) document.documentElement.style.setProperty("--phone-icon-color", darkenHex(d.cor, 0.30)); }} onSkip={() => setShowTriagem(false)} />}
      <div className="bg-[var(--color-navy-05)] min-h-dvh w-full overflow-x-hidden p-1 sm:p-2">
        <div id="page-wrapper" className="w-full bg-white rounded-[28px] border-2 border-[var(--color-navy-20)] p-3 sm:p-7 sm:pt-6 relative flex flex-col overflow-hidden">
          <ActionButtons config={GA_CONFIG} blockServices={GA_BLOCKS} blockNames={BLOCK_NAMES}
            hiddenBlocks={hiddenBlocks} hiddenServices={hiddenServices} historyLength={hiddenServices.size}
            onUndo={() => { setHiddenServices(new Set()); setHiddenBlocks(new Set()); }}
            onReset={() => { setHiddenServices(new Set()); setHiddenBlocks(new Set()); }}
            onRestoreBlock={(id, svcs) => { setHiddenBlocks(p => { const n = new Set(p); n.delete(id); return n; }); setHiddenServices(p => { const n = new Set(p); svcs.forEach(s => n.delete(s)); return n; }); }}
            currentSlug="gestao-acordo"
          />
          <Header title="Gestão de" strong="Acordo" />
          <div className="flex-1 flex flex-col min-h-0">
            <div className="main-layout-row-parent service-layout-row flex flex-col xl:flex-row flex-wrap gap-2 sm:gap-3 items-stretch flex-1 min-h-0">
              <SistemaOrigem triagemData={triagemData} />
              <div className="connector-dot flex-shrink-0 min-w-[50px] sm:min-w-[68px] max-w-full sm:max-w-[100px] flex items-center justify-center bg-white border-2 border-[var(--color-navy-20)] rounded-[22px] px-2 sm:px-[6px] py-3 cursor-pointer" style={{ display: isHidden("block-pg-contact") ? "none" : "flex" }} onClick={() => toggleService("block-pg-contact")}>
                <img src="/assets/Pg contact.svg" alt="PG Contact" className="w-[120px] sm:w-[175px] max-h-[40px] sm:max-h-[56px] object-contain -rotate-90" />
              </div>
              <div className="connector-dot service-flex-block"><OneBlock hidden={isHidden("block-one")} onRemove={() => removeBlock("block-one")} /></div>
              <div className="connector-dot service-flex-block"><PGChannelsBlock hidden={isHidden("block-channels")} hiddenServices={hiddenServices} serviceIds={GA_BLOCKS["block-channels"]} onRemoveBlock={() => removeBlock("block-channels")} onRemoveService={toggleService} onRestoreService={toggleService} showCarta={false} showAds={false} /></div>
              <div className="connector-dot service-flex-block"><PersonArea triagemData={triagemData} showBadge badgeText="INTERAÇÃO CLIENTE" badgeSub="Texto ou voz" /></div>
              <div className="connector-dot service-flex-block"><AtendimentoBlock hidden={isHidden("block-atendimento")} hiddenServices={hiddenServices} serviceIds={GA_BLOCKS["block-atendimento"]} onRemoveBlock={() => removeBlock("block-atendimento")} onRemoveService={toggleService} onRestoreService={toggleService} /></div>
              <div className="connector-dot service-flex-block"><PortalAutoBlock hidden={isHidden("block-portal-ga")} onRemove={() => removeBlock("block-portal-ga")} triagemData={triagemData} /></div>
            </div>
          </div>
          <div className="mt-2 sm:mt-[10px] flex-shrink-0 bg-white rounded-[26px] border-2 border-[var(--color-navy-20)]">
            <InsightsBlock hidden={isHidden("block-insights")} hiddenServices={hiddenServices} serviceIds={GA_BLOCKS["block-insights"]} onRemoveBlock={() => removeBlock("block-insights")} onRemoveService={toggleService} onRestoreService={toggleService} />
          </div>
        </div>
      </div>
    </>
  );
}
