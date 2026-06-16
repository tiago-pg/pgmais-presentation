"use client";

interface PersonAreaProps {
  triagemData: { type: string; nomeCliente?: string; imagem?: string } | null;
  showBadge?: boolean;
  badgeText?: string;
  badgeSub?: string;
}

export default function PersonArea({ triagemData, showBadge = false, badgeText, badgeSub }: PersonAreaProps) {
  const imgSrc = triagemData?.type === "personalizada" && triagemData.imagem ? triagemData.imagem : "/assets/Imagem da pessoa.png";

  return (
    <div className="person-area relative flex-1 overflow-hidden rounded-[26px] min-w-[120px] sm:min-w-[180px] max-w-full sm:max-w-[500px]" style={{ flex: "1 1 180px" }}>
      <img src={imgSrc} alt="" className="block h-full w-auto max-w-none flex-shrink-0 mx-auto" style={{ objectFit: "cover" }} />
      {showBadge && (
        <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3 bg-white rounded-[14px] px-2 sm:px-3 py-1.5 sm:py-[10px] flex flex-col items-center gap-1 sm:gap-[3px] shadow-lg pointer-events-none">
          <span className="font-primary text-sm sm:text-xl font-extrabold text-[var(--color-navy)] tracking-[1px] sm:tracking-[1.4px] uppercase text-center">
            {badgeText || "INTERAÇÃO CLIENTE"}
          </span>
          <span className="text-xs sm:text-base font-normal text-[var(--color-gray-600)] text-center">
            {badgeSub || "Texto ou voz"}
          </span>
        </div>
      )}
    </div>
  );
}
