import { usePersistentState } from "@/hooks/usePersistentState";
import { PAYMENT_METHODS, type PaymentMethodId } from "@/data/paymentMethods";
import type {
  NewSavedPaymentMethod,
  PaymentContextType,
  PersistenceState,
  SavedPaymentMethod,
} from "@/types";
import { createContext, useContext, type ReactNode } from "react";

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);
const STORAGE_KEY = "shoezam:payment-method:v1";
const SAVED_METHODS_STORAGE_KEY = "shoezam:saved-payment-methods:v1";
const DEFAULT_PAYMENT_METHOD_ID: PaymentMethodId = "cash-on-delivery";

function restorePaymentMethod(storedValue: unknown): PaymentMethodId {
  const savedMethod = PAYMENT_METHODS.find(
    (method) => method.id === storedValue && method.available,
  );

  return savedMethod?.id ?? DEFAULT_PAYMENT_METHOD_ID;
}

export function PaymentProvider({ children }: { children: ReactNode }) {
  const {
    value: selectedPaymentMethodId,
    setValue: setSelectedPaymentMethodId,
    persistence: selectedMethodPersistence,
  } = usePersistentState<PaymentMethodId>(
    STORAGE_KEY,
    DEFAULT_PAYMENT_METHOD_ID,
    restorePaymentMethod,
  );
  const {
    value: savedPaymentMethods,
    setValue: setSavedPaymentMethods,
    persistence: savedMethodsPersistence,
  } = usePersistentState<SavedPaymentMethod[]>(SAVED_METHODS_STORAGE_KEY, []);

  const persistence: PersistenceState = {
    error:
      selectedMethodPersistence.error ?? savedMethodsPersistence.error,
    status:
      selectedMethodPersistence.status === "error" ||
      savedMethodsPersistence.status === "error"
        ? "error"
        : selectedMethodPersistence.status === "loading" ||
            savedMethodsPersistence.status === "loading"
          ? "loading"
          : "ready",
    retry() {
      selectedMethodPersistence.retry();
      savedMethodsPersistence.retry();
    },
  };

  function selectPaymentMethod(paymentMethodId: PaymentMethodId) {
    const method = PAYMENT_METHODS.find(
      (option) => option.id === paymentMethodId,
    );

    if (!method?.available) {
      throw new Error(`Payment method "${paymentMethodId}" is not available.`);
    }

    setSelectedPaymentMethodId(paymentMethodId);
  }

  function addSavedPaymentMethod(method: NewSavedPaymentMethod) {
    const savedMethod: SavedPaymentMethod = {
      ...method,
      id: `saved-payment-${Date.now()}`,
    };

    setSavedPaymentMethods((currentMethods) => [savedMethod, ...currentMethods]);
  }

  function removeSavedPaymentMethod(methodId: string) {
    setSavedPaymentMethods((currentMethods) =>
      currentMethods.filter((method) => method.id !== methodId),
    );
  }

  function updateSavedPaymentMethod(
    methodId: string,
    updatedMethod: NewSavedPaymentMethod,
  ) {
    setSavedPaymentMethods((currentMethods) =>
      currentMethods.map((method) =>
        method.id === methodId
          ? { ...updatedMethod, id: methodId }
          : method,
      ),
    );
  }

  return (
    <PaymentContext.Provider
      value={{
        selectedPaymentMethodId,
        selectPaymentMethod,
        savedPaymentMethods,
        addSavedPaymentMethod,
        updateSavedPaymentMethod,
        removeSavedPaymentMethod,
        persistence,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
}

export function usePayment() {
  const context = useContext(PaymentContext);

  if (!context) {
    throw new Error("usePayment must be used within PaymentProvider");
  }

  return context;
}
