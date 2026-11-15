import { COLORS } from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, View } from "react-native";

type ProfileAvatarProps = {
  photoUri: string | null;
  size: number;
};

export default function ProfileAvatar({
  photoUri,
  size,
}: ProfileAvatarProps) {
  return (
    <View
      style={[
        styles.avatar,
        { width: size, height: size, borderRadius: size / 2 },
      ]}
    >
      {photoUri ? (
        <Image
          source={{ uri: photoUri }}
          style={styles.photo}
          resizeMode="cover"
        />
      ) : (
        <Ionicons
          name="person"
          size={size * 0.84}
          color={COLORS.secondary}
          style={styles.placeholderIcon}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#D6D6D6",
    backgroundColor: COLORS.surface,
  },
  photo: {
    width: "100%",
    height: "100%",
  },
  placeholderIcon: {
    position: "absolute",
    bottom: -8,
    alignSelf: "center",
  },
});
