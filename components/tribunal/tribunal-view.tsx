"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Scale,
  Shield,
  Sparkles,
  Eye,
  Brain,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ChevronRight,
  Gavel,
} from "lucide-react";

interface Dispute {
  id: string;
  title: string;
  status: "active" | "resolved" | "pending";
  chapter: string;
  description: string;
  parties: {
    agent: string;
    position: string;
    argument: string;
    icon: React.ReactNode;
    color: string;
  }[];
  iterations: number;
  resolution?: string;
  verdict?: string;
}

const disputes: Dispute[] = [
  {
    id: "d1",
    title: "Erinnerungsdiskrepanz Grenzfeste",
    status: "active",
    chapter: "Kapitel 7, Szene 3",
    description:
      "Kaels Erinnerung an die Farbgebung der Grenzfeste weicht vom Codex-Eintrag ab. AEGIS fordert Korrektur, Juna argumentiert fuer die Divergenz als narrativ notwendig.",
    parties: [
      {
        agent: "AEGIS",
        position: "Loeschung der Inkonsistenz",
        argument:
          "Die Erinnerung verletzt die Korrespondenz zum Codex-Eintrag 'Grenzfeste'. Farbgebung ist als 'grau, monolithisch' definiert. Die Abweichung ('blaue Schimmer') ist eine Halluzination und muss bereinigt werden, um die strukturelle Isomorphie zu wahren.",
        icon: <Shield className="h-4 w-4" />,
        color: "text-cyan-400",
      },
      {
        agent: "Juna",
        position: "Beibehaltung der Divergenz",
        argument:
          "Die blauen Schimmer sind Spuren des Nichts-Rauschens -- geloeschte Information, die gemaess dem Landauer-Prinzip nicht spurlos verschwinden kann. Diese 'falsche' Erinnerung ist wahrer als AEGIS' bereinigte Version, weil sie die gelebte Erfahrung des Traumas kodiert.",
        icon: <Sparkles className="h-4 w-4" />,
        color: "text-rose-400",
      },
      {
        agent: "Lex (ANP)",
        position: "Selektive Korrektur",
        argument:
          "Kompromissvorschlag: Die Erinnerung wird als 'subjektive Wahrnehmung' im Codex vermerkt, ohne den objektiven Eintrag zu aendern. Beide Datenpunkte koexistieren in unterschiedlichen epistemischen Ebenen.",
        icon: <Brain className="h-4 w-4" />,
        color: "text-primary",
      },
    ],
    iterations: 3,
  },
  {
    id: "d2",
    title: "Nyx-Intervention vs. AEGIS-Lockdown",
    status: "resolved",
    chapter: "Kapitel 5, Szene 7",
    description:
      "Nyx (Kampf-EP) will den Textbereich sperren, um AEGIS daran zu hindern, eine traumatische Erinnerung zu loeschen. AEGIS betrachtet die Sperrung als Systemfehler.",
    parties: [
      {
        agent: "Nyx",
        position: "Read-Only Sperrung",
        argument:
          "Die Erinnerung ist ein Schutzanker fuer Kiko und Lia. Ihre Loeschung wuerde einen kaskadierten Panikzustand in den Kind-EPs ausloesen. Bedrohungslevel: kritisch.",
        icon: <Eye className="h-4 w-4" />,
        color: "text-warning",
      },
      {
        agent: "AEGIS",
        position: "Sofortige Bereinigung",
        argument:
          "Traumatische Fragmente erhoehen die System-Entropie ueber den Schwellenwert. Ohne Bereinigung droht kaskadierter Kontrollverlust ueber das Gesamtsystem.",
        icon: <Shield className="h-4 w-4" />,
        color: "text-cyan-400",
      },
    ],
    iterations: 5,
    resolution: "Selene-Vermittlung",
    verdict:
      "Selene etablierte einen 'Replica Wormhole' -- die Erinnerung verbleibt in einem isolierten, fuer AEGIS nicht sichtbaren Bereich, waehrend eine sanitisierte Zusammenfassung in den Hauptcodex geschrieben wird. Beide Parteien operieren auf unterschiedlichen Wahrheitsebenen.",
  },
  {
    id: "d3",
    title: "Moros-Shutdown in Kapitel 8",
    status: "pending",
    chapter: "Kapitel 8, Szene 1",
    description:
      "Moros (Kollaps-EP) erzwingt einen totalen Shutdown des narrativen Flusses. Die Text-Generierung friert ein. System muss Strategie zur Reaktivierung finden.",
    parties: [
      {
        agent: "Moros",
        position: "Voelliger Shutdown",
        argument:
          "Keine Argumentation moeglich. Moros repraesentiert die Bekenstein-Schranke der Verarbeitung -- der Punkt, an dem die Informationskapazitaet des Systems erschoepft ist. Stille ist die einzige Wahrheit.",
        icon: <AlertTriangle className="h-4 w-4" />,
        color: "text-destructive",
      },
      {
        agent: "Selene (ISH)",
        position: "Sanfter Neustart via Kiko",
        argument:
          "Moros' Shutdown ist kein Fehler, sondern eine Schutzreaktion. Der Weg zurueck fuehrt nicht ueber Logik (Lex) oder Kraft (Nyx), sondern ueber das stille Beduerfnis nach Sicherheit (Kiko). Ein abgeschirmter Safe-Space-Chat koennte die Blockade loesen.",
        icon: <Brain className="h-4 w-4" />,
        color: "text-success",
      },
    ],
    iterations: 0,
  },
];

