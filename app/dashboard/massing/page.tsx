"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, RefreshCw, Check } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { HistoryPanel } from "@/components/history-panel";
import { useToast } from "@/components/toast-provider";
import { useProjectStore, MassingOption } from "@/lib/store";

export default function MassingPage() {
  const { showToast } = useToast();
  const {
    massingOptions,
    generateMassing,
    completionStatus,
    concepts,
    zoningDiagram,
  } = useProjectStore();
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedMassing, setSelectedMassing] = useState<string | null>(null);

  const handleGenerate = () => {
    if (completionStatus["concept"] === 0) {
      showToast("Please generate concepts first", "info");
      return;
    }
    setIsGenerating(true);
    showToast("Generating massing options based on your concept...", "info");
    setTimeout(() => {
      generateMassing(prompt);
      setIsGenerating(false);
      showToast("Massing options generated", "success");
    }, 2000);
  };

  const handleSelectMassing = (id: string) => {
    setSelectedMassing(id);
    showToast("Massing option selected", "success");
  };

  // Default options if none generated
  const displayOptions = massingOptions.length > 0 ? massingOptions : [
    { id: "1", name: "Courtyard Ring", description: "Continuous volume wrapping a central open-to-sky courtyard", type: "courtyard", timestamp: Date.now() },
    { id: "2", name: "L-Shape Wrap", description: "Two wings creating a protected outdoor space", type: "l-shape", timestamp: Date.now() },
    { id: "3", name: "Spine + Wings", description: "Central corridor with perpendicular volumes", type: "spine", timestamp: Date.now() },
    { id: "4", name: "Stacked Terrace", description: "Stepped volumes creating outdoor terraces at each level", type: "stacked", timestamp: Date.now() },
    { id: "5", name: "U-Form", description: "Three-sided embrace around a front garden", type: "u-form", timestamp: Date.now() },
    { id: "6", name: "Monolith Carved", description: "Solid mass with subtractive courtyards and voids", type: "monolith", timestamp: Date.now() },
  ];

  const primaryConcept = concepts.find((c) => c.isPrimary);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <PageHeader
          title="Massing Generator"
          description="AI-generated 3D massing options"
        />
        <HistoryPanel<MassingOption[]>
          section="massing"
          renderItem={(data) => (
            <div className="text-xs">
              <p>{data.length} options generated</p>
              <p>{data.map((d) => d.name).slice(0, 2).join(", ")}...</p>
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
            placeholder="Describe massing preferences or constraints..."
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
            ) : massingOptions.length > 0 ? (
              <>
                <RefreshCw className="w-4 h-4" />
                Regenerate
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate Massing
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
            Based on: {primaryConcept?.name || "Concept TBD"}
            {zoningDiagram && ` | ${zoningDiagram.zones.length} zones`}
          </span>
          <span className="text-[#c9a84c] font-mono">
            {massingOptions.length} options
          </span>
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
          <span className="text-xs font-mono text-[#c9a84c]">{completionStatus["massing"]}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-white/[.06] overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${completionStatus["massing"]}%` }}
            transition={{ duration: 0.5 }}
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, #c9a84c, #e8c96a)",
              boxShadow: completionStatus["massing"] > 0 ? "0 0 10px rgba(201,168,76,.5)" : "none",
            }}
          />
        </div>
      </motion.div>

      {/* Massing Grid */}
      <div className="grid grid-cols-3 gap-4">
        {displayOptions.map((option, idx) => {
          const isSelected = selectedMassing === option.id;
          return (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: "easeOut", delay: 0.2 + idx * 0.08 }}
              onClick={() => handleSelectMassing(option.id)}
              className={`p-5 cursor-pointer transition-all ${
                isSelected ? "gold-card" : "glass-card"
              }`}
              style={
                isSelected
                  ? {
                      border: "1px solid rgba(201,168,76,.35)",
                      boxShadow: "0 0 20px rgba(201,168,76,.1)",
                    }
                  : {}
              }
            >
              {/* SVG Diagram */}
              <div
                className="aspect-square rounded-xl mb-4 flex items-center justify-center relative"
                style={{
                  background: "rgba(8,8,14,.6)",
                  border: `1px solid ${isSelected ? "rgba(201,168,76,.2)" : "rgba(255,255,255,.06)"}`,
                }}
              >
                <MassingSvg type={option.name} />
                {isSelected && (
                  <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#c9a84c] flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-[#08080c]" />
                  </div>
                )}
              </div>
              <h3 className={`text-sm font-semibold mb-1 transition-colors ${
                isSelected ? "text-[#c9a84c]" : "text-[#f0ede8]"
              }`}>
                {option.name}
              </h3>
              <p className="text-xs text-[#55534f]">{option.description}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function MassingSvg({ type }: { type: string }) {
  const baseStyle = { stroke: "#c9a84c", strokeWidth: 1.5, fill: "rgba(201,168,76,.08)" };

  switch (type) {
    case "Courtyard Ring":
      return (
        <svg viewBox="0 0 80 80" className="w-16 h-16">
          <path d="M10 10 L70 10 L70 70 L10 70 Z" {...baseStyle} />
          <path
            d="M25 25 L55 25 L55 55 L25 55 Z"
            stroke="#c9a84c"
            strokeWidth="1"
            fill="none"
            strokeDasharray="3 2"
          />
        </svg>
      );
    case "L-Shape Wrap":
      return (
        <svg viewBox="0 0 80 80" className="w-16 h-16">
          <path d="M10 10 L40 10 L40 40 L70 40 L70 70 L10 70 Z" {...baseStyle} />
        </svg>
      );
    case "Spine + Wings":
      return (
        <svg viewBox="0 0 80 80" className="w-16 h-16">
          <rect x="35" y="10" width="10" height="60" {...baseStyle} />
          <rect x="10" y="25" width="25" height="20" {...baseStyle} />
          <rect x="45" y="35" width="25" height="20" {...baseStyle} />
        </svg>
      );
    case "Stacked Terrace":
      return (
        <svg viewBox="0 0 80 80" className="w-16 h-16">
          <rect x="10" y="50" width="60" height="20" {...baseStyle} />
          <rect x="15" y="32" width="50" height="18" {...baseStyle} />
          <rect x="20" y="14" width="40" height="18" {...baseStyle} />
        </svg>
      );
    case "U-Form":
      return (
        <svg viewBox="0 0 80 80" className="w-16 h-16">
          <path d="M10 10 L25 10 L25 55 L55 55 L55 10 L70 10 L70 70 L10 70 Z" {...baseStyle} />
        </svg>
      );
    case "Monolith Carved":
      return (
        <svg viewBox="0 0 80 80" className="w-16 h-16">
          <rect x="10" y="10" width="60" height="60" {...baseStyle} />
          <rect
            x="20"
            y="15"
            width="15"
            height="20"
            stroke="#c9a84c"
            strokeWidth="1"
            fill="rgba(8,8,14,.8)"
          />
          <rect
            x="45"
            y="45"
            width="20"
            height="15"
            stroke="#c9a84c"
            strokeWidth="1"
            fill="rgba(8,8,14,.8)"
          />
        </svg>
      );
    default:
      return null;
  }
}
