"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { Logo } from "./logo";

const navItems = [
  { href: "/#inicio", label: "Início" },
  { href: "/#clube", label: "O Clube" },
  { href: "/#como-funciona", label: "Como funciona" },
  { href: "/#planos", label: "Planos" },
  { href: "/#duvidas", label: "Dúvidas" },
];

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || menuOpen
          ? "bg-cream-50/90 shadow-[0_1px_0_0_rgba(67,42,23,0.08)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-content items-center justify-between px-6 py-4 sm:px-8 lg:px-10">
        <Logo tone={scrolled || menuOpen ? "dark" : "light"} />

        <ul
          className={`hidden items-center gap-8 font-sans text-sm tracking-wide md:flex ${
            scrolled ? "text-coffee-800" : "text-cream-50"
          }`}
        >
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="relative py-1 transition-opacity hover:opacity-70 after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/checkout"
          className={`hidden rounded-full px-5 py-2.5 font-sans text-sm font-medium tracking-wide transition-transform duration-300 hover:-translate-y-0.5 md:inline-block ${
            scrolled
              ? "bg-coffee-900 text-cream-50"
              : "bg-cream-50 text-coffee-900"
          }`}
        >
          Assinar agora
        </Link>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          className={`flex h-10 w-10 items-center justify-center rounded-full md:hidden ${
            scrolled || menuOpen ? "text-coffee-900" : "text-cream-50"
          }`}
        >
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 top-0 h-px w-5 bg-current transition-transform duration-300 ${
                menuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[7px] h-px w-5 bg-current transition-opacity duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[14px] h-px w-5 bg-current transition-transform duration-300 ${
                menuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="border-t border-coffee-900/10 bg-cream-50 px-6 pb-8 pt-4 md:hidden"
          >
            <ul className="flex flex-col gap-1 font-sans text-base text-coffee-900">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-lg px-2 py-3 transition-colors hover:bg-coffee-900/5"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/checkout"
              onClick={() => setMenuOpen(false)}
              className="mt-4 block rounded-full bg-coffee-900 px-5 py-3 text-center font-sans text-sm font-medium text-cream-50"
            >
              Assinar agora
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
