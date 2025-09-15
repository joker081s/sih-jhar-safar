"use client"

import { GoogleMap, OverlayView, Polygon, useJsApiLoader } from "@react-google-maps/api"
import { JharkhandState } from "@/app/data/JharkhandState"
import { JharkhandCities } from "@/app/data/JharkhandCities"
import { useState, useEffect, useCallback } from "react"
import { MapPin, X, Building2, MapPinIcon, Search, Filter, Landmark, TreePine } from "lucide-react"
import Image from "next/image"
import { JharkhandTemples } from "@/app/data/JharkhandTemple"
import { JharkhandHeritageSites } from "@/app/data/JharkhandHeritageSites"
import { JharkhandWildlifeAdventure } from "@/app/data/JharkhandWildAndAdventure"

const API_KEY = "AIzaSyBurATgzJuOK3LxqK1pJPg5cqC2BtS3Wws"

const jharkhandBounds = {
    north: 25.3,
    south: 21.9,
    west: 83.3,
    east: 87.98,
  }
export default function MyGoogleMaps() {

    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: API_KEY,
    })

    const [selectedCity, setSelectedCity] = useState<null | {
        lat: number;
        lng: number;
        name: string;
        description: string;
        type: 'city' | 'temple' | 'heritage' | 'wildlife';
        district?: string;
        src?: string;
        category?: string;
      }>(null);

    const [filters, setFilters] = useState({
        cities: true,
        temples: true,
        heritage: true,
        wildlife: true,
    });

    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [modalPosition, setModalPosition] = useState({ x: 16, y: 16 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

    // Helper function to check if an item matches search term
    const matchesSearch = (name: string, description: string) => {
        if (!searchTerm) return true;
        const term = searchTerm.toLowerCase();
        return name.toLowerCase().includes(term) || description.toLowerCase().includes(term);
    };

    // Helper function to get marker color and icon based on type
    const getMarkerStyle = (type: string) => {
        switch (type) {
            case 'city':
                return { color: 'bg-forest-400', hoverColor: 'hover:bg-forest-500', icon: Building2, pointerColor: 'border-t-forest-400' };
            case 'temple':
                return { color: 'bg-forest-300', hoverColor: 'hover:bg-forest-400', icon: MapPinIcon, pointerColor: 'border-t-forest-300' };
            case 'heritage':
                return { color: 'bg-forest-200', hoverColor: 'hover:bg-forest-300', icon: Landmark, pointerColor: 'border-t-forest-200' };
            case 'wildlife':
                return { color: 'bg-forest-500', hoverColor: 'hover:bg-forest-400', icon: TreePine, pointerColor: 'border-t-forest-500' };
            default:
                return { color: 'bg-forest-300', hoverColor: 'hover:bg-forest-400', icon: MapPin, pointerColor: 'border-t-forest-300' };
        }
    };

    // Drag handling functions
    const handleMouseDown = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget || (e.target as HTMLElement).closest('.drag-handle')) {
            setIsDragging(true);
            const rect = e.currentTarget.getBoundingClientRect();
            setDragOffset({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            });
            e.preventDefault();
        }
    };

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!isDragging) return;
        
        const mapContainer = document.querySelector('.map-container');
        if (!mapContainer) return;
        
        const mapRect = mapContainer.getBoundingClientRect();
        const modalWidth = 300; // min-w-[300px]
        const modalHeight = 200; // approximate height
        
        let newX = e.clientX - mapRect.left - dragOffset.x;
        let newY = e.clientY - mapRect.top - dragOffset.y;
        
        // Constrain to map boundaries
        newX = Math.max(0, Math.min(newX, mapRect.width - modalWidth));
        newY = Math.max(0, Math.min(newY, mapRect.height - modalHeight));
        
        setModalPosition({ x: newX, y: newY });
    }, [isDragging, dragOffset]);

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    // Add event listeners for drag
    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [isDragging, dragOffset, handleMouseMove]);

    const onMapLoad = (map: google.maps.Map) => {
        const bounds = new google.maps.LatLngBounds()
        bounds.extend({ lat: jharkhandBounds.north, lng: jharkhandBounds.west })
        bounds.extend({ lat: jharkhandBounds.south, lng: jharkhandBounds.east })
        map.fitBounds(bounds)
        map.setOptions({
            restriction: {
              latLngBounds: bounds,
              strictBounds: true,
            },
          });
        
      }

    if (!isLoaded) return <div>Loading...</div>

    const polygonPaths = JharkhandState.features[0].geometry.coordinates[0].map(
        (coord: [number, number]) => ({ lat: coord[1], lng: coord[0] }) 
      );

  return (
    <div className="w-full h-full relative map-container">
      {/* Filter and Search UI */}
      <div 
        className={`absolute z-10 bg-forest-50 rounded-lg shadow-lg p-4 min-w-[300px] transition-all duration-200 border border-forest-200 ${
          isDragging ? 'shadow-2xl scale-105' : 'shadow-lg'
        }`}
        style={{
          left: `${modalPosition.x}px`,
          top: `${modalPosition.y}px`,
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
        onMouseDown={handleMouseDown}
      >
        {/* Drag Handle */}
        <div className="drag-handle flex items-center justify-between mb-3 pb-2 border-b border-forest-200">
          <div className="flex items-center gap-2 text-sm font-medium text-forest-500">
            <div className="w-2 h-2 bg-forest-300 rounded-full"></div>
            <div className="w-2 h-2 bg-forest-300 rounded-full"></div>
            <div className="w-2 h-2 bg-forest-300 rounded-full"></div>
            <span className="ml-2">Map Filters</span>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="p-1 bg-forest-100 hover:bg-forest-200 rounded-md transition-colors text-forest-500"
          >
            <Filter className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <Search className="w-4 h-4 text-forest-400" />
          <input
            type="text"
            placeholder="Search places..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-3 py-2 border border-forest-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-forest-300 bg-forest-50 text-forest-500 placeholder-forest-300"
            onMouseDown={(e) => e.stopPropagation()}
          />
        </div>

        {showFilters && (
          <div className="space-y-2" onMouseDown={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="cities"
                checked={filters.cities}
                onChange={(e) => setFilters({...filters, cities: e.target.checked})}
                className="rounded border-forest-300 text-forest-400 focus:ring-forest-300"
              />
              <label htmlFor="cities" className="flex items-center gap-2 text-sm text-forest-500">
                <Building2 className="w-4 h-4 text-forest-400" />
                Cities
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="temples"
                checked={filters.temples}
                onChange={(e) => setFilters({...filters, temples: e.target.checked})}
                className="rounded border-forest-300 text-forest-300 focus:ring-forest-300"
              />
              <label htmlFor="temples" className="flex items-center gap-2 text-sm text-forest-500">
                <MapPinIcon className="w-4 h-4 text-forest-300" />
                Temples
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="heritage"
                checked={filters.heritage}
                onChange={(e) => setFilters({...filters, heritage: e.target.checked})}
                className="rounded border-forest-300 text-forest-200 focus:ring-forest-200"
              />
              <label htmlFor="heritage" className="flex items-center gap-2 text-sm text-forest-500">
                <Landmark className="w-4 h-4 text-forest-200" />
                Heritage Sites
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="wildlife"
                checked={filters.wildlife}
                onChange={(e) => setFilters({...filters, wildlife: e.target.checked})}
                className="rounded border-forest-300 text-forest-500 focus:ring-forest-500"
              />
              <label htmlFor="wildlife" className="flex items-center gap-2 text-sm text-forest-500">
                <TreePine className="w-4 h-4 text-forest-500" />
                Wildlife & Adventure
              </label>
            </div>
          </div>
        )}
      </div>

      <GoogleMap
        mapContainerClassName="w-full h-full"
        center={{ lat: 23.344100, lng: 85.309600 }}
        zoom={6}
        onLoad={onMapLoad}
      >
        <Polygon
          paths={polygonPaths}
          options={{
            fillColor: "#00AAFF",
            fillOpacity: 0.2,
            strokeColor: "#0000FF",
            strokeOpacity: 0.8,
            strokeWeight: 2,
          }}
        />
        {/* <Marker position={{ lat: 23.344100, lng: 85.309600 }} /> */}
        {filters.cities && JharkhandCities.features.map((city, idx: number) => {
          const [lng, lat] = city.geometry.coordinates;
          if (!matchesSearch(city.properties?.name, city.properties?.description)) return null;
          
          const markerStyle = getMarkerStyle('city');
          const IconComponent = markerStyle.icon;
          
          return (
            <OverlayView
            key={idx}
            position={{ lat, lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div
              onClick={() =>
                setSelectedCity({
                  lat,
                  lng,
                  name: city.properties?.name,
                  description: city.properties?.description,
                  type: 'city',
                })
              }
              className="group cursor-pointer flex flex-col items-center transition-all duration-200 hover:scale-110"
            >
              <div className="relative">
                <div className={`w-8 h-8 ${markerStyle.color} rounded-full flex items-center justify-center shadow-lg border-2 border-white ${markerStyle.hoverColor} transition-colors`}>
                  <IconComponent className="w-4 h-4 text-white" />
                </div>
                <div className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent ${markerStyle.pointerColor}`}></div>
              </div>
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-forest-50 text-forest-500 text-xs rounded-md px-2 py-1 shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200 z-10 max-w-40 min-w-24 border border-forest-200">
                <div className="whitespace-nowrap overflow-hidden text-ellipsis">
                  {city.properties?.name}
                </div>
              </div>
            </div>
          </OverlayView>
        );
        })}

        {selectedCity && (
         <OverlayView
         position={{ lat: selectedCity.lat, lng: selectedCity.lng }}
         mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
       >
         <div className="relative -translate-y-14 -translate-x-1/2 min-w-[280px] max-w-[320px] bg-forest-50 rounded-xl shadow-xl border border-forest-200 overflow-hidden">
           <button
             onClick={() => setSelectedCity(null)}
             className="absolute top-2 right-2 text-forest-400 hover:text-forest-500 z-10 bg-forest-100 rounded-full p-1 shadow-sm transition-colors"
           >
             <X size={16} />
           </button>
           
           {selectedCity.type === 'temple' && selectedCity.src && (
             <div className="w-full h-32 relative">
               <Image
                 src={selectedCity.src}
                 alt={selectedCity.name}
                 fill
                 className="object-cover"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
             </div>
           )}
           
           <div className="p-4">
             <div className="flex items-start gap-2 mb-2">
               {selectedCity.type === 'city' ? (
                 <Building2 className="w-4 h-4 text-forest-400 mt-1 flex-shrink-0" />
               ) : selectedCity.type === 'temple' ? (
                 <MapPinIcon className="w-4 h-4 text-forest-300 mt-1 flex-shrink-0" />
               ) : selectedCity.type === 'heritage' ? (
                 <Landmark className="w-4 h-4 text-forest-200 mt-1 flex-shrink-0" />
               ) : (
                 <TreePine className="w-4 h-4 text-forest-500 mt-1 flex-shrink-0" />
               )}
               <h3 className="font-bold text-lg text-forest-500 break-words leading-tight">{selectedCity.name}</h3>
             </div>
             
             {selectedCity.type === 'temple' && selectedCity.district && (
               <p className="text-sm text-forest-400 mb-2 break-words">
                 <span className="font-medium">District:</span> {selectedCity.district}
               </p>
             )}

             {selectedCity.category && (
               <p className="text-sm text-forest-400 mb-2 break-words">
                 <span className="font-medium">Category:</span> {selectedCity.category}
               </p>
             )}
             
             <p className="text-sm text-forest-500 leading-relaxed break-words">{selectedCity.description}</p>
             
             {selectedCity.type === 'temple' && (
               <div className="mt-3 pt-2 border-t border-forest-200">
                 <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-forest-100 text-forest-500">
                   🏛️ Temple
                 </span>
               </div>
             )}
             
             {selectedCity.type === 'city' && (
               <div className="mt-3 pt-2 border-t border-forest-200">
                 <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-forest-200 text-forest-500">
                   🏙️ City
                 </span>
               </div>
             )}

             {selectedCity.type === 'heritage' && (
               <div className="mt-3 pt-2 border-t border-forest-200">
                 <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-forest-100 text-forest-500">
                   🏛️ Heritage Site
                 </span>
               </div>
             )}

             {selectedCity.type === 'wildlife' && (
               <div className="mt-3 pt-2 border-t border-forest-200">
                 <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-forest-200 text-forest-500">
                   🌿 Wildlife & Adventure
                 </span>
               </div>
             )}
           </div>
         </div>
       </OverlayView>
        )}
         {filters.temples && JharkhandTemples.features.map((f, i: number) => {
        const [lng, lat] = f.geometry.coordinates;
        if (!matchesSearch(f.properties?.name, f.properties?.description)) return null;
        
        const markerStyle = getMarkerStyle('temple');
        const IconComponent = markerStyle.icon;
        
        return (
          <OverlayView
            key={i}
            position={{ lat, lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div 
              onClick={() =>
                setSelectedCity({
                  lat,
                  lng,
                  name: f.properties?.name,
                  description: f.properties?.description,
                  type: 'temple',
                  district: f.properties?.district,
                  src: f.properties?.src,
                })
              }
              className="group cursor-pointer relative flex flex-col items-center transition-all duration-200 hover:scale-110"
            >
              <div className="relative">
                <div className={`w-7 h-7 ${markerStyle.color} rounded-full flex items-center justify-center shadow-lg border-2 border-white ${markerStyle.hoverColor} transition-colors`}>
                  <IconComponent className="w-4 h-4 text-white" />
                </div>
                <div className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent ${markerStyle.pointerColor}`}></div>
              </div>
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-forest-50 text-forest-500 text-xs rounded-md px-2 py-1 shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200 z-10 max-w-40 min-w-24 border border-forest-200">
                <div className="whitespace-nowrap overflow-hidden text-ellipsis">
                  {f.properties?.name}
                </div>
              </div>
            </div>
          </OverlayView>
        );
      })}

      {/* Heritage Sites Markers */}
      {filters.heritage && JharkhandHeritageSites.features.map((site, i: number) => {
        const [lng, lat] = site.geometry.coordinates;
        if (!matchesSearch(site.properties?.name, site.properties?.description)) return null;
        
        const markerStyle = getMarkerStyle('heritage');
        const IconComponent = markerStyle.icon;
        
        return (
          <OverlayView
            key={`heritage-${i}`}
            position={{ lat, lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div 
              onClick={() =>
                setSelectedCity({
                  lat,
                  lng,
                  name: site.properties?.name,
                  description: site.properties?.description,
                  type: 'heritage',
                  category: site.properties?.type,
                  src: site.properties?.src,
                })
              }
              className="group cursor-pointer relative flex flex-col items-center transition-all duration-200 hover:scale-110"
            >
              <div className="relative">
                <div className={`w-7 h-7 ${markerStyle.color} rounded-full flex items-center justify-center shadow-lg border-2 border-white ${markerStyle.hoverColor} transition-colors`}>
                  <IconComponent className="w-4 h-4 text-white" />
                </div>
                <div className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent ${markerStyle.pointerColor}`}></div>
              </div>
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-forest-50 text-forest-500 text-xs rounded-md px-2 py-1 shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200 z-10 max-w-40 min-w-24 border border-forest-200">
                <div className="whitespace-nowrap overflow-hidden text-ellipsis">
                  {site.properties?.name}
                </div>
              </div>
            </div>
          </OverlayView>
        );
      })}

      {/* Wildlife & Adventure Markers */}
      {filters.wildlife && JharkhandWildlifeAdventure.features.map((place, i: number) => {
        const [lng, lat] = place.geometry.coordinates;
        if (!matchesSearch(place.properties?.name, place.properties?.description)) return null;
        
        const markerStyle = getMarkerStyle('wildlife');
        const IconComponent = markerStyle.icon;
        
        return (
          <OverlayView
            key={`wildlife-${i}`}
            position={{ lat, lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div 
              onClick={() =>
                setSelectedCity({
                  lat,
                  lng,
                  name: place.properties?.name,
                  description: place.properties?.description,
                  type: 'wildlife',
                  category: place.properties?.category,
                  src: place.properties?.src,
                })
              }
              className="group cursor-pointer relative flex flex-col items-center transition-all duration-200 hover:scale-110"
            >
              <div className="relative">
                <div className={`w-7 h-7 ${markerStyle.color} rounded-full flex items-center justify-center shadow-lg border-2 border-white ${markerStyle.hoverColor} transition-colors`}>
                  <IconComponent className="w-4 h-4 text-white" />
                </div>
                <div className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent ${markerStyle.pointerColor}`}></div>
              </div>
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-forest-50 text-forest-500 text-xs rounded-md px-2 py-1 shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200 z-10 max-w-40 min-w-24 border border-forest-200">
                <div className="whitespace-nowrap overflow-hidden text-ellipsis">
                  {place.properties?.name}
                </div>
              </div>
            </div>
          </OverlayView>
        );
      })}

      </GoogleMap>
    </div>
  );
}