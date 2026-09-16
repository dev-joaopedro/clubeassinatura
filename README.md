# Clube Marins Cafés — Assinatura

Site premium e cinematográfico para o Clube de Assinatura da Marins
Cafés. Esta etapa entrega toda a experiência visual e funcional em
modo demonstrativo — seleção de plano, personalização, checkout e
confirmação — **sem integração real de pagamento**. A arquitetura já
está preparada para plugar o Mercado Pago depois.

Requisitos originais do projeto: [PROMPT_CLUBE_ASSINATURA_MARINS_CAFES.md](./PROMPT_CLUBE_ASSINATURA_MARINS_CAFES.md).

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** — design tokens de cor/tipografia em [tailwind.config.ts](./tailwind.config.ts)
- **Framer Motion** — único mecanismo de animação/scroll-reveal do projeto (ver seção Animações)
- Fontes via `next/font/google`: **Fraunces** (serifada, títulos) e **Inter** (corpo)

Não há backend/banco de dados. Todo o estado da "assinatura em
andamento" vive no navegador (`localStorage`), via React Context.

## Como rodar em outra máquina

```bash
git clone <repo>
cd clubeassinatura
npm install
npm run dev       # http://localhost:3000
```

Outros comandos:

```bash
npm run build      # build de produção
npm run start       # roda o build de produção
npm run lint        # ESLint (next/core-web-vitals)
npx tsc --noEmit     # checagem de tipos
```

Requer Node 20+ (usado em desenvolvimento: Node 20.9, npm 10.2).

## Estrutura de pastas

```
src/
  app/
    layout.tsx          # fontes, metadata (SEO/OG), Navbar/Footer, SubscriptionProvider
    page.tsx             # home: compõe todas as seções na ordem do fluxo
    globals.css           # tokens base, prefers-reduced-motion, foco visível
    checkout/page.tsx     # rota /checkout
    sucesso/page.tsx      # rota /sucesso

  components/             # seções da home + navbar/footer/reveal/logo/coffee-visual
    checkout/              # order-summary, subscriber-form, payment-method-selector, processing-overlay

  context/
    subscription-context.tsx  # estado global da assinatura (plano, personalização, dados, pedido)

  data/                    # conteúdo centralizado (edite aqui, não nos componentes)
    plans.ts                 # planos e preços
    benefits.ts               # seção "por que assinar"
    how-it-works.ts            # 3 passos
    customization-questions.ts  # perguntas de personalização
    faq.ts                      # perguntas frequentes

  lib/
    types.ts                # tipos compartilhados (Plan, Subscriber, PaymentMethod, ...)
    format.ts                 # formatCurrency (BRL)
    payment/
      provider.ts              # interface PaymentProvider (contrato)
      mock-provider.ts          # implementação demonstrativa (aprova sempre, latência simulada)
      index.ts                  # ponto único de configuração do gateway ativo
```

## Rotas

| Rota | Descrição |
|---|---|
| `/` | Home: hero, benefícios, como funciona, planos, personalização, dúvidas, CTA |
| `/checkout` | Dados do assinante, resumo do pedido, seleção de pagamento (demonstrativa) |
| `/sucesso` | Confirmação do pedido (plano, próximo envio, endereço, nº do pedido) |

## Fluxo da demonstração

1. Usuário seleciona um plano na home (`PlansSection` → `useSubscription().selectPlan`).
2. Opcionalmente responde à personalização (preparo, perfil, consumo).
3. Vai para `/checkout` (se chegar direto sem plano selecionado, o plano
   marcado como `highlighted` em `data/plans.ts` é usado como padrão).
4. Preenche dados do assinante e escolhe o método de pagamento (visual
   apenas — **nenhum dado de cartão é coletado**).
5. Ao enviar, `paymentProvider.createPayment(...)` é chamado (mock),
   mostra overlay de processamento (~1.8s) e redireciona para `/sucesso`.

Todo o estado (`planId`, `customization`, `subscriber`, `paymentMethod`,
`order`) é persistido em `localStorage` sob a chave
`clube-marins-cafes:subscription`, gerenciado por
[src/context/subscription-context.tsx](./src/context/subscription-context.tsx).

