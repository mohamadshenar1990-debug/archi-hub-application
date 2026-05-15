"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Building2, DollarSign, Zap } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { GlassCard } from "@/components/glass-card";
import { StatCard } from "@/components/stat-card";
import { useProjectStore } from "@/lib/store";

const workflowPhases = [
  { name: "Site Selection", key: "site-selection", href: "/dashboard/site-selection" },
  { name: "Site Analysis", key: "site-analysis", href: "/dashboard/site-analysis" },
  { name: "Context Study", key: "context-study", href: "/dashboard/context-study" },
  { name: "Client Brief", key: "client-brief", href: "/dashboard/client-brief" },
  { name: "Personality Analysis", key: "personality", href: "/dashboard/personality" },
  { name: "Inspiration Board", key: "inspiration", href: "/dashboard/inspiration" },
  { name: "Program Generator", key: "program", href: "/dashboard/program" },
  { name: "Zoning & Planning", key: "zoning", href: "/dashboard/zoning" },
  { name: "Concept Studio", key: "concept", href: "/dashboard/concept" },
  { name: "Massing Generator", key: "massing", href: "/dashboard/massing" },
  { name: "Exterior Design", key: "exterior", href: "/dashboard/exterior" },
  { name: "Interior Design", key: "interior", href: "/dashboard/interior" },
  { name: "Landscape Design", key: "landscape", href: "/dashboard/landscape" },
];

