import { StyleSheet } from "react-native";
import { COLORS } from "@/theme/colors";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  // ---------- Remove Confirmation Modal ----------
  modalOverlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: 300,
    backgroundColor: COLORS.background,
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.primary,
    textAlign: "center",
  },
  modalMessage: {
    color: COLORS.secondary,
    textAlign: "center",
    lineHeight: 20,
    marginTop: 8,
  },
  modalButtons: {
    flexDirection: "row",
    width: "100%",
    gap: 12,
    marginTop: 24,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  confirmButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: COLORS.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.primary,
  },
  confirmButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.background,
  },
  // ---------- Empty State ----------
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
  emptyMessage: {
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
    padding: 16,
    gap: 12,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: "#E5E5EA",
    borderRadius: 14,
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
  // Swipeable Card
  deleteAction: {
    backgroundColor: COLORS.accent,
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    gap: 4,
  },
  deleteText: {
    color: COLORS.background,
    fontSize: 12,
    fontWeight: "600",
  },
  // ---------- Summary ----------
  summary: {
    backgroundColor: COLORS.background,
    marginTop: 14,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: "#D6D6D6",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 4,
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
    color: COLORS.accent,
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
