import type { PaymentMethod, Plan, Subscriber } from "@/lib/types";

export interface PaymentData {
  plan: Plan;
  subscriber: Subscriber;
  paymentMethod: PaymentMethod;
  totalAmount: number;
}

export interface PaymentResult {
  success: boolean;
  orderId: string;
  status: "approved" | "pending" | "rejected";
  message: string;
}

/**
 * Contrato que qualquer gateway de pagamento deve implementar.
 * A UI de checkout depende apenas desta interface, nunca de um
 * provider concreto — isso permite trocar MockPaymentProvider por
 * MercadoPagoPaymentProvider no futuro sem alterar o checkout.
 */
export interface PaymentProvider {
  createPayment(data: PaymentData): Promise<PaymentResult>;
}
