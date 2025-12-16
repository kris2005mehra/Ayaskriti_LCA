import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GlassCard from "./GlassCard";
import { Factory, Flame, Mail, Lock, User, ArrowRight, Loader2 } from "lucide-react";
import foundryImage from "../assets/back_image.png";

interface AuthPageProps {
  onAuthenticate: (user: { username: string; email: string }) => void;
}

export default function AuthPage({ onAuthenticate }: AuthPageProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // todo: remove mock functionality - simulate auth delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    onAuthenticate({
      username: formData.username || formData.email.split("@")[0],
      email: formData.email,
    });
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Video/Image Background */}
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
  className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
>
  <div
    className="absolute inset-0 bg-cover bg-center"
    style={{ backgroundImage: `url(${foundryImage})` }}
  />

  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

  {/* 🔥 RIGHT EDGE ORANGE GLOW */}
  <div className="pointer-events-none absolute top-0 right-0 h-full w-20">
    <div className="h-full w-full bg-gradient-to-l from-orange-500/60 via-orange-400/30 to-transparent blur-2xl animate-orangeGlow" />
  </div>

  {/* 🔥 SUBTLE EMBER EFFECT */}
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    {[...Array(8)].map((_, i) => (
      <span
        key={i}
        className="absolute bottom-0 w-1 h-1 bg-orange-400/70 rounded-full animate-ember"
        style={{
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${4 + Math.random() * 4}s`,
        }}
      />
    ))}
  </div>

  <div className="relative z-10 flex flex-col justify-between p-12 text-white">
    {/* --- EVERYTHING BELOW UNCHANGED --- */}

    <div className="flex items-center gap-3">
      <div className="w-12 h-12 rounded-md bg-primary/90 flex items-center justify-center">
        <Flame className="w-7 h-7 text-white" />
      </div>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">AYASKRITI</h1>
        <p className="text-sm text-white/70">Sustainable Metallurgy</p>
      </div>
    </div>

    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-4xl font-bold leading-tight">
          AI-Powered
          <br />
          <span className="text-primary">Life Cycle Analysis</span>
          <br />
          for Indian Metallurgy
        </h2>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="text-lg text-white/80 max-w-md"
      >
        Transform sustainability in aluminium, copper, and steel sectors with
        intelligent parameter estimation and comprehensive LCA reports.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="flex gap-8 pt-4"
      >
        {[
          { icon: Factory, label: "Industry-Ready" },
          { icon: Flame, label: "Real-Time Analysis" },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-2 text-white/70">
            <item.icon className="w-5 h-5 text-primary" />
            <span className="text-sm">{item.label}</span>
          </div>
        ))}
      </motion.div>
    </div>

    <p className="text-sm text-white/50">
      Empowering sustainable manufacturing across India
    </p>
  </div>
</motion.div>

      {/* Right Panel - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="w-10 h-10 rounded-md bg-primary flex items-center justify-center">
              <Flame className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold">AYASKRITI</h1>
          </div>

          <GlassCard className="p-8 auth-hover-board">

            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">
                {isLogin ? "Welcome Back" : "Create Account"}
              </h2>
              <p className="text-muted-foreground">
                {isLogin
                  ? "Sign in to access your sustainability dashboard"
                  : "Start your journey to sustainable metallurgy"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <AnimatePresence mode="wait">
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="username">Username</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="username"
                        data-testid="input-username"
                        placeholder="Enter username"
                        className="pl-10"
                        value={formData.username}
                        onChange={(e) =>
                          setFormData({ ...formData, username: e.target.value })
                        }
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    data-testid="input-email"
                    placeholder="you@company.com"
                    className="pl-10"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    data-testid="input-password"
                    placeholder="Enter password"
                    className="pl-10"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <AnimatePresence mode="wait">
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        data-testid="input-confirm-password"
                        placeholder="Confirm password"
                        className="pl-10"
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          setFormData({ ...formData, confirmPassword: e.target.value })
                        }
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <Button
                type="submit"
                data-testid="button-auth-submit"
                className="w-full gap-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    {isLogin ? "Sign In" : "Create Account"}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                type="button"
                data-testid="button-toggle-auth-mode"
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {isLogin
                  ? "Don't have an account? Sign up"
                  : "Already have an account? Sign in"}
              </button>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
