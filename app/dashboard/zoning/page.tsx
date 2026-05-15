"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, RefreshCw } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { GlassCard } from "@/components/glass-card";
import { HistoryPanel } from "@/components/history-panel";
import { useToast } from "@/components/toast-provider";
import { useProjectStore, ZoningDiagram } from "@/lib/store";

export default function ZoningPage() {
  const { showToast } = useToast();
  const {
    zoningDiagram,
    generateZoning,
    completionStatus,
    programZones,
    clientBrief,
  } = useProjectStore();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    if (completionStatus["program"] === 0) {
      showToast("Please generate the program first", "info");
      return;
    }
    setIsGenerating(true);
    showToast("Generating zoning diagram based on your program...", "info");
    setTimeout(() => {
      generateZoning();
      setIsGenerating(false);
      showToast("Zoning diagram generated", "success");
    }, 2000);
  };

  // Dynamic positions based on generated diagram or defaults
  const zones = zoningDiagram?.zones || [
    { name: "PUBLIC", position: { x: 50, y: 20 }, size: 55, connections: ["SEMI-PVT", "SERVICE"] },
    { name: "SEMI-PVT", position: { x: 25, y: 45 }, size: 45, connections: ["PUBLIC", "PRIVATE", "COURTYARD"] },
    { name: "PRIVATE", position: { x: 75, y: 50 }, size: 50, connections: ["SEMI-PVT", "COURTYARD"] },
    { name: "SERVICE", position: { x: 15, y: 75 }, size: 38, connections: ["PUBLIC", "PRIVATE"] },
    { name: "LEISURE", position: { x: 85, y: 75 }, size: 38, connections: ["SEMI-PVT", "COURTYARD"] },
    { name: "COURTYARD", position: { x: 50, y: 55 }, size: 40, connections: ["SEMI-PVT", "PRIVATE", "LEISURE"] },
  ];

  const analysisCards = [
    {
      title: "Circulation",
      description: zoningDiagram?.circulationType === "Separated Flow"
        ? "Separate circulation paths for family and guests. Service access isolated."
        : "Primary spine connects all zones. Secondary loop through courtyard provides informal flow.",
      icon: "↔️",
    },
    {
      title: "Privacy Gradient",
      description: zoningDiagram?.privacyGradient === "Strong Gradient"
        ? "Clear separation between public and private zones with buffer spaces."
        : "Public to private transition from entry through courtyard to bedrooms.",
      icon: "🔒",
    },
    {
      title: "Adjacency Priority",
      description: zoningDiagram?.adjacencyPriority === "Family-Centric"
        ? "Kitchen-dining-family cluster prioritized. Master suite with garden access."
        : "Kitchen-dining-family cluster. Master suite isolated with garden access.",
      icon: "🔗",
    },
  ];

  // Calculate SVG positions
  const getCircleProps = (zone: typeof zones[0], index: number) => {
    const cx = (zone.position.x / 100) * 600;
    const cy = (zone.position.y / 100) * 350;
    const r = zone.size;
    const isGold = zone.name === "PUBLIC" || zone.name === "COURTYARD";
    return { cx, cy, r, isGold };
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <PageHeader
          title="Zoning & Planning"
          description="Spatial organization and adjacency relationships"
        />
        <HistoryPanel<ZoningDiagram>
          section="zoning"
          renderItem={(data) => (
            <div className="text-xs">
              <p>{data.zones.length} zones configured</p>
              <p>Circulation: {data.circulationType}</p>
            </div>
          )}
        />
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
              {zoningDiagram
                ? `Diagram based on ${programZones.length} program zones, ${clientBrief.privacy} privacy`
                : "Generate zoning diagram based on your program"}
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
                Generating...
              </>
            ) : zoningDiagram ? (
              <>
                <RefreshCw className="w-4 h-4" />
                Regenerate
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate Zoning
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
          <span className="text-xs font-mono text-[#c9a84c]">{completionStatus["zoning"]}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-white/[.06] overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${completionStatus["zoning"]}%` }}
            transition={{ duration: 0.5 }}
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, #c9a84c, #e8c96a)",
              boxShadow: completionStatus["zoning"] > 0 ? "0 0 10px rgba(201,168,76,.5)" : "none",
            }}
          />
        </div>
      </motion.div>

      {/* Bubble Diagram */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: "easeOut", delay: 0.15 }}
        className="glass-card p-8 mb-6"
      >
        <h3 className="text-sm font-mono text-[#55534f] uppercase tracking-wider mb-6">
          Bubble Diagram
        </h3>
        <svg viewBox="0 0 600 350" className="w-full h-auto" style={{ maxHeight: "350px" }}>
          {/* Connection Lines */}
          {zones.map((zone, i) =>
            zone.connections.map((targetName) => {
              const target = zones.find((z) => z.name === targetName);
              if (!target) return null;
              const x1 = (zone.position.x / 100) * 600;
              const y1 = (zone.position.y / 100) * 350;
              const x2 = (target.position.x / 100) * 600;
              const y2 = (target.position.y / 100) * 350;
              const isGoldLine = zone.name === "PUBLIC" || zone.name === "COURTYARD";
              return (
                <line
                  key={`${zone.name}-${targetName}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={isGoldLine ? "rgba(201,168,76,.3)" : "rgba(255,255,255,.15)"}
                  strokeWidth={isGoldLine ? 2 : 1}
                />
              );
            })
          )}

          {/* Zone Circles */}
          {zones.map((zone, idx) => {
            const { cx, cy, r, isGold } = getCircleProps(zone, idx);
            const isDashed = zone.name === "COURTYARD";
            return (
              <g key={zone.name}>
                <circle
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill={isGold ? "rgba(201,168,76,.15)" : "rgba(255,255,255,.05)"}
                  stroke={isGold ? "#c9a84c" : "rgba(255,255,255,.2)"}
                  strokeWidth={isGold ? 2 : 1.5}
                  strokeDasharray={isDashed ? "6 4" : undefined}
                />
                <text
                  x={cx}
                  y={cy - 8}
                  textAnchor="middle"
                  fill={isGold ? "#c9a84c" : "#a09d98"}
                  fontSize="9"
                  fontWeight="600"
                  fontFamily="monospace"
                >
                  {zone.name}
                </text>
                <text
                  x={cx}
                  y={cy + 8}
                  textAnchor="middle"
                  fill="#f0ede8"
                  fontSize="11"
                >
                  {zone.name === "PUBLIC" ? "Majlis" : 
                   zone.name === "SEMI-PVT" ? "Family" :
                   zone.name === "PRIVATE" ? "Bedrooms" :
                   zone.name === "SERVICE" ? "Staff" :
                   zone.name === "LEISURE" ? "Cinema" : "Central"}
                </text>
              </g>
            );
          })}
        </svg>
      </motion.div>

      {/* Analysis Cards */}
      <div className="grid grid-cols-3 gap-4">
        {analysisCards.map((card, idx) => (
          <GlassCard key={card.title} className="p-5" delay={0.25 + idx * 0.1}>
            <div className="flex items-start gap-3">
              <span className="text-2xl">{card.icon}</span>
              <div>
                <h3 className="text-sm font-semibold text-[#f0ede8] mb-2">{card.title}</h3>
                <p className="text-xs text-[#a09d98] leading-relaxed">{card.description}</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
