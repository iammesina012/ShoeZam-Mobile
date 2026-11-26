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

export default function Login() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showValidationErrors, setShowValidationErrors] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hasEmailError =
    showValidationErrors && !EMAIL_PATTERN.test(email.trim());
  const hasPasswordError = showValidationErrors && !password.trim();

  async function handleSignIn() {
    setShowValidationErrors(true);
    setAuthError(null);

    if (!EMAIL_PATTERN.test(email.trim()) || !password.trim()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await signIn(email.trim(), password);
    } catch (error) {
      setAuthError(
        error instanceof Error ? error.message : "Unable to sign in.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.screen}>
      <StatusBar style="dark" />
      <Header title="Sign In" centerTitle />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>
            Sign in to your ShoeZam account.
          </Text>

          <View style={styles.formSection}>
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
                placeholder="Enter your password"
                placeholderTextColor={COLORS.secondary}
                returnKeyType="done"
                secureTextEntry
                style={[styles.input, hasPasswordError && styles.inputError]}
                value={password}
              />
              {hasPasswordError ? (
                <Text accessibilityRole="alert" style={styles.fieldError}>
                  Enter your password.
                </Text>
              ) : null}
            </View>
          </View>

          {authError ? (
            <Text accessibilityRole="alert" style={styles.errorNotice}>
              {authError}
            </Text>
          ) : null}

          <Pressable
            accessibilityRole="button"
            accessibilityState={{ disabled: isSubmitting }}
            disabled={isSubmitting}
            onPress={handleSignIn}
            style={[
              styles.submitButton,
              isSubmitting && styles.submitButtonDisabled,
            ]}
          >
            <Text style={styles.submitButtonText}>
              {isSubmitting ? "Signing In..." : "Sign In"}
            </Text>
          </Pressable>

          <View style={styles.switchPrompt}>
            <Text style={styles.switchPromptText}>New to ShoeZam?</Text>
            <Pressable
              accessibilityRole="button"
              onPress={() => router.push("/register")}
            >
              <Text style={styles.switchLink}>Create an account</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
