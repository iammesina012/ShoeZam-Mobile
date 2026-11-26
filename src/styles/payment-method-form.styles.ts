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
  formContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
    gap: 18,
  },
  demoNotice: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    borderRadius: 12,
    backgroundColor: COLORS.surface,
    padding: 12,
  },
  demoNoticeText: {
    flex: 1,
    color: COLORS.secondary,
    fontSize: 13,
    lineHeight: 19,
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
  footer: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  saveButton: {
    minHeight: 52,
    borderRadius: 12,
    backgroundColor: COLORS.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  saveButtonText: {
    color: COLORS.background,
    fontSize: 15,
    fontWeight: "600",
  },
  invalidState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  invalidMessage: {
    color: COLORS.primary,
    fontSize: 16,
    textAlign: "center",
  },
  backButton: {
    minHeight: 44,
    justifyContent: "center",
    paddingHorizontal: 20,
    marginTop: 16,
  },
  backButtonText: {
    color: COLORS.accent,
    fontWeight: "600",
  },
});
