import { useState, useEffect, useCallback } from "react";

export interface Volunteer {
  id: string;
  name: string;
  city: string;
  skills: string[];
  available: boolean;
  verified: boolean;
  createdAt: string;
  tasksCompleted?: number;
  phone?: string;
  coordinates?: { lat: number; lng: number };
}

export interface EmergencyRequest {
  id: string;
  type: string;
  typeLabel: string;
  location: string;
  skill: string;
  urgency: "low" | "medium" | "high";
  description: string;
  createdAt: string;
  status: "pending" | "assigned" | "resolved";
  coordinates?: { lat: number; lng: number };
  reportedBy?: string;
}

export interface Task {
  id: string;
  emergencyId: string;
  emergencyType: string;
  location: string;
  volunteerId: string;
  volunteerName: string;
  status: "assigned" | "in-progress" | "completed";
  assignedAt: string;
  updatedAt: string;
}

// Real-world Delhi NCR coordinates
const delhiNCRLocations = {
  "Connaught Place, New Delhi": { lat: 28.6315, lng: 77.2167 },
  "Sector 18, Noida": { lat: 28.5700, lng: 77.3210 },
  "Sector 15, Noida": { lat: 28.5850, lng: 77.3150 },
  "Sector 62, Noida": { lat: 28.6270, lng: 77.3650 },
  "Dwarka Sector 21, New Delhi": { lat: 28.5520, lng: 77.0580 },
  "Gurugram Cyber City": { lat: 28.4949, lng: 77.0887 },
  "Indirapuram, Ghaziabad": { lat: 28.6410, lng: 77.3580 },
  "Lajpat Nagar, New Delhi": { lat: 28.5650, lng: 77.2430 },
  "Saket, New Delhi": { lat: 28.5245, lng: 77.2066 },
  "Vaishali, Ghaziabad": { lat: 28.6450, lng: 77.3420 },
  "Greater Noida West": { lat: 28.5930, lng: 77.4280 },
  "Faridabad Sector 15": { lat: 28.3910, lng: 77.3100 },
  "Rohini Sector 7, New Delhi": { lat: 28.7150, lng: 77.1140 },
  "Janakpuri, New Delhi": { lat: 28.6280, lng: 77.0890 },
  "Karol Bagh, New Delhi": { lat: 28.6520, lng: 77.1900 },
};

