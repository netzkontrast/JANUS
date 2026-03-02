import { DashboardHeader } from "@/components/dashboard-header";
import { AgentCards } from "@/components/agent-cards";
import { StatePanel } from "@/components/state-panel";
import { RoadmapPanel } from "@/components/roadmap-panel";
import { SessionTimeline } from "@/components/session-timeline";
import { MemoryGraph } from "@/components/memory-graph";
import { RequirementsPanel } from "@/components/requirements-panel";
import { ArchitecturePanel } from "@/components/architecture-panel";
import {
  getStateData,
  getRoadmapData,
  getSessionHistory,
  getMemoryGraph,
  getRequirementsData,
  getProjectData,
} from "@/lib/data";

export default function DashboardPage() {
  const stateData = getStateData();
  const roadmapPhases = getRoadmapData();
  const sessions = getSessionHistory();
  const memoryGraph = getMemoryGraph();
  const requirements = getRequirementsData();
  const projectData = getProjectData();

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8">
          <h2 className="text-balance text-2xl font-bold tracking-tight text-foreground">
            Mission Control
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Real-time overview of the JANUS dual-cognition orchestration
            system, parsed from the GSD externalized memory graph.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {/* Dual Agent Overview */}
          <AgentCards />

          {/* System State */}
          <StatePanel data={stateData} />

          {/* Architecture + Memory Graph */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <ArchitecturePanel data={projectData} />
            <MemoryGraph
              nodes={memoryGraph.nodes}
              edges={memoryGraph.edges}
            />
          </div>

          {/* Roadmap + Requirements + Session History */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <RoadmapPanel phases={roadmapPhases} />
            <RequirementsPanel phases={requirements} />
            <SessionTimeline sessions={sessions} />
          </div>
        </div>

        <footer className="mt-12 border-t border-border pt-6 pb-8">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <p className="font-mono">
              JANUS v1.0 -- Dual-Agent Orchestration System
            </p>
            <p>
              System 2 (Jules) + System 1 (zeroclaw) -- GSD Methodology
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
