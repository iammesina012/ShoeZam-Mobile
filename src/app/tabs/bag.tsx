import { PRODUCTS } from "@/data/products";
import AppBar from "@/components/AppBar";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/theme/colors";
import { styles } from "@/styles/bag.styles";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Bag() {
  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.screen}>
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
