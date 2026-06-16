"use client";

import Link from "next/link";

const services = [
  { slug: "smart-journey", title: "Smart Journey", strong: "Collection", desc: "Ecossistema completo de relacionamento digital para cobrança." },
  { slug: "gestao-acordo", title: "Gestão de", strong: "Acordo", desc: "Gestão inteligente e personalizada de acordos com o cliente final." },
  { slug: "gestao-fatura", title: "Gestão de", strong: "Fatura", desc: "Controle completo do ciclo de vida da fatura do cliente." },
  { slug: "jornada-cobranca", title: "Jornada de", strong: "Cobrança", desc: "Fluxo integrado e automatizado de toda a jornada de cobrança." },
];

export default function MenuPage() {
  return (
    <div className="menu-body relative flex items-center justify-center min-h-dvh w-full overflow-x-hidden p-4 sm:p-8" style={{ background: "var(--color-gray-light)" }}>
      <div className="absolute w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] rounded-full pointer-events-none opacity-18 blur-[60px] sm:blur-[90px] animate-[t-orb-drift_12s_ease-in-out_infinite]" style={{ background: "var(--color-navy)", top: "-150px", right: "-80px" }} />
      <div className="absolute w-[250px] sm:w-[450px] h-[250px] sm:h-[450px] rounded-full pointer-events-none opacity-18 blur-[60px] sm:blur-[90px] animate-[t-orb-drift_15s_ease-in-out_infinite_reverse]" style={{ background: "var(--color-navy)", bottom: "-100px", left: "-60px" }} />
      <div className="absolute w-[180px] sm:w-[280px] h-[180px] sm:h-[280px] rounded-full pointer-events-none opacity-18 blur-[60px] sm:blur-[90px] animate-[t-orb-drift_10s_ease-in-out_infinite]" style={{ background: "var(--primary-blue-400)", bottom: "15%", right: "5%", animationDelay: "3s" }} />

      <div className="relative z-10 w-full max-w-[900px] flex flex-col items-center gap-0">
        <div className="flex items-center gap-2 sm:gap-[14px] mb-6 sm:mb-8 flex-wrap justify-center">
          <img src="/assets/PGMais - Logo.png" alt="PGMais" className="h-6 sm:h-8 object-contain" />
          <div className="w-[1px] h-4 sm:h-5 bg-[var(--color-navy-20)]" />
          <span className="text-[10px] sm:text-[11px] font-semibold tracking-[1px] sm:tracking-[1.2px] uppercase text-[var(--color-gray-400)]">Commercial Presentation Tool</span>
        </div>

        <h1 className="font-primary text-2xl sm:text-[38px] font-light text-[var(--color-gray-900)] leading-[1.15] tracking-[-0.5px] mb-2 text-center">
          Selecione o <strong className="font-extrabold text-[var(--color-navy)]">serviço</strong>
        </h1>
        <p className="text-xs sm:text-sm text-[var(--color-gray-400)] mb-6 sm:mb-10 text-center leading-[1.6]">Escolha qual apresentação preparar para o cliente</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full">
          {services.map(s => (
            <Link key={s.slug} href={s.slug} className="relative bg-white border-2 border-[var(--color-navy-10)] rounded-[24px] overflow-hidden flex flex-col no-underline text-inherit transition-all duration-220 hover:border-[var(--color-navy)] hover:-translate-y-[5px] hover:shadow-lg group">
              <span className="absolute top-2 sm:top-[14px] right-2 sm:right-[14px] bg-[var(--color-green)] text-[var(--color-navy)] text-[8px] sm:text-[9px] font-bold tracking-[1px] sm:tracking-[1.2px] px-2 sm:px-[10px] py-0.5 sm:py-1 rounded-[6px] uppercase z-10">DISPONÍVEL</span>
              <div className="relative overflow-hidden h-[120px] sm:h-[180px] bg-[#f5f6fa] rounded-[10px_10px_0_0]">
                <iframe src={s.slug} className="absolute top-0 left-1/2 -ml-[640px] w-[1280px] h-[720px] border-none pointer-events-none origin-top-center scale-[0.22] sm:scale-[0.32]" scrolling="no" tabIndex={-1} title={s.title} />
              </div>
              <div className="px-4 sm:px-[22px] py-3 sm:py-[18px] pb-4 sm:pb-5 flex flex-col gap-1 sm:gap-2 flex-1">
                <h3 className="font-primary text-sm sm:text-[17px] font-light text-[var(--color-gray-900)] tracking-[-0.2px]">{s.title} <strong className="font-extrabold text-[var(--color-navy)]">{s.strong}</strong></h3>
                <p className="text-xs sm:text-[13px] text-[var(--color-gray-600)] leading-[1.5] sm:leading-[1.55] flex-1">{s.desc}</p>
                <div className="text-xs sm:text-[13px] font-semibold text-[var(--color-navy)] flex items-center gap-[6px] mt-1 transition-all duration-200 group-hover:gap-[10px]">
                  Iniciar <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
