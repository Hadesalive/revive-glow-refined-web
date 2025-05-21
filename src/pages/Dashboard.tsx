
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Dashboard = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth");
        return;
      }

      setUserEmail(session.user.email);
    };

    checkUser();

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_OUT") {
          navigate("/auth");
        } else if (session) {
          setUserEmail(session.user.email);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Avatar className="h-16 w-16">
              <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${userEmail}`} alt="User avatar" />
              <AvatarFallback>
                {userEmail?.substring(0, 2).toUpperCase() || "?"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">My Dashboard</h1>
              <p className="text-muted-foreground">{userEmail}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
              <p className="text-muted-foreground">You haven't placed any orders yet.</p>
            </div>
            
            <div className="border rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Account Details</h2>
              <div className="space-y-2">
                <p><span className="font-medium">Email:</span> {userEmail}</p>
                <p><span className="font-medium">Member since:</span> {new Date().toLocaleDateString()}</p>
              </div>
            </div>

            <div className="border rounded-lg p-6 shadow-sm md:col-span-2">
              <h2 className="text-xl font-semibold mb-4">Your Favorites</h2>
              <p className="text-muted-foreground">You haven't added any products to your favorites yet.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
