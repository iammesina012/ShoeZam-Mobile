import { PRODUCTS } from "@/data/products";
import AppBar from "@/components/AppBar";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/theme/colors";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Bag() {
  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.phoneScreen}>
      {/* App Bar */}
      <AppBar title="Shopping Bag" rightIcon="create-outline" />

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
                    <Ionicons name="remove-outline" size={16} color={colors.textPrimary} />
                  </Pressable>

                  <Text style={styles.quantityText}>1</Text>

                  <Pressable style={styles.quantityButton}>
                    <Ionicons name="add-outline" size={16} color={colors.textPrimary} />
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
    backgroundColor: colors.surface,
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
    backgroundColor: colors.background,
    alignItems: "center",
  },
  productImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 14,
    paddingHorizontal: 8,
    backgroundColor: colors.surface,
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
    color: colors.textPrimary,
  },
  productBrand: {
    fontWeight: "normal",
    color: colors.textSecondary,
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
    color: colors.brand,
    flexShrink: 1,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    padding: 6,
    backgroundColor: colors.surface,
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
    color: colors.textPrimary,
  },
  // ---------- Summary ----------
  summary: {
    backgroundColor: colors.background,
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
    color: colors.textPrimary,
  },

  totalPrice: {
    fontSize: 18,
    color: colors.textPrimary,
  },

  checkoutButton: {
    backgroundColor: colors.brand,
    borderRadius: 4,
    marginTop: 16,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  checkoutButtonText: {
    color: colors.background,
    fontSize: 14,
    fontWeight: "500",
  },
});
