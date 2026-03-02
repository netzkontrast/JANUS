import { cn } from "@/lib/utils";
import type { RoadmapPhase } from "@/lib/data";
import { CheckCircle2, Circle, ArrowRight } from "lucide-react";

export function RoadmapPanel({ phases }: { phases: RoadmapPhase[] }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="mb-5">
        <h2 className="font-mono text-sm font-bold text-foreground">
          Roadmap
        </h2>
        <p className="text-xs text-muted-foreground">
          Parsed from ROADMAP.md
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {phases.map((phase, i) => {
          const done = phase.milestones.filter((m) => m.done).length;
          const total = phase.milestones.length;
          const progress = total > 0 ? (done / total) * 100 : 0;
          const isActive = phase.status.toLowerCase().includes("in progress");

          return (
            <div key={i} className="relative">
              {i < phases.length - 1 && (
                <div className="absolute left-[15px] top-10 bottom-0 w-px bg-border" />
              )}

              <div className="flex gap-4">
                <div
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2",
                    isActive
                      ? "border-primary bg-primary/10 text-primary"
                      : progress === 100
                        ? "border-success bg-success/10 text-success"
                        : "border-border bg-secondary text-muted-foreground"
                  )}
                >
                  <span className="font-mono text-xs font-bold">
                    {i + 1}
                  </span>
                </div>

                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <h3 className="font-mono text-sm font-medium text-foreground">
                      {phase.title}
                    </h3>
                    {phase.quarter && (
                      <span className="rounded-full bg-secondary px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                        {phase.quarter}
                      </span>
                    )}
                    {isActive && (
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 font-mono text-[10px] font-medium text-primary">
                        Active
                      </span>
                    )}
                  </div>

                  {phase.goal && (
                    <p className="mb-3 text-xs leading-relaxed text-muted-foreground">
                      {phase.goal}
                    </p>
                  )}

                  {total > 0 && (
                    <div className="mb-3">
                      <div className="mb-1.5 flex items-center justify-between">
                        <span className="font-mono text-[10px] text-muted-foreground">
                          {done}/{total} milestones
                        </span>
                        <span className="font-mono text-[10px] text-muted-foreground">
                          {Math.round(progress)}%
                        </span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all",
                            progress === 100
                              ? "bg-success"
                              : "bg-primary"
                          )}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col gap-1">
                    {phase.milestones.map((m, mi) => (
                      <div
                        key={mi}
                        className="flex items-center gap-2 text-xs"
                      >
                        {m.done ? (
                          <CheckCircle2 className="h-3 w-3 shrink-0 text-success/60" />
                        ) : (
                          <Circle className="h-3 w-3 shrink-0 text-muted-foreground/40" />
                        )}
                        <span
                          className={cn(
                            m.done
                              ? "text-muted-foreground line-through"
                              : "text-foreground"
                          )}
                        >
                          {m.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  {phase.milestones.length === 0 && phase.goal && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <ArrowRight className="h-3 w-3 text-primary/60" />
                      <span>{phase.goal}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
