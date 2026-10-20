import { useWishlist } from "@/context/WishlistContext";
import { BRANDS } from "@/data/brands";
import { PRODUCTS } from "@/data/products";
import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Wishlist() {
  const { wishlistIds, toggleWishlist } = useWishlist();

  return (
    <SafeAreaView style={styles.phoneScreen}>
      {/* App Bar */}
      <View style={styles.appBar}>
        <Text style={styles.appTitle}>My Wishlist</Text>

        <Pressable style={styles.appBarButton}>
          <Ionicons name="create-outline" size={22} color="#9C2327" />
        </Pressable>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor="#9E9E9E"
        />

        <Ionicons name="search-outline" size={20} color="#9E9E9E" />
      </View>

      {/* Brand Carousel */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.brandScrollView}
        contentContainerStyle={styles.brandScrollContainer}
      >
        <Pressable style={styles.allCard}>
          <Text style={styles.allName}>All</Text>
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
          {PRODUCTS.filter((product) => wishlistIds.includes(product.id)).map((product) => (
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

                <Pressable onPress={() => toggleWishlist(product.id)} style={styles.wishListButton}>
                  <Ionicons
                    name={wishlistIds.includes(product.id) ? "heart" : "heart-outline"}
                    size={18}
                    color={wishlistIds.includes(product.id) ? "red" : "#000000"}
                  />
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
    backgroundColor: "#FFFFFF",
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
  // ---------- Search Bar ----------
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
    marginHorizontal: 20,
    marginTop: 16,
    paddingHorizontal: 16,
    height: 48,
    borderRadius: 14,
  },
  searchInput: {
    flex: 1,
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
    gap: 8,
    alignItems: "center",
  },
  allCard: {
    height: 44,
    paddingHorizontal: 18,
    borderWidth: 2,
    borderColor: "#000000",
    backgroundColor: "#000000",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  allName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  brandCard: {
    height: 44,
    paddingHorizontal: 18,
    borderWidth: 2,
    borderColor: "#000000",
    borderRadius: 24,
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
    backgroundColor: "#F2F2F2",
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
  wishListButton: {
    width: 32,
    height: 32,
    backgroundColor: "#F2F2F2",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
