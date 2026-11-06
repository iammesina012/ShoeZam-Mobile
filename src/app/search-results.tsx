import { PRODUCTS } from "@/data/products";
import SearchBar from "@/components/SearchBar";
import CatalogControls, {
  type CatalogFilterSection,
} from "@/components/CatalogControls";
import ProductGrid from "@/components/ProductGrid";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/theme/colors";
import {
  CATALOG_SORT_OPTIONS,
  filterCatalogProducts,
  getCatalogOptions,
  sortCatalogProducts,
} from "@/utils/catalog";
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

export default function SearchResults() {
  // reads the search text sent from the home screen.
  const { query: routeQuery } = useLocalSearchParams<{ query?: string }>();
  const [searchQuery, setSearchQuery] = useState(routeQuery ?? "");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  // show products in name order until another sort option is chosen.
  const [sortOption, setSortOption] = useState("name-ascending");

  // compare lowercase text so searches ignore capitalization.
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const matchingProducts = PRODUCTS.filter(
    (product) =>
      product.name.toLowerCase().includes(normalizedQuery) ||
      product.brand.toLowerCase().includes(normalizedQuery),
  );

  const { brands, colors, sizes } = getCatalogOptions(PRODUCTS);
  // describe the filter groups and their current selections.
  const filterSections: CatalogFilterSection[] = [
    { id: "brands", title: "Brand", options: brands, selectedValues: selectedBrands },
    { id: "colors", title: "Color", options: colors, selectedValues: selectedColors },
    { id: "sizes", title: "Size", options: sizes, selectedValues: selectedSizes, isSize: true },
  ];

  // each active filter group must match; within a group, any selected option can match.
  function getFilteredProducts(filters: Record<string, string[]>) {
    return filterCatalogProducts(matchingProducts, filters);
  }

  const sortedProducts = sortCatalogProducts(
    getFilteredProducts({
      brands: selectedBrands,
      colors: selectedColors,
      sizes: selectedSizes,
    }),
    sortOption,
  );

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="dark" />
      {/* back button, search bar, and bag. */}
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

      {/* connects the filter and sort sheets to this screen's product state. */}
      <CatalogControls
        filterSections={filterSections}
        getResultCount={(filters) => getFilteredProducts(filters).length}
        onApplyFilters={(filters) => {
          setSelectedBrands(filters.brands ?? []);
          setSelectedColors(filters.colors ?? []);
          setSelectedSizes(filters.sizes ?? []);
        }}
        sortOptions={CATALOG_SORT_OPTIONS}
        selectedSort={sortOption}
        onSortChange={setSortOption}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product Catalog */}
        <View style={styles.productCatalogSection}>
          <ProductGrid products={sortedProducts} style={styles.productGrid} />
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
