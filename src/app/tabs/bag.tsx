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
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";

export default function Bag() {
  const [isRemoveModalVisible, setIsRemoveModalVisible] = useState(false);
  const [selectedItemToRemove, setSelectedItemToRemove] =
    useState<BagItem | null>(null);

  const { bagItems, increaseQuantity, decreaseQuantity, removeFromBag } =
    useBag();
  const isBagEmpty = bagItems.length === 0;

  const totalPrice = bagItems.reduce((total, bagItem) => {
    const product = PRODUCTS.find((shoe) => shoe.id === bagItem.productId); // find a shoes that matches the id and productid

    if (!product) return total; // if the product doesn't exist, keep the current total, and continue processing the remaining bag items

    return total + product.price * bagItem.quantity; // if the product exist, compute the total
  }, 0);
  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.screen}>
      <StatusBar style="dark" />
      {/* App Bar */}
      <Header title="My Shopping Bag" />

      {/* Remove Modal */}
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
                  setIsRemoveModalVisible(false); // hide the modal
                  setSelectedItemToRemove(null); // reset the selected item to null
                }}
              >
                <Text style={styles.cancelButtonText}>No</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.confirmButton}
                onPress={() => {
                  if (selectedItemToRemove) {
                    decreaseQuantity(
                      // the reason there are 3 arguments here, because we need to identify which item in the bag we want to decrease or remove
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

      {/* Empty state */}
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
              // check every current items in the bag
              const product = PRODUCTS.find(
                // find a shoe that PRODUCTS.id is equal to bagItems.productId
                (shoe) => shoe.id === item.productId,
              );

              if (!product) return null; // if no matching product is found, nothing will be displayed

              const itemPrice = product.price * item.quantity;

              return (
                // Swipeable Card
                <ReanimatedSwipeable
                  key={`${item.productId}-${item.color}-${item.size}`}
                  containerStyle={{
                    //style for both container and delete action
                    marginTop: 16,
                    marginHorizontal: 20,
                    borderRadius: 14,
                  }}
                  overshootRight={false} // prevents the card from stretching beyond the delete action
                  renderRightActions={() => (
                    // tells what to display on the right side when swiped to the left
                    <Pressable
                      style={styles.deleteAction}
                      onPress={() => {
                        setSelectedItemToRemove(item);
                        setIsRemoveModalVisible(true);
                      }}
                    >
                      <Ionicons
                        name="trash-outline"
                        size={22}
                        color={COLORS.background}
                      />
                      <Text style={styles.deleteText}>Delete</Text>
                    </Pressable>
                  )}
                >
                  <Pressable
                    style={styles.productContainer}
                    onPress={() => {
                      router.push(`/product/${item.productId}`);
                    }}
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
                        {product.brand} · {item.color} · {item.size}
                      </Text>

                      {/* Bottom Row */}
                      <View style={styles.productBottomRow}>
                        <Text style={styles.productPrice}>
                          {itemPrice.toLocaleString("en-ph", {
                            //converts a number into a formatted string, use the english ph locale
                            style: "currency", // format the number as money, rather than ordinary number
                            currency: "PHP", // use the peso currency
                          })}
                        </Text>

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

                          <Text style={styles.quantityText}>
                            {item.quantity}
                          </Text>

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
                  </Pressable>
                </ReanimatedSwipeable>
              );
            })}
          </ScrollView>

          {/* Bottom Summary */}
          <View style={styles.summary}>
            <View style={styles.totalRow}>
              <View>
                <Text style={styles.totalLabel}>Total price</Text>
              </View>

              <Text style={styles.totalPrice}>
                {totalPrice.toLocaleString("en-ph", {
                  style: "currency",
                  currency: "PHP",
                })}
              </Text>
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
