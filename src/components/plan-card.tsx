"use client";

import { motion } from "framer-motion";

import { formatCurrency } from "@/lib/format";
import type { Plan } from "@/lib/types";

interface PlanCardProps {
  plan: Plan;
  selected: boolean;
  onSelect: (planId: Plan["id"]) => void;
}

export function PlanCard({ plan, selected, onSelect }: PlanCardProps) {
  return (
    <motion.button
      type="button"
      onClick={() => onSelect(plan.id)}
      whileTap={{ scale: 0.98 }}
      aria-pressed={selected}
      className={`relative flex h-full flex-col rounded-2xl border p-8 text-left transition-colors duration-300 ${
        selected
          ? "border-marine-900 bg-marine-900 text-cream-50 shadow-xl shadow-marine-900/20"
          : "border-marine-900/12 bg-white text-marine-900 hover:border-marine-900/30"
      }`}
    >
      {plan.highlighted && (
        <span
          className={`absolute -top-3 left-8 rounded-full px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.15em] ${
            selected ? "bg-gold-400 text-marine-950" : "bg-gold-500 text-marine-950"
          }`}
        >
          Mais escolhido
        </span>
      )}

      <h3 className="font-serif text-2xl">{plan.name}</h3>
      <p className={`mt-2 font-sans text-sm ${selected ? "text-cream-100/70" : "text-marine-600"}`}>
        {plan.tagline}
      </p>

      <div className="mt-6 flex items-baseline gap-1">
        <span className="font-serif text-3xl">{formatCurrency(plan.price)}</span>
        <span className={`font-sans text-sm ${selected ? "text-cream-100/60" : "text-marine-500"}`}>
          /mês
        </span>
      </div>

      <ul className="mt-8 flex flex-1 flex-col gap-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 font-sans text-sm">
            <svg
              className={`mt-1 h-3.5 w-3.5 flex-shrink-0 ${selected ? "text-gold-400" : "text-gold-500"}`}
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3 8.5L6.2 11.5L13 4.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className={selected ? "text-cream-100/90" : "text-marine-700"}>{feature}</span>
          </li>
        ))}
      </ul>

      <span
        className={`mt-8 inline-flex items-center justify-center rounded-full py-3 text-center font-sans text-sm font-medium tracking-wide transition-colors duration-300 ${
          selected ? "bg-cream-50 text-marine-900" : "bg-marine-900/5 text-marine-900"
        }`}
      >
        {selected ? "Plano selecionado" : "Selecionar plano"}
      </span>
    </motion.button>
  );
}
