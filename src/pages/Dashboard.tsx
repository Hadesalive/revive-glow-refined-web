
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  BarChart, 
  CircleDollarSign, 
  Package, 
  ShoppingCart, 
  Heart, 
  UserCircle,
  Settings,
  Users,
  PlusCircle,
  Clock,
  Truck
} from "lucide-react";

const Dashboard = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string>("customer");
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState<string>("");
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is authenticated
    const checkUser = async () => {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth");
        return;
      }

      setUserEmail(session.user.email);
      
      // Get user profile to check role and name
      const { data: profile } = await supabase
        .from('profiles')
        .select('role, first_name, last_name')
        .eq('id', session.user.id)
        .single();
        
      if (profile) {
        setUserRole(profile.role || "customer");
        
        const fullName = [profile.first_name, profile.last_name]
          .filter(Boolean)
          .join(' ');
          
        setUserName(fullName || "User");

        // Fetch recent orders for the user
        try {
          const { data: orders } = await supabase
            .from('orders')
            .select('*')
            .eq('user_id', session.user.id)
            .order('created_at', { ascending: false })
            .limit(3);
            
          if (orders) {
            setRecentOrders(orders);
          }
        } catch (error) {
          console.error("Error fetching orders:", error);
        }

        // For admin, we could fetch additional data here
        if (profile.role === 'admin') {
          // Additional admin data fetching could go here
        }
      }
      
      setLoading(false);
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

  const handleUpdateProfile = () => {
    toast({
      title: "Profile update",
      description: "Profile settings feature coming soon!",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>;
      case "processing":
        return <Badge className="bg-blue-500">Processing</Badge>;
      case "shipped":
        return <Badge className="bg-purple-500">Shipped</Badge>;
      default:
        return <Badge>Pending</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-12">
          <div className="flex items-center justify-center h-full">
            <div className="space-y-4 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="text-lg">Loading your dashboard...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const demoOrders = recentOrders.length ? recentOrders : [
    { id: '1', created_at: new Date().toISOString(), status: 'pending', total: 79.99 },
    { id: '2', created_at: new Date(Date.now() - 86400000).toISOString(), status: 'shipped', total: 129.50 },
    { id: '3', created_at: new Date(Date.now() - 172800000).toISOString(), status: 'completed', total: 54.25 },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20 border-2 border-primary/10 shadow-sm">
                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${userName || userEmail}`} alt="User avatar" />
                <AvatarFallback className="bg-primary/5 text-primary text-lg">
                  {userName?.substring(0, 2) || userEmail?.substring(0, 2).toUpperCase() || "?"}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-heading font-bold tracking-tight mb-1">{userName || "Welcome back!"}</h1>
                <div className="flex items-center gap-2">
                  <p className="text-muted-foreground">{userEmail}</p>
                  <Badge variant="outline" className="capitalize">{userRole}</Badge>
                </div>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <Button onClick={handleUpdateProfile} className="flex items-center gap-2">
                <UserCircle className="h-4 w-4" />
                Update Profile
              </Button>
            </div>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:w-[600px] mb-6">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <BarChart className="h-4 w-4" /> Overview
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" /> Orders
              </TabsTrigger>
              <TabsTrigger value="wishlist" className="flex items-center gap-2">
                <Heart className="h-4 w-4" /> Wishlist
              </TabsTrigger>
              {userRole === "admin" && (
                <TabsTrigger value="admin" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" /> Admin
                </TabsTrigger>
              )}
            </TabsList>
            
            <TabsContent value="overview" className="mt-6 space-y-6 animate-fade-in">
              {/* Quick Stats Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-500 text-white rounded-full p-3">
                        <ShoppingCart className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Orders</p>
                        <h3 className="text-2xl font-bold">{demoOrders.length}</h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-amber-500 text-white rounded-full p-3">
                        <CircleDollarSign className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Total Spent</p>
                        <h3 className="text-2xl font-bold">${demoOrders.reduce((sum, order) => sum + (parseFloat(order.total) || 0), 0).toFixed(2)}</h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-pink-500 text-white rounded-full p-3">
                        <Heart className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Wishlist</p>
                        <h3 className="text-2xl font-bold">{wishlistItems.length || 0}</h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-green-500 text-white rounded-full p-3">
                        <Package className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Delivered</p>
                        <h3 className="text-2xl font-bold">{demoOrders.filter(o => o.status === 'completed').length}</h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Clock className="h-5 w-5" /> Recent Orders
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Order #</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {demoOrders.length > 0 ? (
                          demoOrders.map((order) => (
                            <TableRow key={order.id} className="hover:bg-muted/50 cursor-pointer" onClick={() => toast({ title: "Order Details", description: `Viewing details for order #${order.id}` })}>
                              <TableCell className="font-medium">#{order.id.substring(0, 8)}</TableCell>
                              <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
                              <TableCell>{getStatusBadge(order.status)}</TableCell>
                              <TableCell className="text-right">${parseFloat(order.total).toFixed(2)}</TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={4} className="text-center py-6">
                              <p className="text-muted-foreground">You haven't placed any orders yet.</p>
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                    <div className="mt-4 flex justify-center">
                      <Button variant="outline" className="w-full" onClick={() => document.querySelector('[data-value="orders"]')?.click()}>
                        View All Orders
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <UserCircle className="h-5 w-5" /> Account Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-muted-foreground">Email</span>
                      <span className="font-medium">{userEmail}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-muted-foreground">Role</span>
                      <span className="font-medium capitalize">{userRole}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-muted-foreground">Member since</span>
                      <span className="font-medium">{new Date().toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" onClick={handleUpdateProfile}>
                      Edit Profile
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Package className="h-5 w-5" /> Recommended Products
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {PRODUCTS.slice(0, 4).map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => navigate("/shop")}>
                    View All Products
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="orders" className="mt-6 animate-fade-in">
              <Card>
                <CardHeader className="pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <CardTitle>Order History</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="rounded-full px-3 py-1">
                      All Orders
                    </Badge>
                    <Badge variant="outline" className="rounded-full px-3 py-1 bg-blue-50">
                      <Truck className="h-3 w-3 mr-1" /> In Transit
                    </Badge>
                    <Badge variant="outline" className="rounded-full px-3 py-1 bg-green-50">
                      Completed
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order #</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Tracking</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {demoOrders.length > 0 ? (
                        demoOrders.map((order, index) => (
                          <TableRow key={order.id} className="hover:bg-muted/50 cursor-pointer" 
                            onClick={() => toast({ 
                              title: "Order Details", 
                              description: `Viewing details for order #${order.id}` 
                            })}>
                            <TableCell className="font-medium">#{order.id.substring(0, 8)}</TableCell>
                            <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
                            <TableCell>{getStatusBadge(order.status)}</TableCell>
                            <TableCell>
                              {order.status === 'shipped' || order.status === 'processing' ? (
                                <Button variant="link" className="p-0 h-auto" onClick={(e) => {
                                  e.stopPropagation();
                                  toast({ title: "Tracking Info", description: "Tracking information will appear here" })
                                }}>
                                  Track
                                </Button>
                              ) : (
                                <span className="text-muted-foreground text-sm">—</span>
                              )}
                            </TableCell>
                            <TableCell className="text-right">${parseFloat(order.total).toFixed(2)}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-10">
                            <div className="space-y-3 flex flex-col items-center">
                              <ShoppingCart className="h-12 w-12 text-muted-foreground/50" />
                              <p className="text-muted-foreground">You haven't placed any orders yet.</p>
                              <Button onClick={() => navigate("/shop")}>Start Shopping</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="wishlist" className="mt-6 animate-fade-in">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between">
                    <span>My Wishlist</span>
                    <Badge>{PRODUCTS.slice(0, 2).length}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {PRODUCTS.slice(0, 2).map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                    {PRODUCTS.slice(0, 2).length === 0 && (
                      <div className="col-span-full py-10 text-center">
                        <div className="space-y-3 flex flex-col items-center">
                          <Heart className="h-12 w-12 text-muted-foreground/50" />
                          <p className="text-muted-foreground">You haven't added any products to your wishlist yet.</p>
                          <Button onClick={() => navigate("/shop")}>Browse Products</Button>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {userRole === "admin" && (
              <TabsContent value="admin" className="mt-6 space-y-6 animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-blue-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Package className="h-5 w-5" /> Product Management
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">Manage your store's products</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white rounded-lg p-4 shadow-sm text-center border">
                          <p className="font-medium text-2xl">{PRODUCTS.length}</p>
                          <p className="text-muted-foreground text-sm">Products</p>
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow-sm text-center border">
                          <p className="font-medium text-2xl">
                            {new Set(PRODUCTS.map(p => p.category)).size}
                          </p>
                          <p className="text-muted-foreground text-sm">Categories</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full gap-2">
                        <PlusCircle className="h-4 w-4" /> Add New Product
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <ShoppingCart className="h-5 w-5" /> Order Management
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">Monitor and fulfill orders</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white rounded-lg p-4 shadow-sm text-center border">
                          <p className="font-medium text-2xl text-amber-500">2</p>
                          <p className="text-muted-foreground text-sm">Pending</p>
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow-sm text-center border">
                          <p className="font-medium text-2xl text-green-500">5</p>
                          <p className="text-muted-foreground text-sm">Completed</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">Manage Orders</Button>
                    </CardFooter>
                  </Card>
                  
                  <Card className="bg-gradient-to-br from-green-50 to-teal-50 border-green-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Users className="h-5 w-5" /> User Management
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">Manage user accounts</p>
                      <div className="bg-white rounded-lg p-4 shadow-sm text-center border">
                        <p className="font-medium text-2xl">12</p>
                        <p className="text-muted-foreground text-sm">Registered Users</p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">Manage Users</Button>
                    </CardFooter>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader className="pb-3 flex flex-row items-center justify-between">
                    <CardTitle>Recent Products</CardTitle>
                    <Button size="sm">View All</Button>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Product</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Stock</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {PRODUCTS.slice(0, 5).map((product) => (
                          <TableRow key={product.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center overflow-hidden">
                                  <img 
                                    src={product.image} 
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <span className="font-medium">{product.name}</span>
                              </div>
                            </TableCell>
                            <TableCell>{product.category}</TableCell>
                            <TableCell>${product.price.toFixed(2)}</TableCell>
                            <TableCell>
                              <Badge variant={product.inStock ? "outline" : "destructive"} className="bg-green-50 text-green-700 hover:bg-green-100">
                                In stock
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">Edit</Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle>Sales Analytics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 flex items-center justify-center border border-dashed rounded-lg">
                      <div className="text-center space-y-2">
                        <BarChart className="mx-auto h-10 w-10 text-muted-foreground/50" />
                        <h3 className="text-lg font-medium">Analytics Dashboard</h3>
                        <p className="text-sm text-muted-foreground">
                          Sales and revenue analytics will be displayed here
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;

