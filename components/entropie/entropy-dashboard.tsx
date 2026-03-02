"use client";

import { cn } from "@/lib/utils";
import {
  Flame,
  Thermometer,
  BarChart3,
  Users,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
} from "lucide-react";

// Simulated per-chapter entropy data
const chapterData = [
  { chapter: 1, entropy: 0.32, label: "Exposition", dominant: "Lex", mood: "kalt" },
  { chapter: 2, entropy: 0.41, label: "Etablierung", dominant: "Kael", mood: "neutral" },
  { chapter: 3, entropy: 0.58, label: "Erste Risse", dominant: "Nyx", mood: "warm" },
  { chapter: 4, entropy: 0.45, label: "AEGIS-Kontrolle", dominant: "AEGIS", mood: "kalt" },
  { chapter: 5, entropy: 0.72, label: "Junas Erscheinen", dominant: "Juna", mood: "heiss" },
  { chapter: 6, entropy: 0.65, label: "Innerer Konflikt", dominant: "Moros", mood: "warm" },
  { chapter: 7, entropy: 0.89, label: "Schiffbruch", dominant: "Nyx/Juna", mood: "heiss" },
  { chapter: 8, entropy: 0.34, label: "Stille", dominant: "Kiko", mood: "kalt" },
  { chapter: 9, entropy: 0.78, label: "Tribunal", dominant: "Selene", mood: "warm" },
  { chapter: 10, entropy: 0.91, label: "Klimax", dominant: "Kael/Juna", mood: "heiss" },
];

const characterPresence = [
  { name: "Kael", chapters: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], color: "bg-foreground" },
  { name: "AEGIS", chapters: [1, 2, 4, 5, 7, 10], color: "bg-cyan-400" },
  { name: "Juna", chapters: [5, 7, 9, 10], color: "bg-rose-400" },
  { name: "Lex", chapters: [1, 2, 3, 4, 6], color: "bg-primary" },
  { name: "Nyx", chapters: [3, 5, 6, 7, 9], color: "bg-warning" },
  { name: "Moros", chapters: [6, 8], color: "bg-destructive" },
  { name: "Selene", chapters: [8, 9, 10], color: "bg-success" },
  { name: "Kiko", chapters: [2, 8], color: "bg-muted-foreground" },
];

function getEntropyColor(entropy: number): string {
  if (entropy >= 0.8) return "bg-rose-500";
  if (entropy >= 0.6) return "bg-orange-500";
  if (entropy >= 0.4) return "bg-amber-500";
  return "bg-cyan-500";
}

function getEntropyTextColor(entropy: number): string {
  if (entropy >= 0.8) return "text-rose-400";
  if (entropy >= 0.6) return "text-orange-400";
  if (entropy >= 0.4) return "text-amber-400";
  return "text-cyan-400";
}

