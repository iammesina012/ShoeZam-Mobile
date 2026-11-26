import Header from "@/components/Header";
import MenuItem from "@/components/MenuItem";
import ProfileAvatar from "@/components/ProfileAvatar";
import { useProfile } from "@/context/ProfileContext";
import { styles } from "@/styles/account.styles";
import { COLORS } from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, ScrollView, Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Account() {
  const { profile } = useProfile();
  const accountName = profile.fullName.trim() || "Test Account";
  const savedUsername = profile.username.trim();
  const accountUsername = savedUsername
    ? `@${savedUsername}`
    : "Username not set";

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

          <MenuItem icon="help-circle-outline" label="Help Center" />

          <MenuItem icon="document-text-outline" label="Terms & Privacy" />
        </View>

        <View style={styles.sectionDivider} />

        <View style={styles.logoutContainer}>
          <Pressable style={styles.logoutButton}>
            <Ionicons name="log-out-outline" size={22} color={COLORS.accent} />
            <Text style={styles.logoutText}>Log Out</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
