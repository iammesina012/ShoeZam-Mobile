import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import { useWishlist } from "@/context/WishlistContext";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/theme/colors";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

export default function SearchResults() {
  const { query: routeQuery } = useLocalSearchParams<{ query?: string }>();
  const [searchQuery, setSearchQuery] = useState(routeQuery ?? "");
  const { wishlistIds, toggleWishlist } = useWishlist();
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredProducts = PRODUCTS.filter(
    (product) =>
      product.name.toLowerCase().includes(normalizedQuery) ||
      product.brand.toLowerCase().includes(normalizedQuery),
  );

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="dark" />
      {/* Search Bar + Sort & Filter Button */}
      <View style={styles.shopHeader}>
        <SearchBar
          containerStyle={{ flex: 1 }}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={() => setSearchQuery((current) => current.trim())}
        />
        <Pressable style={styles.sortAndFilterButton}>
          <Ionicons name="options-outline" size={22} color={COLORS.accent} />
        </Pressable>
      </View>

      {/* Result Text */}
      <View style={styles.resultText}>
        <Text style={styles.resultsFor}>
          {normalizedQuery
            ? `Results for "${searchQuery.trim()}"`
            : "All products"}
        </Text>
        <Text style={styles.noOfFound}>{filteredProducts.length} found</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product Catalog */}
        <View style={styles.productCatalogSection}>
          <View style={styles.productGrid}>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isInWishlist={wishlistIds.includes(product.id)}
                onToggleWishlist={toggleWishlist}
                onPress={() => router.push(`/product/${product.id}`)}
              />
            ))}
          </View>
          {filteredProducts.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>No products found</Text>
              <Text style={styles.emptyMessage}>
                Try a different product name or brand.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  shopHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 16,
    gap: 12,
  },
  // ---------- Sort & Filter Button ----------
  sortAndFilterButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  resultText: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
    paddingHorizontal: 20,
  },
  resultsFor:{
    fontSize: 16,
    fontWeight: "bold",
  },
  noOfFound: {
    fontWeight: "bold",
  },
  // ---------- Product Catalog ----------
  productCatalogSection: {
    marginTop: 0,
  },
  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 14,
    paddingHorizontal: 20,
    rowGap: 20,
  },
  emptyState: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 48,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  emptyMessage: {
    marginTop: 8,
    color: COLORS.secondary,
    textAlign: "center",
  },
});
