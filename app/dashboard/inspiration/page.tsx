"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Check } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { HistoryPanel } from "@/components/history-panel";
import { useToast } from "@/components/toast-provider";
import { useProjectStore, InspirationItem } from "@/lib/store";

const filters = ["All", "Architecture", "Interior", "Landscape", "Materials", "Mood"];

export default function InspirationPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const { showToast } = useToast();
  const { inspirationItems, toggleInspiration, addInspiration, completionStatus } = useProjectStore();

  const filteredItems =
    activeFilter === "All"
      ? inspirationItems
      : inspirationItems.filter((item) => item.category === activeFilter);

  const selectedCount = inspirationItems.filter((i) => i.selected).length;

  const handleUpload = () => {
    // Simulate file upload
    const newItem = {
      emoji: "📷",
      label: "Custom Reference",
      category: "Mood",
    };
    addInspiration(newItem);
    showToast("Reference uploaded and selected", "success");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <PageHeader
          title="Inspiration Board"
          description="Collect and organize design references"
          actions={
            <button
              onClick={handleUpload}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium glass-card hover:bg-white/[.05] transition-colors"
            >
              <Upload className="w-4 h-4" />
              Upload
            </button>
          }
        />
        <HistoryPanel<InspirationItem[]>
          section="inspiration"
          renderItem={(data) => (
            <div className="text-xs">
              <p>{data.filter((i) => i.selected).length} items selected</p>
            </div>
          )}
        />
      </div>

      {/* Completion indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono text-[#55534f]">
            SELECTED: {selectedCount} items
          </span>
          <span className="text-xs font-mono text-[#c9a84c]">
            {completionStatus["inspiration"]}%
          </span>
        </div>
        <div className="h-1.5 rounded-full bg-white/[.06] overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${completionStatus["inspiration"]}%` }}
            transition={{ duration: 0.5 }}
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, #c9a84c, #e8c96a)",
              boxShadow: completionStatus["inspiration"] > 0 ? "0 0 10px rgba(201,168,76,.5)" : "none",
            }}
          />
        </div>
      </motion.div>

      {/* Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="flex gap-2 mb-6"
      >
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
            style={{
              background: activeFilter === filter ? "rgba(201,168,76,.15)" : "rgba(255,255,255,.03)",
              border: `1px solid ${activeFilter === filter ? "rgba(201,168,76,.3)" : "rgba(255,255,255,.06)"}`,
              color: activeFilter === filter ? "#c9a84c" : "#a09d98",
            }}
          >
            {filter}
          </button>
        ))}
      </motion.div>

      {/* Inspiration Grid */}
      <div className="grid grid-cols-3 gap-4">
        {filteredItems.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut", delay: idx * 0.05 }}
            onClick={() => {
              toggleInspiration(item.id);
              showToast(item.selected ? "Removed from selection" : "Added to selection", "success");
            }}
            className={`aspect-[4/3] flex flex-col items-center justify-center cursor-pointer transition-all group relative ${
              item.selected ? "gold-card" : "glass-card"
            }`}
            style={
              item.selected
                ? {
                    border: "1px solid rgba(201,168,76,.35)",
                    boxShadow: "0 0 20px rgba(201,168,76,.1)",
                  }
                : {}
            }
          >
            {item.selected && (
              <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[#c9a84c] flex items-center justify-center">
                <Check className="w-3.5 h-3.5 text-[#08080c]" />
              </div>
            )}
            <span className={`text-5xl mb-3 transition-transform ${item.selected ? "scale-110" : "group-hover:scale-110"}`}>
              {item.emoji}
            </span>
            <span className={`text-sm font-medium ${item.selected ? "text-[#c9a84c]" : "text-[#f0ede8]"}`}>
              {item.label}
            </span>
            <span className="text-[10px] font-mono text-[#55534f] mt-1">{item.category}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
