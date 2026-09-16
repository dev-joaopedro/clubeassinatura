import type { PaymentMethod } from "@/lib/types";

const methods: { id: PaymentMethod; label: string; description: string }[] = [
  { id: "credit_card", label: "Cartão de crédito", description: "Visa, Mastercard, Elo e outros" },
  { id: "pix", label: "Pix", description: "Aprovação imediata" },
  { id: "other", label: "Outros métodos", description: "Boleto e saldo em conta" },
];

interface PaymentMethodSelectorProps {
  value: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
}

export function PaymentMethodSelector({ value, onChange }: PaymentMethodSelectorProps) {
  return (
    <div className="rounded-2xl border border-marine-900/10 bg-white p-6 sm:p-8">
      <h2 className="font-serif text-xl text-marine-900">Pagamento</h2>
      <p className="mt-1.5 font-sans text-sm text-marine-600">
        Processado com segurança pelo Mercado Pago.
      </p>

      <div role="radiogroup" aria-label="Método de pagamento" className="mt-6 grid gap-3 sm:grid-cols-3">
        {methods.map((method) => {
          const selected = value === method.id;
          return (
            <button
              key={method.id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(method.id)}
              className={`rounded-xl border p-4 text-left transition-colors duration-300 ${
                selected
                  ? "border-marine-900 bg-marine-900/[0.03]"
                  : "border-marine-900/12 hover:border-marine-900/30"
              }`}
            >
              <span
                className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                  selected ? "border-marine-900" : "border-marine-900/30"
                }`}
                aria-hidden="true"
              >
                {selected && <span className="h-2 w-2 rounded-full bg-marine-900" />}
              </span>
              <p className="mt-3 font-sans text-sm font-medium text-marine-900">{method.label}</p>
              <p className="mt-0.5 font-sans text-xs text-marine-500">{method.description}</p>
            </button>
          );
        })}
      </div>

      <p className="mt-5 font-sans text-xs leading-relaxed text-marine-500">
        Esta é uma demonstração — nenhum dado de cartão é coletado ou processado
        nesta etapa.
      </p>
    </div>
  );
}
