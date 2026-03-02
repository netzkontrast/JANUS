import { PageHeader } from "@/components/page-header";
import { EntropyDashboard } from "@/components/entropie/entropy-dashboard";

export default function EntropiePage() {
  return (
    <div className="flex h-screen flex-col">
      <PageHeader
        title="Entropie-Kartografie"
        description="Visualisierung narrativer Spannung. Thermale Entropie-Maps, Charakter-Appearance-Analysen und Fabula Entropy Indexing (FEI) fuer die Steuerung des 'Schiffbruchs des Denkens'."
      />
      <div className="flex-1 overflow-y-auto">
        <EntropyDashboard />
      </div>
    </div>
  );
}
