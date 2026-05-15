"use client";

import { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Search, MapPin, Upload, Scan, Check } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { GlassCard } from "@/components/glass-card";
import { HistoryPanel } from "@/components/history-panel";
import { MapPlaceholder } from "@/components/map-component";
import { useToast } from "@/components/toast-provider";
import { useProjectStore, SiteData } from "@/lib/store";

// Dynamic import for the map to avoid SSR issues
const MapComponent = dynamic(
  () => import("@/components/map-component").then((mod) => mod.MapComponent),
  { ssr: false, loading: () => <MapPlaceholder /> }
);

export default function SiteSelectionPage() {
  const { showToast } = useToast();
  const {
    siteData,
    setSiteData,
    confirmSite,
    completionStatus,
  } = useProjectStore();

  const [localLat, setLocalLat] = useState(siteData.latitude);
  const [localLng, setLocalLng] = useState(siteData.longitude);
  const [localArea, setLocalArea] = useState(siteData.area);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Sync local state when store changes
  useEffect(() => {
    setLocalLat(siteData.latitude);
    setLocalLng(siteData.longitude);
    setLocalArea(siteData.area);
  }, [siteData]);

  const handleLocationChange = (lat: number, lng: number) => {
    setLocalLat(lat.toFixed(6));
    setLocalLng(lng.toFixed(6));
    setSiteData({ latitude: lat.toFixed(6), longitude: lng.toFixed(6) });
  };

  const handleSaveCoordinates = () => {
    setSiteData({
      latitude: localLat,
      longitude: localLng,
      area: localArea,
    });
    showToast("Coordinates saved", "success");
  };

  const handleConfirmSite = () => {
    confirmSite();
    showToast("Site confirmed and saved to history", "success");
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      showToast("Please enter a location to search", "info");
      return;
    }
    // Simulate search - in real app would use geocoding API
    showToast(`Searching for "${searchQuery}"...`, "info");
    setTimeout(() => {
      // Simulated result - Riyadh coordinates
      setSiteData({
        latitude: "24.7136",
        longitude: "46.6753",
        address: searchQuery,
      });
      setLocalLat("24.7136");
      setLocalLng("46.6753");
      showToast("Location found", "success");
      setIsSearchOpen(false);
      setSearchQuery("");
    }, 1000);
  };

  const handleDetectBoundary = () => {
    showToast("Detecting plot boundaries...", "info");
    setTimeout(() => {
      setSiteData({ area: "850" });
      setLocalArea("850");
      showToast("Boundary detected: 850 m²", "success");
    }, 1500);
  };

  const siteInfo = [
    { label: "Country", value: "Saudi Arabia" },
    { label: "City", value: "Riyadh" },
    { label: "District", value: siteData.address.includes("Al Nakheel") ? "Al Nakheel" : "Custom" },
    { label: "Plot Area", value: `${siteData.area} m²` },
    { label: "Zoning", value: "Residential R2" },
    { label: "Max Height", value: "12m (3 floors)" },
    { label: "Status", value: siteData.confirmed ? "Confirmed" : "Pending" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <PageHeader
          title="Site Selection"
          description="Define and confirm your project site location"
        />
        <HistoryPanel<SiteData>
          section="site-selection"
          renderItem={(data) => (
            <div className="space-y-1">
              <p>Lat: {data.latitude}, Lng: {data.longitude}</p>
              <p>Area: {data.area} m²</p>
              <p className="text-[#c9a84c]">{data.confirmed ? "Confirmed" : "Draft"}</p>
            </div>
          )}
        />
      </div>

      {/* Interactive Map */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="relative h-[320px] rounded-2xl mb-6 overflow-hidden"
        style={{
          background: "rgba(12,12,18,.9)",
          border: "1px solid rgba(255,255,255,.06)",
        }}
      >
        <Suspense fallback={<MapPlaceholder />}>
          <MapComponent
            latitude={parseFloat(localLat) || 24.7136}
            longitude={parseFloat(localLng) || 46.6753}
            onLocationChange={handleLocationChange}
            editable={!siteData.confirmed}
          />
        </Suspense>

        {/* Confirmed badge */}
        {siteData.confirmed && (
          <div className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-[rgba(201,168,76,.2)] border border-[rgba(201,168,76,.4)] z-10">
            <span className="text-xs font-medium text-[#c9a84c] flex items-center gap-1.5">
              <Check className="w-3 h-3" />
              Site Confirmed
            </span>
          </div>
        )}
      </motion.div>

      {/* Search Modal */}
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center"
          onClick={() => setIsSearchOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-[400px] p-6 rounded-2xl bg-[#0e0e14] border border-[rgba(201,168,76,.22)]"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-syne font-semibold text-[#f0ede8] mb-4">Search Location</h3>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Enter address or city..."
              className="w-full px-4 py-3 rounded-xl bg-white/[.04] border border-white/[.08] text-[#f0ede8] placeholder-[#55534f] focus:outline-none focus:border-[#c9a84c]/40 mb-4"
              autoFocus
            />
            <div className="flex gap-3">
              <button
                onClick={() => setIsSearchOpen(false)}
                className="flex-1 py-2.5 rounded-xl text-sm font-medium text-[#a09d98] bg-white/[.04] border border-white/[.08] hover:bg-white/[.06] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSearch}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold"
                style={{
                  background: "linear-gradient(135deg, #c9a84c 0%, #e8c96a 100%)",
                  color: "#08080c",
                }}
              >
                Search
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: "easeOut", delay: 0.1 }}
        className="flex flex-wrap gap-3 mb-6"
      >
        <button
          onClick={() => setIsSearchOpen(true)}
          disabled={siteData.confirmed}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium glass-card hover:bg-white/[.05] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Search className="w-4 h-4" />
          Search Location
        </button>
        <button
          onClick={() => showToast("Click anywhere on the map to drop a pin", "info")}
          disabled={siteData.confirmed}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium glass-card hover:bg-white/[.05] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <MapPin className="w-4 h-4" />
          Drop Pin
        </button>
        <button
          onClick={() => {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = ".json,.csv,.txt";
            input.onchange = () => showToast("Coordinates file uploaded", "success");
            input.click();
          }}
          disabled={siteData.confirmed}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium glass-card hover:bg-white/[.05] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Upload className="w-4 h-4" />
          Upload Coordinates
        </button>
        <button
          onClick={handleDetectBoundary}
          disabled={siteData.confirmed}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium glass-card hover:bg-white/[.05] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Scan className="w-4 h-4" />
          Detect Plot Boundary
        </button>
        <button
          onClick={handleConfirmSite}
          disabled={siteData.confirmed}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold ml-auto transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: siteData.confirmed
              ? "rgba(201,168,76,.3)"
              : "linear-gradient(135deg, #c9a84c 0%, #e8c96a 100%)",
            color: "#08080c",
          }}
        >
          <Check className="w-4 h-4" />
          {siteData.confirmed ? "Site Confirmed" : "Confirm Site"}
        </button>
      </motion.div>

      {/* Completion indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono text-[#55534f]">COMPLETION</span>
          <span className="text-xs font-mono text-[#c9a84c]">{completionStatus["site-selection"]}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-white/[.06] overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${completionStatus["site-selection"]}%` }}
            transition={{ duration: 0.5 }}
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, #c9a84c, #e8c96a)",
              boxShadow: completionStatus["site-selection"] > 0 ? "0 0 10px rgba(201,168,76,.5)" : "none",
            }}
          />
        </div>
      </motion.div>

      {/* Two Column: Site Summary + Coordinates Input */}
      <div className="grid grid-cols-2 gap-4">
        <GlassCard className="p-5" delay={0.2}>
          <h3 className="text-sm font-mono text-[#55534f] uppercase tracking-wider mb-4">
            Site Summary
          </h3>
          <div className="space-y-3">
            {siteInfo.map((info) => (
              <div
                key={info.label}
                className="flex items-center justify-between py-2 border-b border-white/[.04] last:border-0"
              >
                <span className="text-sm text-[#55534f]">{info.label}</span>
                <span
                  className={`text-sm font-medium ${
                    info.label === "Status" && siteData.confirmed
                      ? "text-[#c9a84c]"
                      : "text-[#f0ede8]"
                  }`}
                >
                  {info.value}
                </span>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-5" delay={0.25}>
          <h3 className="text-sm font-mono text-[#55534f] uppercase tracking-wider mb-4">
            Coordinates Input
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-[#55534f] mb-1.5 block">Latitude</label>
              <input
                type="text"
                value={localLat}
                onChange={(e) => setLocalLat(e.target.value)}
                disabled={siteData.confirmed}
                className="w-full px-3 py-2.5 rounded-lg bg-white/[.04] border border-white/[.08] text-sm text-[#f0ede8] focus:outline-none focus:border-[#c9a84c]/40 disabled:opacity-50"
              />
            </div>
            <div>
              <label className="text-xs text-[#55534f] mb-1.5 block">Longitude</label>
              <input
                type="text"
                value={localLng}
                onChange={(e) => setLocalLng(e.target.value)}
                disabled={siteData.confirmed}
                className="w-full px-3 py-2.5 rounded-lg bg-white/[.04] border border-white/[.08] text-sm text-[#f0ede8] focus:outline-none focus:border-[#c9a84c]/40 disabled:opacity-50"
              />
            </div>
            <div>
              <label className="text-xs text-[#55534f] mb-1.5 block">Plot Area (m²)</label>
              <input
                type="text"
                value={localArea}
                onChange={(e) => setLocalArea(e.target.value)}
                disabled={siteData.confirmed}
                className="w-full px-3 py-2.5 rounded-lg bg-white/[.04] border border-white/[.08] text-sm text-[#f0ede8] focus:outline-none focus:border-[#c9a84c]/40 disabled:opacity-50"
              />
            </div>
            <button
              onClick={handleSaveCoordinates}
              disabled={siteData.confirmed}
              className="w-full py-2.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: "rgba(201,168,76,.15)",
                border: "1px solid rgba(201,168,76,.25)",
                color: "#c9a84c",
              }}
            >
              {siteData.confirmed ? "Site Locked" : "Save Coordinates"}
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
