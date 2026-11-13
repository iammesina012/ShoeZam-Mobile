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

export type OrderStatus =
  | "placed"
  | "processing"
  | "shipping"
  | "delivered"
  | "cancelled";

export type OrderItem = {
  productId: string;
  productName: string;
  image: number;
  color: string;
  size: string;
  quantity: number;
  unitPrice: number;
};

export type Order = {
  id: string;
  date: string;
  status: OrderStatus;
  paymentMethod: string;
  items: OrderItem[];
  total: number;
};

export type NewOrder = Pick<Order, "paymentMethod" | "items" | "total">;

export type OrderContextType = {
  orders: Order[];
  createOrder: (order: NewOrder) => void;
};

export type ShippingAddress = {
  id: string;
  fullName: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  province: string;
  barangay: string;
  postalCode: string;
};

export type ShippingAddressInput = Omit<ShippingAddress, "id">;

export type AddressContextType = {
  addresses: ShippingAddress[];
  selectedAddressId: string | null;
  selectedAddress: ShippingAddress | null;
  addAddress: (address: ShippingAddressInput) => void;
  updateAddress: (addressId: string, address: ShippingAddressInput) => void;
  selectAddress: (addressId: string) => void;
};

export type BagContextType = {
  bagItems: BagItem[];
  addToBag: (productId: string, color: string, size: string) => void;
  increaseQuantity: (productId: string, color: string, size: string) => void;
  decreaseQuantity: (productId: string, color: string, size: string) => void;
  removeFromBag: (productId: string, color: string, size: string) => void;
  clearBag: () => void;
};
