import { motion } from "framer-motion";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface SustainabilityData {
  category: string;
  score: number;
  benchmark: number;
}

interface SustainabilityRadarProps {
  data: SustainabilityData[];
  title?: string;
}

export default function SustainabilityRadar({ data, title }: SustainabilityRadarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="rounded-md border border-card-border bg-card p-6"
    >
      {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid stroke="hsl(var(--border))" />
            <PolarAngleAxis
              dataKey="category"
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
            />
            <Radar
              name="Benchmark"
              dataKey="benchmark"
              stroke="hsl(var(--muted-foreground))"
              fill="hsl(var(--muted))"
              fillOpacity={0.3}
              strokeDasharray="5 5"
            />
            <Radar
              name="Your Score"
              dataKey="score"
              stroke="hsl(var(--primary))"
              fill="hsl(var(--primary))"
              fillOpacity={0.4}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "6px",
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-sm text-muted-foreground">Your Score</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-muted-foreground/50" />
          <span className="text-sm text-muted-foreground">Industry Benchmark</span>
        </div>
      </div>
    </motion.div>
  );
}
