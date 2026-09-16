import { MockPaymentProvider } from "./mock-provider";
import type { PaymentProvider } from "./provider";

/**
 * Ponto único de configuração do gateway de pagamento.
 *
 * Hoje: Checkout -> MockPaymentProvider -> pagamento demonstrativo -> sucesso.
 * Futuro: trocar a linha abaixo por `new MercadoPagoPaymentProvider(...)`
 * é suficiente para ligar o Mercado Pago — nenhuma tela de checkout
 * precisa ser reescrita.
 */
export const paymentProvider: PaymentProvider = new MockPaymentProvider();

export type { PaymentData, PaymentProvider, PaymentResult } from "./provider";
