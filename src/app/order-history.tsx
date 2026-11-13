import CheckoutHeader from "@/components/CheckoutHeader";
import { useOrders } from "@/context/OrderContext";
import { COLORS } from "@/theme/colors";
import type { OrderStatus } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "@/styles/order-history.styles";

const STATUS_STYLES: Record<
  OrderStatus,
  { backgroundColor: string; color: string; label: string }
> = {
  placed: { backgroundColor: "#FFF4E5", color: "#A15C00", label: "Placed" },
  processing: {
    backgroundColor: "#EAF2FF",
    color: "#2459A6",
    label: "Processing",
  },
  shipping: {
    backgroundColor: "#EDEBFF",
    color: "#5B4BA6",
    label: "Shipping",
  },
  delivered: {
    backgroundColor: "#E8F5E9",
    color: "#2E7D32",
    label: "Delivered",
  },
  cancelled: {
    backgroundColor: "#FDECEC",
    color: COLORS.accent,
    label: "Cancelled",
  },
};

function formatCurrency(amount: number) {
  return amount.toLocaleString("en-PH", {
    style: "currency",
    currency: "PHP",
  });
}

export default function OrderHistory() {
  const { orders } = useOrders();

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="dark" />
      <CheckoutHeader
        title="Order History"
        backIconSize={20}
        onBackPress={() => router.replace("/tabs/account")}
      />

      {orders.length > 0 ? (
        <ScrollView
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        >
          {orders.map((order) => {
            const statusStyle = STATUS_STYLES[order.status];
            const itemCount = order.items.reduce(
              (total, item) => total + item.quantity,
              0,
            );

            return (
              <View key={order.id} style={styles.orderCard}>
                <View style={styles.orderHeader}>
                  <View style={styles.orderHeading}>
                    <Text style={styles.orderId}>Order #{order.id}</Text>
                    <Text style={styles.orderDate}>
                      {new Date(order.date)
                        .toLocaleDateString("en-PH", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                        .replace(" ", ". ")}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.statusBadge,
                      { backgroundColor: statusStyle.backgroundColor },
                    ]}
                  >
                    <Text style={[styles.statusText, { color: statusStyle.color }]}>
                      {statusStyle.label}
                    </Text>
                  </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.products}>
                  {order.items.map((item) => (
                    <View
                      key={`${item.productId}-${item.color}-${item.size}`}
                      style={styles.productRow}
                    >
                      <View style={styles.productImageContainer}>
                        <Image
                          source={item.image}
                          style={styles.productImage}
                          resizeMode="contain"
                        />
                      </View>
                      <View style={styles.productInfo}>
                        <Text numberOfLines={2} style={styles.productName}>
                          {item.productName}
                        </Text>
                        <Text style={styles.productVariant}>
                          Color:{" "}
                          <Text style={styles.productVariantValue}>
                            {item.color}
                          </Text>
                          {" · "}Size:{" "}
                          <Text style={styles.productVariantValue}>
                            {item.size}
                          </Text>
                        </Text>
                        {item.quantity > 1 && (
                          <Text style={styles.productQuantity}>
                            Qty: {item.quantity}
                          </Text>
                        )}
                      </View>
                    </View>
                  ))}
                </View>

                <View style={styles.divider} />

                <Text style={styles.paymentMethod}>
                  Payment Method:{" "}
                  <Text style={styles.paymentMethodValue}>
                    {order.paymentMethod}
                  </Text>
                </Text>
                <View style={styles.orderSummary}>
                  <Text style={styles.itemCount}>Items: {itemCount}</Text>
                  <View style={styles.totalContainer}>
                    <Text style={styles.totalPrice}>
                      {formatCurrency(order.total)}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
      ) : (
        <View style={styles.emptyState}>
          <Ionicons name="receipt-outline" size={80} color={COLORS.secondary} />
          <Text style={styles.emptyTitle}>No orders yet</Text>
          <Text style={styles.emptyMessage}>
            Your orders will appear here.
          </Text>
          <Pressable
            accessibilityRole="button"
            onPress={() => router.replace("/tabs")}
            style={styles.emptyButton}
          >
            <Text style={styles.emptyButtonText}>Continue Shopping</Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
}
