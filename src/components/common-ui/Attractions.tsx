import React from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { MapPin, Star, Clock, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const attractions = [
  {
    name: "Hundru Falls",
    location: "Ranchi",
    rating: 4.8,
    visitors: "10K+",
    duration: "2-3 hours",
    image: "/attractions/image1.jpeg",
    description: "One of the highest waterfalls in Jharkhand, offering breathtaking views and perfect for photography."
  },
  {
    name: "Betla National Park",
    location: "Palamu",
    rating: 4.6,
    visitors: "5K+",
    duration: "Full day",
    image: "/attractions/image2.jpeg",
    description: "Famous for elephants, tigers, and leopards. A wildlife enthusiast's paradise."
  },
  {
    name: "Baba Baidyanath Dham",
    location: "Deoghar",
    rating: 4.9,
    visitors: "50K+",
    duration: "1-2 hours",
    image: "/attractions/image3.jpeg",
    description: "One of the 12 Jyotirlingas of Lord Shiva, a major pilgrimage site."
  },
  {
    name: "Netarhat",
    location: "Latehar",
    rating: 4.7,
    visitors: "8K+",
    duration: "2-3 days",
    image: "/attractions/image4.jpeg",
    description: "Queen of Chotanagpur Hills, famous for sunrise and sunset views."
  },
  {
    name: "Dimna Lake",
    location: "Jamshedpur",
    rating: 4.5,
    visitors: "15K+",
    duration: "3-4 hours",
    image: "/attractions/image5.jpeg",
    description: "Picturesque artificial lake perfect for boating and picnics."
  },
  {
    name: "Dalma Wildlife Sanctuary",
    location: "Jamshedpur",
    rating: 4.4,
    visitors: "7K+",
    duration: "Half day",
    image: "/attractions/image6.jpeg",
    description: "Famous for elephants and birdwatching opportunities."
  }
];

export default function Attractions() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Top Attractions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the most popular destinations in Jharkhand that attract visitors from around the world.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {attractions.map((attraction, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={attraction.image}
                  alt={attraction.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-semibold">{attraction.rating}</span>
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{attraction.name}</h3>
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{attraction.location}</span>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {attraction.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{attraction.visitors} visitors</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{attraction.duration}</span>
                  </div>
                </div>
                
                <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                  <Link href="/map" className="flex items-center justify-center gap-2">
                    <MapPin className="w-4 h-4" />
                    View on Map
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg" variant="outline" className="px-8 py-3">
            <Link href="/explore" className="flex items-center gap-2">
              View All Attractions
              <MapPin className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
