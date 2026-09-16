# PROMPT --- Site de Clube de Assinatura \| Marins Cafés

## Objetivo

Quero que você transforme o projeto atual em um **site premium, moderno
e cinematográfico para o Clube de Assinatura da Marins Cafés**.

O objetivo desta primeira etapa é **criar toda a experiência visual e
funcional da demonstração**, sem implementar o pagamento real ainda.

O Mercado Pago será utilizado futuramente como gateway de pagamento,
portanto a aplicação deve ser estruturada de forma que a integração
possa ser adicionada depois sem precisar refazer a interface.

> **IMPORTANTE:** antes de alterar qualquer coisa, leia e entenda a
> estrutura atual do projeto, componentes existentes, rotas, estilos,
> dependências e arquivos de configuração. Preserve o que já funciona e
> faça as alterações de maneira consistente com a arquitetura existente.

------------------------------------------------------------------------

# 1. Direção visual

A identidade deve transmitir:

-   café especial;
-   qualidade e sofisticação;
-   experiência artesanal;
-   aconchego;
-   exclusividade;
-   clube/assinatura;
-   produto premium;
-   conexão com a origem do café.

Quero uma estética **clean, elegante, sofisticada e cinematográfica**,
sem parecer um template genérico de e-commerce.

A referência visual deve combinar:

-   fotografia de café especial;
-   tons terrosos;
-   marrom café;
-   creme/off-white;
-   bege;
-   pequenos detalhes dourados ou naturais;
-   bastante espaço negativo;
-   tipografia elegante;
-   microinterações sutis;
-   animações suaves;
-   sensação de marca premium.

Evite excesso de elementos, gradientes exagerados, sombras pesadas,
cards genéricos e animações que deixem o site parecendo artificial.

------------------------------------------------------------------------

# 2. Regra principal das animações

Use animações com intenção.

A experiência deve parecer uma página cinematográfica, mas **não pode
prejudicar usabilidade, performance ou leitura**.

### Regras:

-   Nenhuma animação deve ultrapassar aproximadamente 0.6s quando não
    houver motivo claro.
-   Elementos podem entrar em sequência com pequenos delays,
    aproximadamente 0.2s entre eles.
-   Use `transform` e `opacity` sempre que possível.
-   Evite animações pesadas que causem layout shift.
-   Respeite `prefers-reduced-motion`.
-   No mobile, reduza a quantidade e intensidade das animações.
-   Não use dezenas de animações simultâneas.
-   O usuário deve conseguir entender a página mesmo que as animações
    não sejam executadas.

------------------------------------------------------------------------

# 3. Base técnica e animações

Primeiro identifique a stack existente.

Se o projeto já utiliza Next.js/React/Tailwind ou outra estrutura, **não
troque a stack sem necessidade**.

Caso já existam bibliotecas de animação, reutilize-as.

Para animações de entrada e scroll, pode utilizar:

-   Lenis para smooth scroll, caso seja compatível com o projeto;
-   GSAP para animações cinematográficas;
-   ScrollTrigger para animações controladas pelo scroll;
-   Framer Motion/Motion caso já esteja presente ou seja mais adequado à
    arquitetura.

### Regra importante

**Não misture várias soluções de scroll sem necessidade.**

Não crie conflitos entre:

-   Lenis;
-   ScrollTrigger;
-   listeners de scroll;
-   observers;
-   animações CSS.

Se usar Lenis, centralize o controle do smooth scroll.

Se usar GSAP + ScrollTrigger, configure corretamente o refresh e o
contexto dos componentes.

No mobile, teste especialmente:

-   abertura da página;
-   scroll;
-   navegação;
-   menus;
-   seções com imagens;
-   seleção de plano;
-   checkout demonstrativo.

------------------------------------------------------------------------

# 4. Hero cinematográfico

Crie um hero extremamente forte para apresentar o clube.

Estrutura sugerida:

### Pequeno texto superior

`MARINS CAFÉS`

### Título principal

Algo na linha de:

**Seu café especial, todos os meses.**

ou

