import AppBar from "@/components/AppBar";
import MenuItem from "@/components/MenuItem";
import { colors } from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, ScrollView, StyleSheet, Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Account() {
  return (
    <SafeAreaView style={styles.screen}>
      {/* App Bar */}
      <AppBar title="My Account" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image
              source={require("@/assets/images/profile/me.jpeg")}
              style={styles.profileImage}
              resizeMode="cover"
            />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName} numberOfLines={2}>
              Michael William Mesina
            </Text>
            <Text style={styles.profileEmail}>michaelwilliam.mesina@gmail.com</Text>
          </View>
        </View>

        <View style={styles.sectionDivider} />

        {/* My Orders */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Orders</Text>

          <MenuItem icon="receipt-outline" label="Order History" />
        </View>

        <View style={styles.sectionDivider} />

        {/* Account Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Settings</Text>

          <MenuItem icon="person-outline" label="Profile" />

          <MenuItem icon="lock-closed-outline" label="Change Password" />

          <MenuItem icon="location-outline" label="Addresses" />

          <MenuItem icon="card-outline" label="Payment Methods" />
        </View>

        <View style={styles.sectionDivider} />

        {/* Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>

          <Pressable style={styles.darkModeRow}>
            <Ionicons name="moon-outline" size={22} color={colors.textPrimary} />
            <Text style={styles.darkModeText}>Dark Mode</Text>
            <Switch
              value={false}
              trackColor={{
                false: "#D5D5D5",
                true: colors.brand,
              }}
              thumbColor={colors.background}
            />
          </Pressable>

          <View style={styles.notificationsContainer}>
            <MenuItem icon="notifications-outline" label="Notifications" />
          </View>
        </View>

        <View style={styles.sectionDivider} />

        {/* Support */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>

          <MenuItem icon="help-circle-outline" label="Help Center" />

          <MenuItem icon="document-text-outline" label="Terms & Privacy" />
        </View>

        <View style={styles.sectionDivider} />

        <View style={styles.logoutContainer}>
          <Pressable style={styles.logoutButton}>
            <Ionicons name="log-out-outline" size={22} color={colors.brand} />
            <Text style={styles.logoutText}>Log Out</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
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
    borderColor: colors.textPrimary,
    backgroundColor: colors.surface,
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
    color: colors.textPrimary,
  },
  profileEmail: {
    fontSize: 14,
    fontWeight: "normal",
    color: colors.textPrimary,
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
    color: colors.textPrimary,
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
    color: colors.textPrimary,
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
    borderColor: colors.brand,
    gap: 8,
  },
  logoutText: {
    color: colors.brand,
  },
});
