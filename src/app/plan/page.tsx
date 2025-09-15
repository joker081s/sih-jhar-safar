import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Brain, ArrowLeft, MapPin, Calendar, Users } from "lucide-react";

export default function PlanPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Plan Your Trip with Jhar-AI
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Our AI-powered travel assistant will help you create the perfect itinerary 
            for your Jharkhand adventure. Just tell us your preferences!
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">AI-Powered Planning</h3>
            <p className="text-gray-600">
              Our intelligent system learns your preferences and suggests personalized itineraries.
            </p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Routing</h3>
            <p className="text-gray-600">
              Optimize your travel route to visit maximum attractions in minimum time.
            </p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Flexible Scheduling</h3>
            <p className="text-gray-600">
              Adjust your itinerary based on weather, events, and your changing preferences.
            </p>
          </div>
        </div>

        {/* Coming Soon Content */}
        <div className="text-center py-20">
          <div className="max-w-2xl mx-auto">
            <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-8">
              <Brain className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Jhar-AI Coming Soon
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              We're developing an advanced AI travel assistant that will revolutionize 
              how you plan your Jharkhand trip. Get ready for personalized recommendations, 
              smart routing, and real-time updates!
            </p>
            
            {/* Email Signup */}
            <div className="max-w-md mx-auto mb-8">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Enter your email for updates"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <Button className="bg-green-600 hover:bg-green-700 px-6 py-3">
                  Notify Me
                </Button>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
                <Link href="/map" className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Explore Map Instead
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/" className="flex items-center gap-2">
                  <ArrowLeft className="w-5 h-5" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
