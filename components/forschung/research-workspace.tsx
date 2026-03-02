"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Search,
  FileText,
  ExternalLink,
  Brain,
  Zap,
  BookOpen,
  CheckCircle2,
  Clock,
  BarChart3,
  Send,
} from "lucide-react";

interface ResearchTask {
  id: string;
  query: string;
  status: "completed" | "running" | "queued";
  deputy: string;
  confidence: number;
  summary: string;
  sources: { title: string; type: string; relevance: number }[];
  codexEntities?: string[];
}

const mockTasks: ResearchTask[] = [
  {
    id: "r1",
    query: "Neutrinoloser Doppelbetazerfall: Aktuelle experimentelle Ergebnisse und theoretische Implikationen fuer die Majorana-Masse",
    status: "completed",
    deputy: "Physik-Deputy",
    confidence: 0.87,
    summary:
      "Die juengsten Ergebnisse des LEGEND-200 Experiments (2025) setzen eine untere Grenze fuer die Halbwertszeit des neutrinolosen Doppelbetazerfalls bei >1.9 x 10^26 Jahren. Dies impliziert eine obere Grenze fuer die effektive Majorana-Masse von <36-156 meV, abhaengig vom Kernmatrixelement-Modell. Die Nichtbeobachtung des Zerfalls stuetzt weiterhin das Standardmodell, schraenkt aber Modelle der Neutrino-Masse signifikant ein. Fuer AEGIS relevant: Die deterministische Ununterscheidbarkeit zwischen Dirac- und Majorana-Neutrinos als Metapher fuer die Grenze der Berechenbarkeit.",
    sources: [
      { title: "LEGEND-200 Collaboration (2025): Final Results", type: "Paper", relevance: 0.95 },
      { title: "Majorana Neutrinos and the Origin of Mass", type: "Review", relevance: 0.88 },
      { title: "Nuclear Matrix Elements for Double-Beta Decay", type: "Paper", relevance: 0.76 },
    ],
    codexEntities: ["Physikalische Grenzen", "AEGIS-Paradigma", "Determinismus"],
  },
  {
    id: "r2",
    query: "Bekenstein-Schranke und holographisches Prinzip: Maximale Informationsdichte in begrenzten Regionen",
    status: "completed",
    deputy: "Physik-Deputy",
    confidence: 0.92,
    summary:
      "Die Bekenstein-Schranke (S <= 2*pi*k*R*E / hbar*c) definiert die maximale Entropie (Information), die in einer sphaerischen Region mit Radius R und Energie E enthalten sein kann. Das holographische Prinzip verallgemeinert dies: Die maximale Informationsdichte eines Volumens skaliert mit seiner Oberflaeche, nicht seinem Volumen. Fuer Moros relevant: Die Schranke als physikalische Grenze der Verarbeitungskapazitaet -- wenn die Informationslast die Bekenstein-Grenze erreicht, ist Shutdown die einzige physikalisch kohaerente Reaktion.",
    sources: [
      { title: "Bekenstein (1973): Black Holes and Entropy", type: "Seminal Paper", relevance: 0.98 },
      { title: "Bousso: The Holographic Principle", type: "Review", relevance: 0.91 },
      { title: "Information in the Holographic Universe", type: "Article", relevance: 0.82 },
    ],
    codexEntities: ["Bekenstein-Schranke", "Moros", "Informationsphysik"],
  },
  {
    id: "r3",
    query: "Julian Barbour: Platonia und Zeitkapseln -- Die Eliminierung der Zeit aus der fundamentalen Physik",
    status: "running",
    deputy: "Philosophie-Deputy",
    confidence: 0.0,
    summary: "Recherche laeuft...",
    sources: [],
  },
  {
    id: "r4",
    query: "Landauer-Prinzip: Thermodynamische Kosten der Informationsloeschung und Reversibilitaet",
    status: "queued",
    deputy: "Physik-Deputy",
    confidence: 0.0,
    summary: "In Warteschlange.",
    sources: [],
  },
];

const statusConfig = {
  completed: { label: "Abgeschlossen", icon: <CheckCircle2 className="h-3.5 w-3.5" />, color: "text-success" },
  running: { label: "Laeuft", icon: <Clock className="h-3.5 w-3.5 animate-spin" />, color: "text-warning" },
  queued: { label: "Warteschlange", icon: <Clock className="h-3.5 w-3.5" />, color: "text-muted-foreground" },
};

