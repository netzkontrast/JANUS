import { cn } from "@/lib/utils";
import { Brain, Zap, ArrowRight } from "lucide-react";

export function AgentCards() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <AgentCard
        name="Jules"
        system="System 2"
        subtitle="Slow-Thinking Orchestrator"
        icon={<Brain className="h-5 w-5" />}
        description="Deliberate, reflexive, and strategic. Maintains global architecture, manages system state, and orchestrates complex plans. Never rushes into writing code."
        traits={[
          "Asynchronous",
          "State-Aware",
          "Deliberative",
          "Philosophical",
        ]}
        responsibilities={[
          "Architecture & Planning",
          "GSD Memory Graph",
          "Context Engineering",
          "Session Lifecycle",
        ]}
        variant="system2"
      />
      <AgentCard
        name="zeroclaw"
        system="System 1"
        subtitle="Fast-Thinking Executor"
        icon={<Zap className="h-5 w-5" />}
        description='Reactive sub-agent infrastructure. Instantiated for fast, isolated, parallel execution and experimental tasks. Operates in "YOLO" mode, validating hypotheses through compiler output.'
        traits={[
          "Reactive",
          "Parallel",
          "Isolated",
          "Adversarial",
        ]}
        responsibilities={[
          "CodeAct Validation",
          "Hypothesis Testing",
          "Compiler Loops",
          "API Queries",
        ]}
        variant="system1"
      />
    </div>
  );
}

function AgentCard({
  name,
  system,
  subtitle,
  icon,
  description,
  traits,
  responsibilities,
  variant,
}: {
  name: string;
  system: string;
  subtitle: string;
  icon: React.ReactNode;
  description: string;
  traits: string[];
  responsibilities: string[];
  variant: "system1" | "system2";
}) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/30",
      )}
    >
      <div
        className={cn(
          "absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100",
          variant === "system2"
            ? "bg-gradient-to-br from-primary/5 to-transparent"
            : "bg-gradient-to-br from-warning/5 to-transparent"
        )}
      />

      <div className="relative">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-lg",
                variant === "system2"
                  ? "bg-primary/10 text-primary"
                  : "bg-warning/10 text-warning"
              )}
            >
              {icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-mono text-sm font-bold text-foreground">
                  {name}
                </h3>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 font-mono text-[10px] font-medium",
                    variant === "system2"
                      ? "bg-primary/10 text-primary"
                      : "bg-warning/10 text-warning"
                  )}
                >
                  {system}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            </div>
          </div>
        </div>

        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>

        <div className="mb-4">
          <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            Traits
          </p>
          <div className="flex flex-wrap gap-1.5">
            {traits.map((trait) => (
              <span
                key={trait}
                className="rounded-md border border-border bg-secondary/50 px-2 py-0.5 font-mono text-[11px] text-secondary-foreground"
              >
                {trait}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            Responsibilities
          </p>
          <div className="flex flex-col gap-1.5">
            {responsibilities.map((r) => (
              <div
                key={r}
                className="flex items-center gap-2 text-xs text-muted-foreground"
              >
                <ArrowRight className="h-3 w-3 shrink-0 text-primary/60" />
                <span>{r}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