export default function DashboardPage() {
  const { completionStatus, projectName, siteData, programZones, concepts, exteriorRenders, interiorRenders, massingOptions } = useProjectStore();

  // Calculate overall completion
  const totalCompletion = Math.round(
    Object.values(completionStatus).reduce((a, b) => a + b, 0) / Object.keys(completionStatus).length
  );

  // Calculate AI outputs
  const aiOutputs = 
    programZones.length + 
    concepts.length + 
    exteriorRenders.length +
    interiorRenders.length +
    massingOptions.length +
    (completionStatus["site-analysis"] > 0 ? 9 : 0) +
    (completionStatus["context-study"] > 0 ? 1 : 0);

  // Determine next action
  const getNextAction = () => {
    if (completionStatus["site-selection"] === 0) {
      return { title: "Select Your Site", description: "Start by defining your project location", link: "/dashboard/site-selection" };
    }
    if (completionStatus["site-analysis"] === 0) {
      return { title: "Analyze Your Site", description: "Generate AI analysis of site conditions", link: "/dashboard/site-analysis" };
    }
    if (completionStatus["client-brief"] === 0) {
      return { title: "Define Client Brief", description: "Enter space requirements and preferences", link: "/dashboard/client-brief" };
    }
    if (completionStatus["personality"] === 0) {
      return { title: "Complete Personality Quiz", description: "Help AI understand your design preferences", link: "/dashboard/personality" };
    }
    if (completionStatus["program"] === 0) {
      return { title: "Generate Program", description: "Create your architectural program with AI", link: "/dashboard/program" };
    }
    if (completionStatus["zoning"] === 0) {
      return { title: "Generate Zoning", description: "Create spatial relationships diagram", link: "/dashboard/zoning" };
    }
    if (completionStatus["concept"] === 0) {
      return { title: "Generate Concepts", description: "Explore design directions with AI", link: "/dashboard/concept" };
    }
    if (completionStatus["massing"] === 0) {
      return { title: "Generate Massing", description: "Explore building form options", link: "/dashboard/massing" };
    }
    return { title: "Continue to Visualization", description: "Generate renders of your design", link: "/dashboard/visualization" };
  };

  const nextAction = getNextAction();

  const projectInfo = [
    { label: "Typology", value: "Luxury Villa" },
    { label: "Building Type", value: "Residential" },
    { label: "Location", value: siteData.address || "Riyadh, KSA" },
    { label: "Style", value: "Contemporary Desert" },
    { label: "Sustainability", value: "LEED Gold Target" },
    { label: "Timeline", value: "18 Months" },
  ];

  return (
    <div>
      <PageHeader
        title="Project Overview"
        description={`${projectName} — Luxury Villa, Riyadh`}
      />

      {/* Next Action Banner */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="mb-6"
      >
        <Link href={nextAction.link}>
          <div
            className="p-5 rounded-2xl cursor-pointer hover:scale-[1.005] transition-transform"
            style={{
              background: "linear-gradient(135deg, rgba(201,168,76,.12) 0%, rgba(14,12,4,.8) 100%)",
              border: "1px solid rgba(201,168,76,.25)",
              boxShadow: "0 0 40px rgba(201,168,76,.08)",
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    background: "rgba(201,168,76,.15)",
                    border: "1px solid rgba(201,168,76,.3)",
                  }}
                >
                  <Sparkles className="w-6 h-6 text-[#c9a84c]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#f0ede8]">{nextAction.title}</h3>
                  <p className="text-sm text-[#a09d98]">{nextAction.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-[#c9a84c] to-[#e8c96a] text-[#08080c]">
                Continue
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </Link>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard label="Completion" value={String(totalCompletion)} unit="%" gold delay={0.1} />
        <StatCard label="Plot Area" value={siteData.area} unit="m²" delay={0.15} />
        <StatCard label="Budget" value="$2.4" unit="M" delay={0.2} />
        <StatCard label="AI Outputs" value={String(aiOutputs)} delay={0.25} />
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-2 gap-4">
        {/* Workflow Progress */}
        <GlassCard className="p-5" delay={0.3}>
          <h3 className="text-sm font-mono text-[#55534f] uppercase tracking-wider mb-4">
            Workflow Progress
          </h3>
          <div className="space-y-3">
            {workflowPhases.map((phase) => {
              const progress = completionStatus[phase.key] || 0;
              return (
                <Link key={phase.key} href={phase.href} className="block group">
                  <div className="flex items-center gap-3">
                    <span className={`text-sm w-36 truncate transition-colors group-hover:text-[#c9a84c] ${
                      progress === 100 ? "text-[#c9a84c]" : progress > 0 ? "text-[#f0ede8]" : "text-[#a09d98]"
                    }`}>
                      {phase.name}
                    </span>
                    <div className="flex-1 h-1.5 rounded-full bg-white/[.06] overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="h-full rounded-full"
                        style={{
                          background:
                            progress === 100
                              ? "linear-gradient(90deg, #c9a84c 0%, #e8c96a 100%)"
                              : progress > 0
                              ? "rgba(201,168,76,.4)"
                              : "rgba(255,255,255,.1)",
                          boxShadow: progress === 100 ? "0 0 8px rgba(201,168,76,.5)" : "none",
                        }}
                      />
                    </div>
                    <span className="text-xs font-mono text-[#55534f] w-10 text-right">
                      {progress}%
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </GlassCard>

        {/* Project Info */}
        <GlassCard className="p-5" delay={0.35}>
          <h3 className="text-sm font-mono text-[#55534f] uppercase tracking-wider mb-4">
            Project Information
          </h3>
          <div className="space-y-3">
            {projectInfo.map((info) => (
              <div
                key={info.label}
                className="flex items-center justify-between py-2 border-b border-white/[.04] last:border-0"
              >
                <span className="text-sm text-[#55534f]">{info.label}</span>
                <span className="text-sm text-[#f0ede8] font-medium">{info.value}</span>
              </div>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="mt-6 pt-4 border-t border-white/[.06]">
            <h4 className="text-xs font-mono text-[#55534f] uppercase tracking-wider mb-3">
              AI Generation Summary
            </h4>
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2.5 rounded-lg bg-white/[.02] border border-white/[.04]">
                <span className="text-[10px] text-[#55534f] uppercase">Concepts</span>
                <p className="text-lg font-semibold text-[#f0ede8]">{concepts.length}</p>
              </div>
              <div className="p-2.5 rounded-lg bg-white/[.02] border border-white/[.04]">
                <span className="text-[10px] text-[#55534f] uppercase">Massing</span>
                <p className="text-lg font-semibold text-[#f0ede8]">{massingOptions.length}</p>
              </div>
              <div className="p-2.5 rounded-lg bg-white/[.02] border border-white/[.04]">
                <span className="text-[10px] text-[#55534f] uppercase">Renders</span>
                <p className="text-lg font-semibold text-[#f0ede8]">{exteriorRenders.length + interiorRenders.length}</p>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
