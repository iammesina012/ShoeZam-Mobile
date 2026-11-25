import { useAddress } from "@/context/AddressContext";
import { useBag } from "@/context/BagContext";
import { useOrders } from "@/context/OrderContext";
import { useProfile } from "@/context/ProfileContext";
import { useWishlist } from "@/context/WishlistContext";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@/theme/colors";

export default function PersistenceGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const persistenceStates = [
    useBag().persistence,
    useWishlist().persistence,
    useAddress().persistence,
    useProfile().persistence,
    useOrders().persistence,
  ];

  const hasError = persistenceStates.some(
    (state) => state.status === "error",
  );
  const isLoading = persistenceStates.some(
    (state) => state.status === "loading",
  );

  return (
    <View style={styles.container}>
      {children}
      {hasError ? (
        <SafeAreaView style={styles.overlay}>
          <Text style={styles.title}>Saved data couldn’t be loaded</Text>
          <Text style={styles.message}>
            Please try again to load your ShoeZam data.
          </Text>
          <Pressable
            accessibilityRole="button"
            onPress={() => persistenceStates.forEach((state) => state.retry())}
            style={styles.retryButton}
          >
            <Text style={styles.retryButtonText}>Try Again</Text>
          </Pressable>
        </SafeAreaView>
      ) : isLoading ? (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator color={COLORS.accent} />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: COLORS.background,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFill,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
  title: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: "600",
  },
  message: {
    color: COLORS.secondary,
    marginTop: 8,
    textAlign: "center",
  },
  retryButton: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: COLORS.accent,
  },
  retryButtonText: {
    color: COLORS.background,
    fontWeight: "600",
  },
});
