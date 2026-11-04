import { COLORS } from "@/theme/colors";
import { HeaderProps } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Header({
  title,
  centerTitle,
  showNotification,
  showEdit,
  showBag,
  showLogo,
  showBack,
  backgroundColor = "transparent",
}: HeaderProps) {
  return (
    <View style={[styles.header, { backgroundColor }]}>
      {showBack && (
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => router.back()}
        >
          <Ionicons
            name="arrow-back-outline"
            size={24}
            color={COLORS.primary}
          />
        </TouchableOpacity>
      )}

      {showLogo ? (
        <Image
          source={require("@/assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        ></Image>
      ) : (
        <Text style={[styles.title, centerTitle && styles.centerTitle]}>
          {title}
        </Text>
      )}

      {showBag && (
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => router.push("/tabs/bag")}
        >
          <Ionicons name="bag-outline" size={24} color={COLORS.accent} />
        </TouchableOpacity>
      )}

      {showNotification && (
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons
            name="notifications-outline"
            size={24}
            color={COLORS.accent}
          />
        </TouchableOpacity>
      )}

      {showEdit && (
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="create-outline" size={24} color={COLORS.accent} />
        </TouchableOpacity>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headerButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 150,
    height: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
  },
  centerTitle: {
    flex: 1,
    textAlign: "center",
  },
});
