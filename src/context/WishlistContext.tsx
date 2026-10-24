import { createContext, useContext, useState, type ReactNode } from "react";

// just describes what is inside the box: a list of IDs and a toggle button
type WishlistContextType = {
  wishlistIds: string[]; // wishlistIds must be an array of string
  toggleWishlist: (productId: string) => void; // toggleWishlist must be string and can't return a value
};

// make an empty box (it starts with nothing inside)
const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

//it is the component or function that owns the wishlist and shares it with everything inside its tags
export function WishlistProvider({ children }: { children: ReactNode }) {
  // list of hearted IDs, the one who sets the new array, and the array starts empty
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  
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
    <WishlistContext.Provider value={{ wishlistIds, toggleWishlist }}>
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
