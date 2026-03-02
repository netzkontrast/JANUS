import {
  readMarkdownFile,
  parseChecklist,
  parseMarkdownSections,
  type ChecklistItem,
  type ParsedSection,
} from "./markdown";

// --- Project Data ---

export interface ProjectData {
  vision: string;
  philosophy: string[];
  components: string[];
}

export function getProjectData(): ProjectData {
  const md = readMarkdownFile("PROJECT.md");
  const sections = parseMarkdownSections(md);

  const visionSection = sections.find((s) =>
    s.title.toLowerCase().includes("vision")
  );
  const vision =
    visionSection?.content.split("\n")[0] ||
    "Autonomous, self-orchestrating development environment.";

  const philosophyLines = md
    .split("\n")
    .filter((l) => l.startsWith("- **System") || l.startsWith("- **Transactional") || l.startsWith("- **Get"))
    .map((l) => l.replace(/^-\s*/, "").replace(/\*\*/g, ""));

  const componentLines = md
    .split("\n")
    .filter((l) => l.match(/^-\s*\*\*[A-Z]/))
    .map((l) => l.replace(/^-\s*/, "").replace(/\*\*/g, ""))
    .slice(4);

  return {
    vision,
    philosophy: philosophyLines.length > 0 ? philosophyLines : [
      "System 2 (Jules): Slow, deliberative, strategic.",
      "System 1 (zeroclaw): Fast, reactive, experimental.",
      "Transactional Memory: All actions are logged immutably.",
      "GSD: Strict separation of planning and execution.",
    ],
    components: componentLines.length > 0 ? componentLines : [
      "GSD Framework: PROJECT.md, REQUIREMENTS.md, ROADMAP.md, STATE.md",
      "Agent Skills: Standardized capabilities in /skills/",
      "DMCT: Dynamic Mutual Context Tailoring",
      "Private Workspace: Internal reasoning and personality management",
    ],
  };
}

// --- State Data ---

export interface StateData {
  status: string;
  currentTask: string;
  lastUpdate: string;
  completed: ChecklistItem[];
  pending: ChecklistItem[];
  blockers: string[];
  focus: string;
}

export function getStateData(): StateData {
  const md = readMarkdownFile("STATE.md");
  const lines = md.split("\n");

  const statusMatch = md.match(/\*\*Status:\*\*\s*(.+)/);
  const taskMatch = md.match(/\*\*Current Task:\*\*\s*(.+)/);
  const updateMatch = md.match(/\*\*Latest Update:\*\*\s*(.+)/);
  const focusMatch = md.match(/\*\*Focus:\*\*\s*(.+)/);

  const completedStart = lines.findIndex((l) =>
    l.includes("Completed Actions")
  );
  const pendingStart = lines.findIndex((l) => l.includes("**Pending:**"));
  const blockerStart = lines.findIndex((l) => l.includes("**Blockers:**"));
  const focusStart = lines.findIndex((l) => l.includes("**Focus:**"));

  const completedBlock = lines
    .slice(
      completedStart + 1,
      pendingStart > 0 ? pendingStart : lines.length
    )
    .join("\n");
  const pendingBlock = lines
    .slice(
      pendingStart + 1,
      blockerStart > 0 ? blockerStart : lines.length
    )
    .join("\n");

  const blockerLines = lines
    .slice(blockerStart + 1, focusStart > 0 ? focusStart : blockerStart + 5)
    .filter((l) => l.startsWith("-"))
    .map((l) => l.replace(/^-\s*/, ""));

  return {
    status: statusMatch?.[1] || "Unknown",
    currentTask: taskMatch?.[1] || "Unknown",
    lastUpdate: updateMatch?.[1] || "Unknown",
    completed: parseChecklist(completedBlock),
    pending: parseChecklist(pendingBlock),
    blockers: blockerLines,
    focus: focusMatch?.[1] || "",
  };
}

// --- Roadmap Data ---

export interface RoadmapPhase {
  title: string;
  quarter: string;
  goal: string;
  status: string;
  milestones: ChecklistItem[];
}

