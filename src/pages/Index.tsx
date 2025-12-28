import { Link } from "react-router-dom";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Button } from "@/components/ui/button";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { UserPlus, AlertTriangle, ShieldCheck, Brain, Radio } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const { t } = useLanguage();

  return (
    <MobileLayout>
      {/* Hero Section */}
      <section className="text-center mb-10 animate-fade-in">
        <h1 className="text-2xl font-bold text-foreground mb-3 leading-tight text-balance">
          {t("heroTitle")}
        </h1>
        <p className="text-muted-foreground text-base leading-relaxed mb-3">
          {t("heroSubtitle")}
        </p>
        <p className="text-sm text-primary font-medium">
          {t("tagline")}
        </p>
      </section>

      {/* CTA Buttons */}
      <section className="space-y-4 mb-12">
        <Link to="/volunteer" className="block">
          <Button variant="hero" className="w-full">
            <UserPlus className="w-5 h-5" />
            {t("becomeVolunteer")}
          </Button>
        </Link>
        <Link to="/emergency" className="block">
          <Button variant="hero-outline" className="w-full">
            <AlertTriangle className="w-5 h-5" />
            {t("requestHelp")}
          </Button>
        </Link>
      </section>

      {/* Feature Cards */}
      <section>
        <h2 className="section-title">{t("howItWorks")}</h2>
        <div className="space-y-5">
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

      {/* Trust Indicator */}
      <section className="mt-10 text-center animate-fade-in" style={{ animationDelay: "400ms" }}>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse-gentle" />
          <span className="text-sm text-muted-foreground">
            {t("prototypeDemo")}
          </span>
        </div>
      </section>
    </MobileLayout>
  );
};

export default Index;
