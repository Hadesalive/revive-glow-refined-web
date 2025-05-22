
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ShieldCheck, Truck } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { supabase } from "@/integrations/supabase/client";

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [shippingDetails, setShippingDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "United States",
  });
  
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingDetails((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checkout.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Get current user session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Authentication required",
          description: "Please sign in to complete your order.",
          variant: "destructive",
        });
        navigate("/auth");
        return;
      }
      
      // Add the order to the database
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert([
          {
            user_id: session.user.id,
            total: cartTotal,
            shipping_address: shippingDetails.address,
            shipping_city: shippingDetails.city,
            shipping_state: shippingDetails.state,
            shipping_postal_code: shippingDetails.postalCode,
            shipping_country: shippingDetails.country,
            status: "pending",
          },
        ])
        .select()
        .single();
        
      if (orderError || !order) {
        throw new Error("Failed to create order");
      }
      
      // Add order items
      const orderItems = cartItems.map((item) => ({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price,
      }));
      
      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);
        
      if (itemsError) {
        throw new Error("Failed to add order items");
      }
      
      // Clear the cart
      await clearCart();
      
      // Show success message
      toast({
        title: "Order placed successfully!",
        description: `Your order #${order.id.substring(0, 8)} has been received.`,
      });
      
      // Redirect to thank you page or dashboard
      navigate("/dashboard");
      
    } catch (error) {
      console.error("Checkout error:", error);
      toast({
        title: "Checkout failed",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Calculate shipping cost (free above $100)
  const shippingCost = cartTotal >= 100 ? 0 : 9.99;
  const totalWithShipping = cartTotal + shippingCost;
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow py-10">
        <div className="container-custom">
          <h1 className="text-3xl font-heading font-medium mb-2">Checkout</h1>
          <p className="text-muted-foreground mb-8">Complete your order</p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit}>
                <div className="space-y-8">
                  {/* Shipping Information */}
                  <div className="bg-card rounded-xl border p-6">
                    <h2 className="text-xl font-medium mb-6">Shipping Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={shippingDetails.firstName}
                          onChange={handleInputChange}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={shippingDetails.lastName}
                          onChange={handleInputChange}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={shippingDetails.email}
                          onChange={handleInputChange}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="address">Street Address</Label>
                        <Input
                          id="address"
                          name="address"
                          value={shippingDetails.address}
                          onChange={handleInputChange}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          name="city"
                          value={shippingDetails.city}
                          onChange={handleInputChange}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State / Province</Label>
                        <Input
                          id="state"
                          name="state"
                          value={shippingDetails.state}
                          onChange={handleInputChange}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="postalCode">ZIP / Postal Code</Label>
                        <Input
                          id="postalCode"
                          name="postalCode"
                          value={shippingDetails.postalCode}
                          onChange={handleInputChange}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="country">Country</Label>
                        <Input
                          id="country"
                          name="country"
                          value={shippingDetails.country}
                          onChange={handleInputChange}
                          required
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Payment Method */}
                  <div className="bg-card rounded-xl border p-6">
                    <h2 className="text-xl font-medium mb-4">Payment Method</h2>
                    <RadioGroup 
                      value={paymentMethod} 
                      onValueChange={setPaymentMethod}
                      className="space-y-4"
                    >
                      <div className="flex items-center space-x-3 border rounded-md p-4">
                        <RadioGroupItem value="credit-card" id="credit-card" />
                        <Label htmlFor="credit-card" className="flex-grow cursor-pointer">
                          Credit Card
                        </Label>
                        <div className="flex gap-2">
                          <div className="h-6 w-10 rounded bg-primary/10"></div>
                          <div className="h-6 w-10 rounded bg-primary/10"></div>
                          <div className="h-6 w-10 rounded bg-primary/10"></div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 border rounded-md p-4">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <Label htmlFor="paypal" className="flex-grow cursor-pointer">
                          PayPal
                        </Label>
                        <div className="h-6 w-10 rounded bg-primary/10"></div>
                      </div>
                    </RadioGroup>
                    
                    {paymentMethod === "credit-card" && (
                      <div className="mt-6 space-y-4">
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input 
                            id="cardNumber" 
                            placeholder="1234 5678 9012 3456"
                            className="mt-1"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expDate">Expiration Date</Label>
                            <Input 
                              id="expDate" 
                              placeholder="MM / YY"
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input 
                              id="cvv" 
                              placeholder="123"
                              className="mt-1"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mt-8 hidden lg:block">
                  <Button 
                    type="submit" 
                    className="w-full py-6 text-lg" 
                    disabled={isSubmitting || cartItems.length === 0}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> 
                        Processing...
                      </>
                    ) : (
                      <>Place Order • ${totalWithShipping.toFixed(2)}</>
                    )}
                  </Button>
                </div>
              </form>
            </div>
            
            {/* Order Summary */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                  <CardDescription>
                    {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in cart
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-5">
                  <div className="max-h-[300px] overflow-auto pr-2 -mr-2">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex gap-3 py-3 border-b">
                        <div className="h-16 w-16 rounded overflow-hidden bg-muted flex-shrink-0">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium line-clamp-1">{item.name}</p>
                          <div className="flex justify-between mt-1">
                            <span className="text-sm text-muted-foreground">Qty: {item.quantity}</span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>{shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}</span>
                    </div>
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between font-medium text-lg">
                        <span>Total</span>
                        <span>${totalWithShipping.toFixed(2)}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Including taxes and fees
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 border-t pt-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Truck className="h-4 w-4 text-muted-foreground" />
                      <span>Free shipping on orders over $100</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                      <span>Secure payment processing</span>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button 
                    type="submit" 
                    onClick={handleSubmit}
                    className="w-full py-6" 
                    disabled={isSubmitting || cartItems.length === 0}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> 
                        Processing...
                      </>
                    ) : (
                      <>Complete Order</>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;
