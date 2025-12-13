import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  change?: number;
  changeLabel?: string;
  icon?: React.ElementType;
  color?: "primary" | "blue" | "green" | "orange" | "red";
  delay?: number;
}

const colorClasses = {
  primary: "from-primary/20 to-primary/5 text-primary",
  blue: "from-blue-500/20 to-blue-500/5 text-blue-500",
  green: "from-emerald-500/20 to-emerald-500/5 text-emerald-500",
  orange: "from-orange-500/20 to-orange-500/5 text-orange-500",
  red: "from-red-500/20 to-red-500/5 text-red-500",
};

export default function MetricCard({
  title,
  value,
  unit,
  change,
  changeLabel,
  icon: Icon,
  color = "primary",
  delay = 0,
}: MetricCardProps) {
  const getTrendIcon = () => {
    if (!change) return <Minus className="w-4 h-4" />;
    return change > 0 ? (
      <TrendingUp className="w-4 h-4" />
    ) : (
      <TrendingDown className="w-4 h-4" />
    );
  };

  const getTrendColor = () => {
    if (!change) return "text-muted-foreground";
    return change > 0 ? "text-emerald-500" : "text-red-500";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="relative overflow-visible rounded-md border border-card-border bg-card p-6"
    >
      <div
        className={cn(
          "absolute inset-0 rounded-md bg-gradient-to-br opacity-50",
          colorClasses[color]
        )}
      />
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          {Icon && (
            <div
              className={cn(
                "w-10 h-10 rounded-md flex items-center justify-center",
                `bg-gradient-to-br ${colorClasses[color]}`
              )}
            >
              <Icon className="w-5 h-5" />
            </div>
          )}
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold">{value}</span>
          {unit && <span className="text-lg text-muted-foreground">{unit}</span>}
        </div>
        {change !== undefined && (
          <div className={cn("flex items-center gap-1 mt-2", getTrendColor())}>
            {getTrendIcon()}
            <span className="text-sm font-medium">
              {Math.abs(change)}%{changeLabel && ` ${changeLabel}`}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
