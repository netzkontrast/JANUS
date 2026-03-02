import type { ProjectData } from "@/lib/data";
import { Lightbulb, Puzzle } from "lucide-react";

export function ArchitecturePanel({ data }: { data: ProjectData }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="mb-5">
        <h2 className="font-mono text-sm font-bold text-foreground">
          Architecture
        </h2>
        <p className="text-xs text-muted-foreground">
          Parsed from PROJECT.md
        </p>
      </div>

      <div className="mb-5 rounded-lg border border-primary/20 bg-primary/5 p-4">
        <p className="text-sm leading-relaxed text-foreground">
          {data.vision}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <h3 className="mb-3 flex items-center gap-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            <Lightbulb className="h-3.5 w-3.5 text-primary" />
            Core Philosophy
          </h3>
          <div className="flex flex-col gap-2">
            {data.philosophy.map((p, i) => (
              <div
                key={i}
                className="rounded-md border border-border bg-secondary/30 px-3 py-2 text-xs leading-relaxed text-foreground"
              >
                {p}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-3 flex items-center gap-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            <Puzzle className="h-3.5 w-3.5 text-primary" />
            Key Components
          </h3>
          <div className="flex flex-col gap-2">
            {data.components.map((c, i) => (
              <div
                key={i}
                className="rounded-md border border-border bg-secondary/30 px-3 py-2 text-xs leading-relaxed text-foreground"
              >
                {c}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
