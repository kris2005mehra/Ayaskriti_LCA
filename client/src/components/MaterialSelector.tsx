import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Factory, Zap, CircleDot } from "lucide-react";

export type MaterialType = "aluminium" | "copper" | "steel";

interface MaterialSelectorProps {
  selected: MaterialType | null;
  onSelect: (material: MaterialType) => void;
}

const materials: { id: MaterialType; name: string; description: string; color: string; icon: React.ElementType }[] = [
  {
    id: "aluminium",
    name: "Aluminium",
    description: "Lightweight, corrosion-resistant metal",
    color: "from-slate-400 to-slate-300",
    icon: CircleDot,
  },
  {
    id: "copper",
    name: "Copper",
    description: "High conductivity, ductile metal",
    color: "from-orange-500 to-amber-400",
    icon: Zap,
  },
  {
    id: "steel",
    name: "Steel",
    description: "High strength, iron-carbon alloy",
    color: "from-zinc-500 to-zinc-400",
    icon: Factory,
  },
];

export default function MaterialSelector({ selected, onSelect }: MaterialSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {materials.map((material, index) => (
        <motion.button
          key={material.id}
          type="button"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => onSelect(material.id)}
          data-testid={`button-material-${material.id}`}
          className={cn(
            "relative p-6 rounded-md border-2 transition-all duration-300 text-left",
            "hover-elevate active-elevate-2",
            selected === material.id
              ? "border-primary bg-primary/10"
              : "border-border bg-card"
          )}
        >
          <div
            className={cn(
              "w-12 h-12 rounded-md bg-gradient-to-br flex items-center justify-center mb-4",
              material.color
            )}
          >
            <material.icon className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-semibold mb-1">{material.name}</h3>
          <p className="text-sm text-muted-foreground">{material.description}</p>
          {selected === material.id && (
            <motion.div
              layoutId="selected-indicator"
              className="absolute top-3 right-3 w-3 h-3 rounded-full bg-primary"
            />
          )}
        </motion.button>
      ))}
    </div>
  );
}
