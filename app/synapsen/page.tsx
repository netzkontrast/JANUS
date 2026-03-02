import { PageHeader } from "@/components/page-header";
import { SynapsenChannel } from "@/components/synapsen/channel";

export default function SynapsenPage() {
  return (
    <div className="flex h-screen flex-col">
      <PageHeader
        title="Synapsen-Kanal"
        description="Dynamische Agenten-Interaktion. Multimodaler Kommunikationsraum mit adaptiver UI, gesteuert durch die Drama Engine."
      />
      <div className="flex-1 overflow-hidden">
        <SynapsenChannel />
      </div>
    </div>
  );
}
