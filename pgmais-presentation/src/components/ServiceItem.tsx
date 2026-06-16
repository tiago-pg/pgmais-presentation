"use client";

interface ServiceItemProps {
  id: string;
  icon: string;
  label?: string;
  hidden?: boolean;
  onRemove?: (id: string) => void;
  className?: string;
  iconHeight?: string;
}

export default function ServiceItem({ id, icon, label, hidden, onRemove, className = "", iconHeight = "h-[50px] sm:h-[70px]" }: ServiceItemProps) {
  if (hidden) return null;

  return (
    <div
      id={id}
      className={`service-item group relative flex flex-col items-center cursor-pointer px-2 sm:px-[15px] py-1 sm:py-[7px] rounded-[12px] sm:rounded-[17px] transition-all duration-150 ${className}`}
      onClick={() => onRemove?.(id)}
    >
      <img src={icon} alt={label || id} className={`${iconHeight} object-contain pointer-events-none transition-opacity duration-180 group-hover:opacity-0`} />
      {label && <span className="text-[10px] sm:text-xs font-semibold text-[var(--color-navy)] mt-0.5 sm:mt-1">{label}</span>}
      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-180 pointer-events-none">
        <svg className="w-5 h-5 sm:w-[34px] sm:h-[34px]" viewBox="0 0 24 24" fill="#e53935">
          <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
        </svg>
        <span className="text-[9px] sm:text-[11px] font-bold tracking-[0.04em] text-[#e53935]">Excluir</span>
      </div>
    </div>
  );
}
