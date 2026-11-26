import CheckoutHeader from "@/components/CheckoutHeader";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "@/styles/terms-privacy.styles";

type DocumentSection = {
  title: string;
  body: string;
};

const DOCUMENTS: Record<"terms" | "privacy", DocumentSection[]> = {
  terms: [
    {
      title: "Prototype app",
      body:
        "ShoeZam is currently a shopping-app prototype. Product listings, prices, and availability are for demonstration and may not represent items available for sale.",
    },
    {
      title: "Orders and payments",
      body:
        "Placing an order currently saves it to Order History on this device. It does not submit a real purchase or arrange delivery. Cash on Delivery is the only checkout payment option currently available; online payments are not processed.",
    },
    {
      title: "Using the app",
      body:
        "Use ShoeZam lawfully and provide accurate information when trying its profile, address, and checkout features. Features and sample content may change as the prototype is developed.",
    },
  ],
  privacy: [
    {
      title: "Information saved in the app",
      body:
        "The app can save profile details you enter, including your name, username, email, mobile number, and profile photo reference. It can also save shipping addresses, bag and wishlist contents, order history, and your selected payment option.",
    },
    {
      title: "Where information is stored",
      body:
        "In this version, app information is saved locally on your device. ShoeZam does not currently have account sign-in or cloud sync, so saved information is not synced between devices.",
    },
    {
      title: "Payment details",
      body:
        "Payment methods are for demonstration only. When you save a payment method, the app stores the account name and a masked identifier, not the full card number or account identifier. Do not enter real payment credentials into this prototype.",
    },
    {
      title: "Prototype notice",
      body:
        "This notice describes the current app behavior and is not a final legal policy. Review and update it before releasing ShoeZam with real purchases, accounts, or online data services.",
    },
  ],
};

export default function TermsPrivacy() {
  const [activeDocument, setActiveDocument] = useState<"terms" | "privacy">(
    "terms",
  );
  const isTerms = activeDocument === "terms";

  return (
    <SafeAreaView style={styles.screen} edges={["top", "left", "right"]}>
      <StatusBar style="dark" />
      <CheckoutHeader title="Terms & Privacy" />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.documentPicker}>
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected: isTerms }}
            onPress={() => setActiveDocument("terms")}
            style={[
              styles.documentButton,
              isTerms && styles.selectedDocumentButton,
            ]}
          >
            <Text
              style={[
                styles.documentButtonText,
                isTerms && styles.selectedDocumentButtonText,
              ]}
            >
              Terms of Use
            </Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected: !isTerms }}
            onPress={() => setActiveDocument("privacy")}
            style={[
              styles.documentButton,
              !isTerms && styles.selectedDocumentButton,
            ]}
          >
            <Text
              style={[
                styles.documentButtonText,
                !isTerms && styles.selectedDocumentButtonText,
              ]}
            >
              Privacy
            </Text>
          </Pressable>
        </View>

        <View style={styles.notice}>
          <Text style={styles.noticeTitle}>Prototype information</Text>
          <Text style={styles.noticeText}>
            This summary reflects how ShoeZam works today. It is not final
            legal copy.
          </Text>
        </View>

        <Text style={styles.documentTitle}>
          {isTerms ? "Terms of Use" : "Privacy Notice"}
        </Text>

        {DOCUMENTS[activeDocument].map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.sectionBody}>{section.body}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
