import { Pressable, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/theme/colors";

export type MenuItemProps = {
  icon: string;
  label: string;
  onPress?: () => void;
};

export default function MenuItem({
  icon,
  label,
  onPress,
}: MenuItemProps) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Ionicons name={icon as any} size={22} color={colors.textPrimary} />
      <Text style={styles.label}>{label}</Text>
      <Ionicons name="chevron-forward-outline" size={22} color={colors.textSecondary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
    gap: 12,
  },
  label: {
    flex: 1, 
    fontSize: 14,
    fontWeight: "normal",
    color: colors.textPrimary,
  },
});
