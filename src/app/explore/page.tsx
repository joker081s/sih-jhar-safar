"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { MapPin, ArrowLeft, Search, Filter, Heart, Star, Clock, Users, Eye, Phone, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { JharkhandTemples } from "@/app/data/JharkhandTemple";
import { JharkhandHeritageSites } from "@/app/data/JharkhandHeritageSites";
import { JharkhandWildlifeAdventure } from "@/app/data/JharkhandWildAndAdventure";
import { JharkhandCities } from "@/app/data/JharkhandCities";
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
}

export default function ExplorePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>([]);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  const wishlist = useAppStore((s) => s.wishlist);
  const toggleWishlistGlobal = useAppStore((s) => s.toggleWishlist);
  const user = useAppStore((s) => s.user);
  const router = useRouter();

  // Convert data to destinations format
  useEffect(() => {
    const allDestinations: Destination[] = [
      // Cities
      ...JharkhandCities.features.map((city: any, index) => ({
        id: `city-${index}`,
        name: city.properties?.name,
        description: city.properties?.description,
        type: 'city' as const,
        district: city.properties?.name,
        src: "/attractions/image1.jpeg",
        rating: 4.2 + Math.random() * 0.8,
        visitors: Math.floor(Math.random() * 10000) + 1000,
        isWishlisted: false,
        isVisited: false,
        coordinates: city.geometry.coordinates
      })),
      
      // Temples
      ...JharkhandTemples.features.slice(0, 8).map((temple: any, index) => ({
        id: `temple-${index}`,
        name: temple.properties?.name,
        description: temple.properties?.description,
        type: 'temple' as const,
        category: temple.properties?.district,
        district: temple.properties?.district,
        src: temple.properties?.src || "/attractions/image1.jpeg",
        rating: 4.5 + Math.random() * 0.5,
        visitors: Math.floor(Math.random() * 50000) + 5000,
        isWishlisted: false,
        isVisited: false,
        coordinates: temple.geometry.coordinates
      })),
      
      // Heritage Sites
      ...JharkhandHeritageSites.features.slice(0, 6).map((site: any, index) => ({
        id: `heritage-${index}`,
        name: site.properties?.name,
        description: site.properties?.description,
        type: 'heritage' as const,
        category: site.properties?.type,
        district: site.properties?.name,
        src: site.properties?.src || "/attractions/image1.jpeg",
        rating: 4.3 + Math.random() * 0.7,
        visitors: Math.floor(Math.random() * 30000) + 2000,
        isWishlisted: false,
        isVisited: false,
        coordinates: site.geometry.coordinates
      })),
      
      // Wildlife & Adventure
      ...JharkhandWildlifeAdventure.features.slice(0, 8).map((place: any, index) => ({
        id: `wildlife-${index}`,
        name: place.properties?.name,
        description: place.properties?.description,
        type: 'wildlife' as const,
        category: place.properties?.category,
        district: place.properties?.name,
        src: place.properties?.src || "/attractions/image1.jpeg",
        rating: 4.4 + Math.random() * 0.6,
        visitors: Math.floor(Math.random() * 25000) + 3000,
        isWishlisted: false,
        isVisited: false,
        coordinates: place.geometry.coordinates
      }))
    ];
    
    setDestinations(allDestinations);
    setFilteredDestinations(allDestinations);
  }, []);

  // Filter destinations based on search and filter
  useEffect(() => {
    let filtered = destinations;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(dest => 
        dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dest.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dest.district?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Type filter
    if (selectedFilter !== 'all') {
      filtered = filtered.filter(dest => dest.type === selectedFilter);
    }

    setFilteredDestinations(filtered);
  }, [searchTerm, selectedFilter, destinations]);

  const toggleWishlist = (id: string, name: string, image?: string) => {
    if (!user) {
      router.push('/login');
      return;
    }
    setDestinations(prev => prev.map(dest => 
      dest.id === id ? { ...dest, isWishlisted: !dest.isWishlisted } : dest
    ));
    toggleWishlistGlobal({ id, kind: 'attraction', title: name, image });
  };

  const toggleVisited = (id: string) => {
    setDestinations(prev => prev.map(dest => 
      dest.id === id ? { ...dest, isVisited: !dest.isVisited } : dest
    ));
  };

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

  // get user geolocation
  useEffect(() => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => setUserLocation(null),
      { enableHighAccuracy: true, maximumAge: 60000, timeout: 10000 }
    );
  }, []);

  const distanceKm = (from: { lat: number; lng: number } | null, to: [number, number]) => {
    if (!from) return null;
    const toLng = to[0];
    const toLat = to[1];
    const R = 6371;
    const dLat = ((toLat - from.lat) * Math.PI) / 180;
    const dLng = ((toLng - from.lng) * Math.PI) / 180;
    const a = Math.sin(dLat / 2) ** 2 + Math.cos((from.lat * Math.PI) / 180) * Math.cos((toLat * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const formatEta = (km: number | null) => {
    if (km == null) return null;
    const avgKmh = 40;
    const mins = Math.round((km / avgKmh) * 60);
    if (mins < 60) return `${mins} min`;
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${h}h ${m}m`;
  };

  return (
    <div className="min-h-screen bg-forest-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-forest-500 mb-6">
            Explore Jharkhand
          </h1>
          <p className="text-xl text-forest-400 max-w-3xl mx-auto mb-8">
            Discover the hidden gems and popular destinations across Jharkhand. 
            From ancient temples to stunning waterfalls, find your perfect adventure.
          </p>
          
          {/* Search and Filter Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-forest-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search destinations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-forest-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-300 focus:border-transparent bg-forest-50 text-forest-500 placeholder-forest-300"
                />
              </div>
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-3 border border-forest-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-300 bg-forest-50 text-forest-500"
              >
                <option value="all">All Types</option>
                <option value="city">Cities</option>
                <option value="temple">Temples</option>
                <option value="heritage">Heritage Sites</option>
                <option value="wildlife">Wildlife & Adventure</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-8">
          <p className="text-forest-400">
            Showing {filteredDestinations.length} destinations
            {searchTerm && ` for "${searchTerm}"`}
            {selectedFilter !== 'all' && ` in ${selectedFilter}`}
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDestinations.map((destination) => (
            <Card key={destination.id} className="bg-forest-50 border-forest-200 hover:shadow-lg transition-shadow">
              <div className="relative">
                <Image
                  src={destination.src}
                  alt={destination.name}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute top-2 left-2">
                  <Badge className={getTypeColor(destination.type)}>
                    {getTypeIcon(destination.type)} {destination.type}
                  </Badge>
                </div>
                <div className="absolute top-2 right-2 flex gap-1">
                  <button
                    onClick={() => toggleWishlist(destination.id, destination.name, destination.src)}
                    className={`p-2 rounded-full transition-colors ${
                      destination.isWishlisted 
                        ? 'bg-red-500 text-white' 
                        : 'bg-white/80 text-gray-600 hover:bg-red-100'
                    }`}
                  >
                    <Heart className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => toggleVisited(destination.id)}
                    className={`p-2 rounded-full transition-colors ${
                      destination.isVisited 
                        ? 'bg-green-500 text-white' 
                        : 'bg-white/80 text-gray-600 hover:bg-green-100'
                    }`}
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <CardHeader className="pb-2">
                <CardTitle className="text-forest-500 text-lg">{destination.name}</CardTitle>
                <CardDescription className="text-forest-400">
                  {destination.district}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-0">
                <p className="text-forest-500 text-sm mb-4 line-clamp-2">
                  {destination.description}
                </p>
                
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-forest-500 text-sm font-medium">
                      {destination.rating.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-forest-400 text-sm">
                    <Users className="w-4 h-4" />
                    <span>{destination.visitors.toLocaleString()}</span>
                  </div>
                </div>
                {(() => {
                  const km = distanceKm(userLocation, destination.coordinates);
                  if (km == null) return null;
                  const eta = formatEta(km);
                  return (
                    <div className="flex items-center gap-2 text-forest-400 text-sm mb-4">
                      <Clock className="w-4 h-4" />
                      <span>{km.toFixed(1)} km • ETA {eta}</span>
                    </div>
                  );
                })()}
                
                <div className="flex gap-2">
                  <Button asChild size="sm" className="flex-1 bg-forest-400 hover:bg-forest-500">
                    <Link href={`/map?destination=${destination.id}`}>
                      <MapPin className="w-4 h-4 mr-1" />
                      View on Map
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" className="border-forest-300 text-forest-500 hover:bg-forest-100">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="border-forest-300 text-forest-500 hover:bg-forest-100">
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDestinations.length === 0 && (
          <div className="text-center py-20">
            <div className="max-w-2xl mx-auto">
              <div className="w-24 h-24 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <Search className="w-12 h-12 text-forest-400" />
              </div>
              <h2 className="text-3xl font-bold text-forest-500 mb-4">
                No destinations found
              </h2>
              <p className="text-lg text-forest-400 mb-8">
                Try adjusting your search terms or filters to find more destinations.
              </p>
              <Button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedFilter('all');
                }}
                className="bg-forest-400 hover:bg-forest-500"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-16 text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-forest-400 hover:bg-forest-500">
              <Link href="/map" className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                View Interactive Map
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-forest-300 text-forest-500 hover:bg-forest-100">
              {/* <Link href="/dashboard" className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                My Dashboard
              </Link> */}
            </Button>
            <Button asChild variant="outline" size="lg" className="border-forest-300 text-forest-500 hover:bg-forest-100">
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="w-5 h-5" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
