import { cn } from "@/lib/utils";
import type { RequirementPhase } from "@/lib/data";
import { CheckCircle2, Circle, Layers } from "lucide-react";

export function RequirementsPanel({
  phases,
}: {
  phases: RequirementPhase[];
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="mb-5">
        <h2 className="font-mono text-sm font-bold text-foreground">
          Requirements
        </h2>
        <p className="text-xs text-muted-foreground">
          Parsed from REQUIREMENTS.md
        </p>
      </div>

      <div className="flex flex-col gap-5">
        {phases.map((phase, i) => {
          const done = phase.items.filter((m) => m.done).length;
          const total = phase.items.length;
          const progress = total > 0 ? (done / total) * 100 : 0;

          return (
            <div key={i}>
              <div className="mb-2 flex items-center gap-2">
                <Layers className="h-3.5 w-3.5 text-primary" />
                <h3 className="font-mono text-xs font-medium text-foreground">
                  {phase.title}
                </h3>
                {total > 0 && (
                  <span className="ml-auto font-mono text-[10px] text-muted-foreground">
                    {done}/{total}
                  </span>
                )}
              </div>

              {total > 0 && (
                <div className="mb-2.5 h-1 overflow-hidden rounded-full bg-secondary">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all",
                      progress === 100 ? "bg-success" : "bg-primary"
                    )}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              )}

              <div className="flex flex-col gap-1">
                {phase.items.map((item, ii) => (
                  <div
                    key={ii}
                    className="flex items-start gap-2 text-xs"
                  >
                    {item.done ? (
                      <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-success/60" />
                    ) : (
                      <Circle className="mt-0.5 h-3 w-3 shrink-0 text-muted-foreground/40" />
                    )}
                    <span
                      className={cn(
                        item.done
                          ? "text-muted-foreground line-through"
                          : "text-foreground"
                      )}
                    >
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
