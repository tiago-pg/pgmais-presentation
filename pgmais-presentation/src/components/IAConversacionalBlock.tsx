"use client";

import Card from "./Card";
import ServiceItem from "./ServiceItem";
import ServiceAddMenu from "./ServiceAddMenu";
import { SERVICE_ICONS } from "@/lib/constants";

interface IAConversacionalBlockProps {
  hidden?: boolean;
  hiddenServices: Set<string>;
  serviceIds: string[];
  onRemoveBlock: () => void;
  onRemoveService: (id: string) => void;
  onRestoreService: (id: string) => void;
}

export default function IAConversacionalBlock({
  hidden, hiddenServices, serviceIds, onRemoveBlock, onRemoveService, onRestoreService,
}: IAConversacionalBlockProps) {
  return (
    <Card variant="gradient" hidden={hidden} className="flex flex-col flex-1 min-w-[160px] max-w-full sm:max-w-[298px]">
      <div className="mb-2 sm:mb-[17px] flex justify-center">
        <div className="font-primary text-sm sm:text-lg font-bold text-white text-center leading-[1.5] cursor-pointer" onClick={onRemoveBlock}>
          Inteligência Artificial<br />Conversacional
        </div>
      </div>
      <div className="flex flex-row sm:flex-col gap-2 sm:gap-[7px] items-center flex-1 justify-center flex-wrap sm:flex-nowrap">
        {serviceIds.map(sid => (
          <ServiceItem key={sid} id={sid} icon={`/assets/${SERVICE_ICONS[sid]}`} hidden={hiddenServices.has(sid)} onRemove={onRemoveService} className="hover:bg-white" iconHeight="h-[50px] sm:h-[70px]" />
        ))}
      </div>
      <ServiceAddMenu blockId="block-ia" serviceIds={serviceIds} hiddenServices={hiddenServices} onRestore={onRestoreService} />
    </Card>
  );
}
