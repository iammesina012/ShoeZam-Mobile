import { styles } from "@/styles/order-confirmation.styles";
import { COLORS } from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OrderConfirmation() {
  return (
    <SafeAreaView edges={["top", "bottom", "left", "right"]} style={styles.screen}>
      <StatusBar style="dark" />

      <View style={styles.content}>
        <View style={styles.confirmation}>
          <View style={styles.iconCircle}>
            <Ionicons
              name="checkmark"
              size={42}
              color={COLORS.background}
            />
          </View>
          <Text style={styles.title}>Order placed successfully!</Text>
          <Text style={styles.message}>
            Thank you for shopping with ShoeZam. Your order has been received.
          </Text>

          <TouchableOpacity
            accessibilityRole="button"
            onPress={() => router.push("/order-history")}
            style={styles.viewOrderButton}
          >
            <Text style={styles.viewOrderButtonText}>View Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
