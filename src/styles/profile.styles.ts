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
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 28,
  },
  photoSection: {
    alignItems: "center",
    marginBottom: 28,
  },
  photoButton: {
    width: 112,
    height: 112,
    position: "relative",
  },
  editPhotoBadge: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 3,
    borderColor: COLORS.background,
    backgroundColor: COLORS.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  formSection: {
    gap: 18,
  },
  sectionTitle: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 2,
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
});
