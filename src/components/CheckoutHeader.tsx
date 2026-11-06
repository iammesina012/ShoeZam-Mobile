import { COLORS } from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type CheckoutHeaderProps = {
  title: string;
};

export default function CheckoutHeader({ title }: CheckoutHeaderProps) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity
        accessibilityLabel="Go back"
        accessibilityRole="button"
        onPress={() => router.back()}
        style={styles.backButton}
      >
        <Ionicons
          name="arrow-back-outline"
          size={24}
          color={COLORS.primary}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    color: COLORS.primary,
    fontSize: 20,
    fontWeight: "700",
  },
  backButton: {
    position: "absolute",
    left: 20,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
