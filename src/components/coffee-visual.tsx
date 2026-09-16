interface CoffeeVisualProps {
  className?: string;
  variant?: "hero" | "panel" | "card";
  label?: string;
}

/**
 * Placeholder visual em CSS para os espaços reservados a fotografia
 * real (grãos, extração, xícara, origem). Substituir por
 * `next/image` assim que houver imagens/vídeo da Marins Cafés —
 * a marcação e o aspect-ratio já estão prontos para receber mídia real.
 */
export function CoffeeVisual({ className = "", variant = "panel", label }: CoffeeVisualProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-coffee-800 via-coffee-700 to-coffee-900 ${className}`}
      role="img"
      aria-label={label ?? "Fotografia de café especial Marins Cafés"}
    >
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(circle at 25% 20%, rgba(201,160,102,0.35), transparent 45%), radial-gradient(circle at 80% 75%, rgba(0,0,0,0.35), transparent 55%)",
        }}
      />
      <div className="absolute inset-0 mix-blend-overlay opacity-30 [background-image:repeating-radial-gradient(circle_at_center,#000_0,transparent_1px)] [background-size:3px_3px]" />
      {variant === "hero" && (
        <svg
          className="absolute -bottom-10 -right-10 h-64 w-64 text-gold-400/20"
          viewBox="0 0 200 200"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="1" />
        </svg>
      )}
      <div className="absolute inset-0 flex items-end justify-start p-6">
        <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-cream-100/40">
          Marins Cafés
        </span>
      </div>
    </div>
  );
}
