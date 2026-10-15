import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const brands = [
  { id: "adidas", name: "Adidas", logo: require("@/assets/images/logo/adidas-logo.png") },
  { id: "converse", name: "Converse", logo: require("@/assets/images/logo/converse-logo.png") },
  {
    id: "newbalance",
    name: "New Balance",
    logo: require("@/assets/images/logo/newbalance-logo.png"),
  },
  { id: "nike", name: "Nike", logo: require("@/assets/images/logo/nike-logo.png") },
  { id: "vans", name: "Vans", logo: require("@/assets/images/logo/vans-logo.png") },
];

const PRODUCTS = [
  {
    id: "1",
    name: "Blondey McCoy X Adidas Superstar 80",
    price: "₱24,995.00",
    image: require("@/assets/images/products/adidas/adidas-blondey-mccoy-adidas-superstar-80-white.png"),
  },
  {
    id: "2",
    name: "Converse Chuck 70 Trippy Heel Men's",
    price: "₱2,774.87",
    image: require("@/assets/images/products/converse/converse-chuck-70-trippy-heel-mens.png"),
  },
  {
    id: "3",
    name: "New Balance 574 Core Men's",
    price: "₱4,995.00",
    image: require("@/assets/images/products/new-balance/new-balance-574-core-mens.png"),
  },
  {
    id: "4",
    name: "Nike SB Ben & Jerry's Dunk Low Pro 2020",
    price: "₱88,995.00",
    image: require("@/assets/images/products/nike/nike-sb-ben-and-jerrys-dunk-low-pro-2020.png"),
  },
  {
    id: "5",
    name: "Vans Old Skool LX Comme Des Garcons",
    price: "₱8,495.00",
    image: require("@/assets/images/products/vans/vans-old-skool-lx-comme-des-garcons-black.png"),
  },
];

export default function Home() {
  return (
    <SafeAreaView style={styles.phoneScreen}>
      {/* App Bar */}
      <View style={styles.appBar}>
        <Text style={styles.appTitle}>ShoeZam</Text>
        <Pressable style={styles.shoppingBag}>
          <Ionicons name="notifications-outline" size={20} color="#9C2327" />
        </Pressable>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor="#9E9E9E"
        />
        <Ionicons name="search-outline" size={20} color="#9E9E9E" />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroCard}>
          <View style={styles.leftSide}>
            <Text style={styles.heroLabel}>NEW ARRIVAL!</Text>
            <Text style={styles.heroTitle}>Vans Old Skool LX{"\n"}Comme Des Garcons</Text>
            <Pressable style={styles.heroButton}>
              <Text style={styles.heroButtonText}>View Product</Text>
            </Pressable>
          </View>

          <Image source={require("@/assets/images/hero/vans-hero.png")} style={styles.rightImage} />
        </View>

        {/* Shop by Brand */}
        <View style={styles.brandSection}>
          <Text style={styles.sectionTitle}>
            Shop by <Text style={styles.highlightText}>Brand</Text>
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.brandScrollContainer}
          >
            {brands.map((brand) => (
              <View key={brand.id} style={styles.brandItem}>
                <Pressable style={styles.brandCard}>
                  <Image source={brand.logo} style={styles.brandLogo} resizeMode="contain" />
                </Pressable>
                <Text style={styles.brandName}>{brand.name}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Product Catalog */}
        <View style={styles.productCatalogSection}>
          <Text style={styles.sectionTitle}>
            Step Into Something <Text style={styles.highlightText}>New</Text>
          </Text>

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
  // ---------- App Bar ----------
  appBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
  },
  shoppingBag: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    elevation: 1,
  },
  // ---------- Search Bar ----------
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginTop: 10,
    paddingHorizontal: 16,
    height: 48,
    borderRadius: 14,
  },
  searchInput: {
    flex: 1,
    color: "#000000",
  },
  // ---------- Hero Section ----------
  heroCard: {
    height: 180,
    backgroundColor: "#EFE7DC",
    marginTop: 16,
    paddingHorizontal: 20,
    justifyContent: "center",
    overflow: "hidden",
  },
  // ----- Left Side -----
  leftSide: {
    alignItems: "flex-start",
    zIndex: 1,
  },
  heroLabel: {
    fontSize: 12,
    fontWeight: "semibold",
    color: "#9C2327",
  },
  heroTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
    marginTop: 4,
  },
  heroButton: {
    backgroundColor: "#000000",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 24,
    marginTop: 12,
  },
  heroButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
  },
  // ----- Right Side -----
  rightImage: {
    position: "absolute",
    width: 265,
    height: 265,
    right: -5,
    bottom: 0,
  },
  // ---------- Shop by Brand ----------
  brandSection: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    marginHorizontal: 20,
  },
  highlightText: {
    color: "#9C2327",
  },
  brandScrollContainer: {
    marginTop: 14,
    paddingHorizontal: 20,
    gap: 12,
  },
  brandItem: {
    alignItems: "center",
  },
  brandCard: {
    width: 88,
    height: 60,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  brandLogo: {
    width: 50,
    height: 32,
  },
  brandName: {
    fontSize: 12,
    fontWeight: "semibold",
    color: "#000000",
    marginTop: 6,
  },
  // ---------- Product Catalog ----------
  productCatalogSection: {
    marginTop: 16,
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
    fontSize: 18,
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
