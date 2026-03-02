import fs from "fs";
import path from "path";

const PROJECT_ROOT = process.cwd();

export function readMarkdownFile(filename: string): string {
  const filePath = path.join(PROJECT_ROOT, filename);
  try {
    return fs.readFileSync(filePath, "utf-8");
  } catch {
    return "";
  }
}

export interface ParsedSection {
  title: string;
  content: string;
  level: number;
}

export function parseMarkdownSections(md: string): ParsedSection[] {
  const lines = md.split("\n");
  const sections: ParsedSection[] = [];
  let current: ParsedSection | null = null;
  const contentLines: string[] = [];

  for (const line of lines) {
    const match = line.match(/^(#{1,4})\s+(.+)/);
    if (match) {
      if (current) {
        current.content = contentLines.join("\n").trim();
        sections.push(current);
        contentLines.length = 0;
      }
      current = {
        title: match[2],
        content: "",
        level: match[1].length,
      };
    } else if (current) {
      contentLines.push(line);
    }
  }

  if (current) {
    current.content = contentLines.join("\n").trim();
    sections.push(current);
  }

  return sections;
}

export interface ChecklistItem {
  text: string;
  done: boolean;
}

export function parseChecklist(md: string): ChecklistItem[] {
  const items: ChecklistItem[] = [];
  const lines = md.split("\n");
  for (const line of lines) {
    const match = line.match(/^\s*-\s*\[(x| )\]\s*(.+)/i);
    if (match) {
      items.push({
        done: match[1].toLowerCase() === "x",
        text: match[2].replace(/\*\*/g, "").trim(),
      });
    }
  }
  return items;
}
