import { COLORS } from "@/theme/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  // ---------- Product Image Section ----------
  productImageContainer: {
    width: "100%",
    height: 300,
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  productImage: {
    width: "90%",
    height: "90%",
  },
  // ---------- Product Details Section ----------
  productDetailsSection: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.background,
  },
  firstRow: {
    // Brand name + Wishlist button
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brandName: {
    fontWeight: 600,
    color: COLORS.secondary,
  },
  productName: {
    fontSize: 24,
    fontWeight: 700,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 600,
    color: COLORS.accent,
    marginTop: 4,
  },
  // ----- Color -----
  productColor: {
    fontWeight: 600,
    marginTop: 16,
  },
  colorContainer: {
    flexDirection: "row",
    marginTop: 12,
    gap: 8,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.secondary,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
  },
  missingColorOption: {
    borderColor: COLORS.accent,
  },
  selectedColor: {
    borderWidth: 2,
    borderColor: COLORS.accent,
  },
  colorSwatch: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  // ----- Size -----
  productSize: {
    fontWeight: 600,
    marginTop: 16,
  },
  sizeContainer: {
    flexDirection: "row",
    marginTop: 12,
    gap: 8,
  },
  sizeOption: {
    width: 60,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  missingSizeOption: {
    borderWidth: 1,
    borderColor: COLORS.accent,
  },
  selectedSize: {
    borderWidth: 2,
    borderColor: COLORS.accent,
    backgroundColor: COLORS.background,
  },
  sizeText: {
    fontWeight: 600,
  },
  optionsError: {
    color: COLORS.accent,
    fontWeight: 500,
    marginTop: 10,
  },
  // ----- Description -----
  productDescription: {
    fontWeight: 600,
    marginTop: 16,
  },
  descriptionText: {
    fontWeight: 100,
    textAlign: "justify",
    marginTop: 12,
  },
  // ---------- Add to Bag button ----------
  addToBagButton: {
    height: 56,
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 12,
    backgroundColor: COLORS.accent,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  addToBagText: {
    fontSize: 16,
    fontWeight: 600,
    color: COLORS.background,
  },
  addToBagFooter: {
    backgroundColor: COLORS.background,
  },
});
