import CheckoutHeader from "@/components/CheckoutHeader";
import { useAddress } from "@/context/AddressContext";
import { useBag } from "@/context/BagContext";
import { styles as bagStyles } from "@/styles/bag.styles";
import { styles } from "@/styles/checkout.styles";
import { COLORS } from "@/theme/colors";
import { formatShippingAddress } from "@/utils/address";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PRODUCTS } from "@/data/products";

export default function Checkout() {
  const { bagItems, clearBag } = useBag();
  const { selectedAddress } = useAddress();

  const totalPrice = bagItems.reduce((total, bagItem) => {
    const product = PRODUCTS.find((item) => item.id === bagItem.productId);
    return product ? total + product.price * bagItem.quantity : total;
  }, 0);
  const canPlaceOrder = bagItems.length > 0 && selectedAddress !== null;

  function handlePlaceOrder() {
    if (!canPlaceOrder) return;

    clearBag();
    router.replace("/order-confirmation");
  }

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.screen}>
      <StatusBar style="dark" />
      <CheckoutHeader title="Checkout" />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Shipping Address</Text>
          </View>

          {selectedAddress ? (
            <View style={styles.sectionCard}>
              <View style={styles.addressContactRow}>
                <Text
                  ellipsizeMode="tail"
                  numberOfLines={1}
                  style={[styles.addressSummary, styles.addressInlineName]}
                >
                  {selectedAddress.fullName}
                </Text>
                <Text
                  numberOfLines={1}
                  style={[styles.addressSummary, styles.addressPhone]}
                >
                  {" "}
                  {selectedAddress.phoneNumber}
                </Text>
              </View>
              <Text style={[styles.addressSummary, styles.addressDetails]}>
                {formatShippingAddress(selectedAddress)}
              </Text>
              <TouchableOpacity
                accessibilityRole="button"
                onPress={() => router.push("/address-selection")}
                style={[styles.addressAction, { marginTop: 14 }]}
              >
                <Text style={styles.addressActionText}>Change Address</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              accessibilityRole="button"
              onPress={() => router.push("/address-selection")}
              style={styles.addressAction}
            >
              <Ionicons name="add" size={20} color={COLORS.primary} />
              <Text style={styles.addressActionText}>Add Shipping Address</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Payment Method</Text>
          </View>

          <View style={styles.sectionCard}>
            <View style={styles.paymentRow}>
              <View style={styles.paymentIcon}>
                <Ionicons
                  name="cash-outline"
                  size={23}
                  color={COLORS.primary}
                />
              </View>
              <Text style={styles.paymentName}>Cash on Delivery</Text>
              <Ionicons
                name="radio-button-on"
                size={22}
                color={COLORS.accent}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      <SafeAreaView edges={["bottom"]} style={bagStyles.summary}>
        <View style={bagStyles.totalRow}>
          <Text style={bagStyles.totalLabel}>Total price</Text>
          <Text style={bagStyles.totalPrice}>
            {totalPrice.toLocaleString("en-ph", {
              style: "currency",
              currency: "PHP",
            })}
          </Text>
        </View>

        <TouchableOpacity
          accessibilityRole="button"
          disabled={!canPlaceOrder}
          onPress={handlePlaceOrder}
          style={[
            bagStyles.checkoutButton,
            !canPlaceOrder && { opacity: 0.5 },
          ]}
        >
          <Text style={bagStyles.checkoutButtonText}>Place Order</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaView>
  );
}
