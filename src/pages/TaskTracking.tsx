import { useEffect } from "react";
import { Link } from "react-router-dom";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Check, Clock, User, MapPin, ArrowRight, Info, ClipboardList, Play, CheckCircle2, Zap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTasks, useStats, type Task } from "@/hooks/useLocalStorage";
import { toast } from "@/hooks/use-toast";

type TaskStatus = "assigned" | "in-progress" | "completed";
const statusOrder: TaskStatus[] = ["assigned", "in-progress", "completed"];

const TaskTracking = () => {
  const { t } = useLanguage();
  const { tasks, updateTaskStatus, refreshTasks } = useTasks();
  const stats = useStats();

  // Refresh on mount
  useEffect(() => {
    refreshTasks();
  }, [refreshTasks]);

  const handleStatusChange = (task: Task) => {
    const currentIndex = statusOrder.indexOf(task.status);
    if (currentIndex < statusOrder.length - 1) {
      const newStatus = statusOrder[currentIndex + 1];
      updateTaskStatus(task.id, newStatus);
      
      toast({
        title: newStatus === "in-progress" ? "🚀 Task Started!" : "✅ Task Completed!",
        description: `${task.emergencyType} - ${task.volunteerName}`,
      });
    }
  };

  const getProgressPercent = (status: TaskStatus) => {
    switch (status) {
      case "assigned": return 33;
      case "in-progress": return 66;
      case "completed": return 100;
    }
  };

  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case "assigned": return User;
      case "in-progress": return Play;
      case "completed": return CheckCircle2;
    }
  };

  const activeTasks = tasks.filter(t => t.status !== "completed");
  const completedTasks = tasks.filter(t => t.status === "completed");

  return (
    <MobileLayout>
      <div className="animate-fade-in">
        {/* Header */}
        <div className="flex items-center gap-4 mb-2">
          <div className="w-14 h-14 rounded-2xl gradient-success flex items-center justify-center shadow-glow-success">
            <ClipboardList className="w-7 h-7 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {t("taskTracking")}
            </h1>
            <p className="text-sm text-muted-foreground">
              {t("taskTrackingSubtitle")}
            </p>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="flex gap-3 mb-6 mt-4">
          <div className="flex-1 p-3 rounded-xl bg-warning/5 border border-warning/10 text-center">
            <div className="text-xl font-bold text-warning">{stats.activeTasks}</div>
            <div className="text-xs text-muted-foreground">Active</div>
          </div>
          <div className="flex-1 p-3 rounded-xl bg-success/5 border border-success/10 text-center">
            <div className="text-xl font-bold text-success">{stats.completedTasks}</div>
            <div className="text-xs text-muted-foreground">Completed</div>
          </div>
          <div className="flex-1 p-3 rounded-xl bg-primary/5 border border-primary/10 text-center">
            <div className="text-xl font-bold text-primary">{stats.tasksCompletedTotal}</div>
            <div className="text-xs text-muted-foreground">All Time</div>
          </div>
        </div>

        {/* Status Flow Indicator */}
        <div className="card-elevated mb-6">
          <h3 className="text-sm font-semibold text-muted-foreground mb-4">{t("taskStatusFlow")}</h3>
          <div className="flex items-center justify-between">
            {statusOrder.map((status, index) => {
              const Icon = getStatusIcon(status);
              return (
                <div key={status} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        status === "completed"
                          ? "bg-success/10 text-success"
                          : status === "in-progress"
                          ? "bg-warning/10 text-warning"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold mt-2 capitalize text-center">
                      {status === "assigned" ? t("assigned") : status === "in-progress" ? t("inProgress") : t("completed")}
                    </span>
                  </div>
                  {index < statusOrder.length - 1 && (
                    <ArrowRight className="w-5 h-5 text-muted-foreground mx-2" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* No Tasks State */}
        {tasks.length === 0 && (
          <div className="card-elevated text-center py-12">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <ClipboardList className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">{t("noTasks")}</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs mx-auto">
              Assign volunteers from the matching screen to create tasks
            </p>
            <Link to="/matching">
              <Button variant="outline">{t("matching")}</Button>
            </Link>
          </div>
        )}

        {/* Active Tasks */}
        {activeTasks.length > 0 && (
          <div className="mb-6">
            <h3 className="section-title flex items-center gap-2 mb-4">
              <span className="w-1 h-5 rounded-full bg-warning" />
              Active Tasks ({activeTasks.length})
            </h3>
            <div className="space-y-4">
              {activeTasks.map((task, index) => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onStatusChange={() => handleStatusChange(task)}
                  t={t}
                  index={index}
                />
              ))}
            </div>
          </div>
        )}

        {/* Completed Tasks */}
        {completedTasks.length > 0 && (
          <div className="mb-6">
            <h3 className="section-title flex items-center gap-2 mb-4">
              <span className="w-1 h-5 rounded-full bg-success" />
              Completed ({completedTasks.length})
            </h3>
            <div className="space-y-4">
              {completedTasks.map((task, index) => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onStatusChange={() => {}}
                  t={t}
                  index={index}
                />
              ))}
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

// Task Card Component
function TaskCard({ task, onStatusChange, t, index }: { 
  task: Task; 
  onStatusChange: () => void; 
  t: (key: string) => string;
  index: number;
}) {
  const getProgressPercent = (status: TaskStatus) => {
    switch (status) {
      case "assigned": return 33;
      case "in-progress": return 66;
      case "completed": return 100;
    }
  };

  return (
    <div
      className={`card-elevated animate-slide-up ${
        task.status === "completed" ? "opacity-80" : ""
      }`}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            task.status === "completed" 
              ? "bg-success/10" 
              : task.status === "in-progress"
              ? "bg-warning/10"
              : "bg-primary/10"
          }`}>
            {task.status === "completed" ? (
              <CheckCircle2 className="w-5 h-5 text-success" />
            ) : task.status === "in-progress" ? (
              <Zap className="w-5 h-5 text-warning" />
            ) : (
              <User className="w-5 h-5 text-primary" />
            )}
          </div>
          <div>
            <h3 className="font-bold text-foreground">{task.emergencyType}</h3>
            <span className="text-xs font-mono text-muted-foreground">{task.id}</span>
          </div>
        </div>
        <StatusBadge status={task.status} />
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="font-medium text-foreground">{task.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <User className="w-4 h-4 text-primary" />
          <span className="font-medium text-foreground">{task.volunteerName}</span>
        </div>
      </div>

      {/* Activity Log */}
      <div className="bg-muted/50 rounded-xl p-3 mb-4">
        <h4 className="text-xs font-semibold text-muted-foreground mb-2">{t("activity")}</h4>
        <div className="space-y-1.5 text-xs">
          <div className="flex justify-between">
            <span className="text-muted-foreground">{t("assigned")}</span>
            <span className="font-medium text-foreground">{task.assignedAt}</span>
          </div>
          {task.status !== "assigned" && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t("lastUpdated")}</span>
              <span className="font-medium text-foreground">{task.updatedAt}</span>
            </div>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs mb-1.5">
          <span className="text-muted-foreground font-medium">{t("progress")}</span>
          <span className="font-bold text-foreground">{getProgressPercent(task.status)}%</span>
        </div>
        <div className="h-2.5 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 rounded-full ${
              task.status === "completed" ? "bg-success" : task.status === "in-progress" ? "bg-warning" : "bg-primary"
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
          onClick={onStatusChange}
        >
          {task.status === "assigned" ? (
            <>
              <Play className="w-4 h-4" />
              {t("startTask")}
            </>
          ) : (
            <>
              <CheckCircle2 className="w-4 h-4" />
              {t("markComplete")}
            </>
          )}
        </Button>
      )}

      {task.status === "completed" && (
        <div className="flex items-center justify-center gap-2 p-3 bg-success/10 rounded-xl">
          <CheckCircle2 className="w-5 h-5 text-success" />
          <span className="font-semibold text-success">Task Completed</span>
        </div>
      )}
    </div>
  );
}

export default TaskTracking;