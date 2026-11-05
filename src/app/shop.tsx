import CatalogControls, {
  type CatalogFilterSection,
  type CatalogSortOption,
} from "@/components/CatalogControls";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { useWishlist } from "@/context/WishlistContext";
import { PRODUCTS } from "@/data/products";
import { styles } from "@/styles/catalog.styles";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

const SORT_OPTIONS: CatalogSortOption[] = [
  { label: "A-Z", value: "name-ascending" },
  { label: "Z-A", value: "name-descending" },
  { label: "Price: Low to High", value: "price-ascending" },
  { label: "Price: High to Low", value: "price-descending" },
];

export default function ShopAll() {
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState("name-ascending");
  const { wishlistIds, toggleWishlist } = useWishlist();

  const colors = [
    ...new Set(
      PRODUCTS.flatMap((product) =>
        product.colors.map((color) => color.name),
      ),
    ),
  ].sort();
  const sizes = [
    ...new Set(PRODUCTS.flatMap((product) => product.sizes)),
  ].sort((first, second) => Number(first) - Number(second));
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
    const colorFilters = filters.colors ?? [];
    const sizeFilters = filters.sizes ?? [];
    return PRODUCTS.filter(
      (product) =>
        (colorFilters.length === 0 ||
          product.colors.some((color) => colorFilters.includes(color.name))) &&
        (sizeFilters.length === 0 ||
          product.sizes.some((size) => sizeFilters.includes(size))),
    );
  }

  const filteredProducts = getFilteredProducts({
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
    <SafeAreaView edges={["top", "left", "right"]} style={styles.screen}>
      <StatusBar style="dark" />
      <Header
        title="All Products"
        centerTitle
        showBack
        showBag
        onBackPress={() => router.replace("/tabs")}
      />

      <CatalogControls
        filterSections={filterSections}
        getResultCount={(filters) => getFilteredProducts(filters).length}
        onApplyFilters={(filters) => {
          setSelectedColors(filters.colors ?? []);
          setSelectedSizes(filters.sizes ?? []);
        }}
        sortOptions={SORT_OPTIONS}
        selectedSort={sortOption}
        onSortChange={setSortOption}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {sortedProducts.length > 0 ? (
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
