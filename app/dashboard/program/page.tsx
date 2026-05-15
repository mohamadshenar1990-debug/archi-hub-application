"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, RefreshCw } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { HistoryPanel } from "@/components/history-panel";
import { useToast } from "@/components/toast-provider";
import { useProjectStore, ProgramZone } from "@/lib/store";

export default function ProgramPage() {
  const { showToast } = useToast();
  const {
    programZones,
    generateProgram,
    completionStatus,
    clientBrief,
    personalityProfile,
  } = useProjectStore();
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    if (completionStatus["client-brief"] === 0) {
      showToast("Please complete the client brief first", "info");
      return;
    }
    setIsGenerating(true);
    showToast("Generating program based on your brief and personality...", "info");
    setTimeout(() => {
      generateProgram(prompt);
      setIsGenerating(false);
      showToast("Program generated successfully", "success");
    }, 2000);
  };

  // Default zones if none generated yet
  const displayZones = programZones.length > 0 ? programZones : [
    {
      name: "Public Zone",
      spaces: [
        { name: "Majlis", area: "45" },
        { name: "Formal Living", area: "38" },
        { name: "Dining Room", area: "32" },
      ],
    },
    {
      name: "Semi-Private Zone",
      spaces: [
        { name: "Family Living", area: "55" },
        { name: "Kitchen", area: "28" },
        { name: "Home Office", area: "22" },
      ],
    },
    {
      name: "Private Zone",
      spaces: [
        { name: "Master Suite", area: "65" },
        { name: "Bedrooms (5)", area: "150" },
      ],
    },
    {
      name: "Service Zone",
      spaces: [
        { name: "Laundry", area: "12" },
        { name: "Storage", area: "18" },
        { name: "Staff Quarters", area: "32" },
      ],
    },
    {
      name: "Leisure Zone",
      spaces: [
        { name: "Home Cinema", area: "35" },
        { name: "Gym", area: "28" },
        { name: "Pool", area: "60" },
      ],
    },
    {
      name: "Hidden Program",
      spaces: [
        { name: "Underground Parking", area: "120" },
        { name: "Mechanical Room", area: "25" },
        { name: "Smart Home Hub", area: "8" },
      ],
    },
  ];

  const totalArea = displayZones.reduce(
    (acc, zone) =>
      acc + zone.spaces.reduce((a, s) => a + parseInt(s.area || "0"), 0),
    0
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <PageHeader
          title="Program Generator"
          description="AI-generated spatial program based on your requirements"
        />
        <HistoryPanel<ProgramZone[]>
          section="program"
          renderItem={(data) => (
            <div className="text-xs">
              <p>{data.length} zones generated</p>
              <p>
                Total:{" "}
                {data.reduce(
                  (acc, zone) =>
                    acc + zone.spaces.reduce((a, s) => a + parseInt(s.area || "0"), 0),
                  0
                )}{" "}
                m²
              </p>
            </div>
          )}
        />
      </div>

      {/* Generate Bar */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="mb-6"
      >
        <div
          className="p-4 rounded-2xl flex items-center gap-3"
          style={{
            background: "rgba(12,12,18,.78)",
            border: "1px solid rgba(201,168,76,.22)",
          }}
        >
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe additional program requirements..."
            className="flex-1 bg-transparent text-sm text-[#f0ede8] placeholder-[#55534f] focus:outline-none"
          />
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
            ) : programZones.length > 0 ? (
              <>
                <RefreshCw className="w-4 h-4" />
                Regenerate
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate Program
              </>
            )}
          </button>
        </div>
      </motion.div>

      {/* Context Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-6 p-3 rounded-xl bg-white/[.02] border border-white/[.04]"
      >
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#55534f]">
            Based on: {clientBrief.bedrooms} bedrooms, {clientBrief.livingAreas} living areas
            {personalityProfile.name && ` | Personality: ${personalityProfile.name}`}
          </span>
          <span className="text-[#c9a84c] font-mono">Total: {totalArea} m²</span>
        </div>
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
          <span className="text-xs font-mono text-[#c9a84c]">{completionStatus["program"]}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-white/[.06] overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${completionStatus["program"]}%` }}
            transition={{ duration: 0.5 }}
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, #c9a84c, #e8c96a)",
              boxShadow: completionStatus["program"] > 0 ? "0 0 10px rgba(201,168,76,.5)" : "none",
            }}
          />
        </div>
      </motion.div>

      {/* Zone Grid */}
      <div className="grid grid-cols-2 gap-4">
        {displayZones.map((zone, idx) => (
          <motion.div
            key={zone.name}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut", delay: 0.2 + idx * 0.08 }}
            className="glass-card p-5"
          >
            <h3
              className="text-sm font-semibold mb-4 pb-2"
              style={{
                color: "#c9a84c",
                borderBottom: "1px solid rgba(201,168,76,.2)",
              }}
            >
              {zone.name}
            </h3>
            <div className="space-y-2">
              {zone.spaces.map((space) => (
                <div
                  key={space.name}
                  className="flex items-center justify-between py-1.5"
                >
                  <span className="text-sm text-[#a09d98]">{space.name}</span>
                  <span className="text-sm font-mono text-[#55534f]">{space.area} m²</span>
                </div>
              ))}
              <div className="pt-2 mt-2 border-t border-white/[.04]">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#55534f]">Zone Total</span>
                  <span className="text-xs font-mono text-[#c9a84c]">
                    {zone.spaces.reduce((a, s) => a + parseInt(s.area || "0"), 0)} m²
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