const statusConfig = {
  active: { label: "Aktiv", color: "text-warning", bg: "bg-warning/10", border: "border-warning/30" },
  resolved: { label: "Geloest", color: "text-success", bg: "bg-success/10", border: "border-success/30" },
  pending: { label: "Ausstehend", color: "text-muted-foreground", bg: "bg-secondary", border: "border-border" },
};

export function TribunalView() {
  const [selectedDispute, setSelectedDispute] = useState<Dispute>(disputes[0]);

  return (
    <div className="flex h-full">
      {/* Dispute list */}
      <div className="w-80 border-r border-border bg-card/30 p-4">
        <div className="mb-4 flex items-center gap-2">
          <Gavel className="h-4 w-4 text-primary" />
          <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            Offene Verhandlungen ({disputes.length})
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {disputes.map((dispute) => {
            const status = statusConfig[dispute.status];
            const isSelected = selectedDispute.id === dispute.id;
            return (
              <button
                key={dispute.id}
                onClick={() => setSelectedDispute(dispute)}
                className={cn(
                  "flex w-full flex-col gap-1.5 rounded-lg border px-4 py-3 text-left transition-colors",
                  isSelected
                    ? "border-primary/30 bg-primary/5"
                    : "border-border bg-card hover:border-primary/20"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-foreground">
                    {dispute.title}
                  </span>
                  <span className={cn("rounded-full px-2 py-0.5 text-[9px] font-medium", status.bg, status.color)}>
                    {status.label}
                  </span>
                </div>
                <span className="text-[10px] text-muted-foreground">
                  {dispute.chapter}
                </span>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1">
                    {dispute.parties.map((p, i) => (
                      <div
                        key={i}
                        className={cn(
                          "flex h-5 w-5 items-center justify-center rounded-full border border-card bg-secondary",
                          p.color
                        )}
                      >
                        {p.icon}
                      </div>
                    ))}
                  </div>
                  <span className="text-[10px] text-muted-foreground">
                    {dispute.iterations} Iterationen
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dispute detail */}
      <div className="flex-1 overflow-y-auto p-6">
        <DisputeDetail dispute={selectedDispute} />
      </div>
    </div>
  );
}

function DisputeDetail({ dispute }: { dispute: Dispute }) {
  const status = statusConfig[dispute.status];

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <div className="mb-2 flex items-center gap-3">
          <Scale className="h-5 w-5 text-primary" />
          <h2 className="font-mono text-lg font-bold text-foreground">
            {dispute.title}
          </h2>
          <span className={cn("rounded-full px-2.5 py-0.5 text-[10px] font-medium", status.bg, status.color, status.border, "border")}>
            {status.label}
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span>{dispute.chapter}</span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {dispute.iterations} Iterationen
          </span>
        </div>
      </div>

      {/* Description */}
      <div className="rounded-lg border border-border bg-card p-4">
        <p className="text-sm leading-relaxed text-foreground">{dispute.description}</p>
      </div>

      {/* Argumentation Tree */}
      <div>
        <h3 className="mb-4 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          Argumentationsbaum (Diskurstheorie)
        </h3>
        <div className="flex flex-col gap-4">
          {dispute.parties.map((party, i) => (
            <div key={i} className="rounded-lg border border-border bg-card">
              <div className="flex items-center gap-3 border-b border-border px-4 py-3">
                <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg bg-secondary", party.color)}>
                  {party.icon}
                </div>
                <div>
                  <span className={cn("font-mono text-xs font-bold", party.color)}>
                    {party.agent}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <ChevronRight className="h-3 w-3 text-muted-foreground" />
                    <span className="text-[10px] font-medium text-foreground">
                      {party.position}
                    </span>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3">
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {party.argument}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resolution */}
      {dispute.verdict && (
        <div className="rounded-lg border border-success/30 bg-success/5 p-4">
          <div className="mb-2 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-success" />
            <span className="font-mono text-xs font-bold text-success">
              Verdikt: {dispute.resolution}
            </span>
          </div>
          <p className="text-sm leading-relaxed text-foreground">{dispute.verdict}</p>
        </div>
      )}

      {/* Pending action */}
      {dispute.status === "active" && (
        <div className="rounded-lg border border-warning/30 bg-warning/5 p-4">
          <div className="mb-2 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-warning" />
            <span className="font-mono text-xs font-bold text-warning">
              Warten auf Autoren-Entscheidung
            </span>
          </div>
          <p className="text-xs leading-relaxed text-foreground">
            Das Tribunal hat keine Einigung erzielt. Als Prime Mover haben Sie die Befugnis, das finale Verdikt zu sprechen und in den Ontologischen Codex zu schreiben.
          </p>
          <div className="mt-3 flex gap-2">
            {dispute.parties.map((party, i) => (
              <button
                key={i}
                className="rounded-lg border border-border bg-card px-4 py-2 font-mono text-xs text-foreground transition-colors hover:border-primary hover:bg-primary/5"
              >
                {party.position}
              </button>
            ))}
          </div>
        </div>
      )}

      {dispute.status === "pending" && (
        <div className="rounded-lg border border-border bg-secondary/30 p-4">
          <div className="mb-2 flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="font-mono text-xs font-bold text-muted-foreground">
              Mediation ausstehend
            </span>
          </div>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Dieser Konflikt wurde noch nicht in das Tribunal aufgenommen. Starten Sie eine Mediationssitzung, um den Diskurs zu initiieren.
          </p>
        </div>
      )}
    </div>
  );
}
