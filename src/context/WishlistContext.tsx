import type { WishlistContextType } from "@/types";
import { usePersistentState } from "@/hooks/usePersistentState";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

// make an empty box (it starts with nothing inside)
const WishlistContext = createContext<WishlistContextType | undefined>(undefined);
const STORAGE_KEY = "shoezam:wishlist:v1";

// it is the component or function that owns the wishlist and shares it with everything inside its tags
export function WishlistProvider({ children }: { children: ReactNode }) {
  // list of hearted IDs, the one who sets the new array, and the array starts empty
  const {
    value: wishlistIds,
    setValue: setWishlistIds,
    persistence,
  } = usePersistentState<string[]>(STORAGE_KEY, []);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTime = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (toastTime.current) clearTimeout(toastTime.current);
    };
  }, []);

  function showWishlistToast(message: string) {
    setToastMessage(message);

    if (toastTime.current) clearTimeout(toastTime.current);
    toastTime.current = setTimeout(() => setToastMessage(null), 3000);
  }

  // the wishlist button logic
  function toggleWishlist(productId: string) {
    setWishlistIds(
      (currentIds) =>
        currentIds.includes(productId) // is the ID already in the list?
          ? currentIds.filter((id) => id !== productId) // if yes, make a new list without it
          : [...currentIds, productId], // if no, make a new list with it added at the end
    );
  }

  // put the list and toggle button into the box
  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        toggleWishlist,
        toastMessage,
        showWishlistToast,
        persistence,
      }}
    >
      {/* everything between the WishlistProvider tags can open or access the box */}
      {children}
    </WishlistContext.Provider>
  );
}

// the shortcut a screen uses to open the box
export function useWishlist() {
  // open the box and look what's inside
  const context = useContext(WishlistContext);

  // if the box is empty, the screen is outside the provider, so stop with a clear message
  if (!context) {
    throw new Error("useWishlist must be used within WishlistProvider");
  }

  // give the screen the list and the toggle button
  return context;
}
