import { useEffect } from "react";
import { Link } from "react-router-dom";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Check, Clock, User, MapPin, ArrowRight, Info, ClipboardList } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTasks, type Task } from "@/hooks/useLocalStorage";

type TaskStatus = "assigned" | "in-progress" | "completed";
const statusOrder: TaskStatus[] = ["assigned", "in-progress", "completed"];

const TaskTracking = () => {
  const { t } = useLanguage();
  const { tasks, updateTaskStatus, refreshTasks } = useTasks();

  // Refresh on mount
  useEffect(() => {
    refreshTasks();
  }, [refreshTasks]);

  const handleStatusChange = (taskId: string, currentStatus: TaskStatus) => {
    const currentIndex = statusOrder.indexOf(currentStatus);
    if (currentIndex < statusOrder.length - 1) {
      updateTaskStatus(taskId, statusOrder[currentIndex + 1]);
    }
  };

  const getProgressPercent = (status: TaskStatus) => {
    switch (status) {
      case "assigned": return 33;
      case "in-progress": return 66;
      case "completed": return 100;
    }
  };

  return (
    <MobileLayout>
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          {t("taskTracking")}
        </h1>
        <p className="text-muted-foreground mb-8">
          {t("taskTrackingSubtitle")}
        </p>

        {/* Status Flow Indicator */}
        <div className="card-elevated mb-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">{t("taskStatusFlow")}</h3>
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
                    {status === "assigned" ? t("assigned") : status === "in-progress" ? t("inProgress") : t("completed")}
                  </span>
                </div>
                {index < statusOrder.length - 1 && (
                  <ArrowRight className="w-5 h-5 text-muted-foreground mx-2" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* No Tasks State */}
        {tasks.length === 0 && (
          <div className="card-elevated text-center py-10">
            <ClipboardList className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">{t("noTasks")}</p>
            <Link to="/matching">
              <Button variant="outline">{t("matching")}</Button>
            </Link>
          </div>
        )}

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
                  <h3 className="font-semibold text-foreground">{task.emergencyType}</h3>
                </div>
                <StatusBadge status={task.status} />
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {task.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="w-4 h-4" />
                  {task.volunteerName}
                </div>
              </div>

              {/* Activity Log */}
              <div className="bg-muted rounded-lg p-3 mb-4">
                <h4 className="text-xs font-medium text-muted-foreground mb-2">{t("activity")}</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("assigned")}</span>
                    <span className="font-medium">{task.assignedAt}</span>
                  </div>
                  {task.status !== "assigned" && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t("lastUpdated")}</span>
                      <span className="font-medium">{task.updatedAt}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">{t("progress")}</span>
                  <span className="font-medium">{getProgressPercent(task.status)}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${
                      task.status === "completed" ? "bg-success" : "bg-primary"
                    }`}
                    style={{ width: `${getProgressPercent(task.status)}%` }}
                  />
                </div>
              </div>

              {/* Action Button */}
              {task.status !== "completed" && (
                <Button
                  variant={task.status === "assigned" ? "default" : "success"}
                  className="w-full"
                  onClick={() => handleStatusChange(task.id, task.status)}
                >
                  {task.status === "assigned" ? t("startTask") : t("markComplete")}
                </Button>
              )}
            </div>
          ))}
        </div>

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

export default TaskTracking;