export function EntropyDashboard() {
  const avgEntropy = chapterData.reduce((sum, c) => sum + c.entropy, 0) / chapterData.length;
  const maxEntropy = Math.max(...chapterData.map((c) => c.entropy));
  const minEntropy = Math.min(...chapterData.map((c) => c.entropy));
  const feiScore = 1 - (avgEntropy * 0.7 + (maxEntropy - minEntropy) * 0.3);

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Metric cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          icon={<Thermometer className="h-4 w-4" />}
          label="Mittlere Entropie"
          value={avgEntropy.toFixed(2)}
          trend="neutral"
          color="text-warning"
        />
        <MetricCard
          icon={<TrendingUp className="h-4 w-4" />}
          label="Peak Entropie"
          value={maxEntropy.toFixed(2)}
          subtitle={`Kapitel ${chapterData.find((c) => c.entropy === maxEntropy)?.chapter}`}
          trend="up"
          color="text-rose-400"
        />
        <MetricCard
          icon={<TrendingDown className="h-4 w-4" />}
          label="Min Entropie"
          value={minEntropy.toFixed(2)}
          subtitle={`Kapitel ${chapterData.find((c) => c.entropy === minEntropy)?.chapter}`}
          trend="down"
          color="text-cyan-400"
        />
        <MetricCard
          icon={<BarChart3 className="h-4 w-4" />}
          label="FEI Score"
          value={feiScore.toFixed(2)}
          subtitle="Fabula Entropy Index"
          trend="neutral"
          color="text-primary"
        />
      </div>

      {/* Thermal Entropy Heatmap */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="mb-5">
          <h2 className="font-mono text-sm font-bold text-foreground">
            Thermale Entropie-Map
          </h2>
          <p className="text-xs text-muted-foreground">
            Kapitelweise Entropie-Visualisierung. Warme Farben = hohe Entropie (Chaos/Juna). Kalte Farben = niedrige Entropie (Ordnung/AEGIS).
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {chapterData.map((chapter) => (
            <div key={chapter.chapter} className="flex items-center gap-4">
              <div className="w-20 shrink-0">
                <span className="font-mono text-xs text-muted-foreground">
                  Kap. {chapter.chapter}
                </span>
              </div>
              <div className="flex-1">
                <div className="relative h-8 overflow-hidden rounded-md bg-secondary">
                  <div
                    className={cn(
                      "absolute inset-y-0 left-0 rounded-md transition-all",
                      getEntropyColor(chapter.entropy)
                    )}
                    style={{ width: `${chapter.entropy * 100}%`, opacity: 0.8 }}
                  />
                  <div className="absolute inset-0 flex items-center justify-between px-3">
                    <span className="relative z-10 font-mono text-[10px] font-bold text-foreground">
                      {chapter.label}
                    </span>
                    <span className={cn("relative z-10 font-mono text-xs font-bold", getEntropyTextColor(chapter.entropy))}>
                      {chapter.entropy.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-24 shrink-0 text-right">
                <span className="font-mono text-[10px] text-muted-foreground">
                  {chapter.dominant}
                </span>
              </div>
              {chapter.entropy >= 0.8 && (
                <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-rose-400" />
              )}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center gap-4 border-t border-border pt-4">
          <span className="text-[10px] text-muted-foreground">Skala:</span>
          <div className="flex items-center gap-2">
            <div className="h-3 w-8 rounded-sm bg-cyan-500" />
            <span className="text-[10px] text-muted-foreground">0.0-0.4 (AEGIS)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-8 rounded-sm bg-amber-500" />
            <span className="text-[10px] text-muted-foreground">0.4-0.6</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-8 rounded-sm bg-orange-500" />
            <span className="text-[10px] text-muted-foreground">0.6-0.8</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-8 rounded-sm bg-rose-500" />
            <span className="text-[10px] text-muted-foreground">0.8-1.0 (Juna)</span>
          </div>
        </div>
      </div>

      {/* Character Appearance Heatmap */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="mb-5 flex items-center gap-2">
          <Users className="h-4 w-4 text-primary" />
          <div>
            <h2 className="font-mono text-sm font-bold text-foreground">
              Charakter-Appearance-Map
            </h2>
            <p className="text-xs text-muted-foreground">
              Praesenz der Anteile und Entitaeten pro Kapitel. Warnt vor ueberladenen oder vergessenen Handlungsstraengen.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="pb-3 pr-4 text-left font-mono text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  Charakter
                </th>
                {chapterData.map((c) => (
                  <th
                    key={c.chapter}
                    className="pb-3 text-center font-mono text-[10px] font-medium text-muted-foreground"
                  >
                    {c.chapter}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {characterPresence.map((char) => (
                <tr key={char.name}>
                  <td className="py-1.5 pr-4 font-mono text-xs font-medium text-foreground">
                    {char.name}
                  </td>
                  {chapterData.map((c) => {
                    const present = char.chapters.includes(c.chapter);
                    return (
                      <td key={c.chapter} className="px-1 py-1.5 text-center">
                        <div
                          className={cn(
                            "mx-auto h-5 w-5 rounded-sm transition-colors",
                            present ? cn(char.color, "opacity-70") : "bg-secondary/50"
                          )}
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FEI Detail */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="mb-4">
          <h2 className="font-mono text-sm font-bold text-foreground">
            Fabula Entropy Index (FEI)
          </h2>
          <p className="text-xs text-muted-foreground">
            Objektives Mass fuer Story-Kohaerenz. Misst, inwiefern der Verlauf der Geschichte algorithmisch vorhersagbar ist. Niedrig = entropische Intervention durch Juna noetig.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-primary bg-primary/5">
            <span className="font-mono text-2xl font-bold text-primary">{feiScore.toFixed(2)}</span>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-success" />
              <span className="text-xs text-muted-foreground">
                {'> 0.7: Hohe Vorhersagbarkeit -- AEGIS-Dominanz. Juna-Intervention empfohlen.'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-warning" />
              <span className="text-xs text-muted-foreground">
                {'0.4-0.7: Ausgewogene Spannung -- Kohaerenz und Entropie im Gleichgewicht.'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-destructive" />
              <span className="text-xs text-muted-foreground">
                {'< 0.4: Narrative Turbulenz -- AEGIS-Stabilisierung noetig.'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  icon,
  label,
  value,
  subtitle,
  trend,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtitle?: string;
  trend: "up" | "down" | "neutral";
  color: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="mb-3 flex items-center gap-2">
        <span className={cn("flex items-center justify-center", color)}>{icon}</span>
        <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
      </div>
      <div className={cn("font-mono text-2xl font-bold", color)}>{value}</div>
      {subtitle && (
        <p className="mt-1 text-[10px] text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
}
