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
  introCard: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderRadius: 16,
    backgroundColor: COLORS.surface,
  },
  introIcon: {
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 28,
    backgroundColor: COLORS.background,
  },
  title: {
    marginTop: 14,
    color: COLORS.primary,
    fontSize: 20,
    fontWeight: "700",
  },
  subtitle: {
    marginTop: 8,
    color: COLORS.fieldValue,
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
  },
  sectionTitle: {
    marginTop: 28,
    marginBottom: 12,
    color: COLORS.primary,
    fontSize: 17,
    fontWeight: "700",
  },
  faqList: {
    borderTopWidth: 1,
    borderTopColor: "#E5E5EA",
  },
  faqItem: {
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
  },
  questionRow: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  question: {
    flex: 1,
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: "600",
  },
  answer: {
    paddingRight: 28,
    paddingBottom: 14,
    color: COLORS.fieldValue,
    fontSize: 14,
    lineHeight: 21,
  },
  contactNote: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 24,
  },
  contactText: {
    flex: 1,
    color: COLORS.secondary,
    fontSize: 13,
    lineHeight: 19,
  },
});
