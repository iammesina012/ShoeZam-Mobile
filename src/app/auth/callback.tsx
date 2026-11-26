import { useAuth } from "@/context/AuthContext";
import { COLORS } from "@/theme/colors";
import { styles } from "@/styles/auth.styles";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function firstParam(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

export default function AuthCallback() {
  const { exchangeCodeForSession } = useAuth();
  const {
    code: routeCode,
    error: routeError,
    error_description: routeErrorDescription,
  } = useLocalSearchParams<{
    code?: string | string[];
    error?: string | string[];
    error_description?: string | string[];
  }>();
  const code = firstParam(routeCode);
  const error = firstParam(routeError);
  const errorDescription = firstParam(routeErrorDescription);
  const [isProcessing, setIsProcessing] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    async function completeSignIn() {
      if (error || errorDescription) {
        setMessage(
          errorDescription ??
            "The email confirmation link could not be completed.",
        );
        setIsProcessing(false);
        return;
      }

      if (!code) {
        setMessage(
          "This confirmation link is missing its code. Request a new email and try again.",
        );
        setIsProcessing(false);
        return;
      }

      try {
        await exchangeCodeForSession(code);
        if (isActive) router.replace("/tabs");
      } catch (callbackError) {
        if (!isActive) return;
        setMessage(
          callbackError instanceof Error
            ? callbackError.message
            : "Unable to confirm your email address.",
        );
      } finally {
        if (isActive) setIsProcessing(false);
      }
    }

    void completeSignIn();

    return () => {
      isActive = false;
    };
  }, [code, error, errorDescription, exchangeCodeForSession]);

  return (
    <SafeAreaView style={styles.screen} edges={["top", "left", "right"]}>
      <StatusBar style="dark" />
      <View style={callbackStyles.content}>
        {isProcessing ? (
          <>
            <ActivityIndicator color={COLORS.accent} />
            <Text style={callbackStyles.message}>
              Confirming your email...
            </Text>
          </>
        ) : (
          <>
            <Text style={callbackStyles.title}>
              {message ? "Email confirmation failed" : "Email confirmed"}
            </Text>
            <Text style={callbackStyles.message}>
              {message ??
                "Your account is ready. Taking you to ShoeZam..."}
            </Text>
            {message ? (
              <Pressable
                accessibilityRole="button"
                onPress={() => router.replace("/login")}
                style={styles.submitButton}
              >
                <Text style={styles.submitButtonText}>Back to Sign In</Text>
              </Pressable>
            ) : null}
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const callbackStyles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    gap: 16,
    paddingHorizontal: 24,
  },
  title: {
    color: COLORS.primary,
    fontSize: 20,
    fontWeight: "700" as const,
    textAlign: "center" as const,
  },
  message: {
    color: COLORS.fieldValue,
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center" as const,
  },
});
