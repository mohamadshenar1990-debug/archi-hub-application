"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bookmark, Sparkles, RefreshCw } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { HistoryPanel } from "@/components/history-panel";
import { useToast } from "@/components/toast-provider";
import { useProjectStore, VisualizationRender } from "@/lib/store";

const rooms = ["Majlis", "Master Suite", "Family Living", "Kitchen", "Home Cinema", "Gym"];

export default function InteriorPage() {
  const [activeRoom, setActiveRoom] = useState("Majlis");
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { showToast } = useToast();
  const {
    interiorRenders,
    generateInteriorRenders,
    completionStatus,
    personalityProfile,
    inspirationItems,
  } = useProjectStore();

  const handleGenerate = () => {
    setIsGenerating(true);
    showToast(`Generating ${activeRoom} renders...`, "info");
    setTimeout(() => {
      generateInteriorRenders(prompt, activeRoom);
      setIsGenerating(false);
      showToast(`${activeRoom} renders generated`, "success");
    }, 2500);
  };

  const handleSave = (name: string) => {
    showToast(`"${name}" saved to gallery`, "success");
  };

  // Filter renders by active room or show defaults
  const roomRenders = interiorRenders.filter((r) => r.name.includes(activeRoom));
  const displayRenders = roomRenders.length > 0 ? roomRenders : [
    { id: "1", emoji: "🛋️", name: `${activeRoom} - Day View`, category: "interior", timestamp: Date.now() },
    { id: "2", emoji: "🌅", name: `${activeRoom} - Golden Hour`, category: "interior", timestamp: Date.now() },
    { id: "3", emoji: "✨", name: `${activeRoom} - Detail`, category: "interior", timestamp: Date.now() },
    { id: "4", emoji: "🌙", name: `${activeRoom} - Evening`, category: "interior", timestamp: Date.now() },
  ];

  const selectedInspirations = inspirationItems.filter((i) => i.selected && i.category === "Interior");

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <PageHeader
          title="Interior Design"
          description="AI-generated interior visualizations"
        />
        <HistoryPanel<VisualizationRender[]>
          section="visualization"
          renderItem={(data) => (
            <div className="text-xs">
              <p>{data.filter((r) => r.category === "interior").length} interior renders</p>
            </div>
          )}
        />
      </div>

      {/* Room Filter */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="flex gap-2 mb-4 flex-wrap"
      >
        {rooms.map((room) => (
          <button
            key={room}
            onClick={() => setActiveRoom(room)}
            className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
            style={{
              background: activeRoom === room ? "rgba(201,168,76,.15)" : "rgba(255,255,255,.03)",
              border: `1px solid ${activeRoom === room ? "rgba(201,168,76,.3)" : "rgba(255,255,255,.06)"}`,
              color: activeRoom === room ? "#c9a84c" : "#a09d98",
            }}
          >
            {room}
          </button>
        ))}
      </motion.div>

      {/* Generate Bar */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: "easeOut", delay: 0.05 }}
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
            placeholder={`Describe ${activeRoom} style, mood, or specific details...`}
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
                Rendering...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate {activeRoom}
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
            Style: {personalityProfile.name || "TBD"}
            {selectedInspirations.length > 0 && ` | ${selectedInspirations.length} interior inspirations`}
          </span>
          <span className="text-[#c9a84c] font-mono">
            {interiorRenders.length} total renders
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
          <span className="text-xs font-mono text-[#c9a84c]">{completionStatus["interior"]}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-white/[.06] overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${completionStatus["interior"]}%` }}
            transition={{ duration: 0.5 }}
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, #c9a84c, #e8c96a)",
              boxShadow: completionStatus["interior"] > 0 ? "0 0 10px rgba(201,168,76,.5)" : "none",
            }}
          />
        </div>
      </motion.div>

      {/* Visualization Grid */}
      <div className="grid grid-cols-2 gap-4">
        {displayRenders.map((render, idx) => (
          <motion.div
            key={render.id + idx}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut", delay: 0.2 + idx * 0.1 }}
            className="glass-card overflow-hidden group"
          >
            {/* Image Placeholder */}
            <div
              className="aspect-[16/10] flex items-center justify-center relative"
              style={{
                background: "linear-gradient(135deg, rgba(12,12,18,.9) 0%, rgba(18,18,24,.9) 100%)",
              }}
            >
              <span className="text-6xl">{render.emoji}</span>

              {/* AI Render Badge */}
              <span
                className="absolute top-3 left-3 px-2 py-1 rounded text-[9px] font-mono font-medium"
                style={{
                  background: "rgba(201,168,76,.2)",
                  border: "1px solid rgba(201,168,76,.3)",
                  color: "#c9a84c",
                }}
              >
                AI RENDER
              </span>

              {/* Save Button */}
              <button
                onClick={() => handleSave(render.name)}
                className="absolute top-3 right-3 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: "rgba(8,8,14,.8)",
                  border: "1px solid rgba(255,255,255,.1)",
                }}
              >
                <Bookmark className="w-4 h-4 text-[#a09d98]" />
              </button>
            </div>

            {/* Info */}
            <div className="p-4">
              <h3 className="text-sm font-semibold text-[#f0ede8] mb-1">{render.name}</h3>
              <p className="text-xs text-[#55534f]">
                {personalityProfile.tags.length > 0
                  ? `${personalityProfile.tags[0]} style interior`
                  : "Contemporary interior design"}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
