"use client";

import Card from "./Card";
import ServiceItem from "./ServiceItem";
import ServiceAddMenu from "./ServiceAddMenu";
import { SERVICE_ICONS } from "@/lib/constants";

interface InsightsBlockProps {
  hidden?: boolean;
  hiddenServices: Set<string>;
  serviceIds: string[];
  onRemoveBlock: () => void;
  onRemoveService: (id: string) => void;
  onRestoreService: (id: string) => void;
}

export default function InsightsBlock({
  hidden, hiddenServices, serviceIds, onRemoveBlock, onRemoveService, onRestoreService,
}: InsightsBlockProps) {
  return (
    <div id="block-insights" className={`flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-7 px-3 sm:px-[30px] py-3 sm:py-4 ${hidden ? "hidden" : ""}`}>
      <div className="cursor-pointer flex-shrink-0" onClick={onRemoveBlock}>
        <img src="/assets/Insights - Logo.svg" alt="pg+ Insights" className="h-5 sm:h-[35px] object-contain" />
      </div>
      <div className="flex justify-center items-center gap-1 sm:gap-[10px] flex-wrap flex-1">
        {serviceIds.map(sid => (
          <ServiceItem key={sid} id={sid} icon={`/assets/${SERVICE_ICONS[sid]}`} hidden={hiddenServices.has(sid)} onRemove={onRemoveService} iconHeight="h-[50px] sm:h-[70px]" />
        ))}
      </div>
      <ServiceAddMenu blockId="block-insights" serviceIds={serviceIds} hiddenServices={hiddenServices} onRestore={onRestoreService} />
    </div>
  );
}
