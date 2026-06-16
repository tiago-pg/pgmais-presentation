"use client";

import Card from "./Card";
import ServiceItem from "./ServiceItem";
import ServiceAddMenu from "./ServiceAddMenu";
import { SERVICE_ICONS, SERVICE_LABELS } from "@/lib/constants";

interface PGFilesBlockProps {
  hidden?: boolean;
  hiddenServices: Set<string>;
  serviceIds: string[];
  onRemoveBlock: () => void;
  onRemoveService: (id: string) => void;
  onRestoreService: (id: string) => void;
  compact?: boolean;
}

export default function PGFilesBlock({
  hidden, hiddenServices, serviceIds, onRemoveBlock, onRemoveService, onRestoreService, compact,
}: PGFilesBlockProps) {
  return (
    <Card variant="white" hidden={hidden} className={`flex flex-col justify-center items-center ${compact ? "flex-1 min-w-[120px] max-w-[180px]" : "flex-1 min-w-[140px] max-w-[300px]"}`}>
      <div className="cursor-pointer" onClick={onRemoveBlock}>
        <img src="/assets/PGFiles - Logo.svg" alt="PGFiles" className="h-6 sm:h-[35px] object-contain mx-auto mb-2 sm:mb-[17px]" />
      </div>
      <div className="flex flex-row flex-wrap justify-center gap-0">
        {serviceIds.map(sid => (
          <ServiceItem key={sid} id={sid} icon={`/assets/${SERVICE_ICONS[sid]}`} label={SERVICE_LABELS[sid]} hidden={hiddenServices.has(sid)} onRemove={onRemoveService} />
        ))}
      </div>
      <ServiceAddMenu blockId="block-files" serviceIds={serviceIds} hiddenServices={hiddenServices} onRestore={onRestoreService} />
    </Card>
  );
}
