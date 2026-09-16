"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect } from "react";

import { useSubscription } from "@/context/subscription-context";
import { getPlanById } from "@/data/plans";
import { formatCurrency } from "@/lib/format";

function formatNextShipment(createdAt: string): string {
  const date = new Date(createdAt);
  date.setMonth(date.getMonth() + 1);
  return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
}

export default function SuccessPage() {
  const router = useRouter();
  const { order, subscriber } = useSubscription();
  const plan = getPlanById(order?.planId);

  useEffect(() => {
    if (!order) {
      router.replace("/");
    }
  }, [order, router]);

  if (!order || !plan) {
    return (
      <div className="flex min-h-[60svh] items-center justify-center px-6 pt-32">
        <p className="font-sans text-sm text-coffee-600">Redirecionando...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-coffee-950 px-6 py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-lg rounded-3xl border border-cream-50/10 bg-coffee-900/60 p-8 text-center backdrop-blur sm:p-12"
      >
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold-400/40 text-2xl">
          ☕
        </span>

        <h1 className="mt-6 font-serif text-3xl text-cream-50 sm:text-4xl">
          Seu clube começa agora.
        </h1>
        <p className="mt-3 font-sans text-sm text-cream-100/70">
          Sua assinatura foi registrada com sucesso.
        </p>

        <dl className="mt-10 flex flex-col gap-4 rounded-2xl bg-coffee-950/50 p-6 text-left font-sans text-sm">
          <div className="flex items-center justify-between">
            <dt className="text-cream-100/60">Plano</dt>
            <dd className="text-cream-50">
              {plan.name} · {formatCurrency(plan.price)}/mês
            </dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-cream-100/60">Frequência</dt>
            <dd className="text-cream-50">Mensal</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-cream-100/60">Próximo envio</dt>
            <dd className="text-cream-50">{formatNextShipment(order.createdAt)}</dd>
          </div>
          {subscriber && (
            <div className="flex items-center justify-between gap-4">
              <dt className="text-cream-100/60">Endereço</dt>
              <dd className="text-right text-cream-50">
                {subscriber.address}, {subscriber.number} — {subscriber.city}/{subscriber.state}
              </dd>
            </div>
          )}
          <div className="flex items-center justify-between border-t border-cream-50/10 pt-4">
            <dt className="text-cream-100/60">Pedido</dt>
            <dd className="text-cream-50">{order.orderId}</dd>
          </div>
        </dl>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="rounded-full bg-cream-50 px-6 py-3 font-sans text-sm font-medium text-coffee-900 transition-transform duration-300 hover:-translate-y-0.5"
          >
            Voltar para o clube
          </Link>
          <Link
            href="/#planos"
            className="rounded-full border border-cream-50/25 px-6 py-3 font-sans text-sm font-medium text-cream-50 transition-colors duration-300 hover:bg-cream-50/10"
          >
            Conhecer mais cafés
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
