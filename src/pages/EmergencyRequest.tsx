import { useState } from "react";
import { Link } from "react-router-dom";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { AlertTriangle, MapPin, CheckCircle2, ArrowRight, Siren, Clock, Users } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEmergencies, useStats } from "@/hooks/useLocalStorage";

const emergencyTypes = [
  { id: "flood", labelKey: "flood", icon: "🌊", color: "text-blue-500" },
  { id: "fire", labelKey: "fire", icon: "🔥", color: "text-orange-500" },
  { id: "medical", labelKey: "medical", icon: "🏥", color: "text-red-500" },
  { id: "accident", labelKey: "accident", icon: "🚗", color: "text-yellow-500" },
  { id: "infrastructure", labelKey: "infrastructure", icon: "🏗️", color: "text-gray-500" },
  { id: "other", labelKey: "other", icon: "⚠️", color: "text-purple-500" },
];

const requiredSkillKeys = [
  { key: "firstAid", value: "First Aid" },
  { key: "medicalHelp", value: "Medical Help" },
  { key: "driving", value: "Driving" },
  { key: "rescueOperations", value: "Rescue Operations" },
  { key: "logistics", value: "Logistics" },
  { key: "technicalSupport", value: "Electrical/Technical Support" },
  { key: "communicationSupport", value: "Communication Support" },
];

const urgencyLevels = ["low", "medium", "high"] as const;

