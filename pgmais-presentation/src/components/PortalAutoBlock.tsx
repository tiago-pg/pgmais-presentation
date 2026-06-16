"use client";

import Card from "./Card";
import PhoneMockup from "./PhoneMockup";

interface PortalAutoBlockProps {
  hidden?: boolean;
  onRemove: () => void;
  triagemData: any;
}

export default function PortalAutoBlock({ hidden, onRemove, triagemData }: PortalAutoBlockProps) {
  return (
    <Card variant="white" hidden={hidden} className="flex flex-col px-3 sm:px-[14px] pb-3 pt-[14px] items-center flex-1 min-w-[250px] max-w-full sm:min-w-[450px]">
      <div className="mb-[10px] relative inline-block cursor-pointer" onClick={onRemove}>
        <span className="font-primary text-xs sm:text-[13px] font-bold text-[var(--color-navy)] text-center block leading-[1.3]">
          Portal de Autonegociação<span className="text-xs opacity-50 ml-1">✕</span>
        </span>
      </div>
      <div className="flex-1 flex items-stretch w-full">
        <PhoneMockup triagemData={triagemData} />
      </div>
    </Card>
  );
}
