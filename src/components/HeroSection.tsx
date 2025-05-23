
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Leaf, Heart } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/lovable-uploads/5bfedf87-20bd-4823-ae04-8c4f0aa2508d.png" 
          alt="Revive & Glow Natural Skincare Collection" 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-green-900/30 to-brand-orange-900/20"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-bounce">
        <Leaf className="w-8 h-8 text-brand-green-400 opacity-60" />
      </div>
      <div className="absolute top-32 right-16 animate-pulse">
        <Sparkles className="w-6 h-6 text-brand-orange-400 opacity-70" />
      </div>
      <div className="absolute bottom-32 left-16 animate-bounce delay-1000">
        <Heart className="w-7 h-7 text-brand-orange-500 opacity-50" />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Brand Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <Leaf className="w-4 h-4 text-brand-green-400 mr-2" />
            <span className="text-sm font-medium text-white">Natural • Organic • Cruelty-Free</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tight text-white leading-tight">
            Revive Your Skin.
            <br />
            <span className="text-gradient bg-gradient-to-r from-brand-green-300 to-brand-orange-300 bg-clip-text text-transparent">
              Glow From Within.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Discover the power of nature with our luxury skincare collection. 
            Crafted with the finest natural ingredients for radiant, healthy skin.
          </p>

          {/* Call to Action */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to="/shop">
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-brand-green-500 hover:bg-brand-green-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Shop Collection
              </Button>
            </Link>
            <Link to="/about">
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300"
              >
                Our Story
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-8 pt-8 text-white/70">
            <div className="flex items-center gap-2">
              <Leaf className="w-5 h-5 text-brand-green-400" />
              <span className="text-sm font-medium">100% Natural</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-brand-orange-400" />
              <span className="text-sm font-medium">Cruelty Free</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-green-400" />
              <span className="text-sm font-medium">Dermatologist Tested</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
