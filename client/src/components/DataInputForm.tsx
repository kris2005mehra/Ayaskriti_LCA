import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import GlassCard from "./GlassCard";
import MaterialSelector, { type MaterialType } from "./MaterialSelector";
import WorkflowStepper, { type WorkflowStep } from "./WorkflowStepper";
import { ArrowLeft, ArrowRight, Loader2, HelpCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export interface FormData {
  material: MaterialType | null;
  energyUsage: string;
  emissions: string;
  transportDistance: string;
  processType: string;
  productionVolume: string;
  rawMaterialSource: string;
  waterConsumption: string;
  wasteGenerated: string;
}

interface DataInputFormProps {
  onSubmit: (data: FormData) => void;
  onBack: () => void;
}

const formSteps: WorkflowStep[] = [
  { id: "material", title: "Material" },
  { id: "energy", title: "Energy" },
  { id: "process", title: "Process" },
  { id: "review", title: "Review" },
];

export default function DataInputForm({ onSubmit, onBack }: DataInputFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    material: null,
    energyUsage: "",
    emissions: "",
    transportDistance: "",
    processType: "",
    productionVolume: "",
    rawMaterialSource: "",
    waterConsumption: "",
    wasteGenerated: "",
  });

  const updateField = (field: keyof FormData, value: string | MaterialType | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return formData.material !== null;
      case 1:
        return formData.energyUsage !== "" || formData.emissions !== "";
      case 2:
        return formData.processType !== "";
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (currentStep < formSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // todo: remove mock functionality
    await new Promise((resolve) => setTimeout(resolve, 500));
    onSubmit(formData);
    setIsSubmitting(false);
  };

  const renderFieldWithTooltip = (label: string, tooltip: string, children: React.ReactNode) => (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Label>{label}</Label>
        <Tooltip>
          <TooltipTrigger asChild>
            <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
          </TooltipTrigger>
          <TooltipContent>
            <p className="max-w-xs">{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </div>
      {children}
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Select Material Type</h3>
              <p className="text-muted-foreground">
                Choose the primary metal type for your analysis
              </p>
            </div>
            <MaterialSelector
              selected={formData.material}
              onSelect={(material) => updateField("material", material)}
            />
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Energy & Emissions Data</h3>
              <p className="text-muted-foreground">
                Enter your energy consumption and emission figures (partial data is allowed)
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderFieldWithTooltip(
                "Energy Usage (kWh/ton)",
                "Total electrical energy consumed per ton of metal produced",
                <Input
                  type="number"
                  data-testid="input-energy-usage"
                  placeholder="e.g., 15000"
                  value={formData.energyUsage}
                  onChange={(e) => updateField("energyUsage", e.target.value)}
                />
              )}
              {renderFieldWithTooltip(
                "CO2 Emissions (kg/ton)",
                "Direct and indirect CO2 emissions per ton of production",
                <Input
                  type="number"
                  data-testid="input-emissions"
                  placeholder="e.g., 2500"
                  value={formData.emissions}
                  onChange={(e) => updateField("emissions", e.target.value)}
                />
              )}
              {renderFieldWithTooltip(
                "Transport Distance (km)",
                "Average distance for raw material transportation",
                <Input
                  type="number"
                  data-testid="input-transport-distance"
                  placeholder="e.g., 500"
                  value={formData.transportDistance}
                  onChange={(e) => updateField("transportDistance", e.target.value)}
                />
              )}
              {renderFieldWithTooltip(
                "Water Consumption (L/ton)",
                "Total water used in production process",
                <Input
                  type="number"
                  data-testid="input-water-consumption"
                  placeholder="e.g., 5000"
                  value={formData.waterConsumption}
                  onChange={(e) => updateField("waterConsumption", e.target.value)}
                />
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Process Details</h3>
              <p className="text-muted-foreground">
                Specify your manufacturing process parameters
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderFieldWithTooltip(
                "Process Type",
                "Primary production method used in your facility",
                <Select
                  value={formData.processType}
                  onValueChange={(value) => updateField("processType", value)}
                >
                  <SelectTrigger data-testid="select-process-type">
                    <SelectValue placeholder="Select process type" />
                  </SelectTrigger>
                  <SelectContent>
                    {formData.material === "aluminium" && (
                      <>
                        <SelectItem value="hall-heroult">Hall-Heroult Process</SelectItem>
                        <SelectItem value="bayer">Bayer Process</SelectItem>
                        <SelectItem value="recycling">Secondary Recycling</SelectItem>
                      </>
                    )}
                    {formData.material === "copper" && (
                      <>
                        <SelectItem value="pyrometallurgical">Pyrometallurgical</SelectItem>
                        <SelectItem value="hydrometallurgical">Hydrometallurgical</SelectItem>
                        <SelectItem value="electrorefining">Electrorefining</SelectItem>
                      </>
                    )}
                    {formData.material === "steel" && (
                      <>
                        <SelectItem value="bof">Basic Oxygen Furnace (BOF)</SelectItem>
                        <SelectItem value="eaf">Electric Arc Furnace (EAF)</SelectItem>
                        <SelectItem value="dri">Direct Reduced Iron (DRI)</SelectItem>
                      </>
                    )}
                    {!formData.material && (
                      <SelectItem value="generic">Generic Process</SelectItem>
                    )}
                  </SelectContent>
                </Select>
              )}
              {renderFieldWithTooltip(
                "Production Volume (tons/year)",
                "Annual production capacity of your facility",
                <Input
                  type="number"
                  data-testid="input-production-volume"
                  placeholder="e.g., 50000"
                  value={formData.productionVolume}
                  onChange={(e) => updateField("productionVolume", e.target.value)}
                />
              )}
              {renderFieldWithTooltip(
                "Raw Material Source",
                "Primary source of raw materials",
                <Select
                  value={formData.rawMaterialSource}
                  onValueChange={(value) => updateField("rawMaterialSource", value)}
                >
                  <SelectTrigger data-testid="select-raw-material-source">
                    <SelectValue placeholder="Select source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="domestic">Domestic Mining</SelectItem>
                    <SelectItem value="imported">Imported Ore</SelectItem>
                    <SelectItem value="recycled">Recycled Scrap</SelectItem>
                    <SelectItem value="mixed">Mixed Sources</SelectItem>
                  </SelectContent>
                </Select>
              )}
              {renderFieldWithTooltip(
                "Waste Generated (kg/ton)",
                "Total solid waste produced per ton of output",
                <Input
                  type="number"
                  data-testid="input-waste-generated"
                  placeholder="e.g., 300"
                  value={formData.wasteGenerated}
                  onChange={(e) => updateField("wasteGenerated", e.target.value)}
                />
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Review Your Data</h3>
              <p className="text-muted-foreground">
                Verify your inputs before submitting for analysis
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: "Material", value: formData.material?.toUpperCase() },
                { label: "Energy Usage", value: formData.energyUsage ? `${formData.energyUsage} kWh/ton` : "Not provided" },
                { label: "CO2 Emissions", value: formData.emissions ? `${formData.emissions} kg/ton` : "Not provided" },
                { label: "Transport Distance", value: formData.transportDistance ? `${formData.transportDistance} km` : "Not provided" },
                { label: "Process Type", value: formData.processType || "Not provided" },
                { label: "Production Volume", value: formData.productionVolume ? `${formData.productionVolume} tons/year` : "Not provided" },
                { label: "Raw Material Source", value: formData.rawMaterialSource || "Not provided" },
                { label: "Water Consumption", value: formData.waterConsumption ? `${formData.waterConsumption} L/ton` : "Not provided" },
              ].map((item, i) => (
                <div key={i} className="p-4 bg-muted/50 rounded-md">
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className="font-medium">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <WorkflowStepper steps={formSteps} currentStep={currentStep} />

        <GlassCard>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between mt-8 pt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={handleBack}
              data-testid="button-form-back"
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>

            {currentStep < formSteps.length - 1 ? (
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                data-testid="button-form-next"
                className="gap-2"
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                data-testid="button-form-submit"
                className="gap-2"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    Start Analysis
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            )}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
