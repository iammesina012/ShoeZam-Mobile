import { COLORS } from "@/theme/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.primary,
  },
  sectionCard: {
    borderWidth: 1,
    borderColor: "#D6D6D6",
    borderRadius: 14,
    padding: 16,
  },
  addressSummary: {
    color: COLORS.primary,
    fontSize: 14,
    lineHeight: 21,
  },
  addressName: {
    fontWeight: "700",
    marginBottom: 4,
  },
  addressAction: {
    minHeight: 48,
    borderRadius: 12,
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  addressActionText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "600",
  },
  paymentRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  paymentIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  paymentName: {
    flex: 1,
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: "600",
  },
  selectionScreen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  addressListContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
    flexGrow: 1,
  },
  addressCard: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D6D6D6",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    gap: 12,
  },
  addressCardSelected: {
    borderColor: COLORS.accent,
  },
  radioButton: {
    paddingVertical: 8,
  },
  selectableAddress: {
    flex: 1,
  },
  editButton: {
    padding: 8,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 48,
  },
  emptyTitle: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
  emptyMessage: {
    color: COLORS.secondary,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
    textAlign: "center",
  },
  addAddressButton: {
    minHeight: 52,
    borderRadius: 12,
    backgroundColor: COLORS.accent,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    marginTop: 16,
  },
  addAddressButtonText: {
    color: COLORS.background,
    fontSize: 15,
    fontWeight: "600",
  },
  formContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 28,
    gap: 16,
  },
  formSection: {
    gap: 12,
    marginTop: 4,
  },
  formSectionTitle: {
    color: COLORS.primary,
    fontSize: 17,
    fontWeight: "700",
  },
  formSectionDivider: {
    height: 1,
    backgroundColor: "#E5E5EA",
  },
  inputRow: {
    flexDirection: "row",
    gap: 12,
  },
  inputColumn: {
    flex: 1,
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
    color: COLORS.primary,
    fontSize: 15,
  },
  multilineInput: {
    minHeight: 76,
    paddingTop: 12,
    textAlignVertical: "top",
  },
  formError: {
    color: COLORS.accent,
    fontSize: 14,
    lineHeight: 20,
  },
  formFooter: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
    paddingTop: 12,
  },
});
