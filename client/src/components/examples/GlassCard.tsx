import GlassCard from "../GlassCard";

export default function GlassCardExample() {
  return (
    <div className="p-8 bg-background min-h-[300px] flex items-center justify-center">
      <GlassCard className="max-w-md">
        <h3 className="text-xl font-semibold mb-2">Glassmorphic Card</h3>
        <p className="text-muted-foreground">
          Premium glass effect with backdrop blur and subtle borders for the AYASKRITI platform.
        </p>
      </GlassCard>
    </div>
  );
}
