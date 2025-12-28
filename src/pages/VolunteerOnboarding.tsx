import { useState } from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Upload, CheckCircle2, User, MapPin } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { useVolunteers } from "@/hooks/useLocalStorage";

const skillKeys = [
  { key: "firstAid", value: "First Aid" },
  { key: "medicalHelp", value: "Medical Help" },
  { key: "driving", value: "Driving" },
  { key: "rescueOperations", value: "Rescue Operations" },
  { key: "logistics", value: "Logistics" },
  { key: "technicalSupport", value: "Electrical/Technical Support" },
  { key: "communicationSupport", value: "Communication Support" },
];

const VolunteerOnboarding = () => {
  const { t } = useLanguage();
  const { addVolunteer } = useVolunteers();
  
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    skills: [] as string[],
    available: true,
    certificateUploaded: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSkillToggle = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.city || formData.skills.length === 0) {
      toast({
        title: t("pleaseComplete"),
        description: t("requiredFields"),
        variant: "destructive",
      });
      return;
    }
    
    // Save to localStorage
    addVolunteer({
      name: formData.name,
      city: formData.city,
      skills: formData.skills,
      available: formData.available,
    });
    
    setSubmitted(true);
    toast({
      title: t("registrationComplete"),
      description: t("thankYouVolunteer"),
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
            {t("registrationComplete")}
          </h1>
          <p className="text-muted-foreground mb-6 max-w-xs">
            {t("thankYouVolunteer")}
          </p>
          <div className="card-elevated w-full max-w-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-muted-foreground">
                {t("verificationStatus")}
              </span>
              <StatusBadge status="pending" />
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("name")}</span>
                <span className="font-medium">{formData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("city")}</span>
                <span className="font-medium">{formData.city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t("skills")}</span>
                <span className="font-medium text-right">{formData.skills.length} selected</span>
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            className="mt-6"
            onClick={() => {
              setSubmitted(false);
              setFormData({ name: "", city: "", skills: [], available: true, certificateUploaded: false });
            }}
          >
            {t("becomeVolunteer")}
          </Button>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          {t("volunteerTitle")}
        </h1>
        <p className="text-muted-foreground mb-6">
          {t("volunteerSubtitle")}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div>
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
          <div>
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
          <div>
            <label className="form-label">{t("selectSkills")}</label>
            <div className="grid grid-cols-1 gap-3">
              {skillKeys.map(({ key, value }) => (
                <label
                  key={value}
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                    formData.skills.includes(value)
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card hover:border-muted-foreground/30"
                  }`}
                >
                  <Checkbox
                    checked={formData.skills.includes(value)}
                    onCheckedChange={() => handleSkillToggle(value)}
                  />
                  <span className="font-medium text-foreground">{t(key)}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Availability Toggle */}
          <div className="card-elevated">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-foreground">{t("availabilityStatus")}</h3>
                <p className="text-sm text-muted-foreground">
                  {formData.available ? t("availableForTasks") : t("currentlyBusy")}
                </p>
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
          <div>
            <label className="form-label">{t("skillVerification")}</label>
            <button
              type="button"
              onClick={() => {
                setFormData({ ...formData, certificateUploaded: true });
                toast({ title: t("certificateUploaded"), description: "" });
              }}
              className={`w-full p-6 rounded-xl border-2 border-dashed transition-all ${
                formData.certificateUploaded
                  ? "border-success bg-success/5"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                {formData.certificateUploaded ? (
                  <>
                    <CheckCircle2 className="w-8 h-8 text-success" />
                    <span className="text-success font-medium">{t("certificateUploaded")}</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-muted-foreground" />
                    <span className="text-muted-foreground">{t("uploadCertificate")}</span>
                  </>
                )}
              </div>
            </button>
          </div>

          {/* Submit Button */}
          <Button type="submit" variant="hero" className="w-full">
            {t("registerAsVolunteer")}
          </Button>
        </form>
      </div>
    </MobileLayout>
  );
};

export default VolunteerOnboarding;
