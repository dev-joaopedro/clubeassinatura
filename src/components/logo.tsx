import Image from "next/image";
import Link from "next/link";

import logo from "../../public/brand/logo-mark.png";

interface LogoProps {
  tone?: "light" | "dark";
  className?: string;
}

/**
 * tone="dark" usa as cores reais do logo (marinho + dourado), para
 * fundos claros. tone="light" aplica uma versão em silhueta branca
 * (prática padrão de identidade visual para logo sobre fundo escuro,
 * como a navbar transparente sobre o hero) — sem esticar nem recortar
 * a marca original.
 */
export function Logo({ tone = "dark", className = "" }: LogoProps) {
  const captionColor = tone === "light" ? "text-cream-50/70" : "text-marine-900/60";

  return (
    <Link
      href="/"
      className={`group inline-flex flex-col leading-none ${className}`}
      aria-label="Marins Cafés — página inicial"
    >
      <Image
        src={logo}
        alt="Marins Cafés"
        priority
        className={`h-8 w-auto transition-transform duration-300 group-hover:-translate-y-0.5 sm:h-9 ${
          tone === "light" ? "brightness-0 invert" : ""
        }`}
      />
      <span className={`mt-1.5 font-sans text-[10px] uppercase tracking-[0.35em] ${captionColor}`}>
        Clube de Assinatura
      </span>
    </Link>
  );
}
