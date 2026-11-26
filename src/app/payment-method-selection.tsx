import CheckoutHeader from "@/components/CheckoutHeader";
import { usePayment } from "@/context/PaymentContext";
import { PAYMENT_METHODS } from "@/data/paymentMethods";
import { COLORS } from "@/theme/colors";
import { styles } from "@/styles/payment-method-selection.styles";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PaymentMethodSelection() {
  const { selectedPaymentMethodId, selectPaymentMethod } = usePayment();

  function choosePaymentMethod(
    paymentMethodId: (typeof PAYMENT_METHODS)[number]["id"],
  ) {
    selectPaymentMethod(paymentMethodId);
    router.back();
  }

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.screen}>
      <StatusBar style="dark" />
      <CheckoutHeader title="Choose Payment Method" />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.intro}>
          Choose how you would like to pay for your order.
        </Text>

        {PAYMENT_METHODS.map((method) => {
          const isSelected = method.id === selectedPaymentMethodId;

          return (
            <Pressable
              key={method.id}
              accessibilityLabel={`${method.label}${method.available ? "" : ", coming soon"}`}
              accessibilityRole="radio"
              accessibilityState={{
                checked: isSelected,
                disabled: !method.available,
              }}
              disabled={!method.available}
              onPress={() => choosePaymentMethod(method.id)}
              style={[
                styles.methodCard,
                isSelected && styles.methodCardSelected,
                !method.available && styles.methodCardDisabled,
              ]}
            >
              <View style={styles.methodIcon}>
                <Ionicons
                  name={method.icon}
                  size={23}
                  color={method.available ? COLORS.primary : COLORS.secondary}
                />
              </View>

              <View style={styles.methodDetails}>
                <Text style={styles.methodName}>{method.label}</Text>
                <Text style={styles.methodDescription}>
                  {method.description}
                </Text>
              </View>

              {method.available ? (
                <Ionicons
                  name={isSelected ? "radio-button-on" : "radio-button-off"}
                  size={22}
                  color={isSelected ? COLORS.accent : COLORS.secondary}
                />
              ) : (
                <Text style={styles.comingSoon}>Coming soon</Text>
              )}
            </Pressable>
          );
        })}
      </ScrollView>

      <SafeAreaView edges={["bottom"]} style={styles.footer}>
        <View style={styles.notice}>
          <Ionicons
            name="shield-checkmark-outline"
            size={18}
            color={COLORS.secondary}
          />
          <Text style={styles.noticeText}>
            Digital payments will be enabled once secure payment processing is
            available.
          </Text>
        </View>
      </SafeAreaView>
    </SafeAreaView>
  );
}
