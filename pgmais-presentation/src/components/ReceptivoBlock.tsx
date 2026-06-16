"use client";

import Card from "./Card";
import ServiceItem from "./ServiceItem";
import ServiceAddMenu from "./ServiceAddMenu";
import { SERVICE_ICONS, SERVICE_LABELS } from "@/lib/constants";

interface ReceptivoBlockProps {
  hidden?: boolean;
  hiddenServices: Set<string>;
  serviceIds: string[];
  onRemoveBlock: () => void;
  onRemoveService: (id: string) => void;
  onRestoreService: (id: string) => void;
}

export default function ReceptivoBlock({
  hidden, hiddenServices, serviceIds, onRemoveBlock, onRemoveService, onRestoreService,
}: ReceptivoBlockProps) {
  return (
    <Card variant="white" hidden={hidden} className="flex justify-center items-center flex-col flex-1">
      <span className="rc-title block text-sm sm:text-lg font-bold text-[var(--color-navy)] mb-1 sm:mb-[9px] text-center cursor-pointer" onClick={onRemoveBlock}>
        Receptivo Multicanal<span className="text-xs opacity-50 ml-1">✕</span>
      </span>
      <span className="text-xs sm:text-sm text-[var(--color-gray-400)] italic mb-2 sm:mb-[14px] block text-center">Soluções de Atendimento</span>
      <div className="flex gap-2 sm:gap-[10px] justify-center flex-wrap">
        {serviceIds.map(sid => (
          <ServiceItem key={sid} id={sid} icon={`/assets/${SERVICE_ICONS[sid]}`} label={SERVICE_LABELS[sid]} hidden={hiddenServices.has(sid)} onRemove={onRemoveService} iconHeight="h-[50px] sm:h-[70px]" />
        ))}
      </div>
      <ServiceAddMenu blockId="block-receptivo" serviceIds={serviceIds} hiddenServices={hiddenServices} onRestore={onRestoreService} />
    </Card>
  );
}
