import Header from "@/components/Header";
import MenuItem from "@/components/MenuItem";
import ProfileAvatar from "@/components/ProfileAvatar";
import { useAuth } from "@/context/AuthContext";
import { useProfile } from "@/context/ProfileContext";
import { styles } from "@/styles/account.styles";
import { COLORS } from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Alert,
  Pressable,
  ScrollView,
  Switch,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Account() {
  const { session, signOut } = useAuth();
  const { profile } = useProfile();
  const authFullName = session?.user.user_metadata.full_name;
  const accountName =
    profile.fullName.trim() ||
    (typeof authFullName === "string" ? authFullName.trim() : "") ||
    "Account";
  const savedUsername = profile.username.trim();
  const accountUsername = savedUsername
    ? `@${savedUsername}`
    : session?.user.email ?? "Email not set";

  async function handleSignOut() {
    try {
      await signOut();
    } catch (error) {
      Alert.alert(
        "Signed out on this device",
        `Your session may remain active on the server until it expires. ${
          error instanceof Error ? error.message : "Please try again."
        }`,
      );
    }
  }

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="dark" />
      {/* App Bar */}
      <Header title="My Account" centerTitle />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <ProfileAvatar photoUri={profile.photoUri} size={100} />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName} numberOfLines={2}>
              {accountName}
            </Text>
            <Text style={styles.profileEmail}>{accountUsername}</Text>
          </View>
        </View>

        <View style={styles.sectionDivider} />

        {/* My Orders */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Orders</Text>

          <MenuItem
            icon="receipt-outline"
            label="Order History"
            onPress={() => router.push("/order-history")}
          />
        </View>

        <View style={styles.sectionDivider} />

        {/* Account Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Settings</Text>

          <MenuItem
            icon="person-outline"
            label="Profile"
            onPress={() => router.push("/profile")}
          />

          <MenuItem icon="lock-closed-outline" label="Change Password" />

          <MenuItem
            icon="location-outline"
            label="Addresses"
            onPress={() => router.push("/my-addresses")}
          />

          <MenuItem
            icon="card-outline"
            label="Payment Methods"
            onPress={() => router.push("/payment-methods")}
          />
        </View>

        <View style={styles.sectionDivider} />

        {/* Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>

          <Pressable style={styles.darkModeRow}>
            <Ionicons name="moon-outline" size={22} color={COLORS.primary} />
            <Text style={styles.darkModeText}>Dark Mode</Text>
            <Switch
              value={false}
              trackColor={{
                false: "#D5D5D5",
                true: COLORS.accent,
              }}
              thumbColor={COLORS.background}
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

          <MenuItem
            icon="help-circle-outline"
            label="Help Center"
            onPress={() => router.push("/help-center")}
          />

          <MenuItem
            icon="document-text-outline"
            label="Terms & Privacy"
            onPress={() => router.push("/terms-privacy")}
          />
        </View>

        <View style={styles.sectionDivider} />

        <View style={styles.logoutContainer}>
          <Pressable onPress={handleSignOut} style={styles.logoutButton}>
            <Ionicons name="log-out-outline" size={22} color={COLORS.accent} />
            <Text style={styles.logoutText}>Log Out</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
