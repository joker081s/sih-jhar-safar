"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  Users, 
  Star, 
  Clock, 
  DollarSign,
  MessageCircle,
  Phone,
  MapPin,
  Calendar,
  BarChart3,
  Settings,
  CheckCircle,
  AlertCircle,
  Eye,
  Heart,
  Plus,
  Edit,
  Save,
  X,
  Car,
  Hotel,
  Utensils,
  ShoppingBag,
  UserCheck,
  ThumbsUp,
  ThumbsDown,
  BookOpen,
  CreditCard,
  Navigation,
  Map,
  Target,
  TrendingDown,
  Award,
  Zap
} from "lucide-react";
import { useState, useEffect } from "react";
import { useAppStore } from "@/store";
import { useRouter } from "next/navigation";

interface ServiceRequest {
  id: string;
  customerName: string;
  service: string;
  date: string;
  time: string;
  location: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  rating?: number;
  amount: number;
  phone: string;
}

interface Review {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  service: string;
}

interface Analytics {
  totalBookings: number;
  completedBookings: number;
  averageRating: number;
  totalEarnings: number;
  monthlyEarnings: number;
  customerSatisfaction: number;
  responseTime: number;
}

interface Service {
  id: string;
  name: string;
  type: 'cab' | 'hotel' | 'restaurant' | 'shop' | 'guide';
  description: string;
  pricing: {
    basePrice: number;
    perKm?: number;
    perHour?: number;
    perNight?: number;
    perPerson?: number;
  };
  availability: boolean;
  location: string;
  services: string[];
  images: string[];
  isActive: boolean;
  createdAt: string;
}

interface ImprovementArea {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  category: 'service' | 'pricing' | 'communication' | 'quality';
  suggestions: string[];
  progress: number;
}

