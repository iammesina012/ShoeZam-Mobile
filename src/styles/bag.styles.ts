import { StyleSheet } from "react-native";
import { colors } from "@/theme/colors";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.surface,
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
    backgroundColor: colors.background,
    alignItems: "center",
  },
  productImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 14,
    paddingHorizontal: 8,
    backgroundColor: colors.surface,
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
    color: colors.textPrimary,
  },
  productBrand: {
    fontWeight: "normal",
    color: colors.textSecondary,
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
    color: colors.brand,
    flexShrink: 1,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    padding: 6,
    backgroundColor: colors.surface,
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
    color: colors.textPrimary,
  },
  // ---------- Summary ----------
  summary: {
    backgroundColor: colors.background,
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
    color: colors.textPrimary,
  },

  totalPrice: {
    fontSize: 18,
    color: colors.textPrimary,
  },

  checkoutButton: {
    backgroundColor: colors.brand,
    borderRadius: 4,
    marginTop: 16,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  checkoutButtonText: {
    color: colors.background,
    fontSize: 14,
    fontWeight: "500",
  },
});
