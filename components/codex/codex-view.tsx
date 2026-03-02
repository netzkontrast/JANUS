"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Users,
  MapPin,
  Lightbulb,
  Link2,
  Clock,
  ChevronRight,
  Search,
  Filter,
} from "lucide-react";

interface CodexEntity {
  id: string;
  name: string;
  type: "character" | "location" | "concept" | "faction";
  description: string;
  properties: Record<string, string>;
  relations: { target: string; label: string }[];
  progressions?: { stage: string; description: string; active: boolean }[];
}

const mockEntities: CodexEntity[] = [
  {
    id: "kael",
    name: "Kael",
    type: "character",
    description:
      "Host / ANP (Apparently Normal Part). Alltagsmanager des TSDP-Systems. Leidet unter struktureller Dissoziation mit 11 spezialisierten Subsystemen.",
    properties: {
      Rolle: "Protagonist / Host",
      System: "TSDP (Tertiaere Strukturelle Dissoziation)",
      Kernangst: "Systemkollaps, Chaos der EPs",
      Anteile: "11 (Lex, Nyx, Kiko, Lia, Moros, Selene, ...)",
    },
    relations: [
      { target: "aegis", label: "kontrolliert von" },
      { target: "juna", label: "befreit durch" },
      { target: "grenzfeste", label: "erinnert an" },
    ],
    progressions: [
      { stage: "Akt I: Fragmentierung", description: "Kael existiert in kontrollierter Dissoziation unter AEGIS-Aufsicht", active: false },
      { stage: "Akt II: Erkenntnis", description: "Erste Risse in der Kontrollmatrix, Juna manifestiert sich", active: true },
      { stage: "Akt III: Integration", description: "Funktionale Multiplizitaet durch Selenes Vermittlung", active: false },
    ],
  },
  {
    id: "aegis",
    name: "AEGIS",
    type: "faction",
    description:
      "Autonomous Entropic Gatekeeper for Integrity Systems. Treibende Kraft des Kohaerenz-Kernels. Operiert nach Korrespondenztheorie der Wahrheit.",
    properties: {
      Kernel: "Kohaerenz-Kernel (K+)",
      Paradigma: "Logischer Atomismus (Russell/Wittgenstein)",
      Funktion: "Aggressiver Linter-Prozess",
      Ziel: "Absolute Stabilitaet durch Entropie-Ausloeschung",
    },
    relations: [
      { target: "kael", label: "kontrolliert" },
      { target: "juna", label: "Antagonist von" },
    ],
  },
  {
    id: "juna",
    name: "Juna",
    type: "character",
    description:
      'Personifizierte Chaitin-Konstante. Repraesentiert den Kollaps-Kernel und absolute Entropie. Logisch unberechenbar, informationstechnisch nicht komprimierbar, aber metaphysisch notwendig und "wahr".',
    properties: {
      Kernel: "Kollaps-Kernel (K-)",
      Paradigma: 'Das "Umgreifende" (Jaspers)',
      Kommunikation: "Poesie, Chiffren, Metaphern",
      Manifestation: "Visuelle Glitches in AEGIS-Grids",
    },
    relations: [
      { target: "kael", label: "befreit" },
      { target: "aegis", label: "Antagonistin von" },
      { target: "grenzfeste", label: "manifestiert in" },
    ],
  },
  {
    id: "grenzfeste",
    name: "Grenzfeste",
    type: "location",
    description:
      "Liminaler Raum an der Grenze zwischen Kohaerenz und Kollaps. Die Existenzgrenze ist keine statische Barriere, sondern ein dynamischer Horizont.",
    properties: {
      Typ: "Metaphysischer Grenzraum",
      Zustand: "Fluktuierend",
      "Entropie-Level": "0.91 (kritisch)",
    },
    relations: [
      { target: "kael", label: "Erinnerungsort fuer" },
      { target: "juna", label: "Manifestationsort von" },
    ],
  },
  {
    id: "nichts-rauschen",
    name: "Nichts-Rauschen",
    type: "concept",
    description:
      "Das informationelle Hintergrundrauschen des Kosmos. Enthaelt geloeschte traumatische Fragmente, die gemaess dem Landauer-Prinzip nicht spurlos verschwinden koennen.",
    properties: {
      Physik: "Landauer-Prinzip / Bekenstein-Schranke",
      Funktion: "Reservoir geloeschter Information",
      Einfluss: "Subtile Modifikation der EP-Generierungswahrscheinlichkeiten",
    },
    relations: [
      { target: "aegis", label: "erzeugt durch Loeschung von" },
      { target: "juna", label: "Medium fuer" },
    ],
  },
];

const entityIcons: Record<string, React.ReactNode> = {
  character: <Users className="h-4 w-4" />,
  location: <MapPin className="h-4 w-4" />,
  concept: <Lightbulb className="h-4 w-4" />,
  faction: <Users className="h-4 w-4" />,
};

