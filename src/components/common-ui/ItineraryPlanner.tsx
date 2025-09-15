"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Calendar, Clock, IndianRupee } from "lucide-react";
import { useAppStore } from "@/store";
import { JharkhandCities } from "@/app/data/JharkhandCities";
import { JharkhandTemples } from "@/app/data/JharkhandTemple";
import { JharkhandHeritageSites } from "@/app/data/JharkhandHeritageSites";
import { JharkhandWildlifeAdventure } from "@/app/data/JharkhandWildAndAdventure";

export default function ItineraryPlanner() {
  const wishlist = useAppStore((s) => s.wishlist);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlaces, setSelectedPlaces] = useState<string[]>([]);
  const [daysAvailable, setDaysAvailable] = useState(3);
  const [totalBudget, setTotalBudget] = useState(10000);
  const avgSpeedKmh = 40;
  const avgDistanceBetweenKm = 35;

  // Build searchable dataset from same sources used in the map
  const dataNames: string[] = [
    ...JharkhandCities.features.map((f: any) => f.properties?.name).filter(Boolean),
    ...JharkhandTemples.features.map((f: any) => f.properties?.name).filter(Boolean),
    ...JharkhandHeritageSites.features.map((f: any) => f.properties?.name).filter(Boolean),
    ...JharkhandWildlifeAdventure.features.map((f: any) => f.properties?.name).filter(Boolean),
  ];
  const uniqueNames = Array.from(new Set(dataNames));
  const suggestions = uniqueNames
    .filter((n) => n.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((n) => !selectedPlaces.includes(n))
    .slice(0, 8);

  const places = selectedPlaces;
  const numPlaces = places.length || 0;

  // Heuristics
  const visitCostPerPlace = 500; // estimate, Rs
  const travelCostPerKm = 12; // estimate, Rs

  const totalSegments = Math.max(0, numPlaces - 1);
  const totalDistance = totalSegments * avgDistanceBetweenKm; // km
  const travelHours = totalDistance / avgSpeedKmh;
  const travelCost = totalDistance * travelCostPerKm;
  const visitCost = numPlaces * visitCostPerPlace;
  const estimatedBudget = travelCost + visitCost;
  const dailyBudget = daysAvailable > 0 ? totalBudget / daysAvailable : 0;

  // Plan distribution across days based on budget and count
  const maxPlacesByBudgetPerDay = dailyBudget > 0 ? Math.max(1, Math.floor(dailyBudget / visitCostPerPlace)) : Math.max(1, Math.ceil(numPlaces / Math.max(1, daysAvailable)));
  const maxPlacesPerDay = Math.max(1, Math.min(maxPlacesByBudgetPerDay, Math.ceil(numPlaces / Math.max(1, daysAvailable)) + 1));
  const estimatedDaysNeeded = Math.max(1, Math.ceil(numPlaces / maxPlacesPerDay));

  const plan: string[][] = [];
  if (numPlaces > 0) {
    for (let d = 0; d < estimatedDaysNeeded; d += 1) {
      const start = d * maxPlacesPerDay;
      const end = Math.min(start + maxPlacesPerDay, numPlaces);
      plan.push(places.slice(start, end));
    }
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="bg-forest-50 border-forest-200">
          <CardHeader>
            <CardTitle className="text-forest-500">Quick Itinerary Planner</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
              <div className="md:col-span-3">
                <label className="text-sm text-forest-500">Places to Visit</label>
                <div className="mt-2">
                  <Input
                    placeholder="Search places (e.g. Baidyanath Dham)"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {searchTerm && suggestions.length > 0 && (
                    <div className="mt-2 bg-white border border-forest-200 rounded-md shadow-sm max-h-48 overflow-auto">
                      {suggestions.map((s) => (
                        <button
                          key={s}
                          type="button"
                          className="w-full text-left px-3 py-2 text-sm text-forest-500 hover:bg-forest-100"
                          onClick={() => {
                            setSelectedPlaces((prev) => [...prev, s]);
                            setSearchTerm("");
                          }}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {selectedPlaces.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedPlaces.map((p) => (
                      <span key={p} className="inline-flex items-center gap-2 px-2 py-1 bg-forest-100 text-forest-600 rounded-md text-sm border border-forest-200">
                        {p}
                        <button
                          type="button"
                          onClick={() => setSelectedPlaces((prev) => prev.filter((x) => x !== p))}
                          className="text-forest-500 hover:text-forest-700"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <label className="text-sm text-forest-500">Days Available
                <Input type="number" value={daysAvailable} onChange={(e) => setDaysAvailable(parseInt(e.target.value || "0", 10))} />
              </label>
              <label className="text-sm text-forest-500">Total Budget (₹)
                <Input type="number" value={totalBudget} onChange={(e) => setTotalBudget(parseInt(e.target.value || "0", 10))} />
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 bg-forest-100 rounded-lg flex items-center gap-3">
                <MapPin className="w-5 h-5 text-forest-500" />
                <div>
                  <p className="text-sm text-forest-400">Total Distance</p>
                  <p className="text-lg font-semibold text-forest-600">{totalDistance.toFixed(0)} km</p>
                </div>
              </div>
              <div className="p-4 bg-forest-100 rounded-lg flex items-center gap-3">
                <Clock className="w-5 h-5 text-forest-500" />
                <div>
                  <p className="text-sm text-forest-400">Travel Time</p>
                  <p className="text-lg font-semibold text-forest-600">{Math.ceil(travelHours)} hrs</p>
                </div>
              </div>
              <div className="p-4 bg-forest-100 rounded-lg flex items-center gap-3">
                <Calendar className="w-5 h-5 text-forest-500" />
                <div>
                  <p className="text-sm text-forest-400">Days Needed</p>
                  <p className="text-lg font-semibold text-forest-600">{estimatedDaysNeeded} days</p>
                </div>
              </div>
              <div className="p-4 bg-forest-100 rounded-lg flex items-center gap-3">
                <IndianRupee className="w-5 h-5 text-forest-500" />
                <div>
                  <p className="text-sm text-forest-400">Est. Trip Cost</p>
                  <p className="text-lg font-semibold text-forest-600">₹{estimatedBudget.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <Button className="bg-forest-400 hover:bg-forest-500" onClick={() => {
                if (wishlist.length > 0) {
                  const titles = wishlist.map((w) => w.title).filter(Boolean);
                  setSelectedPlaces(Array.from(new Set([...
                    selectedPlaces,
                    ...titles
                  ])));
                }
              }}>Use My Wishlist</Button>
              <Button variant="outline" className="border-forest-300 text-forest-500 hover:bg-forest-100" onClick={() => setSelectedPlaces([])}>Clear Places</Button>
            </div>

            {plan.length > 0 && (
              <div className="mt-8">
                <h3 className="text-forest-500 font-semibold mb-3">Suggested Day-wise Plan</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {plan.map((dayPlaces, idx) => (
                    <div key={idx} className="p-4 bg-forest-100 rounded-lg border border-forest-200">
                      <p className="font-semibold text-forest-600 mb-2">Day {idx + 1}</p>
                      {dayPlaces.length === 0 ? (
                        <p className="text-forest-400 text-sm">No places planned.</p>
                      ) : (
                        <ul className="list-disc list-inside text-forest-500 text-sm space-y-1">
                          {dayPlaces.map((p, i) => (
                            <li key={i}>{p}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}


