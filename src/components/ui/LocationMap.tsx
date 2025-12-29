import { useEffect, useRef, useState } from "react";
import { MapPin, Navigation, AlertTriangle, User, Locate } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MapLocation {
  lat: number;
  lng: number;
  label?: string;
  type?: "emergency" | "volunteer" | "user";
}

interface LocationMapProps {
  emergencies?: MapLocation[];
  volunteers?: MapLocation[];
  userLocation?: MapLocation | null;
  onLocationSelect?: (location: { lat: number; lng: number; address: string }) => void;
  interactive?: boolean;
  className?: string;
}

// Delhi NCR center
const DEFAULT_CENTER = { lat: 28.6139, lng: 77.2090 };

export function LocationMap({ 
  emergencies = [], 
  volunteers = [], 
  userLocation,
  onLocationSelect,
  interactive = false,
  className = ""
}: LocationMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  // Get user's current location
  const getCurrentLocation = () => {
    setIsLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            address: `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`
          };
          setSelectedLocation({ ...location, type: "user" });
          if (onLocationSelect) {
            onLocationSelect(location);
          }
          setIsLocating(false);
        },
        (error) => {
          console.error("Location error:", error);
          setIsLocating(false);
          // Default to Delhi center
          const defaultLoc = {
            lat: DEFAULT_CENTER.lat,
            lng: DEFAULT_CENTER.lng,
            address: "New Delhi, India"
          };
          setSelectedLocation({ ...defaultLoc, type: "user" });
          if (onLocationSelect) {
            onLocationSelect(defaultLoc);
          }
        },
        { enableHighAccuracy: true, timeout: 5000 }
      );
    }
  };

  // Calculate center based on all points
  const calculateCenter = () => {
    const allPoints = [...emergencies, ...volunteers];
    if (userLocation) allPoints.push(userLocation);
    
    if (allPoints.length === 0) return DEFAULT_CENTER;
    
    const avgLat = allPoints.reduce((sum, p) => sum + p.lat, 0) / allPoints.length;
    const avgLng = allPoints.reduce((sum, p) => sum + p.lng, 0) / allPoints.length;
    
    return { lat: avgLat, lng: avgLng };
  };

  const center = calculateCenter();

  return (
    <div className={`relative rounded-2xl overflow-hidden bg-muted ${className}`}>
      {/* Demo Map Visualization */}
      <div 
        ref={mapRef}
        className="w-full h-full min-h-[200px] relative"
        style={{
          background: `
            radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.05) 0%, transparent 50%),
            linear-gradient(135deg, hsl(var(--muted)) 0%, hsl(var(--background)) 100%)
          `
        }}
      >
        {/* Grid lines for map effect */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Map markers container */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full">
            {/* Emergency markers */}
            {emergencies.map((emergency, idx) => {
              const offsetX = ((emergency.lng - center.lng) * 50) + 50;
              const offsetY = ((center.lat - emergency.lat) * 50) + 50;
              return (
                <div
                  key={`e-${idx}`}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 animate-pulse"
                  style={{ 
                    left: `${Math.max(10, Math.min(90, offsetX))}%`, 
                    top: `${Math.max(10, Math.min(90, offsetY))}%` 
                  }}
                >
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5 text-destructive" />
                    </div>
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-destructive rounded-full animate-ping" />
                  </div>
                  {emergency.label && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-1 bg-card rounded-lg shadow-md text-xs font-medium whitespace-nowrap max-w-[120px] truncate">
                      {emergency.label}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Volunteer markers */}
            {volunteers.map((volunteer, idx) => {
              const offsetX = ((volunteer.lng - center.lng) * 50) + 50;
              const offsetY = ((center.lat - volunteer.lat) * 50) + 50;
              return (
                <div
                  key={`v-${idx}`}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{ 
                    left: `${Math.max(10, Math.min(90, offsetX))}%`, 
                    top: `${Math.max(10, Math.min(90, offsetY))}%` 
                  }}
                >
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border-2 border-primary">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                </div>
              );
            })}

            {/* User location marker */}
            {(userLocation || selectedLocation) && (
              <div
                className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center border-2 border-success animate-pulse">
                    <Navigation className="w-6 h-6 text-success" />
                  </div>
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-success rounded-full" />
                </div>
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-success text-success-foreground rounded-lg text-xs font-semibold whitespace-nowrap">
                  Your Location
                </div>
              </div>
            )}

            {/* Center pin for interactive mode */}
            {interactive && !selectedLocation && (
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <MapPin className="w-8 h-8 text-primary animate-bounce" />
              </div>
            )}
          </div>
        </div>

        {/* Location button for interactive mode */}
        {interactive && (
          <div className="absolute bottom-4 right-4">
            <Button
              type="button"
              variant="default"
              size="sm"
              onClick={getCurrentLocation}
              disabled={isLocating}
              className="shadow-lg"
            >
              {isLocating ? (
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <Locate className="w-4 h-4" />
              )}
              <span className="ml-2">{isLocating ? "Locating..." : "Use My Location"}</span>
            </Button>
          </div>
        )}

        {/* Map legend */}
        <div className="absolute top-3 left-3 bg-card/90 backdrop-blur-sm rounded-xl p-2 shadow-md">
          <div className="flex flex-col gap-1.5 text-xs">
            {emergencies.length > 0 && (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-destructive/20 flex items-center justify-center">
                  <AlertTriangle className="w-2.5 h-2.5 text-destructive" />
                </div>
                <span className="text-muted-foreground">Emergency ({emergencies.length})</span>
              </div>
            )}
            {volunteers.length > 0 && (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="w-2.5 h-2.5 text-primary" />
                </div>
                <span className="text-muted-foreground">Volunteer ({volunteers.length})</span>
              </div>
            )}
          </div>
        </div>

        {/* Demo mode indicator */}
        <div className="absolute bottom-3 left-3 px-2 py-1 bg-muted/80 backdrop-blur-sm rounded-lg">
          <span className="text-[10px] text-muted-foreground">Delhi NCR Region • Demo Mode</span>
        </div>
      </div>
    </div>
  );
}