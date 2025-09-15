"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp,
  Settings,
  Shield,
  Eye,
  MessageCircle,
  Phone,
  MapPin,
  Calendar,
  Star,
  DollarSign,
  UserCheck,
  Plus,
  Edit,
  Crown,
  Building,

  Download,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useAppStore } from "@/store";
import { useRouter } from "next/navigation";

interface Complaint {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  destination?: string;
  provider?: string;
  customerName: string;
  assignedTo?: string;
}

interface Provider {
  id: string;
  name: string;
  type: 'cab' | 'hotel' | 'restaurant' | 'shop' | 'guide';
  rating: number;
  phone: string;
  location: string;
  isVerified: boolean;
  isActive: boolean;
  totalBookings: number;
  complaints: number;
  joinDate: string;
}

interface SubAdmin {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  lastLogin: string;
  complaintsResolved: number;
  region: string;
}

interface Trend {
  id: string;
  name: string;
  type: 'destination' | 'service' | 'complaint';
  count: number;
  change: number;
  period: string;
  district?: string;
  category?: string;
}

interface District {
  id: string;
  name: string;
  population: number;
  tourismRevenue: number;
  totalProviders: number;
  activeComplaints: number;
  trendingPlaces: number;
  adminId: string;
  adminName: string;
  lastUpdated: string;
}

