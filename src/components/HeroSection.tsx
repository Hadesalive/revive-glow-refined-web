
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative bg-cream py-20 md:py-28 lg:py-32 overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 max-w-lg">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-medium tracking-tight">
              Revive your skin. Glow from within.
            </h1>
            <p className="text-lg text-muted-foreground">
              Luxury skincare products crafted with natural ingredients for a radiant, healthy complexion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link to="/shop">
                <Button size="lg" className="w-full sm:w-auto">
                  Shop Now
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square w-full md:w-[120%] rounded-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80" 
                alt="Luxury skincare products" 
                className="object-cover w-full h-full"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-40 h-40 md:w-48 md:h-48 bg-sage/30 rounded-full -z-10"></div>
            <div className="absolute -top-6 -left-6 w-24 h-24 md:w-32 md:h-32 bg-brown-200/40 rounded-full -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
