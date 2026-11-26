import { COLORS } from "@/theme/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
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
  savedMethodsContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  savedMethodCard: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D6D6D6",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    gap: 12,
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
    gap: 3,
  },
  methodName: {
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: "600",
  },
  accountName: {
    color: COLORS.secondary,
    fontSize: 12,
  },
  maskedIdentifier: {
    color: COLORS.fieldValue,
    fontSize: 13,
  },
  methodActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  actionButton: {
    width: 32,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  addButton: {
    minHeight: 52,
    borderRadius: 12,
    backgroundColor: COLORS.accent,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  addButtonText: {
    color: COLORS.background,
    fontSize: 15,
    fontWeight: "600",
  },
});
