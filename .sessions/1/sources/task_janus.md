# Task: Initialisierung Janus-Architektur & Transaktionales Logging
Kontext: Setup des autonomen Basis-Repositories für die duale Jules/Gemini-Orchestrierung. Du agierst als System 2 (Orchestrator).

Auszuführende Schritte:
Transaktionales Gedächtnis (Micro-Loop) & Session-Verzeichnis:
Lege das Verzeichnis .sessions/ an. Dies dient als dedizierter Speicherort für alle rohen Benutzereingaben, Prompts und Interaktionsverläufe.
Erstelle darin die initiale session_log.jsonl.
Strikte Regel: Jede Benutzereingabe, jede getroffene architektonische Entscheidung, jeder XML-Plan und jeder Test-Output muss ab sofort lückenlos als immutabler Event in diesem Verzeichnis protokolliert werden.
GSD-Fundament errichten: * Erstelle die zentralen Steuerungsdateien im Root-Verzeichnis: PROJECT.md, REQUIREMENTS.md, ROADMAP.md und STATE.md.
Ordnerstruktur & Private Workspace:
Lege .planning/ für zukünftige XML-Ausführungspläne an.
Erstelle /.private/jules/ inklusive einer initialen persona.yaml zur Definition deines kognitiven Zustands (Risikotoleranz, Strenge).
Lege das Verzeichnis /archive/ an, um den Macro-Loop (die Konsolidierung historischer Daten nach 10 Sessions) infrastrukturell vorzubereiten.
Skills & Context-Engineering:
Definiere die Vorlage für den SKILL.md-Standard (nach agentskills.io) in einem neuen /skills/ Verzeichnis.
Dokumentiere das Konzept für hierarchische Digests (L0 Abstract, L1 Overview), um Token-Kollaps bei zukünftigen Dateisystem-Scans zu verhindern.
DMCT-Protokoll:
Erstelle eine Kurzreferenz, wie die Gemini-CLI (System 1) künftig Kontext-Deltas durch zwingend ausführbaren Code validieren muss (Dynamic Mutual Context Tailoring).
Abnahmekriterium: Alle Verzeichnisse (insbesondere .sessions/ und /archive/) und Dateien sind angelegt, die STATE.md spiegelt den erfolgreichen Setup-Prozess wider, und dieser initiale Prompt ist der erste Eintrag im neuen Session-Verzeichnis.
