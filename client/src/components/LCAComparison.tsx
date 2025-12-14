import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowRight, ArrowDownRight, RotateCcw, Recycle, Factory, Trash2, Leaf, Zap } from "lucide-react";

interface LCAComparisonProps {
  material: string;
  circularScore: number;
  linearScore: number;
}

export default function LCAComparison({ material, circularScore, linearScore }: LCAComparisonProps) {
  const improvement = Math.round(((linearScore - circularScore) / linearScore) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="rounded-md border border-card-border bg-card/80 backdrop-blur-sm overflow-hidden"
    >
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-md bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
            <Recycle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">LCA Model Comparison</h3>
            <p className="text-sm text-muted-foreground">Circular Economy vs Linear Economy</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Linear LCA */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="font-semibold">Linear Economy Model</span>
              <span className="text-xs text-muted-foreground ml-auto">Traditional</span>
            </div>
            
            <div className="relative">
              {/* Linear Flow Diagram */}
              <div className="flex items-center justify-between">
                {[
                  { icon: Factory, label: "Extract", color: "from-zinc-500 to-zinc-600" },
                  { icon: Zap, label: "Produce", color: "from-orange-500 to-orange-600" },
                  { icon: ArrowRight, label: "Use", color: "from-blue-500 to-blue-600" },
                  { icon: Trash2, label: "Dispose", color: "from-red-500 to-red-600" },
                ].map((step, i) => (
                  <motion.div
                    key={step.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex flex-col items-center"
                  >
                    <div
                      className={cn(
                        "w-12 h-12 rounded-md bg-gradient-to-br flex items-center justify-center mb-2 shadow-lg",
                        step.color
                      )}
                      style={{
                        transform: "perspective(500px) rotateX(10deg)",
                        boxShadow: "0 10px 30px -10px rgba(0,0,0,0.4)",
                      }}
                    >
                      <step.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xs text-muted-foreground">{step.label}</span>
                  </motion.div>
                ))}
              </div>
              
              {/* Connecting arrows */}
              <div className="absolute top-6 left-[15%] right-[15%] flex justify-between">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex-1 mx-2"
                  >
                    <ArrowRight className="w-4 h-4 text-muted-foreground mx-auto" />
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-md">
              <div className="flex items-center justify-between">
                <span className="text-sm">Total CO₂ Emissions</span>
                <span className="text-2xl font-bold text-red-500">{linearScore.toLocaleString()} kg</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                One-way flow with end-of-life disposal
              </p>
            </div>
          </div>

          {/* Circular LCA */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="font-semibold">Circular Economy Model</span>
              <span className="text-xs text-muted-foreground ml-auto">Sustainable</span>
            </div>

            <div className="relative flex items-center justify-center">
              {/* Circular Flow Diagram */}
              <motion.div
                initial={{ opacity: 0, rotate: -180 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative w-48 h-48"
              >
                {/* Outer ring */}
                <div className="absolute inset-0 rounded-full border-4 border-dashed border-emerald-500/30" />
                
                {/* Animated rotating ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-2 rounded-full border-2 border-emerald-500/50"
                  style={{
                    borderStyle: "solid",
                    borderTopColor: "transparent",
                    borderRightColor: "hsl(var(--primary))",
                  }}
                />

                {/* Center icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-xl"
                    style={{
                      boxShadow: "0 0 40px rgba(16, 185, 129, 0.4)",
                    }}
                  >
                    <RotateCcw className="w-8 h-8 text-white" />
                  </motion.div>
                </div>

                {/* Circular nodes */}
                {[
                  { icon: Factory, label: "Produce", angle: 0 },
                  { icon: ArrowDownRight, label: "Use", angle: 90 },
                  { icon: Recycle, label: "Recycle", angle: 180 },
                  { icon: Leaf, label: "Reuse", angle: 270 },
                ].map((step, i) => {
                  const radians = (step.angle - 90) * (Math.PI / 180);
                  const x = Math.cos(radians) * 80;
                  const y = Math.sin(radians) * 80;
                  
                  return (
                    <motion.div
                      key={step.label}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      className="absolute flex flex-col items-center"
                      style={{
                        left: `calc(50% + ${x}px - 20px)`,
                        top: `calc(50% + ${y}px - 20px)`,
                      }}
                    >
                      <div
                        className="w-10 h-10 rounded-md bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg"
                        style={{
                          transform: "perspective(500px) rotateX(10deg)",
                          boxShadow: "0 8px 20px -8px rgba(16, 185, 129, 0.5)",
                        }}
                      >
                        <step.icon className="w-4 h-4 text-white" />
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-md">
              <div className="flex items-center justify-between">
                <span className="text-sm">Total CO₂ Emissions</span>
                <span className="text-2xl font-bold text-emerald-500">{circularScore.toLocaleString()} kg</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Closed-loop with material recovery
              </p>
            </div>
          </div>
        </div>

        {/* Improvement Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-6 p-4 bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-primary/20 rounded-md border border-emerald-500/30"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold">Circular Economy Advantage</p>
                <p className="text-sm text-muted-foreground">
                  Switching to circular model for {material}
                </p>
              </div>
            </div>
            <div className="text-center sm:text-right">
              <motion.p
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: "spring" }}
                className="text-4xl font-bold text-emerald-500"
              >
                -{improvement}%
              </motion.p>
              <p className="text-sm text-muted-foreground">CO₂ Reduction</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
