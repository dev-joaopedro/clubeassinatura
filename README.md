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
- **sharp** — otimização de imagem em produção para `next/image` (recomendado pelo próprio Next.js)

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

public/
  brand/logo-mark.png       # logo oficial recortada (marca "marins" + ponto dourado, sem tagline)
  brand/logo.png             # logo oficial completa (com "Cafés especiais"), arquivo de referência
  photos/                    # fotografia real de campanha/produto (ver seção Marca abaixo)

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

- `marine-*` (azul-marinho, 400→950), `cream-*` (creme/off-white),
  `gold-*` (dourado de destaque)
- `font-serif` → Fraunces, `font-sans` → Inter
- `ease-cinematic` → `cubic-bezier(0.16, 1, 0.3, 1)`, usado nas
  transições principais

## Marca (logo, favicon e fotografia real)

A paleta `marine-*`/`gold-*` foi extraída por amostragem de pixel de
`imagens/logo.png` (fornecido pelo usuário): azul-marinho `#0c2944` e
dourado `#d2a739`. Os tokens no Tailwind chamavam-se `coffee-*`
(marrom) antes disso — foram renomeados para `marine-*` em todo o
projeto para refletir a cor real da marca.

Assets aplicados:

- **Logo** ([src/components/logo.tsx](./src/components/logo.tsx)) —
  usa `public/brand/logo-mark.png` (2000×570px, transparente, fornecido
  em alta resolução pelo usuário — só a marca "marins" + ponto, sem a
  tagline "Cafés especiais", para não ficar ilegível em tamanhos
  pequenos de navbar). `tone="dark"` mostra as cores reais (fundos
  claros: navbar rolada, footer, checkout/sucesso). `tone="light"`
  aplica um filtro `brightness-0 invert` (silhueta branca, prática
  padrão de "logo reversa" para fundo escuro) — usado só na navbar
  transparente sobre o hero, onde a versão colorida não teria contraste
  suficiente contra o fundo agora também azul-marinho.
  `public/brand/logo-full.png` (2000×800px, com a tagline) também está
  disponível para uma eventual seção/placement maior, mas ainda não é
  usado em nenhum componente.
- **Favicon** — `src/app/icon.png` (512×512px; convenção do App Router
  do Next.js, gera as tags automaticamente, sem `<link>` manual).
- **Fotografia real** — `public/photos/`, extraídas de
  `imagens/Samuel.png`, `imagens/barbara.png` e o `.webp`. Em uso:
  `marins-reserva-caramelo.png` no fundo do hero
  ([src/components/hero.tsx](./src/components/hero.tsx)) e
  `marins-reserva-frutas.png` no painel da seção de benefícios
  ([src/components/benefits-section.tsx](./src/components/benefits-section.tsx)).
  `marins-pacote-mesa.webp` foi copiada para `public/photos/` mas
  ainda não está posicionada em nenhuma seção.
- `src/components/coffee-visual.tsx` aceita uma prop `src` opcional —
  com ela, renderiza a foto real; sem ela, mantém o placeholder em CSS
  (útil para qualquer novo espaço de imagem que ainda não tenha foto).

A pasta `imagens/` na raiz continua com os arquivos originais
(intocados) como arquivo-fonte; o Next.js só serve arquivos estáticos
a partir de `public/`, por isso as cópias foram feitas para lá.

## Pendências / próximos passos

- **Preços e benefícios dos planos** — confirmar valores finais em
  `src/data/plans.ts` (atualmente demonstrativos, conforme o prompt original).
- **Links de rodapé** — redes sociais, política de privacidade e
  termos de uso em `src/components/footer.tsx` ainda apontam para `#`.
- **`marins-pacote-mesa.webp`** — ainda não usada em nenhuma seção (ver acima).
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
