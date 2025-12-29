import { Phone, Mail, Shield } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="mt-auto pt-8 pb-24 border-t border-border/50">
      <div className="space-y-6">
        {/* Brand */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-xl gradient-hero flex items-center justify-center">
              <Shield className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg text-foreground">AidLink</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Right Skill. Right Place. Right Time.
          </p>
        </div>

        {/* Team */}
        <div className="text-center">
          <p className="text-xs font-semibold text-muted-foreground mb-1">
            Team 404: Competition Not Found
          </p>
          <p className="text-xs text-muted-foreground">
            Kartavya • Abhishek • Ketan
          </p>
        </div>

        {/* Contact */}
        <div className="flex flex-col items-center gap-2">
          <a 
            href="tel:+919982221026" 
            className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            +91 9982221026
          </a>
          <a 
            href="mailto:sainikartavya40@gmail.com" 
            className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
            sainikartavya40@gmail.com
          </a>
        </div>

        {/* Disclaimer */}
        <div className="text-center pt-4 border-t border-border/30">
          <p className="text-[10px] text-muted-foreground/70 leading-relaxed max-w-xs mx-auto">
            {t("simulatedDataDisclaimer")}
          </p>
          <p className="text-[10px] text-muted-foreground/50 mt-2">
            Confluence 1.0 – Fight For The Top 10
          </p>
        </div>
      </div>
    </footer>
  );
};