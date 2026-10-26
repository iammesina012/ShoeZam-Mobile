import { WishlistProvider } from "@/context/WishlistContext";
import { COLORS } from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <WishlistProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: COLORS.accent,
          tabBarInactiveTintColor: COLORS.secondary,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: COLORS.background,
            borderTopWidth: 1,
            borderTopColor: "#F0F0F0",
            height: 80,
            paddingTop: 8,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ focused, size, color }) => (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={size} // size={25}
                color={color as string}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="wishlist"
          options={{
            tabBarIcon: ({ color, focused, size }) => (
              <Ionicons
                name={focused ? "heart" : "heart-outline"}
                size={size} // size={25}
                color={color as string}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="bag"
          options={{
            tabBarIcon: ({ color, focused, size }) => (
              <Ionicons
                name={focused ? "bag" : "bag-outline"}
                size={size} // size={25}
                color={color as string}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="account"
          options={{
            tabBarIcon: ({ color, focused, size }) => (
              <Ionicons
                name={focused ? "person" : "person-outline"}
                size={size} // size={25}
                color={color as string}
              />
            ),
          }}
        />
      </Tabs>
    </WishlistProvider>
  );
}
