
import { useState, useEffect } from "react";
import ProductCard, { Product } from "./ProductCard";
import { PRODUCTS } from "@/data/products";

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    // In a real app, you'd fetch this from an API
    setFeaturedProducts(PRODUCTS.slice(0, 4));
  }, []);

  return (
    <section className="py-16 md:py-24">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading mb-4">Featured Products</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Discover our most loved products, carefully crafted to enhance your natural beauty.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
