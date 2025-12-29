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

// Rich seed data for impressive demo
const seedVolunteers: Volunteer[] = [
  {
    id: "v1",
    name: "Rahul Sharma",
    city: "Noida",
    skills: ["First Aid", "Medical Help"],
    available: true,
    verified: true,
    createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
    tasksCompleted: 12,
  },
  {
    id: "v2",
    name: "Priya Singh",
    city: "Delhi",
    skills: ["First Aid", "Driving"],
    available: true,
    verified: true,
    createdAt: new Date(Date.now() - 86400000 * 25).toISOString(),
    tasksCompleted: 8,
  },
  {
    id: "v3",
    name: "Amit Kumar",
    city: "Noida",
    skills: ["Rescue Operations", "Logistics"],
    available: true,
    verified: true,
    createdAt: new Date(Date.now() - 86400000 * 20).toISOString(),
    tasksCompleted: 15,
  },
  {
    id: "v4",
    name: "Sneha Gupta",
    city: "Gurgaon",
    skills: ["Medical Help", "Communication Support"],
    available: true,
    verified: true,
    createdAt: new Date(Date.now() - 86400000 * 18).toISOString(),
    tasksCompleted: 6,
  },
  {
    id: "v5",
    name: "Vikram Patel",
    city: "Delhi",
    skills: ["Rescue Operations", "First Aid", "Driving"],
    available: true,
    verified: true,
    createdAt: new Date(Date.now() - 86400000 * 15).toISOString(),
    tasksCompleted: 22,
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
  },
  {
    id: "v8",
    name: "Kavita Joshi",
    city: "Delhi",
    skills: ["Medical Help", "First Aid"],
    available: true,
    verified: true,
    createdAt: new Date(Date.now() - 86400000 * 8).toISOString(),
    tasksCompleted: 11,
  },
  {
    id: "v9",
    name: "Suresh Nair",
    city: "Ghaziabad",
    skills: ["Rescue Operations", "Electrical/Technical Support"],
    available: true,
    verified: false,
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    tasksCompleted: 3,
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
  },
  {
    id: "v11",
    name: "Arjun Mehta",
    city: "Delhi",
    skills: ["Driving", "Logistics", "First Aid"],
    available: true,
    verified: true,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    tasksCompleted: 18,
  },
  {
    id: "v12",
    name: "Pooja Sharma",
    city: "Gurgaon",
    skills: ["Medical Help", "Communication Support"],
    available: false,
    verified: true,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    tasksCompleted: 4,
  },
];

const seedEmergencies: EmergencyRequest[] = [
  {
    id: "e1",
    type: "medical",
    typeLabel: "Medical",
    location: "Sector 15, Noida",
    skill: "First Aid",
    urgency: "high",
    description: "Person injured in road accident, requires immediate first aid assistance.",
    createdAt: new Date(Date.now() - 300000).toISOString(),
    status: "pending",
  },
  {
    id: "e2",
    type: "fire",
    typeLabel: "Fire",
    location: "Connaught Place, Delhi",
    skill: "Rescue Operations",
    urgency: "high",
    description: "Small fire in commercial building, evacuation support needed.",
    createdAt: new Date(Date.now() - 600000).toISOString(),
    status: "pending",
  },
  {
    id: "e3",
    type: "flood",
    typeLabel: "Flood",
    location: "Sector 62, Noida",
    skill: "Logistics",
    urgency: "medium",
    description: "Waterlogging in residential area, need help with supply distribution.",
    createdAt: new Date(Date.now() - 1800000).toISOString(),
    status: "pending",
  },
  {
    id: "e4",
    type: "infrastructure",
    typeLabel: "Infrastructure",
    location: "Dwarka, Delhi",
    skill: "Electrical/Technical Support",
    urgency: "medium",
    description: "Power outage affecting hospital backup systems.",
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    status: "pending",
  },
  {
    id: "e5",
    type: "accident",
    typeLabel: "Accident",
    location: "NH-24, Ghaziabad",
    skill: "Medical Help",
    urgency: "high",
    description: "Multi-vehicle collision, medical professionals needed urgently.",
    createdAt: new Date(Date.now() - 900000).toISOString(),
    status: "pending",
  },
];

const seedTasks: Task[] = [
  {
    id: "t1",
    emergencyId: "demo1",
    emergencyType: "Medical",
    location: "Sector 18, Noida",
    volunteerId: "v1",
    volunteerName: "Rahul Sharma",
    status: "in-progress",
    assignedAt: "2:30 PM",
    updatedAt: "2:45 PM",
  },
  {
    id: "t2",
    emergencyId: "demo2",
    emergencyType: "Rescue",
    location: "Lajpat Nagar, Delhi",
    volunteerId: "v5",
    volunteerName: "Vikram Patel",
    status: "completed",
    assignedAt: "11:00 AM",
    updatedAt: "1:30 PM",
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

// Matching logic with improved scoring
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
  
  // Location proximity simulation (20 points max)
  const volunteerCity = volunteer.city.toLowerCase();
  const emergencyLocation = emergency.location.toLowerCase();
  if (emergencyLocation.includes(volunteerCity) || volunteerCity.includes("noida") || volunteerCity.includes("delhi")) {
    score += 20;
  } else if (volunteerCity.includes("gurgaon") || volunteerCity.includes("ghaziabad") || volunteerCity.includes("faridabad")) {
    score += 15;
  } else {
    score += 8;
  }
  
  return Math.min(score, 100);
}

export function getMockDistance(volunteer: Volunteer, emergency: EmergencyRequest): string {
  const volunteerCity = volunteer.city.toLowerCase();
  const emergencyLocation = emergency.location.toLowerCase();
  
  if (emergencyLocation.includes(volunteerCity)) {
    return `${(Math.random() * 1.5 + 0.3).toFixed(1)} km`;
  } else if (volunteerCity.includes("delhi") || volunteerCity.includes("noida")) {
    return `${(Math.random() * 3 + 1).toFixed(1)} km`;
  } else if (volunteerCity.includes("gurgaon") || volunteerCity.includes("ghaziabad")) {
    return `${(Math.random() * 5 + 2).toFixed(1)} km`;
  }
  return `${(Math.random() * 8 + 4).toFixed(1)} km`;
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