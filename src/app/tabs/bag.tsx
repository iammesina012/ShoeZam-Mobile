import { PRODUCTS } from "@/data/products";
import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Bag() {
  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.phoneScreen}>
      {/* App Bar */}
      <View style={styles.appBar}>
        <Text style={styles.appTitle}>Shopping Bag</Text>

        <Pressable style={styles.appBarButton}>
          <Ionicons name="create-outline" size={22} color="#9C2327" />
        </Pressable>
      </View>

      {/* Product Container */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {PRODUCTS.map((product) => (
          <View key={product.id} style={styles.productContainer}>        

            <View style={styles.productImageContainer}>
              <Image source={product.image} style={styles.productImage} resizeMode="contain" />
            </View>

            {/* Product Details */}
            <View style={styles.productDetails}>
              <Text style={styles.productName} numberOfLines={3}>
                {product.name}
              </Text>
              <Text style={styles.productBrand}>{product.brand}</Text>

              {/* Bottom Row */}
              <View style={styles.productBottomRow}>
                <Text style={styles.productPrice}>{product.price}</Text>

                {/* Quantity Controls */}
                <View style={styles.quantityControls}>
                  <Pressable style={styles.quantityButton}>
                    <Ionicons name="remove-outline" size={16} color="#000000" />
                  </Pressable>

                  <Text style={styles.quantityText}>1</Text>

                  <Pressable style={styles.quantityButton}>
                    <Ionicons name="add-outline" size={16} color="#000000" />
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Summary */}
      <View style={styles.summary}>
        <View style={styles.totalRow}>
          <View>
            <Text style={styles.totalLabel}>Total price</Text>
          </View>

          <Text style={styles.totalPrice}>₱0.00</Text>
        </View>

        <Pressable style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </Pressable>
      </View>
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  appBarButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  appTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
  },
  // ---------- Product Card ----------
  productContainer: {
    flexDirection: "row",
    minHeight: 100,
    marginTop: 16,
    marginHorizontal: 20,
    padding: 16,
    gap: 12,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },
  productImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 14,
    paddingHorizontal: 8,
    backgroundColor: "#F2F2F2",
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  // ---------- Product Details ----------
  productDetails: {
    flex: 1,
    flexDirection: "column",
  },
  productName: {
    fontWeight: "bold",
    color: "#000000",
  },
  productBrand: {
    fontWeight: "normal",
    color: "#9E9E9E",
  },
  // ---------- Bottom Row ----------
  productBottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#9C2327",
    flexShrink: 1,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    padding: 6,
    backgroundColor: "#F2F2F2",
    borderRadius: 14,
    gap: 10,
  },
  quantityButton: {
    width: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  quantityText: {
    fontSize: 14,
    fontWeight: "normal",
    color: "#000000",
  },
  // ---------- Summary ----------
  summary: {
    backgroundColor: "#FFFFFF",
    marginTop: 14,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  totalLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000000",
  },

  totalPrice: {
    fontSize: 18,
    color: "#000000",
  },

  checkoutButton: {
    backgroundColor: "#9C2327",
    borderRadius: 4,
    marginTop: 16,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  checkoutButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
  },
});
