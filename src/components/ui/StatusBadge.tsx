import { cn } from "@/lib/utils";

type Status = "pending" | "verified" | "assigned" | "in-progress" | "completed" | "available" | "on-duty";
type Urgency = "low" | "medium" | "high";

interface StatusBadgeProps {
  status?: Status;
  urgency?: Urgency;
  className?: string;
}

const statusConfig: Record<Status, { label: string; className: string }> = {
  pending: { label: "Pending", className: "bg-warning/10 text-warning border-warning/20" },
  verified: { label: "Verified", className: "bg-success/10 text-success border-success/20" },
  assigned: { label: "Assigned", className: "bg-secondary/10 text-secondary border-secondary/20" },
  "in-progress": { label: "In Progress", className: "bg-primary/10 text-primary border-primary/20" },
  completed: { label: "Completed", className: "bg-success/10 text-success border-success/20" },
  available: { label: "Available", className: "bg-success/10 text-success border-success/20" },
  "on-duty": { label: "On Duty", className: "bg-primary/10 text-primary border-primary/20" },
};

const urgencyConfig: Record<Urgency, { label: string; className: string }> = {
  low: { label: "Low", className: "bg-success/10 text-success border-success/20" },
  medium: { label: "Medium", className: "bg-warning/10 text-warning border-warning/20" },
  high: { label: "High", className: "bg-destructive/10 text-destructive border-destructive/20" },
};

export function StatusBadge({ status, urgency, className }: StatusBadgeProps) {
  const config = status ? statusConfig[status] : urgency ? urgencyConfig[urgency] : null;
  
  if (!config) return null;

  return (
    <span 
      className={cn(
        "status-badge border",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