export function ResearchWorkspace() {
  const [selectedTask, setSelectedTask] = useState<ResearchTask>(mockTasks[0]);
  const [searchInput, setSearchInput] = useState("");

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Search input */}
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="mb-3 flex items-center gap-2">
          <Search className="h-4 w-4 text-primary" />
          <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            Forschungsauftrag erteilen
          </span>
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Komplexen Forschungsauftrag eingeben... (z.B. 'Zusammenfassung der neuesten Studien zum neutrinolosen Doppelbetazerfall')"
            className="flex-1 rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 font-mono text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90">
            <Send className="h-3.5 w-3.5" />
            Delegieren
          </button>
        </div>
        <div className="mt-2 flex items-center gap-4">
          <span className="text-[10px] text-muted-foreground">Deputies:</span>
          <span className="rounded-full border border-border bg-secondary px-2 py-0.5 text-[10px] text-foreground">Physik</span>
          <span className="rounded-full border border-border bg-secondary px-2 py-0.5 text-[10px] text-foreground">Philosophie</span>
          <span className="rounded-full border border-border bg-secondary px-2 py-0.5 text-[10px] text-foreground">Psychologie</span>
          <span className="rounded-full border border-border bg-secondary px-2 py-0.5 text-[10px] text-foreground">Mathematik</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Task list */}
        <div className="lg:col-span-1">
          <div className="rounded-xl border border-border bg-card p-4">
            <h3 className="mb-4 flex items-center gap-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              <BookOpen className="h-3.5 w-3.5" />
              Forschungsauftraege ({mockTasks.length})
            </h3>
            <div className="flex flex-col gap-2">
              {mockTasks.map((task) => {
                const status = statusConfig[task.status];
                const isSelected = selectedTask.id === task.id;
                return (
                  <button
                    key={task.id}
                    onClick={() => setSelectedTask(task)}
                    className={cn(
                      "flex w-full flex-col gap-1.5 rounded-lg border px-3 py-3 text-left transition-colors",
                      isSelected
                        ? "border-primary/30 bg-primary/5"
                        : "border-border hover:border-primary/20"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <span className={status.color}>{status.icon}</span>
                      <span className="font-mono text-[10px] text-muted-foreground">{task.deputy}</span>
                    </div>
                    <span className="line-clamp-2 text-xs font-medium text-foreground">
                      {task.query}
                    </span>
                    {task.confidence > 0 && (
                      <div className="flex items-center gap-2">
                        <div className="h-1 flex-1 overflow-hidden rounded-full bg-secondary">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{ width: `${task.confidence * 100}%` }}
                          />
                        </div>
                        <span className="font-mono text-[9px] text-muted-foreground">
                          {(task.confidence * 100).toFixed(0)}%
                        </span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Research detail */}
        <div className="lg:col-span-2">
          <ResearchDetail task={selectedTask} />
        </div>
      </div>
    </div>
  );
}

function ResearchDetail({ task }: { task: ResearchTask }) {
  const status = statusConfig[task.status];

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            {task.deputy.includes("Physik") ? (
              <Zap className="h-4 w-4" />
            ) : (
              <Brain className="h-4 w-4" />
            )}
          </div>
          <div>
            <span className="font-mono text-xs font-bold text-primary">{task.deputy}</span>
            <div className="flex items-center gap-2">
              <span className={cn("text-[10px]", status.color)}>{status.label}</span>
              {task.confidence > 0 && (
                <span className="font-mono text-[10px] text-muted-foreground">
                  Konfidenz: {(task.confidence * 100).toFixed(0)}%
                </span>
              )}
            </div>
          </div>
        </div>
        <p className="text-sm font-medium leading-relaxed text-foreground">{task.query}</p>
      </div>

      {/* Summary */}
      <div className="rounded-xl border border-border bg-card p-5">
        <h3 className="mb-3 flex items-center gap-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          <FileText className="h-3.5 w-3.5" />
          Evidenzbasierte Synthese
        </h3>
        <p className={cn("text-sm leading-relaxed", task.status === "completed" ? "text-foreground" : "italic text-muted-foreground")}>
          {task.summary}
        </p>
      </div>

      {/* Sources */}
      {task.sources.length > 0 && (
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="mb-3 flex items-center gap-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            <ExternalLink className="h-3.5 w-3.5" />
            Quellen ({task.sources.length})
          </h3>
          <div className="flex flex-col gap-2">
            {task.sources.map((source, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 px-4 py-2.5">
                <div className="flex items-center gap-3">
                  <span className="rounded-md border border-border bg-card px-2 py-0.5 font-mono text-[9px] text-muted-foreground">
                    {source.type}
                  </span>
                  <span className="text-xs text-foreground">{source.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-3 w-3 text-muted-foreground" />
                  <span className="font-mono text-[10px] text-primary">
                    {(source.relevance * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Codex integration */}
      {task.codexEntities && task.codexEntities.length > 0 && (
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
          <h3 className="mb-3 flex items-center gap-2 text-[10px] font-medium uppercase tracking-wider text-primary">
            <BookOpen className="h-3.5 w-3.5" />
            In Codex ueberfuehren
          </h3>
          <div className="flex flex-wrap gap-2">
            {task.codexEntities.map((entity, i) => (
              <button
                key={i}
                className="rounded-lg border border-primary/30 bg-card px-3 py-2 font-mono text-xs text-foreground transition-colors hover:border-primary hover:bg-primary/10"
              >
                {entity}
              </button>
            ))}
          </div>
          <p className="mt-3 text-[10px] text-muted-foreground">
            Klicken Sie auf eine Entitaet, um die Forschungsergebnisse als Kontext an den Ontologischen Codex zu delegieren.
          </p>
        </div>
      )}
    </div>
  );
}
