import { AddressProvider } from "@/context/AddressContext";
import { BagProvider } from "@/context/BagContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <AddressProvider>
      <WishlistProvider>
        <BagProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="tabs" />
            </Stack>
          </GestureHandlerRootView>
        </BagProvider>
      </WishlistProvider>
    </AddressProvider>
  );
}
