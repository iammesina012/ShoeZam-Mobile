import { BagProvider } from "@/context/BagContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <WishlistProvider>
      <BagProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="tabs" />
        </Stack>
      </BagProvider>
    </WishlistProvider>
  );
}
