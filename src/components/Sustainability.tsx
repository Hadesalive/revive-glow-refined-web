
import { Recycle, Leaf, Globe, Heart } from "lucide-react";

const Sustainability = () => {
  const commitments = [
    {
      title: "Eco-Friendly Packaging",
      description: "100% recyclable materials and minimal waste packaging",
      icon: Recycle,
      stat: "Zero Waste"
    },
    {
      title: "Sustainable Sourcing",
      description: "Ethically sourced ingredients from certified organic farms",
      icon: Leaf,
      stat: "100% Organic"
    },
    {
      title: "Carbon Neutral",
      description: "Offsetting our carbon footprint through reforestation projects",
      icon: Globe,
      stat: "Net Zero"
    },
    {
      title: "Cruelty Free",
      description: "Never tested on animals, certified by leading organizations",
      icon: Heart,
      stat: "Always"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              <Globe className="w-4 h-4 mr-2" />
              Our Commitment
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6">
              Beauty That Cares for 
              <span className="text-gradient"> Our Planet</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              We believe that beautiful skin shouldn't come at the cost of our environment. That's why every product is created with sustainability at its core.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {commitments.map((commitment, index) => {
                const IconComponent = commitment.icon;
                return (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{commitment.title}</h3>
                      <p className="text-sm text-gray-600">{commitment.description}</p>
                      <span className="text-xs font-medium text-primary">{commitment.stat}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Sustainable beauty ingredients"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/20 rounded-3xl blur-xl"></div>
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/20 rounded-3xl blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sustainability;
