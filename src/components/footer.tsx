import Link from "next/link";

import { Logo } from "./logo";

const columns = [
  {
    title: "Clube",
    links: [
      { href: "#clube", label: "O Clube" },
      { href: "#como-funciona", label: "Como funciona" },
      { href: "#planos", label: "Planos" },
    ],
  },
  {
    title: "Ajuda",
    links: [
      { href: "#duvidas", label: "Dúvidas" },
      { href: "/checkout", label: "Assinar agora" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "#", label: "Política de privacidade" },
      { href: "#", label: "Termos de uso" },
    ],
  },
];

const socials = ["Instagram", "Facebook", "WhatsApp"];

export function Footer() {
  return (
    <footer className="border-t border-coffee-900/10 bg-cream-50">
      <div className="mx-auto max-w-content px-6 py-16 sm:px-8 lg:px-10">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs font-sans text-sm leading-relaxed text-coffee-700">
              Café especial selecionado e entregue todos os meses. Um ritual
              de descoberta, da origem até a sua xícara.
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-coffee-500">
                {column.title}
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-sans text-sm text-coffee-700 transition-colors hover:text-coffee-900"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-coffee-900/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-sans text-xs text-coffee-500">
            © {new Date().getFullYear()} Marins Cafés. Todos os direitos reservados.
          </p>
          <div className="flex gap-5">
            {socials.map((social) => (
              <a
                key={social}
                href="#"
                className="font-sans text-xs uppercase tracking-wide text-coffee-500 transition-colors hover:text-coffee-900"
                aria-label={social}
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
