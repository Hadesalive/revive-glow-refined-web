
import { Leaf, Droplets, Sparkles, Heart } from "lucide-react";

const IngredientsSpotlight = () => {
  const ingredients = [
    {
      name: "Organic Lemongrass",
      benefit: "Natural Cleansing",
      description: "Purifies and refreshes while providing antibacterial properties",
      icon: Leaf,
      color: "primary"
    },
    {
      name: "Vitamin E Oil",
      benefit: "Deep Nourishment",
      description: "Antioxidant-rich formula that protects and moisturizes skin",
      icon: Droplets,
      color: "accent"
    },
    {
      name: "Natural Black Soap",
      benefit: "Gentle Exfoliation",
      description: "Traditional African ingredients for deep cleansing without irritation",
      icon: Sparkles,
      color: "primary"
    },
    {
      name: "Essential Botanicals",
      benefit: "Skin Revival",
      description: "Carefully selected plant extracts for natural skin rejuvenation",
      icon: Heart,
      color: "accent"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            <Leaf className="w-4 h-4 mr-2" />
            Natural Ingredients
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6">
            The Power of Nature
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every product is crafted with carefully selected natural ingredients, sourced ethically and sustainably for maximum effectiveness.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {ingredients.map((ingredient, index) => {
            const IconComponent = ingredient.icon;
            return (
              <div 
                key={index}
                className="text-center group hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-${ingredient.color}/10 flex items-center justify-center group-hover:bg-${ingredient.color}/20 transition-colors duration-300`}>
                  <IconComponent className={`w-10 h-10 text-${ingredient.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {ingredient.name}
                </h3>
                <p className="text-primary font-medium mb-3">
                  {ingredient.benefit}
                </p>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {ingredient.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default IngredientsSpotlight;
