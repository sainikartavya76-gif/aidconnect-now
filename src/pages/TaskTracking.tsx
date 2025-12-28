import { useState } from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Check, Clock, User, MapPin, ArrowRight, Info } from "lucide-react";

type TaskStatus = "assigned" | "in-progress" | "completed";

interface Task {
  id: string;
  type: string;
  location: string;
  volunteer: string;
  status: TaskStatus;
  assignedAt: string;
  updatedAt: string;
}

const initialTasks: Task[] = [
  {
    id: "TK-001",
    type: "Medical Emergency",
    location: "Sector 15, Noida",
    volunteer: "Rahul Sharma",
    status: "in-progress",
    assignedAt: "10:30 AM",
    updatedAt: "10:45 AM",
  },
  {
    id: "TK-002",
    type: "Fire Response",
    location: "Block C, Dwarka",
    volunteer: "Priya Singh",
    status: "assigned",
    assignedAt: "11:00 AM",
    updatedAt: "11:00 AM",
  },
  {
    id: "TK-003",
    type: "Rescue Operation",
    location: "Lajpat Nagar",
    volunteer: "Amit Kumar",
    status: "completed",
    assignedAt: "09:00 AM",
    updatedAt: "10:15 AM",
  },
];

const statusOrder: TaskStatus[] = ["assigned", "in-progress", "completed"];

const TaskTracking = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const handleStatusChange = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== taskId) return task;
        const currentIndex = statusOrder.indexOf(task.status);
        if (currentIndex < statusOrder.length - 1) {
          return {
            ...task,
            status: statusOrder[currentIndex + 1],
            updatedAt: new Date().toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            }),
          };
        }
        return task;
      })
    );
  };

  const getStatusBadgeStatus = (status: TaskStatus) => {
    switch (status) {
      case "assigned":
        return "assigned";
      case "in-progress":
        return "in-progress";
      case "completed":
        return "completed";
    }
  };

  return (
    <MobileLayout>
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Task Tracking
        </h1>
        <p className="text-muted-foreground mb-8">
          Monitor and coordinate emergency response tasks.
        </p>

        {/* Status Flow Indicator */}
        <div className="card-elevated mb-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Task Status Flow</h3>
          <div className="flex items-center justify-between">
            {statusOrder.map((status, index) => (
              <div key={status} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      status === "completed"
                        ? "bg-success/10 text-success"
                        : status === "in-progress"
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {status === "completed" ? (
                      <Check className="w-5 h-5" />
                    ) : status === "in-progress" ? (
                      <Clock className="w-5 h-5" />
                    ) : (
                      <User className="w-5 h-5" />
                    )}
                  </div>
                  <span className="text-xs font-medium mt-2 capitalize text-center">
                    {status.replace("-", " ")}
                  </span>
                </div>
                {index < statusOrder.length - 1 && (
                  <ArrowRight className="w-5 h-5 text-muted-foreground mx-2" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Task Cards */}
        <div className="space-y-5">
          {tasks.map((task, index) => (
            <div
              key={task.id}
              className={`card-elevated animate-slide-up ${
                task.status === "completed" ? "opacity-75" : ""
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-muted-foreground">{task.id}</span>
                  </div>
                  <h3 className="font-semibold text-foreground">{task.type}</h3>
                </div>
                <StatusBadge status={getStatusBadgeStatus(task.status)} />
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {task.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="w-4 h-4" />
                  {task.volunteer}
                </div>
              </div>

              {/* Activity Log */}
              <div className="bg-muted rounded-lg p-3 mb-4">
                <h4 className="text-xs font-medium text-muted-foreground mb-2">Activity</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Assigned</span>
                    <span className="font-medium">{task.assignedAt}</span>
                  </div>
                  {task.status !== "assigned" && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last Updated</span>
                      <span className="font-medium">{task.updatedAt}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">
                    {task.status === "assigned"
                      ? "33%"
                      : task.status === "in-progress"
                      ? "66%"
                      : "100%"}
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${
                      task.status === "completed" ? "bg-success" : "bg-primary"
                    }`}
                    style={{
                      width:
                        task.status === "assigned"
                          ? "33%"
                          : task.status === "in-progress"
                          ? "66%"
                          : "100%",
                    }}
                  />
                </div>
              </div>

              {/* Action Button */}
              {task.status !== "completed" && (
                <Button
                  variant={task.status === "assigned" ? "default" : "success"}
                  className="w-full"
                  onClick={() => handleStatusChange(task.id)}
                >
                  {task.status === "assigned" ? "Start Task" : "Mark Complete"}
                </Button>
              )}
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-muted rounded-xl flex items-start gap-3">
          <Info className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground">
            Data shown is simulated for prototype demonstration.
          </p>
        </div>
      </div>
    </MobileLayout>
  );
};

export default TaskTracking;
