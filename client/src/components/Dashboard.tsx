import { motion } from "framer-motion";
import MetricCard from "./MetricCard";
import SustainabilityRadar from "./SustainabilityRadar";
import EmissionsChart from "./EmissionsChart";
import FeatureContribution from "./FeatureContribution";
import LCAComparison from "./LCAComparison";
import GlassCard from "./GlassCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Flame, Zap, Droplets, Factory, ArrowRight, FileText, Leaf, TrendingUp, Award, Target } from "lucide-react";
import type { FormData } from "./DataInputForm";

interface DashboardProps {
  formData: FormData;
  onProceed: () => void;
}

// Mock AI/ML results generator
const generateMockResults = (formData: FormData) => {
  const baseEmissions =
    formData.material === "aluminium"
      ? 16000
      : formData.material === "copper"
      ? 4000
      : 2000;
  const inputEmissions = formData.emissions
    ? parseFloat(formData.emissions)
    : baseEmissions * 0.8;

  return {
    metrics: {
      co2Emissions: Math.round(inputEmissions),
      energyIntensity: formData.energyUsage
        ? parseFloat(formData.energyUsage)
        : 14500,
      sustainabilityScore: 78,
      costEfficiency: 82,
      waterUsage: formData.waterConsumption
        ? parseFloat(formData.waterConsumption)
        : 4800,
    },
    radarData: [
      { category: "Energy", score: 75, benchmark: 60 },
      { category: "Emissions", score: 82, benchmark: 65 },
      { category: "Water", score: 68, benchmark: 70 },
      { category: "Waste", score: 71, benchmark: 55 },
      { category: "Materials", score: 88, benchmark: 72 },
      { category: "Transport", score: 65, benchmark: 60 },
    ],
    emissionsData: [
      { stage: "Raw Material Extraction", value: Math.round(inputEmissions * 0.18) },
      { stage: "Transportation", value: Math.round(inputEmissions * 0.07) },
      { stage: "Processing & Smelting", value: Math.round(inputEmissions * 0.52) },
      { stage: "Energy Generation", value: Math.round(inputEmissions * 0.18) },
      { stage: "Waste Management", value: Math.round(inputEmissions * 0.05) },
    ],
    featureData: [
      { feature: "Energy Efficiency", contribution: 24.5, direction: "positive" as const },
      { feature: "Process Type", contribution: 18.2, direction: "positive" as const },
      { feature: "Transport Distance", contribution: 12.8, direction: "negative" as const },
      { feature: "Water Usage", contribution: 8.4, direction: "negative" as const },
      { feature: "Raw Material Source", contribution: 15.1, direction: "positive" as const },
    ],
    circularLCA: Math.round(inputEmissions * 0.45),
    linearLCA: Math.round(inputEmissions),
  };
};

const materialIcons = {
  aluminium: { icon: "🔘", gradient: "from-slate-400 to-zinc-500" },
  copper: { icon: "🔶", gradient: "from-orange-500 to-amber-600" },
  steel: { icon: "⬛", gradient: "from-zinc-600 to-slate-700" },
};

