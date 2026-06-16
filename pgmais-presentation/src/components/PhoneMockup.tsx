"use client";

interface PhoneMockupProps {
  triagemData: { type: string; nome: string; nomeCliente?: string; cor?: string; logo?: string } | null;
}

export default function PhoneMockup({ triagemData }: PhoneMockupProps) {
  const isPersonalizada = triagemData?.type === "personalizada";
  const bgColor = isPersonalizada && triagemData?.cor ? triagemData.cor : "var(--tertiary-blue-900)";
  const clientName = triagemData?.nome || "PGMais";
  const greeting = triagemData?.nomeCliente ? `Olá, ${triagemData.nomeCliente}` : "Olá, Paulo";

  return (
    <div className="flex-1 rounded-[20px] sm:rounded-[28px] p-1.5 sm:p-2 shadow-xl sm:shadow-2xl flex flex-col overflow-hidden max-w-[320px] sm:max-w-none mx-auto sm:mx-0" style={{ background: "var(--gray-900)" }}>
      <div className="flex-1 rounded-[14px] sm:rounded-[20px] flex flex-col overflow-hidden transition-colors duration-300" style={{ background: bgColor }}>
        <div className="px-3 sm:px-4 pt-3 sm:pt-[18px] pb-2 sm:pb-[14px] flex flex-col items-center gap-1 transition-colors duration-300" style={{ background: isPersonalizada ? "rgba(0,0,0,0.15)" : "rgba(0,0,0,0.20)" }}>
          {isPersonalizada && triagemData?.logo ? (
            <img src={triagemData.logo} alt="Logo" className="max-h-7 sm:max-h-[42px] max-w-[120px] sm:max-w-[180px] object-contain brightness-0 invert" />
          ) : (
            <span className="font-primary text-sm sm:text-[22px] font-bold text-white tracking-[-0.3px] text-center">{clientName}</span>
          )}
        </div>
        <div className="px-3 sm:px-[18px] pt-2 sm:pt-4 pb-1 sm:pb-[10px] flex flex-col gap-1 sm:gap-[5px]">
          <div className="font-primary text-sm sm:text-xl font-bold text-white">{greeting}</div>
          <div className="text-[10px] sm:text-[13px] text-white/65 tracking-[0.3px]">CPF XXX.XXX.XXX-XX</div>
          <div className="text-[10px] sm:text-[13px] text-white/85 leading-[1.5] mt-0.5 sm:mt-1">
            Dívida atualizada com desconto
            <span className="text-xs sm:text-[15px] font-extrabold text-white block">R$ XXX,XX</span>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-1 sm:gap-[6px] px-2 sm:px-[14px] pb-2 sm:pb-[14px] overflow-hidden">
          {[
            { icon: "ScanLine", label: "Copiar código de barras" },
            { icon: "QrCode", label: "Pix copie e cole" },
            { icon: "ExternalLink", label: "Portal de negociação" },
            { icon: "MessageCircle", label: "WhatsApp de negociação" },
            { icon: "Phone", label: "Central de atendimento" },
          ].map((action, i) => (
            <div key={i} className="bg-white rounded-[8px] sm:rounded-[12px] flex items-center gap-2 sm:gap-[14px] px-2 sm:px-4 py-1.5 sm:py-[10px] flex-1 min-h-0">
              <svg className="w-4 h-4 sm:w-[30px] sm:h-[30px] flex-shrink-0" style={{ color: isPersonalizada && triagemData?.cor ? "var(--phone-icon-color)" : "var(--tertiary-blue-900)" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {action.icon === "ScanLine" && <><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/></>}
                {action.icon === "QrCode" && <><rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="3" width="8" height="8" rx="1"/><rect x="3" y="13" width="5" height="5" rx="1"/><rect x="16" y="13" width="5" height="5" rx="1"/><path d="M13 16h1"/></>}
                {action.icon === "ExternalLink" && <><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></>}
                {action.icon === "MessageCircle" && <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>}
                {action.icon === "Phone" && <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>}
              </svg>
              <span className="text-[10px] sm:text-base font-semibold flex-1 text-left truncate" style={{ color: isPersonalizada && triagemData?.cor ? "var(--phone-icon-color)" : "var(--tertiary-blue-900)" }}>
                {action.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
