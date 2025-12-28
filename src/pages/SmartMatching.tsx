import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Check, MapPin, Clock, User, AlertTriangle, Info, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  useVolunteers, 
  useEmergencies, 
  useTasks, 
  calculateMatchScore, 
  getMockDistance,
  type Volunteer,
  type EmergencyRequest 
} from "@/hooks/useLocalStorage";

interface MatchedVolunteer extends Volunteer {
  matchScore: number;
  distance: string;
}

const SmartMatching = () => {
  const { t } = useLanguage();
  const { volunteers, refreshVolunteers } = useVolunteers();
  const { emergencies, updateEmergencyStatus, refreshEmergencies } = useEmergencies();
  const { addTask } = useTasks();
  
  const [assignedVolunteers, setAssignedVolunteers] = useState<Record<string, string>>({});
  const [expandedEmergency, setExpandedEmergency] = useState<string | null>(null);

  // Refresh data on mount
  useEffect(() => {
    refreshVolunteers();
    refreshEmergencies();
  }, [refreshVolunteers, refreshEmergencies]);

  // Filter only pending emergencies
  const pendingEmergencies = emergencies.filter(e => e.status === "pending");

  // Get matched volunteers for an emergency
  const getMatchedVolunteers = (emergency: EmergencyRequest): MatchedVolunteer[] => {
    return volunteers
      .filter(v => v.available && v.skills.includes(emergency.skill))
      .map(v => ({
        ...v,
        matchScore: calculateMatchScore(v, emergency),
        distance: getMockDistance(v, emergency),
      }))
      .sort((a, b) => b.matchScore - a.matchScore);
  };

  const handleAssign = (emergency: EmergencyRequest, volunteer: MatchedVolunteer) => {
    // Create a task
    addTask({
      emergencyId: emergency.id,
      emergencyType: emergency.typeLabel || emergency.type,
      location: emergency.location,
      volunteerId: volunteer.id,
      volunteerName: volunteer.name,
      status: "assigned",
    });
    
    // Update emergency status
    updateEmergencyStatus(emergency.id, "assigned");
    
    // Track assignment locally
    setAssignedVolunteers(prev => ({
      ...prev,
      [emergency.id]: volunteer.id,
    }));
    
    toast({
      title: t("assigned"),
      description: `${volunteer.name} → ${emergency.typeLabel || emergency.type}`,
    });
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} mins ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hours ago`;
    return `${Math.floor(diffHours / 24)} days ago`;
  };

  return (
    <MobileLayout>
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          {t("matchingTitle")}
        </h1>
        <p className="text-muted-foreground mb-8">
          {t("matchingSubtitle")}
        </p>

        {/* No Emergencies State */}
        {pendingEmergencies.length === 0 && (
          <div className="card-elevated text-center py-10">
            <AlertTriangle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">{t("noEmergencies")}</p>
            <Link to="/emergency">
              <Button variant="outline">{t("requestHelp")}</Button>
            </Link>
          </div>
        )}

        {/* Emergency Cards with Matching */}
        <div className="space-y-6">
          {pendingEmergencies.map((emergency, idx) => {
            const matchedVolunteers = getMatchedVolunteers(emergency);
            const isExpanded = expandedEmergency === emergency.id;
            const isAssigned = !!assignedVolunteers[emergency.id];

            return (
              <div
                key={emergency.id}
                className={`card-elevated animate-slide-up ${
                  isAssigned ? "border-2 border-success" : "border-l-4 border-l-destructive"
                }`}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Emergency Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className={`w-5 h-5 ${isAssigned ? "text-success" : "text-destructive"}`} />
                    <span className="font-semibold text-foreground">
                      {emergency.typeLabel || emergency.type}
                    </span>
                  </div>
                  <StatusBadge urgency={emergency.urgency} />
                </div>
                
                {emergency.description && (
                  <p className="text-sm text-muted-foreground mb-3">
                    {emergency.description}
                  </p>
                )}
                
                <div className="flex flex-wrap gap-3 text-sm">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    {emergency.location}
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {getTimeAgo(emergency.createdAt)}
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                  <div>
                    <span className="text-xs font-medium text-muted-foreground">{t("requiredSkill")}:</span>
                    <span className="ml-2 px-2 py-1 bg-primary/10 text-primary text-xs rounded-lg font-medium">
                      {emergency.skill}
                    </span>
                  </div>
                  
                  {!isAssigned && (
                    <button
                      onClick={() => setExpandedEmergency(isExpanded ? null : emergency.id)}
                      className="flex items-center gap-1 text-sm text-primary font-medium"
                    >
                      {matchedVolunteers.length} {t("matchedVolunteers")}
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  )}
                  
                  {isAssigned && (
                    <div className="flex items-center gap-1 text-success text-sm font-medium">
                      <Check className="w-4 h-4" />
                      {t("assigned")}
                    </div>
                  )}
                </div>

                {/* Matched Volunteers Dropdown */}
                {isExpanded && !isAssigned && (
                  <div className="mt-4 pt-4 border-t border-border space-y-4">
                    {matchedVolunteers.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        {t("noMatchingVolunteers")}
                      </p>
                    ) : (
                      matchedVolunteers.map((volunteer) => (
                        <div
                          key={volunteer.id}
                          className="bg-muted/50 rounded-xl p-4"
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
                                <StatusBadge status={volunteer.available ? "available" : "on-duty"} />
                                <span className="text-xs text-muted-foreground">
                                  {volunteer.distance} {t("away")}
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-xl font-bold text-primary">{volunteer.matchScore}%</div>
                              <div className="text-xs text-muted-foreground">{t("matchScore")}</div>
                            </div>
                          </div>

                          {/* Match Criteria */}
                          <div className="flex flex-wrap gap-2 mb-3">
                            <div className="flex items-center gap-1 px-2 py-1 bg-success/10 rounded-lg">
                              <Check className="w-3 h-3 text-success" />
                              <span className="text-xs text-success font-medium">{t("skillMatch")}</span>
                            </div>
                            <div className="flex items-center gap-1 px-2 py-1 bg-success/10 rounded-lg">
                              <Check className="w-3 h-3 text-success" />
                              <span className="text-xs text-success font-medium">{t("nearby")}</span>
                            </div>
                            <div className="flex items-center gap-1 px-2 py-1 bg-success/10 rounded-lg">
                              <Check className="w-3 h-3 text-success" />
                              <span className="text-xs text-success font-medium">{t("available")}</span>
                            </div>
                          </div>

                          {/* Skills */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {volunteer.skills.map((skill) => (
                              <span
                                key={skill}
                                className={`px-2 py-1 text-xs rounded-lg font-medium ${
                                  skill === emergency.skill
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted text-muted-foreground"
                                }`}
                              >
                                {skill}
                              </span>
                            ))}
                          </div>

                          <Button
                            variant="default"
                            className="w-full"
                            onClick={() => handleAssign(emergency, volunteer)}
                          >
                            {t("assignVolunteer")}
                          </Button>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Volunteers Summary */}
        {volunteers.length > 0 && (
          <div className="mt-8 card-elevated">
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              {t("trustedVolunteers")} ({volunteers.length})
            </h3>
            <div className="flex flex-wrap gap-2">
              {volunteers.slice(0, 5).map(v => (
                <span key={v.id} className="px-3 py-1 bg-muted rounded-full text-sm text-foreground">
                  {v.name}
                </span>
              ))}
              {volunteers.length > 5 && (
                <span className="px-3 py-1 bg-primary/10 rounded-full text-sm text-primary">
                  +{volunteers.length - 5} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-muted rounded-xl flex items-start gap-3">
          <Info className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground">
            {t("simulatedDataDisclaimer")}
          </p>
        </div>
      </div>
    </MobileLayout>
  );
};

export default SmartMatching;
