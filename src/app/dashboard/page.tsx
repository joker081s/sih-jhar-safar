"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Heart, 
  Eye, 
  Star, 
  MapPin, 
  Phone, 
  MessageCircle, 

  Plus,
  AlertTriangle,
  CheckCircle,

  Calendar,
  Car,
  Hotel,
  Utensils,
  ShoppingBag,
  UserCheck,

  BookOpen,
  CreditCard,
  Navigation,
  Map,
  Wallet2,

  ClipboardList,
  LayoutGrid,
  FolderHeart,
  Sparkles
} from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAppStore } from "@/store";
import { useRouter } from "next/navigation";

interface Destination {
  id: string;
  name: string;
  description: string;
  type: 'city' | 'temple' | 'heritage' | 'wildlife';
  category?: string;
  district?: string;
  src: string;
  rating: number;
  visitors: number;
  isWishlisted: boolean;
  isVisited: boolean;
  coordinates: [number, number];
  visitDate?: string;
}

interface Complaint {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  destination?: string;
  provider?: string;
}

interface Provider {
  id: string;
  name: string;
  type: 'cab' | 'hotel' | 'restaurant' | 'shop' | 'guide';
  rating: number;
  phone: string;
  location: string;
  services: string[];
  isVerified: boolean;
  pricing: {
    basePrice: number;
    perKm?: number;
    perHour?: number;
    perNight?: number;
  };
  availability: boolean;
  distance: number;
}

interface Booking {
  id: string;
  providerId: string;
  providerName: string;
  service: string;
  type: 'cab' | 'hotel' | 'restaurant' | 'shop' | 'guide';
  date: string;
  time: string;
  duration?: string;
  location: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  amount: number;
  rating?: number;
  feedback?: string;
}

