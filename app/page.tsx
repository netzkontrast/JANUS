import { AgentCards } from "@/components/agent-cards";
import { StatePanel } from "@/components/state-panel";
import { RoadmapPanel } from "@/components/roadmap-panel";
import { SessionTimeline } from "@/components/session-timeline";
import { MemoryGraph } from "@/components/memory-graph";
import { RequirementsPanel } from "@/components/requirements-panel";
import { ArchitecturePanel } from "@/components/architecture-panel";
import { PageHeader } from "@/components/page-header";
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
    <div className="min-h-screen">
      <PageHeader
        title="Mission Control"
        description="Echtzeit-Ubersicht des JANUS Dual-Kognitions-Orchestrierungssystems. Externalisierter GSD-Gedachtnisgraph."
      />

      <main className="px-6 py-6">
        <div className="flex flex-col gap-6">
          <AgentCards />
          <StatePanel data={stateData} />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <ArchitecturePanel data={projectData} />
            <MemoryGraph
              nodes={memoryGraph.nodes}
              edges={memoryGraph.edges}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <RoadmapPanel phases={roadmapPhases} />
            <RequirementsPanel phases={requirements} />
            <SessionTimeline sessions={sessions} />
          </div>
        </div>
      </main>
    </div>
  );
}
