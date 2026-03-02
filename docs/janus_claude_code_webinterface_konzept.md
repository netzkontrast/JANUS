# Konzept: Der Janus Port von Claude Code & das zugehörige Webinterface

## 1. Das aktuelle Ziel: Der Janus Port von Claude Code

Das Projekt "Janus" zielt darauf ab, eine autonome, selbst-orchestrierende Softwareentwicklungsumgebung für "Greenfield"-Projekte zu schaffen. Im Zentrum steht die **duale Agenten-Architektur (Cognitive Dualism)**, bestehend aus zwei unterschiedlichen Systemen, die nun in den Kontext von **Claude Code** (als treibende Intelligenz) portiert werden sollen.

### Die Architektur im Detail

*   **System 2 (Jules - The Slow-Thinking Orchestrator):**
    Dies ist die strategische, bedachte und langsame Komponente der Architektur. Jules (angetrieben durch z.B. das tiefere "Thinking" von Claude Code) ist verantwortlich für die globale Architektur, die Planung und das Management des Systemstatus (via `STATE.md`, `ROADMAP.md`). Jules schreibt nicht direkt oder voreilig Code, sondern plant, orchestriert und delegiert. Jules interagiert asynchron und schützt den Kontext vor Verfall (Context Rot).

*   **System 1 (Zeroclaw Agent - The Fast-Thinking Executor):**
    Dies ist die reaktive, schnelle Sub-Agenten-Infrastruktur (ehemals Gemini-CLI, nun in Rust geschrieben/geplant). System 1 arbeitet parallel, isoliert und experimentell im "YOLO"-Modus. Es übernimmt Aufgaben von Jules, generiert Code, führt Tests aus und validiert Hypothesen durch Compiler-Output (CodeAct). System 1 agiert schnell, verifiziert Ground Truths und meldet Ergebnisse zurück, ohne den Hauptkontext von System 2 mit irrelevanten Details zu überladen.

### Der GSD Externalized Memory Graph

Um "Context Rot" und Halluzinationen zu vermeiden, wird das Gedächtnis des Systems strikt in Markdown-Dateien externalisiert:
*   `PROJECT.md` (Vision & Architektur)
*   `REQUIREMENTS.md` (Funktionale Anforderungen)
*   `ROADMAP.md` (Makroskopische Zeitachse)
*   `STATE.md` (Kurzzeitgedächtnis, Status, Blocker)
*   `.planning/` (Speicherort für Ausführungspläne vor der Code-Eingabe)

### Episodic Memory & Learning Loops

Die Orchestrierung erfolgt über die Dimension der Zeit durch spezifische Lernzyklen:
*   **Micro-Loop (Jede Session):** Interaktionen und Pläne werden in `.sessions/<id>/` geloggt; `STATE.md` wird aktualisiert.
*   **Meso-Loop (Alle 5 Sessions):** Eine analytische Reflexion zur Identifikation von Reibungspunkten oder fehlendem Wissen.
*   **Macro-Loop (Alle 10 Sessions):** Historische XML-Pläne und alte Statusdaten werden archiviert (`/archive/`), um den aktiven Kontext sauber zu halten.

### Dynamic Mutual Context Tailoring (DMCT)

System 2 sendet bei der Delegation an System 1 nur einen präzisen, minimalen Auszug des Kontexts (L1/L2 Digests), um Überladung zu vermeiden und fokussierte Code-Validierung (CodeAct) zu gewährleisten.

---

## 2. Konzept für das Webinterface

Das Webinterface für den Janus Port von Claude Code muss die komplexe Dualität der Architektur (System 1 vs. System 2) transparent und steuerbar machen. Es dient als **Command Center (Kommandozentrale)** für den menschlichen "Supervisor" (Sounding Board & Deep Researcher).

### Kernziele des UI
*   **Transparenz der Kognition:** Den Unterschied zwischen der langsamen Planung (System 2) und der schnellen Ausführung (System 1) sichtbar machen.
*   **Zustandskontrolle:** Den GSD Memory Graph (die Markdown-Dateien) in Echtzeit überwachen und bei Bedarf editieren.
*   **Zeitliche Navigation:** Die Navigation durch Micro-, Meso- und Macro-Loops ermöglichen.

### Visueller Aufbau & Layout-Konzept

Das Layout ist in vier primäre, logische Bereiche (Panels) unterteilt:

