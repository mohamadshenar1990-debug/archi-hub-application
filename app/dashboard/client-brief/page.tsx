"use client";

import { motion } from "framer-motion";
import { Save, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { GlassCard } from "@/components/glass-card";
import { HistoryPanel } from "@/components/history-panel";
import { useToast } from "@/components/toast-provider";
import { useProjectStore, ClientBrief } from "@/lib/store";

export default function ClientBriefPage() {
  const { showToast } = useToast();
  const { clientBrief, setClientBrief, saveClientBrief, completionStatus } = useProjectStore();

  const handleSave = () => {
    saveClientBrief();
    showToast("Brief saved to history", "success");
  };

  const handleGenerateSummary = () => {
    showToast("Generating AI summary based on your brief...", "info");
    setTimeout(() => {
      showToast("AI Summary: Modern luxury villa with emphasis on privacy and sustainability", "success");
    }, 1500);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <PageHeader
          title="Client Brief"
          description="Capture and organize client requirements"
        />
        <HistoryPanel<ClientBrief>
          section="client-brief"
          renderItem={(data) => (
            <div className="space-y-1 text-xs">
              <p>Bedrooms: {data.bedrooms} | Living: {data.livingAreas}</p>
              <p>Privacy: {data.privacy} | Sustainability: {data.sustainability}</p>
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
          <span className="text-xs font-mono text-[#c9a84c]">{completionStatus["client-brief"]}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-white/[.06] overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${completionStatus["client-brief"]}%` }}
            transition={{ duration: 0.5 }}
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, #c9a84c, #e8c96a)",
              boxShadow: completionStatus["client-brief"] > 0 ? "0 0 10px rgba(201,168,76,.5)" : "none",
            }}
          />
        </div>
      </motion.div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Space Requirements */}
        <GlassCard className="p-5">
          <h3 className="text-sm font-mono text-[#55534f] uppercase tracking-wider mb-4">
            Space Requirements
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-[#55534f] mb-1.5 block">Bedrooms</label>
              <select
                value={clientBrief.bedrooms}
                onChange={(e) => setClientBrief({ bedrooms: e.target.value })}
                className="w-full px-3 py-2.5 rounded-lg bg-white/[.04] border border-white/[.08] text-sm text-[#f0ede8] focus:outline-none focus:border-[#c9a84c]/40"
              >
                <option value="4">4 Bedrooms</option>
                <option value="5">5 Bedrooms</option>
                <option value="6">6 Bedrooms</option>
                <option value="7">7+ Bedrooms</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-[#55534f] mb-1.5 block">Living Areas</label>
              <select
                value={clientBrief.livingAreas}
                onChange={(e) => setClientBrief({ livingAreas: e.target.value })}
                className="w-full px-3 py-2.5 rounded-lg bg-white/[.04] border border-white/[.08] text-sm text-[#f0ede8] focus:outline-none focus:border-[#c9a84c]/40"
              >
                <option value="2">2 Living Areas</option>
                <option value="3">3 Living Areas (Majlis, Family, Formal)</option>
                <option value="4">4+ Living Areas</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-[#55534f] mb-1.5 block">Home Office</label>
              <select
                value={clientBrief.homeOffice}
                onChange={(e) => setClientBrief({ homeOffice: e.target.value })}
                className="w-full px-3 py-2.5 rounded-lg bg-white/[.04] border border-white/[.08] text-sm text-[#f0ede8] focus:outline-none focus:border-[#c9a84c]/40"
              >
                <option value="yes">Yes - Dedicated Office</option>
                <option value="no">No</option>
                <option value="dual">Dual-purpose space</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-[#55534f] mb-1.5 block">Garage</label>
              <select
                value={clientBrief.garage}
                onChange={(e) => setClientBrief({ garage: e.target.value })}
                className="w-full px-3 py-2.5 rounded-lg bg-white/[.04] border border-white/[.08] text-sm text-[#f0ede8] focus:outline-none focus:border-[#c9a84c]/40"
              >
                <option value="2">2 Cars</option>
                <option value="3">3 Cars</option>
                <option value="4">4 Cars (Underground)</option>
                <option value="6">6+ Cars</option>
              </select>
            </div>
          </div>
        </GlassCard>

        {/* Privacy & Sustainability */}
        <GlassCard className="p-5" delay={0.1}>
          <h3 className="text-sm font-mono text-[#55534f] uppercase tracking-wider mb-4">
            Design Preferences
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-[#55534f] mb-1.5 block">Privacy Level</label>
              <select
                value={clientBrief.privacy}
                onChange={(e) => setClientBrief({ privacy: e.target.value })}
                className="w-full px-3 py-2.5 rounded-lg bg-white/[.04] border border-white/[.08] text-sm text-[#f0ede8] focus:outline-none focus:border-[#c9a84c]/40"
              >
                <option value="maximum">Maximum - Full screening from all sides</option>
                <option value="high">High - Screened from street and neighbors</option>
                <option value="moderate">Moderate - Street screening only</option>
                <option value="open">Open - Minimal privacy requirements</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-[#55534f] mb-1.5 block">Sustainability Target</label>
              <select
                value={clientBrief.sustainability}
                onChange={(e) => setClientBrief({ sustainability: e.target.value })}
                className="w-full px-3 py-2.5 rounded-lg bg-white/[.04] border border-white/[.08] text-sm text-[#f0ede8] focus:outline-none focus:border-[#c9a84c]/40"
              >
                <option value="platinum">LEED Platinum - Maximum performance</option>
                <option value="gold">LEED Gold - High performance</option>
                <option value="silver">LEED Silver - Good performance</option>
                <option value="none">No certification - Standard compliance</option>
              </select>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Must-Have and Avoid Lists */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <GlassCard className="p-5" delay={0.15}>
          <h3 className="text-sm font-mono text-[#55534f] uppercase tracking-wider mb-4">
            Must-Have List
          </h3>
          <textarea
            value={clientBrief.mustHave}
            onChange={(e) => setClientBrief({ mustHave: e.target.value })}
            className="w-full h-32 px-3 py-2.5 rounded-lg bg-white/[.04] border border-white/[.08] text-sm text-[#f0ede8] placeholder:text-[#55534f] focus:outline-none focus:border-[#c9a84c]/40 resize-none"
            placeholder="List essential features and requirements..."
          />
        </GlassCard>

        <GlassCard className="p-5" delay={0.2}>
          <h3 className="text-sm font-mono text-[#55534f] uppercase tracking-wider mb-4">
            Avoid List
          </h3>
          <textarea
            value={clientBrief.avoid}
            onChange={(e) => setClientBrief({ avoid: e.target.value })}
            className="w-full h-32 px-3 py-2.5 rounded-lg bg-white/[.04] border border-white/[.08] text-sm text-[#f0ede8] placeholder:text-[#55534f] focus:outline-none focus:border-[#c9a84c]/40 resize-none"
            placeholder="List features or styles to avoid..."
          />
        </GlassCard>
      </div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: "easeOut", delay: 0.25 }}
        className="flex justify-end gap-3"
      >
        <button
          onClick={handleGenerateSummary}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium glass-card hover:bg-white/[.05] transition-colors"
        >
          <Sparkles className="w-4 h-4" />
          Generate AI Summary
        </button>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
          style={{
            background: "linear-gradient(135deg, #c9a84c 0%, #e8c96a 100%)",
            color: "#08080c",
          }}
        >
          <Save className="w-4 h-4" />
          Save Brief
        </button>
      </motion.div>
    </div>
  );
}
