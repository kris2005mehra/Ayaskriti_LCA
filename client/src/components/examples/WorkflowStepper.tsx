import WorkflowStepper from "../WorkflowStepper";

const steps = [
  { id: "input", title: "Data Input" },
  { id: "preprocess", title: "Processing" },
  { id: "predict", title: "Prediction" },
  { id: "lca", title: "LCA Engine" },
  { id: "dashboard", title: "Dashboard" },
  { id: "report", title: "Report" },
];

export default function WorkflowStepperExample() {
  return (
    <div className="p-8 bg-background">
      <WorkflowStepper steps={steps} currentStep={2} />
    </div>
  );
}
