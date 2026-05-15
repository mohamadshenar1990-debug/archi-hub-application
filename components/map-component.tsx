"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";

interface MapComponentProps {
  latitude: number;
  longitude: number;
  onLocationChange?: (lat: number, lng: number) => void;
  editable?: boolean;
}

export function MapComponent({
  latitude,
  longitude,
  onLocationChange,
  editable = true,
}: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Dynamically import Leaflet
    const loadMap = async () => {
      const L = (await import("leaflet")).default;
      await import("leaflet/dist/leaflet.css");

      if (!mapRef.current || mapInstanceRef.current) return;

      // Custom gold marker icon
      const goldIcon = L.divIcon({
        className: "custom-marker",
        html: `
          <div style="
            width: 32px;
            height: 32px;
            background: linear-gradient(135deg, #c9a84c, #e8c96a);
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            border: 2px solid #08080c;
            box-shadow: 0 4px 12px rgba(201,168,76,.5);
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <div style="
              width: 8px;
              height: 8px;
              background: #08080c;
              border-radius: 50%;
              transform: rotate(45deg);
            "></div>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
      });

      // Initialize map
      const map = L.map(mapRef.current, {
        center: [latitude, longitude],
        zoom: 15,
        zoomControl: false,
      });

      // Dark styled tiles
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        {
          attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
          maxZoom: 19,
        }
      ).addTo(map);

      // Add zoom control to bottom right
      L.control.zoom({ position: "bottomright" }).addTo(map);

      // Add marker
      const marker = L.marker([latitude, longitude], {
        icon: goldIcon,
        draggable: editable,
      }).addTo(map);

      if (editable) {
        marker.on("dragend", (e) => {
          const latlng = e.target.getLatLng();
          onLocationChange?.(latlng.lat, latlng.lng);
        });

        map.on("click", (e) => {
          marker.setLatLng(e.latlng);
          onLocationChange?.(e.latlng.lat, e.latlng.lng);
        });
      }

      mapInstanceRef.current = map;
      markerRef.current = marker;
      setIsLoaded(true);
    };

    loadMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update marker position when props change
  useEffect(() => {
    if (markerRef.current && mapInstanceRef.current) {
      markerRef.current.setLatLng([latitude, longitude]);
      mapInstanceRef.current.setView([latitude, longitude], mapInstanceRef.current.getZoom());
    }
  }, [latitude, longitude]);

  return (
    <div className="relative w-full h-full min-h-[300px] rounded-xl overflow-hidden">
      <div ref={mapRef} className="absolute inset-0 z-0" />
      
      {/* Loading state */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0e0e14]">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-[#c9a84c] border-t-transparent rounded-full animate-spin" />
            <span className="font-mono text-xs text-[#a09d98]">Loading map...</span>
          </div>
        </div>
      )}

      {/* Coordinates overlay */}
      <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-lg bg-[rgba(8,8,12,.9)] border border-[rgba(201,168,76,.22)] z-10">
        <span className="font-mono text-xs text-[#c9a84c]">
          {latitude.toFixed(6)}, {longitude.toFixed(6)}
        </span>
      </div>

      {/* Gold grid overlay for atmosphere */}
      <div 
        className="absolute inset-0 pointer-events-none z-[1] opacity-20"
        style={{
          backgroundImage: `
            repeating-linear-gradient(90deg, rgba(201,168,76,.1) 0 1px, transparent 1px 40px),
            repeating-linear-gradient(0deg, rgba(201,168,76,.1) 0 1px, transparent 1px 40px)
          `,
        }}
      />
    </div>
  );
}

// Simple map placeholder for SSR
export function MapPlaceholder() {
  return (
    <div className="relative w-full h-full min-h-[300px] rounded-xl overflow-hidden bg-[#0e0e14] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <MapPin className="w-8 h-8 text-[#c9a84c]" />
        <span className="font-mono text-xs text-[#a09d98]">Loading map...</span>
      </div>
    </div>
  );
}
