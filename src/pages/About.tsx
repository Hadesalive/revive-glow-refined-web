
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-16 pb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">About Revive & Glow</h1>
          
          <div className="max-w-3xl mx-auto mb-12">
            <p className="text-lg mb-6">
              At Revive & Glow, we believe in the power of self-care and natural beauty. Founded in 2020, 
              our mission is to create premium skincare products that harness the healing properties of 
              nature while being kind to our planet.
            </p>
            
            <p className="text-lg mb-6">
              Each of our products is thoughtfully formulated with organic, sustainably sourced ingredients 
              that nourish your skin and respect the environment. We never test on animals and use 
              eco-friendly packaging to minimize our carbon footprint.
            </p>

            <p className="text-lg mb-6">
              Our team of skincare experts works tirelessly to develop effective, gentle formulations 
              suitable for all skin types. We believe everyone deserves to feel confident in their own skin.
            </p>
          </div>
          
          <div className="bg-muted p-8 rounded-lg mb-12">
            <h2 className="text-2xl font-bold mb-4 text-center">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
                <p>We're committed to reducing waste and using renewable resources in our products and packaging.</p>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">Transparency</h3>
                <p>We're open about our ingredients, sourcing practices, and manufacturing processes.</p>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">Inclusivity</h3>
                <p>Our products are designed for people of all ages, skin types, and backgrounds.</p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Discover Our Products</h2>
            <p className="mb-6">Experience the Revive & Glow difference with our award-winning skincare collection.</p>
            <Link to="/shop" className="inline-block bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition-colors">
              Shop Now
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
