import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, UserPlus, AlertTriangle, Users, ClipboardList, Shield, Info, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

interface MobileLayoutProps {
  children: ReactNode;
  showNav?: boolean;
}

const navItems = [
  { icon: Home, labelKey: "home", path: "/" },
  { icon: UserPlus, labelKey: "volunteer", path: "/volunteer" },
  { icon: AlertTriangle, labelKey: "emergency", path: "/emergency" },
  { icon: Users, labelKey: "matching", path: "/matching" },
  { icon: ClipboardList, labelKey: "tasks", path: "/tasks" },
];

export function MobileLayout({ children, showNav = true }: MobileLayoutProps) {
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "hi" : "en");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border px-4 py-3">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold text-foreground">{t("aidlink")}</span>
          </Link>
          
          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
            >
              <Globe className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">
                {language === "en" ? "हिं" : "EN"}
              </span>
            </button>
            
            <Link 
              to="/about" 
              className={cn(
                "p-2 rounded-lg transition-colors",
                location.pathname === "/about" 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:bg-muted"
              )}
            >
              <Info className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-md mx-auto px-4 py-6">
          {children}
        </div>
      </main>

      {/* Bottom Navigation */}
      {showNav && (
        <nav className="sticky bottom-0 bg-card/95 backdrop-blur-sm border-t border-border safe-area-inset">
          <div className="max-w-md mx-auto px-2 py-2">
            <div className="flex items-center justify-around">
              {navItems.map(({ icon: Icon, labelKey, path }) => {
                const isActive = location.pathname === path;
                return (
                  <Link
                    key={path}
                    to={path}
                    className={cn(
                      "flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all min-w-[60px]",
                      isActive
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    <Icon className={cn("w-5 h-5", isActive && "stroke-[2.5px]")} />
                    <span className="text-xs font-medium">{t(labelKey)}</span>
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
