import { COLORS } from "@/theme/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  confirmation: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.accent,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  title: {
    color: COLORS.primary,
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
  },
  message: {
    color: COLORS.secondary,
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
    marginTop: 10,
    maxWidth: 300,
  },
  viewOrderButton: {
    alignSelf: "center",
    minHeight: 52,
    paddingHorizontal: 28,
    borderRadius: 12,
    backgroundColor: COLORS.accent,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 32,
  },
  viewOrderButtonText: {
    color: COLORS.background,
    fontSize: 15,
    fontWeight: "700",
  },
});
