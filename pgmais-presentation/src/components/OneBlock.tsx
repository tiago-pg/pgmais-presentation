"use client";

import Card from "./Card";
import { ONE_ITEMS } from "@/lib/constants";

interface OneBlockProps {
  hidden?: boolean;
  onRemove: () => void;
  compact?: boolean;
}

export default function OneBlock({ hidden, onRemove, compact }: OneBlockProps) {
  return (
    <Card variant="gradient" hidden={hidden} className={`flex flex-col text-center ${compact ? "flex-1 min-w-[160px] max-w-[280px]" : "flex-1 min-w-[180px] max-w-[290px]"}`}>
      <div className="mb-1 sm:mb-[7px] mt-2 sm:mt-[14px] cursor-pointer" onClick={onRemove}>
        <img src="/assets/O.N.E - Logo.svg" alt="O.N.E." className="max-w-[10rem] sm:max-w-[13rem] max-h-[70px] sm:max-h-[94px] object-contain mx-auto" />
      </div>
      <div className="text-xs sm:text-[17px] text-white text-center leading-[1.4] font-bold mb-3 sm:mb-[22px]">
        Gestor de Estratégia de Cobrança
      </div>
      <div className="flex flex-col gap-2 sm:gap-[14px] flex-1 justify-center">
        {ONE_ITEMS.map(item => (
          <div key={item} className="flex flex-col items-center gap-[0.2rem] sm:gap-[0.35rem] text-sm sm:text-[17px] text-white/93">
            <img src="/icones/+.svg" className="w-5 h-5 sm:w-[1.75rem] sm:h-[1.75rem] object-contain" alt="+" />
            {item}
          </div>
        ))}
      </div>
    </Card>
  );
}
