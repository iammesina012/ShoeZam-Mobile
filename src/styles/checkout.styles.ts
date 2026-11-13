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
  addressInlineName: {
    flexShrink: 1,
    fontWeight: "700",
  },
  addressPhone: {
    color: COLORS.secondary,
    flexShrink: 0,
  },
  addressContactRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  addressDetails: {
    marginTop: 4,
    color: "#666666",
    fontSize: 12,
    lineHeight: 18,
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
    paddingHorizontal: 20,
    paddingVertical: 48,
  },
  emptyTitle: {
    color: COLORS.primary,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 16,
  },
  emptyMessage: {
    color: COLORS.secondary,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 6,
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
  inputError: {
    borderColor: COLORS.accent,
  },
  fieldError: {
    color: COLORS.accent,
    fontSize: 12,
    lineHeight: 16,
  },
  multilineInput: {
    minHeight: 76,
    paddingTop: 12,
    textAlignVertical: "top",
  },
  formFooter: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
});
