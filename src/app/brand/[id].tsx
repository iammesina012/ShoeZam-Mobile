import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import CatalogControls, {
  type CatalogFilterSection,
} from "@/components/CatalogControls";
import { BRANDS } from "@/data/brands";
import { PRODUCTS } from "@/data/products";
import { styles } from "@/styles/brand.styles";
import {
  CATALOG_SORT_OPTIONS,
  filterCatalogProducts,
  getCatalogOptions,
  sortCatalogProducts,
} from "@/utils/catalog";
import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

export default function BrandCollection() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  // use the brand id from the route to get its name and products.
  const brand = BRANDS.find((item) => item.id === id);
  const brandProducts = brand
    ? PRODUCTS.filter((product) => product.brand === brand.name)
    : [];
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState("name-ascending");

  const { colors, sizes } = getCatalogOptions(brandProducts);
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
    return filterCatalogProducts(brandProducts, filters);
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
      <Header
        title={brand?.name ?? "Brand not found"}
        centerTitle
        showBack
        showBag
      />

      {brand ? (
        brandProducts.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyMessage}>
              No products are available for this brand yet.
            </Text>
          </View>
        ) : (
          <>
            {/* use the shared filter and sort controls for this brand. */}
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
                <ProductGrid
                  products={sortedProducts}
                  style={styles.productGrid}
                />
              ) : (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyMessage}>
                    No products match the selected color and size.
                  </Text>
                </View>
              )}
            </ScrollView>
          </>
        )
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyMessage}>
            We couldn&apos;t find that brand.
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}
