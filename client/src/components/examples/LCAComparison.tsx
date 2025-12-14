import LCAComparison from "../LCAComparison";

export default function LCAComparisonExample() {
  return (
    <div className="p-8 bg-background">
      <LCAComparison
        material="aluminium"
        circularScore={1100}
        linearScore={2450}
      />
    </div>
  );
}
