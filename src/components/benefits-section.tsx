import reservaFrutas from "../../public/photos/marins-reserva-frutas.png";
import { benefits } from "@/data/benefits";

import { CoffeeVisual } from "./coffee-visual";
import { Reveal } from "./reveal";

export function BenefitsSection() {
  return (
    <section id="clube" className="bg-cream-50 py-24 sm:py-32">
      <div className="mx-auto max-w-content px-6 sm:px-8 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
          <Reveal>
            <CoffeeVisual
              variant="panel"
              className="aspect-[4/5] w-full"
              src={reservaFrutas}
              label="Pacote Reserva da Safra da Marins Cafés, café especial 100% arábica"
            />
          </Reveal>

          <div>
            <Reveal>
              <p className="font-sans text-xs uppercase tracking-[0.35em] text-marine-500">
                Por que assinar
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-4 max-w-lg font-serif text-3xl leading-tight text-marine-900 sm:text-4xl md:text-5xl">
                Mais do que café. Um ritual todos os meses.
              </h2>
            </Reveal>

            <ul className="mt-12 grid gap-8 sm:grid-cols-2">
              {benefits.map((benefit, index) => (
                <Reveal key={benefit.id} as="li" delay={0.15 + index * 0.08}>
                  <span className="font-serif text-2xl text-gold-500">0{index + 1}</span>
                  <h3 className="mt-3 font-serif text-lg text-marine-900">{benefit.title}</h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-marine-700">
                    {benefit.description}
                  </p>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
