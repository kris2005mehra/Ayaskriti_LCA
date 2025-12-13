import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

import AuthPage from "@/components/AuthPage";
import Header from "@/components/Header";
import DataInputForm, { type FormData } from "@/components/DataInputForm";
import ProcessingOverlay from "@/components/ProcessingOverlay";
import Dashboard from "@/components/Dashboard";
import ModifyInputsDialog from "@/components/ModifyInputsDialog";
import RecommendationsPage from "@/components/RecommendationsPage";

type AppView = "auth" | "input" | "processing" | "dashboard" | "modify" | "report";

interface User {
  username: string;
  email: string;
}

function AyaskritiApp() {
  const [view, setView] = useState<AppView>("auth");
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [processingStep, setProcessingStep] = useState(0);
  const [processingProgress, setProcessingProgress] = useState(0);
  const { toast } = useToast();

  // todo: remove mock functionality - simulate processing
  const simulateProcessing = async () => {
    const steps = 4;
    const totalDuration = 4000;
    const stepDuration = totalDuration / steps;

    for (let i = 0; i < steps; i++) {
      setProcessingStep(i);
      const startProgress = (i / steps) * 100;
      const endProgress = ((i + 1) / steps) * 100;
      
      const progressInterval = setInterval(() => {
        setProcessingProgress((prev) => {
          if (prev >= endProgress - 5) {
            clearInterval(progressInterval);
            return endProgress;
          }
          return prev + 2;
        });
      }, stepDuration / 10);

      await new Promise((resolve) => setTimeout(resolve, stepDuration));
      clearInterval(progressInterval);
      setProcessingProgress(endProgress);
    }
  };

  const handleAuthenticate = (authenticatedUser: User) => {
    setUser(authenticatedUser);
    setView("input");
    toast({
      title: "Welcome to AYASKRITI",
      description: `Signed in as ${authenticatedUser.username}`,
    });
  };

  const handleLogout = () => {
    setUser(null);
    setFormData(null);
    setView("auth");
    toast({
      title: "Signed out",
      description: "You have been successfully logged out",
    });
  };

  const handleFormSubmit = async (data: FormData) => {
    setFormData(data);
    setView("processing");
    setProcessingStep(0);
    setProcessingProgress(0);

    await simulateProcessing();
    
    setView("dashboard");
    toast({
      title: "Analysis Complete",
      description: "Your sustainability analysis is ready",
    });
  };

  const handleDashboardProceed = () => {
    setView("modify");
  };

  const handleModifyInputs = () => {
    setView("input");
  };

  const handleContinueToReport = () => {
    setView("report");
  };

  const handleBackToDashboard = () => {
    setView("dashboard");
  };

  const handleExportReport = () => {
    // todo: remove mock functionality - implement actual Excel export
    toast({
      title: "Report Exported",
      description: "Your Excel report has been downloaded",
    });
  };

  const handleNewAnalysis = () => {
    setFormData(null);
    setView("input");
  };

  const handleBackFromInput = () => {
    if (formData) {
      setView("dashboard");
    } else {
      setView("auth");
    }
  };

  // Load theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {view === "auth" && (
          <motion.div
            key="auth"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <AuthPage onAuthenticate={handleAuthenticate} />
          </motion.div>
        )}

        {view === "input" && (
          <motion.div
            key="input"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Header user={user || undefined} onLogout={handleLogout} />
            <DataInputForm onSubmit={handleFormSubmit} onBack={handleBackFromInput} />
          </motion.div>
        )}

        {view === "processing" && (
          <motion.div
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ProcessingOverlay
              currentStep={processingStep}
              progress={processingProgress}
            />
          </motion.div>
        )}

        {view === "dashboard" && formData && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Header user={user || undefined} onLogout={handleLogout} />
            <Dashboard formData={formData} onProceed={handleDashboardProceed} />
          </motion.div>
        )}

        {view === "modify" && (
          <ModifyInputsDialog
            isOpen={true}
            onModify={handleModifyInputs}
            onContinue={handleContinueToReport}
            summary={{
              co2Emissions: "2,450 kg",
              energyIntensity: "14.5 kWh",
              sustainabilityScore: "78/100",
            }}
          />
        )}

        {view === "report" && formData && (
          <motion.div
            key="report"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Header user={user || undefined} onLogout={handleLogout} />
            <RecommendationsPage
              formData={formData}
              onBack={handleBackToDashboard}
              onExport={handleExportReport}
              onNewAnalysis={handleNewAnalysis}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <AyaskritiApp />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
