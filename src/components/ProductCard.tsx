import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export type Product = {
  id: string;
  name: string;
  brand: string;
  price: string;
  image: number;
};

export type ProductCardProps = {
  product: Product;
  isInWishlist?: boolean;
  onToggleWishlist?: (productId: string) => void;
};

export default function ProductCard({
  product,
  isInWishlist = false,
  onToggleWishlist,
}: ProductCardProps) {
  const isFilled = isInWishlist;

  return (
    <Pressable style={styles.productCard}>
      <View style={styles.productImageContainer}>
        <Image source={product.image} style={styles.productImage} resizeMode="contain" />
      </View>

      <Text style={styles.productName} numberOfLines={2}>
        {product.name}
      </Text>

      <View style={styles.productBottomRow}>
        <Text style={styles.productPrice}>{product.price}</Text>

        {onToggleWishlist ? (
          <Pressable
            onPress={() => onToggleWishlist(product.id)}
            style={styles.wishListButton}
          >
            <Ionicons
              name={isFilled ? "heart" : "heart-outline"}
              size={18}
              color={isFilled ? "red" : "#000000"}
            />
          </Pressable>
        ) : (
          <Pressable style={styles.wishlistButton}>
            <Ionicons name="heart-outline" size={18} color="#000000" />
          </Pressable>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
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
  wishListButton: {
    width: 32,
    height: 32,
    backgroundColor: "#F2F2F2",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  wishlistButton: {
    width: 32,
    height: 32,
    backgroundColor: "#F2F2F2",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
