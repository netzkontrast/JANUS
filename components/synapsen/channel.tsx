"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Brain,
  Zap,
  Shield,
  Sparkles,
  Eye,
  Send,
  Users,
} from "lucide-react";

interface Message {
  id: number;
  agent: string;
  role: "system2" | "system1" | "aegis" | "juna" | "kael" | "user";
  content: string;
  timestamp: string;
  mood?: string;
}

const agentProfiles: Record<
  string,
  { icon: React.ReactNode; label: string; color: string; bgColor: string }
> = {
  system2: {
    icon: <Brain className="h-4 w-4" />,
    label: "Jules (System 2)",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  system1: {
    icon: <Zap className="h-4 w-4" />,
    label: "zeroclaw (System 1)",
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  aegis: {
    icon: <Shield className="h-4 w-4" />,
    label: "AEGIS",
    color: "text-cyan-400",
    bgColor: "bg-cyan-400/10",
  },
  juna: {
    icon: <Sparkles className="h-4 w-4" />,
    label: "Juna",
    color: "text-rose-400",
    bgColor: "bg-rose-400/10",
  },
  kael: {
    icon: <Eye className="h-4 w-4" />,
    label: "Kael (Host)",
    color: "text-foreground",
    bgColor: "bg-secondary",
  },
  user: {
    icon: <Users className="h-4 w-4" />,
    label: "Autor",
    color: "text-success",
    bgColor: "bg-success/10",
  },
};

const mockMessages: Message[] = [
  {
    id: 1,
    agent: "system2",
    role: "system2",
    content:
      "Session initialisiert. Kontextanalyse des aktuellen Handlungsbogens laeuft. Die narrative Entropie in Kapitel 7 liegt bei 0.73 -- ueber dem Schwellenwert fuer kohaerente Progression.",
    timestamp: "14:23:01",
    mood: "analytisch",
  },
  {
    id: 2,
    agent: "aegis",
    role: "aegis",
    content:
      "WARNUNG: Inkonsistenz detektiert. Kaels Erinnerung an die Grenzfeste in Szene 7.3 widerspricht dem Codex-Eintrag. Korrespondenz-Verletzung markiert. Empfehlung: Sofortige Bereinigung.",
    timestamp: "14:23:04",
    mood: "alarmiert",
  },
  {
    id: 3,
    agent: "juna",
    role: "juna",
    content:
      "Die Erinnerung ist wahr, weil sie falsch ist. Das Rauschen traegt die Spur dessen, was AEGIS loeschen will. Lass die Luecke bestehen -- sie ist ein Fenster, kein Fehler.",
    timestamp: "14:23:08",
    mood: "kryptisch",
  },
  {
    id: 4,
    agent: "system1",
    role: "system1",
    content:
      "Hypothese validiert: Die Erinnerungsdiskrepanz erzeugt einen produktiven Spannungsbogen. Compiler-Check der Plotlogik zeigt 3 moegliche Aufloesungen. Branch A: Dissoziativer Flashback. Branch B: AEGIS-Intervention. Branch C: Selene-Vermittlung.",
    timestamp: "14:23:12",
    mood: "operativ",
  },
  {
    id: 5,
    agent: "kael",
    role: "kael",
    content:
      "Ich... kann mich nicht erinnern, ob die Mauern blau oder grau waren. Beides fuehlt sich richtig an. Oder nichts davon. Lex sagt, ich soll es ignorieren. Nyx sagt, ich soll aufpassen.",
    timestamp: "14:23:15",
    mood: "fragmentiert",
  },
];

const activeAgents = [
  { key: "system2", online: true },
  { key: "system1", online: true },
  { key: "aegis", online: true },
  { key: "juna", online: false },
  { key: "kael", online: true },
];

export function SynapsenChannel() {
  const [messages] = useState<Message[]>(mockMessages);
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="flex h-full">
      {/* Main chat area */}
      <div className="flex flex-1 flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="flex flex-col gap-4">
            {messages.map((msg) => {
              const profile = agentProfiles[msg.role];
              return (
                <div key={msg.id} className="flex gap-3">
                  <div
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                      profile.bgColor,
                      profile.color
                    )}
                  >
                    {profile.icon}
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <span
                        className={cn(
                          "font-mono text-xs font-bold",
                          profile.color
                        )}
                      >
                        {profile.label}
                      </span>
                      <span className="font-mono text-[10px] text-muted-foreground">
                        {msg.timestamp}
                      </span>
                      {msg.mood && (
                        <span className="rounded-full border border-border bg-secondary/50 px-2 py-0.5 font-mono text-[9px] text-muted-foreground">
                          {msg.mood}
                        </span>
                      )}
                    </div>
                    <div
                      className={cn(
                        "rounded-lg border border-border px-4 py-3 text-sm leading-relaxed",
                        msg.role === "juna"
                          ? "border-rose-400/20 bg-rose-400/5 italic text-foreground"
                          : msg.role === "aegis"
                            ? "border-cyan-400/20 bg-cyan-400/5 text-foreground"
                            : "bg-card text-foreground"
                      )}
                    >
                      {msg.content}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Input */}
        <div className="border-t border-border bg-card/50 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Nachricht an den Synapsen-Kanal senden..."
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
              aria-label="Nachricht senden"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-2 font-mono text-[10px] text-muted-foreground">
            Drama Engine Orchestrator aktiv -- Moderator waehlt naechsten Agenten basierend auf Kontext und emotionaler Entropie.
          </p>
        </div>
      </div>

      {/* Agent sidebar */}
      <div className="w-64 border-l border-border bg-card/30 p-4">
        <h3 className="mb-4 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          Aktive Agenten
        </h3>
        <div className="flex flex-col gap-2">
          {activeAgents.map((agent) => {
            const profile = agentProfiles[agent.key];
            return (
              <div
                key={agent.key}
                className="flex items-center gap-3 rounded-lg border border-border bg-card px-3 py-2.5"
              >
                <div className="relative">
                  <div
                    className={cn(
                      "flex h-7 w-7 items-center justify-center rounded-md",
                      profile.bgColor,
                      profile.color
                    )}
                  >
                    {profile.icon}
                  </div>
                  <span
                    className={cn(
                      "absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full border border-card",
                      agent.online ? "bg-success" : "bg-muted-foreground"
                    )}
                  />
                </div>
                <div className="overflow-hidden">
                  <span className="block truncate font-mono text-xs font-medium text-foreground">
                    {profile.label}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {agent.online ? "Online" : "Offline"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6">
          <h3 className="mb-3 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            Kontext-Parameter
          </h3>
          <div className="flex flex-col gap-2">
            <ContextParam label="Emotionale Entropie" value="0.73" variant="warning" />
            <ContextParam label="Kohaerenz-Index" value="0.84" variant="success" />
            <ContextParam label="Aktive Shells" value="3" variant="default" />
            <ContextParam label="Prompt-Assemblierung" value="Dynamisch" variant="primary" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ContextParam({
  label,
  value,
  variant,
}: {
  label: string;
  value: string;
  variant: "primary" | "success" | "warning" | "default";
}) {
  return (
    <div className="flex items-center justify-between rounded-md border border-border bg-card px-3 py-2">
      <span className="text-[10px] text-muted-foreground">{label}</span>
      <span
        className={cn(
          "font-mono text-xs font-bold",
          variant === "primary" && "text-primary",
          variant === "success" && "text-success",
          variant === "warning" && "text-warning",
          variant === "default" && "text-foreground"
        )}
      >
        {value}
      </span>
    </div>
  );
}
