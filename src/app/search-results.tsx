import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import CatalogControls, {
  type CatalogFilterSection,
  type CatalogSortOption,
} from "@/components/CatalogControls";
import { useWishlist } from "@/context/WishlistContext";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/theme/colors";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

const SORT_OPTIONS: CatalogSortOption[] = [
  { label: "Name: A - Z", value: "name-ascending" },
  { label: "Name: Z - A", value: "name-descending" },
  { label: "Price: low to high", value: "price-ascending" },
  { label: "Price: high to low", value: "price-descending" },
];

export default function SearchResults() {
  const { query: routeQuery } = useLocalSearchParams<{ query?: string }>();
  const [searchQuery, setSearchQuery] = useState(routeQuery ?? "");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState("name-ascending");

  const { wishlistIds, toggleWishlist } = useWishlist();
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const matchingProducts = PRODUCTS.filter(
    (product) =>
      product.name.toLowerCase().includes(normalizedQuery) ||
      product.brand.toLowerCase().includes(normalizedQuery),
  );

  const brands = [...new Set(PRODUCTS.map((product) => product.brand))].sort();
  const colors = [
    ...new Set(PRODUCTS.flatMap((product) => product.colors.map((color) => color.name))),
  ].sort();
  const sizes = [
    ...new Set(PRODUCTS.flatMap((product) => product.sizes)),
  ].sort((first, second) => Number(first) - Number(second));
  const filterSections: CatalogFilterSection[] = [
    { id: "brands", title: "Brand", options: brands, selectedValues: selectedBrands },
    { id: "colors", title: "Color", options: colors, selectedValues: selectedColors },
    { id: "sizes", title: "Size", options: sizes, selectedValues: selectedSizes, isSize: true },
  ];

  function getFilteredProducts(filters: Record<string, string[]>) {
    const brandFilters = filters.brands ?? [];
    const colorFilters = filters.colors ?? [];
    const sizeFilters = filters.sizes ?? [];
    return matchingProducts.filter(
      (product) =>
        (brandFilters.length === 0 || brandFilters.includes(product.brand)) &&
        (colorFilters.length === 0 ||
          product.colors.some((color) => colorFilters.includes(color.name))) &&
        (sizeFilters.length === 0 ||
          product.sizes.some((size) => sizeFilters.includes(size))),
    );
  }

  const filteredProducts = getFilteredProducts({
    brands: selectedBrands,
    colors: selectedColors,
    sizes: selectedSizes,
  });
  const sortedProducts = [...filteredProducts].sort((first, second) => {
    if (sortOption === "price-ascending") return first.price - second.price;
    if (sortOption === "price-descending") return second.price - first.price;
    if (sortOption === "name-descending") {
      return second.name.localeCompare(first.name);
    }
    return first.name.localeCompare(second.name);
  });

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="dark" />
      {/* Back Button, Search Bar, and Bag */}
      <View style={styles.shopHeader}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => router.back()}
        >
          <Ionicons
            name="arrow-back-outline"
            size={24}
            color={COLORS.primary}
          />
        </TouchableOpacity>

        <SearchBar
          containerStyle={{ flex: 1 }}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={() => setSearchQuery((current) => current.trim())}
        />

        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => router.push("/tabs/bag")}
        >
          <Ionicons name="bag-outline" size={24} color={COLORS.accent} />
        </TouchableOpacity>
      </View>

      <CatalogControls
        filterSections={filterSections}
        getResultCount={(filters) => getFilteredProducts(filters).length}
        onApplyFilters={(filters) => {
          setSelectedBrands(filters.brands ?? []);
          setSelectedColors(filters.colors ?? []);
          setSelectedSizes(filters.sizes ?? []);
        }}
        sortOptions={SORT_OPTIONS}
        selectedSort={sortOption}
        onSortChange={setSortOption}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product Catalog */}
        <View style={styles.productCatalogSection}>
          <View style={styles.productGrid}>
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isInWishlist={wishlistIds.includes(product.id)}
                onToggleWishlist={toggleWishlist}
                onPress={() => router.push(`/product/${product.id}`)}
              />
            ))}
          </View>
          {sortedProducts.length === 0 && (
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
    gap: 8,
  },
  headerButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
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
