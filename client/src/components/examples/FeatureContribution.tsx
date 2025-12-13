import FeatureContribution from "../FeatureContribution";

// todo: remove mock functionality
const mockData = [
  { feature: "Energy Efficiency", contribution: 24.5, direction: "positive" as const },
  { feature: "Process Type", contribution: 18.2, direction: "positive" as const },
  { feature: "Transport Distance", contribution: 12.8, direction: "negative" as const },
  { feature: "Water Usage", contribution: 8.4, direction: "negative" as const },
  { feature: "Raw Material Source", contribution: 15.1, direction: "positive" as const },
];

export default function FeatureContributionExample() {
  return (
    <div className="p-8 bg-background max-w-md">
      <FeatureContribution
        data={mockData}
        title="AI Explainability"
        description="Feature contributions to sustainability score"
      />
    </div>
  );
}