// Rich seed data with real-world Delhi NCR volunteers
const seedVolunteers: Volunteer[] = [
  {
    id: "v1",
    name: "Dr. Rahul Sharma",
    city: "Noida",
    skills: ["First Aid", "Medical Help"],
    available: true,
    verified: true,
    createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
    tasksCompleted: 12,
    phone: "+91 98765 43210",
    coordinates: { lat: 28.5850, lng: 77.3150 },
  },
  {
    id: "v2",
    name: "Priya Singh",
    city: "New Delhi",
    skills: ["First Aid", "Driving"],
    available: true,
    verified: true,
    createdAt: new Date(Date.now() - 86400000 * 25).toISOString(),
    tasksCompleted: 8,
    phone: "+91 98765 43211",
    coordinates: { lat: 28.6315, lng: 77.2167 },
  },
  {
    id: "v3",
    name: "Amit Kumar (NDRF)",
    city: "Noida",
    skills: ["Rescue Operations", "Logistics"],
    available: true,
    verified: true,
    createdAt: new Date(Date.now() - 86400000 * 20).toISOString(),
    tasksCompleted: 15,
    phone: "+91 98765 43212",
    coordinates: { lat: 28.5700, lng: 77.3210 },
  },
  {
    id: "v4",
    name: "Dr. Sneha Gupta",
    city: "Gurugram",
    skills: ["Medical Help", "Communication Support"],
    available: true,
    verified: true,
    createdAt: new Date(Date.now() - 86400000 * 18).toISOString(),
    tasksCompleted: 6,
    phone: "+91 98765 43213",
    coordinates: { lat: 28.4949, lng: 77.0887 },
  },
  {
    id: "v5",
    name: "Vikram Patel (Fire Dept.)",
    city: "New Delhi",
    skills: ["Rescue Operations", "First Aid", "Driving"],
    available: true,
    verified: true,
    createdAt: new Date(Date.now() - 86400000 * 15).toISOString(),
    tasksCompleted: 22,
    phone: "+91 98765 43214",
    coordinates: { lat: 28.5650, lng: 77.2430 },
  },
  {
    id: "v6",
    name: "Anjali Reddy",
    city: "Noida",
    skills: ["Electrical/Technical Support", "Communication Support"],
    available: false,
    verified: true,
    createdAt: new Date(Date.now() - 86400000 * 12).toISOString(),
    tasksCompleted: 9,
    phone: "+91 98765 43215",
    coordinates: { lat: 28.6270, lng: 77.3650 },
  },
  {
    id: "v7",
    name: "Rohit Verma",
    city: "Faridabad",
    skills: ["Logistics", "Driving"],
    available: true,
    verified: true,
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
    tasksCompleted: 5,
    phone: "+91 98765 43216",
    coordinates: { lat: 28.3910, lng: 77.3100 },
  },
  {
    id: "v8",
    name: "Dr. Kavita Joshi",
    city: "New Delhi",
    skills: ["Medical Help", "First Aid"],
    available: true,
    verified: true,
    createdAt: new Date(Date.now() - 86400000 * 8).toISOString(),
    tasksCompleted: 11,
    phone: "+91 98765 43217",
    coordinates: { lat: 28.5245, lng: 77.2066 },
  },
  {
    id: "v9",
    name: "Suresh Nair (Electrician)",
    city: "Ghaziabad",
    skills: ["Rescue Operations", "Electrical/Technical Support"],
    available: true,
    verified: false,
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    tasksCompleted: 3,
    phone: "+91 98765 43218",
    coordinates: { lat: 28.6410, lng: 77.3580 },
  },
  {
    id: "v10",
    name: "Meera Krishnan",
    city: "Noida",
    skills: ["Communication Support", "Logistics"],
    available: true,
    verified: true,
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    tasksCompleted: 7,
    phone: "+91 98765 43219",
    coordinates: { lat: 28.5930, lng: 77.4280 },
  },
  {
    id: "v11",
    name: "Arjun Mehta (Ambulance)",
    city: "New Delhi",
    skills: ["Driving", "Logistics", "First Aid"],
    available: true,
    verified: true,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    tasksCompleted: 18,
    phone: "+91 98765 43220",
    coordinates: { lat: 28.6520, lng: 77.1900 },
  },
  {
    id: "v12",
    name: "Pooja Sharma (Nurse)",
    city: "Gurugram",
    skills: ["Medical Help", "Communication Support"],
    available: false,
    verified: true,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    tasksCompleted: 4,
    phone: "+91 98765 43221",
    coordinates: { lat: 28.4590, lng: 77.0266 },
  },
  {
    id: "v13",
    name: "Rajesh Tiwari (Police)",
    city: "New Delhi",
    skills: ["Rescue Operations", "Communication Support", "Driving"],
    available: true,
    verified: true,
    createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    tasksCompleted: 25,
    phone: "+91 98765 43222",
    coordinates: { lat: 28.7150, lng: 77.1140 },
  },
  {
    id: "v14",
    name: "Sunita Devi",
    city: "Ghaziabad",
    skills: ["First Aid", "Logistics"],
    available: true,
    verified: true,
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    tasksCompleted: 6,
    phone: "+91 98765 43223",
    coordinates: { lat: 28.6450, lng: 77.3420 },
  },
  {
    id: "v15",
    name: "Deepak Singh (PWD)",
    city: "New Delhi",
    skills: ["Electrical/Technical Support", "Logistics"],
    available: true,
    verified: true,
    createdAt: new Date(Date.now() - 86400000 * 6).toISOString(),
    tasksCompleted: 14,
    phone: "+91 98765 43224",
    coordinates: { lat: 28.6280, lng: 77.0890 },
  },
];

