export const EWALLET_PROVIDERS = [
  "GCash",
  "Maya",
  "PayPal",
  "MariBank",
] as const;

export const CARD_NETWORKS = ["Visa", "Mastercard"] as const;

const ALL_PAYMENT_PROVIDERS: readonly string[] = [
  ...EWALLET_PROVIDERS,
  ...CARD_NETWORKS,
];

export type PaymentProvider =
  | (typeof EWALLET_PROVIDERS)[number]
  | (typeof CARD_NETWORKS)[number];

export type SavedPaymentCategory = "ewallet" | "card";

export function isPaymentProvider(value: unknown): value is PaymentProvider {
  return typeof value === "string" && ALL_PAYMENT_PROVIDERS.includes(value);
}

export function getPaymentCategory(
  provider: PaymentProvider,
): SavedPaymentCategory {
  return provider === "Visa" || provider === "Mastercard" ? "card" : "ewallet";
}
