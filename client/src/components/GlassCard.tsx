import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}

export default function GlassCard({ children, className, animate = true }: GlassCardProps) {
  const Wrapper = animate ? motion.div : "div";
  const motionProps = animate
    ? {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4, ease: "easeOut" },
      }
    : {};

  return (
    <Wrapper
      {...motionProps}
      className={cn(
        "relative rounded-md p-6",
        "bg-card/80 backdrop-blur-xl",
        "border border-card-border/50",
        "shadow-lg",
        className
      )}
    >
      {children}
    </Wrapper>
  );
}
