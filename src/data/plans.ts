import type { Plan } from "@/lib/types";

/**
 * Valores e benefícios são demonstrativos. Alterar preços e itens
 * aqui é suficiente para atualizar toda a experiência (planos,
 * resumo do checkout e página de sucesso).
 */
export const plans: Plan[] = [
  {
    id: "essencial",
    name: "Essencial",
    tagline: "Para quem está começando a explorar",
    coffees: 1,
    price: 49.9,
    features: [
      "1 café por mês",
      "Seleção da Marins Cafés",
      "Entrega mensal",
      "Perfil de sabor personalizado",
    ],
  },
  {
    id: "experiencia",
    name: "Experiência",
    tagline: "O favorito de quem quer descobrir mais",
    coffees: 2,
    price: 89.9,
    features: [
      "2 cafés por mês",
      "Cafés especiais selecionados",
      "Entrega mensal",
      "Acesso a lançamentos",
      "Conteúdo exclusivo",
    ],
    highlighted: true,
  },
  {
    id: "barista",
    name: "Barista",
    tagline: "Para o ritual mais completo",
    coffees: 3,
    price: 129.9,
    features: [
      "3 cafés por mês",
      "Seleção premium",
      "Cafés de diferentes origens",
      "Experiências exclusivas",
      "Benefícios especiais",
    ],
  },
];

export function getPlanById(id: string | null | undefined): Plan | undefined {
  return plans.find((plan) => plan.id === id);
}
