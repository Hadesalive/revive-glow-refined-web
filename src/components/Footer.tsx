
import { Link } from "react-router-dom";
import { Instagram, Twitter, Facebook } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-cream pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Revive & Glow</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Luxury skincare and wellness products that help you feel your best, inside and out.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-foreground hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Shop</h4>
            <ul className="space-y-2">
              <li><Link to="/shop" className="text-sm text-muted-foreground hover:text-primary">All Products</Link></li>
              <li><Link to="/shop?category=skincare" className="text-sm text-muted-foreground hover:text-primary">Skincare</Link></li>
              <li><Link to="/shop?category=wellness" className="text-sm text-muted-foreground hover:text-primary">Wellness</Link></li>
              <li><Link to="/shop?category=gift-sets" className="text-sm text-muted-foreground hover:text-primary">Gift Sets</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-sm text-muted-foreground hover:text-primary">Our Story</Link></li>
              <li><Link to="/sustainability" className="text-sm text-muted-foreground hover:text-primary">Sustainability</Link></li>
              <li><Link to="/contact" className="text-sm text-muted-foreground hover:text-primary">Contact Us</Link></li>
              <li><Link to="/careers" className="text-sm text-muted-foreground hover:text-primary">Careers</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Customer Care</h4>
            <ul className="space-y-2">
              <li><Link to="/faq" className="text-sm text-muted-foreground hover:text-primary">FAQ</Link></li>
              <li><Link to="/shipping" className="text-sm text-muted-foreground hover:text-primary">Shipping & Returns</Link></li>
              <li><Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-sm text-muted-foreground hover:text-primary">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Revive & Glow. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6">
              <li><Link to="/privacy" className="text-xs text-muted-foreground hover:text-primary">Privacy</Link></li>
              <li><Link to="/terms" className="text-xs text-muted-foreground hover:text-primary">Terms</Link></li>
              <li><Link to="/sitemap" className="text-xs text-muted-foreground hover:text-primary">Sitemap</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
