"use client";

import Card from "./Card";
import ServiceItem from "./ServiceItem";
import ServiceAddMenu from "./ServiceAddMenu";
import { SERVICE_ICONS, SERVICE_LABELS } from "@/lib/constants";

interface AtendimentoBlockProps {
  hidden?: boolean;
  hiddenServices: Set<string>;
  serviceIds: string[];
  onRemoveBlock: () => void;
  onRemoveService: (id: string) => void;
  onRestoreService: (id: string) => void;
  title?: string;
  subtitle?: string;
  compact?: boolean;
  largeIcons?: boolean;
}

export default function AtendimentoBlock({
  hidden, hiddenServices, serviceIds, onRemoveBlock, onRemoveService, onRestoreService,
  title = "ATENDIMENTO", subtitle, compact, largeIcons,
}: AtendimentoBlockProps) {
  return (
    <Card variant="white" hidden={hidden} className={`flex flex-col items-center text-center justify-center ${compact ? "flex-1 max-w-full sm:max-w-[200px]" : "flex-1 max-w-full sm:max-w-[230px]"}`}>
      <div className="font-primary text-sm sm:text-lg font-extrabold text-[var(--color-navy)] tracking-[1px] sm:tracking-[1.5px] uppercase text-center mb-2 sm:mb-3 mt-1 cursor-pointer" onClick={onRemoveBlock}>
        {title}<span className="text-xs opacity-50 ml-1">✕</span>
      </div>
      {subtitle && <p className="text-[var(--color-gray-400)] mb-2 text-xs sm:text-sm">{subtitle}</p>}
      <div className="flex flex-row sm:flex-col gap-2 sm:gap-[6px] items-center flex-1 justify-center w-full flex-wrap sm:flex-nowrap">
        {serviceIds.map(sid => (
          <div key={sid} className="flex flex-col items-center gap-1 sm:gap-[6px] w-auto sm:w-full">
            <ServiceItem
              id={sid} icon={`/assets/${SERVICE_ICONS[sid]}`} label={SERVICE_LABELS[sid]}
              hidden={hiddenServices.has(sid)} onRemove={onRemoveService} className="w-full"
              iconHeight={largeIcons ? "h-[60px] sm:h-[88px]" : sid === "svc-consultor" ? "h-[44px] sm:h-[64px]" : "h-[44px] sm:h-[60px]"}
            />
          </div>
        ))}
      </div>
      <ServiceAddMenu blockId="block-atendimento" serviceIds={serviceIds} hiddenServices={hiddenServices} onRestore={onRestoreService} />
    </Card>
  );
}