interface NearbyProvider {
  id: string;
  name: string;
  type: 'cab' | 'hotel' | 'restaurant' | 'shop' | 'guide';
  rating: number;
  distance: number;
  pricing: {
    basePrice: number;
    perKm?: number;
    perHour?: number;
    perNight?: number;
  };
  availability: boolean;
  location: string;
  phone: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  // const [searchTerm, setSearchTerm] = useState('');
  const globalWishlist = useAppStore((s) => s.wishlist);
  const liked = useAppStore((s) => s.liked);
  const visitedGlobal = useAppStore((s) => s.visited || []);
  const toggleWishlistGlobal = useAppStore((s) => s.toggleWishlist);
  const toggleLike = useAppStore((s) => s.toggleLike);
  const addVisited = useAppStore((s) => s.addVisited);
  const removeVisited = useAppStore((s) => s.removeVisited);
  const transactions = useAppStore((s) => s.transactions);
  const balance = useAppStore((s) => s.balance);
  const complaintsGlobal = useAppStore((s) => s.complaints);
  const addComplaint = useAppStore((s) => s.addComplaint);
  const user = useAppStore((s) => s.user);
  const role = useAppStore((s) => s.role);
  const storeBookings = useAppStore((s) => s.bookings);
  const createBookingStore = useAppStore((s) => s.createBooking);
  const cancelBookingStore = useAppStore((s) => s.cancelBooking);
  const rejectBookingStore = useAppStore((s) => s.rejectBooking);
  const completeBookingStore = useAppStore((s) => s.completeBooking);
  const deleteBookingStore = useAppStore((s) => s.deleteBooking);
  const [wishlist, setWishlist] = useState<Destination[]>([]);
  const [visited, setVisited] = useState<Destination[]>([]);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingDraft, setBookingDraft] = useState({
    type: 'cab' as 'hotel' | 'restaurant' | 'guide' | 'cab',
    title: '',
    dateTimeISO: '',
    amount: 0,
  });
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [nearbyProviders, setNearbyProviders] = useState<NearbyProvider[]>([]);
  const [selectedServiceType, setSelectedServiceType] = useState<string>('all');

  // Guard: only logged-in users with role 'user'
  useEffect(() => {
    if (!user || role !== 'user') {
      router.replace('/login');
    }
  }, [user, role, router]);

  // Mock data - in real app, this would come from API
  useEffect(() => {
    // Mock wishlist data
    setWishlist([
      {
        id: 'temple-1',
        name: 'Baba Baidyanath Dham',
        description: 'One of the twelve Jyotirlingas',
        type: 'temple',
        district: 'Deoghar',
        src: '/attractions/image1.jpeg',
        rating: 4.8,
        visitors: 50000,
        isWishlisted: true,
        isVisited: false,
        coordinates: [86.700053, 24.492565]
      },
      {
        id: 'wildlife-1',
        name: 'Betla National Park',
        description: 'Famous for elephants and tigers',
        type: 'wildlife',
        category: 'Wildlife / Safari',
        district: 'Palamu',
        src: '/attractions/image2.jpeg',
        rating: 4.6,
        visitors: 25000,
        isWishlisted: true,
        isVisited: false,
        coordinates: [84.1965, 23.8352]
      }
    ]);

    // Mock visited data
    setVisited([
      {
        id: 'city-1',
        name: 'Ranchi',
        description: 'Capital of Jharkhand',
        type: 'city',
        district: 'Ranchi',
        src: '/attractions/image3.jpeg',
        rating: 4.3,
        visitors: 15000,
        isWishlisted: false,
        isVisited: true,
        coordinates: [85.3096, 23.3441],
        visitDate: '2024-01-15'
      }
    ]);

    // Use global complaints for persistence
    setComplaints(
      complaintsGlobal.map((c) => ({
        id: c.id,
        title: c.title,
        description: c.description,
        status: c.status,
        priority: c.priority,
        createdAt: new Date(c.createdAtISO).toLocaleDateString(),
        destination: c.destination,
        provider: c.provider,
      }))
    );

    // Mock providers data
    setProviders([
      {
        id: 'provider-1',
        name: 'Rajesh Kumar - Cab Driver',
        type: 'cab',
        rating: 4.5,
        phone: '+91 9876543210',
        location: 'Ranchi',
        services: ['Airport Transfer', 'City Tours', 'Long Distance'],
        isVerified: true,
        pricing: { basePrice: 500, perKm: 12 },
        availability: true,
        distance: 2.5
      },
      {
        id: 'provider-2',
        name: 'Hotel Grand Palace',
        type: 'hotel',
        rating: 4.2,
        phone: '+91 9876543211',
        location: 'Ranchi',
        services: ['AC Rooms', 'Restaurant', 'WiFi', 'Parking'],
        isVerified: true,
        pricing: { basePrice: 2500, perNight: 2500 },
        availability: true,
        distance: 1.2
      },
      {
        id: 'provider-3',
        name: 'Mama\'s Kitchen',
        type: 'restaurant',
        rating: 4.7,
        phone: '+91 9876543212',
        location: 'Deoghar',
        services: ['Local Cuisine', 'Vegetarian', 'Home Delivery'],
        isVerified: true,
        pricing: { basePrice: 200, perHour: 200 },
        availability: true,
        distance: 0.8
      }
    ]);

    // Hook to global bookings if needed, here we continue rendering via storeBookings below

    // Mock nearby providers data
    setNearbyProviders([
      {
        id: 'nearby-1',
        name: 'City Cabs',
        type: 'cab',
        rating: 4.3,
        distance: 0.5,
        pricing: { basePrice: 400, perKm: 10 },
        availability: true,
        location: 'Near you',
        phone: '+91 9876543213'
      },
      {
        id: 'nearby-2',
        name: 'Spice Garden Restaurant',
        type: 'restaurant',
        rating: 4.6,
        distance: 0.3,
        pricing: { basePrice: 150, perHour: 150 },
        availability: true,
        location: '200m away',
        phone: '+91 9876543214'
      },
      {
        id: 'nearby-3',
        name: 'Local Souvenir Shop',
        type: 'shop',
        rating: 4.4,
        distance: 0.7,
        pricing: { basePrice: 0, perHour: 0 },
        availability: true,
        location: '500m away',
        phone: '+91 9876543215'
      }
    ]);
  }, []);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'city': return '🏙️';
      case 'temple': return '🏛️';
      case 'heritage': return '🏛️';
      case 'wildlife': return '🌿';
      default: return '📍';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'city': return 'bg-forest-200 text-forest-600';
      case 'temple': return 'bg-forest-100 text-forest-500';
      case 'heritage': return 'bg-forest-200 text-forest-500';
      case 'wildlife': return 'bg-forest-300 text-forest-600';
      default: return 'bg-forest-100 text-forest-500';
    }
  };

  const getServiceIcon = (type: string) => {
    switch (type) {
      case 'cab': return <Car className="w-5 h-5" />;
      case 'hotel': return <Hotel className="w-5 h-5" />;
      case 'restaurant': return <Utensils className="w-5 h-5" />;
      case 'shop': return <ShoppingBag className="w-5 h-5" />;
      case 'guide': return <UserCheck className="w-5 h-5" />;
      default: return <MapPin className="w-5 h-5" />;
    }
  };

  const getServiceColor = (type: string) => {
    switch (type) {
      case 'cab': return 'bg-blue-100 text-blue-600';
      case 'hotel': return 'bg-purple-100 text-purple-600';
      case 'restaurant': return 'bg-orange-100 text-orange-600';
      case 'shop': return 'bg-green-100 text-green-600';
      case 'guide': return 'bg-yellow-100 text-yellow-600';
      default: return 'bg-forest-100 text-forest-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleBooking = (providerId: string, service: string, type: string) => {
    // In real app, this would open a booking modal or redirect to booking page
    console.log('Booking:', { providerId, service, type });
  };

  // Feedback flow skipped in current store model

  const getProviderIcon = (type: string) => {
    switch (type) {
      case 'cab': return '🚗';
      case 'hotel': return '🏨';
      case 'restaurant': return '🍽️';
      case 'shop': return '🛍️';
      case 'guide': return '👨‍🏫';
      default: return '🏢';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-forest-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar */}
          <aside className="lg:col-span-3">
            <div className="sticky top-24 space-y-3">
              <button onClick={() => setActiveTab('overview')} className="w-full flex items-center justify-between p-3 rounded-lg border border-forest-200 bg-forest-50 hover:bg-forest-100 text-left">
                <div className="flex items-center gap-2 text-forest-500">
                  <LayoutGrid className="w-4 h-4" /> Overview
                </div>
                <span className="text-forest-400 text-sm">Home</span>
              </button>
              <button onClick={() => setActiveTab('wishlist')} className="w-full flex items-center justify-between p-3 rounded-lg border border-forest-200 bg-forest-50 hover:bg-forest-100 text-left">
                <div className="flex items-center gap-2 text-forest-500">
                  <FolderHeart className="w-4 h-4" /> Wishlist
                </div>
                <span className="text-forest-400 text-sm">{globalWishlist.length}</span>
              </button>
              <button onClick={() => setActiveTab('visited')} className="w-full flex items-center justify-between p-3 rounded-lg border border-forest-200 bg-forest-50 hover:bg-forest-100 text-left">
                <div className="flex items-center gap-2 text-forest-500">
                  <CheckCircle className="w-4 h-4" /> Visited
                </div>
                <span className="text-forest-400 text-sm">{visitedGlobal.length}</span>
              </button>
              <button onClick={() => setActiveTab('bookings')} className="w-full flex items-center justify-between p-3 rounded-lg border border-forest-200 bg-forest-50 hover:bg-forest-100 text-left">
                <div className="flex items-center gap-2 text-forest-500">
                  <BookOpen className="w-4 h-4" /> Bookings
                </div>
                <span className="text-forest-400 text-sm">{storeBookings.length}</span>
              </button>
              <button onClick={() => setActiveTab('liked')} className="w-full flex items-center justify-between p-3 rounded-lg border border-forest-200 bg-forest-50 hover:bg-forest-100 text-left">
                <div className="flex items-center gap-2 text-forest-500">
                  <Sparkles className="w-4 h-4" /> Liked Places
                </div>
                <span className="text-forest-400 text-sm">{liked.length}</span>
              </button>
              <button onClick={() => setActiveTab('transactions')} className="w-full flex items-center justify-between p-3 rounded-lg border border-forest-200 bg-forest-50 hover:bg-forest-100 text-left">
                <div className="flex items-center gap-2 text-forest-500">
                  <Wallet2 className="w-4 h-4" /> Transactions
                </div>
                <span className="text-forest-400 text-sm">₹{balance.toFixed(0)}</span>
              </button>
              <button onClick={() => setActiveTab('nearby')} className="w-full flex items-center justify-between p-3 rounded-lg border border-forest-200 bg-forest-50 hover:bg-forest-100 text-left">
                <div className="flex items-center gap-2 text-forest-500">
                  <Navigation className="w-4 h-4" /> Nearby
                </div>
                <span className="text-forest-400 text-sm">Open</span>
              </button>
              <button onClick={() => setActiveTab('complaints')} className="w-full flex items-center justify-between p-3 rounded-lg border border-forest-200 bg-forest-50 hover:bg-forest-100 text-left">
                <div className="flex items-center gap-2 text-forest-500">
                  <ClipboardList className="w-4 h-4" /> Complaints
                </div>
                <span className="text-forest-400 text-sm">{complaints.length}</span>
              </button>
            </div>
          </aside>

          {/* Main */}
          <div className="lg:col-span-9">
        {/* Header */}
        <div id="overview" className="mb-8">
          <h1 className="text-3xl font-bold text-forest-500 mb-2">My Dashboard</h1>
          <p className="text-forest-400">Manage your travel experiences, wishlist, and interactions</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-forest-50 border-forest-200">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-forest-100 rounded-lg">
                  <BookOpen className="w-6 h-6 text-forest-500" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-forest-500">{storeBookings.length}</p>
                  <p className="text-forest-400 text-sm">Total Bookings</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-forest-50 border-forest-200">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-forest-100 rounded-lg">
                  <Heart className="w-6 h-6 text-forest-500" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-forest-500">{globalWishlist.length}</p>
                  <p className="text-forest-400 text-sm">Wishlisted Places</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-forest-50 border-forest-200">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-forest-100 rounded-lg">
                  <Eye className="w-6 h-6 text-forest-500" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-forest-500">{visitedGlobal.length}</p>
                  <p className="text-forest-400 text-sm">Visited Places</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-forest-50 border-forest-200">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-forest-100 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-forest-500" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-forest-500">{complaints.length}</p>
                  <p className="text-forest-400 text-sm">Active Complaints</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-8 bg-forest-100">
            <TabsTrigger value="overview" className="data-[state=active]:bg-forest-200">Overview</TabsTrigger>
            <TabsTrigger value="bookings" className="data-[state=active]:bg-forest-200">Bookings</TabsTrigger>
            <TabsTrigger value="nearby" className="data-[state=active]:bg-forest-200">Nearby</TabsTrigger>
            <TabsTrigger value="wishlist" className="data-[state=active]:bg-forest-200">Wishlist</TabsTrigger>
            <TabsTrigger value="visited" className="data-[state=active]:bg-forest-200">Visited</TabsTrigger>
            <TabsTrigger value="liked" className="data-[state=active]:bg-forest-200">Liked</TabsTrigger>
            <TabsTrigger value="transactions" className="data-[state=active]:bg-forest-200">Transactions</TabsTrigger>
            <TabsTrigger value="complaints" className="data-[state=active]:bg-forest-200">Complaints</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Bookings */}
              <Card className="bg-forest-50 border-forest-200">
                <CardHeader>
                  <CardTitle className="text-forest-500">Recent Bookings</CardTitle>
                  <CardDescription>Your latest service bookings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {storeBookings.slice(0, 3).map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-3 bg-forest-100 rounded-lg">
                        <div className="flex items-center space-x-3">
                          {getServiceIcon(booking.type)}
                          <div>
                            <h4 className="font-medium text-forest-500">{booking.title}</h4>
                            <p className="text-sm text-forest-400">{booking.type.toUpperCase()}</p>
                            <p className="text-xs text-forest-400">{new Date(booking.dateTimeISO).toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(booking.status)}>
                            {booking.status}
                          </Badge>
                          <p className="text-sm text-forest-500 font-medium">₹{booking.amount}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Complaints */}
              <Card className="bg-forest-50 border-forest-200">
                <CardHeader>
                  <CardTitle className="text-forest-500">Recent Complaints</CardTitle>
                  <CardDescription>Your latest complaints and their status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {complaints.slice(0, 3).map((complaint) => (
                      <div key={complaint.id} className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-forest-500">{complaint.title}</h4>
                          <p className="text-sm text-forest-400">{complaint.destination}</p>
                        </div>
                        <Badge className={getStatusColor(complaint.status)}>
                          {complaint.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Transactions Tab */}
          <TabsContent value="transactions" className="space-y-6">
            <h2 className="text-2xl font-bold text-forest-500">Transactions & Spending</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-forest-50 border-forest-200">
                <CardHeader>
                  <CardTitle className="text-forest-500">Balance</CardTitle>
                  <CardDescription>Your current token balance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-forest-500">₹{balance.toFixed(2)}</div>
                  <div className="mt-4 flex gap-2">
                    <Button className="bg-forest-400 hover:bg-forest-500" onClick={() => useAppStore.getState().connectWallet()}>Connect Wallet</Button>
                    <Button variant="outline" className="border-forest-300 text-forest-500 hover:bg-forest-100" onClick={() => useAppStore.getState().mockDeposit(500)}>Deposit ₹500</Button>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-forest-50 border-forest-200">
                <CardHeader>
                  <CardTitle className="text-forest-500">Total Spend</CardTitle>
                  <CardDescription>Sum of all payments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-forest-500">₹{
                    transactions.filter(t => t.type === 'payment').reduce((sum, t) => sum + t.amount, 0).toFixed(2)
                  }</div>
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" className="border-forest-300 text-forest-500 hover:bg-forest-100" onClick={() => useAppStore.getState().pay(200, 'provider_demo', 'Demo payment')}>Pay ₹200</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            <Card className="bg-forest-50 border-forest-200">
              <CardHeader>
                <CardTitle className="text-forest-500">History</CardTitle>
                <CardDescription>Recent deposits and payments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {transactions.slice().reverse().map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-3 bg-forest-100 rounded-md">
                      <div className="flex items-center gap-3">
                        <Badge className={tx.type === 'deposit' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {tx.type}
                        </Badge>
                        <span className="text-forest-500">₹{tx.amount}</span>
                      </div>
                      <span className="text-forest-400 text-sm">{new Date(tx.createdAtISO).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-forest-500">My Bookings</h2>
              <Button className="bg-forest-400 hover:bg-forest-500" onClick={() => setShowBookingForm(true)}>
                <Plus className="w-4 h-4 mr-2" /> New Booking
              </Button>
            </div>

            {showBookingForm && (
              <Card className="bg-forest-50 border-forest-200">
                <CardHeader>
                  <CardTitle className="text-forest-500">Create Booking</CardTitle>
                </CardHeader>
                <CardContent>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!bookingDraft.title || !bookingDraft.dateTimeISO || !bookingDraft.amount) return;
                      createBookingStore({
                        type: bookingDraft.type,
                        itemId: `${bookingDraft.type}-mock`,
                        title: bookingDraft.title,
                        dateTimeISO: bookingDraft.dateTimeISO,
                        amount: Number(bookingDraft.amount),
                      });
                      setShowBookingForm(false);
                      setBookingDraft({ type: 'cab', title: '', dateTimeISO: '', amount: 0 });
                    }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <label className="text-sm text-forest-500">Service Type
                    <select
                      value={bookingDraft.type}
                      onChange={(e) => setBookingDraft((d) => ({ ...d, type: e.target.value as any }))}
                      className="px-3 py-2 border border-forest-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-300 bg-forest-50 text-forest-500"
                    >
                      <option value="cab">Cab</option>
                      <option value="hotel">Hotel</option>
                      <option value="restaurant">Restaurant</option>
                      <option value="guide">Guide</option>
                    </select>
                    </label>
                    <label className="text-sm text-forest-500">Title
                    <input
                      placeholder="e.g. Airport transfer to hotel"
                      className="px-3 py-2 border border-forest-200 rounded-lg bg-forest-50 text-forest-500"
                      value={bookingDraft.title}
                      onChange={(e) => setBookingDraft((d) => ({ ...d, title: e.target.value }))}
                    />
                    </label>
                    <label className="text-sm text-forest-500">Date & Time
                    <input
                      type="datetime-local"
                      className="px-3 py-2 border border-forest-200 rounded-lg bg-forest-50 text-forest-500"
                      value={bookingDraft.dateTimeISO}
                      onChange={(e) => setBookingDraft((d) => ({ ...d, dateTimeISO: e.target.value }))}
                    />
                    </label>
                    <label className="text-sm text-forest-500">Amount (₹)
                    <input
                      type="number"
                      placeholder="500"
                      className="px-3 py-2 border border-forest-200 rounded-lg bg-forest-50 text-forest-500"
                      value={bookingDraft.amount}
                      onChange={(e) => setBookingDraft((d) => ({ ...d, amount: Number(e.target.value) }))}
                    />
                    </label>
                    <div className="md:col-span-2 flex gap-2">
                      <Button type="submit" className="bg-forest-400 hover:bg-forest-500">Add Booking</Button>
                      <Button type="button" variant="outline" className="border-forest-300 text-forest-500 hover:bg-forest-100" onClick={() => setShowBookingForm(false)}>Cancel</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            <div className="space-y-4">
              {storeBookings.map((booking) => (
                <Card key={booking.id} className="bg-forest-50 border-forest-200">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-forest-100 rounded-lg">
                          {getServiceIcon(booking.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-forest-500">{booking.title}</h3>
                            <Badge className={getServiceColor(booking.type)}>
                              {booking.type.toUpperCase()}
                            </Badge>
                            <Badge className={getStatusColor(booking.status)}>
                              {booking.status}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm text-forest-400">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span>{new Date(booking.dateTimeISO).toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              <span>{booking.location ? `${booking.location.lat.toFixed(2)}, ${booking.location.lng.toFixed(2)}` : 'N/A'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CreditCard className="w-4 h-4" />
                              <span>₹{booking.amount}</span>
                            </div>
                          </div>
                          {/* Feedback section omitted for simplified model */}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {booking.status === 'pending' && (
                          <>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => completeBookingStore(booking.id)}>Complete</Button>
                            <Button size="sm" variant="outline" className="border-yellow-300 text-yellow-700 hover:bg-yellow-100" onClick={() => cancelBookingStore(booking.id)}>Cancel</Button>
                            <Button size="sm" variant="outline" className="border-red-300 text-red-600 hover:bg-red-100" onClick={() => rejectBookingStore(booking.id)}>Reject</Button>
                          </>
                        )}
                        <Button size="sm" variant="outline" className="border-forest-300 text-forest-500 hover:bg-forest-100" onClick={() => deleteBookingStore(booking.id)}>Delete</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Nearby Providers Tab */}
          <TabsContent value="nearby" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-forest-500">Nearby Services</h2>
              <div className="flex gap-2">
                <select
                  value={selectedServiceType}
                  onChange={(e) => setSelectedServiceType(e.target.value)}
                  className="px-3 py-2 border border-forest-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-300 bg-forest-50 text-forest-500"
                >
                  <option value="all">All Services</option>
                  <option value="cab">Cabs</option>
                  <option value="hotel">Hotels</option>
                  <option value="restaurant">Restaurants</option>
                  <option value="shop">Shops</option>
                  <option value="guide">Guides</option>
                </select>
                <Button variant="outline" className="border-forest-300 text-forest-500 hover:bg-forest-100">
                  <Map className="w-4 h-4 mr-2" />
                  View on Map
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {nearbyProviders
                .filter(provider => selectedServiceType === 'all' || provider.type === selectedServiceType)
                .map((provider) => (
                <Card key={provider.id} className="bg-forest-50 border-forest-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-forest-500 text-lg">{provider.name}</CardTitle>
                      <Badge className={getServiceColor(provider.type)}>
                        {getServiceIcon(provider.type)}
                        <span className="ml-1">{provider.type.toUpperCase()}</span>
                      </Badge>
                    </div>
                    <CardDescription className="text-forest-400">
                      {provider.location}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-forest-500 text-sm font-medium">{provider.rating.toFixed(1)}</span>
                        </div>
                        <div className="flex items-center gap-1 text-forest-400 text-sm">
                          <Navigation className="w-4 h-4" />
                          <span>{provider.distance}km away</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-forest-400">Base Price:</span>
                          <span className="text-forest-500 font-medium">₹{provider.pricing.basePrice}</span>
                        </div>
                        {provider.pricing.perKm && (
                          <div className="flex justify-between text-sm">
                            <span className="text-forest-400">Per Km:</span>
                            <span className="text-forest-500 font-medium">₹{provider.pricing.perKm}</span>
                          </div>
                        )}
                        {provider.pricing.perHour && (
                          <div className="flex justify-between text-sm">
                            <span className="text-forest-400">Per Hour:</span>
                            <span className="text-forest-500 font-medium">₹{provider.pricing.perHour}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Badge className={provider.availability ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {provider.availability ? 'Available' : 'Busy'}
                        </Badge>
                        <div className="flex gap-1">
                          <Button 
                            size="sm" 
                            className="bg-forest-400 hover:bg-forest-500"
                            onClick={() => handleBooking(provider.id, provider.name, provider.type)}
                          >
                            <BookOpen className="w-4 h-4 mr-1" />
                            Book
                          </Button>
                          <Button variant="outline" size="sm" className="border-forest-300 text-forest-500 hover:bg-forest-100">
                            <Phone className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Wishlist Tab (uses global store) */}
          <TabsContent value="wishlist" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-forest-500">My Wishlist</h2>
              <div></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {globalWishlist.map((item) => (
                <Card key={item.id} className="bg-forest-50 border-forest-200">
                  {item.image && (
                    <Image src={item.image} alt={item.title} width={400} height={200} className="w-full h-48 object-cover rounded-t-lg" />
                  )}
                  <CardHeader>
                    <CardTitle className="text-forest-500">{item.title}</CardTitle>
                    <CardDescription className="text-forest-400 capitalize">{item.kind}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="border-forest-300 text-forest-500 hover:bg-forest-100" onClick={() => toggleLike(item)}>
                        <Heart className="w-4 h-4" /> Like
                      </Button>
                      <Button size="sm" variant="outline" className="border-forest-300 text-forest-500 hover:bg-forest-100" onClick={() => addVisited(item)}>
                        <CheckCircle className="w-4 h-4" /> Visited
                      </Button>
                      <Button size="sm" className="bg-red-500 hover:bg-red-600" onClick={() => toggleWishlistGlobal(item)}>
                        Remove
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Visited Tab (uses global store) */}
          <TabsContent value="visited" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-forest-500">Visited Places</h2>
              <div></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visitedGlobal.map((item) => (
                <Card key={item.id} className="bg-forest-50 border-forest-200">
                  {item.image && (
                    <Image src={item.image} alt={item.title} width={400} height={200} className="w-full h-48 object-cover rounded-t-lg" />
                  )}
                  <CardHeader>
                    <CardTitle className="text-forest-500">{item.title}</CardTitle>
                    <CardDescription className="text-forest-400 capitalize">{item.kind}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="border-forest-300 text-forest-500 hover:bg-forest-100" onClick={() => toggleLike(item)}>
                        <Heart className="w-4 h-4" /> Like
                      </Button>
                      <Button size="sm" className="bg-red-500 hover:bg-red-600" onClick={() => removeVisited(item.id)}>
                        Remove
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Liked Tab (uses global store) */}
          <TabsContent value="liked" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-forest-500">Liked Places</h2>
              <div></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {liked.map((item) => (
                <Card key={item.id} className="bg-forest-50 border-forest-200">
                  {item.image && (
                    <Image src={item.image} alt={item.title} width={400} height={200} className="w-full h-48 object-cover rounded-t-lg" />
                  )}
                  <CardHeader>
                    <CardTitle className="text-forest-500">{item.title}</CardTitle>
                    <CardDescription className="text-forest-400 capitalize">{item.kind}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="border-forest-300 text-forest-500 hover:bg-forest-100" onClick={() => addVisited(item)}>
                        <CheckCircle className="w-4 h-4" /> Visited
                      </Button>
                      <Button size="sm" className="bg-red-500 hover:bg-red-600" onClick={() => toggleLike(item)}>
                        Remove
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Complaints Tab */}
          <TabsContent value="complaints" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-forest-500">My Complaints</h2>
              <Link href="#create-complaint" className="bg-forest-400 hover:bg-forest-500 text-white px-4 py-2 rounded-lg">Raise Complaint</Link>
            </div>

            <div className="space-y-4">
              {complaints.map((complaint) => (
                <Card key={complaint.id} className="bg-forest-50 border-forest-200">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-forest-500">{complaint.title}</h3>
                          <Badge className={getStatusColor(complaint.status)}>
                            {complaint.status}
                          </Badge>
                          <Badge className={getPriorityColor(complaint.priority)}>
                            {complaint.priority}
                          </Badge>
                        </div>
                        <p className="text-forest-400 mb-2">{complaint.description}</p>
                        <div className="flex items-center gap-4 text-sm text-forest-400">
                          <span>Destination: {complaint.destination}</span>
                          <span>Provider: {complaint.provider}</span>
                          <span>Date: {complaint.createdAt}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="border-forest-300 text-forest-500 hover:bg-forest-100">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          Follow Up
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Create Complaint */}
            <div id="create-complaint" className="mt-10">
              <Card className="bg-forest-50 border-forest-200">
                <CardHeader>
                  <CardTitle className="text-forest-500">Create a Complaint</CardTitle>
                </CardHeader>
                <CardContent>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const form = e.target as HTMLFormElement;
                      const formData = new FormData(form);
                      const title = String(formData.get('title') || '');
                      const description = String(formData.get('description') || '');
                      const priority = String(formData.get('priority') || 'medium') as 'low' | 'medium' | 'high';
                      const destination = String(formData.get('destination') || '');
                      const provider = String(formData.get('provider') || '');
                      if (!title || !description) return;
                      const created = addComplaint({ title, description, priority, destination, provider });
                      setComplaints((prev) => [
                        {
                          id: created.id,
                          title: created.title,
                          description: created.description,
                          status: created.status,
                          priority: created.priority,
                          createdAt: new Date(created.createdAtISO).toLocaleDateString(),
                          destination: created.destination,
                          provider: created.provider,
                        },
                        ...prev,
                      ]);
                      form.reset();
                    }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <div className="md:col-span-2">
                      <Input name="title" placeholder="Title" />
                    </div>
                    <div className="md:col-span-2">
                      <Input name="description" placeholder="Description" />
                    </div>
                    <Input name="destination" placeholder="Destination (optional)" />
                    <Input name="provider" placeholder="Provider (optional)" />
                    <select name="priority" className="px-3 py-2 border border-forest-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-300 bg-forest-50 text-forest-500">
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                    <div className="md:col-span-2">
                      <Button type="submit" className="bg-forest-400 hover:bg-forest-500">Submit Complaint</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

        </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
