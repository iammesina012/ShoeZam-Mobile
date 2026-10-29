import { WishlistProvider } from "@/context/WishlistContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <WishlistProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="tabs" />
      </Stack>
    </WishlistProvider>
  );
}
