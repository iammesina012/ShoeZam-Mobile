import { COLORS } from "@/theme/colors";
import type { ProductCardProps } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function ProductCard({ product, isInWishlist = false, onToggleWishlist, onPress }: ProductCardProps) {
  const isFilled = isInWishlist;

  return (
    <Pressable style={styles.productCard} onPress={onPress} >
      <View style={styles.productImageContainer}>
        <Image source={product.image} style={styles.productImage} resizeMode="contain" />
      </View>

      <Text style={styles.productName} numberOfLines={2}>
        {product.name}
      </Text>

      <View style={styles.productBottomRow}>
        <Text style={styles.productPrice}>{product.price}</Text>

        {onToggleWishlist ? (
          <Pressable onPress={() => onToggleWishlist(product.id)} style={styles.wishListButton}>
            <Ionicons name={isFilled ? "heart" : "heart-outline"} size={18} color={isFilled ? "red" : COLORS.primary} />
          </Pressable>
        ) : (
          <Pressable style={styles.wishlistButton}>
            <Ionicons name="heart-outline" size={18} color={COLORS.primary} />
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
    backgroundColor: COLORS.surface,
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
    color: COLORS.primary,
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
    color: COLORS.accent,
  },
  wishListButton: {
    width: 32,
    height: 32,
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  wishlistButton: {
    width: 32,
    height: 32,
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
