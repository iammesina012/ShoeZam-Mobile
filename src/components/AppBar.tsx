import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export type AppBarProps = {
  title?: string;
  leftContent?: React.ReactNode;
  rightIcon?: string;
  onRightPress?: () => void;
  rightIconColor?: string;
};

export default function AppBar({
  title,
  leftContent,
  rightIcon,
  onRightPress,
  rightIconColor = "#9C2327",
}: AppBarProps) {
  return (
    <View style={[styles.appBar, rightIcon && styles.appBarFlex]}>
      {leftContent || (title ? <Text style={styles.appTitle}>{title}</Text> : null)}

      {rightIcon ? (
        <Pressable style={styles.appBarButton} onPress={onRightPress}>
          <Ionicons name={rightIcon as any} size={22} color={rightIconColor} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  appBar: {
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  appBarFlex: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  appBarButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  appTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
  },
});
