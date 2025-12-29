import { useState } from "react";
import { Link } from "react-router-dom";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Upload, CheckCircle2, User, MapPin, Sparkles, ArrowRight, Shield, Award } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { useVolunteers, useStats } from "@/hooks/useLocalStorage";

const skillKeys = [
  { key: "firstAid", value: "First Aid", icon: "🩹" },
  { key: "medicalHelp", value: "Medical Help", icon: "🏥" },
  { key: "driving", value: "Driving", icon: "🚗" },
  { key: "rescueOperations", value: "Rescue Operations", icon: "🚨" },
  { key: "logistics", value: "Logistics", icon: "📦" },
  { key: "technicalSupport", value: "Electrical/Technical Support", icon: "⚡" },
  { key: "communicationSupport", value: "Communication Support", icon: "📡" },
];

const VolunteerOnboarding = () => {
  const { t } = useLanguage();
  const { addVolunteer } = useVolunteers();
  const stats = useStats();
  
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    skills: [] as string[],
    available: true,
    certificateUploaded: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSkillToggle = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.city || formData.skills.length === 0) {
      toast({
        title: t("pleaseComplete"),
        description: t("requiredFields"),
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Save to localStorage
    addVolunteer({
      name: formData.name,
      city: formData.city,
      skills: formData.skills,
      available: formData.available,
    });
    
    setIsSubmitting(false);
    setSubmitted(true);
    toast({
      title: t("registrationComplete"),
      description: t("thankYouVolunteer"),
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
            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-warning flex items-center justify-center animate-bounce-in" style={{ animationDelay: "200ms" }}>
              <Sparkles className="w-4 h-4 text-warning-foreground" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-foreground mb-2 animate-fade-in">
            {t("registrationComplete")}
          </h1>
          <p className="text-muted-foreground mb-8 max-w-xs animate-fade-in" style={{ animationDelay: "100ms" }}>
            {t("thankYouVolunteer")}
          </p>
          
          {/* Volunteer Card */}
          <div className="card-elevated w-full max-w-sm animate-slide-up" style={{ animationDelay: "200ms" }}>
            <div className="flex items-center gap-4 mb-4 pb-4 border-b border-border">
              <div className="w-14 h-14 rounded-2xl gradient-hero flex items-center justify-center">
                <span className="text-xl font-bold text-primary-foreground">
                  {formData.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-foreground">{formData.name}</h3>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  {formData.city}
                </div>
              </div>
              <StatusBadge status="pending" />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{t("skills")}</span>
                <div className="flex flex-wrap gap-1 justify-end">
                  {formData.skills.slice(0, 2).map(skill => (
                    <span key={skill} className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full font-medium">
                      {skill}
                    </span>
                  ))}
                  {formData.skills.length > 2 && (
                    <span className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-full">
                      +{formData.skills.length - 2}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{t("availabilityStatus")}</span>
                <StatusBadge status={formData.available ? "available" : "on-duty"} />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{t("verificationStatus")}</span>
                <div className="flex items-center gap-1 text-warning">
                  <Shield className="w-3 h-3" />
                  <span className="text-xs font-medium">Pending Review</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex flex-col gap-3 mt-8 w-full max-w-sm animate-slide-up" style={{ animationDelay: "300ms" }}>
            <Link to="/matching">
              <Button variant="hero" className="w-full group">
                View Active Emergencies
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button
              variant="outline"
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: "", city: "", skills: [], available: true, certificateUploaded: false });
              }}
            >
              Register Another Volunteer
            </Button>
          </div>
          
          {/* Stats */}
          <div className="mt-8 text-center animate-fade-in" style={{ animationDelay: "400ms" }}>
            <p className="text-sm text-muted-foreground">
              You're joining <span className="font-bold text-primary">{stats.totalVolunteers}</span> verified volunteers
            </p>
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
          <div className="w-14 h-14 rounded-2xl gradient-hero flex items-center justify-center shadow-glow">
            <User className="w-7 h-7 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {t("volunteerTitle")}
            </h1>
            <p className="text-sm text-muted-foreground">
              {t("volunteerSubtitle")}
            </p>
          </div>
        </div>
        
        {/* Progress Indicator */}
        <div className="flex items-center gap-2 mb-6 p-3 rounded-xl bg-primary/5 border border-primary/10">
          <Award className="w-5 h-5 text-primary" />
          <span className="text-sm text-foreground">
            <span className="font-semibold text-primary">{stats.totalVolunteers}</span> volunteers already registered
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div className="animate-slide-up" style={{ animationDelay: "100ms" }}>
            <label className="form-label">{t("fullName")}</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t("enterName")}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="input-mobile pl-12"
              />
            </div>
          </div>

          {/* City Input */}
          <div className="animate-slide-up" style={{ animationDelay: "150ms" }}>
            <label className="form-label">{t("city")}</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t("enterCity")}
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="input-mobile pl-12"
              />
            </div>
          </div>

          {/* Skills Selection */}
          <div className="animate-slide-up" style={{ animationDelay: "200ms" }}>
            <label className="form-label flex items-center justify-between">
              {t("selectSkills")}
              <span className="text-xs text-primary font-medium">
                {formData.skills.length} selected
              </span>
            </label>
            <div className="grid grid-cols-1 gap-2.5">
              {skillKeys.map(({ key, value, icon }, index) => (
                <label
                  key={value}
                  className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all cursor-pointer hover-lift ${
                    formData.skills.includes(value)
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-border bg-card hover:border-primary/30"
                  }`}
                  style={{ animationDelay: `${250 + index * 30}ms` }}
                >
                  <Checkbox
                    checked={formData.skills.includes(value)}
                    onCheckedChange={() => handleSkillToggle(value)}
                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <span className="text-xl">{icon}</span>
                  <span className="font-medium text-foreground flex-1">{t(key)}</span>
                  {formData.skills.includes(value) && (
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  )}
                </label>
              ))}
            </div>
          </div>

          {/* Availability Toggle */}
          <div className="card-elevated animate-slide-up" style={{ animationDelay: "450ms" }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  formData.available ? "bg-success/10" : "bg-muted"
                }`}>
                  <div className={`w-3 h-3 rounded-full ${
                    formData.available ? "bg-success animate-pulse" : "bg-muted-foreground"
                  }`} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{t("availabilityStatus")}</h3>
                  <p className="text-sm text-muted-foreground">
                    {formData.available ? t("availableForTasks") : t("currentlyBusy")}
                  </p>
                </div>
              </div>
              <Switch
                checked={formData.available}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, available: checked })
                }
              />
            </div>
          </div>

          {/* Certificate Upload */}
          <div className="animate-slide-up" style={{ animationDelay: "500ms" }}>
            <label className="form-label">{t("skillVerification")} (Optional)</label>
            <button
              type="button"
              onClick={() => {
                setFormData({ ...formData, certificateUploaded: true });
                toast({ title: t("certificateUploaded"), description: "Document received for verification" });
              }}
              className={`w-full p-6 rounded-2xl border-2 border-dashed transition-all hover-lift ${
                formData.certificateUploaded
                  ? "border-success bg-success/5"
                  : "border-border hover:border-primary/50 bg-muted/30"
              }`}
            >
              <div className="flex flex-col items-center gap-3">
                {formData.certificateUploaded ? (
                  <>
                    <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-success" />
                    </div>
                    <span className="text-success font-semibold">{t("certificateUploaded")}</span>
                    <span className="text-xs text-muted-foreground">Click to upload another</span>
                  </>
                ) : (
                  <>
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                      <Upload className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <span className="text-muted-foreground font-medium">{t("uploadCertificate")}</span>
                    <span className="text-xs text-muted-foreground">PDF, JPG, or PNG (max 5MB)</span>
                  </>
                )}
              </div>
            </button>
          </div>

          {/* Submit Button */}
          <div className="pt-4 animate-slide-up" style={{ animationDelay: "550ms" }}>
            <Button 
              type="submit" 
              variant="hero" 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  {t("registerAsVolunteer")}
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </MobileLayout>
  );
};

export default VolunteerOnboarding;