**Uma experiência de café que chega até você.**

O título deve ter grande presença visual.

### Subtexto

Explique de forma curta:

> Receba cafés selecionados pela Marins Cafés todos os meses e descubra
> novos sabores, aromas e origens sem sair de casa.

### CTA principal

`Conheça o clube`

### CTA secundário

`Ver planos`

### Visual

Utilize uma imagem/vídeo de café como elemento principal do hero.

Se o projeto não possuir imagens adequadas, prepare a estrutura para
receber posteriormente um vídeo/imagem real.

O hero pode ter:

-   vídeo em loop no background;
-   overlay discreto;
-   texto grande;
-   pequena indicação de scroll;
-   movimento sutil de câmera/parallax.

O vídeo deve ser silencioso e em loop.

Não deixe o vídeo comprometer a leitura do texto.

------------------------------------------------------------------------

# 5. Seção de proposta do clube

Depois do hero, explique rapidamente por que assinar.

Título sugerido:

**Mais do que café. Um ritual todos os meses.**

Apresente 3 ou 4 benefícios:

### Café selecionado

Cafés escolhidos pela equipe da Marins Cafés.

### Descobertas

Novos sabores, perfis e origens para experimentar.

### Comodidade

Seu café chega até você todos os meses.

### Exclusividade

Condições e experiências especiais para assinantes.

Use cards ou blocos visuais minimalistas.

Os elementos devem aparecer de maneira progressiva durante o scroll.

------------------------------------------------------------------------

# 6. Seção "Como funciona"

Criar uma seção visual explicando o funcionamento em 3 passos:

### 01 --- Escolha seu plano

Escolha a assinatura que combina com o seu consumo.

### 02 --- Receba seus cafés

A Marins Cafés seleciona e prepara seu pedido.

### 03 --- Aproveite uma nova experiência

Receba em casa e descubra novos cafés todos os meses.

Use uma linha visual ou composição que conecte os três passos.

------------------------------------------------------------------------

# 7. Planos de assinatura

Essa é uma das partes mais importantes da página.

Crie uma seção:

## Escolha sua experiência

Apresente planos de assinatura.

Exemplo demonstrativo:

### Plano Essencial

-   1 café por mês
-   Seleção da Marins Cafés
-   Entrega mensal
-   Perfil de sabor personalizado

Preço demonstrativo: **R\$ 49,90/mês**

### Plano Experiência

-   2 cafés por mês
-   Cafés especiais selecionados
-   Entrega mensal
-   Acesso a lançamentos
-   Conteúdo exclusivo

Preço demonstrativo: **R\$ 89,90/mês**

### Plano Barista

-   3 cafés por mês
-   Seleção premium
-   Cafés de diferentes origens
-   Experiências exclusivas
-   Benefícios especiais

Preço demonstrativo: **R\$ 129,90/mês**

> Os valores acima são apenas para demonstração. Estruture os dados de
> maneira fácil de alterar posteriormente.

Um plano pode receber uma etiqueta:

`MAIS ESCOLHIDO`

Não transforme isso em um layout visualmente pesado.

### Interação

Ao clicar em um plano:

-   destacar o plano escolhido;
-   atualizar o CTA;
-   mostrar claramente o valor;
-   permitir continuar para o checkout demonstrativo.

------------------------------------------------------------------------

# 8. Personalização da assinatura

Depois dos planos, criar uma etapa de personalização.

Exemplo:

## Conte para nós como você gosta do seu café

Perguntas demonstrativas:

### Como você prepara seu café?

-   Cafeteira
-   V60
-   Prensa Francesa
-   Espresso
-   Coado tradicional
-   Outro

### Qual perfil você prefere?

-   Mais doce
-   Frutado
-   Chocolate e caramelo
-   Equilibrado
-   Quero ser surpreendido

### Quanto café você consome?

-   1 pacote
-   2 pacotes
-   3 pacotes

A experiência deve parecer uma configuração de assinatura, e não um
formulário burocrático.

------------------------------------------------------------------------

# 9. Checkout demonstrativo

