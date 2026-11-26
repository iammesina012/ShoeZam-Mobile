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
    paddingTop: 16,
    paddingBottom: 24,
  },
  intro: {
    color: COLORS.secondary,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  methodCard: {
    minHeight: 82,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D6D6D6",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    gap: 12,
  },
  methodCardSelected: {
    borderColor: COLORS.accent,
  },
  methodCardDisabled: {
    opacity: 0.65,
  },
  methodIcon: {
    width: 42,
    height: 42,
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
  comingSoon: {
    color: COLORS.secondary,
    fontSize: 11,
    fontWeight: "600",
  },
  footer: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 8,
  },
  notice: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  noticeText: {
    flex: 1,
    color: COLORS.secondary,
    fontSize: 12,
    lineHeight: 17,
  },
});
