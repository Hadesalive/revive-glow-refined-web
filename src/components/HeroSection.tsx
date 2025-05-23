
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Leaf, Heart, ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-sage-50 via-cream to-white">
      {/* Background Image with Elegant Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/lovable-uploads/5bfedf87-20bd-4823-ae04-8c4f0aa2508d.png" 
          alt="Revive & Glow Natural Skincare Collection" 
          className="w-full h-full object-cover object-center opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-sage-50/70 to-cream/60"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent"></div>
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute top-20 left-10 animate-float">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center backdrop-blur-sm">
          <Leaf className="w-10 h-10 text-primary" />
        </div>
      </div>
      <div className="absolute top-32 right-16 animate-float animation-delay-300">
        <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center backdrop-blur-sm">
          <Sparkles className="w-8 h-8 text-accent" />
        </div>
      </div>
      <div className="absolute bottom-32 left-16 animate-float animation-delay-700">
        <div className="w-18 h-18 bg-primary/10 rounded-full flex items-center justify-center backdrop-blur-sm">
          <Heart className="w-9 h-9 text-primary" />
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom relative z-10 text-center">
        <div className="max-w-5xl mx-auto space-y-10">
          {/* Brand Badge */}
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg">
            <Leaf className="w-5 h-5 text-primary mr-3" />
            <span className="text-base font-medium text-gray-800">Natural • Organic • Cruelty-Free</span>
          </div>

          {/* Main Heading */}
          <div className="space-y-6">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tight text-gray-900 leading-[0.9]">
              <span className="block">Revive Your</span>
              <span className="text-gradient bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent block">
                Natural Glow
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium">
              Discover the transformative power of nature with our premium skincare collection. 
              <span className="text-primary font-semibold"> Handcrafted with love, designed for radiance.</span>
            </p>
          </div>

          {/* Call to Action */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-6">
            <Link to="/shop">
              <Button 
                size="lg" 
                className="group w-full sm:w-auto bg-primary hover:bg-primary/90 text-white px-10 py-5 text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1"
              >
                <Sparkles className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                Explore Collection
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
            <Link to="/about">
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto bg-white/80 backdrop-blur-sm border-2 border-gray-200 text-gray-800 hover:bg-white hover:border-primary/50 px-10 py-5 text-lg font-semibold rounded-2xl transition-all duration-300 hover:shadow-lg"
              >
                Our Story
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-8 pt-12">
            <div className="flex items-center gap-3 px-6 py-3 bg-white/60 backdrop-blur-sm rounded-full">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                <Leaf className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm font-semibold text-gray-800">100% Natural Ingredients</span>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 bg-white/60 backdrop-blur-sm rounded-full">
              <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                <Heart className="w-4 h-4 text-accent" />
              </div>
              <span className="text-sm font-semibold text-gray-800">Cruelty Free & Ethical</span>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 bg-white/60 backdrop-blur-sm rounded-full">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm font-semibold text-gray-800">Dermatologist Approved</span>
            </div>
          </div>
        </div>
      </div>

      {/* Elegant Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center space-y-2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-500/70 rounded-full mt-2 animate-pulse"></div>
          </div>
          <span className="text-xs text-gray-500 font-medium">Scroll to explore</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
