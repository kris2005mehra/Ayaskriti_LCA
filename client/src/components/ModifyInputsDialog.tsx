import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import GlassCard from "./GlassCard";
import { RefreshCw, ArrowRight, AlertCircle } from "lucide-react";

interface ModifyInputsDialogProps {
  isOpen: boolean;
  onModify: () => void;
  onContinue: () => void;
  summary?: {
    co2Emissions: string;
    energyIntensity: string;
    sustainabilityScore: string;
  };
}

export default function ModifyInputsDialog({
  isOpen,
  onModify,
  onContinue,
  summary,
}: ModifyInputsDialogProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <GlassCard className="max-w-lg w-full mx-4">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Analysis Complete</h2>
              <p className="text-muted-foreground">
                Would you like to modify your inputs or proceed to the final report?
              </p>
            </div>

            {summary && (
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-muted/50 rounded-md">
                  <p className="text-sm text-muted-foreground mb-1">CO2 Emissions</p>
                  <p className="text-lg font-bold">{summary.co2Emissions}</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-md">
                  <p className="text-sm text-muted-foreground mb-1">Energy Intensity</p>
                  <p className="text-lg font-bold">{summary.energyIntensity}</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-md">
                  <p className="text-sm text-muted-foreground mb-1">Sustainability</p>
                  <p className="text-lg font-bold text-primary">{summary.sustainabilityScore}</p>
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={onModify}
                data-testid="button-modify-inputs"
                className="flex-1 gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Modify Inputs
              </Button>
              <Button
                onClick={onContinue}
                data-testid="button-continue-report"
                className="flex-1 gap-2"
              >
                Generate Report
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </GlassCard>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
