import { api } from "./axios";

interface OrderItemPayload {
  productId: number;
  quantity: number;
}

interface CreateOrderPayload {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  items: OrderItemPayload[];
}

export async function createOrder(payload: CreateOrderPayload) {
  const response = await api.post("/orders", payload);
  return response.data;
}