const EmergencyRequest = () => {
  const { t } = useLanguage();
  const { addEmergency } = useEmergencies();
  const stats = useStats();
  
  const [formData, setFormData] = useState({
    type: "",
    typeLabel: "",
    location: "",
    skill: "",
    urgency: "" as "" | "low" | "medium" | "high",
    description: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTypeSelect = (typeId: string, labelKey: string) => {
    setFormData({ ...formData, type: typeId, typeLabel: t(labelKey) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.type || !formData.location || !formData.skill || !formData.urgency) {
      toast({
        title: t("pleaseComplete"),
        description: "All fields are required",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Save to localStorage
    addEmergency({
      type: formData.type,
      typeLabel: formData.typeLabel,
      location: formData.location,
      skill: formData.skill,
      urgency: formData.urgency,
      description: formData.description,
    });
    
    setIsSubmitting(false);
    setSubmitted(true);
    toast({
      title: t("requestSubmitted"),
      description: t("matchingVolunteers"),
    });
  };

  if (submitted) {
    return (
      <MobileLayout>
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
          {/* Success Animation */}
          <div className="relative mb-8">
            <div className="w-24 h-24 rounded-full gradient-success flex items-center justify-center animate-bounce-in shadow-glow-success">
              <CheckCircle2 className="w-12 h-12 text-primary-foreground" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary flex items-center justify-center animate-bounce-in" style={{ animationDelay: "200ms" }}>
              <Siren className="w-4 h-4 text-primary-foreground" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-foreground mb-2 animate-fade-in">
            {t("requestSubmitted")}
          </h1>
          <p className="text-muted-foreground mb-8 max-w-xs animate-fade-in" style={{ animationDelay: "100ms" }}>
            {t("matchingVolunteers")}
          </p>
          
          {/* Emergency Card */}
          <div className="card-elevated w-full max-w-sm text-left animate-slide-up" style={{ animationDelay: "200ms" }}>
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
              <div className="w-12 h-12 rounded-2xl bg-destructive/10 flex items-center justify-center">
                <span className="text-2xl">
                  {emergencyTypes.find(t => t.id === formData.type)?.icon}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-foreground">{formData.typeLabel}</h3>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  {formData.location}
                </div>
              </div>
              <StatusBadge urgency={formData.urgency as "low" | "medium" | "high"} />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{t("requiredSkill")}</span>
                <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full font-medium">
                  {formData.skill}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{t("requestStatus")}</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-warning animate-pulse" />
                  <span className="text-xs font-medium text-warning">Finding Volunteers</span>
                </div>
              </div>
              {formData.description && (
                <div className="pt-3 border-t border-border">
                  <p className="text-sm text-muted-foreground">{formData.description}</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Matching Stats */}
          <div className="grid grid-cols-2 gap-3 w-full max-w-sm mt-6 animate-slide-up" style={{ animationDelay: "300ms" }}>
            <div className="stat-card">
              <Users className="w-5 h-5 text-primary mx-auto mb-1" />
              <div className="stat-value text-lg">{stats.availableVolunteers}</div>
              <div className="stat-label">Available</div>
            </div>
            <div className="stat-card">
              <Clock className="w-5 h-5 text-success mx-auto mb-1" />
              <div className="stat-value text-lg">~3 min</div>
              <div className="stat-label">Avg. Response</div>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex flex-col gap-3 mt-8 w-full max-w-sm animate-slide-up" style={{ animationDelay: "400ms" }}>
            <Link to="/matching">
              <Button variant="hero" className="w-full group">
                {t("matching")}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button
              variant="outline"
              onClick={() => {
                setSubmitted(false);
                setFormData({ type: "", typeLabel: "", location: "", skill: "", urgency: "", description: "" });
              }}
            >
              {t("submitAnother")}
            </Button>
          </div>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      <div className="animate-fade-in">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-destructive/10 flex items-center justify-center">
            <AlertTriangle className="w-7 h-7 text-destructive" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {t("emergencyTitle")}
            </h1>
            <p className="text-sm text-muted-foreground">
              {t("emergencySubtitle")}
            </p>
          </div>
        </div>
        
        {/* Available Volunteers Info */}
        <div className="flex items-center gap-2 mb-6 p-3 rounded-xl bg-success/5 border border-success/10">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-sm text-foreground">
            <span className="font-semibold text-success">{stats.availableVolunteers}</span> volunteers ready to help
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Emergency Type */}
          <div className="animate-slide-up" style={{ animationDelay: "100ms" }}>
            <label className="form-label">{t("emergencyType")}</label>
            <div className="grid grid-cols-3 gap-2.5">
              {emergencyTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => handleTypeSelect(type.id, type.labelKey)}
                  className={`p-4 rounded-2xl border-2 transition-all text-center hover-lift ${
                    formData.type === type.id
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-border bg-card hover:border-primary/30"
                  }`}
                >
                  <span className="text-3xl block mb-2">{type.icon}</span>
                  <span className="text-xs font-semibold text-foreground">{t(type.labelKey)}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="animate-slide-up" style={{ animationDelay: "150ms" }}>
            <label className="form-label">{t("location")}</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t("enterLocation")}
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="input-mobile pl-12"
              />
            </div>
          </div>

          {/* Required Skill */}
          <div className="animate-slide-up" style={{ animationDelay: "200ms" }}>
            <label className="form-label">{t("requiredSkill")}</label>
            <div className="flex flex-wrap gap-2">
              {requiredSkillKeys.map(({ key, value }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setFormData({ ...formData, skill: value })}
                  className={`px-4 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${
                    formData.skill === value
                      ? "border-primary bg-primary text-primary-foreground shadow-sm"
                      : "border-border bg-card text-foreground hover:border-primary/30"
                  }`}
                >
                  {t(key)}
                </button>
              ))}
            </div>
          </div>

          {/* Urgency Level */}
          <div className="animate-slide-up" style={{ animationDelay: "250ms" }}>
            <label className="form-label">{t("urgencyLevel")}</label>
            <div className="grid grid-cols-3 gap-3">
              {urgencyLevels.map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setFormData({ ...formData, urgency: level })}
                  className={`p-4 rounded-2xl border-2 transition-all hover-lift ${
                    formData.urgency === level
                      ? level === "low"
                        ? "border-success bg-success/10 shadow-sm"
                        : level === "medium"
                        ? "border-warning bg-warning/10 shadow-sm"
                        : "border-destructive bg-destructive/10 shadow-sm"
                      : "border-border bg-card hover:border-muted-foreground/30"
                  }`}
                >
                  <StatusBadge urgency={level} className="justify-center w-full" />
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="animate-slide-up" style={{ animationDelay: "300ms" }}>
            <label className="form-label">{t("additionalDetails")} (Optional)</label>
            <Textarea
              placeholder={t("describeEmergency")}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="min-h-[100px] text-base rounded-2xl resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4 animate-slide-up" style={{ animationDelay: "350ms" }}>
            <Button 
              type="submit" 
              variant="hero" 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Finding Volunteers...
                </>
              ) : (
                <>
                  <Siren className="w-5 h-5" />
                  {t("submitRequest")}
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </MobileLayout>
  );
};

export default EmergencyRequest;