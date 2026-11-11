import type { ShippingAddress } from "@/types";

export function formatShippingAddress(address: ShippingAddress) {
  return [
    address.addressLine1,
    address.addressLine2,
    address.barangay,
    address.city,
    address.province,
    address.postalCode,
  ]
    .filter((part) => part.trim().length > 0)
    .join(", ");
}
