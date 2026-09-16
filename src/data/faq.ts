export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    id: "cancelamento",
    question: "Posso cancelar quando quiser?",
    answer:
      "Sim. A assinatura não tem fidelidade — você pode pausar ou cancelar a qualquer momento pela sua conta.",
  },
  {
    id: "entrega",
    question: "Como funciona a entrega?",
    answer:
      "Seus cafés são selecionados e enviados todos os meses para o endereço cadastrado, com acompanhamento do pedido.",
  },
  {
    id: "personalizacao",
    question: "Posso mudar minhas preferências depois?",
    answer:
      "Sim. Seu perfil de sabor e forma de preparo podem ser atualizados a qualquer momento para refinar as próximas seleções.",
  },
  {
    id: "pagamento",
    question: "Quais formas de pagamento são aceitas?",
    answer:
      "No lançamento, a assinatura será processada via Mercado Pago, com suporte a cartão de crédito, Pix e outros métodos.",
  },
];
