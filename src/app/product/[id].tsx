import Header from "@/components/Header";
import { useWishlist } from "@/context/WishlistContext";
import { useBag } from "@/context/BagContext";
import { PRODUCTS } from "@/data/products";
import { styles } from "@/styles/product.styles";
import { COLORS } from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProductDetails() {
  const { wishlistIds, toggleWishlist } = useWishlist();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [showOptionsError, setShowOptionsError] = useState(false);
  const { addToBag } = useBag();

  // the id from the [id].tsx gets that ID
  const { id } = useLocalSearchParams();

  // the PRODUCTS array will find the shoe based on
  const product = PRODUCTS.find((shoe) => shoe.id === id);

  if (!product) {
    return <Text>Product not found</Text>;
  }

  const productId = product.id;

  function handleAddToBag() {
    if (!selectedColor || !selectedSize) {
      setShowOptionsError(true);
      return;
    }

    addToBag(productId, selectedColor, selectedSize);
  }

  const isInWishlist = wishlistIds.includes(product.id);

  return (
    <SafeAreaView style={styles.screen} edges={["top", "left", "right"]}>
      <StatusBar style="dark" />
      <Header showBack showCart backgroundColor={COLORS.surface} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product Image Section */}
        <View style={styles.productImageContainer}>
          <Image
            source={product.image}
            style={styles.productImage}
            resizeMode="contain"
          ></Image>
        </View>

        {/* Product Details Section */}
        <View style={styles.productDetailsSection}>
          <View style={styles.firstRow}>
            <Text style={styles.brandName}>{product.brand}</Text>
            <Pressable onPress={() => toggleWishlist(product.id)}>
              <Ionicons
                name={isInWishlist ? "heart" : "heart-outline"}
                size={24}
                color={isInWishlist ? COLORS.accent : COLORS.primary}
              />
            </Pressable>
          </View>

          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>{product.price}</Text>

          {/* Colors */}
          <View>
            <Text style={styles.productColor}>Colors</Text>
            <View style={styles.colorContainer}>
              {product.colors.map((color) => (
                <Pressable
                  key={color.name}
                  onPress={() => setSelectedColor(color.name)}
                  style={[
                    styles.colorOption,
                    showOptionsError &&
                      !selectedColor &&
                      styles.missingColorOption,
                    selectedColor === color.name && styles.selectedColor,
                  ]}
                >
                  <View
                    style={[
                      styles.colorSwatch,
                      { backgroundColor: color.swatch },
                    ]}
                  />
                </Pressable>
              ))}
            </View>
          </View>

          {/* Sizes */}
          <View>
            <Text style={styles.productSize}>Sizes</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.sizeContainer}>
                {product.sizes.map((size) => (
                  <Pressable
                    key={size}
                    onPress={() => setSelectedSize(size)}
                    style={[
                      styles.sizeOption,
                      showOptionsError &&
                        !selectedSize &&
                        styles.missingSizeOption,
                      selectedSize === size && styles.selectedSize,
                    ]}
                  >
                    <Text style={styles.sizeText}>{size}</Text>
                  </Pressable>
                ))}
              </View>
            </ScrollView>
            {showOptionsError && (!selectedColor || !selectedSize) && (
              <Text style={styles.optionsError}>
                {!selectedColor && !selectedSize
                  ? "Please select a color and size to continue."
                  : !selectedColor
                    ? "Please select a color to continue."
                    : "Please select a size to continue."}
              </Text>
            )}
          </View>

          {/* Description */}
          <View>
            <Text style={styles.productDescription}>Description</Text>
            <Text style={styles.descriptionText}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed vero
              magnam sit iste quaerat impedit voluptatibus ratione ipsum, a
              velit et fugiat, rem reiciendis ut veniam consectetur autem
              dolorem quos!
            </Text>
          </View>
        </View>
      </ScrollView>

      <SafeAreaView edges={["bottom"]} style={styles.addToBagFooter}>
        <TouchableOpacity
          style={styles.addToBagButton}
          onPress={handleAddToBag}
        >
          <Ionicons name="bag-outline" size={24} color={COLORS.background} />
          <Text style={styles.addToBagText}>Add to Bag</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaView>
  );
}