// Real-world emergency scenarios in Delhi NCR
const seedEmergencies: EmergencyRequest[] = [
  {
    id: "e1",
    type: "medical",
    typeLabel: "Medical Emergency",
    location: "Sector 18 Metro Station, Noida",
    skill: "First Aid",
    urgency: "high",
    description: "Senior citizen collapsed near metro gate. Conscious but needs immediate medical assistance. Family has been notified.",
    createdAt: new Date(Date.now() - 300000).toISOString(),
    status: "pending",
    coordinates: { lat: 28.5700, lng: 77.3210 },
    reportedBy: "Metro Security",
  },
  {
    id: "e2",
    type: "fire",
    typeLabel: "Fire Emergency",
    location: "Connaught Place Block A, New Delhi",
    skill: "Rescue Operations",
    urgency: "high",
    description: "Fire reported in 3rd floor office. Fire brigade en route. Need volunteers for crowd control and evacuation support.",
    createdAt: new Date(Date.now() - 600000).toISOString(),
    status: "pending",
    coordinates: { lat: 28.6315, lng: 77.2167 },
    reportedBy: "Building Security",
  },
  {
    id: "e3",
    type: "flood",
    typeLabel: "Waterlogging",
    location: "Sector 62 Industrial Area, Noida",
    skill: "Logistics",
    urgency: "medium",
    description: "Heavy waterlogging after monsoon rain. Several vehicles stuck. Need help with traffic management and supply distribution to affected workers.",
    createdAt: new Date(Date.now() - 1800000).toISOString(),
    status: "pending",
    coordinates: { lat: 28.6270, lng: 77.3650 },
    reportedBy: "Traffic Police",
  },
  {
    id: "e4",
    type: "infrastructure",
    typeLabel: "Power Outage",
    location: "Fortis Hospital, Dwarka",
    skill: "Electrical/Technical Support",
    urgency: "high",
    description: "Main power grid failure. Backup generators running but need electrical support for critical equipment. Hospital has 50+ patients in ICU.",
    createdAt: new Date(Date.now() - 900000).toISOString(),
    status: "pending",
    coordinates: { lat: 28.5520, lng: 77.0580 },
    reportedBy: "Hospital Admin",
  },
  {
    id: "e5",
    type: "accident",
    typeLabel: "Road Accident",
    location: "NH-24 Near Akshardham, New Delhi",
    skill: "Medical Help",
    urgency: "high",
    description: "Multi-vehicle pile-up on highway. 3 injured, ambulances dispatched. Need medical volunteers for first response until ambulances arrive.",
    createdAt: new Date(Date.now() - 450000).toISOString(),
    status: "pending",
    coordinates: { lat: 28.6127, lng: 77.2773 },
    reportedBy: "Highway Patrol",
  },
  {
    id: "e6",
    type: "medical",
    typeLabel: "Medical Camp Support",
    location: "Gurugram Cyber City",
    skill: "Medical Help",
    urgency: "low",
    description: "Health camp organized by corporate. Need certified medical volunteers to assist with basic health checkups for 200+ employees.",
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    status: "pending",
    coordinates: { lat: 28.4949, lng: 77.0887 },
    reportedBy: "HR Department",
  },
];

// Pre-existing tasks for demo
const seedTasks: Task[] = [
  {
    id: "t1",
    emergencyId: "demo1",
    emergencyType: "Medical Emergency",
    location: "Saket District Centre, New Delhi",
    volunteerId: "v1",
    volunteerName: "Dr. Rahul Sharma",
    status: "in-progress",
    assignedAt: "2:30 PM",
    updatedAt: "2:45 PM",
  },
  {
    id: "t2",
    emergencyId: "demo2",
    emergencyType: "Rescue Operation",
    location: "Lajpat Nagar Market, New Delhi",
    volunteerId: "v5",
    volunteerName: "Vikram Patel",
    status: "completed",
    assignedAt: "11:00 AM",
    updatedAt: "1:30 PM",
  },
  {
    id: "t3",
    emergencyId: "demo3",
    emergencyType: "Logistics Support",
    location: "Indirapuram, Ghaziabad",
    volunteerId: "v3",
    volunteerName: "Amit Kumar",
    status: "assigned",
    assignedAt: "3:15 PM",
    updatedAt: "3:15 PM",
  },
];

function getStoredData<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setStoredData<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
}

// Initialize with seed data if empty
function initializeData() {
  const volunteers = getStoredData<Volunteer[]>("aidlink_volunteers", []);
  const emergencies = getStoredData<EmergencyRequest[]>("aidlink_emergencies", []);
  const tasks = getStoredData<Task[]>("aidlink_tasks", []);
  
  if (volunteers.length === 0) {
    setStoredData("aidlink_volunteers", seedVolunteers);
  }
  if (emergencies.length === 0) {
    setStoredData("aidlink_emergencies", seedEmergencies);
  }
  if (tasks.length === 0) {
    setStoredData("aidlink_tasks", seedTasks);
  }
}

// Initialize on module load
initializeData();

export function useVolunteers() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>(() => 
    getStoredData("aidlink_volunteers", seedVolunteers)
  );

  useEffect(() => {
    setStoredData("aidlink_volunteers", volunteers);
  }, [volunteers]);

  const addVolunteer = useCallback((volunteer: Omit<Volunteer, "id" | "verified" | "createdAt" | "tasksCompleted">) => {
    const newVolunteer: Volunteer = {
      ...volunteer,
      id: `v${Date.now()}`,
      verified: false,
      createdAt: new Date().toISOString(),
      tasksCompleted: 0,
    };
    setVolunteers(prev => [...prev, newVolunteer]);
    return newVolunteer;
  }, []);

  const refreshVolunteers = useCallback(() => {
    setVolunteers(getStoredData("aidlink_volunteers", seedVolunteers));
  }, []);

  return { volunteers, addVolunteer, refreshVolunteers };
}

