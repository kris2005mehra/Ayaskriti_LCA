import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check, Circle, Loader2 } from "lucide-react";

export interface WorkflowStep {
  id: string;
  title: string;
  description?: string;
}

interface WorkflowStepperProps {
  steps: WorkflowStep[];
  currentStep: number;
  className?: string;
}

export default function WorkflowStepper({ steps, currentStep, className }: WorkflowStepperProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isUpcoming = index > currentStep;

          return (
            <div key={step.id} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                    isCompleted && "bg-primary border-primary text-primary-foreground",
                    isCurrent && "border-primary bg-primary/10 text-primary",
                    isUpcoming && "border-muted-foreground/30 text-muted-foreground/50"
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : isCurrent ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Circle className="w-4 h-4" />
                  )}
                </motion.div>
                <motion.span
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.1 }}
                  className={cn(
                    "mt-2 text-xs font-medium text-center max-w-[80px]",
                    isCompleted && "text-primary",
                    isCurrent && "text-foreground",
                    isUpcoming && "text-muted-foreground/50"
                  )}
                >
                  {step.title}
                </motion.span>
              </div>
              {index < steps.length - 1 && (
                <div className="flex-1 mx-2 h-0.5 bg-muted-foreground/20">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isCompleted ? 1 : 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="h-full bg-primary origin-left"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
