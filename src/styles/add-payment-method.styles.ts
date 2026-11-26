import { COLORS } from "@/theme/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 24,
  },
  title: {
    color: COLORS.primary,
    fontSize: 20,
    fontWeight: "700",
  },
  description: {
    color: COLORS.secondary,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 6,
    marginBottom: 20,
  },
  methodCard: {
    minHeight: 88,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D6D6D6",
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    gap: 12,
  },
  methodIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  methodDetails: {
    flex: 1,
    gap: 4,
  },
  methodName: {
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: "600",
  },
  methodDescription: {
    color: COLORS.secondary,
    fontSize: 12,
    lineHeight: 17,
  },
  providerList: {
    borderWidth: 1,
    borderColor: "#D6D6D6",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 4,
    marginTop: -2,
    marginBottom: 12,
  },
  providerRow: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surface,
  },
  providerName: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "500",
  },
  comingSoon: {
    color: COLORS.accent,
    fontSize: 11,
    fontWeight: "600",
  },
});
