import { StyleSheet, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/theme/colors";

export type SearchBarProps = {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onSubmitEditing?: () => void;
  containerStyle?: any;
};

export default function SearchBar({
  placeholder = "Search...",
  value,
  onChangeText,
  onSubmitEditing,
  containerStyle,
}: SearchBarProps) {
  return (
    <View style={[styles.searchBar, containerStyle]}>
      <TextInput
        style={styles.searchInput}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
      />

      <Ionicons name="search-outline" size={20} color={colors.textSecondary} />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    height: 48,
    borderRadius: 14,
    paddingHorizontal: 16,
  },
  searchInput: {
    flex: 1,
    color: colors.textPrimary,
  },
});
