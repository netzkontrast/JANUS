import { cn } from "@/lib/utils";
import type { SessionEntry } from "@/lib/data";
import { Clock, ChevronRight } from "lucide-react";

export function SessionTimeline({
  sessions,
}: {
  sessions: SessionEntry[];
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="mb-5">
        <h2 className="font-mono text-sm font-bold text-foreground">
          Session History
        </h2>
        <p className="text-xs text-muted-foreground">
          Episodic memory from .sessions/
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {sessions.map((session, i) => (
          <div
            key={session.id}
            className={cn(
              "relative rounded-lg border border-border p-4 transition-colors hover:border-primary/20",
              i === 0 && "border-primary/20 bg-primary/5"
            )}
          >
            <div className="mb-2 flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="font-mono text-xs font-bold text-foreground">
                {session.summary}
              </span>
              {i === 0 && (
                <span className="rounded-full bg-primary/10 px-2 py-0.5 font-mono text-[10px] font-medium text-primary">
                  Latest
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1 pl-5">
              {session.highlights.map((h, hi) => (
                <div
                  key={hi}
                  className="flex items-start gap-1.5 text-xs text-muted-foreground"
                >
                  <ChevronRight className="mt-0.5 h-3 w-3 shrink-0 text-primary/40" />
                  <span className="line-clamp-2">{h}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
