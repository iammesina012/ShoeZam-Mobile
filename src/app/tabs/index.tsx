import { useWishlist } from "@/context/WishlistContext";
import { BRANDS } from "@/data/brands";
import { PRODUCTS } from "@/data/products";
import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const { wishlistIds, toggleWishlist } = useWishlist();

  return (
    <SafeAreaView style={styles.phoneScreen}>
      {/* App Bar */}
      <View style={styles.appBar}>
        <View style={styles.appBarLeft}>
          <View style={styles.profileContainer}>
            <Image
              source={require("@/assets/images/profile/me.jpeg")}
              style={styles.profilePicture}
              resizeMode="cover"
            />
          </View>
          <View style={styles.appBarText}>
            <Text style={styles.appBarGreetings}>Welcome!</Text>
            <Text style={styles.appBarFullName}>Michael William Mesina</Text>
          </View>
        </View>
        <Pressable style={styles.appBarButton}>
          <Ionicons name="notifications-outline" size={22} color="#9C2327" />
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
            <Text style={styles.heroTitle}>New Balance 574{"\n"}Core Men's</Text>
            <Pressable style={styles.heroButton}>
              <Text style={styles.heroButtonText}>View Product</Text>
            </Pressable>
          </View>

          <Image
            source={require("@/assets/images/hero/adidas-hero.png")}
            style={styles.rightImage}
          />
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
            {BRANDS.map((brand) => (
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
            Most <Text style={styles.highlightText}>Popular</Text>
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

                  <Pressable
                    onPress={() => toggleWishlist(product.id)}
                    style={styles.wishListButton}
                  >
                    <Ionicons
                      name={wishlistIds.includes(product.id) ? "heart" : "heart-outline"}
                      size={18}
                      color={wishlistIds.includes(product.id) ? "red" : "#000000"}
                    />
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
    backgroundColor: "#FFFFFF",
  },
  // ---------- App Bar ----------
  appBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  profileContainer: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#FFFFFF",
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
  },
  profilePicture: {
    width: "100%",
    height: "100%",
  },
  appBarLeft: {
    flexDirection: "row",
    gap: 12,
  },
  appBarText: {},
  appBarGreetings: {
    color: "#9E9E9E",
  },
  appBarFullName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  appBarButton: {
    alignItems: "center",
    justifyContent: "center",
  },

  // ---------- Search Bar ----------
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
    marginHorizontal: 20,
    marginTop: 16,
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
    justifyContent: "center",
    marginTop: 16,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    borderRadius: 14,
    backgroundColor: "#D12A3E",
    overflow: "hidden",
  },
  // ----- Left Side -----
  leftSide: {
    alignItems: "flex-start",
    zIndex: 1,
  },
  heroLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  heroTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
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
    width: 150,
    height: 220,
    right: 15,
    bottom: -20,
    transform: [{ rotate: "10deg" }, { scaleX: -1 }],
  },
  // ---------- Shop by Brand ----------
  brandSection: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 20,
  },
  highlightText: {
    color: "#9C2327",
  },
  brandScrollContainer: {
    marginTop: 14,
    paddingHorizontal: 20,
    gap: 12,
    alignItems: "center",
  },
  brandItem: {
    alignItems: "center",
  },
  brandCard: {
    width: 88,
    height: 60,
    backgroundColor: "#F2F2F2",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  brandLogo: {
    width: 50,
    height: 32,
  },
  brandName: {
    fontSize: 12,
    fontWeight: "600",
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
    backgroundColor: "#F2F2F2",
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
  wishListButton: {
    width: 32,
    height: 32,
    backgroundColor: "#F2F2F2",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
