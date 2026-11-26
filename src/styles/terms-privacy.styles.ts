import { StyleSheet } from "react-native";
import { COLORS } from "@/theme/colors";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
  },
  documentPicker: {
    flexDirection: "row",
    padding: 4,
    borderRadius: 12,
    backgroundColor: COLORS.surface,
  },
  documentButton: {
    flex: 1,
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9,
  },
  selectedDocumentButton: {
    backgroundColor: COLORS.background,
  },
  documentButtonText: {
    color: COLORS.fieldValue,
    fontSize: 14,
    fontWeight: "600",
  },
  selectedDocumentButtonText: {
    color: COLORS.accent,
  },
  notice: {
    marginTop: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E5EA",
    borderRadius: 12,
  },
  noticeTitle: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "700",
  },
  noticeText: {
    marginTop: 5,
    color: COLORS.fieldValue,
    fontSize: 13,
    lineHeight: 19,
  },
  documentTitle: {
    marginTop: 26,
    marginBottom: 4,
    color: COLORS.primary,
    fontSize: 20,
    fontWeight: "700",
  },
  section: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
  },
  sectionTitle: {
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: "700",
  },
  sectionBody: {
    marginTop: 8,
    color: COLORS.fieldValue,
    fontSize: 14,
    lineHeight: 22,
  },
});
