Ich sehe, dass du die Skills vereinfachen und refactoren möchtest. Um sicherzustellen, dass ich deine Erwartungen genau treffe, lass uns kurz in die "Deep Planning Phase" gehen:

1. **Struktur**: Laut den Projektrichtlinien benötigt jedes Plugin/jeder Skill mindestens eine `plugin.json` und eine `SKILL.md` mit YAML Frontmatter. Aktuell fehlen die `plugin.json` Dateien in den Skills. Soll ich diese aus den Metadaten der jeweiligen `SKILL.md` generieren?
2. **Namenskonventionen**: Der Skill `k-dense-ai-claude-scientific-skills-scientific-critical-thinking` hat einen sehr langen Namen. Soll ich diesen in etwas Kürzeres wie `scientific-critical-thinking` umbenennen? Ebenso gibt es `create_skill` (mit Unterstrich) anstatt `create-skill` (mit Bindestrich). Soll ich die Ordnernamen vereinheitlichen (z.B. alles mit Bindestrich)?
3. **Inhaltliche Vereinfachung**: Gibt es bestimmte Inhalte, Ordner (`scripts/`, `references/`) oder Beschreibungen in den `SKILL.md` Dateien, die ich zusammenfassen oder löschen soll?
4. **Skills Management**: Sollen nach dem Refactoring die Symlinks aktualisiert oder `npx skills add` verwendet werden, um die Änderungen im gesamten System (`.agents`, `.claude` etc.) korrekt zu verknüpfen?

Sobald du mir deine Präferenzen mitteilst, werde ich einen detaillierten Plan erstellen.
