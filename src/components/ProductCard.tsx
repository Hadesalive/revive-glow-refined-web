
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Heart, Star } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await addToCart(product, 1);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLiked(!isLiked);
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary/20">
      {/* Product Image */}
      <Link to={`/product/${product.id}`} className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay with quick actions */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300">
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 bg-white/90 hover:bg-white text-gray-600 hover:text-accent shadow-md"
              onClick={handleLike}
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-current text-accent' : ''}`} />
            </Button>
          </div>
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 text-xs font-medium bg-primary/90 text-white rounded-full">
            {product.category}
          </span>
        </div>
      </Link>

      {/* Product Info */}
      <div className="flex flex-col p-4 flex-grow">
        <div className="flex-grow space-y-2">
          <Link to={`/product/${product.id}`}>
            <h3 className="font-semibold text-base text-gray-900 hover:text-primary transition-colors duration-200 line-clamp-2 leading-tight">
              {product.name}
            </h3>
          </Link>
          
          {/* Rating Stars */}
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-3 w-3 fill-current text-yellow-400" />
            ))}
            <span className="text-xs text-gray-500 ml-1">(24)</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
            <span className="text-sm text-gray-500 line-through">${(product.price * 1.2).toFixed(2)}</span>
          </div>
        </div>

        {/* Add to Cart Button */}
        <Button 
          className="mt-4 w-full bg-primary hover:bg-primary/90 text-white rounded-xl py-3 font-semibold transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg group-hover:bg-accent group-hover:text-white" 
          onClick={handleAddToCart}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Adding...
            </div>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4 mr-2" />
              Add to Cart
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
