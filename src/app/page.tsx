import CarouselHome from "@/components/common-ui/CarouselHome";
import Slogan from "@/components/common-ui/Slogan";
import ParagraphDiv from "@/components/common-ui/ParagraphDiv";
import Attractions from "@/components/common-ui/Attractions";
import Destinations from "@/components/common-ui/Destinations";
import ItineraryPlanner from "@/components/common-ui/ItineraryPlanner";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MapPin, Compass, Brain, ArrowRight, Star, Users, Mountain, Waves } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Carousel */}
      <CarouselHome />
      
      {/* Hero Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center text-white px-4 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-2xl">
            Jharkhand
          </h1>
          <p className="text-xl md:text-2xl mb-8 drop-shadow-lg">
            The Soul of Nature
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg">
              <Link href="/map" className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Explore Map
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg">
              <Link href="/explore" className="flex items-center gap-2">
                <Compass className="w-5 h-5" />
                Discover Places
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mountain className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">40+</h3>
              <p className="text-gray-600">Destinations</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Waves className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">5</h3>
              <p className="text-gray-600">Waterfalls</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">6</h3>
              <p className="text-gray-600">Temples</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">3</h3>
              <p className="text-gray-600">National Parks</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <Slogan first="Jharkhand – The Soul of Nature" />

      <ParagraphDiv
        src={`/paragraphDiv/image1.jpeg`}
        title="Nature & Serenity Focus"
        content="Jharkhand is blessed with abundant natural beauty, making it a paradise for nature lovers. The state is home to dense forests and diverse wildlife, with attractions like Betla National Park in Palamu, known for its elephants, tigers, and leopards; the Hazaribagh Wildlife Sanctuary, rich in flora and fauna; and the Dalma Wildlife Sanctuary near Jamshedpur, famous for its elephants and birdwatching opportunities. Jharkhand also boasts some of the most stunning waterfalls in India, including Hundru Falls, Dassam Falls, Jonha Falls, Panchghagh Falls, and the majestic Lodh Falls, the highest in the state. Adding to its charm are its scenic hills and serene landscapes—Netarhat, often called the Queen of Chotanagpur Hills, is renowned for breathtaking sunrise and sunset views; Parasnath Hill, the highest peak in Jharkhand, is also a revered Jain pilgrimage site; and the Patratu Valley enchants visitors with its lush greenery and winding roads, offering a picturesque escape into nature."
      />
      
      <Slogan first="Where Nature Whispers," second="Jharkhand listens" />

      <ParagraphDiv
        reverse
        src={`/paragraphDiv/image2.jpeg`}
        title="Pilgrimage & Religious Tourism"
        content="Jharkhand is home to some of India's most sacred pilgrimage sites, attracting millions of devotees annually. The crown jewel is Baba Baidyanath Dham in Deoghar, one of the 12 Jyotirlingas of Lord Shiva, where the annual Shravan Mela draws devotees from across the country. The ancient Naulakha Mandir, built at a cost of nine lakh rupees, showcases exquisite architecture and spiritual significance. Other notable religious sites include the Jagannath Temple in Ranchi, similar to the famous Puri temple; the Rajrappa Temple dedicated to Goddess Chinnamasta; and Parasnath Hill, the highest peak in Jharkhand and a sacred Jain pilgrimage site. These spiritual destinations offer not just religious significance but also architectural marvels and peaceful retreats for spiritual seekers."
      />
      
      <Attractions />
      <Destinations />

      {/* Itinerary Planner */}
      <ItineraryPlanner />

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Explore Jharkhand?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Plan your perfect trip with our AI-powered travel assistant and discover the hidden gems of Jharkhand.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 text-lg">
              <Link href="/plan" className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Plan with Jha-AI
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 text-lg">
              <Link href="/map" className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                View Interactive Map
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
