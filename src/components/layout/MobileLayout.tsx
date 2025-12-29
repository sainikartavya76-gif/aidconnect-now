import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, UserPlus, AlertTriangle, Users, ClipboardList, Shield, Info, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { Footer } from "./Footer";

interface MobileLayoutProps {
  children: ReactNode;
  showNav?: boolean;
  showFooter?: boolean;
}

const navItems = [
  { icon: Home, labelKey: "home", path: "/" },
  { icon: UserPlus, labelKey: "volunteer", path: "/volunteer" },
  { icon: AlertTriangle, labelKey: "emergency", path: "/emergency" },
  { icon: Users, labelKey: "matching", path: "/matching" },
  { icon: ClipboardList, labelKey: "tasks", path: "/tasks" },
];

export function MobileLayout({ children, showNav = true, showFooter = false }: MobileLayoutProps) {
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "hi" : "en");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border/50 px-4 py-3 shadow-sm">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl gradient-hero flex items-center justify-center shadow-md group-hover:shadow-glow transition-shadow duration-300">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-foreground leading-tight">{t("aidlink")}</span>
              <span className="text-[10px] text-muted-foreground font-medium -mt-0.5 hidden sm:block">Right Skill. Right Place.</span>
            </div>
          </Link>
          
          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-muted/80 hover:bg-muted transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <Globe className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">
                {language === "en" ? "हिं" : "EN"}
              </span>
            </button>
            
            <Link 
              to="/about" 
              className={cn(
                "p-2.5 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95",
                location.pathname === "/about" 
                  ? "bg-primary text-primary-foreground shadow-md" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Info className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-md mx-auto px-5 py-6">
          {children}
          {showFooter && <Footer />}
        </div>
      </main>

      {/* Bottom Navigation */}
      {showNav && (
        <nav className="sticky bottom-0 z-50 bg-card/80 backdrop-blur-xl border-t border-border/50 safe-area-inset shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)]">
          <div className="max-w-md mx-auto px-2 py-2">
            <div className="flex items-center justify-around">
              {navItems.map(({ icon: Icon, labelKey, path }) => {
                const isActive = location.pathname === path;
                return (
                  <Link
                    key={path}
                    to={path}
                    className={cn(
                      "flex flex-col items-center gap-1 px-3 py-2 rounded-2xl transition-all duration-200 min-w-[56px]",
                      isActive
                        ? "text-primary-foreground bg-primary shadow-md"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted active:scale-95"
                    )}
                  >
                    <Icon className={cn("w-5 h-5", isActive && "stroke-[2.5px]")} />
                    <span className={cn("text-[10px] font-semibold", isActive ? "text-primary-foreground" : "")}>{t(labelKey)}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>
      )}
    </div>
  );
}