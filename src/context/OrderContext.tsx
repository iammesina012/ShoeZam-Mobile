import type { NewOrder, Order, OrderContextType } from "@/types";
import { createContext, useContext, useState, type ReactNode } from "react";

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);

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
    <OrderContext.Provider value={{ orders, createOrder }}>
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
