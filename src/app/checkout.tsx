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
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PRODUCTS } from "@/data/products";
import { useOrders } from "@/context/OrderContext";
import { usePayment } from "@/context/PaymentContext";
import { PAYMENT_METHODS } from "@/data/paymentMethods";

export default function Checkout() {
  const { bagItems, clearBag } = useBag();
  const { selectedAddress } = useAddress();
  const { createOrder } = useOrders();
  const { selectedPaymentMethodId } = usePayment();
  const selectedPaymentMethod = PAYMENT_METHODS.find(
    (method) => method.id === selectedPaymentMethodId,
  );

  const totalPrice = bagItems.reduce((total, bagItem) => {
    const product = PRODUCTS.find((item) => item.id === bagItem.productId);
    return product ? total + product.price * bagItem.quantity : total;
  }, 0);
  const canPlaceOrder =
    bagItems.length > 0 &&
    selectedAddress !== null &&
    selectedPaymentMethod?.available === true;

  function handlePlaceOrder() {
    if (!canPlaceOrder || !selectedPaymentMethod) return;

    const orderItems = bagItems.map((bagItem) => {
      const product = PRODUCTS.find((item) => item.id === bagItem.productId);

      if (!product) {
        throw new Error(`Product ${bagItem.productId} was not found.`);
      }

      return {
        productId: bagItem.productId,
        productName: product.name,
        image: product.image,
        color: bagItem.color,
        size: bagItem.size,
        quantity: bagItem.quantity,
        unitPrice: product.price,
      };
    });

    createOrder({
      items: orderItems,
      total: totalPrice,
      paymentMethod: selectedPaymentMethod.label,
    });
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

          <Pressable
            accessibilityLabel={`Payment method: ${selectedPaymentMethod?.label ?? "not selected"}. Change payment method.`}
            accessibilityRole="button"
            onPress={() => router.push("/payment-method-selection")}
            style={styles.sectionCard}
          >
            <View style={styles.paymentRow}>
              <View style={styles.paymentIcon}>
                <Ionicons
                  name={selectedPaymentMethod?.icon ?? "cash-outline"}
                  size={23}
                  color={COLORS.primary}
                />
              </View>
              <View style={styles.paymentDetails}>
                <Text style={styles.paymentName}>
                  {selectedPaymentMethod?.label ?? "Choose a payment method"}
                </Text>
                <Text style={styles.paymentDescription}>
                  {selectedPaymentMethod?.description}
                </Text>
              </View>
              <Text style={styles.paymentAction}>Change</Text>
            </View>
          </Pressable>
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
