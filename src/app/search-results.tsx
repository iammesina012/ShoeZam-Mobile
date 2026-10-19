import { PRODUCTS } from "@/data/products";
import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SearchResults() {
  return (
    <SafeAreaView style={styles.phoneScreen}>
      {/* Search Bar + Sort & Filter Button */}
      <View style={styles.shopHeader}>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor="#9E9E9E"
          />
          <Ionicons name="search-outline" size={20} color="#9E9E9E" />
        </View>
        <Pressable style={styles.sortAndFilterButton}>
          <Ionicons name="options-outline" size={22} color="#9C2327" />
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

                  <Pressable style={styles.wishlistButton}>
                    <Ionicons name="heart-outline" size={18} color="#000000" />
                  </Pressable>
                </View>
              </Pressable>
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
    backgroundColor: "#F2F2F2",
  },
  shopHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 16,
    gap: 12,
  },
  // ---------- Search Bar ----------
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    height: 48,
    borderRadius: 14,
  },
  searchInput: {
    flex: 1,
    color: "#000000",
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
  productCard: {
    width: "48%",
  },
  productImageContainer: {
    width: "100%",
    height: 150,
    backgroundColor: "#FFFFFF",
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
  wishlistButton: {
    width: 32,
    height: 32,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
