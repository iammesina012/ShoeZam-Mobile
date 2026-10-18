import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TextInput, View } from "react-native";

export default function SearchBar() {
  return (
    <View style={styles.searchBar}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        placeholderTextColor="#9E9E9E"
      />

      <Ionicons name="search-outline" size={20} color="#9E9E9E" />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginTop: 16,
    paddingHorizontal: 16,
    height: 48,
    borderRadius: 14,
  },

  searchInput: {
    flex: 1,
    color: "#000000",
  },
});
