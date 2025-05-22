
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingBag, User, Menu, X, Search, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
import { Cart } from "@/components/Cart";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { cartCount, setIsCartOpen } = useCart();

  useEffect(() => {
    // Check if user is authenticated when component mounts
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };

    checkAuth();

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setIsAuthenticated(!!session);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Successfully logged out",
        description: "You have been logged out successfully.",
      });
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
      toast({
        title: "Logout failed",
        description: "An error occurred while logging out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <header className="w-full bg-background border-b border-border sticky top-0 z-40">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            {/* Mobile menu button */}
            <button 
              className="md:hidden text-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="text-xl font-heading font-medium tracking-tight">
                Revive & Glow
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-sm font-medium hover:text-primary">
                Home
              </Link>
              <Link to="/shop" className="text-sm font-medium hover:text-primary">
                Shop
              </Link>
              <Link to="/about" className="text-sm font-medium hover:text-primary">
                About
              </Link>
              <Link to="/contact" className="text-sm font-medium hover:text-primary">
                Contact
              </Link>
              {isAuthenticated && (
                <Link to="/dashboard" className="text-sm font-medium hover:text-primary">
                  Dashboard
                </Link>
              )}
            </nav>

            {/* Right side buttons */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Search size={20} />
              </Button>
              
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <User size={20} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <Link to="/dashboard">
                      <DropdownMenuItem>
                        Dashboard
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link to="/auth">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User size={20} />
                  </Button>
                </Link>
              )}
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full relative"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-background border-b border-border animate-fade-in">
            <nav className="flex flex-col space-y-4 p-6">
              <Link 
                to="/" 
                className="text-base font-medium hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/shop" 
                className="text-base font-medium hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              <Link 
                to="/about" 
                className="text-base font-medium hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className="text-base font-medium hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              {isAuthenticated && (
                <>
                  <Link 
                    to="/dashboard" 
                    className="text-base font-medium hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button 
                    className="text-base font-medium hover:text-primary text-left flex items-center"
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleLogout();
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </button>
                </>
              )}
              {!isAuthenticated && (
                <Link 
                  to="/auth" 
                  className="text-base font-medium hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login / Register
                </Link>
              )}
            </nav>
          </div>
        )}
      </header>
      <Cart />
    </>
  );
};

export default Navbar;
