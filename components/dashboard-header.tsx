import { cn } from "@/lib/utils";
import {
  Activity,
  Brain,
  Clock,
  Zap,
  Radio,
} from "lucide-react";

export function DashboardHeader() {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Brain className="h-5 w-5" />
              <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-card bg-success" />
            </div>
            <div>
              <h1 className="font-mono text-lg font-bold tracking-tight text-foreground">
                JANUS
              </h1>
              <p className="text-xs text-muted-foreground">
                Dual-Agent Orchestration System
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <StatusIndicator
            icon={<Radio className="h-3.5 w-3.5" />}
            label="MCP Server"
            value="Idle"
            variant="muted"
          />
          <StatusIndicator
            icon={<Activity className="h-3.5 w-3.5" />}
            label="Context Mode"
            value="Architect"
            variant="primary"
          />
          <StatusIndicator
            icon={<Clock className="h-3.5 w-3.5" />}
            label="Last Session"
            value="Session 7"
            variant="default"
          />
          <StatusIndicator
            icon={<Zap className="h-3.5 w-3.5" />}
            label="GSD Phase"
            value="Planning"
            variant="warning"
          />
        </div>
      </div>
    </header>
  );
}

function StatusIndicator({
  icon,
  label,
  value,
  variant,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  variant: "primary" | "default" | "muted" | "warning";
}) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={cn(
          "flex items-center justify-center",
          variant === "primary" && "text-primary",
          variant === "default" && "text-foreground",
          variant === "muted" && "text-muted-foreground",
          variant === "warning" && "text-warning"
        )}
      >
        {icon}
      </span>
      <div className="flex flex-col">
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        <span
          className={cn(
            "font-mono text-xs font-medium",
            variant === "primary" && "text-primary",
            variant === "default" && "text-foreground",
            variant === "muted" && "text-muted-foreground",
            variant === "warning" && "text-warning"
          )}
        >
          {value}
        </span>
      </div>
    </div>
  );
}
