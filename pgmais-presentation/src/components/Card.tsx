"use client";

import { ReactNode } from "react";

interface CardProps {
  variant?: "white" | "gradient";
  className?: string;
  children: ReactNode;
  id?: string;
  hidden?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export default function Card({ variant = "white", className = "", children, id, hidden, onClick, style }: CardProps) {
  const base = "rounded-[26px] p-3 sm:p-[18px] relative transition-all duration-300";
  const variants = {
    white: "bg-white border-2 border-[var(--color-navy-20)] text-center",
    gradient: "bg-gradient-card text-white",
  };

  return (
    <div id={id} className={`${base} ${variants[variant]} ${hidden ? "hidden" : ""} ${className}`} onClick={onClick} style={style}>
      {children}
    </div>
  );
}
