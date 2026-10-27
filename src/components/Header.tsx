import { COLORS } from "@/theme/colors";
import { HeaderProps } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Header({ title, centerTitle, showNotification, showEdit, showCart, showLogo, showBack }: HeaderProps) {
  return (
    <View style={styles.header}>
      {showBack && (
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-outline" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      )}

      {showLogo ? (
        <Image source={require("@/assets/logo.png")} style={styles.logo} resizeMode="contain"></Image>
      ) : (
        <Text style={[styles.title, centerTitle && styles.centerTitle]}>{title}</Text>
      )}

      {showCart && (
        <TouchableOpacity>
          <Ionicons name="cart-outline" size={24} color={COLORS.accent} />
        </TouchableOpacity>
      )}

      {showNotification && (
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color={COLORS.accent} />
        </TouchableOpacity>
      )}

      {showEdit && (
        <TouchableOpacity>
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
