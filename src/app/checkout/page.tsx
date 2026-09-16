"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState, type FormEvent } from "react";

import { OrderSummary } from "@/components/checkout/order-summary";
import { PaymentMethodSelector } from "@/components/checkout/payment-method-selector";
import { ProcessingOverlay } from "@/components/checkout/processing-overlay";
import { SubscriberForm } from "@/components/checkout/subscriber-form";
import { useSubscription } from "@/context/subscription-context";
import { getPlanById, plans } from "@/data/plans";
import { paymentProvider } from "@/lib/payment";
import type { Subscriber } from "@/lib/types";

const emptySubscriber: Subscriber = {
  name: "",
  email: "",
  phone: "",
  cpf: "",
  zipCode: "",
  address: "",
  number: "",
  complement: "",
  city: "",
  state: "",
};

export default function CheckoutPage() {
  const router = useRouter();
  const {
    planId,
    selectPlan,
    customization,
    subscriber,
    setSubscriber,
    paymentMethod,
    setPaymentMethod,
    confirmOrder,
  } = useSubscription();

  const [formValue, setFormValue] = useState<Subscriber>(subscriber ?? emptySubscriber);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const plan = getPlanById(planId);

  useEffect(() => {
    if (!planId) {
      const defaultPlan = plans.find((p) => p.highlighted) ?? plans[0];
      selectPlan(defaultPlan.id);
    }
  }, [planId, selectPlan]);

  useEffect(() => {
    if (subscriber) setFormValue(subscriber);
  }, [subscriber]);

  if (!plan) {
    return (
      <div className="flex min-h-[60svh] items-center justify-center px-6 pt-32">
        <p className="font-sans text-sm text-marine-600">Carregando...</p>
      </div>
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsProcessing(true);
    setSubscriber(formValue);

    try {
      const result = await paymentProvider.createPayment({
        plan: plan!,
        subscriber: formValue,
        paymentMethod,
        totalAmount: plan!.price,
      });

      if (!result.success) {
        throw new Error(result.message);
      }

      confirmOrder({
        orderId: result.orderId,
        planId: plan!.id,
        createdAt: new Date().toISOString(),
      });

      router.push("/sucesso");
    } catch {
      setIsProcessing(false);
      setError("Não foi possível concluir a simulação de pagamento. Tente novamente.");
    }
  }

  return (
    <div className="min-h-screen bg-cream-100 pb-24 pt-32 sm:pt-36">
      <div className="mx-auto max-w-content px-6 sm:px-8 lg:px-10">
        <p className="font-sans text-xs uppercase tracking-[0.35em] text-marine-500">
          Clube Marins Cafés
        </p>
        <h1 className="mt-3 font-serif text-3xl text-marine-900 sm:text-4xl">
          Finalize sua assinatura
        </h1>
        <p className="mt-3 max-w-lg font-sans text-sm text-marine-600">
          Revise seu plano, informe seus dados e escolha como prefere pagar.
          Nesta demonstração, nenhum pagamento real é processado.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.85fr]">
          <div className="flex flex-col gap-6 lg:order-1">
            <SubscriberForm value={formValue} onChange={setFormValue} />
            <PaymentMethodSelector value={paymentMethod} onChange={setPaymentMethod} />

            {error && (
              <p role="alert" className="font-sans text-sm text-red-700">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full rounded-full bg-marine-900 px-8 py-4 text-center font-sans text-sm font-medium tracking-wide text-cream-50 transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
            >
              Continuar para pagamento
            </button>
            <Link
              href="/#planos"
              className="text-center font-sans text-xs text-marine-500 underline-offset-4 hover:underline"
            >
              Trocar de plano
            </Link>
          </div>

          <div className="lg:order-2">
            <div className="lg:sticky lg:top-28">
              <OrderSummary plan={plan} customization={customization} />
            </div>
          </div>
        </form>
      </div>

      <AnimatePresence>{isProcessing && <ProcessingOverlay />}</AnimatePresence>
    </div>
  );
}
