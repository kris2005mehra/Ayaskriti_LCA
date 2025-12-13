import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import GlassCard from "./GlassCard";
import RecommendationCard, { type Recommendation } from "./RecommendationCard";
import { Download, ArrowLeft, CheckCircle, FileSpreadsheet } from "lucide-react";
import type { FormData } from "./DataInputForm";

interface RecommendationsPageProps {
  formData: FormData;
  onBack: () => void;
  onExport: () => void;
  onNewAnalysis: () => void;
}

// todo: remove mock functionality
const generateRecommendations = (formData: FormData): Recommendation[] => {
  const baseRecommendations: Recommendation[] = [
    {
      id: "1",
      title: "Transition to Renewable Energy Sources",
      description: "Shift from coal-based to solar/wind power for smelting operations",
      impact: "high",
      category: "energy",
      potentialSavings: "25-35% reduction in Scope 2 emissions",
      details:
        "India's solar capacity has grown significantly, making renewable energy increasingly cost-competitive. Consider:\n\n- Power Purchase Agreements (PPAs) with renewable energy developers\n- On-site solar installations for auxiliary power\n- Green hydrogen for high-temperature processes\n\nGovernment incentives under National Solar Mission can offset 20-30% of transition costs.",
    },
    {
      id: "2",
      title: "Implement Waste Heat Recovery Systems",
      description: "Capture and reuse thermal energy from furnace exhaust gases",
      impact: "high",
      category: "process",
      potentialSavings: "15-20% improvement in energy efficiency",
      details:
        "Waste heat recovery is particularly effective in metallurgical operations where high-temperature processes generate significant thermal losses.\n\nRecommended systems:\n- Regenerative burners for furnaces\n- Heat exchangers for process steam generation\n- Organic Rankine Cycle (ORC) for electricity generation\n\nTypical payback period: 2-4 years.",
    },
    {
      id: "3",
      title: "Optimize Raw Material Transportation",
      description: "Shift to rail transport and consolidate shipments",
      impact: "medium",
      category: "emissions",
      potentialSavings: "8-12% reduction in Scope 3 transport emissions",
      details:
        "Transport optimization strategies:\n\n- Prioritize rail over road for distances >300km\n- Establish regional collection hubs for raw materials\n- Implement backhaul logistics to reduce empty trips\n- Consider coastal shipping for port-proximate facilities\n\nIndian Railways' dedicated freight corridors offer significant cost and emission benefits.",
    },
    {
      id: "4",
      title: "Increase Recycled Material Content",
      description: "Incorporate more secondary/recycled metal in production mix",
      impact: "high",
      category: "materials",
      potentialSavings: "40-70% lower embodied carbon per ton",
      details:
        `Recycled ${formData.material} production requires significantly less energy than primary production:\n\n` +
        "- Secondary aluminium: 95% less energy than primary\n" +
        "- Recycled copper: 85% less energy than primary\n" +
        "- EAF steel with scrap: 60% less emissions than BOF\n\n" +
        "India's growing domestic scrap availability presents opportunities for increased recycled content.",
    },
    {
      id: "5",
      title: "Water Recycling and Zero Liquid Discharge",
      description: "Implement closed-loop water systems to minimize freshwater intake",
      impact: "medium",
      category: "process",
      potentialSavings: "60-80% reduction in freshwater consumption",
      details:
        "Water-intensive metallurgical processes can significantly reduce environmental impact through:\n\n- Cooling water recirculation with evaporative towers\n- Process water treatment and reuse\n- Rainwater harvesting for non-critical applications\n- Zero Liquid Discharge (ZLD) systems for compliance\n\nAligns with CPCB norms and National Water Mission objectives.",
    },
  ];

  return baseRecommendations;
};

export default function RecommendationsPage({
  formData,
  onBack,
  onExport,
  onNewAnalysis,
}: RecommendationsPageProps) {
  const recommendations = generateRecommendations(formData);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold mb-2">Recommendations & Report</h1>
            <p className="text-muted-foreground">
              AI-generated sustainability improvement strategies for{" "}
              <span className="font-medium text-foreground capitalize">
                {formData.material}
              </span>{" "}
              production
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onBack} data-testid="button-back-dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
            <Button onClick={onExport} data-testid="button-export-report" className="gap-2">
              <FileSpreadsheet className="w-4 h-4" />
              Export Excel
            </Button>
          </div>
        </motion.div>

        {/* Summary Card */}
        <GlassCard>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-md bg-emerald-500/10 flex items-center justify-center shrink-0">
              <CheckCircle className="w-6 h-6 text-emerald-500" />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Analysis Complete</h2>
              <p className="text-muted-foreground mb-4">
                Based on your inputs and our AI analysis, we have identified{" "}
                <span className="font-medium text-foreground">
                  {recommendations.length} key recommendations
                </span>{" "}
                to improve your sustainability performance. Implementing these could result in
                significant reductions in carbon footprint and operational costs.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="px-4 py-2 bg-emerald-500/10 rounded-md">
                  <span className="text-sm text-muted-foreground">Potential CO2 Reduction</span>
                  <p className="text-lg font-bold text-emerald-500">35-45%</p>
                </div>
                <div className="px-4 py-2 bg-blue-500/10 rounded-md">
                  <span className="text-sm text-muted-foreground">Energy Savings</span>
                  <p className="text-lg font-bold text-blue-500">20-30%</p>
                </div>
                <div className="px-4 py-2 bg-primary/10 rounded-md">
                  <span className="text-sm text-muted-foreground">Cost Efficiency</span>
                  <p className="text-lg font-bold text-primary">15-25%</p>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Recommendations */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Improvement Recommendations</h3>
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <RecommendationCard key={rec.id} recommendation={rec} index={index} />
            ))}
          </div>
        </div>

        {/* Actions */}
        <GlassCard className="text-center">
          <h3 className="text-xl font-semibold mb-2">Ready for Implementation?</h3>
          <p className="text-muted-foreground mb-6">
            Export the full report to share with stakeholders or start a new analysis
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="outline" onClick={onNewAnalysis} data-testid="button-new-analysis">
              Start New Analysis
            </Button>
            <Button onClick={onExport} data-testid="button-download-full-report" className="gap-2">
              <Download className="w-4 h-4" />
              Download Full Report
            </Button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
