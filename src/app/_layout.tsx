import { AddressProvider } from "@/context/AddressContext";
import { BagProvider } from "@/context/BagContext";
import { OrderProvider } from "@/context/OrderContext";
import { ProfileProvider } from "@/context/ProfileContext";
import { WishlistProvider } from "@/context/WishlistContext";
import WishlistToast from "@/components/WishlistToast";
import PersistenceGate from "@/components/PersistenceGate";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <ProfileProvider>
      <AddressProvider>
        <WishlistProvider>
          <OrderProvider>
            <BagProvider>
              <GestureHandlerRootView style={{ flex: 1 }}>
                <PersistenceGate>
                  <>
                    <Stack screenOptions={{ headerShown: false }}>
                      <Stack.Screen name="index" />
                      <Stack.Screen name="tabs" />
                    </Stack>
                    <WishlistToast />
                  </>
                </PersistenceGate>
              </GestureHandlerRootView>
            </BagProvider>
          </OrderProvider>
        </WishlistProvider>
      </AddressProvider>
    </ProfileProvider>
  );
}
