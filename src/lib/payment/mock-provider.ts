import type { PaymentData, PaymentProvider, PaymentResult } from "./provider";

function generateOrderId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `MC-${timestamp}-${random}`;
}

/**
 * Implementação demonstrativa do PaymentProvider. Simula latência de
 * rede e sempre aprova o pedido — não processa nenhum pagamento real
 * e não deve receber credenciais de gateway.
 */
export class MockPaymentProvider implements PaymentProvider {
  async createPayment(data: PaymentData): Promise<PaymentResult> {
    await new Promise((resolve) => setTimeout(resolve, 1800));

    return {
      success: true,
      orderId: generateOrderId(),
      status: "approved",
      message: `Pagamento demonstrativo aprovado para ${data.subscriber.name || "assinante"}.`,
    };
  }
}
