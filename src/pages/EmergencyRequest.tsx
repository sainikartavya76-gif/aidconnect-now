import { useState } from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { AlertTriangle, MapPin, CheckCircle2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const emergencyTypes = [
  { id: "flood", label: "Flood", icon: "🌊" },
  { id: "fire", label: "Fire", icon: "🔥" },
  { id: "medical", label: "Medical", icon: "🏥" },
  { id: "accident", label: "Accident", icon: "🚗" },
  { id: "infrastructure", label: "Infrastructure Damage", icon: "🏗️" },
  { id: "other", label: "Other", icon: "⚠️" },
];

const requiredSkills = [
  "First Aid",
  "Medical Help",
  "Driving",
  "Rescue Operations",
  "Logistics",
  "Electrical/Technical Support",
  "Communication Support",
];

const urgencyLevels = ["low", "medium", "high"] as const;

const EmergencyRequest = () => {
  const [formData, setFormData] = useState({
    type: "",
    location: "",
    skill: "",
    urgency: "" as "" | "low" | "medium" | "high",
    description: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.type || !formData.location || !formData.skill || !formData.urgency) {
      toast({
        title: "Please complete all required fields",
        variant: "destructive",
      });
      return;
    }
    setSubmitted(true);
    toast({
      title: "Emergency Request Submitted",
      description: "Matching volunteers will be notified.",
    });
  };

  if (submitted) {
    return (
      <MobileLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-fade-in">
          <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mb-6">
            <CheckCircle2 className="w-10 h-10 text-success" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-3">
            Request Submitted!
          </h1>
          <p className="text-muted-foreground mb-6 max-w-xs">
            Your emergency request has been logged. Matching volunteers are being identified.
          </p>
          <div className="card-elevated w-full max-w-sm text-left">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-muted-foreground">
                Request Status
              </span>
              <StatusBadge status="pending" />
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Type</span>
                <span className="font-medium capitalize">{formData.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Location</span>
                <span className="font-medium">{formData.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Required Skill</span>
                <span className="font-medium">{formData.skill}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Urgency</span>
                <StatusBadge urgency={formData.urgency as "low" | "medium" | "high"} />
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            className="mt-6"
            onClick={() => {
              setSubmitted(false);
              setFormData({ type: "", location: "", skill: "", urgency: "", description: "" });
            }}
          >
            Submit Another Request
          </Button>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      <div className="animate-fade-in">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-destructive" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            Request Help
          </h1>
        </div>
        <p className="text-muted-foreground mb-6">
          Submit an emergency request for NGO or coordinator response.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Emergency Type */}
          <div>
            <label className="form-label">Emergency Type</label>
            <div className="grid grid-cols-3 gap-3">
              {emergencyTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, type: type.id })}
                  className={`p-4 rounded-xl border-2 transition-all text-center ${
                    formData.type === type.id
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card hover:border-muted-foreground/30"
                  }`}
                >
                  <span className="text-2xl block mb-1">{type.icon}</span>
                  <span className="text-xs font-medium text-foreground">{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="form-label">Location</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Enter location or address"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="input-mobile pl-12"
              />
            </div>
          </div>

          {/* Required Skill */}
          <div>
            <label className="form-label">Required Skill</label>
            <div className="flex flex-wrap gap-2">
              {requiredSkills.map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => setFormData({ ...formData, skill })}
                  className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                    formData.skill === skill
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border bg-card text-foreground hover:border-muted-foreground/30"
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          {/* Urgency Level */}
          <div>
            <label className="form-label">Urgency Level</label>
            <div className="grid grid-cols-3 gap-3">
              {urgencyLevels.map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setFormData({ ...formData, urgency: level })}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    formData.urgency === level
                      ? level === "low"
                        ? "border-success bg-success/5"
                        : level === "medium"
                        ? "border-warning bg-warning/5"
                        : "border-destructive bg-destructive/5"
                      : "border-border bg-card hover:border-muted-foreground/30"
                  }`}
                >
                  <StatusBadge urgency={level} className="justify-center w-full" />
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="form-label">Additional Details (Optional)</label>
            <Textarea
              placeholder="Describe the emergency situation..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="min-h-[100px] text-base rounded-xl"
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" variant="hero" className="w-full">
            <AlertTriangle className="w-5 h-5" />
            Submit Emergency Request
          </Button>
        </form>
      </div>
    </MobileLayout>
  );
};

export default EmergencyRequest;