export default function Dashboard({ formData, onProceed }: DashboardProps) {
  const results = generateMockResults(formData);
  const materialStyle = materialIcons[formData.material || "steel"];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background from public/ */}
      <div className="fixed inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(/back_image.png)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

        {/* Animated gradient orbs */}
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -80, 0], y: [0, 80, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-6 space-y-8">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-md border border-card-border bg-card/60 backdrop-blur-xl p-8"
          style={{
            background: `linear-gradient(135deg, hsl(var(--card) / 0.8) 0%, hsl(var(--card) / 0.4) 100%)`,
          }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 opacity-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0"
            >
              <div className="absolute top-8 right-8 w-32 h-32 border-2 border-primary/30 rounded-full" />
              <div className="absolute top-16 right-16 w-24 h-24 border border-primary/20 rounded-full" />
            </motion.div>
          </div>

          <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className={`w-16 h-16 rounded-md bg-gradient-to-br ${materialStyle.gradient} flex items-center justify-center shadow-2xl`}
                  style={{
                    transform: "perspective(500px) rotateX(10deg) rotateY(-5deg)",
                    boxShadow: "0 20px 40px -15px rgba(0,0,0,0.3)",
                  }}
                >
                  <Factory className="w-8 h-8 text-white" />
                </motion.div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-3xl font-bold">Analysis Dashboard</h1>
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                      AI Powered
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">
                    Comprehensive sustainability analysis for{" "}
                    <span className="font-semibold text-foreground capitalize">
                      {formData.material}
                    </span>{" "}
                    production in India
                  </p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-4">
                {[
                  { icon: Target, label: "Accuracy", value: "94.2%" },
                  { icon: Award, label: "Grade", value: "A-" },
                  { icon: TrendingUp, label: "Trend", value: "+15%" },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="flex items-center gap-2 px-4 py-2 bg-background/50 rounded-md border border-border/50"
                  >
                    <stat.icon className="w-4 h-4 text-primary" />
                    <span className="text-sm text-muted-foreground">{stat.label}:</span>
                    <span className="font-semibold">{stat.value}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Button
                size="lg"
                onClick={onProceed}
                data-testid="button-view-report"
                className="gap-2 shadow-lg"
                style={{
                  boxShadow: "0 10px 30px -10px hsl(var(--primary) / 0.5)",
                }}
              >
                <FileText className="w-5 h-5" />
                View Full Report
                <ArrowRight className="w-5 h-5" />
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: "CO₂ Emissions", value: results.metrics.co2Emissions.toLocaleString(), unit: "kg/ton", change: -12, changeLabel: "vs benchmark", icon: Flame, color: "orange" as const },
            { title: "Energy Intensity", value: results.metrics.energyIntensity.toLocaleString(), unit: "kWh/ton", change: -8, changeLabel: "improvement", icon: Zap, color: "blue" as const },
            { title: "Sustainability Score", value: results.metrics.sustainabilityScore, unit: "/100", change: 15, changeLabel: "above avg", icon: Leaf, color: "green" as const },
            { title: "Water Efficiency", value: results.metrics.waterUsage.toLocaleString(), unit: "L/ton", change: -5, icon: Droplets, color: "primary" as const },
          ].map((metric, i) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 30, rotateX: -15 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              style={{ perspective: "1000px" }}
            >
              <MetricCard {...metric} delay={0} />
            </motion.div>
          ))}
        </div>

        {/* LCA Comparison */}
        <LCAComparison
          material={formData.material || "steel"}
          circularScore={results.circularLCA}
          linearScore={results.linearLCA}
        />

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
            <SustainabilityRadar data={results.radarData} title="Sustainability Performance vs Industry Benchmark" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
            <EmissionsChart data={results.emissionsData} title="Emissions Breakdown by LCA Stage (kg CO₂e/ton)" />
          </motion.div>
        </div>

        {/* Feature Contribution */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="lg:col-span-2">
            <GlassCard className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent" />

              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-md bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center shadow-lg" style={{ transform: "perspective(500px) rotateX(10deg)", boxShadow: "0 10px 30px -10px hsl(var(--primary) / 0.5)" }}>
                  <Factory className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">LCA Summary</h3>
                  <p className="text-sm text-muted-foreground">Cradle-to-Gate Analysis</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                  { label: "Scope 1", value: "Direct Emissions", amount: "42%", color: "from-orange-500 to-red-500" },
                  { label: "Scope 2", value: "Electricity", amount: "35%", color: "from-blue-500 to-indigo-500" },
                  { label: "Scope 3", value: "Upstream", amount: "18%", color: "from-purple-500 to-pink-500" },
                  { label: "Other", value: "Transport/Waste", amount: "5%", color: "from-emerald-500 to-teal-500" },
                ].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 + i * 0.1 }} className="relative p-4 rounded-md overflow-hidden" style={{ background: "hsl(var(--muted) / 0.5)" }}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-10`} />
                    <div className="relative text-center">
                      <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                      <p className="text-2xl font-bold mb-1">{item.amount}</p>
                      <p className="text-xs text-muted-foreground">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="p-4 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-md">
                <div className="flex items-start gap-3">
                  <Leaf className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium mb-1">India-Specific Context</p>
                    <p className="text-sm text-muted-foreground">
                      Your facility performs <span className="text-primary font-semibold">15% better</span> than the Indian industry average for {formData.material} production. The primary improvement opportunity lies in transitioning to renewable energy sources for smelting operations, aligned with India's National Action Plan on Climate Change.
                    </p>
                  </div>
                </div>
              </motion.div>
            </GlassCard>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
            <FeatureContribution data={results.featureData} title="AI Explainability" description="Key factors influencing your sustainability score" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
