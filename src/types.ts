export type HeaderProps = {
  title?: string;
  backgroundColor?: string;
  centerTitle?: boolean;
  showBack?: boolean;
  showSearch?: boolean;
  showNotification?: boolean;
  showEdit?: boolean;
  showCart?: boolean;
  showLogo?: boolean;
};

export type SearchBarProps = {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onSubmitEditing?: () => void;
  containerStyle?: any;
};

export type Product = {
  id: string;
  name: string;
  brand: string;
  price: string;
  image: number;
  colors: {
    name: string;
    swatch: string;
  }[];
  sizes: string[];
};

export type ProductCardProps = {
  product: Product;
  isInWishlist?: boolean;
  onToggleWishlist?: (productId: string) => void;
  onPress?: () => void;
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
};
