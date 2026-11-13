import { AddressProvider } from "@/context/AddressContext";
import { BagProvider } from "@/context/BagContext";
import { OrderProvider } from "@/context/OrderContext";
import { WishlistProvider } from "@/context/WishlistContext";
import WishlistToast from "@/components/WishlistToast";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <AddressProvider>
      <WishlistProvider>
        <OrderProvider>
          <BagProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="tabs" />
              </Stack>
              <WishlistToast />
            </GestureHandlerRootView>
          </BagProvider>
        </OrderProvider>
      </WishlistProvider>
    </AddressProvider>
  );
}
