import { useWishlist } from "@/context/WishlistContext";
import AppBar from "@/components/AppBar";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import { BRANDS } from "@/data/brands";
import { PRODUCTS } from "@/data/products";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/theme/colors";
import { styles } from "@/styles/wishlist.styles";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Wishlist() {
  const { wishlistIds, toggleWishlist } = useWishlist();
  const isEmpty = wishlistIds.length === 0;

  return (
    <SafeAreaView style={styles.screen}>
      {/* App Bar */}
      <AppBar title="My Wishlist" rightIcon="create-outline" />

      {/* Search Bar */}
      <SearchBar containerStyle={{ marginHorizontal: 20, marginTop: 16 }} />

      {/* Brand Carousel */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.brandScrollView}
        contentContainerStyle={styles.brandScrollContainer}
      >
        <Pressable style={styles.allCard}>
          <Text style={styles.allName}>All</Text>
        </Pressable>
        {BRANDS.map((brand) => (
          <Pressable key={brand.id} style={styles.brandCard}>
            <Text style={styles.brandName}>{brand.name}</Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Product Catalog / Empty State */}
      <View style={styles.catalogWrapper}>
        {isEmpty ? (
          <View style={styles.emptyWrapper}>
            <View style={styles.emptyContainer}>
              <View style={styles.emptyContent}>
                <Ionicons name="heart-outline" size={80} color={colors.textSecondary} />
                <Text style={styles.emptyTitle}>Your wishlist is empty</Text>
                <Text style={styles.emptySubtitle}>
                  Start adding your favorite shoes to your wishlist.
                </Text>
                <Pressable style={styles.emptyButton} onPress={() => router.replace("/tabs")}>
                  <Text style={styles.emptyButtonText}>Browse Products</Text>
                </Pressable>
              </View>
            </View>
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.productGrid}>
              {PRODUCTS.filter((product) => wishlistIds.includes(product.id)).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isInWishlist={wishlistIds.includes(product.id)}
                  onToggleWishlist={toggleWishlist}
                />
              ))}
            </View>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}
