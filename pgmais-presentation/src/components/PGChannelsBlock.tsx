"use client";

import Card from "./Card";
import ServiceItem from "./ServiceItem";
import ServiceAddMenu from "./ServiceAddMenu";
import { SERVICE_ICONS, SERVICE_LABELS } from "@/lib/constants";

interface PGChannelsBlockProps {
  hidden?: boolean;
  hiddenServices: Set<string>;
  serviceIds: string[];
  onRemoveBlock: () => void;
  onRemoveService: (id: string) => void;
  onRestoreService: (id: string) => void;
  showCarta?: boolean;
  showAds?: boolean;
}

export default function PGChannelsBlock({
  hidden, hiddenServices, serviceIds, onRemoveBlock, onRemoveService, onRestoreService, showCarta = true, showAds = true,
}: PGChannelsBlockProps) {
  const allServices = showCarta
    ? (showAds ? serviceIds : serviceIds.filter(s => s !== "svc-ads"))
    : serviceIds.filter(s => s !== "svc-carta");

  return (
    <Card variant="white" hidden={hidden} className="flex flex-col justify-center items-center flex-1 min-w-[160px] max-w-full sm:max-w-[450px]">
      <div className="cursor-pointer" onClick={onRemoveBlock}>
        <img src="/assets/PGChannels - Logo.svg" alt="PGChannels" className="h-6 sm:h-[35px] object-contain mx-auto mb-2 sm:mb-[17px]" />
      </div>
      <div className="flex flex-row flex-wrap justify-center gap-0">
        {allServices.map(sid => (
          <ServiceItem
            key={sid} id={sid} icon={`/assets/${SERVICE_ICONS[sid]}`} label={SERVICE_LABELS[sid]}
            hidden={hiddenServices.has(sid)} onRemove={onRemoveService}
          />
        ))}
      </div>
      <ServiceAddMenu blockId="block-channels" serviceIds={allServices} hiddenServices={hiddenServices} onRestore={onRestoreService} />
    </Card>
  );
}
