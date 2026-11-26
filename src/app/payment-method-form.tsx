import CheckoutHeader from "@/components/CheckoutHeader";
import { getPaymentCategory, isPaymentProvider } from "@/data/paymentProviders";
import { usePayment } from "@/context/PaymentContext";
import { COLORS } from "@/theme/colors";
import { styles } from "@/styles/payment-method-form.styles";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
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

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isCardProvider(provider: string) {
  return provider === "Visa" || provider === "Mastercard";
}

function isMobileWalletProvider(provider: string) {
  return provider === "GCash" || provider === "Maya";
}

function getIdentifierLabel(provider: string) {
  if (isMobileWalletProvider(provider)) return "Mobile Number";
  if (provider === "PayPal") return "PayPal Email";
  if (provider === "MariBank") return "Account Number";
  return "Last 4 Digits";
}

function getIdentifierPlaceholder(provider: string) {
  if (isMobileWalletProvider(provider)) return "09XXXXXXXXX";
  if (provider === "PayPal") return "name@example.com";
  if (provider === "MariBank") return "Enter account number";
  return "1234";
}

function isValidIdentifier(provider: string, identifier: string) {
  const trimmedIdentifier = identifier.trim();

  if (provider === "PayPal") {
    return EMAIL_PATTERN.test(trimmedIdentifier);
  }

  const digits = trimmedIdentifier.replace(/\D/g, "");
  if (isCardProvider(provider)) return digits.length === 4;
  if (isMobileWalletProvider(provider)) return digits.length === 11;
  return digits.length >= 4;
}

function maskIdentifier(provider: string, identifier: string) {
  const trimmedIdentifier = identifier.trim();

  if (provider === "PayPal") {
    const [username, domain] = trimmedIdentifier.split("@");
    const visibleCharacter = username.slice(0, 1);
    const hiddenCharacters = "*".repeat(Math.max(username.length - 1, 3));
    return `${visibleCharacter}${hiddenCharacters}@${domain}`;
  }

  const digits = trimmedIdentifier.replace(/\D/g, "");
  const lastFourDigits = digits.slice(-4);

  if (isCardProvider(provider) || provider === "MariBank") {
    return `**** **** **** ${lastFourDigits}`;
  }

  if (isMobileWalletProvider(provider)) {
    return `*******${lastFourDigits}`;
  }

  return `**** **** ${lastFourDigits}`;
}

export default function PaymentMethodForm() {
  const {
    provider: routeProvider,
    methodId: routeMethodId,
  } = useLocalSearchParams<{
    provider?: string;
    methodId?: string;
  }>();
  const providerValue = Array.isArray(routeProvider)
    ? routeProvider[0]
    : routeProvider;
  const methodId = Array.isArray(routeMethodId)
    ? routeMethodId[0]
    : routeMethodId;
  const provider = isPaymentProvider(providerValue) ? providerValue : null;
  const {
    savedPaymentMethods,
    addSavedPaymentMethod,
    updateSavedPaymentMethod,
  } = usePayment();
  const existingMethod = savedPaymentMethods.find(
    (method) => method.id === methodId,
  );
  const [accountName, setAccountName] = useState(
    existingMethod?.accountName ?? "",
  );
  const [identifier, setIdentifier] = useState("");
  const [showValidationErrors, setShowValidationErrors] = useState(false);
  const isEditing = methodId !== undefined;

  if (
    !provider ||
    (isEditing &&
      (!existingMethod || existingMethod.provider !== provider))
  ) {
    return (
      <SafeAreaView edges={["top", "left", "right"]} style={styles.screen}>
        <StatusBar style="dark" />
        <CheckoutHeader title="Add Payment Method" />
        <View style={styles.invalidState}>
          <Text style={styles.invalidMessage}>
            {isEditing
              ? "This saved payment method could not be found."
              : "This payment option could not be found."}
          </Text>
          <Pressable
            accessibilityRole="button"
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const selectedProvider = provider;
  const methodBeingEdited = existingMethod;
  const isCard = isCardProvider(selectedProvider);
  const identifierLabel = getIdentifierLabel(selectedProvider);
  const hasAccountNameError =
    showValidationErrors && accountName.trim().length === 0;
  const hasIdentifierError =
    showValidationErrors && !isValidIdentifier(selectedProvider, identifier);

  function savePaymentMethod() {
    setShowValidationErrors(true);

    if (
      !accountName.trim() ||
      !isValidIdentifier(selectedProvider, identifier)
    ) {
      return;
    }

    const updatedMethod = {
      provider: selectedProvider,
      category: getPaymentCategory(selectedProvider),
      accountName: accountName.trim(),
      maskedIdentifier: maskIdentifier(selectedProvider, identifier),
    };

    if (methodBeingEdited) {
      updateSavedPaymentMethod(methodBeingEdited.id, updatedMethod);
    } else {
      addSavedPaymentMethod(updatedMethod);
    }

    router.back();
  }

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.screen}>
      <StatusBar style="dark" />
      <CheckoutHeader
        title={`${isEditing ? "Edit" : "Add"} ${selectedProvider}`}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={styles.formContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.demoNotice}>
            <Ionicons
              name="information-circle-outline"
              size={20}
              color={COLORS.accent}
            />
            <Text style={styles.demoNoticeText}>
              {isEditing
                ? "Re-enter the payment detail to update it. Only a masked value is saved."
                : "Demo only. Use sample details; only a masked value will be saved."}
            </Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>
              {isCard ? "Cardholder Name" : "Account Name"}
            </Text>
            <TextInput
              accessibilityLabel={isCard ? "Cardholder Name" : "Account Name"}
              autoCapitalize="words"
              onChangeText={setAccountName}
              placeholder={
                isCard ? "Enter the cardholder name" : "Enter the account name"
              }
              placeholderTextColor={COLORS.secondary}
              style={[styles.input, hasAccountNameError && styles.inputError]}
              value={accountName}
            />
            {hasAccountNameError ? (
              <Text accessibilityRole="alert" style={styles.fieldError}>
                Enter a name.
              </Text>
            ) : null}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{identifierLabel}</Text>
            <TextInput
              accessibilityLabel={identifierLabel}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType={
                selectedProvider === "PayPal"
                  ? "email-address"
                  : isCard
                    ? "number-pad"
                    : "phone-pad"
              }
              onChangeText={setIdentifier}
              placeholder={getIdentifierPlaceholder(selectedProvider)}
              placeholderTextColor={COLORS.secondary}
              style={[styles.input, hasIdentifierError && styles.inputError]}
              value={identifier}
            />
            {hasIdentifierError ? (
              <Text accessibilityRole="alert" style={styles.fieldError}>
                {selectedProvider === "PayPal"
                  ? "Enter a valid PayPal email address."
                  : isCard
                    ? "Enter the last four digits."
                    : isMobileWalletProvider(selectedProvider)
                      ? "Enter an 11-digit mobile number."
                    : "Enter at least four digits."}
              </Text>
            ) : null}
          </View>
        </ScrollView>

        <SafeAreaView edges={["bottom"]} style={styles.footer}>
          <TouchableOpacity
            accessibilityRole="button"
            onPress={savePaymentMethod}
            style={styles.saveButton}
          >
            <Text style={styles.saveButtonText}>
              {isEditing ? "Save Changes" : "Save Payment Method"}
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
