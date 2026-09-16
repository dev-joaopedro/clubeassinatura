"use client";

import { useState } from "react";

import { faqItems } from "@/data/faq";

import { Reveal } from "./reveal";

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(faqItems[0]?.id ?? null);

  return (
    <section id="duvidas" className="bg-cream-100 py-24 sm:py-32">
      <div className="mx-auto max-w-content px-6 sm:px-8 lg:px-10">
        <Reveal>
          <p className="text-center font-sans text-xs uppercase tracking-[0.35em] text-coffee-500">
            Dúvidas
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mx-auto mt-4 max-w-xl text-center font-serif text-3xl leading-tight text-coffee-900 sm:text-4xl">
            Perguntas frequentes
          </h2>
        </Reveal>

        <div className="mx-auto mt-14 flex max-w-2xl flex-col divide-y divide-coffee-900/10 border-y border-coffee-900/10">
          {faqItems.map((item, index) => {
            const open = openId === item.id;
            return (
              <Reveal key={item.id} delay={index * 0.06}>
                <div>
                  <button
                    type="button"
                    onClick={() => setOpenId(open ? null : item.id)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="font-serif text-base text-coffee-900 sm:text-lg">
                      {item.question}
                    </span>
                    <span
                      className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-coffee-900/20 font-sans text-sm text-coffee-700 transition-transform duration-300 ${
                        open ? "rotate-45" : ""
                      }`}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </button>
                  <div
                    className={`grid overflow-hidden transition-all duration-300 ease-cinematic ${
                      open ? "grid-rows-[1fr] pb-5 opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <p className="min-h-0 font-sans text-sm leading-relaxed text-coffee-600">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
