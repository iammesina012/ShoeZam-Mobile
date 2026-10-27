import { COLORS } from "@/theme/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  // ---------- Brand Carousel ----------
  brandScrollView: {
    flexGrow: 0,
    flexShrink: 0,
    marginTop: 14,
  },
  brandScrollContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 8,
    alignItems: "center",
  },
  allCard: {
    height: 44,
    paddingHorizontal: 18,
    borderWidth: 2,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  allName: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.background,
  },
  brandCard: {
    height: 44,
    paddingHorizontal: 18,
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  brandName: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.primary,
  },
  // ---------- Product Catalog ----------
  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 16,
    paddingHorizontal: 20,
    rowGap: 20,
  },
  catalogWrapper: {
    flex: 1,
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
});
