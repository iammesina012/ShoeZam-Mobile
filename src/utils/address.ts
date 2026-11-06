import type { ShippingAddress } from "@/types";

export function formatShippingAddress(address: ShippingAddress) {
  return [
    address.streetAddress,
    address.barangay,
    address.city,
    address.province,
    address.postalCode,
  ].join(", ");
}
