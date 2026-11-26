import Header from "@/components/Header";
import { useAuth } from "@/context/AuthContext";
import { COLORS } from "@/theme/colors";
import { styles } from "@/styles/auth.styles";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;

export default function Register() {
  const { signUp } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showValidationErrors, setShowValidationErrors] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [confirmationNotice, setConfirmationNotice] = useState<string | null>(
    null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hasFullNameError = showValidationErrors && !fullName.trim();
  const hasEmailError =
    showValidationErrors && !EMAIL_PATTERN.test(email.trim());
  const hasPasswordError =
    showValidationErrors &&
    (password.trim().length === 0 || password.length < MIN_PASSWORD_LENGTH);
  const hasConfirmPasswordError =
    showValidationErrors && password !== confirmPassword;

  async function createAccount() {
    setShowValidationErrors(true);
    setAuthError(null);
    setConfirmationNotice(null);

    if (
      !fullName.trim() ||
      !EMAIL_PATTERN.test(email.trim()) ||
      !password.trim() ||
      password.length < MIN_PASSWORD_LENGTH ||
      password !== confirmPassword
    ) {
      return;
    }

    setIsSubmitting(true);

    try {
      const sessionCreated = await signUp(
        fullName.trim(),
        email.trim(),
        password,
      );

      if (sessionCreated) {
        router.replace("/tabs");
      } else {
        setConfirmationNotice(
          "Check your email for a confirmation link, then open it to finish creating your account.",
        );
      }
    } catch (error) {
      setAuthError(
        error instanceof Error
          ? error.message
          : "Unable to create your account.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.screen}>
      <StatusBar style="dark" />
      <Header
        title="Create Account"
        centerTitle
        onBackPress={() => router.replace("/login")}
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
          <Text style={styles.title}>Join ShoeZam</Text>
          <Text style={styles.subtitle}>
            Create an account to keep your details in one place.
          </Text>

          <View style={styles.formSection}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Full Name</Text>
              <TextInput
                accessibilityLabel="Full Name"
                autoCapitalize="words"
                onChangeText={setFullName}
                placeholder="Enter your full name"
                placeholderTextColor={COLORS.secondary}
                returnKeyType="next"
                style={[styles.input, hasFullNameError && styles.inputError]}
                value={fullName}
              />
              {hasFullNameError ? (
                <Text accessibilityRole="alert" style={styles.fieldError}>
                  Enter your full name.
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
                placeholder="name@example.com"
                placeholderTextColor={COLORS.secondary}
                returnKeyType="next"
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
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                accessibilityLabel="Password"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={setPassword}
                placeholder="At least 8 characters"
                placeholderTextColor={COLORS.secondary}
                returnKeyType="next"
                secureTextEntry
                style={[styles.input, hasPasswordError && styles.inputError]}
                value={password}
              />
              {hasPasswordError ? (
                <Text accessibilityRole="alert" style={styles.fieldError}>
                  Use at least 8 characters.
                </Text>
              ) : null}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Confirm Password</Text>
              <TextInput
                accessibilityLabel="Confirm Password"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={setConfirmPassword}
                placeholder="Re-enter your password"
                placeholderTextColor={COLORS.secondary}
                returnKeyType="done"
                secureTextEntry
                style={[
                  styles.input,
                  hasConfirmPasswordError && styles.inputError,
                ]}
                value={confirmPassword}
              />
              {hasConfirmPasswordError ? (
                <Text accessibilityRole="alert" style={styles.fieldError}>
                  Passwords do not match.
                </Text>
              ) : null}
            </View>
          </View>

          {authError ? (
            <Text accessibilityRole="alert" style={styles.errorNotice}>
              {authError}
            </Text>
          ) : null}

          {confirmationNotice ? (
            <Text accessibilityRole="alert" style={styles.submitNotice}>
              {confirmationNotice}
            </Text>
          ) : null}

          <Pressable
            accessibilityRole="button"
            accessibilityState={{ disabled: isSubmitting }}
            disabled={isSubmitting}
            onPress={createAccount}
            style={[
              styles.submitButton,
              isSubmitting && styles.submitButtonDisabled,
            ]}
          >
            <Text style={styles.submitButtonText}>
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </Text>
          </Pressable>

          <View style={styles.switchPrompt}>
            <Text style={styles.switchPromptText}>
              Already have an account?
            </Text>
            <Pressable
              accessibilityRole="button"
              onPress={() => router.push("/login")}
            >
              <Text style={styles.switchLink}>Sign in</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
