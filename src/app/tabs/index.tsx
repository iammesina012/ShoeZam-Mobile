import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import { useWishlist } from "@/context/WishlistContext";
import { BRANDS } from "@/data/brands";
import { PRODUCTS } from "@/data/products";
import { styles } from "@/styles/home.styles";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const { wishlistIds, toggleWishlist } = useWishlist();

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="dark" />
      {/* App Bar */}
      <Header showLogo showNotification />

      <SearchBar
        containerStyle={{ marginHorizontal: 20, marginTop: 16 }}
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={() => {
          const query = searchQuery.trim();
          if (!query) return;

          router.push({
            pathname: "/search-results",
            params: { query },
          });
        }}
      />

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

          <Image source={require("@/assets/images/hero/adidas-hero.png")} style={styles.rightImage} />
        </View>

        {/* Shop by Brand */}
        <View style={styles.brandSection}>
          <Text style={styles.sectionTitle}>
            Shop by <Text style={styles.highlightText}>Brand</Text>
          </Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.brandScrollContainer}>
            <Pressable
              style={styles.brandItem}
              accessibilityRole="button"
              accessibilityLabel="Shop all products"
              onPress={() => router.push("/shop")}
            >
              <View style={styles.brandCard}>
                <Text style={styles.shopAllCardText}>ALL</Text>
              </View>
              <Text style={styles.brandName}>Shop All</Text>
            </Pressable>
            {BRANDS.map((brand) => (
              <Pressable
                key={brand.id}
                style={styles.brandItem}
                onPress={() =>
                  router.push({
                    pathname: "/brand/[id]",
                    params: { id: brand.id },
                  })
                }
              >
                <View style={styles.brandCard}>
                  <Image source={brand.logo} style={styles.brandLogo} resizeMode="contain" />
                </View>
                <Text style={styles.brandName}>{brand.name}</Text>
              </Pressable>
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
              <ProductCard
                key={product.id}
                product={product}
                isInWishlist={wishlistIds.includes(product.id)}
                onToggleWishlist={toggleWishlist}
                onPress={() => router.push(`/product/${product.id}`)}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
