import { cn } from "@/lib/utils";
import type { StateData } from "@/lib/data";
import {
  CheckCircle2,
  Circle,
  AlertTriangle,
  Target,
} from "lucide-react";

export function StatePanel({ data }: { data: StateData }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="font-mono text-sm font-bold text-foreground">
            System State
          </h2>
          <p className="text-xs text-muted-foreground">
            Parsed from STATE.md
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-3 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-success" />
          <span className="font-mono text-[10px] text-muted-foreground">
            {data.lastUpdate}
          </span>
        </div>
      </div>

      <div className="mb-5 flex items-start gap-3 rounded-lg border border-primary/20 bg-primary/5 p-3">
        <Target className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider text-primary">
            Current Focus
          </p>
          <p className="mt-0.5 text-sm leading-relaxed text-foreground">
            {data.focus || data.currentTask}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div>
          <h3 className="mb-3 flex items-center gap-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            <CheckCircle2 className="h-3.5 w-3.5 text-success" />
            Completed ({data.completed.length})
          </h3>
          <div className="flex max-h-64 flex-col gap-1 overflow-y-auto pr-1">
            {data.completed.slice(0, 12).map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-2 rounded-md px-2 py-1.5 text-xs text-muted-foreground"
              >
                <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-success/60" />
                <span className="line-clamp-2">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-3 flex items-center gap-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            <Circle className="h-3.5 w-3.5 text-primary" />
            Pending ({data.pending.length})
          </h3>
          <div className="flex flex-col gap-1">
            {data.pending.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-2 rounded-md px-2 py-1.5 text-xs text-foreground"
              >
                <Circle className="mt-0.5 h-3 w-3 shrink-0 text-primary/60" />
                <span className="line-clamp-2">{item.text}</span>
              </div>
            ))}
          </div>

          {data.blockers.length > 0 && (
            <div className="mt-4">
              <h3 className="mb-3 flex items-center gap-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                <AlertTriangle className="h-3.5 w-3.5 text-destructive" />
                Blockers
              </h3>
              <div className="flex flex-col gap-1">
                {data.blockers.map((b, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex items-start gap-2 rounded-md border border-destructive/20 bg-destructive/5 px-2 py-1.5 text-xs text-foreground"
                    )}
                  >
                    <AlertTriangle className="mt-0.5 h-3 w-3 shrink-0 text-destructive/60" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
