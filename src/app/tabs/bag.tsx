import Header from "@/components/Header";
import { styles } from "@/styles/bag.styles";
import { COLORS } from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useBag } from "@/context/BagContext";
import { PRODUCTS } from "@/data/products";

export default function Bag() {
  const { bagItems } = useBag();
  const isBagEmpty = bagItems.length === 0;

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.screen}>
      <StatusBar style="dark" />
      {/* App Bar */}
      <Header title="My Shopping Bag" showEdit />

      {isBagEmpty ? (
        <View style={styles.emptyState}>
          <Ionicons name="bag-outline" size={80} color={COLORS.secondary} />
          <Text style={styles.emptyTitle}>Your bag is empty</Text>
          <Text style={styles.emptySubtitle}>
            Add a pair of shoes and they’ll show up here.
          </Text>
          <Pressable
            style={styles.emptyButton}
            onPress={() => router.replace("/tabs")}
          >
            <Text style={styles.emptyButtonText}>Browse Products</Text>
          </Pressable>
        </View>
      ) : (
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
            {bagItems.map((bagItem) => {
              const product = PRODUCTS.find(
                (shoe) => shoe.id === bagItem.productId,
              );

              if (!product) return null;

              return (
                <View
                  key={`${bagItem.productId}-${bagItem.color}-${bagItem.size}`}
                  style={styles.productContainer}
                >
                  <View style={styles.productImageContainer}>
                    <Image
                      source={product.image}
                      style={styles.productImage}
                      resizeMode="contain"
                    />
                  </View>

                  {/* Product Details */}
                  <View style={styles.productDetails}>
                    <Text style={styles.productName} numberOfLines={3}>
                      {product.name}
                    </Text>
                    <Text style={styles.productBrand}>{product.brand}</Text>
                    <Text style={styles.productBrand}>
                      {bagItem.color} · Size {bagItem.size}
                    </Text>

                    {/* Bottom Row */}
                    <View style={styles.productBottomRow}>
                      <Text style={styles.productPrice}>{product.price}</Text>

                      {/* Quantity Controls */}
                      <View style={styles.quantityControls}>
                        <Pressable style={styles.quantityButton}>
                          <Ionicons
                            name="remove-outline"
                            size={16}
                            color={COLORS.primary}
                          />
                        </Pressable>

                        <Text style={styles.quantityText}>
                          {bagItem.quantity}
                        </Text>

                        <Pressable style={styles.quantityButton}>
                          <Ionicons
                            name="add-outline"
                            size={16}
                            color={COLORS.primary}
                          />
                        </Pressable>
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
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
        </>
      )}
    </SafeAreaView>
  );
}
