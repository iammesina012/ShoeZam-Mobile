import type {
  AddressContextType,
  ShippingAddress,
  ShippingAddressInput,
} from "@/types";
import { usePersistentState } from "@/hooks/usePersistentState";
import { createContext, useContext, type ReactNode } from "react";

const AddressContext = createContext<AddressContextType | undefined>(undefined);
const STORAGE_KEY = "shoezam:addresses:v1";

type SavedAddressData = {
  addresses: ShippingAddress[];
  selectedAddressId: string | null;
};

export function AddressProvider({ children }: { children: ReactNode }) {
  const {
    value: savedAddressData,
    setValue: setSavedAddressData,
    persistence,
  } = usePersistentState<SavedAddressData>(STORAGE_KEY, {
    addresses: [],
    selectedAddressId: null,
  });
  const { addresses, selectedAddressId } = savedAddressData;

  const selectedAddress =
    addresses.find((address) => address.id === selectedAddressId) ?? null;

  function addAddress(addressInput: ShippingAddressInput) {
    const address = {
      ...addressInput,
      id: `address-${Date.now()}`,
    };

    setSavedAddressData((currentData) => ({
      addresses: [...currentData.addresses, address],
      selectedAddressId: address.id,
    }));
  }

  function updateAddress(
    addressId: string,
    addressInput: ShippingAddressInput,
  ) {
    setSavedAddressData((currentData) => ({
      ...currentData,
      addresses: currentData.addresses.map((address) =>
        address.id === addressId ? { ...address, ...addressInput } : address,
      ),
    }));
  }

  function selectAddress(addressId: string) {
    setSavedAddressData((currentData) => ({
      ...currentData,
      selectedAddressId: addressId,
    }));
  }

  return (
    <AddressContext.Provider
      value={{
        addresses,
        selectedAddressId,
        selectedAddress,
        addAddress,
        updateAddress,
        selectAddress,
        persistence,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
}

export function useAddress() {
  const context = useContext(AddressContext);

  if (!context) {
    throw new Error("useAddress must be used within AddressProvider");
  }

  return context;
}
