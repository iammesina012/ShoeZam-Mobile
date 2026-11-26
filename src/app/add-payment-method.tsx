import CheckoutHeader from "@/components/CheckoutHeader";
import {
  CARD_NETWORKS,
  EWALLET_PROVIDERS,
  type PaymentProvider,
} from "@/data/paymentProviders";
import { COLORS } from "@/theme/colors";
import { styles } from "@/styles/add-payment-method.styles";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type PaymentCategory = "ewallet" | "card";

export default function AddPaymentMethod() {
  const [expandedCategory, setExpandedCategory] =
    useState<PaymentCategory | null>(null);

  function toggleCategory(category: PaymentCategory) {
    setExpandedCategory((currentCategory) =>
      currentCategory === category ? null : category,
    );
  }

  function addProvider(provider: PaymentProvider) {
    router.replace({
      pathname: "/payment-method-form",
      params: { provider },
    });
  }

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.screen}>
      <StatusBar style="dark" />
      <CheckoutHeader title="Add Payment Method" />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Choose a payment type</Text>
        <Text style={styles.description}>
          Select an e-wallet or card network to add.
        </Text>

        <Pressable
          accessibilityRole="button"
          accessibilityState={{ expanded: expandedCategory === "ewallet" }}
          onPress={() => toggleCategory("ewallet")}
          style={styles.methodCard}
        >
          <View style={styles.methodIcon}>
            <Ionicons
              name="phone-portrait-outline"
              size={24}
              color={COLORS.primary}
            />
          </View>
          <View style={styles.methodDetails}>
            <Text style={styles.methodName}>E-Wallet</Text>
            <Text style={styles.methodDescription}>
              GCash, Maya, PayPal, MariBank
            </Text>
          </View>
          <Ionicons
            name={
              expandedCategory === "ewallet"
                ? "chevron-up"
                : "chevron-down"
            }
            size={20}
            color={COLORS.secondary}
          />
        </Pressable>
        {expandedCategory === "ewallet" ? (
          <View style={styles.providerList}>
            {EWALLET_PROVIDERS.map((provider) => (
              <Pressable
                key={provider}
                accessibilityLabel={`Add ${provider}`}
                accessibilityRole="button"
                onPress={() => addProvider(provider)}
                style={styles.providerRow}
              >
                <Text style={styles.providerName}>{provider}</Text>
                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color={COLORS.secondary}
                />
              </Pressable>
            ))}
          </View>
        ) : null}

        <Pressable
          accessibilityRole="button"
          accessibilityState={{ expanded: expandedCategory === "card" }}
          onPress={() => toggleCategory("card")}
          style={styles.methodCard}
        >
          <View style={styles.methodIcon}>
            <Ionicons
              name="card-outline"
              size={24}
              color={COLORS.primary}
            />
          </View>
          <View style={styles.methodDetails}>
            <Text style={styles.methodName}>Debit or Credit Card</Text>
            <Text style={styles.methodDescription}>Visa, Mastercard</Text>
          </View>
          <Ionicons
            name={
              expandedCategory === "card" ? "chevron-up" : "chevron-down"
            }
            size={20}
            color={COLORS.secondary}
          />
        </Pressable>
        {expandedCategory === "card" ? (
          <View style={styles.providerList}>
            {CARD_NETWORKS.map((network) => (
              <Pressable
                key={network}
                accessibilityLabel={`Add ${network} card`}
                accessibilityRole="button"
                onPress={() => addProvider(network)}
                style={styles.providerRow}
              >
                <Text style={styles.providerName}>{network}</Text>
                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color={COLORS.secondary}
                />
              </Pressable>
            ))}
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}