Criar uma rota/página de checkout, mas **SEM integração real com Mercado
Pago nesta etapa**.

A finalidade é apresentar a experiência completa.

Exemplo de fluxo:

`/assinar`

ou

`/checkout`

### Tela

Título:

**Finalize sua assinatura**

Mostrar:

-   plano selecionado;
-   quantidade;
-   frequência;
-   preferências;
-   preço;
-   frete, se aplicável;
-   total mensal;
-   resumo do pedido.

Depois:

### Dados do assinante

-   Nome
-   E-mail
-   Telefone
-   CPF
-   CEP
-   Endereço
-   Número
-   Complemento
-   Cidade
-   Estado

### Pagamento

Criar visualmente uma área preparada para:

**Mercado Pago**

Mostrar métodos de pagamento de forma visual, porém sem processar
nenhuma transação real.

Exemplo:

-   Cartão de crédito
-   Pix
-   Outros métodos

O botão pode ser:

`Continuar para pagamento`

Ao clicar, nesta versão demonstrativa, pode:

-   mostrar um estado de processamento;
-   simular uma confirmação;
-   redirecionar para uma página de sucesso.

**Não coletar nem armazenar dados reais de cartão.**

Não criar integração falsa com API do Mercado Pago.

Não colocar tokens, access tokens, public keys ou credenciais no código.

------------------------------------------------------------------------

# 10. Arquitetura preparada para Mercado Pago

Mesmo sem implementar o Mercado Pago agora, deixe a arquitetura
preparada.

Crie uma camada/serviço abstrato para pagamento, por exemplo:

``` ts
interface PaymentProvider {
  createPayment(data: PaymentData): Promise<PaymentResult>
}
```

ou uma estrutura equivalente adequada ao projeto atual.

A interface visual não deve depender diretamente da implementação do
Mercado Pago.

No futuro deverá ser possível substituir:

``` text
Pagamento demonstrativo
        ↓
MercadoPagoPaymentProvider
        ↓
API Mercado Pago
```

sem precisar reconstruir o checkout.

Por enquanto:

``` text
Checkout
   ↓
MockPaymentProvider
   ↓
Pagamento demonstrativo
   ↓
Sucesso
```

------------------------------------------------------------------------

# 11. Página de sucesso

Criar uma página de confirmação elegante.

Exemplo:

**Seu clube começa agora. ☕**

Texto:

> Sua assinatura foi registrada com sucesso.

Mostrar:

-   plano;
-   frequência;
-   próximo envio;
-   endereço resumido;
-   número do pedido demonstrativo.

CTA:

`Voltar para o clube`

ou

`Conhecer mais cafés`

------------------------------------------------------------------------

# 12. Navbar

Criar uma navbar sofisticada e minimalista.

Itens:

-   Início
-   O Clube
-   Como funciona
-   Planos
-   Dúvidas

CTA:

`Assinar agora`

No desktop:

-   navbar transparente sobre o hero;
-   ao fazer scroll, pode assumir fundo sólido/translúcido;
-   transição suave.

No mobile:

-   menu hambúrguer;
-   abertura elegante;
-   navegação simples;
-   botão de assinatura destacado.

------------------------------------------------------------------------

# 13. Rodapé

Criar footer com:

-   logo Marins Cafés;
-   breve descrição;
-   links;
-   redes sociais;
-   contato;
-   política de privacidade;
-   termos de uso.

Visual minimalista.

------------------------------------------------------------------------

# 14. Identidade da marca

O site deve parecer uma evolução visual da Marins Cafés.

Não invente uma identidade completamente desconectada da marca.

Se já existirem:

-   logo;
-   fontes;
-   cores;
-   imagens;
-   componentes;
-   elementos de branding;

no projeto atual, analise-os e aproveite o que fizer sentido.

Caso a logo atual esteja muito simples para a experiência, crie uma
apresentação mais refinada dela através de:

-   espaçamento;
-   tamanho;
-   contraste;
-   posicionamento;
-   animação extremamente sutil.

**Não distorça a logo.**

