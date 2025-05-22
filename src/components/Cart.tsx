
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Loader2, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { cn } from "@/lib/utils";
import emptyCartImage from "/placeholder.svg";

export function Cart() {
  const { 
    cartItems, 
    cartTotal, 
    cartCount,
    isCartOpen, 
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    isLoading
  } = useCart();
  
  const [processingItems, setProcessingItems] = useState<Set<string>>(new Set());

  const handleUpdateQuantity = async (productId: string, newQuantity: number) => {
    setProcessingItems(prev => new Set([...prev, productId]));
    await updateQuantity(productId, newQuantity);
    setProcessingItems(prev => {
      const updated = new Set([...prev]);
      updated.delete(productId);
      return updated;
    });
  };

  const handleRemoveItem = async (productId: string) => {
    setProcessingItems(prev => new Set([...prev, productId]));
    await removeFromCart(productId);
    setProcessingItems(prev => {
      const updated = new Set([...prev]);
      updated.delete(productId);
      return updated;
    });
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader className="space-y-2 mb-4">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Your Cart {cartCount > 0 && `(${cartCount})`}
          </SheetTitle>
        </SheetHeader>
        
        {isLoading ? (
          <div className="flex items-center justify-center flex-1">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Loading your cart...</p>
            </div>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 text-center p-4">
            <div className="w-28 h-28 mb-4 text-muted-foreground">
              <img 
                src={emptyCartImage} 
                alt="Empty cart" 
                className="w-full h-full" 
              />
            </div>
            <h3 className="font-medium text-lg mb-2">Your cart is empty</h3>
            <p className="text-muted-foreground mb-6">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link to="/shop">
              <Button onClick={() => setIsCartOpen(false)}>
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-auto pr-2 -mr-2">
              <ul className="space-y-4">
                {cartItems.map((item) => {
                  const isProcessing = processingItems.has(item.product_id);
                  
                  return (
                    <li 
                      key={item.id} 
                      className="flex gap-4 py-4 border-b"
                    >
                      <Link
                        to={`/product/${item.product_id}`}
                        onClick={() => setIsCartOpen(false)}
                        className="h-20 w-20 rounded-md overflow-hidden bg-muted flex-shrink-0"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </Link>
                      
                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/product/${item.product_id}`}
                          onClick={() => setIsCartOpen(false)}
                        >
                          <h4 className="font-medium leading-tight line-clamp-2 mb-1">{item.name}</h4>
                        </Link>
                        <div className="flex items-center justify-between">
                          <p className="font-medium">${item.price.toFixed(2)}</p>
                          <div className="flex items-center gap-1">
                            <button
                              className="rounded-full flex items-center justify-center h-6 w-6 bg-muted hover:bg-muted/80"
                              onClick={() => handleUpdateQuantity(item.product_id, item.quantity - 1)}
                              disabled={isProcessing}
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <button
                              className="rounded-full flex items-center justify-center h-6 w-6 bg-muted hover:bg-muted/80"
                              onClick={() => handleUpdateQuantity(item.product_id, item.quantity + 1)}
                              disabled={isProcessing}
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <p className="text-sm text-muted-foreground">
                            Subtotal: ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          <button
                            className={cn(
                              "text-muted-foreground hover:text-destructive p-1 rounded-full",
                              isProcessing && "opacity-50 cursor-not-allowed"
                            )}
                            onClick={() => handleRemoveItem(item.product_id)}
                            disabled={isProcessing}
                          >
                            {isProcessing ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            
            <div className="mt-6 border-t pt-6">
              <div className="flex items-center justify-between text-base font-medium mb-2">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                Shipping and taxes calculated at checkout.
              </p>
              <Link to="/checkout" onClick={() => setIsCartOpen(false)}>
                <Button className="w-full mb-2">
                  Checkout
                </Button>
              </Link>
              <Link to="/shop" onClick={() => setIsCartOpen(false)}>
                <Button variant="outline" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
