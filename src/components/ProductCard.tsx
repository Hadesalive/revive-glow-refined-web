
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

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

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation to product detail
    await addToCart(product, 1);
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-border bg-background transition-all hover:shadow-md">
      <Link to={`/product/${product.id}`} className="aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-col p-4 flex-grow">
        <div className="flex-grow">
          <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
          <Link to={`/product/${product.id}`}>
            <h3 className="font-medium text-base mb-1 line-clamp-1">{product.name}</h3>
          </Link>
          <p className="font-medium">${product.price.toFixed(2)}</p>
        </div>
        <Button 
          size="sm" 
          className="mt-3 w-full gap-2 rounded-md py-5" 
          variant="outline"
          onClick={handleAddToCart}
        >
          <ShoppingBag size={16} />
          <span>Add to Cart</span>
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
