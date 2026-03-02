import { PageHeader } from "@/components/page-header";
import { CodexView } from "@/components/codex/codex-view";

export default function CodexPage() {
  return (
    <div className="flex h-screen flex-col">
      <PageHeader
        title="Ontologischer Codex"
        description="Das epistemologische Blackboard. Semantischer Knowledge Graph mit kaskadierenden Kontexten, Progressions-Management und bidirektionaler Agenten-Integration."
      />
      <div className="flex-1 overflow-hidden">
        <CodexView />
      </div>
    </div>
  );
}
