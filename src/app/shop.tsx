import CatalogControls, {
  type CatalogFilterSection,
} from "@/components/CatalogControls";
import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import { PRODUCTS } from "@/data/products";
import { styles } from "@/styles/catalog.styles";
import {
  CATALOG_SORT_OPTIONS,
  filterCatalogProducts,
  getCatalogOptions,
  sortCatalogProducts,
} from "@/utils/catalog";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

export default function ShopAll() {
  // remember the chosen filters and sort while this screen is open.
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState("name-ascending");

  const { colors, sizes } = getCatalogOptions(PRODUCTS);
  const filterSections: CatalogFilterSection[] = [
    {
      id: "colors",
      title: "Color",
      options: colors,
      selectedValues: selectedColors,
    },
    {
      id: "sizes",
      title: "Size",
      options: sizes,
      selectedValues: selectedSizes,
      isSize: true,
    },
  ];

  function getFilteredProducts(filters: Record<string, string[]>) {
    return filterCatalogProducts(PRODUCTS, filters);
  }

  const sortedProducts = sortCatalogProducts(
    getFilteredProducts({
      colors: selectedColors,
      sizes: selectedSizes,
    }),
    sortOption,
  );

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.screen}>
      <StatusBar style="dark" />
      {/* return to home even when this screen was opened directly. */}
      <Header
        title="All Products"
        centerTitle
        showBack
        showBag
        onBackPress={() => router.replace("/tabs")}
      />

      {/* reuse the same filter and sort sheets as the other catalog screens. */}
      <CatalogControls
        filterSections={filterSections}
        getResultCount={(filters) => getFilteredProducts(filters).length}
        onApplyFilters={(filters) => {
          setSelectedColors(filters.colors ?? []);
          setSelectedSizes(filters.sizes ?? []);
        }}
        sortOptions={CATALOG_SORT_OPTIONS}
        selectedSort={sortOption}
        onSortChange={setSortOption}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {sortedProducts.length > 0 ? (
          <ProductGrid products={sortedProducts} style={styles.productGrid} />
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyMessage}>
              No products match the selected color and size.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