------------------------------------------------------------------------

# 15. Fotografia e elementos visuais

A fotografia é fundamental.

Priorize imagens que transmitam:

-   grãos de café;
-   café sendo preparado;
-   xícara;
-   moagem;
-   extração;
-   fazenda/origem;
-   embalagem;
-   mãos preparando café;
-   detalhes do produto.

A composição deve parecer uma campanha de marca premium.

Evite banco de imagens com aparência artificial.

Quando não houver imagem disponível no projeto, deixe componentes
preparados para receber imagens reais.

------------------------------------------------------------------------

# 16. Microinterações

Adicionar microinterações refinadas:

-   hover dos botões;
-   hover dos cards;
-   seleção dos planos;
-   mudança de estado dos inputs;
-   scroll indicator;
-   transições entre páginas;
-   pequenas animações de imagens.

Tudo deve ser discreto.

Não transformar a página em uma demonstração de efeitos.

------------------------------------------------------------------------

# 17. Responsividade

O site precisa ser pensado primeiro como experiência e depois adaptado
para telas menores.

Testar obrigatoriamente:

-   desktop grande;
-   notebook;
-   tablet;
-   celular.

No mobile:

-   não utilizar textos gigantes que quebrem o layout;
-   não permitir overflow horizontal;
-   não cortar conteúdo importante;
-   reduzir parallax e efeitos pesados;
-   manter CTAs acessíveis;
-   manter os planos fáceis de comparar;
-   garantir que o checkout seja confortável de preencher.

------------------------------------------------------------------------

# 18. Performance

Prioridade alta para performance.

Use:

-   imagens otimizadas;
-   lazy loading quando apropriado;
-   vídeos leves;
-   `poster` para vídeos;
-   animações com GPU quando fizer sentido;
-   evitar JavaScript desnecessário;
-   evitar listeners de scroll excessivos.

Não sacrifique performance por efeitos visuais.

------------------------------------------------------------------------

# 19. SEO e estrutura

Criar uma estrutura adequada para SEO.

Definir:

-   title;
-   description;
-   Open Graph;
-   headings semânticos;
-   alt text das imagens;
-   URLs amigáveis.

Sugestão de title:

**Clube Marins Cafés \| Café especial todos os meses**

Sugestão de description:

**Descubra o Clube Marins Cafés e receba cafés especiais selecionados
todos os meses na sua casa.**

------------------------------------------------------------------------

# 20. Acessibilidade

Garantir:

-   contraste adequado;
-   navegação por teclado;
-   labels nos inputs;
-   foco visível;
-   botões reais;
-   `aria-label` quando necessário;
-   textos alternativos;
-   suporte a `prefers-reduced-motion`.

------------------------------------------------------------------------

# 21. Regra contra animações quebradas no mobile

Depois de implementar as animações, faça uma revisão específica no
mobile.

Verifique:

-   GSAP/ScrollTrigger;
-   Lenis;
-   observers;
-   transformações;
-   alturas calculadas;
-   elementos fixos;
-   vídeos;
-   overflow.

Se uma animação estiver causando problemas no mobile:

**corrija a animação sem mudar o visual do desktop.**

Não simplesmente remova uma seção ou altere o layout inteiro para
esconder o problema.

------------------------------------------------------------------------

# 22. Fluxo completo da demonstração

A experiência deve funcionar assim:

``` text
HOME
  ↓
Hero
  ↓
Benefícios
  ↓
Como funciona
  ↓
Planos
  ↓
Personalização
  ↓
CTA
  ↓
Checkout
  ↓
Dados do assinante
  ↓
Resumo
  ↓
Pagamento demonstrativo
  ↓
Processamento simulado
  ↓
Sucesso
```

O usuário deve conseguir completar esse fluxo sem backend de pagamento
real.

------------------------------------------------------------------------

# 23. Dados de demonstração

Centralize os dados dos planos em um único local.

Exemplo:

``` ts
const plans = [
  {
    id: "essencial",
    name: "Essencial",
    price: 49.9,
    frequency: "monthly",
    coffees: 1,
    features: [...]
  },
  ...
]
```

