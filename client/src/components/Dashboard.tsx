import { motion } from "framer-motion";
import MetricCard from "./MetricCard";
import SustainabilityRadar from "./SustainabilityRadar";
import EmissionsChart from "./EmissionsChart";
import FeatureContribution from "./FeatureContribution";
import GlassCard from "./GlassCard";
import { Button } from "@/components/ui/button";
import { Flame, Zap, Droplets, Factory, ArrowRight, FileText } from "lucide-react";
import type { FormData } from "./DataInputForm";

interface DashboardProps {
  formData: FormData;
  onProceed: () => void;
}

// todo: remove mock functionality - these would come from AI/ML analysis
const generateMockResults = (formData: FormData) => {
  const baseEmissions = formData.material === "aluminium" ? 16000 : formData.material === "copper" ? 4000 : 2000;
  const inputEmissions = formData.emissions ? parseFloat(formData.emissions) : baseEmissions * 0.8;
  
  return {
    metrics: {
      co2Emissions: Math.round(inputEmissions),
      energyIntensity: formData.energyUsage ? parseFloat(formData.energyUsage) : 14500,
      sustainabilityScore: 78,
      costEfficiency: 82,
      waterUsage: formData.waterConsumption ? parseFloat(formData.waterConsumption) : 4800,
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
  };
};

export default function Dashboard({ formData, onProceed }: DashboardProps) {
  const results = generateMockResults(formData);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold mb-2">Analysis Dashboard</h1>
            <p className="text-muted-foreground">
              AI-powered sustainability analysis for{" "}
              <span className="font-medium text-foreground capitalize">
                {formData.material}
              </span>{" "}
              production
            </p>
          </div>
          <Button onClick={onProceed} data-testid="button-view-report" className="gap-2">
            <FileText className="w-4 h-4" />
            View Full Report
            <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="CO2 Emissions"
            value={results.metrics.co2Emissions.toLocaleString()}
            unit="kg/ton"
            change={-12}
            changeLabel="vs benchmark"
            icon={Flame}
            color="orange"
            delay={0}
          />
          <MetricCard
            title="Energy Intensity"
            value={results.metrics.energyIntensity.toLocaleString()}
            unit="kWh/ton"
            change={-8}
            changeLabel="improvement"
            icon={Zap}
            color="blue"
            delay={0.1}
          />
          <MetricCard
            title="Sustainability Score"
            value={results.metrics.sustainabilityScore}
            unit="/100"
            change={15}
            changeLabel="above avg"
            icon={Factory}
            color="green"
            delay={0.2}
          />
          <MetricCard
            title="Water Efficiency"
            value={results.metrics.waterUsage.toLocaleString()}
            unit="L/ton"
            change={-5}
            icon={Droplets}
            color="primary"
            delay={0.3}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SustainabilityRadar
            data={results.radarData}
            title="Sustainability Performance vs Industry Benchmark"
          />
          <EmissionsChart
            data={results.emissionsData}
            title="Emissions Breakdown by LCA Stage (kg CO2e/ton)"
          />
        </div>

        {/* AI Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <GlassCard>
              <h3 className="text-lg font-semibold mb-4">LCA Summary - Cradle-to-Gate Analysis</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Scope 1", value: "Direct Emissions", amount: "42%" },
                    { label: "Scope 2", value: "Electricity", amount: "35%" },
                    { label: "Scope 3", value: "Upstream", amount: "18%" },
                    { label: "Other", value: "Transport/Waste", amount: "5%" },
                  ].map((item, i) => (
                    <div key={i} className="p-4 bg-muted/50 rounded-md text-center">
                      <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                      <p className="text-2xl font-bold mb-1">{item.amount}</p>
                      <p className="text-xs text-muted-foreground">{item.value}</p>
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-md">
                  <p className="text-sm">
                    <span className="font-medium">India-Specific Context:</span> Your facility
                    performs <span className="text-primary font-medium">15% better</span> than
                    the Indian industry average for {formData.material} production. The primary
                    improvement opportunity lies in transitioning to renewable energy sources
                    for smelting operations.
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>
          <FeatureContribution
            data={results.featureData}
            title="AI Explainability"
            description="Key factors influencing your sustainability score"
          />
        </div>
      </div>
    </div>
  );
}
