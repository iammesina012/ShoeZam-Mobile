import CheckoutHeader from "@/components/CheckoutHeader";
import { COLORS } from "@/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "@/styles/help-center.styles";

const FAQ_ITEMS = [
  {
    question: "How do I find a pair of shoes?",
    answer:
      "Browse shoes from the Shop button on the Home screen, or use search to look for a product. Open a product to see its available colors and sizes.",
  },
  {
    question: "How do I add a shoe to my bag?",
    answer:
      "Open the product, choose an available color and size, then tap Add to Bag. You can review your items from the Bag tab.",
  },
  {
    question: "How do I place an order?",
    answer:
      "Open your Bag and continue to checkout. Add or select a shipping address and choose an available payment method before tapping Place Order.",
  },
  {
    question: "Where can I see my orders?",
    answer:
      "Open My Account, then tap Order History. Orders you place in the app will appear there.",
  },
];

export default function HelpCenter() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <SafeAreaView style={styles.screen} edges={["top", "left", "right"]}>
      <StatusBar style="dark" />
      <CheckoutHeader title="Help Center" />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.introCard}>
          <View style={styles.introIcon}>
            <Ionicons
              name="chatbubbles-outline"
              size={28}
              color={COLORS.accent}
            />
          </View>
          <Text style={styles.title}>How can we help?</Text>
          <Text style={styles.subtitle}>
            Find quick answers to common questions about using ShoeZam.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Frequently asked questions</Text>

        <View style={styles.faqList}>
          {FAQ_ITEMS.map((item, index) => {
            const isExpanded = expandedIndex === index;

            return (
              <View key={item.question} style={styles.faqItem}>
                <Pressable
                  accessibilityRole="button"
                  accessibilityState={{ expanded: isExpanded }}
                  onPress={() =>
                    setExpandedIndex(isExpanded ? null : index)
                  }
                  style={styles.questionRow}
                >
                  <Text style={styles.question}>{item.question}</Text>
                  <Ionicons
                    name={isExpanded ? "remove" : "add"}
                    size={22}
                    color={COLORS.primary}
                  />
                </Pressable>
                {isExpanded && (
                  <Text style={styles.answer}>{item.answer}</Text>
                )}
              </View>
            );
          })}
        </View>

        <View style={styles.contactNote}>
          <Ionicons
            name="information-circle-outline"
            size={20}
            color={COLORS.secondary}
          />
          <Text style={styles.contactText}>
            More support options will be added here soon.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
