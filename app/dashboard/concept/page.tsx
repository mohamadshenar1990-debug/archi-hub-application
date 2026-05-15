"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Sparkles, RefreshCw, Check } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { HistoryPanel } from "@/components/history-panel";
import { useToast } from "@/components/toast-provider";
import { useProjectStore, ConceptDirection } from "@/lib/store";

export default function ConceptPage() {
  const { showToast } = useToast();
  const {
    concepts,
    generateConcepts,
    selectPrimaryConcept,
    completionStatus,
    personalityProfile,
    zoningDiagram,
    inspirationItems,
  } = useProjectStore();
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    if (completionStatus["zoning"] === 0) {
      showToast("Please generate zoning diagram first", "info");
      return;
    }
    setIsGenerating(true);
    showToast("Generating concepts based on your profile and zoning...", "info");
    setTimeout(() => {
      generateConcepts(prompt);
      setIsGenerating(false);
      showToast("Concepts generated", "success");
    }, 2000);
  };

  const handleSelectPrimary = (id: string) => {
    selectPrimaryConcept(id);
    showToast("Primary concept selected", "success");
  };

  // Default concepts if none generated
  const displayConcepts = concepts.length > 0 ? concepts : [
    {
      id: "1",
      name: "The Desert Lantern",
      description: "A glowing central courtyard acts as the heart of the home, with perforated screens casting intricate shadow patterns throughout the day.",
      isPrimary: true,
      timestamp: Date.now(),
    },
    {
      id: "2",
      name: "Stratified Horizons",
      description: "Horizontal planes of varying opacity stack to create sheltered outdoor rooms. The design emphasizes the relationship between earth and sky.",
      isPrimary: false,
      timestamp: Date.now(),
    },
    {
      id: "3",
      name: "The Carved Monolith",
      description: "A solid mass subtracted to create voids for light, air, and views. The heavy exterior contrasts with light-filled interior courtyards.",
      isPrimary: false,
      timestamp: Date.now(),
    },
  ];

  const selectedInspirations = inspirationItems.filter((i) => i.selected);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <PageHeader
          title="Concept Studio"
          description="AI-generated design concepts and narratives"
        />
        <HistoryPanel<ConceptDirection[]>
          section="concept"
          renderItem={(data) => (
            <div className="text-xs">
              <p>{data.length} concepts generated</p>
              <p className="text-[#c9a84c]">
                Primary: {data.find((c) => c.isPrimary)?.name || "None"}
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
            placeholder="Describe your concept direction or constraints..."
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
            ) : concepts.length > 0 ? (
              <>
                <RefreshCw className="w-4 h-4" />
                Regenerate
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate Concepts
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
            Based on: {personalityProfile.name || "Personality TBD"}
            {selectedInspirations.length > 0 && ` | ${selectedInspirations.length} inspirations`}
            {zoningDiagram && ` | ${zoningDiagram.circulationType} circulation`}
          </span>
          <span className="text-[#c9a84c] font-mono">
            {concepts.length} concepts
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
          <span className="text-xs font-mono text-[#c9a84c]">{completionStatus["concept"]}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-white/[.06] overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${completionStatus["concept"]}%` }}
            transition={{ duration: 0.5 }}
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, #c9a84c, #e8c96a)",
              boxShadow: completionStatus["concept"] > 0 ? "0 0 10px rgba(201,168,76,.5)" : "none",
            }}
          />
        </div>
      </motion.div>

      {/* Concept Grid */}
      <div className="grid grid-cols-2 gap-4">
        {displayConcepts.map((concept, idx) => (
          <motion.div
            key={concept.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut", delay: 0.2 + idx * 0.1 }}
            className={concept.isPrimary ? "gold-card p-6" : "glass-card p-6"}
            style={
              concept.isPrimary
                ? {
                    border: "1px solid rgba(201,168,76,.35)",
                    boxShadow: "0 0 30px rgba(201,168,76,.08)",
                  }
                : {}
            }
          >
            <div className="flex items-start justify-between mb-3">
              <span
                className="text-xs font-mono"
                style={{ color: concept.isPrimary ? "#c9a84c" : "#55534f" }}
              >
                CARD {String(idx + 1).padStart(2, "0")}
              </span>
              <div className="flex gap-2">
                <span
                  className="px-2.5 py-1 rounded-full text-[10px] font-mono font-medium"
                  style={{
                    background: concept.isPrimary ? "rgba(201,168,76,.2)" : "rgba(255,255,255,.05)",
                    border: `1px solid ${concept.isPrimary ? "rgba(201,168,76,.3)" : "rgba(255,255,255,.1)"}`,
                    color: concept.isPrimary ? "#c9a84c" : "#a09d98",
                  }}
                >
                  {concept.isPrimary ? "Primary Direction" : "Alternative"}
                </span>
              </div>
            </div>
            <h3
              className={`text-xl font-bold mb-3 ${
                concept.isPrimary ? "gold-gradient-text" : "text-[#f0ede8]"
              }`}
            >
              {concept.name}
            </h3>
            <p className="text-sm text-[#a09d98] leading-relaxed mb-4">{concept.description}</p>
            
            {!concept.isPrimary && concepts.length > 0 && (
              <button
                onClick={() => handleSelectPrimary(concept.id)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors hover:bg-white/[.05]"
                style={{
                  background: "rgba(255,255,255,.03)",
                  border: "1px solid rgba(255,255,255,.08)",
                  color: "#a09d98",
                }}
              >
                <Check className="w-3 h-3" />
                Select as Primary
              </button>
            )}
          </motion.div>
        ))}

        {/* Generate New Direction Card */}
        <motion.button
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut", delay: 0.5 }}
          onClick={handleGenerate}
          disabled={isGenerating}
          className="p-6 rounded-2xl flex flex-col items-center justify-center min-h-[200px] transition-colors hover:bg-white/[.02] disabled:opacity-50"
          style={{
            border: "2px dashed rgba(255,255,255,.1)",
          }}
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
            style={{
              background: "rgba(255,255,255,.05)",
              border: "1px solid rgba(255,255,255,.1)",
            }}
          >
            <Plus className="w-6 h-6 text-[#55534f]" />
          </div>
          <span className="text-sm font-medium text-[#55534f]">Generate New Direction</span>
        </motion.button>
      </div>
    </div>
  );
}
