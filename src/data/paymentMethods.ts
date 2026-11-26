export const PAYMENT_METHODS = [
  {
    id: "cash-on-delivery",
    label: "Cash on Delivery",
    description: "Pay for your order when it arrives.",
    icon: "cash-outline",
    available: true,
  },
  {
    id: "gcash",
    label: "GCash",
    description: "Digital wallet payments are coming soon.",
    icon: "phone-portrait-outline",
    available: false,
  },
  {
    id: "card",
    label: "Debit or Credit Card",
    description: "Card payments are coming soon.",
    icon: "card-outline",
    available: false,
  },
] as const;

export type PaymentMethodId = (typeof PAYMENT_METHODS)[number]["id"];
