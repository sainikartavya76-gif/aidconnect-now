import { useState } from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Check, MapPin, Clock, User, AlertTriangle, Info } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Mock emergency request
const mockEmergency = {
  id: "EM-2024-001",
  type: "Medical",
  location: "Sector 15, Noida",
  skill: "First Aid",
  urgency: "high" as const,
  description: "Person injured in road accident, requires immediate first aid assistance.",
  submittedAt: "10 mins ago",
};

// Mock matched volunteers
const mockVolunteers = [
  {
    id: 1,
    name: "Rahul Sharma",
    skills: ["First Aid", "Medical Help"],
    distance: "0.8 km",
    status: "available" as const,
    verified: true,
    matchScore: 98,
  },
  {
    id: 2,
    name: "Priya Singh",
    skills: ["First Aid", "Driving"],
    distance: "1.2 km",
    status: "available" as const,
    verified: true,
    matchScore: 92,
  },
  {
    id: 3,
    name: "Amit Kumar",
    skills: ["First Aid", "Rescue Operations"],
    distance: "2.1 km",
    status: "on-duty" as const,
    verified: true,
    matchScore: 85,
  },
];

const SmartMatching = () => {
  const [assignedVolunteer, setAssignedVolunteer] = useState<number | null>(null);

  const handleAssign = (volunteerId: number, volunteerName: string) => {
    setAssignedVolunteer(volunteerId);
    toast({
      title: "Volunteer Assigned",
      description: `${volunteerName} has been assigned to this emergency.`,
    });
  };

  return (
    <MobileLayout>
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Smart Matching
        </h1>
        <p className="text-muted-foreground mb-6">
          AI-powered volunteer matching for emergencies.
        </p>

        {/* Emergency Request Card */}
        <div className="card-elevated mb-6 border-l-4 border-l-destructive">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              <span className="font-semibold text-foreground">{mockEmergency.type}</span>
            </div>
            <StatusBadge urgency={mockEmergency.urgency} />
          </div>
          
          <p className="text-sm text-muted-foreground mb-3">
            {mockEmergency.description}
          </p>
          
          <div className="flex flex-wrap gap-3 text-sm">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              {mockEmergency.location}
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="w-4 h-4" />
              {mockEmergency.submittedAt}
            </div>
          </div>
          
          <div className="mt-3 pt-3 border-t border-border">
            <span className="text-xs font-medium text-muted-foreground">Required Skill:</span>
            <span className="ml-2 px-2 py-1 bg-primary/10 text-primary text-xs rounded-lg font-medium">
              {mockEmergency.skill}
            </span>
          </div>
        </div>

        {/* Matched Volunteers */}
        <div className="mb-4">
          <h2 className="section-title flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            Matched Volunteers ({mockVolunteers.length})
          </h2>
        </div>

        <div className="space-y-4">
          {mockVolunteers.map((volunteer, index) => (
            <div
              key={volunteer.id}
              className={`card-elevated transition-all animate-slide-up ${
                assignedVolunteer === volunteer.id ? "border-2 border-success" : ""
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{volunteer.name}</h3>
                    {volunteer.verified && (
                      <span className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center">
                        <Check className="w-3 h-3 text-success" />
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <StatusBadge status={volunteer.status} />
                    <span className="text-xs text-muted-foreground">
                      {volunteer.distance} away
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">{volunteer.matchScore}%</div>
                  <div className="text-xs text-muted-foreground">Match Score</div>
                </div>
              </div>

              {/* Match Criteria */}
              <div className="flex flex-wrap gap-2 mb-4">
                <div className="flex items-center gap-1 px-2 py-1 bg-success/10 rounded-lg">
                  <Check className="w-3 h-3 text-success" />
                  <span className="text-xs text-success font-medium">Skill Match</span>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 bg-success/10 rounded-lg">
                  <Check className="w-3 h-3 text-success" />
                  <span className="text-xs text-success font-medium">Nearby</span>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 bg-success/10 rounded-lg">
                  <Check className="w-3 h-3 text-success" />
                  <span className="text-xs text-success font-medium">Available</span>
                </div>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2 mb-4">
                {volunteer.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`px-2 py-1 text-xs rounded-lg font-medium ${
                      skill === mockEmergency.skill
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Action Button */}
              {assignedVolunteer === volunteer.id ? (
                <Button variant="success" className="w-full" disabled>
                  <Check className="w-4 h-4" />
                  Assigned
                </Button>
              ) : (
                <Button
                  variant={volunteer.status === "available" ? "default" : "outline"}
                  className="w-full"
                  onClick={() => handleAssign(volunteer.id, volunteer.name)}
                  disabled={assignedVolunteer !== null}
                >
                  Assign Volunteer
                </Button>
              )}
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-6 p-4 bg-muted rounded-xl flex items-start gap-3">
          <Info className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground">
            Matching logic shown using simulated data for demonstration. In production, this would use real-time location and availability data.
          </p>
        </div>
      </div>
    </MobileLayout>
  );
};

export default SmartMatching;
