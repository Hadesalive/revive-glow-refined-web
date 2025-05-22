
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export interface CartItem {
  id: string;
  product_id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  isLoading: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  addToCart: (product: any, quantity?: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchCartItems = async () => {
    try {
      setIsLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setCartItems([]);
        setIsLoading(false);
        return;
      }
      
      const { data: cartItems, error } = await supabase
        .from('cart_items')
        .select(`
          id,
          product_id,
          quantity,
          products (
            name,
            price,
            image_url
          )
        `)
        .eq('user_id', session.user.id);
      
      if (error) throw error;
      
      if (cartItems) {
        const formattedItems = cartItems.map(item => ({
          id: item.id,
          product_id: item.product_id,
          name: item.products?.name || '',
          price: item.products?.price || 0,
          image: item.products?.image_url || '',
          quantity: item.quantity,
        }));
        
        setCartItems(formattedItems);
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
    
    // Set up auth state listener to handle login/logout
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event) => {
        if (event === 'SIGNED_IN') {
          fetchCartItems();
        } else if (event === 'SIGNED_OUT') {
          setCartItems([]);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Add to cart function
  const addToCart = async (product: any, quantity = 1) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Please sign in",
          description: "You need to be signed in to add items to your cart",
        });
        return;
      }
      
      // Check if product already exists in cart
      const { data: existingItem } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', session.user.id)
        .eq('product_id', product.id)
        .single();
      
      if (existingItem) {
        // Update quantity if product already in cart
        const { error } = await supabase
          .from('cart_items')
          .update({ quantity: existingItem.quantity + quantity })
          .eq('id', existingItem.id);
        
        if (error) throw error;
      } else {
        // Add new item to cart
        const { error } = await supabase
          .from('cart_items')
          .insert([
            { 
              user_id: session.user.id, 
              product_id: product.id, 
              quantity 
            }
          ]);
        
        if (error) throw error;
      }
      
      await fetchCartItems();
      
      toast({
        title: "Added to cart",
        description: `${product.name} added to your cart`,
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast({
        title: "Something went wrong",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Remove from cart function
  const removeFromCart = async (productId: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) return;
      
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', session.user.id)
        .eq('product_id', productId);
      
      if (error) throw error;
      
      await fetchCartItems();
    } catch (error) {
      console.error("Error removing from cart:", error);
      toast({
        title: "Something went wrong",
        description: "Failed to remove item from cart. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Update quantity function
  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) return;
      
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('user_id', session.user.id)
        .eq('product_id', productId);
      
      if (error) throw error;
      
      await fetchCartItems();
    } catch (error) {
      console.error("Error updating cart:", error);
      toast({
        title: "Something went wrong",
        description: "Failed to update cart. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Clear cart function
  const clearCart = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) return;
      
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', session.user.id);
      
      if (error) throw error;
      
      setCartItems([]);
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast({
        title: "Something went wrong",
        description: "Failed to clear cart. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Calculate cart count and total
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const value = {
    cartItems,
    cartCount,
    cartTotal,
    isCartOpen,
    isLoading,
    setIsCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
