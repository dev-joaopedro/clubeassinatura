"use client";

import Link from "next/link";

import { useSubscription } from "@/context/subscription-context";

import { Reveal } from "./reveal";

export function CtaSection() {
  const { planId } = useSubscription();

  return (
    <section className="relative overflow-hidden bg-coffee-950 py-24 sm:py-32">
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(circle at 20% 30%, rgba(201,160,102,0.16), transparent 50%), radial-gradient(circle at 85% 60%, rgba(90,58,32,0.4), transparent 55%)",
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-content px-6 text-center sm:px-8 lg:px-10">
        <Reveal>
          <h2 className="mx-auto max-w-2xl font-serif text-3xl leading-tight text-cream-50 sm:text-4xl md:text-5xl">
            Isso não é apenas uma assinatura de café.
            <br />É um ritual mensal de descoberta.
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mx-auto mt-5 max-w-md font-sans text-sm text-cream-100/70 sm:text-base">
            {planId
              ? "Seu plano já está selecionado. Finalize sua assinatura em menos de dois minutos."
              : "Escolha um plano acima e finalize sua assinatura em menos de dois minutos."}
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <Link
            href="/checkout"
            className="mt-10 inline-flex rounded-full bg-cream-50 px-8 py-4 font-sans text-sm font-medium tracking-wide text-coffee-900 transition-transform duration-300 hover:-translate-y-0.5"
          >
            Finalizar assinatura
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
