import { howItWorksSteps } from "@/data/how-it-works";

import { Reveal } from "./reveal";

export function HowItWorksSection() {
  return (
    <section id="como-funciona" className="bg-coffee-900 py-24 sm:py-32">
      <div className="mx-auto max-w-content px-6 sm:px-8 lg:px-10">
        <Reveal>
          <p className="text-center font-sans text-xs uppercase tracking-[0.35em] text-gold-400">
            Como funciona
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mx-auto mt-4 max-w-2xl text-center font-serif text-3xl leading-tight text-cream-50 sm:text-4xl md:text-5xl">
            Da seleção à sua xícara, em três passos
          </h2>
        </Reveal>

        <div className="relative mt-20 grid gap-12 sm:grid-cols-3 sm:gap-8">
          <div
            className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-cream-50/20 to-transparent sm:block"
            aria-hidden="true"
          />
          {howItWorksSteps.map((step, index) => (
            <Reveal key={step.id} delay={index * 0.15} className="relative text-center sm:text-left">
              <span className="relative z-10 inline-flex h-12 w-12 items-center justify-center rounded-full border border-gold-400/40 bg-coffee-900 font-serif text-lg text-gold-400 sm:h-12 sm:w-12">
                {step.number}
              </span>
              <h3 className="mt-6 font-serif text-xl text-cream-50">{step.title}</h3>
              <p className="mt-3 font-sans text-sm leading-relaxed text-cream-100/70">
                {step.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
