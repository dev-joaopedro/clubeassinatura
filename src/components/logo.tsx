import Link from "next/link";

interface LogoProps {
  tone?: "light" | "dark";
  className?: string;
}

/**
 * Apresentação refinada da marca via tipografia (sem logo-arquivo
 * disponível no projeto ainda). Se um arquivo de logo real for
 * fornecido futuramente, substituir o <span> pelo <Image> mantendo
 * o mesmo espaço/proporção.
 */
export function Logo({ tone = "dark", className = "" }: LogoProps) {
  const color = tone === "light" ? "text-cream-50" : "text-coffee-900";
  return (
    <Link
      href="/"
      className={`group inline-flex flex-col leading-none ${color} ${className}`}
      aria-label="Marins Cafés — página inicial"
    >
      <span className="font-serif text-xl tracking-wide transition-transform duration-300 group-hover:-translate-y-0.5 sm:text-2xl">
        Marins Cafés
      </span>
      <span className="mt-1 font-sans text-[10px] uppercase tracking-[0.35em] opacity-60">
        Clube de Assinatura
      </span>
    </Link>
  );
}
