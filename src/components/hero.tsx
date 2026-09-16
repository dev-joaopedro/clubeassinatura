"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import heroPhoto from "../../public/photos/marins-reserva-caramelo.png";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const backgroundY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ["0%", "0%"] : ["0%", "18%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="inicio"
      ref={ref}
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-marine-950"
    >
      <motion.div style={{ y: backgroundY }} className="absolute inset-0">
        <Image
          src={heroPhoto}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(12,41,68,0.35), transparent 55%), linear-gradient(180deg, rgba(8,24,38,0.55) 0%, rgba(8,24,38,0.7) 55%, rgba(8,24,38,0.94) 100%)",
          }}
        />
        <div className="absolute inset-0 opacity-[0.06] [background-image:repeating-radial-gradient(circle_at_center,#fff_0,transparent_1px)] [background-size:4px_4px]" />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-marine-950 via-marine-950/40 to-transparent" />

      <motion.div
        style={{ opacity: contentOpacity }}
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto w-full max-w-content px-6 pb-24 pt-40 sm:px-8 sm:pb-28 lg:px-10"
      >
        <motion.p
          variants={item}
          className="font-sans text-xs uppercase tracking-[0.4em] text-gold-400"
        >
          Marins Cafés
        </motion.p>

        <motion.h1
          variants={item}
          className="mt-5 max-w-2xl font-serif text-4xl leading-[1.08] text-cream-50 sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Seu café especial,
          <br />
          todos os meses.
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 max-w-md font-sans text-base leading-relaxed text-cream-100/80 sm:text-lg"
        >
          Receba cafés selecionados pela Marins Cafés todos os meses e
          descubra novos sabores, aromas e origens sem sair de casa.
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="#clube"
            className="rounded-full bg-cream-50 px-7 py-3.5 font-sans text-sm font-medium tracking-wide text-marine-900 transition-transform duration-300 hover:-translate-y-0.5"
          >
            Conheça o clube
          </Link>
          <Link
            href="#planos"
            className="rounded-full border border-cream-50/30 px-7 py-3.5 font-sans text-sm font-medium tracking-wide text-cream-50 transition-colors duration-300 hover:bg-cream-50/10"
          >
            Ver planos
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        variants={item}
        initial="hidden"
        animate="show"
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-cream-50/60 sm:flex"
        aria-hidden="true"
      >
        <span className="font-sans text-[10px] uppercase tracking-[0.3em]">Role</span>
        <span className="h-10 w-px bg-gradient-to-b from-cream-50/60 to-transparent" />
      </motion.div>
    </section>
  );
}
