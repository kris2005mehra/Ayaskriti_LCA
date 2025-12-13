import SustainabilityRadar from "../SustainabilityRadar";

// todo: remove mock functionality
const mockData = [
  { category: "Energy", score: 75, benchmark: 60 },
  { category: "Emissions", score: 82, benchmark: 65 },
  { category: "Water", score: 68, benchmark: 70 },
  { category: "Waste", score: 71, benchmark: 55 },
  { category: "Materials", score: 88, benchmark: 72 },
  { category: "Transport", score: 65, benchmark: 60 },
];

export default function SustainabilityRadarExample() {
  return (
    <div className="p-8 bg-background max-w-xl">
      <SustainabilityRadar data={mockData} title="Sustainability Performance" />
    </div>
  );
}
