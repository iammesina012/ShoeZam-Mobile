import { COLORS } from "@/theme/colors";
import { SearchBarProps } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TextInput, View } from "react-native";

export default function SearchBar({ placeholder = "Search...", value, onChangeText, onSubmitEditing, containerStyle }: SearchBarProps) {
  return (
    <View style={[styles.searchBar, containerStyle]}>
      <TextInput
        style={styles.searchInput}
        placeholder={placeholder}
        placeholderTextColor={COLORS.secondary}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
      />

      <Ionicons name="search-outline" size={20} color={COLORS.secondary} />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    height: 48,
    borderRadius: 14,
    paddingHorizontal: 16,
  },
  searchInput: {
    flex: 1,
    color: COLORS.primary,
  },
});
