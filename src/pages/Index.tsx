import { Link } from "react-router-dom";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Button } from "@/components/ui/button";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { UserPlus, AlertTriangle, ShieldCheck, Brain, Radio, Users, Activity, CheckCircle2, TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useStats } from "@/hooks/useLocalStorage";

const Index = () => {
  const { t } = useLanguage();
  const stats = useStats();

  return (
    <MobileLayout showFooter>
      {/* Hero Section */}
      <section className="text-center mb-8 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-xs font-semibold text-primary">Confluence 1.0 Hackathon</span>
        </div>
        
        <h1 className="text-3xl font-extrabold text-foreground mb-3 leading-tight text-balance">
          {t("heroTitle")}
        </h1>
        <p className="text-muted-foreground text-base leading-relaxed mb-2 max-w-sm mx-auto">
          {t("heroSubtitle")}
        </p>
        <p className="text-sm text-primary font-bold tracking-wide">
          {t("tagline")}
        </p>
      </section>

      {/* Live Stats Dashboard */}
      <section className="mb-8 animate-slide-up" style={{ animationDelay: "100ms" }}>
        <div className="grid grid-cols-3 gap-3">
          <div className="stat-card hover-lift">
            <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-2">
              <Users className="w-4 h-4 text-primary" />
            </div>
            <div className="stat-value text-primary">{stats.totalVolunteers}</div>
            <div className="stat-label">{t("trustedVolunteers")}</div>
          </div>
          <div className="stat-card hover-lift">
            <div className="w-8 h-8 rounded-xl bg-destructive/10 flex items-center justify-center mx-auto mb-2">
              <Activity className="w-4 h-4 text-destructive" />
            </div>
            <div className="stat-value text-destructive">{stats.pendingEmergencies}</div>
            <div className="stat-label">Active Alerts</div>
          </div>
          <div className="stat-card hover-lift">
            <div className="w-8 h-8 rounded-xl bg-success/10 flex items-center justify-center mx-auto mb-2">
              <CheckCircle2 className="w-4 h-4 text-success" />
            </div>
            <div className="stat-value text-success">{stats.tasksCompletedTotal}</div>
            <div className="stat-label">Tasks Done</div>
          </div>
        </div>
      </section>

      {/* CTA Buttons */}
      <section className="space-y-4 mb-10 animate-slide-up" style={{ animationDelay: "200ms" }}>
        <Link to="/volunteer" className="block">
          <Button variant="hero" className="w-full group">
            <UserPlus className="w-5 h-5 group-hover:scale-110 transition-transform" />
            {t("becomeVolunteer")}
            <TrendingUp className="w-4 h-4 ml-auto opacity-50" />
          </Button>
        </Link>
        <Link to="/emergency" className="block">
          <Button variant="hero-outline" className="w-full group">
            <AlertTriangle className="w-5 h-5 group-hover:scale-110 transition-transform" />
            {t("requestHelp")}
          </Button>
        </Link>
      </section>

      {/* Feature Cards */}
      <section className="animate-slide-up" style={{ animationDelay: "300ms" }}>
        <h2 className="section-title flex items-center gap-2">
          <span className="w-1 h-5 rounded-full bg-primary" />
          {t("howItWorks")}
        </h2>
        <div className="space-y-4">
          <FeatureCard
            icon={ShieldCheck}
            title={t("trustedVolunteers")}
            description={t("trustedVolunteersDesc")}
            delay={100}
          />
          <FeatureCard
            icon={Brain}
            title={t("smartMatching")}
            description={t("smartMatchingDesc")}
            delay={200}
          />
          <FeatureCard
            icon={Radio}
            title={t("taskCoordination")}
            description={t("taskCoordinationDesc")}
            delay={300}
          />
        </div>
      </section>

      {/* Quick Actions */}
      <section className="mt-10 animate-slide-up" style={{ animationDelay: "400ms" }}>
        <h2 className="section-title flex items-center gap-2">
          <span className="w-1 h-5 rounded-full bg-success" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <Link to="/matching">
            <div className="card-elevated p-4 text-center hover-lift cursor-pointer">
              <Users className="w-6 h-6 text-primary mx-auto mb-2" />
              <span className="text-sm font-semibold text-foreground">{t("matching")}</span>
              <p className="text-xs text-muted-foreground mt-1">{stats.pendingEmergencies} pending</p>
            </div>
          </Link>
          <Link to="/tasks">
            <div className="card-elevated p-4 text-center hover-lift cursor-pointer">
              <Activity className="w-6 h-6 text-success mx-auto mb-2" />
              <span className="text-sm font-semibold text-foreground">{t("tasks")}</span>
              <p className="text-xs text-muted-foreground mt-1">{stats.activeTasks} active</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Trust Indicator */}
      <section className="mt-10 text-center animate-fade-in" style={{ animationDelay: "500ms" }}>
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-success/10 border border-success/20">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-sm font-semibold text-success">
            {t("prototypeDemo")}
          </span>
        </div>
      </section>
    </MobileLayout>
  );
};

export default Index;