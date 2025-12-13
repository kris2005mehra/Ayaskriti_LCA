import RecommendationCard from "../RecommendationCard";

// todo: remove mock functionality
const mockRecommendation = {
  id: "1",
  title: "Optimize Furnace Efficiency",
  description: "Upgrading to regenerative burners can reduce energy consumption by 15-20%",
  impact: "high" as const,
  category: "energy" as const,
  potentialSavings: "12-18% reduction in energy costs",
  details:
    "Regenerative burners recover waste heat from exhaust gases and preheat combustion air, significantly improving thermal efficiency. Implementation typically requires:\n\n- Initial investment of 10-15% of annual energy budget\n- 2-3 month installation period\n- Expected ROI within 18-24 months\n\nThis upgrade aligns with India's National Mission for Enhanced Energy Efficiency guidelines.",
};

export default function RecommendationCardExample() {
  return (
    <div className="p-8 bg-background max-w-2xl">
      <RecommendationCard recommendation={mockRecommendation} index={0} />
    </div>
  );
}
