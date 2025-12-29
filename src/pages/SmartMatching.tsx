import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { LocationMap } from "@/components/ui/LocationMap";
import { Check, MapPin, Clock, User, AlertTriangle, Info, ChevronDown, ChevronUp, Sparkles, Shield, Navigation, Zap, Map } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  useVolunteers, 
  useEmergencies, 
  useTasks, 
  useStats,
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
  const stats = useStats();
  
  const [assignedVolunteers, setAssignedVolunteers] = useState<Record<string, string>>({});
  const [expandedEmergency, setExpandedEmergency] = useState<string | null>(null);
  const [assigningId, setAssigningId] = useState<string | null>(null);
  const [showMap, setShowMap] = useState(true);

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

  const handleAssign = async (emergency: EmergencyRequest, volunteer: MatchedVolunteer) => {
    setAssigningId(`${emergency.id}-${volunteer.id}`);
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 600));
    
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
    
    setAssigningId(null);
    
    toast({
      title: "✅ Volunteer Assigned!",
      description: `${volunteer.name} → ${emergency.typeLabel || emergency.type} at ${emergency.location}`,
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

  const getMatchColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-primary";
    return "text-warning";
  };

  // Prepare map data
  const emergencyMapData = pendingEmergencies
    .filter(e => e.coordinates)
    .map(e => ({
      lat: e.coordinates!.lat,
      lng: e.coordinates!.lng,
      label: e.typeLabel || e.type,
    }));

  const volunteerMapData = volunteers
    .filter(v => v.available && v.coordinates)
    .map(v => ({
      lat: v.coordinates!.lat,
      lng: v.coordinates!.lng,
      label: v.name,
    }));

  return (
    <MobileLayout>
      <div className="animate-fade-in">
        {/* Header */}
        <div className="flex items-center gap-4 mb-2">
          <div className="w-14 h-14 rounded-2xl gradient-hero flex items-center justify-center shadow-glow">
            <Zap className="w-7 h-7 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {t("matchingTitle")}
            </h1>
            <p className="text-sm text-muted-foreground">
              {t("matchingSubtitle")}
            </p>
          </div>
        </div>
        
        {/* Stats Bar */}
        <div className="flex gap-3 mb-4 mt-4">
          <div className="flex-1 p-3 rounded-xl bg-destructive/5 border border-destructive/10 text-center">
            <div className="text-xl font-bold text-destructive">{stats.pendingEmergencies}</div>
            <div className="text-xs text-muted-foreground">Pending</div>
          </div>
          <div className="flex-1 p-3 rounded-xl bg-success/5 border border-success/10 text-center">
            <div className="text-xl font-bold text-success">{stats.availableVolunteers}</div>
            <div className="text-xs text-muted-foreground">Available</div>
          </div>
          <div className="flex-1 p-3 rounded-xl bg-primary/5 border border-primary/10 text-center">
            <div className="text-xl font-bold text-primary">{stats.totalTasks}</div>
            <div className="text-xs text-muted-foreground">Tasks</div>
          </div>
        </div>

        {/* Live Map */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Map className="w-4 h-4 text-primary" />
              Live Overview
            </h3>
            <button
              onClick={() => setShowMap(!showMap)}
              className="text-xs text-primary font-medium"
            >
              {showMap ? "Hide" : "Show"}
            </button>
          </div>
          {showMap && (
            <LocationMap
              emergencies={emergencyMapData}
              volunteers={volunteerMapData}
              className="h-48"
            />
          )}
        </div>

        {/* No Emergencies State */}
        {pendingEmergencies.length === 0 && (
          <div className="card-elevated text-center py-12">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">{t("noEmergencies")}</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs mx-auto">All emergencies have been assigned or resolved</p>
            <Link to="/emergency">
              <Button variant="outline">{t("requestHelp")}</Button>
            </Link>
          </div>
        )}

        {/* Emergency Cards with Matching */}
        <div className="space-y-5">
          {pendingEmergencies.map((emergency, idx) => {
            const matchedVolunteers = getMatchedVolunteers(emergency);
            const isExpanded = expandedEmergency === emergency.id;
            const isAssigned = !!assignedVolunteers[emergency.id];

            return (
              <div
                key={emergency.id}
                className={`card-elevated animate-slide-up overflow-hidden ${
                  isAssigned ? "border-2 border-success bg-success/5" : "border-l-4 border-l-destructive"
                }`}
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                {/* Emergency Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isAssigned ? "bg-success/10" : "bg-destructive/10"
                    }`}>
                      <AlertTriangle className={`w-5 h-5 ${isAssigned ? "text-success" : "text-destructive"}`} />
                    </div>
                    <div>
                      <span className="font-bold text-foreground block">
                        {emergency.typeLabel || emergency.type}
                      </span>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {getTimeAgo(emergency.createdAt)}
                        {emergency.reportedBy && (
                          <>
                            <span>•</span>
                            <span>{emergency.reportedBy}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <StatusBadge urgency={emergency.urgency} />
                </div>
                
                {emergency.description && (
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {emergency.description}
                  </p>
                )}
                
                <div className="flex items-center gap-2 text-sm mb-3">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="font-medium text-foreground">{emergency.location}</span>
                </div>
                
                <div className="pt-3 border-t border-border flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-muted-foreground">{t("requiredSkill")}:</span>
                    <span className="px-2.5 py-1 bg-primary/10 text-primary text-xs rounded-lg font-semibold">
                      {emergency.skill}
                    </span>
                  </div>
                  
                  {!isAssigned && (
                    <button
                      onClick={() => setExpandedEmergency(isExpanded ? null : emergency.id)}
                      className="flex items-center gap-1.5 text-sm text-primary font-semibold hover:text-primary/80 transition-colors"
                    >
                      {matchedVolunteers.length} {t("matchedVolunteers")}
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  )}
                  
                  {isAssigned && (
                    <div className="flex items-center gap-1.5 text-success text-sm font-semibold">
                      <Check className="w-4 h-4" />
                      {t("assigned")}
                    </div>
                  )}
                </div>

                {/* Matched Volunteers Dropdown */}
                {isExpanded && !isAssigned && (
                  <div className="mt-4 pt-4 border-t border-border space-y-3">
                    {matchedVolunteers.length === 0 ? (
                      <div className="text-center py-6">
                        <User className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">
                          {t("noMatchingVolunteers")}
                        </p>
                        <Link to="/volunteer" className="text-primary text-sm font-medium hover:underline">
                          Register a volunteer with this skill
                        </Link>
                      </div>
                    ) : (
                      matchedVolunteers.map((volunteer, vIdx) => (
                        <div
                          key={volunteer.id}
                          className="bg-muted/50 rounded-2xl p-4 animate-scale-in"
                          style={{ animationDelay: `${vIdx * 50}ms` }}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-xl gradient-hero flex items-center justify-center">
                                <span className="text-lg font-bold text-primary-foreground">
                                  {volunteer.name.charAt(0)}
                                </span>
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="font-bold text-foreground">{volunteer.name}</h3>
                                  {volunteer.verified && (
                                    <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center">
                                      <Shield className="w-3 h-3 text-success" />
                                    </div>
                                  )}
                                </div>
                                <div className="flex items-center gap-3 mt-0.5">
                                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <Navigation className="w-3 h-3" />
                                    {volunteer.distance}
                                  </div>
                                  <div className="flex items-center gap-1 text-xs text-success">
                                    <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                                    Available
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className={`text-2xl font-bold ${getMatchColor(volunteer.matchScore)}`}>
                                {volunteer.matchScore}%
                              </div>
                              <div className="text-xs text-muted-foreground">{t("matchScore")}</div>
                            </div>
                          </div>

                          {/* Match Criteria */}
                          <div className="flex flex-wrap gap-1.5 mb-3">
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
                          <div className="flex flex-wrap gap-1.5 mb-4">
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
                            disabled={assigningId === `${emergency.id}-${volunteer.id}`}
                          >
                            {assigningId === `${emergency.id}-${volunteer.id}` ? (
                              <>
                                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                                Assigning...
                              </>
                            ) : (
                              <>
                                <Sparkles className="w-4 h-4" />
                                {t("assignVolunteer")}
                              </>
                            )}
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
            <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              {t("trustedVolunteers")} ({volunteers.length})
            </h3>
            <div className="flex flex-wrap gap-2">
              {volunteers.slice(0, 6).map(v => (
                <div key={v.id} className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-full">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">{v.name.charAt(0)}</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">{v.name.split(' ')[0]}</span>
                  {v.verified && <Shield className="w-3 h-3 text-success" />}
                </div>
              ))}
              {volunteers.length > 6 && (
                <span className="px-3 py-1.5 bg-primary/10 rounded-full text-sm text-primary font-semibold">
                  +{volunteers.length - 6} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-muted/50 rounded-2xl flex items-start gap-3">
          <Info className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            {t("simulatedDataDisclaimer")}
          </p>
        </div>
      </div>
    </MobileLayout>
  );
};

export default SmartMatching;