import { Link } from "react-router-dom";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Button } from "@/components/ui/button";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { UserPlus, AlertTriangle, ShieldCheck, Brain, Radio } from "lucide-react";

const Index = () => {
  return (
    <MobileLayout>
      {/* Hero Section */}
      <section className="text-center mb-8 animate-fade-in">
        <h1 className="text-2xl font-bold text-foreground mb-3 leading-tight text-balance">
          Connecting Skills to Emergencies
        </h1>
        <p className="text-muted-foreground text-base leading-relaxed mb-2">
          A platform that matches verified citizen skills with nearby emergency needs.
        </p>
        <p className="text-sm text-primary font-medium">
          Right Skill. Right Place. Right Time.
        </p>
      </section>

      {/* CTA Buttons */}
      <section className="space-y-3 mb-10">
        <Link to="/volunteer" className="block">
          <Button variant="hero" className="w-full">
            <UserPlus className="w-5 h-5" />
            Become a Volunteer
          </Button>
        </Link>
        <Link to="/emergency" className="block">
          <Button variant="hero-outline" className="w-full">
            <AlertTriangle className="w-5 h-5" />
            Request Emergency Help
          </Button>
        </Link>
      </section>

      {/* Feature Cards */}
      <section>
        <h2 className="section-title">How AidLink Works</h2>
        <div className="space-y-4">
          <FeatureCard
            icon={ShieldCheck}
            title="Trusted Volunteers"
            description="Verified citizens with validated skills ready to respond when needed most."
            delay={100}
          />
          <FeatureCard
            icon={Brain}
            title="Smart Skill Matching"
            description="Intelligent matching connects the right skills to the right emergencies instantly."
            delay={200}
          />
          <FeatureCard
            icon={Radio}
            title="Live Task Coordination"
            description="Real-time tracking and communication for seamless emergency response."
            delay={300}
          />
        </div>
      </section>

      {/* Trust Indicator */}
      <section className="mt-10 text-center animate-fade-in" style={{ animationDelay: "400ms" }}>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse-gentle" />
          <span className="text-sm text-muted-foreground">
            Prototype for hackathon demonstration
          </span>
        </div>
      </section>
    </MobileLayout>
  );
};

export default Index;
