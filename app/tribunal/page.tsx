import { PageHeader } from "@/components/page-header";
import { TribunalView } from "@/components/tribunal/tribunal-view";

export default function TribunalPage() {
  return (
    <div className="flex h-screen flex-col">
      <PageHeader
        title="Tribunal der Anteile"
        description="Institutionalisierte Konfliktresolution. OVADARE-Framework zur automatisierten Erkennung und Schlichtung von Ziel- und Ressourcenkonflikten zwischen KI-Agenten. Diskurstheorie nach Habermas."
      />
      <div className="flex-1 overflow-y-auto">
        <TribunalView />
      </div>
    </div>
  );
}
