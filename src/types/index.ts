
import { Tables } from "@/integrations/supabase/types";

// Re-export Supabase table types for convenience
export type Product = Tables<"products">;
export type Profile = Tables<"profiles">;
export type Order = Tables<"orders">;
export type OrderItem = Tables<"order_items">;
export type CartItem = Tables<"cart_items">;

// Extend with additional types as needed
export type CartItemWithProduct = CartItem & {
  product: Product;
};

export type OrderWithItems = Order & {
  items: (OrderItem & { product: Product })[];
};

export type UserRole = "customer" | "admin";
