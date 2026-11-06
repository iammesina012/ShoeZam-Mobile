import CheckoutHeader from "@/components/CheckoutHeader";
import { useAddress } from "@/context/AddressContext";
import { styles } from "@/styles/checkout.styles";
import { COLORS } from "@/theme/colors";
import type { ShippingAddress, ShippingAddressInput } from "@/types";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  type KeyboardTypeOptions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type AddressField = {
  key: keyof ShippingAddressInput;
  label: string;
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
  multiline?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
};

const PERSONAL_INFORMATION_FIELDS: AddressField[] = [
  {
    key: "fullName",
    label: "Full Name",
    placeholder: "Enter your full name",
    autoCapitalize: "words",
  },
  {
    key: "phoneNumber",
    label: "Contact Number",
    placeholder: "Enter your contact number",
    keyboardType: "phone-pad",
  },
];

const STREET_ADDRESS_FIELD: AddressField = {
  key: "streetAddress",
  label: "Street Address",
  placeholder: "House number and street",
  multiline: true,
};

const BARANGAY_FIELD: AddressField = {
  key: "barangay",
  label: "Barangay",
  placeholder: "Enter your barangay",
  autoCapitalize: "words",
};

const POSTAL_CODE_FIELD: AddressField = {
  key: "postalCode",
  label: "Postal Code",
  placeholder: "Enter your postal code",
  keyboardType: "number-pad",
};

const CITY_FIELD: AddressField = {
  key: "city",
  label: "City",
  placeholder: "Enter your city",
  autoCapitalize: "words",
};

const PROVINCE_FIELD: AddressField = {
  key: "province",
  label: "Province",
  placeholder: "Enter your province",
  autoCapitalize: "words",
};

const ADDRESS_FIELD_ROWS: AddressField[][] = [
  [CITY_FIELD, PROVINCE_FIELD],
  [BARANGAY_FIELD, POSTAL_CODE_FIELD],
];

const EMPTY_ADDRESS: ShippingAddressInput = {
  fullName: "",
  phoneNumber: "",
  streetAddress: "",
  city: "",
  province: "",
  barangay: "",
  postalCode: "",
};

function getAddressInput(address?: ShippingAddress): ShippingAddressInput {
  if (!address) return { ...EMPTY_ADDRESS };

  return {
    fullName: address.fullName,
    phoneNumber: address.phoneNumber,
    streetAddress: address.streetAddress,
    city: address.city,
    province: address.province,
    barangay: address.barangay,
    postalCode: address.postalCode,
  };
}

export default function AddressForm() {
  const { addressId: routeAddressId } = useLocalSearchParams<{
    addressId?: string;
  }>();
  const addressId = Array.isArray(routeAddressId)
    ? routeAddressId[0]
    : routeAddressId;

  return <AddressFormFields key={addressId ?? "new"} addressId={addressId} />;
}

function AddressFormFields({ addressId }: { addressId?: string }) {
  const { addresses, addAddress, updateAddress } = useAddress();
  const existingAddress = addresses.find(
    (address) => address.id === addressId,
  );
  const [form, setForm] = useState<ShippingAddressInput>(() =>
    getAddressInput(existingAddress),
  );
  const [formError, setFormError] = useState("");

  function saveAddress() {
    const hasMissingField = Object.values(form).some(
      (value) => value.trim().length === 0,
    );

    if (hasMissingField) {
      setFormError("Please complete all address and contact information.");
      return;
    }

    if (addressId) {
      if (!existingAddress) {
        setFormError("This address could not be found.");
        return;
      }

      updateAddress(addressId, form);
    } else {
      addAddress(form);
    }

    router.back();
  }

  if (addressId && !existingAddress) {
    return (
      <SafeAreaView
        edges={["top", "left", "right"]}
        style={styles.selectionScreen}
      >
        <StatusBar style="dark" />
        <CheckoutHeader title="Edit Address" />
        <Text style={[styles.emptyMessage, { margin: 24 }]}>
          This address could not be found.
        </Text>
      </SafeAreaView>
    );
  }

  const title = addressId ? "Edit Address" : "Add New Address";

  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      style={styles.selectionScreen}
    >
      <StatusBar style="dark" />
      <CheckoutHeader title={title} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.formContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {formError ? (
            <Text accessibilityRole="alert" style={styles.formError}>
              {formError}
            </Text>
          ) : null}

          <View style={styles.formSection}>
            <Text style={styles.formSectionTitle}>Personal Information</Text>
            <View style={styles.formSectionDivider} />
          </View>
          {PERSONAL_INFORMATION_FIELDS.map((field) => (
            <View key={field.key} style={styles.inputGroup}>
              <Text style={styles.inputLabel}>{field.label}</Text>
              <TextInput
                accessibilityLabel={field.label}
                autoCapitalize={field.autoCapitalize ?? "sentences"}
                keyboardType={field.keyboardType}
                multiline={field.multiline}
                onChangeText={(value) => {
                  setForm((currentForm) => ({
                    ...currentForm,
                    [field.key]: value,
                  }));
                  setFormError("");
                }}
                placeholder={field.placeholder}
                placeholderTextColor={COLORS.secondary}
                style={[
                  styles.input,
                  field.multiline && styles.multilineInput,
                ]}
                value={form[field.key]}
              />
            </View>
          ))}

          <View style={styles.formSection}>
            <Text style={styles.formSectionTitle}>Address</Text>
            <View style={styles.formSectionDivider} />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{STREET_ADDRESS_FIELD.label}</Text>
            <TextInput
              accessibilityLabel={STREET_ADDRESS_FIELD.label}
              autoCapitalize="sentences"
              multiline
              onChangeText={(value) => {
                setForm((currentForm) => ({
                  ...currentForm,
                  streetAddress: value,
                }));
                setFormError("");
              }}
              placeholder={STREET_ADDRESS_FIELD.placeholder}
              placeholderTextColor={COLORS.secondary}
              style={[styles.input, styles.multilineInput]}
              value={form.streetAddress}
            />
          </View>

          {ADDRESS_FIELD_ROWS.map((fieldRow) => (
            <View key={fieldRow[0].key} style={styles.inputRow}>
              {fieldRow.map((field) => (
                <View key={field.key} style={[styles.inputGroup, styles.inputColumn]}>
                  <Text style={styles.inputLabel}>{field.label}</Text>
                  <TextInput
                    accessibilityLabel={field.label}
                    autoCapitalize={field.autoCapitalize ?? "sentences"}
                    keyboardType={field.keyboardType}
                    onChangeText={(value) => {
                      setForm((currentForm) => ({
                        ...currentForm,
                        [field.key]: value,
                      }));
                      setFormError("");
                    }}
                    placeholder={field.placeholder}
                    placeholderTextColor={COLORS.secondary}
                    style={styles.input}
                    value={form[field.key]}
                  />
                </View>
              ))}
            </View>
          ))}
        </ScrollView>

        <SafeAreaView edges={["bottom"]} style={styles.formFooter}>
          <TouchableOpacity
            accessibilityRole="button"
            onPress={saveAddress}
            style={styles.addAddressButton}
          >
            <Text style={styles.addAddressButtonText}>
              {addressId ? "Save Address" : "Add Address"}
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
