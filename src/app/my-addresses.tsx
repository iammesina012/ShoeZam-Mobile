import CheckoutHeader from "@/components/CheckoutHeader";
import { useAddress } from "@/context/AddressContext";
import { styles } from "@/styles/checkout.styles";
import { COLORS } from "@/theme/colors";
import { formatShippingAddress } from "@/utils/address";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MyAddresses() {
  const { addresses } = useAddress();

  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      style={styles.selectionScreen}
    >
      <StatusBar style="dark" />
      <CheckoutHeader title="My Addresses" />

      <ScrollView
        contentContainerStyle={styles.addressListContent}
        showsVerticalScrollIndicator={false}
      >
        {addresses.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons
              name="location-outline"
              size={80}
              color={COLORS.secondary}
            />
            <Text style={styles.emptyTitle}>No addresses yet</Text>
            <Text style={styles.emptyMessage}>
              Add an address to make checkout easier.
            </Text>
          </View>
        ) : (
          addresses.map((address) => (
            <View key={address.id} style={styles.addressCard}>
              <View style={styles.selectableAddress}>
                <View style={styles.addressContactRow}>
                  <Text
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    style={[styles.addressSummary, styles.addressInlineName]}
                  >
                    {address.fullName}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={[styles.addressSummary, styles.addressPhone]}
                  >
                    {" "}
                    {address.phoneNumber}
                  </Text>
                </View>
                <Text style={[styles.addressSummary, styles.addressDetails]}>
                  {formatShippingAddress(address)}
                </Text>
              </View>

              <Pressable
                accessibilityLabel={`Edit address for ${address.fullName}`}
                accessibilityRole="button"
                onPress={() =>
                  router.push({
                    pathname: "/address-form",
                    params: { addressId: address.id },
                  })
                }
                style={styles.editButton}
              >
                <Ionicons
                  name="create-outline"
                  size={21}
                  color={COLORS.primary}
                />
              </Pressable>
            </View>
          ))
        )}
      </ScrollView>

      <SafeAreaView edges={["bottom"]} style={styles.formFooter}>
        <TouchableOpacity
          accessibilityRole="button"
          onPress={() => router.push("/address-form")}
          style={styles.addAddressButton}
        >
          <Ionicons name="add" size={21} color={COLORS.background} />
          <Text style={styles.addAddressButtonText}>Add a New Address</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaView>
  );
}
