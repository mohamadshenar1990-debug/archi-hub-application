"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { GlassCard } from "@/components/glass-card";
import { HistoryPanel } from "@/components/history-panel";
import { useToast } from "@/components/toast-provider";
import { useProjectStore, PersonalityProfile } from "@/lib/store";

const quizQuestions = [
  {
    id: "space",
    question: "Which space feels most like home to you?",
    options: [
      { value: "modern", label: "A serene courtyard with water features" },
      { value: "traditional", label: "A cozy library with warm lighting" },
      { value: "nature", label: "A lush garden retreat" },
      { value: "bold", label: "An open-plan living area with dramatic views" },
    ],
  },
  {
    id: "entertain",
    question: "How do you prefer to entertain guests?",
    options: [
      { value: "modern", label: "Intimate gatherings in private settings" },
      { value: "traditional", label: "Grand formal receptions" },
      { value: "nature", label: "Casual outdoor celebrations" },
      { value: "bold", label: "Multi-zone experiences throughout the home" },
    ],
  },
  {
    id: "material",
    question: "What material resonates with you most?",
    options: [
      { value: "modern", label: "Modern glass and steel" },
      { value: "traditional", label: "Traditional plaster and tile" },
      { value: "nature", label: "Warm wood and timber" },
      { value: "bold", label: "Natural stone and marble" },
    ],
  },
];

export default function PersonalityPage() {
  const { showToast } = useToast();
  const {
    personalityProfile,
    setPersonalityAnswer,
    generatePersonalityProfile,
    completionStatus,
  } = useProjectStore();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSelect = (questionId: string, value: string) => {
    setPersonalityAnswer(questionId, value);
  };

  const handleGenerate = () => {
    const answeredCount = Object.keys(personalityProfile.answers).length;
    if (answeredCount < 3) {
      showToast("Please answer all questions first", "info");
      return;
    }
    setIsGenerating(true);
    showToast("Analyzing your personality profile...", "info");
    setTimeout(() => {
      generatePersonalityProfile();
      setIsGenerating(false);
      showToast("Your architectural personality has been revealed", "success");
    }, 1500);
  };

  const isComplete = completionStatus["personality"] === 100;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <PageHeader
          title="Personality Analysis"
          description="Discover your architectural personality profile"
        />
        <HistoryPanel<PersonalityProfile>
          section="personality"
          renderItem={(data) => (
            <div className="space-y-1">
              <p className="text-[#c9a84c] font-medium">{data.name}</p>
              <p className="text-xs">{data.tags.slice(0, 3).join(", ")}</p>
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
          <span className="text-xs font-mono text-[#55534f]">COMPLETION</span>
          <span className="text-xs font-mono text-[#c9a84c]">
            {completionStatus["personality"]}%
          </span>
        </div>
        <div className="h-1.5 rounded-full bg-white/[.06] overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${completionStatus["personality"]}%` }}
            transition={{ duration: 0.5 }}
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, #c9a84c, #e8c96a)",
              boxShadow: completionStatus["personality"] > 0 ? "0 0 10px rgba(201,168,76,.5)" : "none",
            }}
          />
        </div>
      </motion.div>

      {/* Quiz Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {quizQuestions.map((q, qIdx) => (
          <GlassCard key={q.id} className="p-5" delay={qIdx * 0.1}>
            <h3 className="text-sm font-semibold text-[#f0ede8] mb-4">{q.question}</h3>
            <div className="space-y-2">
              {q.options.map((option) => {
                const isSelected = personalityProfile.answers[q.id] === option.value;
                return (
                  <button
                    key={option.value}
                    onClick={() => handleSelect(q.id, option.value)}
                    className="w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all duration-200"
                    style={{
                      background: isSelected ? "rgba(201,168,76,.12)" : "rgba(255,255,255,.03)",
                      border: `1px solid ${isSelected ? "rgba(201,168,76,.3)" : "rgba(255,255,255,.06)"}`,
                      color: isSelected ? "#c9a84c" : "#a09d98",
                    }}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Generate Button */}
      {!isComplete && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut", delay: 0.3 }}
          className="flex justify-center mb-6"
        >
          <button
            onClick={handleGenerate}
            disabled={isGenerating || Object.keys(personalityProfile.answers).length < 3}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: "linear-gradient(135deg, #c9a84c 0%, #e8c96a 100%)",
              color: "#08080c",
            }}
          >
            <Sparkles className="w-4 h-4" />
            {isGenerating ? "Analyzing..." : "Reveal My Personality"}
          </button>
        </motion.div>
      )}

      {/* Profile Result */}
      {personalityProfile.name && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut", delay: 0.35 }}
          className="gold-card p-6"
        >
          <h3 className="text-sm font-mono text-[#55534f] uppercase tracking-wider mb-3">
            Your Profile
          </h3>
          <h2 className="text-2xl font-extrabold gold-gradient-text mb-3">
            {personalityProfile.name}
          </h2>
          <p className="text-sm text-[#a09d98] leading-relaxed mb-4">
            {personalityProfile.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {personalityProfile.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{
                  background: "rgba(201,168,76,.1)",
                  border: "1px solid rgba(201,168,76,.2)",
                  color: "#c9a84c",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
