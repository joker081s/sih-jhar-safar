
export interface LocationProperties {
  name: string;
  type: 'city' | 'temple' | 'heritage' | 'national_park' | 'waterfall' | 'hill_station' | 'dam' | 'lake';
  description: string;
  district: string;
  importance: 'high' | 'medium' | 'low';
  established?: string;
  bestTimeToVisit?: string;
  attractions?: string[];
}

export const JharkhandLocation = {
  type: "FeatureCollection",
  features: [
    // Major Cities
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [85.3096, 23.3441],
      },
      properties: {
        name: "Ranchi",
        type: "city",
        description: "Capital city of Jharkhand, known as the 'City of Waterfalls'",
        district: "Ranchi",
        importance: "high",
        attractions: ["Jagannath Temple", "Rock Garden", "Birsa Zoological Park", "Hundru Falls"]
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [86.1836, 22.8046],
      },
      properties: {
        name: "Jamshedpur",
        type: "city",
        description: "Industrial city known as 'Steel City of India'",
        district: "East Singhbhum",
        importance: "high",
        attractions: ["Dimna Lake", "Dalma Wildlife Sanctuary", "Tata Steel Zoological Park"]
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [85.3616, 23.9966],
      },
      properties: {
        name: "Hazaribagh",
        type: "city",
        description: "Gateway to wildlife sanctuaries and national parks",
        district: "Hazaribagh",
        importance: "high",
        attractions: ["Hazaribagh National Park", "Canary Hill", "Rajrappa Temple"]
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [86.4, 23.8],
      },
      properties: {
        name: "Dhanbad",
        type: "city",
        description: "Coal capital of India",
        district: "Dhanbad",
        importance: "high",
        attractions: ["Topchanchi Lake", "Maithon Dam", "Panchet Dam"]
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [86.2, 23.7],
      },
      properties: {
        name: "Bokaro",
        type: "city",
        description: "Steel city and planned industrial township",
        district: "Bokaro",
        importance: "medium",
        attractions: ["City Park", "Jawaharlal Nehru Biological Park"]
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [87.3167, 24.8167],
      },
      properties: {
        name: "Deoghar",
        type: "city",
        description: "Sacred city known for Baba Baidyanath Temple",
        district: "Deoghar",
        importance: "high",
        attractions: ["Baba Baidyanath Dham", "Naulakha Mandir", "Satsang Ashram"]
      },
    },

    // Temples and Religious Sites
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [87.3167, 24.8167],
      },
      properties: {
        name: "Baba Baidyanath Dham",
        type: "temple",
        description: "One of the 12 Jyotirlingas of Lord Shiva, major pilgrimage site",
        district: "Deoghar",
        importance: "high",
        established: "Ancient",
        bestTimeToVisit: "Shravan month (July-August)"
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [87.3, 24.8],
      },
      properties: {
        name: "Naulakha Mandir",
        type: "temple",
        description: "Historic temple with intricate architecture, built at cost of 9 lakh rupees",
        district: "Deoghar",
        importance: "high",
        established: "Ancient"
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [85.32, 23.35],
      },
      properties: {
        name: "Jagannath Temple",
        type: "temple",
        description: "Ancient temple dedicated to Lord Jagannath, similar to Puri temple",
        district: "Ranchi",
        importance: "high",
        established: "1691"
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [85.28, 23.38],
      },
      properties: {
        name: "Bhuvaneshwari Temple",
        type: "temple",
        description: "Hilltop temple offering panoramic views of Ranchi city",
        district: "Ranchi",
        importance: "medium",
        established: "Modern"
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [85.38, 24.02],
      },
      properties: {
        name: "Rajrappa Temple",
        type: "temple",
        description: "Ancient temple dedicated to Goddess Chinnamasta",
        district: "Hazaribagh",
        importance: "high",
        established: "Ancient"
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [85.5, 24.0],
      },
      properties: {
        name: "Parasnath Hill",
        type: "temple",
        description: "Highest peak in Jharkhand, sacred Jain pilgrimage site",
        district: "Giridih",
        importance: "high",
        established: "Ancient",
        bestTimeToVisit: "October to March"
      },
    },

    // National Parks and Wildlife Sanctuaries
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [84.2, 24.0],
      },
      properties: {
        name: "Betla National Park",
        type: "national_park",
        description: "Famous for elephants, tigers, and leopards in Palamu district",
        district: "Palamu",
        importance: "high",
        established: "1974",
        bestTimeToVisit: "October to June"
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [85.35, 24.05],
      },
      properties: {
        name: "Hazaribagh National Park",
        type: "national_park",
        description: "Rich in flora and fauna, known for leopards and sambar deer",
        district: "Hazaribagh",
        importance: "high",
        established: "1954",
        bestTimeToVisit: "October to March"
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [86.1836, 22.8046],
      },
      properties: {
        name: "Dalma Wildlife Sanctuary",
        type: "national_park",
        description: "Famous for elephants and birdwatching near Jamshedpur",
        district: "East Singhbhum",
        importance: "high",
        established: "1975",
        bestTimeToVisit: "October to March"
      },
    },

    // Waterfalls
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [85.5, 23.5],
      },
      properties: {
        name: "Hundru Falls",
        type: "waterfall",
        description: "One of the highest waterfalls in Jharkhand, 98 meters high",
        district: "Ranchi",
        importance: "high",
        bestTimeToVisit: "July to October"
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [85.6, 23.4],
      },
      properties: {
        name: "Dassam Falls",
        type: "waterfall",
        description: "Beautiful 10-stream waterfall near Ranchi",
        district: "Ranchi",
        importance: "high",
        bestTimeToVisit: "July to October"
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [85.7, 23.3],
      },
      properties: {
        name: "Jonha Falls",
        type: "waterfall",
        description: "Also known as Gautamdhara, 43 meters high",
        district: "Ranchi",
        importance: "medium",
        bestTimeToVisit: "July to October"
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [85.8, 23.2],
      },
      properties: {
        name: "Panchghagh Falls",
        type: "waterfall",
        description: "Five-stream waterfall, 15 meters high",
        district: "Khunti",
        importance: "medium",
        bestTimeToVisit: "July to October"
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [84.0, 24.2],
      },
      properties: {
        name: "Lodh Falls",
        type: "waterfall",
        description: "Highest waterfall in Jharkhand, 143 meters high",
        district: "Latehar",
        importance: "high",
        bestTimeToVisit: "July to October"
      },
    },

    // Hill Stations
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [84.5, 23.5],
      },
      properties: {
        name: "Netarhat",
        type: "hill_station",
        description: "Queen of Chotanagpur Hills, famous for sunrise and sunset views",
        district: "Latehar",
        importance: "high",
        bestTimeToVisit: "October to March"
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [85.0, 24.0],
      },
      properties: {
        name: "Patratu Valley",
        type: "hill_station",
        description: "Picturesque valley with lush greenery and winding roads",
        district: "Hazaribagh",
        importance: "medium",
        bestTimeToVisit: "October to March"
      },
    },

    // Dams and Lakes
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [86.2, 22.8],
      },
      properties: {
        name: "Dimna Lake",
        type: "lake",
        description: "Picturesque artificial lake near Jamshedpur, perfect for boating",
        district: "East Singhbhum",
        importance: "high",
        bestTimeToVisit: "October to March"
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [86.5, 24.0],
      },
      properties: {
        name: "Maithon Dam",
        type: "dam",
        description: "Multi-purpose dam on Barakar River, popular for water sports",
        district: "Dhanbad",
        importance: "high",
        established: "1957",
        bestTimeToVisit: "October to March"
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [86.6, 24.1],
      },
      properties: {
        name: "Panchet Dam",
        type: "dam",
        description: "Dam on Damodar River, offers scenic views and water activities",
        district: "Dhanbad",
        importance: "medium",
        established: "1959",
        bestTimeToVisit: "October to March"
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [86.7, 24.2],
      },
      properties: {
        name: "Topchanchi Lake",
        type: "lake",
        description: "Artificial lake surrounded by hills, popular picnic spot",
        district: "Dhanbad",
        importance: "medium",
        bestTimeToVisit: "October to March"
      },
    },

    // Heritage Sites
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [85.0, 23.0],
      },
      properties: {
        name: "Palamau Fort",
        type: "heritage",
        description: "Ancient fort built by Raja Medini Ray in 1613",
        district: "Palamu",
        importance: "high",
        established: "1613"
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [85.2, 23.1],
      },
      properties: {
        name: "Maluti Temples",
        type: "heritage",
        description: "Group of 72 terracotta temples, UNESCO World Heritage Site candidate",
        district: "Dumka",
        importance: "high",
        established: "17th century"
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [85.4, 23.2],
      },
      properties: {
        name: "Itkhori",
        type: "heritage",
        description: "Ancient archaeological site with Buddhist, Jain, and Hindu relics",
        district: "Chatra",
        importance: "high",
        established: "Ancient"
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [85.6, 23.3],
      },
      properties: {
        name: "Rock Garden",
        type: "heritage",
        description: "Man-made garden with rock sculptures and water features",
        district: "Ranchi",
        importance: "medium",
        established: "Modern"
      },
    }
  ],
};
