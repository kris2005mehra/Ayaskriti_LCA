import RecommendationsPage from "../RecommendationsPage";

// todo: remove mock functionality
const mockFormData = {
  material: "steel" as const,
  energyUsage: "12000",
  emissions: "1800",
  transportDistance: "350",
  processType: "eaf",
  productionVolume: "75000",
  rawMaterialSource: "recycled",
  waterConsumption: "4500",
  wasteGenerated: "220",
};

export default function RecommendationsPageExample() {
  return (
    <RecommendationsPage
      formData={mockFormData}
      onBack={() => console.log("Back to dashboard")}
      onExport={() => console.log("Export report")}
      onNewAnalysis={() => console.log("New analysis")}
    />
  );
}
