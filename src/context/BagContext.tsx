import type { BagContextType, BagItem } from "@/types";
import { usePersistentState } from "@/hooks/usePersistentState";
import { createContext, useContext, type ReactNode } from "react";

const BagContext = createContext<BagContextType | undefined>(undefined);
const STORAGE_KEY = "shoezam:bag:v1";

export function BagProvider({ children }: { children: ReactNode }) {
  const {
    value: bagItems,
    setValue: setBagItems,
    persistence,
  } = usePersistentState<BagItem[]>(STORAGE_KEY, []);

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

      // if does not exist, append a new item with quantity 1.
      return [...currentBagItems, { productId, color, size, quantity: 1 }];
    });
  }

  function increaseQuantity(productId: string, color: string, size: string) {
    setBagItems((currentBagItems) => {
      const existingBagItem = currentBagItems.find(
        (item) =>
          item.productId === productId &&
          item.color === color &&
          item.size === size,
      );

      // if the item exists, update its quantity.
      if (existingBagItem) {
        return currentBagItems.map((item) =>
          item === existingBagItem
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      // if the item doesn't exist, return the original array.
      return currentBagItems;
    });
  }

  function decreaseQuantity(productId: string, color: string, size: string) {
    setBagItems((currentBagItems) => {
      const existingBagItem = currentBagItems.find(
        (item) =>
          item.productId === productId &&
          item.color === color &&
          item.size === size,
      );

      // if the item exists and if the current item is equal to 1, remove the product

      if (existingBagItem) {
        if (existingBagItem.quantity === 1) {
          return currentBagItems.filter((item) => item !== existingBagItem);
        }

        // if the item exists, update its quantity (decrease by 1).
        return currentBagItems.map((item) =>
          item === existingBagItem
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        );
      }

      // if the item doesn't exist, return the original array.
      return currentBagItems;
    });
  }

  function removeFromBag(productId: string, color: string, size: string) {
    setBagItems((currentBagItems) =>
      currentBagItems.filter(
        (item) =>
          item.productId !== productId ||
          item.color !== color ||
          item.size !== size,
      ),
    );
  }

  function clearBag() {
    setBagItems([]);
  }

  return (
    <BagContext.Provider
      value={{
        bagItems,
        addToBag,
        increaseQuantity,
        decreaseQuantity,
        removeFromBag,
        clearBag,
        persistence,
      }}
    >
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