#### 1. System 2: Der "Orchestrator" View (Links oder Oben)
*   **Zweck:** Visualisierung der langsamen, strategischen Gedanken.
*   **Inhalte:**
    *   Aktuelle Planungsphase (`.planning/templates/task_plan.xml`).
    *   Aktuelle Architektur-Entscheidungen, die von Jules getroffen werden.
    *   "Thinking"-Stream von Claude Code (wie System 2 das Problem durchdenkt).
    *   **Delegations-Panel:** Eine Ansicht, in der Jules definierte Tasks an System 1 (Zeroclaw) übergibt (inklusive der DMCT-Digests – was genau wird übergeben?).
*   **UI-Elemente:** Ruhige, strukturierte Darstellung (z.B. blaue oder violette Akzente), hierarchische Baumstruktur für Pläne.

#### 2. System 1: Der "Executor" / CodeAct View (Rechts oder Unten)
*   **Zweck:** Das schnelle, reaktive Handeln und Testen.
*   **Inhalte:**
    *   Live-Stream der Terminal-Ausgaben (Rust, Tests, Compiler-Errors).
    *   Code-Generierung in Echtzeit ("YOLO"-Modus).
    *   Darstellung der Validierungsschleifen (Hypothese -> CodeAct -> Erfolg/Fehler -> Feedback an System 2).
*   **UI-Elemente:** Dynamischer, terminal-artiger Look (dunkles Theme, Monospace-Font, grüne/rote Status-Indikatoren für Tests). Schnelle, parallele Ausführungen können als mehrere "Tabs" oder "Workers" dargestellt werden.

#### 3. Das "GSD Memory" Dashboard (Zentral / Sidebar)
*   **Zweck:** Überwachung des Projektstatus und des Gedächtnisses.
*   **Inhalte:**
    *   **State-Widgets:** Kleine Kacheln, die den Inhalt von `STATE.md`, `ROADMAP.md` und `REQUIREMENTS.md` zusammenfassen (z.B. Fortschrittsbalken, aktuelle Blocker).
    *   **Graph-View:** Eine visuelle Darstellung (Node-Graph) der Projektstruktur (`PROJECT.md`) und der Abhängigkeiten.
    *   **Edit-Möglichkeit:** Der Nutzer kann per Klick direkt in die Markdown-Dateien eingreifen, um Prioritäten zu verschieben ("Sounding Board").

#### 4. Die "Time Machine" / Loop Control (Footer oder Timeline-Ansicht)
*   **Zweck:** Verwaltung der Episodic Memory Loops.
*   **Inhalte:**
    *   Eine horizontale Zeitachse der aktuellen Session (Micro-Loop).
    *   Warnungen/Indikatoren, wenn ein Meso-Loop (Reflexion nach 5 Sessions) oder Macro-Loop (Archivierung nach 10 Sessions) ansteht.
    *   Zugriff auf `.sessions/` und `/archive/` via "Rewind"-Funktion, um alte Entscheidungen nachzuvollziehen.

### User Interaction & Intervention (Human-in-the-Loop)

*   **Approval Gates:** Jules kann das UI nutzen, um dem Menschen eine Entscheidung vorzulegen (z.B. "Major Architectural Fork"). Das UI pausiert den Flow und verlangt einen Klick auf "Approve Plan A" oder "Approve Plan B".
*   **Context Injection (Research):** Ein spezielles Eingabefeld, in dem der Mensch "Deep Research"-Ergebnisse (URLs, API-Docs, fehlendes Domänenwissen) direkt in den Kontext von System 2 injizieren kann, ohne den laufenden Chat-Stream zu unterbrechen.
*   **DMCT-Inspektor:** Bevor Jules System 1 triggert, kann der Nutzer im UI (optional) überprüfen, welcher exakte Kontext-Ausschnitt (L1/L2) mitgesendet wird, und diesen ggf. manuell anpassen.

### Fazit für das Design
Das Webinterface darf kein klassischer "Chatbot"-Screen sein. Es muss eher an ein **Mission Control Center** einer Raumfahrtbehörde oder an ein **erweitertes IDE-Dashboard** erinnern: Ein Ort, an dem asynchrone Planung, blitzschnelle Ausführung und historisches Gedächtnis auf einen Blick zusammenfließen und vom menschlichen Nutzer orchestriert werden können.