## Editando conteúdo (preços, textos, perguntas)

Tudo fica em `src/data/*.ts` — **não é necessário mexer em componentes**
para ajustar preços, benefícios, perguntas de personalização ou FAQ.
Exemplo (`src/data/plans.ts`):

```ts
export const plans: Plan[] = [
  { id: "essencial", name: "Essencial", price: 49.9, coffees: 1, features: [...] },
  // ...
];
```

## Arquitetura de pagamento (pronta para Mercado Pago)

A UI de checkout depende apenas da interface `PaymentProvider`
([src/lib/payment/provider.ts](./src/lib/payment/provider.ts)):

```ts
interface PaymentProvider {
  createPayment(data: PaymentData): Promise<PaymentResult>;
}
```

Hoje, [src/lib/payment/index.ts](./src/lib/payment/index.ts) exporta
`paymentProvider = new MockPaymentProvider()`. Para integrar o Mercado
Pago no futuro:

1. Criar `src/lib/payment/mercadopago-provider.ts` implementando
   `PaymentProvider` (chamando a API/SDK do Mercado Pago).
2. Trocar a instância exportada em `src/lib/payment/index.ts`.
3. Nenhuma tela de checkout precisa ser alterada.

Credenciais/tokens do Mercado Pago **não devem ser commitados** — usar
variáveis de ambiente (`.env.local`, já ignorado pelo `.gitignore`)
quando essa etapa for implementada.

## Animações e scroll

Único primitivo de entrada por scroll: `src/components/reveal.tsx`
(`Reveal`), baseado em `framer-motion` (`whileInView` + `useReducedMotion`).
Não há Lenis/GSAP/ScrollTrigger no projeto — propositalmente, para
evitar conflitos entre múltiplas soluções de scroll. Se precisar de
animações mais elaboradas no futuro, prefira estender `Reveal`/Framer
Motion em vez de introduzir uma segunda biblioteca de scroll.

`prefers-reduced-motion: reduce` é respeitado tanto em
[globals.css](./src/app/globals.css) (desativa transições/animações
CSS globalmente) quanto no `Reveal` e no `Hero` (via `useReducedMotion`
do Framer Motion).

## Design tokens

Definidos em [tailwind.config.ts](./tailwind.config.ts):

- `coffee-*` (marrom café, 400→950), `cream-*` (creme/off-white),
  `gold-*` (dourado de destaque)
- `font-serif` → Fraunces, `font-sans` → Inter
- `ease-cinematic` → `cubic-bezier(0.16, 1, 0.3, 1)`, usado nas
  transições principais

## Pendências / próximos passos

Itens que dependem de material real da Marins Cafés (hoje usam
placeholders funcionais):

- **Fotografia/vídeo real** — os blocos de imagem usam
  `src/components/coffee-visual.tsx` (gradiente + textura em CSS).
  Substituir por `next/image`/`<video>` real quando houver material.
- **Logo em arquivo** — hoje é uma wordmark tipográfica
  (`src/components/logo.tsx`). Trocar pelo arquivo oficial mantendo
  espaçamento/proporção.
- **Preços e benefícios dos planos** — confirmar valores finais em
  `src/data/plans.ts` (atualmente demonstrativos, conforme o prompt original).
- **Links de rodapé** — redes sociais, política de privacidade e
  termos de uso em `src/components/footer.tsx` ainda apontam para `#`.
- **Integração real do Mercado Pago** — ver seção acima.

## Notas de segurança

- O checkout **não coleta nem armazena dados de cartão** — apenas
  seleção visual do método de pagamento.
- Nenhuma credencial/token de gateway está no código.
- O projeto usa `next@14.2.35` (última patch da série 14, sem breaking
  changes) para corrigir vulnerabilidades conhecidas da versão inicial
  instalada. `npm audit` ainda acusa duas dependências internas de
  build (postcss vendorizado pelo Next, glob usado pelo
  `eslint-config-next`) — são ferramentas de build/lint, não entram no
  bundle enviado ao usuário; só seriam eliminadas com um upgrade maior
  (Next 15/16), fora do escopo desta etapa para não trocar a stack sem
  necessidade.
