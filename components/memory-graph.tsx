import { cn } from "@/lib/utils";
import type { MemoryNode, MemoryEdge } from "@/lib/data";
import {
  FileText,
  FolderGit2,
  FolderLock,
  History,
  ArrowRight,
} from "lucide-react";

const nodeIcons: Record<string, React.ReactNode> = {
  core: <FileText className="h-4 w-4" />,
  planning: <FolderGit2 className="h-4 w-4" />,
  private: <FolderLock className="h-4 w-4" />,
  session: <History className="h-4 w-4" />,
};

const nodeColors: Record<string, string> = {
  core: "border-primary/30 bg-primary/5 text-primary",
  planning: "border-success/30 bg-success/5 text-success",
  private: "border-warning/30 bg-warning/5 text-warning",
  session: "border-muted-foreground/30 bg-secondary text-muted-foreground",
};

export function MemoryGraph({
  nodes,
  edges,
}: {
  nodes: MemoryNode[];
  edges: MemoryEdge[];
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="mb-5">
        <h2 className="font-mono text-sm font-bold text-foreground">
          GSD Memory Graph
        </h2>
        <p className="text-xs text-muted-foreground">
          Externalized knowledge hypergraph
        </p>
      </div>

      <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {nodes.map((node) => (
          <div
            key={node.id}
            className={cn(
              "flex flex-col gap-2 rounded-lg border p-3 transition-colors hover:border-primary/40",
              nodeColors[node.type]
            )}
          >
            <div className="flex items-center gap-2">
              {nodeIcons[node.type]}
              <span className="font-mono text-[11px] font-bold">
                {node.label}
              </span>
            </div>
            <p className="text-[10px] leading-relaxed opacity-70">
              {node.description}
            </p>
          </div>
        ))}
      </div>

      <div>
        <h3 className="mb-3 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          Relationships
        </h3>
        <div className="flex flex-wrap gap-2">
          {edges.map((edge, i) => {
            const fromNode = nodes.find((n) => n.id === edge.from);
            const toNode = nodes.find((n) => n.id === edge.to);
            return (
              <div
                key={i}
                className="flex items-center gap-1.5 rounded-md border border-border bg-secondary/30 px-2.5 py-1.5"
              >
                <span className="font-mono text-[10px] text-foreground">
                  {fromNode?.label}
                </span>
                <ArrowRight className="h-2.5 w-2.5 text-primary/60" />
                <span className="font-mono text-[10px] text-muted-foreground">
                  {edge.label}
                </span>
                <ArrowRight className="h-2.5 w-2.5 text-primary/60" />
                <span className="font-mono text-[10px] text-foreground">
                  {toNode?.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
