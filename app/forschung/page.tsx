import { PageHeader } from "@/components/page-header";
import { ResearchWorkspace } from "@/components/forschung/research-workspace";

export default function ForschungPage() {
  return (
    <div className="flex h-screen flex-col">
      <PageHeader
        title="Forschungs-Sphare"
        description="Autonomer Research-Workspace mit spezialisierten Deputies. Multimodale Tiefenrecherche, kross-modales Schlussfolgern und evidenzbasierte Synthese fuer den ontologischen Codex."
      />
      <div className="flex-1 overflow-y-auto">
        <ResearchWorkspace />
      </div>
    </div>
  );
}
