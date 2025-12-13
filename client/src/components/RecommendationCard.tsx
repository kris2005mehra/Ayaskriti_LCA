import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Lightbulb, TrendingUp, AlertTriangle, CheckCircle, ChevronDown } from "lucide-react";
import { useState } from "react";

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  category: "energy" | "emissions" | "process" | "materials";
  potentialSavings?: string;
  details?: string;
}

interface RecommendationCardProps {
  recommendation: Recommendation;
  index: number;
}

const impactColors = {
  high: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  medium: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  low: "bg-blue-500/10 text-blue-500 border-blue-500/20",
};

const categoryIcons = {
  energy: TrendingUp,
  emissions: AlertTriangle,
  process: Lightbulb,
  materials: CheckCircle,
};

export default function RecommendationCard({
  recommendation,
  index,
}: RecommendationCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const CategoryIcon = categoryIcons[recommendation.category];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="rounded-md border border-card-border bg-card overflow-visible"
    >
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        data-testid={`button-expand-recommendation-${recommendation.id}`}
        className="w-full p-5 flex items-start gap-4 text-left hover-elevate active-elevate-2"
      >
        <div
          className={cn(
            "w-10 h-10 rounded-md flex items-center justify-center shrink-0",
            impactColors[recommendation.impact]
          )}
        >
          <CategoryIcon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h4 className="font-semibold">{recommendation.title}</h4>
            <Badge
              variant="outline"
              className={cn("text-xs", impactColors[recommendation.impact])}
            >
              {recommendation.impact} impact
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{recommendation.description}</p>
          {recommendation.potentialSavings && (
            <p className="text-sm font-medium text-emerald-500 mt-2">
              Potential savings: {recommendation.potentialSavings}
            </p>
          )}
        </div>
        <ChevronDown
          className={cn(
            "w-5 h-5 text-muted-foreground transition-transform shrink-0",
            isExpanded && "rotate-180"
          )}
        />
      </button>
      {isExpanded && recommendation.details && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="px-5 pb-5"
        >
          <div className="pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground whitespace-pre-line">
              {recommendation.details}
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
