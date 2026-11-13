import { COLORS } from "@/theme/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 24,
    gap: 16,
  },
  orderCard: {
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E5EA",
    backgroundColor: COLORS.background,
  },
  orderHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
  },
  orderHeading: {
    flex: 1,
  },
  orderId: {
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: "700",
  },
  orderDate: {
    marginTop: 4,
    color: COLORS.secondary,
    fontSize: 13,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  divider: {
    height: 1,
    marginVertical: 14,
    backgroundColor: "#E5E5EA",
  },
  products: {
    gap: 14,
  },
  productRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  productImageContainer: {
    width: 72,
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: COLORS.surface,
  },
  productImage: {
    width: 64,
    height: 64,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 19,
  },
  productVariant: {
    marginTop: 5,
    color: COLORS.secondary,
    fontSize: 12,
  },
  productVariantValue: {
    color: COLORS.primary,
    fontWeight: "600",
  },
  productQuantity: {
    marginTop: 4,
    color: COLORS.secondary,
    fontSize: 12,
  },
  paymentMethod: {
    color: COLORS.secondary,
    fontSize: 13,
  },
  paymentMethodValue: {
    color: COLORS.primary,
    fontWeight: "600",
  },
  orderSummary: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginTop: 12,
  },
  itemCount: {
    color: COLORS.primary,
    fontSize: 13,
  },
  totalContainer: {
    alignItems: "flex-end",
  },
  totalPrice: {
    color: COLORS.accent,
    fontSize: 17,
    fontWeight: "700",
  },
  // ---------- Empty State ----------
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  emptyTitle: {
    marginTop: 16,
    color: COLORS.primary,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  emptyMessage: {
    marginTop: 6,
    color: COLORS.secondary,
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
  },
  emptyButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyButtonText: {
    color: COLORS.background,
    fontSize: 14,
    fontWeight: "600",
  },
});
