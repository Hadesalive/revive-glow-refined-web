
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Leaf, Shield, Heart, Award } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Leaf,
      title: "Sustainability",
      description: "We're committed to reducing waste and using renewable resources in our products and packaging."
    },
    {
      icon: Shield,
      title: "Transparency",
      description: "We're open about our ingredients, sourcing practices, and manufacturing processes."
    },
    {
      icon: Heart,
      title: "Inclusivity", 
      description: "Our products are designed for people of all ages, skin types, and backgrounds."
    },
    {
      icon: Award,
      title: "Quality",
      description: "Every product undergoes rigorous testing to ensure the highest standards of excellence."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-7xl font-heading font-bold text-gray-900 mb-8 tracking-tight">
              Our Story
            </h1>
            <p className="text-2xl text-gray-600 leading-relaxed">
              At Revive & Glow, we believe in the power of self-care and natural beauty. 
              Founded in 2020, our mission is to create premium skincare products that harness 
              the healing properties of nature.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-8">
                Crafted with Purpose
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  Each of our products is thoughtfully formulated with organic, sustainably sourced 
                  ingredients that nourish your skin and respect the environment. We never test on 
                  animals and use eco-friendly packaging to minimize our carbon footprint.
                </p>
                <p>
                  Our team of skincare experts works tirelessly to develop effective, gentle 
                  formulations suitable for all skin types. We believe everyone deserves to feel 
                  confident in their own skin.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl flex items-center justify-center">
                <div className="w-3/4 h-3/4 bg-white rounded-2xl shadow-xl flex items-center justify-center">
                  <Leaf className="w-24 h-24 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide everything we do, from sourcing ingredients to packaging products.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div 
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 text-center group"
                >
                  <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6">
              Discover Our Products
            </h2>
            <p className="text-xl text-gray-600 mb-12">
              Experience the Revive & Glow difference with our award-winning skincare collection.
            </p>
            <Link 
              to="/shop" 
              className="inline-flex items-center bg-primary text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
