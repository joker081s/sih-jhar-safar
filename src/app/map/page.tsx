"use client";

import dynamic from "next/dynamic";

const MyGoogleMaps = dynamic(() => import("@/components/common-ui/MyGoogleMaps"), {
  ssr: false,
});

export default function MapPage() {
  return (
    <div className="min-h-screen bg-forest-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-3xl md:text-5xl font-bold text-forest-500 mb-4">Interactive Map</h1>
        <p className="text-forest-400 mb-6">Explore cities, temples, heritage sites, and wildlife destinations across Jharkhand.</p>
        <div className="w-full h-[70vh] rounded-xl overflow-hidden border border-forest-200 bg-white">
          <MyGoogleMaps />
        </div>
      </div>
    </div>
  );
}
