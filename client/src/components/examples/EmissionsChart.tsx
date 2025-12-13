import EmissionsChart from "../EmissionsChart";

// todo: remove mock functionality
const mockData = [
  { stage: "Raw Material", value: 450 },
  { stage: "Transportation", value: 180 },
  { stage: "Processing", value: 890 },
  { stage: "Energy", value: 720 },
  { stage: "Waste", value: 210 },
];

export default function EmissionsChartExample() {
  return (
    <div className="p-8 bg-background max-w-2xl">
      <EmissionsChart data={mockData} title="Emissions by LCA Stage (kg CO2e/ton)" />
    </div>
  );
}
