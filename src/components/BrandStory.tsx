
import { Leaf, Heart, Sparkles } from "lucide-react";

const BrandStory = () => {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-cream via-white to-sage-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-10 left-10 opacity-20">
        <Leaf className="w-32 h-32 text-primary transform rotate-12" />
      </div>
      <div className="absolute bottom-20 right-16 opacity-15">
        <Heart className="w-24 h-24 text-accent transform -rotate-12" />
      </div>
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Product Image */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>
            <div className="relative bg-white rounded-3xl p-8 shadow-2xl transform group-hover:scale-105 transition-all duration-500">
              <img
                src="/lovable-uploads/2ec47046-57d0-492a-9731-7a72946cf177.png"
                alt="Revive & Glow Facial Oil"
                className="w-full h-auto object-contain rounded-2xl"
              />
              <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                Bestseller
              </div>
            </div>
          </div>
          
          {/* Story Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4 mr-2" />
              Our Signature Products
            </div>

            {/* Main heading */}
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 leading-tight">
              Crafted with 
              <span className="text-gradient bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Natural Excellence</span>
            </h2>
            
            {/* Story paragraphs */}
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                Our <strong>Premium Facial Oil</strong> and <strong>Black Soap Paste</strong> represent years of dedication to creating skincare that truly works. Founded in 2020, Revive & Glow was born from a passion for products that respect your skin's natural balance.
              </p>
              <p>
                Our founder, Emma Lawson, struggled with sensitive skin for years and was frustrated by products that promised results but delivered irritation. After extensive research and collaboration with leading dermatologists, she created these signature formulations.
              </p>
              <p>
                Each product is carefully crafted with premium natural ingredients, featuring therapeutic-grade essential oils and traditional botanicals. This isn't just skincare—it's a commitment to your skin's health and your daily wellness ritual.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-white rounded-xl shadow-sm">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">100% Natural</p>
                  <p className="text-sm text-gray-600">Pure ingredients</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-white rounded-xl shadow-sm">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Gentle Formula</p>
                  <p className="text-sm text-gray-600">Sensitive skin safe</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-white rounded-xl shadow-sm">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Premium Quality</p>
                  <p className="text-sm text-gray-600">Therapeutic grade</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
