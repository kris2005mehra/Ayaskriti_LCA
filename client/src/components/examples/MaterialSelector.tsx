import { useState } from "react";
import MaterialSelector, { type MaterialType } from "../MaterialSelector";

export default function MaterialSelectorExample() {
  const [selected, setSelected] = useState<MaterialType | null>("copper");

  return (
    <div className="p-8 bg-background">
      <MaterialSelector selected={selected} onSelect={setSelected} />
    </div>
  );
}
