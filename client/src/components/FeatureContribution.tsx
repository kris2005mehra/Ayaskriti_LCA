import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FeatureData {
  feature: string;
  contribution: number;
  direction: "positive" | "negative";
}

interface FeatureContributionProps {
  data: FeatureData[];
  title?: string;
  description?: string;
}

export default function FeatureContribution({
  data,
  title,
  description,
}: FeatureContributionProps) {
  const maxContribution = Math.max(...data.map((d) => Math.abs(d.contribution)));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="rounded-md border border-card-border bg-card p-6"
    >
      {title && <h3 className="text-lg font-semibold mb-1">{title}</h3>}
      {description && (
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
      )}
      <div className="space-y-3">
        {data.map((item, index) => {
          const width = (Math.abs(item.contribution) / maxContribution) * 100;
          return (
            <motion.div
              key={item.feature}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="space-y-1"
            >
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{item.feature}</span>
                <span
                  className={cn(
                    "font-medium",
                    item.direction === "positive"
                      ? "text-emerald-500"
                      : "text-red-500"
                  )}
                >
                  {item.direction === "positive" ? "+" : "-"}
                  {item.contribution.toFixed(1)}%
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${width}%` }}
                  transition={{ delay: index * 0.05 + 0.2, duration: 0.5 }}
                  className={cn(
                    "h-full rounded-full",
                    item.direction === "positive"
                      ? "bg-emerald-500"
                      : "bg-red-500"
                  )}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
