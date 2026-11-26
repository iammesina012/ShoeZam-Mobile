import CheckoutHeader from "@/components/CheckoutHeader";
import ConfirmationModal from "@/components/ConfirmationModal";
import { COLORS } from "@/theme/colors";
import { styles } from "@/styles/payment-methods.styles";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { usePayment } from "@/context/PaymentContext";
import { useState } from "react";

export default function PaymentMethods() {
  const { savedPaymentMethods, removeSavedPaymentMethod } = usePayment();
  const [paymentMethodToRemove, setPaymentMethodToRemove] = useState<{
    id: string;
    provider: string;
  } | null>(null);

  function removeSelectedPaymentMethod() {
    if (paymentMethodToRemove) {
      removeSavedPaymentMethod(paymentMethodToRemove.id);
    }

    setPaymentMethodToRemove(null);
  }

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.screen}>
      <StatusBar style="dark" />
      <CheckoutHeader title="Payment Methods" />
      <ConfirmationModal
        visible={paymentMethodToRemove !== null}
        title="Remove Payment Method?"
        message={`Are you sure you want to remove ${paymentMethodToRemove?.provider ?? "this payment method"} from your saved payment methods?`}
        cancelText="Cancel"
        confirmText="Yes, remove"
        onCancel={() => setPaymentMethodToRemove(null)}
        onConfirm={removeSelectedPaymentMethod}
      />

      {savedPaymentMethods.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="card-outline" size={80} color={COLORS.secondary} />
          <Text style={styles.emptyTitle}>No saved payment methods</Text>
          <Text style={styles.emptyMessage}>
            Saved payment methods will appear here.
          </Text>

          <TouchableOpacity
            accessibilityRole="button"
            onPress={() => router.push("/add-payment-method")}
            style={styles.emptyButton}
          >
            <Text style={styles.emptyButtonText}>Add Payment Method</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <ScrollView
            contentContainerStyle={styles.savedMethodsContent}
            showsVerticalScrollIndicator={false}
          >
            {savedPaymentMethods.map((method) => (
              <View key={method.id} style={styles.savedMethodCard}>
                <View style={styles.methodIcon}>
                  <Ionicons
                    name={
                      method.category === "card"
                        ? "card-outline"
                        : "phone-portrait-outline"
                    }
                    size={22}
                    color={COLORS.primary}
                  />
                </View>
                <View style={styles.methodDetails}>
                  <Text style={styles.methodName}>{method.provider}</Text>
                  <Text style={styles.accountName}>{method.accountName}</Text>
                  <Text style={styles.maskedIdentifier}>
                    {method.maskedIdentifier}
                  </Text>
                </View>
                <View style={styles.methodActions}>
                  <TouchableOpacity
                    accessibilityLabel={`Edit ${method.provider} payment method`}
                    accessibilityRole="button"
                    onPress={() =>
                      router.push({
                        pathname: "/payment-method-form",
                        params: {
                          provider: method.provider,
                          methodId: method.id,
                        },
                      })
                    }
                    style={styles.actionButton}
                  >
                    <Ionicons
                      name="create-outline"
                      size={20}
                      color={COLORS.primary}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    accessibilityLabel={`Remove ${method.provider} payment method`}
                    accessibilityRole="button"
                    onPress={() =>
                      setPaymentMethodToRemove({
                        id: method.id,
                        provider: method.provider,
                      })
                    }
                    style={styles.actionButton}
                  >
                    <Ionicons
                      name="trash-outline"
                      size={20}
                      color={COLORS.accent}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>

          <SafeAreaView edges={["bottom"]} style={styles.footer}>
            <TouchableOpacity
              accessibilityRole="button"
              onPress={() => router.push("/add-payment-method")}
              style={styles.addButton}
            >
              <Ionicons name="add" size={21} color={COLORS.background} />
              <Text style={styles.addButtonText}>Add Payment Method</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </>
      )}
    </SafeAreaView>
  );
}
