import Image, { type StaticImageData } from "next/image";

interface CoffeeVisualProps {
  className?: string;
  variant?: "hero" | "panel" | "card";
  label?: string;
  src?: StaticImageData;
}

/**
 * Sem `src`, renderiza um placeholder em CSS para os espaços ainda
 * sem fotografia real. Com `src` (ver public/photos), exibe a foto
 * real da campanha Marins Cafés com o mesmo enquadramento/cantos.
 */
export function CoffeeVisual({ className = "", variant = "panel", label, src }: CoffeeVisualProps) {
  if (src) {
    return (
      <div className={`relative overflow-hidden rounded-[1.5rem] ${className}`}>
        <Image
          src={src}
          alt={label ?? "Fotografia de café especial Marins Cafés"}
          fill
          sizes="(min-width: 1024px) 40vw, 90vw"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-marine-800 via-marine-700 to-marine-900 ${className}`}
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
