"use client";

import { useRef, useEffect } from "react";

interface SistemaOrigemProps {
  triagemData: { type: string; nome: string; nomeEmpresa?: string; cor?: string; logo?: string } | null;
}

export default function SistemaOrigem({ triagemData }: SistemaOrigemProps) {
  const logoRef = useRef<HTMLImageElement>(null);
  const soRef = useRef<HTMLDivElement>(null);
  const isPersonalizada = triagemData?.type === "personalizada";
  const bgColor = isPersonalizada ? triagemData.cor : undefined;
  const displayText = isPersonalizada ? "" : (triagemData?.nomeEmpresa || triagemData?.nome || "Sistema Origem");

  useEffect(() => {
    if (isPersonalizada && logoRef.current && soRef.current) {
      const so = soRef.current;
      const W = so.offsetWidth;
      const H = so.offsetHeight;
      const padLateral = 8;
      const padVertical = 16;
      const elW = H - padVertical;
      const elH = W - padLateral * 2;
      const img = logoRef.current;
      img.style.width = elW + "px";
      img.style.height = elH + "px";
      img.style.marginLeft = -(elW / 2) + "px";
      img.style.marginTop = -(elH / 2) + "px";
    }
  }, [isPersonalizada, triagemData?.logo]);

  return (
    <div
      ref={soRef}
      className={`sistema-origem flex-shrink-0 rounded-[22px] font-bold text-base sm:text-lg tracking-[5px] uppercase flex items-center justify-center cursor-default outline-none transition-all duration-200 ${
        isPersonalizada ? "h-auto min-h-[50px] min-w-0 px-4 sm:px-12 py-2 sm:py-0" : "min-w-[40px] sm:min-w-[62px] px-4 sm:px-8 py-2 sm:py-0"
      }`}
      style={{
        backgroundColor: bgColor || "var(--color-navy)",
        color: "#fff",
        writingMode: isPersonalizada ? "horizontal-tb" : "vertical-lr",
        textOrientation: "mixed",
        transform: isPersonalizada ? "none" : "rotate(180deg)",
        whiteSpace: isPersonalizada ? "normal" : "nowrap",
        letterSpacing: isPersonalizada ? "0" : "5px",
      }}
    >
      {isPersonalizada && triagemData?.logo ? (
        <img ref={logoRef} src={triagemData.logo} alt="Logo" className="logo-cliente-so absolute top-1/2 left-1/2 object-contain max-h-[40px] sm:max-h-[60px]" style={{ transform: "rotate(-90deg)" }} />
      ) : (
        <span className="whitespace-nowrap">{displayText}</span>
      )}
    </div>
  );
}
