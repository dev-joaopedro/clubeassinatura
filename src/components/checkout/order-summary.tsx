import { customizationQuestions } from "@/data/customization-questions";
import { formatCurrency } from "@/lib/format";
import type { CustomizationAnswers, Plan } from "@/lib/types";

interface OrderSummaryProps {
  plan: Plan;
  customization: CustomizationAnswers;
}

const SHIPPING = 0;

export function OrderSummary({ plan, customization }: OrderSummaryProps) {
  const total = plan.price + SHIPPING;

  return (
    <div className="rounded-2xl border border-marine-900/10 bg-white p-6 sm:p-8">
      <h2 className="font-serif text-xl text-marine-900">Resumo do pedido</h2>

      <div className="mt-6 flex items-start justify-between gap-4 border-b border-marine-900/10 pb-6">
        <div>
          <p className="font-serif text-lg text-marine-900">Plano {plan.name}</p>
          <p className="mt-1 font-sans text-sm text-marine-600">
            {plan.coffees} {plan.coffees > 1 ? "cafés" : "café"} por mês · Frequência mensal
          </p>
        </div>
        <p className="font-sans text-sm font-medium text-marine-900">{formatCurrency(plan.price)}</p>
      </div>

      <dl className="mt-6 flex flex-col gap-3 border-b border-marine-900/10 pb-6 font-sans text-sm">
        <div className="flex items-center justify-between">
          <dt className="text-marine-600">Frete</dt>
          <dd className="text-marine-900">{SHIPPING === 0 ? "Grátis" : formatCurrency(SHIPPING)}</dd>
        </div>
        {customizationQuestions.map((question) => {
          const answerId = customization[question.id];
          const answerLabel = question.options.find((option) => option.id === answerId)?.label;
          return (
            <div key={question.id} className="flex items-center justify-between gap-4">
              <dt className="text-marine-600">{question.question}</dt>
              <dd className="text-right text-marine-900">{answerLabel ?? "Não informado"}</dd>
            </div>
          );
        })}
      </dl>

      <div className="mt-6 flex items-center justify-between">
        <span className="font-sans text-sm font-medium text-marine-900">Total mensal</span>
        <span className="font-serif text-2xl text-marine-900">{formatCurrency(total)}</span>
      </div>
    </div>
  );
}
