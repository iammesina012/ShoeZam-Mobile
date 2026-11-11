import CheckoutHeader from "@/components/CheckoutHeader";
import { useAddress } from "@/context/AddressContext";
import { styles } from "@/styles/checkout.styles";
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
  keyboardType?: KeyboardTypeOptions;
  multiline?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
};

const PERSONAL_INFORMATION_FIELDS: AddressField[] = [
  {
    key: "fullName",
    label: "Full Name",
    autoCapitalize: "words",
  },
  {
    key: "phoneNumber",
    label: "Contact Number",
    keyboardType: "phone-pad",
  },
];

const ADDRESS_LINE_FIELDS: AddressField[] = [
  {
    key: "addressLine1",
    label: "Address Line 1",
  },
  {
    key: "addressLine2",
    label: "Address Line 2 (Optional)",
  },
];

const POSTAL_CODE_FIELD: AddressField = {
  key: "postalCode",
  label: "ZIP / Postal Code",
};

const BARANGAY_FIELD: AddressField = {
  key: "barangay",
  label: "Barangay",
  autoCapitalize: "words",
};

const CITY_FIELD: AddressField = {
  key: "city",
  label: "City / Municipality",
  autoCapitalize: "words",
};

const PROVINCE_FIELD: AddressField = {
  key: "province",
  label: "Province / State",
  autoCapitalize: "words",
};

const ADDRESS_FIELD_ROWS: AddressField[][] = [
  [CITY_FIELD, PROVINCE_FIELD],
  [BARANGAY_FIELD, POSTAL_CODE_FIELD],
];

const EMPTY_ADDRESS: ShippingAddressInput = {
  fullName: "",
  phoneNumber: "",
  addressLine1: "",
  addressLine2: "",
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
    addressLine1: address.addressLine1,
    addressLine2: address.addressLine2,
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
  const [showValidationErrors, setShowValidationErrors] = useState(false);

  function saveAddress() {
    const hasMissingField = Object.entries(form).some(
      ([key, value]) =>
        key !== "addressLine2" && value.trim().length === 0,
    );

    if (hasMissingField) {
      setShowValidationErrors(true);
      return;
    }

    if (addressId) {
      if (!existingAddress) {
        return;
      }

      updateAddress(addressId, form);
    } else {
      addAddress(form);
    }

    router.back();
  }

  function renderField(field: AddressField, isColumn = false) {
    const hasFieldError =
      showValidationErrors &&
      field.key !== "addressLine2" &&
      form[field.key].trim().length === 0;

    return (
      <View
        key={field.key}
        style={
          isColumn
            ? [styles.inputGroup, styles.inputColumn]
            : styles.inputGroup
        }
      >
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
          }}
          style={[
            styles.input,
            hasFieldError && styles.inputError,
            field.multiline && styles.multilineInput,
          ]}
          value={form[field.key]}
        />
        {hasFieldError ? (
          <Text accessibilityRole="alert" style={styles.fieldError}>
            {field.label} is required.
          </Text>
        ) : null}
      </View>
    );
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
          {PERSONAL_INFORMATION_FIELDS.map((field) => (
            renderField(field)
          ))}

          {ADDRESS_LINE_FIELDS.map((field) => renderField(field))}

          {ADDRESS_FIELD_ROWS.map((fieldRow) => (
            <View key={fieldRow[0].key} style={styles.inputRow}>
              {fieldRow.map((field) => renderField(field, true))}
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