export default function ProviderDashboardPage() {
  const router = useRouter();
  const role = useAppStore((s) => s.role);
  useEffect(() => {
    if (role !== 'provider') {
      router.replace('/');
    }
  }, [role, router]);
  const [activeTab, setActiveTab] = useState('overview');
  const [analytics, setAnalytics] = useState<Analytics>({
    totalBookings: 0,
    completedBookings: 0,
    averageRating: 0,
    totalEarnings: 0,
    monthlyEarnings: 0,
    customerSatisfaction: 0,
    responseTime: 0
  });
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [improvements, setImprovements] = useState<ImprovementArea[]>([]);
  const [isEditingService, setIsEditingService] = useState<string | null>(null);
  const [editingPricing, setEditingPricing] = useState<any>(null);

  // Mock data - in real app, this would come from API
  useEffect(() => {
    setAnalytics({
      totalBookings: 156,
      completedBookings: 142,
      averageRating: 4.6,
      totalEarnings: 125000,
      monthlyEarnings: 15000,
      customerSatisfaction: 92,
      responseTime: 2.5
    });

    setRequests([
      {
        id: 'req-1',
        customerName: 'Rajesh Kumar',
        service: 'Airport Transfer',
        date: '2024-01-25',
        time: '10:00 AM',
        location: 'Ranchi Airport to Hotel Grand',
        status: 'pending',
        amount: 800,
        phone: '+91 9876543210'
      },
      {
        id: 'req-2',
        customerName: 'Priya Sharma',
        service: 'City Tour',
        date: '2024-01-24',
        time: '2:00 PM',
        location: 'Ranchi City Center',
        status: 'confirmed',
        amount: 1200,
        phone: '+91 9876543211'
      },
      {
        id: 'req-3',
        customerName: 'Amit Singh',
        service: 'Long Distance',
        date: '2024-01-23',
        time: '8:00 AM',
        location: 'Ranchi to Deoghar',
        status: 'completed',
        rating: 5,
        amount: 2500,
        phone: '+91 9876543212'
      }
    ]);

    setReviews([
      {
        id: 'rev-1',
        customerName: 'Amit Singh',
        rating: 5,
        comment: 'Excellent service! Very punctual and professional.',
        date: '2024-01-23',
        service: 'Long Distance'
      },
      {
        id: 'rev-2',
        customerName: 'Sneha Patel',
        rating: 4,
        comment: 'Good driver, clean car. Would recommend.',
        date: '2024-01-20',
        service: 'Airport Transfer'
      },
      {
        id: 'rev-3',
        customerName: 'Vikram Reddy',
        rating: 5,
        comment: 'Amazing experience! Very knowledgeable about local places.',
        date: '2024-01-18',
        service: 'City Tour'
      }
    ]);

    // Mock services data
    setServices([
      {
        id: 'service-1',
        name: 'City Cab Service',
        type: 'cab',
        description: 'Reliable cab service for city tours and airport transfers',
        pricing: {
          basePrice: 500,
          perKm: 12,
          perHour: 200
        },
        availability: true,
        location: 'Ranchi',
        services: ['Airport Transfer', 'City Tours', 'Long Distance'],
        images: ['/attractions/image1.jpeg'],
        isActive: true,
        createdAt: '2024-01-01'
      },
      {
        id: 'service-2',
        name: 'Hotel Grand Palace',
        type: 'hotel',
        description: 'Luxury hotel with modern amenities',
        pricing: {
          basePrice: 2500,
          perNight: 2500,
          perPerson: 500
        },
        availability: true,
        location: 'Ranchi',
        services: ['AC Rooms', 'Restaurant', 'WiFi', 'Parking'],
        images: ['/attractions/image2.jpeg'],
        isActive: true,
        createdAt: '2024-01-01'
      }
    ]);

    // Mock improvement areas data
    setImprovements([
      {
        id: 'improvement-1',
        title: 'Response Time',
        description: 'Improve response time to customer requests',
        priority: 'high',
        category: 'communication',
        suggestions: [
          'Set up automated responses for common queries',
          'Use mobile app notifications for instant alerts',
          'Implement priority queue for urgent requests'
        ],
        progress: 60
      },
      {
        id: 'improvement-2',
        title: 'Service Quality',
        description: 'Enhance overall service quality based on feedback',
        priority: 'medium',
        category: 'service',
        suggestions: [
          'Regular vehicle maintenance checks',
          'Customer service training for staff',
          'Implement feedback collection system'
        ],
        progress: 80
      },
      {
        id: 'improvement-3',
        title: 'Pricing Strategy',
        description: 'Optimize pricing for better competitiveness',
        priority: 'low',
        category: 'pricing',
        suggestions: [
          'Analyze competitor pricing',
          'Implement dynamic pricing for peak hours',
          'Offer package deals for regular customers'
        ],
        progress: 40
      }
    ]);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const updateRequestStatus = (id: string, status: string) => {
    setRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: status as any } : req
    ));
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'service': return <Award className="w-4 h-4" />;
      case 'pricing': return <DollarSign className="w-4 h-4" />;
      case 'communication': return <MessageCircle className="w-4 h-4" />;
      case 'quality': return <Star className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  const toggleServiceStatus = (id: string) => {
    setServices(prev => prev.map(service => 
      service.id === id ? { ...service, isActive: !service.isActive } : service
    ));
  };

  const updateServicePricing = (id: string, pricing: any) => {
    setServices(prev => prev.map(service => 
      service.id === id ? { ...service, pricing } : service
    ));
  };

  return (
    <div className="min-h-screen bg-forest-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-forest-500 mb-2">Provider Dashboard</h1>
          <p className="text-forest-400">Manage your services, bookings, and customer interactions</p>
        </div>

        {/* Analytics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-forest-50 border-forest-200">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-forest-100 rounded-lg">
                  <Calendar className="w-6 h-6 text-forest-500" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-forest-500">{analytics.totalBookings}</p>
                  <p className="text-forest-400 text-sm">Total Bookings</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-forest-50 border-forest-200">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-forest-100 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-forest-500" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-forest-500">{analytics.completedBookings}</p>
                  <p className="text-forest-400 text-sm">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-forest-50 border-forest-200">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-forest-100 rounded-lg">
                  <Star className="w-6 h-6 text-forest-500" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-forest-500">{analytics.averageRating.toFixed(1)}</p>
                  <p className="text-forest-400 text-sm">Average Rating</p>
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
                  <p className="text-2xl font-bold text-forest-500">₹{analytics.totalEarnings.toLocaleString()}</p>
                  <p className="text-forest-400 text-sm">Total Earnings</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-forest-100">
            <TabsTrigger value="overview" className="data-[state=active]:bg-forest-200">Overview</TabsTrigger>
            <TabsTrigger value="services" className="data-[state=active]:bg-forest-200">Services</TabsTrigger>
            <TabsTrigger value="requests" className="data-[state=active]:bg-forest-200">Requests</TabsTrigger>
            <TabsTrigger value="reviews" className="data-[state=active]:bg-forest-200">Reviews</TabsTrigger>
            <TabsTrigger value="improvements" className="data-[state=active]:bg-forest-200">Improvements</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Requests */}
              <Card className="bg-forest-50 border-forest-200">
                <CardHeader>
                  <CardTitle className="text-forest-500">Recent Requests</CardTitle>
                  <CardDescription>Latest service requests from customers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {requests.slice(0, 3).map((request) => (
                      <div key={request.id} className="flex items-center justify-between p-3 bg-forest-100 rounded-lg">
                        <div>
                          <h4 className="font-medium text-forest-500">{request.customerName}</h4>
                          <p className="text-sm text-forest-400">{request.service}</p>
                          <p className="text-xs text-forest-400">{request.date} at {request.time}</p>
                        </div>
                        <Badge className={getStatusColor(request.status)}>
                          {getStatusIcon(request.status)}
                          <span className="ml-1">{request.status}</span>
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Reviews */}
              <Card className="bg-forest-50 border-forest-200">
                <CardHeader>
                  <CardTitle className="text-forest-500">Recent Reviews</CardTitle>
                  <CardDescription>Latest customer feedback</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {reviews.slice(0, 3).map((review) => (
                      <div key={review.id} className="p-3 bg-forest-100 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-forest-500">{review.customerName}</h4>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-forest-500 text-sm font-medium">{review.rating}</span>
                          </div>
                        </div>
                        <p className="text-forest-400 text-sm mb-1">{review.comment}</p>
                        <p className="text-xs text-forest-400">{review.service} • {review.date}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-forest-500">My Services</h2>
              <Button className="bg-forest-400 hover:bg-forest-500">
                <Plus className="w-4 h-4 mr-2" />
                Add Service
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <Card key={service.id} className="bg-forest-50 border-forest-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-forest-500 text-lg">{service.name}</CardTitle>
                      <div className="flex gap-1">
                        <Badge className={getServiceColor(service.type)}>
                          {getServiceIcon(service.type)}
                          <span className="ml-1">{service.type.toUpperCase()}</span>
                        </Badge>
                        <Badge className={service.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {service.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                    </div>
                    <CardDescription className="text-forest-400">{service.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-forest-400" />
                        <span className="text-forest-500 text-sm">{service.location}</span>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="text-forest-500 font-medium text-sm">Pricing:</h4>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-forest-400">Base Price:</span>
                            <span className="text-forest-500 font-medium">₹{service.pricing.basePrice}</span>
                          </div>
                          {service.pricing.perKm && (
                            <div className="flex justify-between text-sm">
                              <span className="text-forest-400">Per Km:</span>
                              <span className="text-forest-500 font-medium">₹{service.pricing.perKm}</span>
                            </div>
                          )}
                          {service.pricing.perHour && (
                            <div className="flex justify-between text-sm">
                              <span className="text-forest-400">Per Hour:</span>
                              <span className="text-forest-500 font-medium">₹{service.pricing.perHour}</span>
                            </div>
                          )}
                          {service.pricing.perNight && (
                            <div className="flex justify-between text-sm">
                              <span className="text-forest-400">Per Night:</span>
                              <span className="text-forest-500 font-medium">₹{service.pricing.perNight}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <p className="text-forest-400 text-sm mb-2">Services Offered:</p>
                        <div className="flex flex-wrap gap-1">
                          {service.services.map((s, index) => (
                            <Badge key={index} className="bg-forest-100 text-forest-600 text-xs">
                              {s}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex gap-2 mt-4">
                        <Button 
                          size="sm" 
                          className="flex-1 bg-forest-400 hover:bg-forest-500"
                          onClick={() => setIsEditingService(service.id)}
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="border-forest-300 text-forest-500 hover:bg-forest-100"
                          onClick={() => toggleServiceStatus(service.id)}
                        >
                          {service.isActive ? 'Deactivate' : 'Activate'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Requests Tab */}
          <TabsContent value="requests" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-forest-500">Service Requests</h2>
              <div className="flex gap-2">
                <Button variant="outline" className="border-forest-300 text-forest-500 hover:bg-forest-100">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {requests.map((request) => (
                <Card key={request.id} className="bg-forest-50 border-forest-200">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-forest-500">{request.customerName}</h3>
                          <Badge className={getStatusColor(request.status)}>
                            {getStatusIcon(request.status)}
                            <span className="ml-1">{request.status}</span>
                          </Badge>
                        </div>
                        <p className="text-forest-400 mb-2">{request.service}</p>
                        <div className="grid grid-cols-2 gap-4 text-sm text-forest-400">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{request.date} at {request.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{request.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            <span>{request.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4" />
                            <span>₹{request.amount}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {request.status === 'pending' && (
                          <>
                            <Button 
                              size="sm" 
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => updateRequestStatus(request.id, 'confirmed')}
                            >
                              Accept
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="border-red-300 text-red-600 hover:bg-red-100"
                              onClick={() => updateRequestStatus(request.id, 'cancelled')}
                            >
                              Decline
                            </Button>
                          </>
                        )}
                        {request.status === 'confirmed' && (
                          <Button 
                            size="sm" 
                            className="bg-forest-400 hover:bg-forest-500"
                            onClick={() => updateRequestStatus(request.id, 'completed')}
                          >
                            Mark Complete
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

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-forest-500">Customer Reviews</h2>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="text-forest-500 font-semibold">{analytics.averageRating.toFixed(1)}</span>
                  <span className="text-forest-400">({reviews.length} reviews)</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {reviews.map((review) => (
                <Card key={review.id} className="bg-forest-50 border-forest-200">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-forest-500">{review.customerName}</h3>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${
                                  i < review.rating 
                                    ? 'text-yellow-500 fill-current' 
                                    : 'text-gray-300'
                                }`} 
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-forest-400 mb-2">{review.comment}</p>
                        <div className="flex items-center gap-4 text-sm text-forest-400">
                          <span>Service: {review.service}</span>
                          <span>Date: {review.date}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="border-forest-300 text-forest-500 hover:bg-forest-100">
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Improvements Tab */}
          <TabsContent value="improvements" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-forest-500">Improvement Areas</h2>
              <Button className="bg-forest-400 hover:bg-forest-500">
                <Plus className="w-4 h-4 mr-2" />
                Add Goal
              </Button>
            </div>

            <div className="space-y-6">
              {improvements.map((improvement) => (
                <Card key={improvement.id} className="bg-forest-50 border-forest-200">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-forest-100 rounded-lg">
                          {getCategoryIcon(improvement.category)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-forest-500">{improvement.title}</h3>
                            <Badge className={getPriorityColor(improvement.priority)}>
                              {improvement.priority.toUpperCase()}
                            </Badge>
                            <Badge className="bg-forest-100 text-forest-600">
                              {improvement.category.toUpperCase()}
                            </Badge>
                          </div>
                          <p className="text-forest-400 mb-3">{improvement.description}</p>
                          
                          <div className="mb-4">
                            <div className="flex justify-between text-sm text-forest-400 mb-1">
                              <span>Progress</span>
                              <span>{improvement.progress}%</span>
                            </div>
                            <div className="w-full bg-forest-200 rounded-full h-2">
                              <div 
                                className="bg-forest-400 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${improvement.progress}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <h4 className="text-forest-500 font-medium text-sm">Suggestions:</h4>
                            <ul className="space-y-1">
                              {improvement.suggestions.map((suggestion, index) => (
                                <li key={index} className="flex items-start gap-2 text-sm text-forest-400">
                                  <span className="text-forest-500 mt-1">•</span>
                                  <span>{suggestion}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-forest-400 hover:bg-forest-500">
                          <Zap className="w-4 h-4 mr-1" />
                          Start
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

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <Card className="bg-forest-50 border-forest-200">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-2xl font-bold text-forest-500">
                        {improvements.filter(i => i.progress === 100).length}
                      </p>
                      <p className="text-forest-400 text-sm">Completed Goals</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-forest-50 border-forest-200">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <Clock className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-2xl font-bold text-forest-500">
                        {improvements.filter(i => i.progress > 0 && i.progress < 100).length}
                      </p>
                      <p className="text-forest-400 text-sm">In Progress</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-forest-50 border-forest-200">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <AlertCircle className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-2xl font-bold text-forest-500">
                        {improvements.filter(i => i.priority === 'high').length}
                      </p>
                      <p className="text-forest-400 text-sm">High Priority</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
