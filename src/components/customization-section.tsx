"use client";

import { customizationQuestions } from "@/data/customization-questions";
import { useSubscription } from "@/context/subscription-context";

import { Reveal } from "./reveal";

export function CustomizationSection() {
  const { customization, answerCustomization } = useSubscription();

  return (
    <section id="personalizar" className="bg-cream-50 py-24 sm:py-32">
      <div className="mx-auto max-w-content px-6 sm:px-8 lg:px-10">
        <Reveal>
          <p className="text-center font-sans text-xs uppercase tracking-[0.35em] text-marine-500">
            Personalização
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mx-auto mt-4 max-w-xl text-center font-serif text-3xl leading-tight text-marine-900 sm:text-4xl md:text-5xl">
            Conte para nós como você gosta do seu café
          </h2>
        </Reveal>

        <div className="mx-auto mt-16 flex max-w-2xl flex-col gap-12">
          {customizationQuestions.map((question, index) => (
            <Reveal key={question.id} delay={index * 0.1}>
              <fieldset>
                <legend className="font-serif text-lg text-marine-900">{question.question}</legend>
                <div className="mt-4 flex flex-wrap gap-3">
                  {question.options.map((option) => {
                    const selected = customization[question.id] === option.id;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => answerCustomization(question.id, option.id)}
                        className={`rounded-full border px-5 py-2.5 font-sans text-sm transition-colors duration-300 ${
                          selected
                            ? "border-marine-900 bg-marine-900 text-cream-50"
                            : "border-marine-900/15 bg-white text-marine-700 hover:border-marine-900/40"
                        }`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
