
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard, { Product } from "@/components/ProductCard";
import { PRODUCTS } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    // In a real app, you'd fetch this from an API
    setProducts(PRODUCTS);
    
    // Extract unique categories
    const uniqueCategories = Array.from(new Set(PRODUCTS.map(product => product.category)));
    setCategories(uniqueCategories);
  }, []);
  
  useEffect(() => {
    if (selectedCategory) {
      setFilteredProducts(products.filter(product => 
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      ));
    } else {
      setFilteredProducts(products);
    }
  }, [selectedCategory, products]);
  
  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    
    if (category) {
      setSearchParams({ category: category.toLowerCase() });
    } else {
      setSearchParams({});
    }
    
    // On mobile, close the filter drawer after selection
    if (window.innerWidth < 768) {
      setIsFilterOpen(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-cream py-12">
          <div className="container-custom">
            <h1 className="text-3xl md:text-4xl font-heading">Shop All Products</h1>
          </div>
        </div>
        
        <div className="container-custom py-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-medium">
              {selectedCategory ? `${selectedCategory} Products` : 'All Products'} 
              <span className="text-muted-foreground ml-2">({filteredProducts.length})</span>
            </h2>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="md:hidden flex items-center gap-2"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter size={16} />
              Filters
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Filter sidebar - desktop */}
            <aside className="hidden md:block">
              <div className="space-y-4">
                <h3 className="font-medium">Categories</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => handleCategoryChange(null)}
                    className={`block text-sm ${!selectedCategory ? 'text-primary font-medium' : 'text-muted-foreground'}`}
                  >
                    All Products
                  </button>
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => handleCategoryChange(category)}
                      className={`block text-sm ${selectedCategory === category ? 'text-primary font-medium' : 'text-muted-foreground'}`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </aside>
            
            {/* Mobile filter drawer */}
            {isFilterOpen && (
              <div className="fixed inset-0 bg-background/80 z-50 md:hidden">
                <div className="fixed bottom-0 left-0 right-0 h-5/6 bg-background p-6 rounded-t-xl shadow-lg animate-fade-in">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-medium text-lg">Filters</h3>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => setIsFilterOpen(false)}
                    >
                      <X size={20} />
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-medium">Categories</h4>
                    <div className="space-y-3">
                      <button
                        onClick={() => handleCategoryChange(null)}
                        className={`block text-base ${!selectedCategory ? 'text-primary font-medium' : 'text-muted-foreground'}`}
                      >
                        All Products
                      </button>
                      {categories.map(category => (
                        <button
                          key={category}
                          onClick={() => handleCategoryChange(category)}
                          className={`block text-base ${selectedCategory === category ? 'text-primary font-medium' : 'text-muted-foreground'}`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Product grid */}
            <div className="md:col-span-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              
              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No products found.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
