import ProductCard from "@/components/ProductCard";
import { useWishlist } from "@/context/WishlistContext";
import type { Product } from "@/types";
import { router } from "expo-router";
import { View, type StyleProp, type ViewStyle } from "react-native";

type ProductGridProps = {
  products: Product[];
  style: StyleProp<ViewStyle>;
};

export default function ProductGrid({ products, style }: ProductGridProps) {
  const { wishlistIds, toggleWishlist } = useWishlist();

  return (
    <View style={style}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isInWishlist={wishlistIds.includes(product.id)}
          onToggleWishlist={toggleWishlist}
          onPress={() => router.push(`/product/${product.id}`)}
        />
      ))}
    </View>
  );
}
