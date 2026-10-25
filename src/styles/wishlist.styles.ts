import { StyleSheet } from "react-native";
import { colors } from "@/theme/colors";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
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
    borderColor: colors.textPrimary,
    backgroundColor: colors.textPrimary,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  allName: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.background,
  },
  brandCard: {
    height: 44,
    paddingHorizontal: 18,
    borderWidth: 2,
    borderColor: colors.textPrimary,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  brandName: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textPrimary,
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
  // ---------- Empty State ----------
  catalogWrapper: {
    flex: 1,
  },
  emptyWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyContent: {
    alignItems: "center",
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.textPrimary,
    marginTop: 16,
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: 6,
    lineHeight: 20,
  },
  emptyButton: {
    backgroundColor: colors.textPrimary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyButtonText: {
    color: colors.background,
    fontSize: 14,
    fontWeight: "600",
  },
});
