import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import GlassCard from "./GlassCard";
import { Cog, Cpu, BarChart3, FileText } from "lucide-react";

interface ProcessingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

interface ProcessingOverlayProps {
  currentStep: number;
  progress: number;
}

const processingSteps: ProcessingStep[] = [
  {
    id: "preprocess",
    title: "Data Pre-processing",
    description: "Validating and normalizing input data",
    icon: Cog,
  },
  {
    id: "estimate",
    title: "Estimating Parameters",
    description: "Using AI to fill missing values",
    icon: Cpu,
  },
  {
    id: "predict",
    title: "Predicting Indicators",
    description: "Running ML models for sustainability metrics",
    icon: BarChart3,
  },
  {
    id: "lca",
    title: "LCA Engine",
    description: "Computing cradle-to-gate lifecycle analysis",
    icon: FileText,
  },
];

export default function ProcessingOverlay({ currentStep, progress }: ProcessingOverlayProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <GlassCard className="max-w-lg w-full mx-4">
        <div className="text-center mb-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center"
          >
            <Cog className="w-8 h-8 text-primary" />
          </motion.div>
          <h2 className="text-2xl font-bold mb-2">Processing Your Data</h2>
          <p className="text-muted-foreground">
            Our AI is analyzing your metallurgy parameters
          </p>
        </div>

        <div className="space-y-4 mb-6">
          {processingSteps.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center gap-4 p-4 rounded-md transition-colors ${
                  isActive
                    ? "bg-primary/10 border border-primary/30"
                    : isCompleted
                    ? "bg-muted/50"
                    : "opacity-50"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-md flex items-center justify-center ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : isCompleted
                      ? "bg-primary/20 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <step.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{step.title}</p>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
                {isActive && (
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-primary"
                  />
                )}
                {isCompleted && (
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Overall Progress</span>
            <span className="font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </GlassCard>
    </div>
  );
}
