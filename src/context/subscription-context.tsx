"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type {
  CustomizationAnswers,
  PaymentMethod,
  PlanId,
  Subscriber,
} from "@/lib/types";

interface OrderConfirmation {
  orderId: string;
  planId: PlanId;
  createdAt: string;
}

interface SubscriptionState {
  planId: PlanId | null;
  customization: CustomizationAnswers;
  subscriber: Subscriber | null;
  paymentMethod: PaymentMethod;
  order: OrderConfirmation | null;
}

interface SubscriptionContextValue extends SubscriptionState {
  selectPlan: (planId: PlanId) => void;
  answerCustomization: (questionId: string, optionId: string) => void;
  setSubscriber: (subscriber: Subscriber) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  confirmOrder: (order: OrderConfirmation) => void;
  resetOrder: () => void;
}

const STORAGE_KEY = "clube-marins-cafes:subscription";

const defaultState: SubscriptionState = {
  planId: null,
  customization: {},
  subscriber: null,
  paymentMethod: "credit_card",
  order: null,
};

const SubscriptionContext = createContext<SubscriptionContextValue | null>(null);

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<SubscriptionState>(defaultState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setState({ ...defaultState, ...JSON.parse(raw) });
      }
    } catch {
      // localStorage indisponível (modo privado, etc.) — segue com o estado padrão.
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignora falha de persistência — não é crítico para a demonstração.
    }
  }, [state, hydrated]);

  const selectPlan = useCallback((planId: PlanId) => {
    setState((prev) => ({ ...prev, planId }));
  }, []);

  const answerCustomization = useCallback((questionId: string, optionId: string) => {
    setState((prev) => ({
      ...prev,
      customization: { ...prev.customization, [questionId]: optionId },
    }));
  }, []);

  const setSubscriber = useCallback((subscriber: Subscriber) => {
    setState((prev) => ({ ...prev, subscriber }));
  }, []);

  const setPaymentMethod = useCallback((paymentMethod: PaymentMethod) => {
    setState((prev) => ({ ...prev, paymentMethod }));
  }, []);

  const confirmOrder = useCallback((order: OrderConfirmation) => {
    setState((prev) => ({ ...prev, order }));
  }, []);

  const resetOrder = useCallback(() => {
    setState(defaultState);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignora
    }
  }, []);

  const value = useMemo<SubscriptionContextValue>(
    () => ({
      ...state,
      selectPlan,
      answerCustomization,
      setSubscriber,
      setPaymentMethod,
      confirmOrder,
      resetOrder,
    }),
    [state, selectPlan, answerCustomization, setSubscriber, setPaymentMethod, confirmOrder, resetOrder],
  );

  return <SubscriptionContext.Provider value={value}>{children}</SubscriptionContext.Provider>;
}

export function useSubscription(): SubscriptionContextValue {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error("useSubscription deve ser usado dentro de SubscriptionProvider");
  }
  return context;
}
