import { StyleSheet } from "react-native";
import { COLORS } from "@/theme/colors";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  // ---------- Profile Section ----------
  profileSection: {
    alignItems: "center",
    paddingVertical: 20,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    overflow: "hidden",
    borderColor: COLORS.primary,
    backgroundColor: COLORS.surface,
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  profileInfo: {
    marginTop: 20,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  profileEmail: {
    fontSize: 14,
    fontWeight: "normal",
    color: COLORS.primary,
  },
  // ---------- Divider ----------
  sectionDivider: {
    height: 1,
    backgroundColor: "#E5E5EA",
    marginHorizontal: 20,
  },
  // ---------- Sections ----------
  section: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 600,
    color: COLORS.primary,
  },
  darkModeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
    gap: 12,
  },
  darkModeText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "normal",
    color: COLORS.primary,
  },
  notificationsContainer: {
    marginTop: -12,
  },
  // ---------- Log Out Button ----------
  logoutContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    paddingHorizontal: 12,
    width: "100%",
    height: 44,
    borderWidth: 1,
    borderRadius: 24,
    borderColor: COLORS.accent,
    gap: 8,
  },
  logoutText: {
    color: COLORS.accent,
  },
});
