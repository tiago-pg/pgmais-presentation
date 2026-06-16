"use client";

import Card from "./Card";

interface PortalNegociacaoBlockProps {
  hidden?: boolean;
  onRemove: () => void;
  triagemData: any;
}

export default function PortalNegociacaoBlock({ hidden, onRemove, triagemData }: PortalNegociacaoBlockProps) {
  const isPersonalizada = triagemData?.type === "personalizada";
  const cartaBg = isPersonalizada && triagemData?.cor ? triagemData.cor : "var(--color-navy)";

  return (
    <Card variant="white" hidden={hidden} className="flex flex-col px-3 sm:px-[14px] pb-3 pt-[14px] items-stretch flex-1 min-w-[220px] max-w-full sm:min-w-[260px]">
      <div className="mb-[10px] relative inline-block text-center cursor-pointer" onClick={onRemove}>
        <span className="font-primary text-xs sm:text-[13px] font-bold text-[var(--color-navy)]">
          Portal de Negociação<span className="text-xs opacity-50 ml-1">✕</span>
        </span>
      </div>
      <div className="flex-1 flex flex-col sm:flex-row gap-2 sm:gap-[10px] items-stretch min-h-0">
        <div className="flex-1 bg-[var(--color-navy-05)] border border-[var(--color-navy-10)] rounded-[16px] overflow-hidden flex flex-col">
          <div className="px-3 py-2 sm:py-3 flex items-center justify-center min-h-[44px] sm:min-h-[56px] flex-shrink-0 transition-colors duration-300" style={{ background: cartaBg }}>
            {isPersonalizada && triagemData?.logo ? (
              <img src={triagemData.logo} alt="Logo" className="max-h-6 sm:max-h-[32px] max-w-[80px] sm:max-w-[120px] object-contain brightness-0 invert" />
            ) : (
              <span className="font-primary text-sm sm:text-base font-extrabold text-white tracking-[0.8px] sm:tracking-[1.2px] text-center uppercase">
                {triagemData?.nome || "CLIENTE"}
              </span>
            )}
          </div>
          <div className="flex-1 px-3 py-2 sm:py-3 flex flex-col gap-1 sm:gap-[6px]">
            <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.8px] sm:tracking-[1px] uppercase text-[var(--color-gray-400)]">CARTA DE COBRANÇA</span>
            <div className="text-[10px] sm:text-[11px] text-[var(--color-gray-600)] border-b border-[var(--color-navy-05)] pb-1 sm:pb-[5px]">Contrato: 12345-6</div>
            <div className="text-[10px] sm:text-[11px] text-[var(--color-gray-600)] border-b border-[var(--color-navy-05)] pb-1 sm:pb-[5px]">Vencimento: 15/05/2026</div>
            <div className="font-primary text-base sm:text-xl font-extrabold text-[var(--color-navy)] mt-1 sm:mt-[2px]">R$ 1.234,56</div>
            <div className="flex flex-col gap-1 sm:gap-[5px] mt-auto pt-1 sm:pt-2">
              <div className="rounded-[8px] px-2 sm:px-[10px] py-1.5 sm:py-[7px] text-[10px] sm:text-[11px] font-bold text-center text-white transition-colors duration-300" style={{ background: isPersonalizada && triagemData?.cor ? triagemData.cor : "var(--color-navy)" }}>
                Pagar Agora
              </div>
              <div className="rounded-[8px] px-2 sm:px-[10px] py-1.5 sm:py-[7px] text-[10px] sm:text-[11px] font-bold text-center bg-[var(--color-navy-10)] text-[var(--color-navy)]">
                Negociar
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center overflow-hidden rounded-[12px] max-h-[120px] sm:max-h-none">
          <img src="/assets/Mock Smarthphone.png" alt="Phone" className="h-full max-h-[120px] sm:max-h-full w-auto object-contain" />
        </div>
      </div>
    </Card>
  );
}
