"use client";

import { SERVICES_ALL } from "@/lib/constants";

interface ServiceTabsProps {
  hidden?: boolean;
  hiddenServices: Set<string>;
  onRemoveService: (id: string) => void;
  currentSlug: string;
}

export default function ServiceTabs({ hidden, hiddenServices, onRemoveService, currentSlug }: ServiceTabsProps) {
  const tabs = SERVICES_ALL.filter(s => s.slug !== currentSlug);

  return (
    <div className={`service-tabs-block flex items-center gap-1 sm:gap-[2px] flex-shrink-0 flex-wrap ${hidden ? "hidden" : ""}`}>
      {tabs.map(tab => {
        const id = `svc-tab-${tab.slug.replace("gestao-", "g").replace("jornada-", "j").replace("smart-", "s")}`;
        const isHidden = hiddenServices.has(id);
        return (
          <div key={tab.slug} id={id} className={`cursor-pointer px-1.5 sm:px-2 py-1 rounded-lg transition-opacity ${isHidden ? "opacity-30" : "hover:bg-[var(--color-navy-05)]"}`} onClick={() => !isHidden && onRemoveService(id)}>
            <span className="text-[10px] sm:text-xs font-semibold text-[var(--color-navy)] whitespace-nowrap">{tab.name}</span>
          </div>
        );
      })}
      <div className="w-[2px] h-5 sm:h-8 bg-[var(--color-navy-20)] rounded mx-1 sm:mx-[10px] flex-shrink-0 cursor-pointer hover:bg-[var(--error-500)] hover:opacity-70" />
    </div>
  );
}
