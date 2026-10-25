import { useWishlist } from "@/context/WishlistContext";
import AppBar from "@/components/AppBar";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import { BRANDS } from "@/data/brands";
import { PRODUCTS } from "@/data/products";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/theme/colors";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Wishlist() {
  const { wishlistIds, toggleWishlist } = useWishlist();
  const isEmpty = wishlistIds.length === 0;

  return (
    <SafeAreaView style={styles.phoneScreen}>
      {/* App Bar */}
      <AppBar title="My Wishlist" rightIcon="create-outline" />

      {/* Search Bar */}
      <SearchBar containerStyle={{ marginHorizontal: 20, marginTop: 16 }} />

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

      {/* Product Catalog / Empty State */}
      <View style={styles.catalogWrapper}>
        {isEmpty ? (
          <View style={styles.emptyWrapper}>
            <View style={styles.emptyContainer}>
              <View style={styles.emptyContent}>
                <Ionicons name="heart-outline" size={80} color={colors.textSecondary} />
                <Text style={styles.emptyTitle}>Your wishlist is empty</Text>
                <Text style={styles.emptySubtitle}>
                  Start adding your favorite shoes to your wishlist.
                </Text>
                <Pressable style={styles.emptyButton} onPress={() => router.replace("/tabs")}>
                  <Text style={styles.emptyButtonText}>Browse Products</Text>
                </Pressable>
              </View>
            </View>
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.productGrid}>
              {PRODUCTS.filter((product) => wishlistIds.includes(product.id)).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isInWishlist={wishlistIds.includes(product.id)}
                  onToggleWishlist={toggleWishlist}
                />
              ))}
            </View>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  phoneScreen: {
    flex: 1,
    backgroundColor: colors.background,
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
    borderColor: colors.textPrimary,
    backgroundColor: colors.textPrimary,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  allName: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.background,
  },
  brandCard: {
    height: 44,
    paddingHorizontal: 18,
    borderWidth: 2,
    borderColor: colors.textPrimary,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  brandName: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textPrimary,
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
  // ---------- Empty State ----------
  catalogWrapper: {
    flex: 1,
  },
  emptyWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyContent: {
    alignItems: "center",
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.textPrimary,
    marginTop: 16,
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: 6,
    lineHeight: 20,
  },
  emptyButton: {
    backgroundColor: colors.textPrimary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyButtonText: {
    color: colors.background,
    fontSize: 14,
    fontWeight: "600",
  },
});
