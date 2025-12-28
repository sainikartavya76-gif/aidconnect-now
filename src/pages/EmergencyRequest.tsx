import { useState } from "react";
import { Link } from "react-router-dom";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { AlertTriangle, MapPin, CheckCircle2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEmergencies } from "@/hooks/useLocalStorage";

const emergencyTypes = [
  { id: "flood", labelKey: "flood", icon: "🌊" },
  { id: "fire", labelKey: "fire", icon: "🔥" },
  { id: "medical", labelKey: "medical", icon: "🏥" },
  { id: "accident", labelKey: "accident", icon: "🚗" },
  { id: "infrastructure", labelKey: "infrastructure", icon: "🏗️" },
  { id: "other", labelKey: "other", icon: "⚠️" },
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
  
  const [formData, setFormData] = useState({
    type: "",
    typeLabel: "",
    location: "",
    skill: "",
    urgency: "" as "" | "low" | "medium" | "high",
    description: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleTypeSelect = (typeId: string, labelKey: string) => {
    setFormData({ ...formData, type: typeId, typeLabel: t(labelKey) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.type || !formData.location || !formData.skill || !formData.urgency) {
      toast({
        title: t("pleaseComplete"),
        variant: "destructive",
      });
      return;
    }
    
    // Save to localStorage
    addEmergency({
      type: formData.type,
      typeLabel: formData.typeLabel,
      location: formData.location,
      skill: formData.skill,
      urgency: formData.urgency,
      description: formData.description,
    });
    
    setSubmitted(true);
    toast({
      title: t("requestSubmitted"),
      description: t("matchingVolunteers"),
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
            {t("requestSubmitted")}
          </h1>
          <p className="text-muted-foreground mb-6 max-w-xs">
            {t("matchingVolunteers")}
          </p>
          <div className="card-elevated w-full max-w-sm text-left">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-muted-foreground">
                {t("requestStatus")}
              </span>
              <StatusBadge status="pending" />
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("type")}</span>
                <span className="font-medium capitalize">{formData.typeLabel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("location")}</span>
                <span className="font-medium">{formData.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("requiredSkill")}</span>
                <span className="font-medium">{formData.skill}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">{t("urgencyLevel")}</span>
                <StatusBadge urgency={formData.urgency as "low" | "medium" | "high"} />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 mt-6 w-full max-w-sm">
            <Link to="/matching">
              <Button variant="hero" className="w-full">
                {t("matching")} →
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
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-destructive" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            {t("emergencyTitle")}
          </h1>
        </div>
        <p className="text-muted-foreground mb-6">
          {t("emergencySubtitle")}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Emergency Type */}
          <div>
            <label className="form-label">{t("emergencyType")}</label>
            <div className="grid grid-cols-3 gap-3">
              {emergencyTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => handleTypeSelect(type.id, type.labelKey)}
                  className={`p-4 rounded-xl border-2 transition-all text-center ${
                    formData.type === type.id
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card hover:border-muted-foreground/30"
                  }`}
                >
                  <span className="text-2xl block mb-1">{type.icon}</span>
                  <span className="text-xs font-medium text-foreground">{t(type.labelKey)}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
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
          <div>
            <label className="form-label">{t("requiredSkill")}</label>
            <div className="flex flex-wrap gap-2">
              {requiredSkillKeys.map(({ key, value }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setFormData({ ...formData, skill: value })}
                  className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                    formData.skill === value
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border bg-card text-foreground hover:border-muted-foreground/30"
                  }`}
                >
                  {t(key)}
                </button>
              ))}
            </div>
          </div>

          {/* Urgency Level */}
          <div>
            <label className="form-label">{t("urgencyLevel")}</label>
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
            <label className="form-label">{t("additionalDetails")}</label>
            <Textarea
              placeholder={t("describeEmergency")}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="min-h-[100px] text-base rounded-xl"
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" variant="hero" className="w-full">
            <AlertTriangle className="w-5 h-5" />
            {t("submitRequest")}
          </Button>
        </form>
      </div>
    </MobileLayout>
  );
};

export default EmergencyRequest;
