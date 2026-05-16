import type { FormData } from "@/components/DataInputForm";

// ── Shared LCA calculation logic ─────────────────────────────────────────────
// Used by Dashboard.tsx, reportGenerator.ts, and RecommendationsPage.tsx
// so the PDF always shows the exact same numbers as the dashboard.

export interface LCAResults {
  metrics: {
    co2Emissions: number;
    energyIntensity: number;
    sustainabilityScore: number;
    costEfficiency: number;
    waterUsage: number;
  };
  radarData: { category: string; score: number; benchmark: number }[];
  emissionsData: { stage: string; value: number; pct: string }[];
  featureData: { feature: string; contribution: number; direction: "positive" | "negative" }[];
  scopeData: { scope: string; share: string; description: string }[];
  circularLCA: number;
  linearLCA: number;
}

export const computeLCAResults = (formData: FormData): LCAResults => {
  const baseEmissions =
    formData.material === "aluminium" ? 16000
    : formData.material === "copper" ? 4000
    : 2000;

  const inputEmissions = formData.emissions
    ? parseFloat(formData.emissions)
    : baseEmissions * 0.8;

  const co2 = Math.round(inputEmissions);

  return {
    metrics: {
      co2Emissions:        co2,
      energyIntensity:     formData.energyUsage ? parseFloat(formData.energyUsage) : 14500,
      sustainabilityScore: 78,
      costEfficiency:      82,
      waterUsage:          formData.waterConsumption ? parseFloat(formData.waterConsumption) : 4800,
    },
    radarData: [
      { category: "Energy",    score: 75, benchmark: 60 },
      { category: "Emissions", score: 82, benchmark: 65 },
      { category: "Water",     score: 68, benchmark: 70 },
      { category: "Waste",     score: 71, benchmark: 55 },
      { category: "Materials", score: 88, benchmark: 72 },
      { category: "Transport", score: 65, benchmark: 60 },
    ],
    emissionsData: [
      { stage: "Raw Material Extraction", value: Math.round(co2 * 0.18), pct: "18%" },
      { stage: "Transportation",          value: Math.round(co2 * 0.07), pct: "7%"  },
      { stage: "Processing & Smelting",   value: Math.round(co2 * 0.52), pct: "52%" },
      { stage: "Energy Generation",       value: Math.round(co2 * 0.18), pct: "18%" },
      { stage: "Waste Management",        value: Math.round(co2 * 0.05), pct: "5%"  },
    ],
    featureData: [
      { feature: "Energy Efficiency",   contribution: 24.5, direction: "positive" },
      { feature: "Process Type",        contribution: 18.2, direction: "positive" },
      { feature: "Transport Distance",  contribution: 12.8, direction: "negative" },
      { feature: "Water Usage",         contribution:  8.4, direction: "negative" },
      { feature: "Raw Material Source", contribution: 15.1, direction: "positive" },
    ],
    scopeData: [
      { scope: "Scope 1 – Direct Emissions",       share: "42%", description: "Furnace combustion, flaring" },
      { scope: "Scope 2 – Purchased Electricity",  share: "35%", description: "Grid electricity for smelting" },
      { scope: "Scope 3 – Upstream/Downstream",    share: "18%", description: "Raw material extraction, logistics" },
      { scope: "Other – Transport & Waste",         share:  "5%", description: "End-of-life, miscellaneous" },
    ],
    circularLCA: Math.round(co2 * 0.45),
    linearLCA:   co2,
  };
};
