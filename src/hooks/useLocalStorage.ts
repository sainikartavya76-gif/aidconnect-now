import { useState, useEffect, useCallback } from "react";

export interface Volunteer {
  id: string;
  name: string;
  city: string;
  skills: string[];
  available: boolean;
  verified: boolean;
  createdAt: string;
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

// Seed data for demo
const seedVolunteers: Volunteer[] = [
  {
    id: "v1",
    name: "Rahul Sharma",
    city: "Noida",
    skills: ["First Aid", "Medical Help"],
    available: true,
    verified: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "v2",
    name: "Priya Singh",
    city: "Delhi",
    skills: ["First Aid", "Driving"],
    available: true,
    verified: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "v3",
    name: "Amit Kumar",
    city: "Noida",
    skills: ["Rescue Operations", "Logistics"],
    available: true,
    verified: true,
    createdAt: new Date().toISOString(),
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
    createdAt: new Date().toISOString(),
    status: "pending",
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
  
  if (volunteers.length === 0) {
    setStoredData("aidlink_volunteers", seedVolunteers);
  }
  if (emergencies.length === 0) {
    setStoredData("aidlink_emergencies", seedEmergencies);
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

  const addVolunteer = useCallback((volunteer: Omit<Volunteer, "id" | "verified" | "createdAt">) => {
    const newVolunteer: Volunteer = {
      ...volunteer,
      id: `v${Date.now()}`,
      verified: false,
      createdAt: new Date().toISOString(),
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
    getStoredData("aidlink_tasks", [])
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
    setTasks(getStoredData("aidlink_tasks", []));
  }, []);

  return { tasks, addTask, updateTaskStatus, refreshTasks };
}

// Matching logic
export function calculateMatchScore(volunteer: Volunteer, emergency: EmergencyRequest): number {
  let score = 0;
  
  // Skill match (50 points)
  if (volunteer.skills.includes(emergency.skill)) {
    score += 50;
  }
  
  // Availability (30 points)
  if (volunteer.available) {
    score += 30;
  }
  
  // Location proximity simulation (20 points max)
  const volunteerCity = volunteer.city.toLowerCase();
  const emergencyLocation = emergency.location.toLowerCase();
  if (emergencyLocation.includes(volunteerCity) || volunteerCity.includes("noida") || volunteerCity.includes("delhi")) {
    score += 20;
  } else {
    score += 10; // Partial points for any registered volunteer
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
  }
  return `${(Math.random() * 5 + 2).toFixed(1)} km`;
}
