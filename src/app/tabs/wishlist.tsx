import SearchBar from "@/components/SearchBar";
import { BRANDS } from "@/data/brands";
import { PRODUCTS } from "@/data/products";
import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Wishlist() {
  return (
    <SafeAreaView style={styles.phoneScreen}>
      {/* App Bar */}
      <View style={styles.appBar}>
        <Pressable style={styles.appBarButton}>
          <Ionicons name="arrow-back-outline" size={24} color="#000000" />
        </Pressable>

        <Text style={styles.appTitle}>My Wishlist</Text>

        <Pressable style={styles.appBarButton}>
          <Ionicons name="create-outline" size={22} color="#9C2327" />
        </Pressable>
      </View>

      {/* Search Bar */}
      <SearchBar />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.brandScrollView}
        contentContainerStyle={styles.brandScrollContainer}
      >
        <Pressable style={styles.brandCard}>
          <Text style={styles.brandName}>All</Text>
        </Pressable>
        {BRANDS.map((brand) => (
          <Pressable key={brand.id} style={styles.brandCard}>
            <Text style={styles.brandName}>{brand.name}</Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Product Catalog */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.productGrid}>
          {PRODUCTS.map((product) => (
            <Pressable key={product.id} style={styles.productCard}>
              {/* Top White Image Box */}
              <View style={styles.productImageContainer}>
                <Image source={product.image} style={styles.productImage} resizeMode="contain" />
              </View>

              {/* Middle Shoe Title */}
              <Text style={styles.productName} numberOfLines={2}>
                {product.name}
              </Text>

              {/* Bottom Row: Price (Left) + Heart Button (Right) */}
              <View style={styles.productBottomRow}>
                <Text style={styles.productPrice}>{product.price}</Text>

                <Pressable style={styles.cartButton}>
                  <Ionicons name="cart-outline" size={18} color="#FFFFFF" />
                </Pressable>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
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
    paddingHorizontal: 16,
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
  // ---------- Brand Carousel ----------
  brandScrollView: {
    flexGrow: 0,
    flexShrink: 0,
    marginTop: 14,
  },
  brandScrollContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 12,
    alignItems: "center",
  },
  brandCard: {
    height: 44,
    paddingHorizontal: 18,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  brandName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000000",
  },
  // ---------- Product Catalog ----------
  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 16,
    paddingHorizontal: 20,
    rowGap: 20,
  },
  productCard: {
    width: "48%",
  },
  productImageContainer: {
    width: "100%",
    height: 150,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  productName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000000",
    marginTop: 8,
    minHeight: 38,
  },
  productBottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#9C2327",
  },
  cartButton: {
    width: 32,
    height: 32,
    backgroundColor: "#9C2327",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
