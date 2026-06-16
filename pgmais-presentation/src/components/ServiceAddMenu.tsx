"use client";

import { useMemo } from "react";

interface ServiceAddMenuProps {
  blockId: string;
  serviceIds: string[];
  hiddenServices: Set<string>;
  onRestore: (id: string) => void;
}

export default function ServiceAddMenu({ blockId, serviceIds, hiddenServices, onRestore }: ServiceAddMenuProps) {
  const hasHidden = useMemo(() => serviceIds.some(id => hiddenServices.has(id)), [serviceIds, hiddenServices]);
  const hiddenIds = useMemo(() => serviceIds.filter(id => hiddenServices.has(id)), [serviceIds, hiddenServices]);

  if (!hasHidden) return null;

  return (
    <div className="flex justify-center mt-2">
      <div className="group relative inline-block">
        <svg className="w-6 h-6 sm:w-[42px] sm:h-[42px] text-[var(--color-gray-300)] cursor-pointer group-hover:text-[var(--color-green)] transition-colors" viewBox="0 0 200 200" fill="currentColor">
          <path d="M124.89,90.54c-7.94,0-14.4-6.46-14.4-14.4v-27.49h-19.52v41.89h-41.89v19.52h27.49c7.94,0,14.4,6.46,14.4,14.4v27.49h19.52v-41.89h41.89v-19.52h-27.49Z"/>
          <path d="M100,9.36C50.02,9.36,9.36,50.02,9.36,100s40.66,90.64,90.64,90.64,90.64-40.66,90.64-90.64S149.98,9.36,100,9.36ZM100,200C44.86,200,0,155.14,0,100S44.86,0,100,0s100,44.86,100,100-44.86,100-100,100Z"/>
        </svg>
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 bg-white border border-[var(--color-navy-20)] rounded-[12px] sm:rounded-[16px] shadow-lg p-2 sm:p-[10px] flex-col gap-1 min-w-[60px] sm:min-w-[80px] z-[9999] hidden group-hover:flex hover:flex">
          {hiddenIds.map(id => (
            <div key={id} className="flex items-center justify-center cursor-pointer rounded-[8px] sm:rounded-[12px] p-1 hover:bg-[var(--color-navy-10)]" onClick={() => onRestore(id)}>
              <img src={`/assets/${id.replace("svc-", "").toUpperCase()}.svg`} className="h-10 sm:h-[60px] object-contain pointer-events-none" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
