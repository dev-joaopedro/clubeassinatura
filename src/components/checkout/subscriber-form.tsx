import type { InputHTMLAttributes } from "react";

import type { Subscriber } from "@/lib/types";

const states = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS",
  "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC",
  "SP", "SE", "TO",
];

interface SubscriberFormProps {
  value: Subscriber;
  onChange: (next: Subscriber) => void;
}

function Field({
  label,
  id,
  className = "",
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string; id: string; className?: string }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block font-sans text-xs font-medium text-coffee-600">
        {label}
      </label>
      <input
        id={id}
        name={id}
        className="mt-1.5 w-full rounded-lg border border-coffee-900/15 bg-cream-50 px-3.5 py-2.5 font-sans text-sm text-coffee-900 outline-none transition-colors focus:border-coffee-900/40"
        {...props}
      />
    </div>
  );
}

export function SubscriberForm({ value, onChange }: SubscriberFormProps) {
  function update<K extends keyof Subscriber>(key: K, fieldValue: Subscriber[K]) {
    onChange({ ...value, [key]: fieldValue });
  }

  return (
    <div className="rounded-2xl border border-coffee-900/10 bg-white p-6 sm:p-8">
      <h2 className="font-serif text-xl text-coffee-900">Dados do assinante</h2>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field
          label="Nome completo"
          id="name"
          autoComplete="name"
          required
          value={value.name}
          onChange={(e) => update("name", e.target.value)}
          className="sm:col-span-2"
        />
        <Field
          label="E-mail"
          id="email"
          type="email"
          autoComplete="email"
          required
          value={value.email}
          onChange={(e) => update("email", e.target.value)}
        />
        <Field
          label="Telefone"
          id="phone"
          type="tel"
          autoComplete="tel"
          required
          value={value.phone}
          onChange={(e) => update("phone", e.target.value)}
        />
        <Field
          label="CPF"
          id="cpf"
          inputMode="numeric"
          required
          value={value.cpf}
          onChange={(e) => update("cpf", e.target.value)}
        />
        <Field
          label="CEP"
          id="zipCode"
          inputMode="numeric"
          autoComplete="postal-code"
          required
          value={value.zipCode}
          onChange={(e) => update("zipCode", e.target.value)}
        />
        <Field
          label="Endereço"
          id="address"
          autoComplete="address-line1"
          required
          value={value.address}
          onChange={(e) => update("address", e.target.value)}
          className="sm:col-span-2"
        />
        <Field
          label="Número"
          id="number"
          required
          value={value.number}
          onChange={(e) => update("number", e.target.value)}
        />
        <Field
          label="Complemento"
          id="complement"
          value={value.complement ?? ""}
          onChange={(e) => update("complement", e.target.value)}
        />
        <Field
          label="Cidade"
          id="city"
          autoComplete="address-level2"
          required
          value={value.city}
          onChange={(e) => update("city", e.target.value)}
        />
        <div>
          <label htmlFor="state" className="block font-sans text-xs font-medium text-coffee-600">
            Estado
          </label>
          <select
            id="state"
            name="state"
            required
            value={value.state}
            onChange={(e) => update("state", e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-coffee-900/15 bg-cream-50 px-3.5 py-2.5 font-sans text-sm text-coffee-900 outline-none transition-colors focus:border-coffee-900/40"
          >
            <option value="" disabled>
              Selecione
            </option>
            {states.map((uf) => (
              <option key={uf} value={uf}>
                {uf}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
