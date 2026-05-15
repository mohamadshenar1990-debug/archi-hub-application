"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, RefreshCw } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { HistoryPanel } from "@/components/history-panel";
import { useToast } from "@/components/toast-provider";
import { useProjectStore, SiteAnalysis } from "@/lib/store";

export default function SiteAnalysisPage() {
  const { showToast } = useToast();
  const { siteAnalysis, siteData, generateSiteAnalysis, completionStatus } = useProjectStore();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    if (!siteData.confirmed) {
      showToast("Please confirm site location first", "info");
      return;
    }
    setIsGenerating(true);
    showToast("Analyzing site conditions...", "info");
    setTimeout(() => {
      generateSiteAnalysis();
      setIsGenerating(false);
      showToast("Site analysis complete", "success");
    }, 2000);
  };

  const analysisCards = [
    { 
      emoji: "🛣️", 
      title: "Road Access", 
      description: `Primary access from Al Nakheel Street, 20m wide. Secondary service road available.`, 
      score: siteAnalysis.roadAccess 
    },
    { 
      emoji: "🌅", 
      title: "Sun Path", 
      description: "East-west orientation optimal for shading strategies. South facade requires protection.", 
      score: siteAnalysis.sunPath 
    },
    { 
      emoji: "💨", 
      title: "Wind Direction", 
      description: `${siteAnalysis.windDirection} winds prevailing. Natural ventilation potential with courtyards.`, 
      score: siteAnalysis.windDirection 
    },
    { 
      emoji: "🏔️", 
      title: "Topography", 
      description: `${siteAnalysis.topography} terrain with minimal grading required. Natural drainage to northwest.`, 
      score: `${siteAnalysis.topography} · Easy` 
    },
    { 
      emoji: "👁️", 
      title: "Views", 
      description: "Premium views to west towards green belt. Privacy concerns from east neighbors.", 
      score: siteAnalysis.views 
    },
    { 
      emoji: "🔊", 
      title: "Noise", 
      description: "Quiet residential area. Minor traffic noise from main street mitigable.", 
      score: siteAnalysis.noise 
    },
    { 
      emoji: "🏛️", 
      title: "Landmarks", 
      description: "Proximity to Al Nakheel Park and community mosque creates strong context.", 
      score: siteAnalysis.landmarks 
    },
    { 
      emoji: "🌡️", 
      title: "Climate", 
      description: `${siteAnalysis.climate} climate, 45°C summer peaks. Passive cooling strategies essential.`, 
      score: siteAnalysis.climate 
    },
    { 
      emoji: "🌿", 
      title: "Vegetation", 
      description: "Sandy soil suitable for date palms and native desert landscaping.", 
      score: siteAnalysis.vegetation 
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <PageHeader
          title="Site Analysis"
          description="Comprehensive analysis of site conditions and constraints"
        />
        <div className="flex items-center gap-3">
          <HistoryPanel<SiteAnalysis>
            section="site-analysis"
            renderItem={(data) => (
              <div className="grid grid-cols-2 gap-2 text-xs">
                <span>Road: {data.roadAccess}</span>
                <span>Sun: {data.sunPath}</span>
                <span>Wind: {data.windDirection}</span>
                <span>Climate: {data.climate}</span>
              </div>
            )}
          />
        </div>
      </div>

      {/* Generate Button */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="mb-6"
      >
        <div
          className="p-4 rounded-2xl flex items-center justify-between"
          style={{
            background: "rgba(12,12,18,.78)",
            border: "1px solid rgba(201,168,76,.22)",
          }}
        >
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-[#c9a84c]" />
            <span className="text-sm text-[#a09d98]">
              {completionStatus["site-analysis"] > 0
                ? "Analysis generated based on site location"
                : "Generate AI analysis based on site location"}
            </span>
          </div>
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all disabled:opacity-50"
            style={{
              background: "linear-gradient(135deg, #c9a84c 0%, #e8c96a 100%)",
              color: "#08080c",
            }}
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Analyzing...
              </>
            ) : completionStatus["site-analysis"] > 0 ? (
              <>
                <RefreshCw className="w-4 h-4" />
                Regenerate
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate Analysis
              </>
            )}
          </button>
        </div>
      </motion.div>

      {/* Completion indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono text-[#55534f]">COMPLETION</span>
          <span className="text-xs font-mono text-[#c9a84c]">
            {completionStatus["site-analysis"]}%
          </span>
        </div>
        <div className="h-1.5 rounded-full bg-white/[.06] overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${completionStatus["site-analysis"]}%` }}
            transition={{ duration: 0.5 }}
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, #c9a84c, #e8c96a)",
              boxShadow: completionStatus["site-analysis"] > 0 ? "0 0 10px rgba(201,168,76,.5)" : "none",
            }}
          />
        </div>
      </motion.div>

      <div className="grid grid-cols-3 gap-4">
        {analysisCards.map((card, idx) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut", delay: 0.15 + idx * 0.05 }}
            className="glass-card p-5"
          >
            <div className="flex items-start justify-between mb-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{
                  background: "rgba(201,168,76,.08)",
                  border: "1px solid rgba(201,168,76,.15)",
                }}
              >
                {card.emoji}
              </div>
              <span
                className="px-2.5 py-1 rounded-full text-[10px] font-mono font-medium"
                style={{
                  background: "rgba(201,168,76,.12)",
                  border: "1px solid rgba(201,168,76,.2)",
                  color: "#c9a84c",
                }}
              >
                {card.score}
              </span>
            </div>
            <h3 className="text-sm font-semibold text-[#f0ede8] mb-2">{card.title}</h3>
            <p className="text-xs text-[#a09d98] leading-relaxed">{card.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
