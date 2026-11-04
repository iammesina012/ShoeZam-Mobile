import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import { useWishlist } from "@/context/WishlistContext";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/theme/colors";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Animated,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";

type SortOption =
  | "name-ascending"
  | "name-descending"
  | "price-ascending"
  | "price-descending";

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: "Name: A - Z", value: "name-ascending" },
  { label: "Name: Z - A", value: "name-descending" },
  { label: "Price: low to high", value: "price-ascending" },
  { label: "Price: high to low", value: "price-descending" },
];

export default function SearchResults() {
  const { query: routeQuery } = useLocalSearchParams<{ query?: string }>();
  const [searchQuery, setSearchQuery] = useState(routeQuery ?? "");
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [isSortVisible, setIsSortVisible] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [draftBrands, setDraftBrands] = useState<string[]>([]);
  const [draftColors, setDraftColors] = useState<string[]>([]);
  const [draftSizes, setDraftSizes] = useState<string[]>([]);
  const [sortOption, setSortOption] =
    useState<SortOption>("name-ascending");
  const [filterSheetTranslateY] = useState(() => new Animated.Value(1000));
  const [sortSheetTranslateY] = useState(() => new Animated.Value(1000));

  useEffect(() => {
    if (isFilterVisible) {
      Animated.spring(filterSheetTranslateY, {
        toValue: 0,
        damping: 24,
        stiffness: 200,
        useNativeDriver: true,
      }).start();
    } else {
      filterSheetTranslateY.setValue(1000);
    }
  }, [filterSheetTranslateY, isFilterVisible]);

  useEffect(() => {
    if (isSortVisible) {
      Animated.spring(sortSheetTranslateY, {
        toValue: 0,
        damping: 24,
        stiffness: 200,
        useNativeDriver: true,
      }).start();
    } else {
      sortSheetTranslateY.setValue(1000);
    }
  }, [isSortVisible, sortSheetTranslateY]);

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
  const filterSections = [
    { title: "Brand", options: brands, selected: draftBrands, setSelected: setDraftBrands },
    { title: "Color", options: colors, selected: draftColors, setSelected: setDraftColors },
    { title: "Size", options: sizes, selected: draftSizes, setSelected: setDraftSizes },
  ];

  function getFilteredProducts(
    brandFilters: string[],
    colorFilters: string[],
    sizeFilters: string[],
  ) {
    return matchingProducts.filter(
      (product) =>
        (brandFilters.length === 0 || brandFilters.includes(product.brand)) &&
        (colorFilters.length === 0 ||
          product.colors.some((color) => colorFilters.includes(color.name))) &&
        (sizeFilters.length === 0 ||
          product.sizes.some((size) => sizeFilters.includes(size))),
    );
  }

  const filteredProducts = getFilteredProducts(
    selectedBrands,
    selectedColors,
    selectedSizes,
  );
  const draftResultCount = getFilteredProducts(
    draftBrands,
    draftColors,
    draftSizes,
  ).length;
  const sortedProducts = [...filteredProducts].sort((first, second) => {
    if (sortOption === "price-ascending") return first.price - second.price;
    if (sortOption === "price-descending") return second.price - first.price;
    if (sortOption === "name-descending") {
      return second.name.localeCompare(first.name);
    }
    return first.name.localeCompare(second.name);
  });

  function toggleOption(
    value: string,
    selectedValues: string[],
    setSelectedValues: (values: string[]) => void,
  ) {
    setSelectedValues(
      selectedValues.includes(value)
        ? selectedValues.filter((selectedValue) => selectedValue !== value)
        : [...selectedValues, value],
    );
  }

  function openFilters() {
    setDraftBrands([...selectedBrands]);
    setDraftColors([...selectedColors]);
    setDraftSizes([...selectedSizes]);
    setIsFilterVisible(true);
  }

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="dark" />
      {/* Back Button, Search Bar, and Bag */}
      <View style={styles.shopHeader}>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Go back"
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
          accessibilityRole="button"
          accessibilityLabel="Open shopping bag"
          style={styles.headerButton}
          onPress={() => router.push("/tabs/bag")}
        >
          <Ionicons name="bag-outline" size={24} color={COLORS.accent} />
        </TouchableOpacity>
      </View>

      <View style={styles.catalogControls}>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Filter products"
          style={styles.catalogControlButton}
          onPress={openFilters}
        >
          <Ionicons name="options-outline" size={20} color={COLORS.accent} />
          <Text style={styles.catalogControlText}>Filter</Text>
        </TouchableOpacity>

        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Sort products"
          style={styles.catalogControlButton}
          onPress={() => setIsSortVisible(true)}
        >
          <Ionicons
            name="swap-vertical-outline"
            size={20}
            color={COLORS.accent}
          />
          <Text style={styles.catalogControlText}>Sort by</Text>
        </TouchableOpacity>
      </View>

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

      <Modal
        visible={isFilterVisible}
        transparent
        animationType="none"
        onRequestClose={() => setIsFilterVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <Animated.View
            style={[
              styles.bottomSheet,
              { transform: [{ translateY: filterSheetTranslateY }] },
            ]}
          >
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>Filter</Text>
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityLabel="Close filters"
                style={styles.closeButton}
                onPress={() => setIsFilterVisible(false)}
              >
                <Ionicons name="close" size={24} color={COLORS.primary} />
              </TouchableOpacity>
            </View>

            <ScrollView
              style={styles.filterOptions}
              showsVerticalScrollIndicator={false}
            >
              {filterSections.map((section) => (
                <View key={section.title}>
                  <Text style={styles.filterSectionTitle}>
                    {section.title}
                  </Text>
                  <View style={styles.optionList}>
                    {section.options.map((option) => {
                      const isSelected = section.selected.includes(option);
                      return (
                        <TouchableOpacity
                          key={option}
                          accessibilityRole="button"
                          accessibilityState={{ selected: isSelected }}
                          style={[
                            styles.filterOption,
                            section.title === "Size" &&
                              styles.sizeFilterOption,
                            isSelected && styles.selectedFilterOption,
                          ]}
                          onPress={() =>
                            toggleOption(
                              option,
                              section.selected,
                              section.setSelected,
                            )
                          }
                        >
                          <Text
                            style={[
                              styles.filterOptionText,
                              isSelected && styles.selectedFilterOptionText,
                            ]}
                          >
                            {option}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              ))}
            </ScrollView>

            <View style={styles.filterFooter}>
              <TouchableOpacity
                style={styles.clearButton}
                onPress={() => {
                  setDraftBrands([]);
                  setDraftColors([]);
                  setDraftSizes([]);
                }}
              >
                <Text style={styles.clearButtonText}>Clear</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.applyButton}
                onPress={() => {
                  setSelectedBrands([...draftBrands]);
                  setSelectedColors([...draftColors]);
                  setSelectedSizes([...draftSizes]);
                  setIsFilterVisible(false);
                }}
              >
                <Text style={styles.applyButtonText}>
                  Show {draftResultCount}{" "}
                  {draftResultCount === 1 ? "product" : "products"}
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>

      <Modal
        visible={isSortVisible}
        transparent
        animationType="none"
        onRequestClose={() => setIsSortVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <Animated.View
            style={[
              styles.sortSheet,
              { transform: [{ translateY: sortSheetTranslateY }] },
            ]}
          >
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>Sort by</Text>
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityLabel="Close sort options"
                style={styles.closeButton}
                onPress={() => setIsSortVisible(false)}
              >
                <Ionicons name="close" size={24} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
            {SORT_OPTIONS.map((option) => {
              const isSelected = sortOption === option.value;
              return (
                <TouchableOpacity
                  key={option.value}
                  accessibilityRole="button"
                  accessibilityState={{ selected: isSelected }}
                  style={styles.sortOption}
                  onPress={() => {
                    setSortOption(option.value);
                    setIsSortVisible(false);
                  }}
                >
                  <Text style={styles.sortOptionText}>{option.label}</Text>
                  {isSelected && (
                    <Ionicons
                      name="checkmark"
                      size={22}
                      color={COLORS.accent}
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </Animated.View>
        </View>
      </Modal>
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
  catalogControls: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
  },
  catalogControlButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    minHeight: 48,
  },
  catalogControlText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: COLORS.overlay,
  },
  bottomSheet: {
    maxHeight: "85%",
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 8,
    paddingBottom: 24,
  },
  sortSheet: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 8,
    paddingBottom: 24,
  },
  sheetHeader: {
    position: "relative",
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.primary,
    textAlign: "center",
  },
  closeButton: {
    position: "absolute",
    right: 20,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  filterOptions: {
    paddingHorizontal: 20,
  },
  filterSectionTitle: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.primary,
  },
  optionList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  filterOption: {
    minHeight: 40,
    justifyContent: "center",
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#D5D5D5",
    borderRadius: 20,
  },
  sizeFilterOption: {
    minWidth: 48,
    alignItems: "center",
  },
  selectedFilterOption: {
    borderColor: COLORS.accent,
    backgroundColor: COLORS.accent,
  },
  filterOptionText: {
    color: COLORS.primary,
    fontSize: 14,
  },
  selectedFilterOptionText: {
    color: COLORS.background,
  },
  filterFooter: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5E5EA",
  },
  clearButton: {
    minWidth: 96,
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#D5D5D5",
    borderRadius: 12,
  },
  clearButtonText: {
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: "600",
  },
  applyButton: {
    flex: 1,
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.accent,
    borderRadius: 12,
  },
  applyButtonText: {
    color: COLORS.background,
    fontSize: 15,
    fontWeight: "600",
  },
  sortOption: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
  },
  sortOptionText: {
    color: COLORS.primary,
    fontSize: 15,
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