export function useEmergencies() {
  const [emergencies, setEmergencies] = useState<EmergencyRequest[]>(() => 
    getStoredData("aidlink_emergencies", seedEmergencies)
  );

  useEffect(() => {
    setStoredData("aidlink_emergencies", emergencies);
  }, [emergencies]);

  const addEmergency = useCallback((emergency: Omit<EmergencyRequest, "id" | "createdAt" | "status">) => {
    const newEmergency: EmergencyRequest = {
      ...emergency,
      id: `e${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: "pending",
    };
    setEmergencies(prev => [...prev, newEmergency]);
    return newEmergency;
  }, []);

  const updateEmergencyStatus = useCallback((id: string, status: EmergencyRequest["status"]) => {
    setEmergencies(prev => 
      prev.map(e => e.id === id ? { ...e, status } : e)
    );
  }, []);

  const refreshEmergencies = useCallback(() => {
    setEmergencies(getStoredData("aidlink_emergencies", seedEmergencies));
  }, []);

  return { emergencies, addEmergency, updateEmergencyStatus, refreshEmergencies };
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => 
    getStoredData("aidlink_tasks", seedTasks)
  );

  useEffect(() => {
    setStoredData("aidlink_tasks", tasks);
  }, [tasks]);

  const addTask = useCallback((task: Omit<Task, "id" | "assignedAt" | "updatedAt">) => {
    const now = new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    const newTask: Task = {
      ...task,
      id: `t${Date.now()}`,
      assignedAt: now,
      updatedAt: now,
    };
    setTasks(prev => [...prev, newTask]);
    return newTask;
  }, []);

  const updateTaskStatus = useCallback((id: string, status: Task["status"]) => {
    const now = new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    setTasks(prev => 
      prev.map(t => t.id === id ? { ...t, status, updatedAt: now } : t)
    );
  }, []);

  const refreshTasks = useCallback(() => {
    setTasks(getStoredData("aidlink_tasks", seedTasks));
  }, []);

  return { tasks, addTask, updateTaskStatus, refreshTasks };
}

// Real distance calculation using Haversine formula
export function calculateRealDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Matching logic with real distance calculation
export function calculateMatchScore(volunteer: Volunteer, emergency: EmergencyRequest): number {
  let score = 0;
  
  // Skill match (40 points)
  if (volunteer.skills.includes(emergency.skill)) {
    score += 40;
  }
  
  // Availability (25 points)
  if (volunteer.available) {
    score += 25;
  }
  
  // Verified status (15 points)
  if (volunteer.verified) {
    score += 15;
  }
  
  // Real distance calculation (20 points max)
  if (volunteer.coordinates && emergency.coordinates) {
    const distance = calculateRealDistance(
      volunteer.coordinates.lat,
      volunteer.coordinates.lng,
      emergency.coordinates.lat,
      emergency.coordinates.lng
    );
    
    if (distance < 3) score += 20;
    else if (distance < 5) score += 15;
    else if (distance < 10) score += 10;
    else if (distance < 20) score += 5;
  } else {
    // Fallback location matching
    const volunteerCity = volunteer.city.toLowerCase();
    const emergencyLocation = emergency.location.toLowerCase();
    if (emergencyLocation.includes(volunteerCity) || volunteerCity.includes("noida") || volunteerCity.includes("delhi")) {
      score += 15;
    } else {
      score += 8;
    }
  }
  
  return Math.min(score, 100);
}

export function getMockDistance(volunteer: Volunteer, emergency: EmergencyRequest): string {
  if (volunteer.coordinates && emergency.coordinates) {
    const distance = calculateRealDistance(
      volunteer.coordinates.lat,
      volunteer.coordinates.lng,
      emergency.coordinates.lat,
      emergency.coordinates.lng
    );
    return `${distance.toFixed(1)} km`;
  }
  
  // Fallback
  const volunteerCity = volunteer.city.toLowerCase();
  const emergencyLocation = emergency.location.toLowerCase();
  
  if (emergencyLocation.includes(volunteerCity)) {
    return `${(Math.random() * 1.5 + 0.5).toFixed(1)} km`;
  } else if (volunteerCity.includes("delhi") || volunteerCity.includes("noida")) {
    return `${(Math.random() * 4 + 2).toFixed(1)} km`;
  }
  return `${(Math.random() * 10 + 5).toFixed(1)} km`;
}

// Stats calculation
export function useStats() {
  const { volunteers } = useVolunteers();
  const { emergencies } = useEmergencies();
  const { tasks } = useTasks();

  const stats = {
    totalVolunteers: volunteers.length,
    verifiedVolunteers: volunteers.filter(v => v.verified).length,
    availableVolunteers: volunteers.filter(v => v.available).length,
    totalEmergencies: emergencies.length,
    pendingEmergencies: emergencies.filter(e => e.status === "pending").length,
    resolvedEmergencies: emergencies.filter(e => e.status === "resolved").length,
    activeTasks: tasks.filter(t => t.status !== "completed").length,
    completedTasks: tasks.filter(t => t.status === "completed").length,
    totalTasks: tasks.length,
    tasksCompletedTotal: volunteers.reduce((acc, v) => acc + (v.tasksCompleted || 0), 0),
  };

  return stats;
}

// Export locations for map
export { delhiNCRLocations };