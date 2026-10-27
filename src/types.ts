export type HeaderProps = {
  title?: string;
  showBack?: boolean;
  showSearch?: boolean;
  showNotification?: boolean;
  showEdit?: boolean;
  showCart?: boolean;
  showLogo?: boolean;
  centerTitle?: boolean;
};

export type SearchBarProps = {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onSubmitEditing?: () => void;
  containerStyle?: any;
};

// just describes what is inside the box: a list of IDs and a toggle button
export type WishlistContextType = {
  wishlistIds: string[];
  toggleWishlist: (productId: string) => void;
};

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
  onPress?: () => void;
};
