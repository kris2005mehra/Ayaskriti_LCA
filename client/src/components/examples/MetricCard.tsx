import MetricCard from "../MetricCard";
import { Flame, Zap, Droplets, Factory } from "lucide-react";

export default function MetricCardExample() {
  return (
    <div className="p-8 bg-background grid grid-cols-2 gap-4">
      <MetricCard
        title="CO2 Emissions"
        value="2,450"
        unit="kg/ton"
        change={-12}
        changeLabel="vs industry avg"
        icon={Flame}
        color="orange"
        delay={0}
      />
      <MetricCard
        title="Energy Efficiency"
        value="78"
        unit="%"
        change={8}
        changeLabel="improvement"
        icon={Zap}
        color="green"
        delay={0.1}
      />
    </div>
  );
}
