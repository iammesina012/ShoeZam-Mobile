import type {
  AddressContextType,
  ShippingAddress,
  ShippingAddressInput,
} from "@/types";
import { createContext, useContext, useState, type ReactNode } from "react";

const AddressContext = createContext<AddressContextType | undefined>(undefined);

export function AddressProvider({ children }: { children: ReactNode }) {
  const [addresses, setAddresses] = useState<ShippingAddress[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null,
  );

  const selectedAddress =
    addresses.find((address) => address.id === selectedAddressId) ?? null;

  function addAddress(addressInput: ShippingAddressInput) {
    const address = {
      ...addressInput,
      id: `address-${Date.now()}`,
    };

    setAddresses((currentAddresses) => [...currentAddresses, address]);
    setSelectedAddressId(address.id);
  }

  function updateAddress(
    addressId: string,
    addressInput: ShippingAddressInput,
  ) {
    setAddresses((currentAddresses) =>
      currentAddresses.map((address) =>
        address.id === addressId ? { ...address, ...addressInput } : address,
      ),
    );
  }

  function selectAddress(addressId: string) {
    setSelectedAddressId(addressId);
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