interface StateAnalytics {
  totalDistricts: number;
  totalProviders: number;
  totalComplaints: number;
  totalRevenue: number;
  topPerformingDistrict: string;
  mostComplainedDistrict: string;
  tourismGrowth: number;
  providerGrowth: number;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const role = useAppStore((s) => s.role);
  useEffect(() => {
    if (role !== 'admin' && role !== 'admin_state') {
      router.replace('/');
    }
  }, [role, router]);
  const [activeTab, setActiveTab] = useState('overview');
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [subAdmins, setSubAdmins] = useState<SubAdmin[]>([]);
  const [trends, setTrends] = useState<Trend[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [stateAnalytics, setStateAnalytics] = useState<StateAnalytics>({
    totalDistricts: 0,
    totalProviders: 0,
    totalComplaints: 0,
    totalRevenue: 0,
    topPerformingDistrict: '',
    mostComplainedDistrict: '',
    tourismGrowth: 0,
    providerGrowth: 0
  });
  const [adminLevel, setAdminLevel] = useState<'state' | 'district'>('state');
  // const [selectedDistrict, setSelectedDistrict] = useState<string>('all');

  // Mock data - in real app, this would come from API
  useEffect(() => {
    setComplaints([
      {
        id: 'complaint-1',
        title: 'Poor service at hotel',
        description: 'The hotel staff was unresponsive to our requests',
        status: 'pending',
        priority: 'medium',
        createdAt: '2024-01-20',
        destination: 'Ranchi',
        provider: 'Hotel Grand',
        customerName: 'Rajesh Kumar',
        assignedTo: 'Sub Admin 1'
      },
      {
        id: 'complaint-2',
        title: 'Cab driver overcharged',
        description: 'Driver charged 50% more than the agreed amount',
        status: 'in-progress',
        priority: 'high',
        createdAt: '2024-01-18',
        destination: 'Deoghar',
        provider: 'City Cabs',
        customerName: 'Priya Sharma',
        assignedTo: 'Sub Admin 2'
      },
      {
        id: 'complaint-3',
        title: 'Restaurant food quality',
        description: 'Food was cold and not as described',
        status: 'resolved',
        priority: 'low',
        createdAt: '2024-01-15',
        destination: 'Jamshedpur',
        provider: 'Mama\'s Kitchen',
        customerName: 'Amit Singh',
        assignedTo: 'Sub Admin 1'
      }
    ]);

    setProviders([
      {
        id: 'provider-1',
        name: 'Rajesh Kumar - Cab Driver',
        type: 'cab',
        rating: 4.5,
        phone: '+91 9876543210',
        location: 'Ranchi',
        isVerified: true,
        isActive: true,
        totalBookings: 156,
        complaints: 2,
        joinDate: '2023-06-15'
      },
      {
        id: 'provider-2',
        name: 'Hotel Grand Palace',
        type: 'hotel',
        rating: 4.2,
        phone: '+91 9876543211',
        location: 'Ranchi',
        isVerified: true,
        isActive: true,
        totalBookings: 89,
        complaints: 1,
        joinDate: '2023-08-20'
      },
      {
        id: 'provider-3',
        name: 'Mama\'s Kitchen',
        type: 'restaurant',
        rating: 4.7,
        phone: '+91 9876543212',
        location: 'Deoghar',
        isVerified: false,
        isActive: true,
        totalBookings: 45,
        complaints: 1,
        joinDate: '2024-01-10'
      }
    ]);

    setSubAdmins([
      {
        id: 'subadmin-1',
        name: 'Sub Admin 1',
        email: 'subadmin1@jhar-safar.com',
        role: 'Regional Admin',
        isActive: true,
        lastLogin: '2024-01-24',
        complaintsResolved: 45,
        region: 'Ranchi'
      },
      {
        id: 'subadmin-2',
        name: 'Sub Admin 2',
        email: 'subadmin2@jhar-safar.com',
        role: 'Regional Admin',
        isActive: true,
        lastLogin: '2024-01-23',
        complaintsResolved: 38,
        region: 'Deoghar'
      }
    ]);

    setTrends([
      {
        id: 'trend-1',
        name: 'Baba Baidyanath Dham',
        type: 'destination',
        count: 1250,
        change: 15.2,
        period: 'This Month',
        district: 'Deoghar',
        category: 'Temple'
      },
      {
        id: 'trend-2',
        name: 'Cab Services',
        type: 'service',
        count: 890,
        change: 8.5,
        period: 'This Month',
        district: 'Ranchi',
        category: 'Transport'
      },
      {
        id: 'trend-3',
        name: 'Service Quality Complaints',
        type: 'complaint',
        count: 23,
        change: -12.3,
        period: 'This Month',
        district: 'Jamshedpur',
        category: 'Service'
      }
    ]);

    // Mock districts data
    setDistricts([
      {
        id: 'district-1',
        name: 'Ranchi',
        population: 1200000,
        tourismRevenue: 25000000,
        totalProviders: 156,
        activeComplaints: 12,
        trendingPlaces: 8,
        adminId: 'subadmin-1',
        adminName: 'Sub Admin 1',
        lastUpdated: '2024-01-24'
      },
      {
        id: 'district-2',
        name: 'Deoghar',
        population: 800000,
        tourismRevenue: 18000000,
        totalProviders: 89,
        activeComplaints: 8,
        trendingPlaces: 12,
        adminId: 'subadmin-2',
        adminName: 'Sub Admin 2',
        lastUpdated: '2024-01-23'
      },
      {
        id: 'district-3',
        name: 'Jamshedpur',
        population: 1500000,
        tourismRevenue: 32000000,
        totalProviders: 203,
        activeComplaints: 15,
        trendingPlaces: 6,
        adminId: 'subadmin-3',
        adminName: 'Sub Admin 3',
        lastUpdated: '2024-01-22'
      }
    ]);

    // Mock state analytics
    setStateAnalytics({
      totalDistricts: 24,
      totalProviders: 1245,
      totalComplaints: 156,
      totalRevenue: 125000000,
      topPerformingDistrict: 'Jamshedpur',
      mostComplainedDistrict: 'Jamshedpur',
      tourismGrowth: 12.5,
      providerGrowth: 8.3
    });
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'cab': return '🚗';
      case 'hotel': return '🏨';
      case 'restaurant': return '🍽️';
      case 'shop': return '🛍️';
      case 'guide': return '👨‍🏫';
      default: return '🏢';
    }
  };

  const updateComplaintStatus = (id: string, status: string) => {
    setComplaints(prev => prev.map(complaint => 
      complaint.id === id ? { ...complaint, status: status as any } : complaint
    ));
  };

  const toggleProviderStatus = (id: string) => {
    setProviders(prev => prev.map(provider => 
      provider.id === id ? { ...provider, isActive: !provider.isActive } : provider
    ));
  };

  const toggleProviderVerification = (id: string) => {
    setProviders(prev => prev.map(provider => 
      provider.id === id ? { ...provider, isVerified: !provider.isVerified } : provider
    ));
  };

  return (
    <div className="min-h-screen bg-forest-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar */}
          <aside className="lg:col-span-3">
            <div className="sticky top-24 space-y-3">
              <button className="w-full flex items-center justify-between p-3 rounded-lg border border-forest-200 bg-forest-50 text-left">
                <span className="text-forest-500">Overview</span>
                <span className="text-forest-400 text-sm">State</span>
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-lg border border-forest-200 bg-forest-50 text-left">
                <span className="text-forest-500">Districts</span>
                <span className="text-forest-400 text-sm">Manage</span>
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-lg border border-forest-200 bg-forest-50 text-left">
                <span className="text-forest-500">Complaints</span>
                <span className="text-forest-400 text-sm">Handle</span>
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-lg border border-forest-200 bg-forest-50 text-left">
                <span className="text-forest-500">Providers</span>
                <span className="text-forest-400 text-sm">Manage</span>
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-lg border border-forest-200 bg-forest-50 text-left">
                <span className="text-forest-500">Sub Admins</span>
                <span className="text-forest-400 text-sm">Manage</span>
              </button>
            </div>
          </aside>

          {/* Main content */}
          <div className="lg:col-span-9">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-forest-500 mb-2">Admin Dashboard</h1>
              <p className="text-forest-400">Manage complaints, providers, and sub-admins</p>
            </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-forest-50 border-forest-200">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-forest-100 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-forest-500" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-forest-500">
                    {complaints.filter(c => c.status === 'pending').length}
                  </p>
                  <p className="text-forest-400 text-sm">Pending Complaints</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-forest-50 border-forest-200">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-forest-100 rounded-lg">
                  <Users className="w-6 h-6 text-forest-500" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-forest-500">{providers.length}</p>
                  <p className="text-forest-400 text-sm">Total Providers</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-forest-50 border-forest-200">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-forest-100 rounded-lg">
                  <Shield className="w-6 h-6 text-forest-500" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-forest-500">{subAdmins.length}</p>
                  <p className="text-forest-400 text-sm">Sub Admins</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-forest-50 border-forest-200">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-forest-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-forest-500" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-forest-500">
                    {complaints.filter(c => c.status === 'resolved').length}
                  </p>
                  <p className="text-forest-400 text-sm">Resolved Issues</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Admin Level Toggle */}
        <div className="flex justify-center mb-6">
          <div className="bg-forest-100 rounded-lg p-1">
            <button
              onClick={() => setAdminLevel('state')}
              className={`px-4 py-2 rounded-md transition-colors ${
                adminLevel === 'state' 
                  ? 'bg-forest-400 text-white' 
                  : 'text-forest-500 hover:bg-forest-200'
              }`}
            >
              <Crown className="w-4 h-4 mr-2 inline" />
              State Level Admin
            </button>
            <button
              onClick={() => setAdminLevel('district')}
              className={`px-4 py-2 rounded-md transition-colors ${
                adminLevel === 'district' 
                  ? 'bg-forest-400 text-white' 
                  : 'text-forest-500 hover:bg-forest-200'
              }`}
            >
              <Building className="w-4 h-4 mr-2 inline" />
              District Level Admin
            </button>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className={`grid w-full ${adminLevel === 'state' ? 'grid-cols-5' : 'grid-cols-4'} bg-forest-100`}>
            <TabsTrigger value="overview" className="data-[state=active]:bg-forest-200">Overview</TabsTrigger>
            {adminLevel === 'state' && (
              <TabsTrigger value="districts" className="data-[state=active]:bg-forest-200">Districts</TabsTrigger>
            )}
            <TabsTrigger value="complaints" className="data-[state=active]:bg-forest-200">Complaints</TabsTrigger>
            <TabsTrigger value="providers" className="data-[state=active]:bg-forest-200">Providers</TabsTrigger>
            <TabsTrigger value="subadmins" className="data-[state=active]:bg-forest-200">Sub Admins</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {adminLevel === 'state' ? (
              // State Level Overview
              <div className="space-y-6">
                {/* State Analytics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="bg-forest-50 border-forest-200">
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <div className="p-2 bg-forest-100 rounded-lg">
                          <Building className="w-6 h-6 text-forest-500" />
                        </div>
                        <div className="ml-4">
                          <p className="text-2xl font-bold text-forest-500">{stateAnalytics.totalDistricts}</p>
                          <p className="text-forest-400 text-sm">Total Districts</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-forest-50 border-forest-200">
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <div className="p-2 bg-forest-100 rounded-lg">
                          <Users className="w-6 h-6 text-forest-500" />
                        </div>
                        <div className="ml-4">
                          <p className="text-2xl font-bold text-forest-500">{stateAnalytics.totalProviders}</p>
                          <p className="text-forest-400 text-sm">Total Providers</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-forest-50 border-forest-200">
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <div className="p-2 bg-forest-100 rounded-lg">
                          <DollarSign className="w-6 h-6 text-forest-500" />
                        </div>
                        <div className="ml-4">
                          <p className="text-2xl font-bold text-forest-500">₹{stateAnalytics.totalRevenue.toLocaleString()}</p>
                          <p className="text-forest-400 text-sm">Total Revenue</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-forest-50 border-forest-200">
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <div className="p-2 bg-forest-100 rounded-lg">
                          <TrendingUp className="w-6 h-6 text-forest-500" />
                        </div>
                        <div className="ml-4">
                          <p className="text-2xl font-bold text-forest-500">+{stateAnalytics.tourismGrowth}%</p>
                          <p className="text-forest-400 text-sm">Tourism Growth</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Top Performing Districts */}
                  <Card className="bg-forest-50 border-forest-200">
                    <CardHeader>
                      <CardTitle className="text-forest-500">Top Performing Districts</CardTitle>
                      <CardDescription>Districts with highest tourism revenue</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {districts.slice(0, 3).map((district) => (
                          <div key={district.id} className="flex items-center justify-between p-3 bg-forest-100 rounded-lg">
                            <div>
                              <h4 className="font-medium text-forest-500">{district.name}</h4>
                              <p className="text-sm text-forest-400">{district.adminName}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-forest-500 font-medium">₹{district.tourismRevenue.toLocaleString()}</p>
                              <p className="text-xs text-forest-400">{district.totalProviders} providers</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* State-wide Trends */}
                  <Card className="bg-forest-50 border-forest-200">
                    <CardHeader>
                      <CardTitle className="text-forest-500">State-wide Trends</CardTitle>
                      <CardDescription>Latest trends across Jharkhand</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {trends.map((trend) => (
                          <div key={trend.id} className="flex items-center justify-between p-3 bg-forest-100 rounded-lg">
                            <div>
                              <h4 className="font-medium text-forest-500">{trend.name}</h4>
                              <p className="text-sm text-forest-400">{trend.district} • {trend.category}</p>
                            </div>
                            <div className="text-right">
                              <span className={`text-sm font-medium ${trend.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {trend.change > 0 ? '+' : ''}{trend.change}%
                              </span>
                              <p className="text-xs text-forest-400">{trend.count} {trend.type}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ) : (
              // District Level Overview
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Complaints */}
                <Card className="bg-forest-50 border-forest-200">
                  <CardHeader>
                    <CardTitle className="text-forest-500">Recent Complaints</CardTitle>
                    <CardDescription>Latest complaints in your district</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {complaints.slice(0, 3).map((complaint) => (
                        <div key={complaint.id} className="flex items-center justify-between p-3 bg-forest-100 rounded-lg">
                          <div>
                            <h4 className="font-medium text-forest-500">{complaint.title}</h4>
                            <p className="text-sm text-forest-400">{complaint.customerName} • {complaint.destination}</p>
                          </div>
                          <Badge className={getStatusColor(complaint.status)}>
                            {complaint.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* District Trends */}
                <Card className="bg-forest-50 border-forest-200">
                  <CardHeader>
                    <CardTitle className="text-forest-500">District Trends</CardTitle>
                    <CardDescription>Popular places in your district</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {trends.filter(t => t.district === 'Ranchi').map((trend) => (
                        <div key={trend.id} className="flex items-center justify-between p-3 bg-forest-100 rounded-lg">
                          <div>
                            <h4 className="font-medium text-forest-500">{trend.name}</h4>
                            <p className="text-sm text-forest-400">{trend.count} visitors</p>
                          </div>
                          <div className="text-right">
                            <span className="text-green-600 text-sm font-medium">+{trend.change}%</span>
                            <p className="text-xs text-forest-400">{trend.period}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          {/* Districts Tab (State Level Only) */}
          {adminLevel === 'state' && (
            <TabsContent value="districts" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-forest-500">District Management</h2>
                <div className="flex gap-2">
                  <Button className="bg-forest-400 hover:bg-forest-500">
                    <Plus className="w-4 h-4 mr-2" />
                    Add District
                  </Button>
                  <Button variant="outline" className="border-forest-300 text-forest-500 hover:bg-forest-100">
                    <Download className="w-4 h-4 mr-2" />
                    Export Data
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {districts.map((district) => (
                  <Card key={district.id} className="bg-forest-50 border-forest-200">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-forest-500 text-lg">{district.name}</CardTitle>
                        <Badge className="bg-forest-100 text-forest-600">
                          {district.totalProviders} Providers
                        </Badge>
                      </div>
                      <CardDescription className="text-forest-400">
                        Admin: {district.adminName}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-forest-400">Population:</span>
                            <p className="text-forest-500 font-medium">{district.population.toLocaleString()}</p>
                          </div>
                          <div>
                            <span className="text-forest-400">Revenue:</span>
                            <p className="text-forest-500 font-medium">₹{district.tourismRevenue.toLocaleString()}</p>
                          </div>
                          <div>
                            <span className="text-forest-400">Complaints:</span>
                            <p className="text-forest-500 font-medium">{district.activeComplaints}</p>
                          </div>
                          <div>
                            <span className="text-forest-400">Trending:</span>
                            <p className="text-forest-500 font-medium">{district.trendingPlaces} places</p>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 mt-4">
                          <Button size="sm" className="flex-1 bg-forest-400 hover:bg-forest-500">
                            <Eye className="w-4 h-4 mr-1" />
                            View Details
                          </Button>
                          <Button variant="outline" size="sm" className="border-forest-300 text-forest-500 hover:bg-forest-100">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          )}

          {/* Complaints Tab */}
          <TabsContent value="complaints" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-forest-500">Complaint Management</h2>
              <div className="flex gap-2">
                <Button variant="outline" className="border-forest-300 text-forest-500 hover:bg-forest-100">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </div>
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
                        <div className="grid grid-cols-2 gap-4 text-sm text-forest-400">
                          <div>
                            <span className="font-medium">Customer:</span> {complaint.customerName}
                          </div>
                          <div>
                            <span className="font-medium">Destination:</span> {complaint.destination}
                          </div>
                          <div>
                            <span className="font-medium">Provider:</span> {complaint.provider}
                          </div>
                          <div>
                            <span className="font-medium">Assigned To:</span> {complaint.assignedTo}
                          </div>
                          <div>
                            <span className="font-medium">Date:</span> {complaint.createdAt}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {complaint.status === 'pending' && (
                          <Button 
                            size="sm" 
                            className="bg-blue-600 hover:bg-blue-700"
                            onClick={() => updateComplaintStatus(complaint.id, 'in-progress')}
                          >
                            Assign
                          </Button>
                        )}
                        {complaint.status === 'in-progress' && (
                          <Button 
                            size="sm" 
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => updateComplaintStatus(complaint.id, 'resolved')}
                          >
                            Resolve
                          </Button>
                        )}
                        <Button variant="outline" size="sm" className="border-forest-300 text-forest-500 hover:bg-forest-100">
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Providers Tab */}
          <TabsContent value="providers" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-forest-500">Provider Management</h2>
              <div className="flex gap-2">
                <Button className="bg-forest-400 hover:bg-forest-500">
                  <UserCheck className="w-4 h-4 mr-2" />
                  Add Provider
                </Button>
                <Button variant="outline" className="border-forest-300 text-forest-500 hover:bg-forest-100">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {providers.map((provider) => (
                <Card key={provider.id} className="bg-forest-50 border-forest-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-forest-500 text-lg">{provider.name}</CardTitle>
                      <div className="flex gap-1">
                        {provider.isVerified && (
                          <Badge className="bg-green-100 text-green-800">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                        <Badge className={provider.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {provider.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                    </div>
                    <CardDescription className="text-forest-400">
                      {getTypeIcon(provider.type)} {provider.type.toUpperCase()}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-forest-400" />
                        <span className="text-forest-500 text-sm">{provider.location}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-forest-400" />
                        <span className="text-forest-500 text-sm">{provider.phone}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-forest-500 text-sm font-medium">{provider.rating.toFixed(1)}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-forest-400">Bookings:</span>
                          <span className="text-forest-500 font-medium ml-1">{provider.totalBookings}</span>
                        </div>
                        <div>
                          <span className="text-forest-400">Complaints:</span>
                          <span className="text-forest-500 font-medium ml-1">{provider.complaints}</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 mt-4">
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="flex-1 border-forest-300 text-forest-500 hover:bg-forest-100"
                          onClick={() => toggleProviderVerification(provider.id)}
                        >
                          {provider.isVerified ? 'Unverify' : 'Verify'}
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="flex-1 border-forest-300 text-forest-500 hover:bg-forest-100"
                          onClick={() => toggleProviderStatus(provider.id)}
                        >
                          {provider.isActive ? 'Deactivate' : 'Activate'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Sub Admins Tab */}
          <TabsContent value="subadmins" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-forest-500">Sub Admin Management</h2>
              <div className="flex gap-2">
                <Button className="bg-forest-400 hover:bg-forest-500">
                  <UserCheck className="w-4 h-4 mr-2" />
                  Add Sub Admin
                </Button>
                <Button variant="outline" className="border-forest-300 text-forest-500 hover:bg-forest-100">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subAdmins.map((admin) => (
                <Card key={admin.id} className="bg-forest-50 border-forest-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-forest-500 text-lg">{admin.name}</CardTitle>
                      <Badge className={admin.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {admin.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                    <CardDescription className="text-forest-400">{admin.role}</CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-forest-400" />
                        <span className="text-forest-500 text-sm">{admin.region}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-forest-400" />
                        <span className="text-forest-500 text-sm">Last Login: {admin.lastLogin}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-forest-400" />
                        <span className="text-forest-500 text-sm">Resolved: {admin.complaintsResolved}</span>
                      </div>
                      
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" className="flex-1 bg-forest-400 hover:bg-forest-500">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          Contact
                        </Button>
                        <Button variant="outline" size="sm" className="border-forest-300 text-forest-500 hover:bg-forest-100">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
