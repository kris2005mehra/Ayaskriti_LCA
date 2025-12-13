import ModifyInputsDialog from "../ModifyInputsDialog";

export default function ModifyInputsDialogExample() {
  return (
    <ModifyInputsDialog
      isOpen={true}
      onModify={() => console.log("Modify clicked")}
      onContinue={() => console.log("Continue clicked")}
      summary={{
        co2Emissions: "2,450 kg",
        energyIntensity: "15.2 kWh",
        sustainabilityScore: "78/100",
      }}
    />
  );
}