Isso facilitará a alteração posterior dos preços e benefícios.

Também centralize:

-   benefícios;
-   perguntas de personalização;
-   opções;
-   informações de checkout.

------------------------------------------------------------------------

# 24. Não faça

Não:

-   implementar Mercado Pago real agora;
-   pedir ou armazenar dados reais de cartão;
-   criar credenciais fictícias de produção;
-   instalar dezenas de bibliotecas desnecessárias;
-   trocar a stack sem necessidade;
-   destruir componentes existentes que possam ser reutilizados;
-   criar uma landing page genérica;
-   exagerar nas animações;
-   usar animações longas apenas para "ficar bonito";
-   criar efeitos que prejudiquem o mobile;
-   adicionar elementos apenas para preencher espaço.

------------------------------------------------------------------------

# 25. Processo de implementação

Antes de codificar:

1.  Leia a estrutura do projeto.
2.  Identifique a stack.
3.  Identifique as rotas existentes.
4.  Identifique os componentes reutilizáveis.
5.  Identifique o sistema de estilos.
6.  Identifique as imagens/assets disponíveis.
7.  Identifique se já existe sistema de animação.
8.  Planeje a estrutura das novas páginas.
9.  Só então comece a implementação.

Durante a implementação:

-   reutilize componentes;
-   mantenha código organizado;
-   crie componentes pequenos quando houver reutilização real;
-   mantenha tipos consistentes;
-   evite duplicação;
-   mantenha a experiência visual consistente.

------------------------------------------------------------------------

# 26. Revisão obrigatória após implementação

Quando terminar, não considere o trabalho concluído imediatamente.

Faça uma revisão completa:

### Visual

-   O site parece premium?
-   A identidade visual está coerente?
-   O café é o protagonista?
-   Existe excesso de elementos?
-   Os espaços estão bem distribuídos?

### UX

-   O usuário entende o clube rapidamente?
-   Os planos estão claros?
-   O CTA está claro?
-   O checkout é fácil?
-   O fluxo de assinatura funciona?

### Responsividade

-   Desktop
-   Tablet
-   Mobile

### Código

-   Erros de TypeScript?
-   Erros de console?
-   Links quebrados?
-   Imports desnecessários?
-   Componentes duplicados?
-   Problemas de hidratação?
-   Problemas com animações?

### Performance

-   Imagens otimizadas?
-   Animações excessivas?
-   Scroll fluido?
-   Vídeo pesado?
-   Layout shift?

Corrija os problemas encontrados antes de finalizar.

------------------------------------------------------------------------

# 27. Princípio geral de design

A página deve passar a sensação:

> **"Isso não é apenas uma assinatura de café. É um ritual mensal de
> descoberta."**

O resultado final deve parecer uma **experiência de marca premium**, não
apenas uma página com cards de preços.

A prioridade é:

1.  Marca
2.  Produto
3.  Experiência
4.  Clareza
5.  Conversão
6.  Performance

Sempre preserve o equilíbrio entre estética e usabilidade.

------------------------------------------------------------------------

# 28. Entrega esperada

Ao finalizar:

-   implemente a experiência completa;
-   deixe o checkout demonstrativo funcionando;
-   deixe o fluxo de seleção de plano funcionando;
-   deixe a personalização funcionando;
-   simule o pagamento;
-   crie a página de sucesso;
-   mantenha o código preparado para futura integração com Mercado Pago;
-   teste desktop e mobile;
-   corrija erros encontrados.

No final, me informe de forma objetiva:

1.  O que foi criado.
2.  Quais rotas foram adicionadas.
3.  Como funciona o fluxo demonstrativo.
4.  Onde está a camada preparada para Mercado Pago.
5.  Quais arquivos/componentes principais foram criados ou alterados.
6.  Se existe algum ponto que depende de imagens, textos, preços ou
    informações reais da Marins Cafés.

**Não pare apenas para descrever o que deveria ser feito. Implemente a
experiência no projeto.**
