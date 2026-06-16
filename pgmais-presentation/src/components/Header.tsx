"use client";

interface HeaderProps {
  title: string;
  strong: string;
}

export default function Header({ title, strong }: HeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center mb-3 sm:mb-5 pr-0 sm:pr-[330px] gap-2 sm:gap-0">
      <h1 className="font-primary text-xl sm:text-2xl md:text-3xl lg:text-[36px] font-light italic text-[var(--color-navy)] whitespace-nowrap text-center sm:text-left">
        {title} <strong className="font-bold not-italic">{strong}</strong>
      </h1>
      <div className="hidden sm:block flex-1 max-w-[200px] lg:max-w-[350px] h-[2px] mx-3 lg:mx-6" style={{
        background: "linear-gradient(to right, var(--color-navy-20) 60%, transparent)"
      }} />
      <img src="/assets/PGMais - Logo.png" alt="PGMais" className="h-6 sm:h-8 lg:h-[42px] object-contain flex-shrink-0" />
    </div>
  );
}
