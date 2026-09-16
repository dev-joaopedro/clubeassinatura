export type PlanId = "essencial" | "experiencia" | "barista";

export interface Plan {
  id: PlanId;
  name: string;
  tagline: string;
  coffees: number;
  price: number;
  features: string[];
  highlighted?: boolean;
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
}

export interface HowItWorksStep {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface CustomizationOption {
  id: string;
  label: string;
}

export interface CustomizationQuestion {
  id: string;
  question: string;
  options: CustomizationOption[];
}

export type CustomizationAnswers = Record<string, string>;

export interface Subscriber {
  name: string;
  email: string;
  phone: string;
  cpf: string;
  zipCode: string;
  address: string;
  number: string;
  complement?: string;
  city: string;
  state: string;
}

export type PaymentMethod = "credit_card" | "pix" | "other";
