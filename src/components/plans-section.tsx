"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

import { useSubscription } from "@/context/subscription-context";
import { plans, getPlanById } from "@/data/plans";
import { formatCurrency } from "@/lib/format";

import { PlanCard } from "./plan-card";
import { Reveal } from "./reveal";

export function PlansSection() {
  const { planId, selectPlan } = useSubscription();
  const selectedPlan = getPlanById(planId);

  return (
    <section id="planos" className="bg-cream-100 py-24 sm:py-32">
      <div className="mx-auto max-w-content px-6 sm:px-8 lg:px-10">
        <Reveal>
          <p className="text-center font-sans text-xs uppercase tracking-[0.35em] text-coffee-500">
            Planos de assinatura
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mx-auto mt-4 max-w-xl text-center font-serif text-3xl leading-tight text-coffee-900 sm:text-4xl md:text-5xl">
            Escolha sua experiência
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3 md:gap-6">
          {plans.map((plan, index) => (
            <Reveal key={plan.id} delay={index * 0.12} className="h-full">
              <PlanCard plan={plan} selected={plan.id === planId} onSelect={selectPlan} />
            </Reveal>
          ))}
        </div>

        <p className="mt-6 text-center font-sans text-xs text-coffee-500">
          Valores demonstrativos. Cancele quando quiser.
        </p>

        <AnimatePresence>
          {selectedPlan && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="sticky bottom-4 z-20 mt-12 flex flex-col items-center justify-between gap-4 rounded-2xl border border-coffee-900/10 bg-white/95 p-5 shadow-xl shadow-coffee-900/10 backdrop-blur sm:flex-row sm:gap-6"
            >
              <div className="font-sans text-sm text-coffee-800">
                Plano <strong className="font-semibold">{selectedPlan.name}</strong> selecionado
                {" — "}
                <span className="text-coffee-600">{formatCurrency(selectedPlan.price)}/mês</span>
              </div>
              <Link
                href="#personalizar"
                className="w-full rounded-full bg-coffee-900 px-6 py-3 text-center font-sans text-sm font-medium tracking-wide text-cream-50 transition-transform duration-300 hover:-translate-y-0.5 sm:w-auto"
              >
                Continuar
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
