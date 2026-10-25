import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/theme/colors";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SearchResults() {
  return (
    <SafeAreaView style={styles.phoneScreen}>
      {/* Search Bar + Sort & Filter Button */}
      <View style={styles.shopHeader}>
        <SearchBar containerStyle={{ flex: 1 }} />
        <Pressable style={styles.sortAndFilterButton}>
          <Ionicons name="options-outline" size={22} color={colors.brand} />
        </Pressable>
      </View>

      {/* Result Text */}

      <View style={styles.resultText}>
        <Text style={styles.resultsFor}>Results for "Abcdefghijk"</Text>
        <Text style={styles.noOfFound}>0 found</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product Catalog */}
        <View style={styles.productCatalogSection}>
          <View style={styles.productGrid}>
            {PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  phoneScreen: {
    flex: 1,
    backgroundColor: colors.background,
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
});
