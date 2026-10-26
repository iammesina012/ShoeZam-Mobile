import { COLORS } from "@/theme/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  // ---------- Hero Section ----------
  heroCard: {
    height: 180,
    justifyContent: "center",
    marginTop: 16,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    borderRadius: 14,
    backgroundColor: "#D12A3E",
    overflow: "hidden",
  },
  // ----- Left Side -----
  leftSide: {
    alignItems: "flex-start",
    zIndex: 1,
  },
  heroLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.background,
  },
  heroTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.background,
    marginTop: 4,
  },
  heroButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 24,
    marginTop: 12,
  },
  heroButtonText: {
    color: COLORS.background,
    fontSize: 12,
  },
  // ----- Right Side -----
  rightImage: {
    position: "absolute",
    width: 150,
    height: 220,
    right: 15,
    bottom: -20,
    transform: [{ rotate: "10deg" }, { scaleX: -1 }],
  },
  // ---------- Shop by Brand ----------
  brandSection: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 20,
  },
  highlightText: {
    color: COLORS.accent,
  },
  brandScrollContainer: {
    marginTop: 14,
    paddingHorizontal: 20,
    gap: 12,
    alignItems: "center",
  },
  brandItem: {
    alignItems: "center",
  },
  brandCard: {
    width: 88,
    height: 60,
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  brandLogo: {
    width: 50,
    height: 32,
  },
  brandName: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 6,
  },
  // ---------- Product Catalog ----------
  productCatalogSection: {
    marginTop: 16,
  },
  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 14,
    paddingHorizontal: 20,
    rowGap: 20,
  },
});