export function getRoadmapData(): RoadmapPhase[] {
  const md = readMarkdownFile("ROADMAP.md");
  const sections = parseMarkdownSections(md);

  const phases: RoadmapPhase[] = [];

  for (const section of sections) {
    if (section.level !== 2) continue;

    const quarterMatch = section.title.match(/(Q\d\s+\d{4})/);
    const phaseMatch = section.title.match(/Phase\s+\d+\s*-\s*(.+)/);
    const goalMatch = section.content.match(/\*\*Goal:\*\*\s*(.+)/);
    const statusMatch = section.content.match(/\*\*Status:\*\*\s*(.+)/);

    phases.push({
      title: phaseMatch?.[1] || section.title,
      quarter: quarterMatch?.[1] || "",
      goal: goalMatch?.[1] || "",
      status: statusMatch?.[1] || "Planned",
      milestones: parseChecklist(section.content),
    });
  }

  return phases;
}

// --- Requirements Data ---

export interface RequirementPhase {
  title: string;
  items: ChecklistItem[];
}

export function getRequirementsData(): RequirementPhase[] {
  const md = readMarkdownFile("REQUIREMENTS.md");
  const sections = parseMarkdownSections(md);

  return sections
    .filter((s) => s.level === 2)
    .map((s) => ({
      title: s.title,
      items: parseChecklist(s.content),
    }));
}

// --- GSD Memory Graph ---

export interface MemoryNode {
  id: string;
  label: string;
  file: string;
  description: string;
  type: "core" | "planning" | "private" | "session";
}

export interface MemoryEdge {
  from: string;
  to: string;
  label: string;
}

export function getMemoryGraph(): { nodes: MemoryNode[]; edges: MemoryEdge[] } {
  return {
    nodes: [
      {
        id: "project",
        label: "PROJECT.md",
        file: "PROJECT.md",
        description: "Immutable vision and constraints",
        type: "core",
      },
      {
        id: "requirements",
        label: "REQUIREMENTS.md",
        file: "REQUIREMENTS.md",
        description: "Hierarchical functional requirements",
        type: "core",
      },
      {
        id: "roadmap",
        label: "ROADMAP.md",
        file: "ROADMAP.md",
        description: "Macroscopic timeline of phases",
        type: "core",
      },
      {
        id: "state",
        label: "STATE.md",
        file: "STATE.md",
        description: "Dynamic short-term memory",
        type: "core",
      },
      {
        id: "planning",
        label: ".planning/",
        file: ".planning/",
        description: "Execution plans via task_plan.xml",
        type: "planning",
      },
      {
        id: "sessions",
        label: ".sessions/",
        file: ".sessions/",
        description: "Episodic memory logs",
        type: "session",
      },
      {
        id: "private",
        label: "/.private/jules/",
        file: "/.private/jules/",
        description: "Persona and internal reasoning",
        type: "private",
      },
    ],
    edges: [
      { from: "project", to: "requirements", label: "defines" },
      { from: "requirements", to: "roadmap", label: "scoped by" },
      { from: "roadmap", to: "state", label: "tracked in" },
      { from: "state", to: "sessions", label: "logs to" },
      { from: "planning", to: "state", label: "updates" },
      { from: "private", to: "planning", label: "informs" },
      { from: "sessions", to: "roadmap", label: "feeds back" },
    ],
  };
}

// --- Session Data ---

export interface SessionEntry {
  id: number;
  summary: string;
  highlights: string[];
}

export function getSessionHistory(): SessionEntry[] {
  const stateData = getStateData();
  const sessionMap = new Map<number, string[]>();

  for (const item of stateData.completed) {
    const match = item.text.match(/Session\s+(\d+):/i);
    if (match) {
      const id = parseInt(match[1]);
      if (!sessionMap.has(id)) sessionMap.set(id, []);
      sessionMap.get(id)!.push(item.text.replace(/Session\s+\d+:\s*/i, ""));
    }
  }

  const sessions: SessionEntry[] = [];
  const sortedIds = Array.from(sessionMap.keys()).sort((a, b) => b - a);

  for (const id of sortedIds) {
    const highlights = sessionMap.get(id)!;
    sessions.push({
      id,
      summary: `Session ${id}`,
      highlights,
    });
  }

  // Add early sessions if none parsed
  if (sessions.length === 0) {
    sessions.push(
      { id: 1, summary: "Session 1", highlights: ["Initialized GSD foundation files", "Created session directory structure"] },
      { id: 3, summary: "Session 3", highlights: ["Ingested Janus architecture document", "Created janus-orchestrator skill"] },
    );
  }

  return sessions;
}
