import type { CustomizationQuestion } from "@/lib/types";

export const customizationQuestions: CustomizationQuestion[] = [
  {
    id: "preparo",
    question: "Como você prepara seu café?",
    options: [
      { id: "cafeteira", label: "Cafeteira" },
      { id: "v60", label: "V60" },
      { id: "prensa-francesa", label: "Prensa Francesa" },
      { id: "espresso", label: "Espresso" },
      { id: "coado", label: "Coado tradicional" },
      { id: "outro", label: "Outro" },
    ],
  },
  {
    id: "perfil",
    question: "Qual perfil você prefere?",
    options: [
      { id: "doce", label: "Mais doce" },
      { id: "frutado", label: "Frutado" },
      { id: "chocolate-caramelo", label: "Chocolate e caramelo" },
      { id: "equilibrado", label: "Equilibrado" },
      { id: "surpresa", label: "Quero ser surpreendido" },
    ],
  },
  {
    id: "consumo",
    question: "Quanto café você consome?",
    options: [
      { id: "1-pacote", label: "1 pacote" },
      { id: "2-pacotes", label: "2 pacotes" },
      { id: "3-pacotes", label: "3 pacotes" },
    ],
  },
];
