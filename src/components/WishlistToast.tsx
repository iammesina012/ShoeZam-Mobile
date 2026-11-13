import { useWishlist } from "@/context/WishlistContext";
import { COLORS } from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export default function WishlistToast() {
  const { toastMessage } = useWishlist();

  if (!toastMessage) return null;

  return (
    <View pointerEvents="none" style={styles.toast}>
      <Ionicons name="checkmark-circle" size={20} color={COLORS.background} />
      <Text style={styles.toastText}>{toastMessage}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  toast: {
    position: "absolute",
    bottom: 100,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 24,
    zIndex: 1,
    elevation: 4,
  },
  toastText: {
    color: COLORS.background,
    fontWeight: 600,
  },
});
