import type { NewOrder, Order, OrderContextType } from "@/types";
import { usePersistentState } from "@/hooks/usePersistentState";
import { createContext, useContext, type ReactNode } from "react";

const OrderContext = createContext<OrderContextType | undefined>(undefined);
const STORAGE_KEY = "shoezam:orders:v1";

export function OrderProvider({ children }: { children: ReactNode }) {
  const {
    value: orders,
    setValue: setOrders,
    persistence,
  } = usePersistentState<Order[]>(STORAGE_KEY, []);

  function createOrder(order: NewOrder) {
    const newOrder: Order = {
      ...order,
      id: `SZ-${Date.now()}`,
      date: new Date().toISOString(),
      status: "placed",
    };

    setOrders((currentOrders) => [newOrder, ...currentOrders]);
  }

  return (
    <OrderContext.Provider value={{ orders, createOrder, persistence }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);

  if (!context) {
    throw new Error("useOrders must be used within OrderProvider");
  }

  return context;
}
