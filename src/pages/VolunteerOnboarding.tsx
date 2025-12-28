import { useState } from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Upload, CheckCircle2, User, MapPin } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const skills = [
  "First Aid",
  "Medical Help",
  "Driving",
  "Rescue Operations",
  "Logistics",
  "Electrical/Technical Support",
  "Communication Support",
];

const VolunteerOnboarding = () => {
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
        title: "Please complete all fields",
        description: "Name, city, and at least one skill are required.",
        variant: "destructive",
      });
      return;
    }
    setSubmitted(true);
    toast({
      title: "Registration Submitted!",
      description: "Your volunteer profile is under review.",
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
            Registration Complete!
          </h1>
          <p className="text-muted-foreground mb-6 max-w-xs">
            Thank you for volunteering. Your profile is under review and will be verified shortly.
          </p>
          <div className="card-elevated w-full max-w-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-muted-foreground">
                Verification Status
              </span>
              <StatusBadge status="pending" />
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Name</span>
                <span className="font-medium">{formData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">City</span>
                <span className="font-medium">{formData.city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Skills</span>
                <span className="font-medium text-right">{formData.skills.length} selected</span>
              </div>
            </div>
          </div>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Become a Volunteer
        </h1>
        <p className="text-muted-foreground mb-6">
          Register your skills to help during emergencies.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div>
            <label className="form-label">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="input-mobile pl-12"
              />
            </div>
          </div>

          {/* City Input */}
          <div>
            <label className="form-label">City</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Enter your city"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="input-mobile pl-12"
              />
            </div>
          </div>

          {/* Skills Selection */}
          <div>
            <label className="form-label">Select Your Skills</label>
            <div className="grid grid-cols-1 gap-3">
              {skills.map((skill) => (
                <label
                  key={skill}
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                    formData.skills.includes(skill)
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card hover:border-muted-foreground/30"
                  }`}
                >
                  <Checkbox
                    checked={formData.skills.includes(skill)}
                    onCheckedChange={() => handleSkillToggle(skill)}
                  />
                  <span className="font-medium text-foreground">{skill}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Availability Toggle */}
          <div className="card-elevated">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-foreground">Availability Status</h3>
                <p className="text-sm text-muted-foreground">
                  {formData.available ? "You're available for tasks" : "You're currently on duty"}
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
            <label className="form-label">Skill Verification (Optional)</label>
            <button
              type="button"
              onClick={() => {
                setFormData({ ...formData, certificateUploaded: true });
                toast({ title: "File uploaded", description: "Certificate added for verification." });
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
                    <span className="text-success font-medium">Certificate Uploaded</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-muted-foreground" />
                    <span className="text-muted-foreground">Upload certificate or ID</span>
                  </>
                )}
              </div>
            </button>
          </div>

          {/* Submit Button */}
          <Button type="submit" variant="hero" className="w-full">
            Register as Volunteer
          </Button>
        </form>
      </div>
    </MobileLayout>
  );
};

export default VolunteerOnboarding;
