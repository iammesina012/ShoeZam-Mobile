import Header from "@/components/Header";
import ProfileAvatar from "@/components/ProfileAvatar";
import { useProfile } from "@/context/ProfileContext";
import { styles } from "@/styles/profile.styles";
import { COLORS } from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Profile() {
  const { profile, updateProfile } = useProfile();
  const [firstName, setFirstName] = useState(profile.firstName);
  const [lastName, setLastName] = useState(profile.lastName);
  const [email, setEmail] = useState(profile.email);
  const [mobileNumber, setMobileNumber] = useState(profile.mobileNumber);
  const [photoUri, setPhotoUri] = useState(profile.photoUri);
  const [showValidationErrors, setShowValidationErrors] = useState(false);

  const hasFirstNameError = showValidationErrors && !firstName.trim();
  const hasLastNameError = showValidationErrors && !lastName.trim();
  const hasEmailError =
    showValidationErrors && !EMAIL_PATTERN.test(email.trim());
  const hasMobileError = showValidationErrors && !mobileNumber.trim();

  async function chooseProfilePhoto() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        setPhotoUri(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Unable to select a profile photo:", error);
      Alert.alert(
        "Unable to open photos",
        "Please try selecting a profile photo again.",
      );
    }
  }

  function saveProfile() {
    setShowValidationErrors(true);

    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !EMAIL_PATTERN.test(email.trim()) ||
      !mobileNumber.trim()
    ) {
      return;
    }

    updateProfile({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      mobileNumber: mobileNumber.trim(),
      photoUri,
    });
    router.back();
  }

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.screen}>
      <StatusBar style="dark" />
      <Header
        title="Profile"
        centerTitle
        showBack
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.photoSection}>
            <Pressable
              accessibilityLabel="Change profile photo"
              accessibilityRole="button"
              onPress={chooseProfilePhoto}
              style={styles.photoButton}
            >
              <ProfileAvatar photoUri={photoUri} size={112} />
              <View style={styles.editPhotoBadge}>
                <Ionicons name="pencil" size={16} color={COLORS.background} />
              </View>
            </Pressable>
          </View>

          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Personal Information</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>First Name</Text>
              <TextInput
                accessibilityLabel="First Name"
                autoCapitalize="words"
                onChangeText={setFirstName}
                placeholder="Enter your first name"
                placeholderTextColor={COLORS.secondary}
                style={[styles.input, hasFirstNameError && styles.inputError]}
                value={firstName}
              />
              {hasFirstNameError ? (
                <Text accessibilityRole="alert" style={styles.fieldError}>
                  Enter your first name.
                </Text>
              ) : null}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Last Name</Text>
              <TextInput
                accessibilityLabel="Last Name"
                autoCapitalize="words"
                onChangeText={setLastName}
                placeholder="Enter your last name"
                placeholderTextColor={COLORS.secondary}
                style={[styles.input, hasLastNameError && styles.inputError]}
                value={lastName}
              />
              {hasLastNameError ? (
                <Text accessibilityRole="alert" style={styles.fieldError}>
                  Enter your last name.
                </Text>
              ) : null}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <TextInput
                accessibilityLabel="Email Address"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                onChangeText={setEmail}
                placeholder="Enter a valid email address"
                placeholderTextColor={COLORS.secondary}
                style={[styles.input, hasEmailError && styles.inputError]}
                value={email}
              />
              {hasEmailError ? (
                <Text accessibilityRole="alert" style={styles.fieldError}>
                  Enter a valid email address.
                </Text>
              ) : null}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Mobile Number</Text>
              <TextInput
                accessibilityLabel="Mobile Number"
                keyboardType="phone-pad"
                onChangeText={setMobileNumber}
                placeholder="Enter your phone number"
                placeholderTextColor={COLORS.secondary}
                style={[styles.input, hasMobileError && styles.inputError]}
                value={mobileNumber}
              />
              {hasMobileError ? (
                <Text accessibilityRole="alert" style={styles.fieldError}>
                  Enter your mobile number.
                </Text>
              ) : null}
            </View>
          </View>
        </ScrollView>

        <SafeAreaView edges={["bottom"]} style={styles.footer}>
          <TouchableOpacity
            accessibilityRole="button"
            onPress={saveProfile}
            style={styles.saveButton}
          >
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
