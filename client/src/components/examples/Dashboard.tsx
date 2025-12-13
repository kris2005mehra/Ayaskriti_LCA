import Dashboard from "../Dashboard";

// todo: remove mock functionality
const mockFormData = {
  material: "aluminium" as const,
  energyUsage: "15000",
  emissions: "2500",
  transportDistance: "450",
  processType: "hall-heroult",
  productionVolume: "50000",
  rawMaterialSource: "domestic",
  waterConsumption: "5000",
  wasteGenerated: "280",
};

export default function DashboardExample() {
  return (
    <Dashboard
      formData={mockFormData}
      onProceed={() => console.log("Proceed to report")}
    />
  );
}