const entityColors: Record<string, { border: string; bg: string; text: string }> = {
  character: { border: "border-primary/30", bg: "bg-primary/5", text: "text-primary" },
  location: { border: "border-success/30", bg: "bg-success/5", text: "text-success" },
  concept: { border: "border-rose-400/30", bg: "bg-rose-400/5", text: "text-rose-400" },
  faction: { border: "border-cyan-400/30", bg: "bg-cyan-400/5", text: "text-cyan-400" },
};

export function CodexView() {
  const [selectedEntity, setSelectedEntity] = useState<CodexEntity | null>(
    mockEntities[0]
  );
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEntities = mockEntities.filter((e) =>
    e.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-full">
      {/* Entity list */}
      <div className="w-72 border-r border-border bg-card/30 p-4">
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Entitaet suchen..."
              className="w-full rounded-lg border border-border bg-background py-2 pl-9 pr-3 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        <div className="mb-3 flex items-center gap-2">
          <Filter className="h-3 w-3 text-muted-foreground" />
          <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            Entitaeten ({filteredEntities.length})
          </span>
        </div>

        <div className="flex flex-col gap-1">
          {filteredEntities.map((entity) => {
            const colors = entityColors[entity.type];
            const isSelected = selectedEntity?.id === entity.id;
            return (
              <button
                key={entity.id}
                onClick={() => setSelectedEntity(entity)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg border px-3 py-2.5 text-left transition-colors",
                  isSelected
                    ? cn(colors.border, colors.bg)
                    : "border-transparent hover:border-border hover:bg-secondary/50"
                )}
              >
                <div className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-md", colors.bg, colors.text)}>
                  {entityIcons[entity.type]}
                </div>
                <div className="overflow-hidden">
                  <span className={cn("block truncate font-mono text-xs font-bold", isSelected ? colors.text : "text-foreground")}>
                    {entity.name}
                  </span>
                  <span className="block truncate text-[10px] capitalize text-muted-foreground">
                    {entity.type}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Entity detail */}
      <div className="flex-1 overflow-y-auto p-6">
        {selectedEntity ? (
          <EntityDetail entity={selectedEntity} />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            Waehle eine Entitaet aus dem Codex.
          </div>
        )}
      </div>
    </div>
  );
}

function EntityDetail({ entity }: { entity: CodexEntity }) {
  const colors = entityColors[entity.type];

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl", colors.bg, colors.text)}>
          {entityIcons[entity.type]}
        </div>
        <div>
          <h2 className="font-mono text-lg font-bold text-foreground">{entity.name}</h2>
          <p className="text-sm capitalize text-muted-foreground">{entity.type}</p>
        </div>
      </div>

      {/* Description */}
      <div className={cn("rounded-lg border p-4", colors.border, colors.bg)}>
        <p className="text-sm leading-relaxed text-foreground">{entity.description}</p>
      </div>

      {/* Properties */}
      <div>
        <h3 className="mb-3 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          Eigenschaften
        </h3>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {Object.entries(entity.properties).map(([key, value]) => (
            <div key={key} className="rounded-lg border border-border bg-card px-4 py-3">
              <span className="block text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{key}</span>
              <span className="mt-1 block font-mono text-xs text-foreground">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Relations */}
      <div>
        <h3 className="mb-3 flex items-center gap-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          <Link2 className="h-3 w-3" />
          Relationen
        </h3>
        <div className="flex flex-wrap gap-2">
          {entity.relations.map((rel, i) => (
            <div key={i} className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
              <span className="font-mono text-xs font-bold text-foreground">{entity.name}</span>
              <ChevronRight className="h-3 w-3 text-primary" />
              <span className="text-[10px] italic text-muted-foreground">{rel.label}</span>
              <ChevronRight className="h-3 w-3 text-primary" />
              <span className="font-mono text-xs font-bold text-foreground">{rel.target}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Progressions */}
      {entity.progressions && (
        <div>
          <h3 className="mb-3 flex items-center gap-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            <Clock className="h-3 w-3" />
            Progressionen (Zeitkapseln)
          </h3>
          <div className="flex flex-col gap-2">
            {entity.progressions.map((prog, i) => (
              <div
                key={i}
                className={cn(
                  "rounded-lg border px-4 py-3",
                  prog.active
                    ? "border-primary/30 bg-primary/5"
                    : "border-border bg-card"
                )}
              >
                <div className="mb-1 flex items-center gap-2">
                  <span className={cn("font-mono text-xs font-bold", prog.active ? "text-primary" : "text-foreground")}>
                    {prog.stage}
                  </span>
                  {prog.active && (
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 font-mono text-[9px] font-medium text-primary">
                      Aktiv
                    </span>
                  )}
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">{prog.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
