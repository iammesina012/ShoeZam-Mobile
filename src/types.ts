import type { StyleProp, ViewStyle } from "react-native";

export type HeaderProps = {
  title?: string;
  backgroundColor?: string;
  centerTitle?: boolean;
  showBack?: boolean;
  // lets a screen choose where its back button goes.
  onBackPress?: () => void;
  showSearch?: boolean;
  showNotification?: boolean;
  showBag?: boolean;
  showLogo?: boolean;
};

export type SearchBarProps = {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onSubmitEditing?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
};

export type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: number;
  colors: {
    name: string;
    swatch: string;
  }[];
  sizes: string[];
};

export type ProductCardProps = {
  product: Product;
  isInWishlist: boolean;
  onToggleWishlist: (productId: string) => void;
  onPress: () => void;
};

// just describes what is inside the box: a list of IDs and a toggle button
export type WishlistContextType = {
  wishlistIds: string[];
  toggleWishlist: (productId: string) => void;
};

export type BagItem = {
  productId: string;
  color: string;
  size: string;
  quantity: number;
};

export type BagContextType = {
  bagItems: BagItem[];
  addToBag: (productId: string, color: string, size: string) => void;
  increaseQuantity: (productId: string, color: string, size: string) => void;
  decreaseQuantity: (productId: string, color: string, size: string) => void;
  removeFromBag: (productId: string, color: string, size: string) => void;
};
