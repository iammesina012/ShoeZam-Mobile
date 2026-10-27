import Header from "@/components/Header";
import { COLORS } from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProductDetails() {
  return (
    <SafeAreaView style={styles.screen}>
      <Header showBack showCart />

      {/* Product Image Section */}
      <View style={styles.productImageContainer}>
        <Image
          source={require("@/assets/images/products/adidas/adidas-blondey-mccoy-adidas-superstar-80-white.png")}
          style={styles.productImage}
          resizeMode="contain"
        ></Image>
      </View>

      {/* Product Details Section */}
      <View style={styles.productDetailsSection}>
        <Pressable style={styles.firstRow}>
          <Text style={styles.brandName}>Adidas</Text>
          <Ionicons name="heart-outline" size={24} color={COLORS.primary} />
        </Pressable>

        <Text style={styles.productName}>Blondey McCoy X Adidas Superstar 80</Text>
        <Text style={styles.productPrice}>₱24,995.00</Text>

        {/* Color */}
        <View>
          <Text style={styles.productColor}>Color</Text>
          <View style={styles.colorContainer}>
            <Text></Text>
          </View>
        </View>

        {/* Size */}
        <View>
          <Text style={styles.productSize}>Size</Text>
          <View style={styles.sizeContainer}>
            <Text></Text>
          </View>
        </View>

        {/* Description */}
        <View>
          <Text style={styles.productDescription}>Description</Text>
          <Text style={styles.descriptionText}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed vero magnam sit iste quaerat impedit voluptatibus ratione ipsum, a
            velit et fugiat, rem reiciendis ut veniam consectetur autem dolorem quos!
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.addToBagButton}>
        <Ionicons name="bag-outline" size={24} color={COLORS.background} />
        <Text style={styles.addToBagText}>Add to Bag</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  // ---------- Product Image Section ----------
  productImageContainer: {
    width: "100%",
    height: 320,
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  productImage: {
    width: "90%",
    height: "90%",
  },
  // ---------- Product Details Section ----------
  productDetailsSection: {
    flex: 1,
    padding: 20,
  },
  firstRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brandName: {
    fontWeight: 600,
    color: COLORS.secondary,
  },
  productName: {
    fontSize: 24,
    fontWeight: 700,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 600,
    color: COLORS.accent,
    marginTop: 4,
  },
  productColor: {
    fontWeight: 600,
    marginTop: 16,
  },
  colorContainer: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.primary,
  },
  sizeContainer: {

  },
  productSize: {
    fontWeight: 600,
    marginTop: 16,
  },
  productDescription: {
    fontWeight: 600,
    marginTop: 16,
  },
  descriptionText: {
    fontWeight: 100,
    textAlign: "justify",
  },
  // ---------- Add to Bag button ----------
  addToBagButton: {
    height: 56,
    flexDirection: "row",
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 12,
    backgroundColor: COLORS.accent,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  addToBagText: {
    fontSize: 16,
    fontWeight: 600,
    color: COLORS.background,
  },
});
