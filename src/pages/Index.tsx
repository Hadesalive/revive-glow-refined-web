
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import BrandStory from "@/components/BrandStory";
import IngredientsSpotlight from "@/components/IngredientsSpotlight";
import Testimonials from "@/components/Testimonials";
import Sustainability from "@/components/Sustainability";
import Newsletter from "@/components/Newsletter";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <FeaturedProducts />
        <BrandStory />
        <IngredientsSpotlight />
        <Testimonials />
        <Sustainability />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
