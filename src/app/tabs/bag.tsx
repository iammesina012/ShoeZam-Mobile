import Header from "@/components/Header";
import { styles } from "@/styles/bag.styles";
import { COLORS } from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import {
  Modal,
  Image,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useBag } from "@/context/BagContext";
import { PRODUCTS } from "@/data/products";
import { useState } from "react";
import type { BagItem } from "@/types";

export default function Bag() {
  const [isRemoveModalVisible, setIsRemoveModalVisible] = useState(false);
  const [selectedItemToRemove, setSelectedItemToRemove] =
    useState<BagItem | null>(null);
  const { bagItems, increaseQuantity, decreaseQuantity } = useBag();
  const isBagEmpty = bagItems.length === 0;

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.screen}>
      <StatusBar style="dark" />
      {/* App Bar */}
      <Header title="My Shopping Bag" showEdit />

      <Modal visible={isRemoveModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Remove Item?</Text>

            <Text style={styles.modalMessage}>
              Are you sure you want to remove this product from your shopping
              bag?
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  setIsRemoveModalVisible(false);
                  setSelectedItemToRemove(null);
                }}
              >
                <Text style={styles.cancelButtonText}>No</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.confirmButton}
                onPress={() => {
                  if (selectedItemToRemove) {
                    decreaseQuantity(
                      selectedItemToRemove.productId,
                      selectedItemToRemove.color,
                      selectedItemToRemove.size,
                    );
                    setIsRemoveModalVisible(false);
                    setSelectedItemToRemove(null);
                  }
                }}
              >
                <Text style={styles.confirmButtonText}>Yes, remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {isBagEmpty ? (
        <View style={styles.emptyState}>
          <Ionicons name="bag-outline" size={80} color={COLORS.secondary} />
          <Text style={styles.emptyTitle}>Your bag is empty</Text>
          <Text style={styles.emptySubtitle}>
            Add a pair of shoes and they’ll show up here.
          </Text>
          <Pressable
            style={styles.emptyButton}
            onPress={() => router.replace("/tabs")}
          >
            <Text style={styles.emptyButtonText}>Browse Products</Text>
          </Pressable>
        </View>
      ) : (
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
            {bagItems.map((item) => {
              const product = PRODUCTS.find(
                (shoe) => shoe.id === item.productId,
              );

              if (!product) return null;

              return (
                <View
                  key={`${item.productId}-${item.color}-${item.size}`}
                  style={styles.productContainer}
                >
                  <View style={styles.productImageContainer}>
                    <Image
                      source={product.image}
                      style={styles.productImage}
                      resizeMode="contain"
                    />
                  </View>

                  {/* Product Details */}
                  <View style={styles.productDetails}>
                    <Text style={styles.productName} numberOfLines={3}>
                      {product.name}
                    </Text>
                    <Text style={styles.productBrand}>
                      {product.brand} · {item.color} · Size: {item.size}
                    </Text>

                    {/* Bottom Row */}
                    <View style={styles.productBottomRow}>
                      <Text style={styles.productPrice}>{product.price}</Text>

                      {/* Quantity Controls */}
                      <View style={styles.quantityControls}>
                        <TouchableOpacity
                          style={styles.quantityButton}
                          onPress={() => {
                            if (item.quantity > 1) {
                              decreaseQuantity(
                                item.productId,
                                item.color,
                                item.size,
                              );
                            } else {
                              setSelectedItemToRemove(item);
                              setIsRemoveModalVisible(true);
                            }
                          }}
                        >
                          <Ionicons
                            name="remove-outline"
                            size={16}
                            color={COLORS.primary}
                          />
                        </TouchableOpacity>

                        <Text style={styles.quantityText}>{item.quantity}</Text>

                        <TouchableOpacity
                          style={styles.quantityButton}
                          onPress={() =>
                            increaseQuantity(
                              item.productId,
                              item.color,
                              item.size,
                            )
                          }
                        >
                          <Ionicons
                            name="add-outline"
                            size={16}
                            color={COLORS.primary}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
          </ScrollView>

          {/* Bottom Summary */}
          <View style={styles.summary}>
            <View style={styles.totalRow}>
              <View>
                <Text style={styles.totalLabel}>Total price</Text>
              </View>

              <Text style={styles.totalPrice}>₱0.00</Text>
            </View>

            <Pressable style={styles.checkoutButton}>
              <Text style={styles.checkoutButtonText}>Checkout</Text>
            </Pressable>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}
