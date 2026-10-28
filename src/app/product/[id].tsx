import Header from "@/components/Header";
import { PRODUCTS } from "@/data/products";
import { styles } from "@/styles/product.styles";
import { COLORS } from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { Image, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProductDetails() {
  const { id } = useLocalSearchParams();

  const product = PRODUCTS.find((product) => product.id === id);

  if (!product) {
    return <Text>Fruit not found</Text>;
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Header showBack showCart />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product Image Section */}
        <View style={styles.productImageContainer}>
          <Image source={product.image} style={styles.productImage} resizeMode="contain"></Image>
        </View>

        {/* Product Details Section */}
        <View style={styles.productDetailsSection}>
          <Pressable style={styles.firstRow}>
            <Text style={styles.brandName}>{product.brand}</Text>
            <Ionicons name="heart-outline" size={24} color={COLORS.primary} />
          </Pressable>

          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>{product.price}</Text>

          {/* Colors */}
          <View>
            <Text style={styles.productColor}>Colors</Text>
            <View style={styles.colorContainer}>
              {product.colors.map((color) => (
                <View key={color.name} style={[styles.colorOption, { backgroundColor: color.swatch }]}></View>
              ))}
            </View>
          </View>

          {/* Sizes */}
          <View>
            <Text style={styles.productSize}>Sizes</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.sizeContainer}>
                {product.sizes.map((size) => (
                  <View key={size} style={styles.sizeOption}>
                    <Text style={styles.sizeText}>{size}</Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Description */}
          <View>
            <Text style={styles.productDescription}>Description</Text>
            <Text style={styles.descriptionText}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed vero magnam sit iste quaerat impedit voluptatibus ratione ipsum,
              a velit et fugiat, rem reiciendis ut veniam consectetur autem dolorem quos!
            </Text>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.addToBagButton}>
        <Ionicons name="bag-outline" size={24} color={COLORS.background} />
        <Text style={styles.addToBagText}>Add to Bag</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
