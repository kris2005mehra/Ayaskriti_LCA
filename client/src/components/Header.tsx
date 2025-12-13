import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Flame, LogOut, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

interface HeaderProps {
  user?: { username: string; email: string };
  onLogout?: () => void;
}

export default function Header({ user, onLogout }: HeaderProps) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle("dark", newIsDark);
    localStorage.setItem("theme", newIsDark ? "dark" : "light");
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-primary flex items-center justify-center">
            <Flame className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">AYASKRITI</h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            data-testid="button-toggle-theme"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>

          {user && (
            <>
              <div className="hidden sm:block text-right mr-2">
                <p className="text-sm font-medium">{user.username}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onLogout}
                data-testid="button-logout"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </>
          )}
        </div>
      </div>
    </motion.header>
  );
}
