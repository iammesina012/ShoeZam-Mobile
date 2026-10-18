import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, ScrollView, StyleSheet, Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  return (
    <SafeAreaView style={styles.phoneScreen}>
      {/* App Bar */}
      <View style={styles.appBar}>
        <Text style={styles.appTitle}>My Account</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.profileContainer}>
            <Image
              source={require("@/assets/images/profile/me.jpeg")}
              style={styles.profilePicture}
              resizeMode="cover"
            />
          </View>
          <View style={styles.accountText}>
            <Text style={styles.accountName} numberOfLines={2}>
              Michael William Mesina
            </Text>
            <Text style={styles.accountEmail}>michaelwilliam.mesina@gmail.com</Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* My Orders */}
        <View style={styles.menuSection}>
          <Text style={styles.menuHeading}>My Orders</Text>

          <Pressable style={styles.menuItem}>
            <Ionicons name="receipt-outline" size={22} color="#000000" />
            <Text style={styles.menuSubHeading}>Order History</Text>
            <Ionicons name="chevron-forward-outline" size={22} color="#9E9E9E" />
          </Pressable>
        </View>

        <View style={styles.divider} />

        {/* Account Settings */}
        <View style={styles.menuSection}>
          <Text style={styles.menuHeading}>Account Settings</Text>

          <Pressable style={styles.menuItem}>
            <Ionicons name="person-outline" size={22} color="#000000" />
            <Text style={styles.menuSubHeading}>Profile</Text>
            <Ionicons name="chevron-forward-outline" size={22} color="#9E9E9E" />
          </Pressable>

          <Pressable style={styles.menuItem}>
            <Ionicons name="lock-closed-outline" size={22} color="#000000" />
            <Text style={styles.menuSubHeading}>Change Password</Text>
            <Ionicons name="chevron-forward-outline" size={22} color="#9E9E9E" />
          </Pressable>

          <Pressable style={styles.menuItem}>
            <Ionicons name="location-outline" size={22} color="#000000" />
            <Text style={styles.menuSubHeading}>Addresses</Text>
            <Ionicons name="chevron-forward-outline" size={22} color="#9E9E9E" />
          </Pressable>

          <Pressable style={styles.menuItem}>
            <Ionicons name="card-outline" size={22} color="#000000" />
            <Text style={styles.menuSubHeading}>Payment Methods</Text>
            <Ionicons name="chevron-forward-outline" size={22} color="#9E9E9E" />
          </Pressable>
        </View>

        <View style={styles.divider} />

        {/* Preferences */}

        <View style={styles.menuSection}>
          <Text style={styles.menuHeading}>Preferences</Text>

          <Pressable style={styles.menuItem}>
            <Ionicons name="moon-outline" size={22} color="#000000" />
            <Text style={styles.menuSubHeading}>Dark Mode</Text>
            <Switch
              value={false}
              trackColor={{
                false: "#D5D5D5",
                true: "#9C2327",
              }}
              thumbColor="#FFFFFF"
            />
          </Pressable>

          <Pressable style={styles.menuItem}>
            <Ionicons name="notifications-outline" size={22} color="#000000" />
            <Text style={styles.menuSubHeading}>Notifications</Text>
            <Ionicons name="chevron-forward-outline" size={22} color="#9E9E9E" />
          </Pressable>
        </View>

        <View style={styles.divider} />

        {/* Support */}

        <View style={styles.menuSection}>
          <Text style={styles.menuHeading}>Preferences</Text>

          <Pressable style={styles.menuItem}>
            <Ionicons name="help-circle-outline" size={22} color="#000000" />
            <Text style={styles.menuSubHeading}>Help Center</Text>
            <Ionicons name="chevron-forward-outline" size={22} color="#9E9E9E" />
          </Pressable>

          <Pressable style={styles.menuItem}>
            <Ionicons name="document-text-outline" size={22} color="#000000" />
            <Text style={styles.menuSubHeading}>Terms & Privacy</Text>
            <Ionicons name="chevron-forward-outline" size={22} color="#9E9E9E" />
          </Pressable>
        </View>

        <View style={styles.divider} />

        <View style={styles.logOutContainer}>
          <Pressable style={styles.logOutButton}>
            <Ionicons name="log-out-outline" size={22} color="#9C2327" />
            <Text style={styles.logOutText}>Log Out</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  phoneScreen: {
    flex: 1,
    backgroundColor: "#F2F2F2",
  },
  // ---------- App Bar ----------
  appBar: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  appTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
  },
  // ---------- Profile Header ----------
  profileHeader: {
    alignItems: "center",
    marginTop: 16,
  },
  profileContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    overflow: "hidden",
    borderColor: "#000000",
    backgroundColor: "#FFFFFF",
  },
  profilePicture: {
    width: "100%",
    height: "100%",
  },
  accountText: {
    marginTop: 10,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  accountName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000000",
  },
  accountEmail: {
    fontSize: 14,
    fontWeight: "normal",
    color: "#000000",
  },
  // ---------- Divider Line ----------
  divider: {
    height: 1,
    backgroundColor: "#E5E5EA",
    marginTop: 20,
    marginHorizontal: 20,
  },
  // ---------- Sections ----------
  menuSection: {
    marginTop: 16,
    paddingHorizontal: 20,
  },
  menuHeading: {
    fontSize: 18,
    fontWeight: 600,
    color: "#000000",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
    gap: 12,
  },
  menuSubHeading: {
    flex: 1,
    fontSize: 14,
    fontWeight: "normal",
    color: "#000000",
  },
  // ---------- Log Out Button ----------
  logOutContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logOutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    paddingHorizontal: 12,
    width: "100%",
    height: 44,
    borderWidth: 1,
    borderRadius: 24,
    borderColor: "#9C2327",
    gap: 8,
  },
  logOutText: {
    color: "#9C2327",
  },
});
