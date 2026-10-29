import Header from "@/components/Header";
import MenuItem from "@/components/MenuItem";
import { styles } from "@/styles/account.styles";
import { COLORS } from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { Image, Pressable, ScrollView, Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Account() {
  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="dark" />
      {/* App Bar */}
      <Header title="My Account" centerTitle />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image source={require("@/assets/images/profile/me.jpeg")} style={styles.profileImage} resizeMode="cover" />
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
