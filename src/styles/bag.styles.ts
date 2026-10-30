import { StyleSheet } from "react-native";
import { COLORS } from "@/theme/colors";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.primary,
    marginTop: 16,
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 14,
    color: COLORS.secondary,
    textAlign: "center",
    marginTop: 6,
    lineHeight: 20,
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
  // ---------- Product Card ----------
  productContainer: {
    flexDirection: "row",
    minHeight: 100,
    marginTop: 16,
    marginHorizontal: 20,
    padding: 16,
    gap: 12,
    borderRadius: 14,
    backgroundColor: COLORS.background,
    alignItems: "center",
  },
  productImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 14,
    paddingHorizontal: 8,
    backgroundColor: COLORS.surface,
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  // ---------- Product Details ----------
  productDetails: {
    flex: 1,
    flexDirection: "column",
  },
  productName: {
    fontWeight: "bold",
    color: COLORS.primary,
  },
  productBrand: {
    fontWeight: "normal",
    color: COLORS.secondary,
  },
  // ---------- Bottom Row ----------
  productBottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.accent,
    flexShrink: 1,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    padding: 6,
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    gap: 10,
  },
  quantityButton: {
    width: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  quantityText: {
    fontSize: 14,
    fontWeight: "normal",
    color: COLORS.primary,
  },
  // ---------- Summary ----------
  summary: {
    backgroundColor: COLORS.background,
    marginTop: 14,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  totalLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.primary,
  },

  totalPrice: {
    fontSize: 18,
    color: COLORS.primary,
  },

  checkoutButton: {
    backgroundColor: COLORS.accent,
    borderRadius: 4,
    marginTop: 16,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  checkoutButtonText: {
    color: COLORS.background,
    fontSize: 14,
    fontWeight: "500",
  },
});
