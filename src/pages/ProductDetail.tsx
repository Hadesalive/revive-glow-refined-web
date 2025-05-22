import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronRight, Minus, Plus, ShoppingBag, Heart, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { PRODUCTS } from "@/data/products";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/components/ProductCard";
import { useCart } from "@/contexts/CartContext";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { toast } = useToast();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      
      try {
        // Try to fetch product from Supabase
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error || !data) {
          // Fallback to local data if not found in database
          const foundProduct = PRODUCTS.find(p => p.id === id);
          
          if (foundProduct) {
            // Create a modified version with UUID format for the ID if using local data
            const productWithProperID = {
              ...foundProduct,
              // Only keep the original ID if it's already in UUID format (36 chars with hyphens)
              // Otherwise generate a UUID from the string ID
              id: foundProduct.id.length === 36 ? foundProduct.id : crypto.randomUUID()
            };
            setProduct(productWithProperID);
          } else {
            setProduct(null);
          }
        } else {
          // Map Supabase product to our Product type
          setProduct({
            id: data.id,
            name: data.name,
            price: data.price,
            category: data.category,
            image: data.image_url,
            description: data.description
          });
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        
        // Fallback to local data if error
        const foundProduct = PRODUCTS.find(p => p.id === id);
        if (foundProduct) {
          const productWithProperID = {
            ...foundProduct,
            id: foundProduct.id.length === 36 ? foundProduct.id : crypto.randomUUID()
          };
          setProduct(productWithProperID);
        } else {
          setProduct(null);
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = async () => {
    if (!product) return;
    
    setIsAddingToCart(true);
    try {
      await addToCart(product, quantity);
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast({
        title: "Error",
        description: "Could not add item to cart. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAddingToCart(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container-custom py-12">
          <div className="animate-pulse">
            <div className="h-4 bg-muted rounded w-1/3 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="aspect-square bg-muted rounded"></div>
              <div className="space-y-4">
                <div className="h-8 bg-muted rounded w-2/3"></div>
                <div className="h-6 bg-muted rounded w-1/4"></div>
                <div className="h-4 bg-muted rounded w-full mt-6"></div>
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container-custom py-12 text-center">
          <h2 className="text-2xl font-medium mb-4">Product Not Found</h2>
          <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Link to="/shop">
            <Button>Return to Shop</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        
        
        <div className="container-custom py-6">
          <div className="flex items-center text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <ChevronRight size={16} className="mx-2" />
            <Link to="/shop" className="hover:text-foreground">Shop</Link>
            <ChevronRight size={16} className="mx-2" />
            {product && (
              <>
                <Link to={`/shop?category=${product.category.toLowerCase()}`} className="hover:text-foreground">
                  {product.category}
                </Link>
                <ChevronRight size={16} className="mx-2" />
              </>
            )}
            <span className="text-foreground">{product?.name}</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            <div>
              <div className="aspect-square rounded-lg overflow-hidden">
                <img
                  src={product?.image}
                  alt={product?.name}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            
            
            <div className="space-y-6">
              <div>
                <p className="text-sm text-muted-foreground">{product?.category}</p>
                <h1 className="text-3xl font-heading mt-1">{product?.name}</h1>
                <p className="text-2xl font-medium mt-3">${product?.price.toFixed(2)}</p>
              </div>
              
              <div>
                <p className="text-muted-foreground">
                  {product?.description}
                </p>
              </div>
              
              <div className="pt-4">
                <div className="flex items-center mb-6">
                  <label htmlFor="quantity" className="text-sm font-medium mr-4">
                    Quantity
                  </label>
                  <div className="flex items-center border border-input rounded-md">
                    <button
                      type="button"
                      className="p-2"
                      onClick={decrementQuantity}
                      aria-label="Decrease quantity"
                    >
                      <Minus size={16} />
                    </button>
                    <input
                      type="number"
                      id="quantity"
                      className="w-12 text-center border-none focus:outline-none focus:ring-0"
                      value={quantity}
                      readOnly
                    />
                    <button
                      type="button"
                      className="p-2"
                      onClick={incrementQuantity}
                      aria-label="Increase quantity"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    onClick={handleAddToCart} 
                    className="w-full sm:w-auto px-8 py-6 gap-2"
                    size="lg"
                    disabled={isAddingToCart}
                  >
                    {isAddingToCart ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <ShoppingBag size={18} />
                    )}
                    Add to Cart
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full sm:w-auto px-8 py-6 gap-2"
                    size="lg"
                  >
                    <Heart size={18} />
                    Add to Wishlist
                  </Button>
                </div>
              </div>
              
              
              <div className="border-t border-border pt-6 mt-6">
                <h3 className="font-medium mb-3">Product Details</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Made with natural ingredients</li>
                  <li>• Dermatologist tested</li>
                  <li>• Vegan and cruelty-free</li>
                  <li>• Free from parabens, sulfates, and artificial fragrances</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
