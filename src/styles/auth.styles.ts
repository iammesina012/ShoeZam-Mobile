import { COLORS } from "@/theme/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 32,
    gap: 16,
  },
  title: {
    color: COLORS.primary,
    fontSize: 24,
    fontWeight: "700",
  },
  subtitle: {
    color: COLORS.fieldValue,
    fontSize: 14,
    lineHeight: 21,
  },
  formSection: {
    gap: 16,
  },
  inputGroup: {
    gap: 7,
  },
  inputLabel: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "600",
  },
  input: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: "#D6D6D6",
    borderRadius: 12,
    paddingHorizontal: 14,
    color: COLORS.fieldValue,
    fontSize: 15,
  },
  inputError: {
    borderColor: COLORS.accent,
  },
  fieldError: {
    color: COLORS.accent,
    fontSize: 12,
    lineHeight: 16,
  },
  submitNotice: {
    color: COLORS.fieldValue,
    fontSize: 13,
    lineHeight: 19,
  },
  errorNotice: {
    color: COLORS.accent,
    fontSize: 13,
    lineHeight: 19,
  },
  submitButton: {
    minHeight: 52,
    borderRadius: 12,
    backgroundColor: COLORS.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonDisabled: {
    opacity: 0.65,
  },
  submitButtonText: {
    color: COLORS.background,
    fontSize: 15,
    fontWeight: "600",
  },
  switchPrompt: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 8,
  },
  switchPromptText: {
    color: COLORS.fieldValue,
    fontSize: 14,
  },
  switchLink: {
    color: COLORS.accent,
    fontSize: 14,
    fontWeight: "600",
  },
});
