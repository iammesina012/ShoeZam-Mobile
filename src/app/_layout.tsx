import { AuthProvider, useAuth } from "@/context/AuthContext";
import { AddressProvider } from "@/context/AddressContext";
import { BagProvider } from "@/context/BagContext";
import { OrderProvider } from "@/context/OrderContext";
import { PaymentProvider } from "@/context/PaymentContext";
import { ProfileProvider } from "@/context/ProfileContext";
import { WishlistProvider } from "@/context/WishlistContext";
import PersistenceGate from "@/components/PersistenceGate";
import WishlistToast from "@/components/WishlistToast";
import { COLORS } from "@/theme/colors";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <AddressProvider>
          <WishlistProvider>
            <OrderProvider>
              <PaymentProvider>
                <BagProvider>
                  <GestureHandlerRootView style={{ flex: 1 }}>
                    <PersistenceGate>
                      <>
                        <RootNavigator />
                        <WishlistToast />
                      </>
                    </PersistenceGate>
                  </GestureHandlerRootView>
                </BagProvider>
              </PaymentProvider>
            </OrderProvider>
          </WishlistProvider>
        </AddressProvider>
      </ProfileProvider>
    </AuthProvider>
  );
}

function RootNavigator() {
  const {
    session,
    status,
    initializationError,
    canRetryInitialization,
    retryInitialization,
  } = useAuth();

  if (status === "loading") {
    return (
      <View style={styles.loading}>
        <StatusBar style="dark" />
        <ActivityIndicator color={COLORS.accent} />
      </View>
    );
  }

  if (status === "error") {
    return (
      <SafeAreaView style={styles.errorScreen}>
        <StatusBar style="dark" />
        <Text style={styles.errorTitle}>Unable to start ShoeZam</Text>
        <Text style={styles.errorMessage}>{initializationError}</Text>
        {canRetryInitialization ? (
          <Pressable
            accessibilityRole="button"
            onPress={retryInitialization}
            style={styles.retryButton}
          >
            <Text style={styles.retryButtonText}>Try Again</Text>
          </Pressable>
        ) : null}
      </SafeAreaView>
    );
  }

  const isSignedIn = session !== null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />

      <Stack.Protected guard={!isSignedIn}>
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="auth/callback" />
      </Stack.Protected>

      <Stack.Protected guard={isSignedIn}>
        <Stack.Screen name="tabs" />
        <Stack.Screen name="address-form" />
        <Stack.Screen name="add-payment-method" />
        <Stack.Screen name="address-selection" />
        <Stack.Screen name="payment-method-selection" />
        <Stack.Screen name="payment-method-form" />
        <Stack.Screen name="order-history" />
        <Stack.Screen name="order-confirmation" />
        <Stack.Screen name="profile" />
        <Stack.Screen name="help-center" />
        <Stack.Screen name="checkout" />
        <Stack.Screen name="search-results" />
        <Stack.Screen name="product/[id]" />
        <Stack.Screen name="brand/[id]" />
        <Stack.Screen name="shop" />
        <Stack.Screen name="terms-privacy" />
        <Stack.Screen name="my-addresses" />
        <Stack.Screen name="payment-methods" />
      </Stack.Protected>
    </Stack>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.background,
  },
  errorScreen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: COLORS.background,
  },
  errorTitle: {
    color: COLORS.primary,
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
  errorMessage: {
    marginTop: 10,
    color: COLORS.fieldValue,
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
  },
  retryButton: {
    minHeight: 48,
    justifyContent: "center",
    marginTop: 20,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: COLORS.accent,
  },
  retryButtonText: {
    color: COLORS.background,
    fontSize: 15,
    fontWeight: "600",
  },
});
