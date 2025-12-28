import { MobileLayout } from "@/components/layout/MobileLayout";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Shield, FileCheck, Award, Users, Info, CheckCircle2, Clock, AlertCircle } from "lucide-react";

const TrustVerification = () => {
  return (
    <MobileLayout>
      <div className="animate-fade-in">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            Trust & Verification
          </h1>
        </div>
        <p className="text-muted-foreground mb-6">
          Building trust through verified credentials and endorsements.
        </p>

        {/* Credential Wallet */}
        <section className="mb-8">
          <h2 className="section-title flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-primary" />
            Credential Wallet
          </h2>
          
          <div className="space-y-3">
            <div className="card-elevated animate-slide-up" style={{ animationDelay: "100ms" }}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Government ID</h3>
                    <p className="text-xs text-muted-foreground">Aadhaar / Voter ID</p>
                  </div>
                </div>
                <StatusBadge status="verified" />
              </div>
            </div>

            <div className="card-elevated animate-slide-up" style={{ animationDelay: "200ms" }}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-warning" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">First Aid Certificate</h3>
                    <p className="text-xs text-muted-foreground">Red Cross / St. John's</p>
                  </div>
                </div>
                <StatusBadge status="pending" />
              </div>
            </div>

            <div className="card-elevated animate-slide-up" style={{ animationDelay: "300ms" }}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Driving License</h3>
                    <p className="text-xs text-muted-foreground">Valid LMV License</p>
                  </div>
                </div>
                <StatusBadge status="verified" />
              </div>
            </div>
          </div>
        </section>

        {/* Endorsement System */}
        <section className="mb-8">
          <h2 className="section-title flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            Endorsements
          </h2>
          
          <div className="card-elevated animate-slide-up" style={{ animationDelay: "400ms" }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">NGO Endorsements</h3>
                <p className="text-sm text-muted-foreground">Vouched by verified organizations</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium text-foreground text-sm">Delhi Disaster Relief</p>
                  <p className="text-xs text-muted-foreground">Endorsed for Rescue Operations</p>
                </div>
                <CheckCircle2 className="w-5 h-5 text-success" />
              </div>
              
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium text-foreground text-sm">Red Cross Delhi</p>
                  <p className="text-xs text-muted-foreground">Endorsed for First Aid</p>
                </div>
                <CheckCircle2 className="w-5 h-5 text-success" />
              </div>
            </div>
          </div>
        </section>

        {/* Background Check - Future Scope */}
        <section className="mb-6">
          <h2 className="section-title flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-muted-foreground" />
            Background Verification
          </h2>
          
          <div className="card-elevated bg-muted/50 border-dashed animate-slide-up" style={{ animationDelay: "500ms" }}>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                <Shield className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-medium text-muted-foreground">Police Verification</h3>
                <p className="text-xs text-muted-foreground">Future Scope Feature</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Comprehensive background checks will be available in future versions for enhanced trust.
            </p>
          </div>
        </section>

        {/* Disclaimer */}
        <div className="p-4 bg-muted rounded-xl flex items-start gap-3 animate-fade-in" style={{ animationDelay: "600ms" }}>
          <Info className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground">
            Verification features are conceptual and shown for prototype clarity. In production, this would integrate with government databases and verification APIs.
          </p>
        </div>
      </div>
    </MobileLayout>
  );
};

export default TrustVerification;
