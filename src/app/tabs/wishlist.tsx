import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { useWishlist } from "@/context/WishlistContext";
import { BRANDS } from "@/data/brands";
import { PRODUCTS } from "@/data/products";
import { styles } from "@/styles/wishlist.styles";
import { COLORS } from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

export default function Wishlist() {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const { wishlistIds, toggleWishlist } = useWishlist();
  const isEmpty = wishlistIds.length === 0;

  const selectedBrandName = BRANDS.find(
    (brand) => brand.id === selectedBrand,
  )?.name;

  const wishlistedProducts = PRODUCTS.filter(
    (product) =>
      wishlistIds.includes(product.id) &&
      (selectedBrandName === undefined || product.brand === selectedBrandName),
  ).sort(
    (firstProduct, secondProduct) =>
      wishlistIds.indexOf(secondProduct.id) -
      wishlistIds.indexOf(firstProduct.id),
  );

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="dark" />
      {/* App Bar */}
      <Header title="My Wishlist" />

      {!isEmpty && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.brandScrollView}
          contentContainerStyle={styles.brandScrollContainer}
        >
          <Pressable
            style={[
              styles.allCard,
              selectedBrand === null && styles.selectedBrand,
            ]}
            onPress={() => setSelectedBrand(null)}
          >
            <Text
              style={[
                styles.allName,
                selectedBrand === null && styles.selectedBrandName,
              ]}
            >
              All
            </Text>
          </Pressable>
          {BRANDS.map((brand) => (
            <Pressable
              key={brand.id}
              onPress={() => setSelectedBrand(brand.id)}
              style={[
                styles.brandCard,
                selectedBrand === brand.id && styles.selectedBrand,
              ]}
            >
              <Text
                style={[
                  styles.brandName,
                  selectedBrand === brand.id && styles.selectedBrandName,
                ]}
              >
                {brand.name}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      )}

      {/* Product Catalog / Empty State */}
      <View style={styles.catalogWrapper}>
        {isEmpty ? (
          <View style={styles.emptyState}>
            <Ionicons name="heart-outline" size={80} color={COLORS.secondary} />
            <Text style={styles.emptyTitle}>Your wishlist is empty</Text>
            <Text style={styles.emptySubtitle}>
              Start adding your favorite shoes to your wishlist.
            </Text>
            <Pressable
              style={styles.emptyButton}
              onPress={() => router.replace("/tabs")}
            >
              <Text style={styles.emptyButtonText}>Browse Products</Text>
            </Pressable>
          </View>
        ) : wishlistedProducts.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="heart-outline" size={56} color={COLORS.secondary} />
            <Text style={styles.emptyTitle}>
              No {selectedBrandName} shoes saved yet
            </Text>
            <Text style={styles.emptySubtitle}>
              Try another brand or view all your wishlist items.
            </Text>
            <Pressable
              style={styles.emptyButton}
              onPress={() => setSelectedBrand(null)}
            >
              <Text style={styles.emptyButtonText}>Show All</Text>
            </Pressable>
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.productGrid}>
              {wishlistedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isInWishlist={wishlistIds.includes(product.id)}
                  onToggleWishlist={toggleWishlist}
                  onPress={() => router.push(`/product/${product.id}`)}
                />
              ))}
            </View>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}
