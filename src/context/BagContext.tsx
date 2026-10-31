import type { BagContextType, BagItem } from "@/types";
import { createContext, useContext, useState, type ReactNode } from "react";

const BagContext = createContext<BagContextType | undefined>(undefined);

export function BagProvider({ children }: { children: ReactNode }) {
  const [bagItems, setBagItems] = useState<BagItem[]>([]);

  function addToBag(productId: string, color: string, size: string) {
    // use the latest bag state to check whether this exact shoe option is already in it.
    setBagItems((currentBagItems) => {
      const existingBagItem = currentBagItems.find(
        (item) =>
          item.productId === productId &&
          item.color === color &&
          item.size === size,
      );

      // if it exists, create a new array and increase only that item's quantity.
      if (existingBagItem) {
        return currentBagItems.map((item) =>
          item === existingBagItem
            ? // Copy its other properties and replace quantity with the increased value.
              { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      // else, append a new item with quantity 1.
      return [...currentBagItems, { productId, color, size, quantity: 1 }];
    });
  }

  return (
    <BagContext.Provider value={{ bagItems, addToBag }}>
      {children}
    </BagContext.Provider>
  );
}

export function useBag() {
  const context = useContext(BagContext);

  if (!context) {
    throw new Error("useBag must be used within BagProvider");
  }

  return context;
}
