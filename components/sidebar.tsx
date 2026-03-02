"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Brain,
  LayoutDashboard,
  MessageSquare,
  BookOpen,
  Flame,
  Scale,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useSidebarState } from "@/lib/sidebar-context";

const navItems = [
  {
    label: "Mission Control",
    href: "/",
    icon: LayoutDashboard,
    description: "System overview",
  },
  {
    label: "Synapsen-Kanal",
    href: "/synapsen",
    icon: MessageSquare,
    description: "Agent interaction",
  },
  {
    label: "Ontologischer Codex",
    href: "/codex",
    icon: BookOpen,
    description: "Knowledge graph",
  },
  {
    label: "Entropie-Kartografie",
    href: "/entropie",
    icon: Flame,
    description: "Narrative analysis",
  },
  {
    label: "Tribunal der Anteile",
    href: "/tribunal",
    icon: Scale,
    description: "Conflict resolution",
  },
  {
    label: "Forschungs-Sphare",
    href: "/forschung",
    icon: Search,
    description: "Research workspace",
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarState();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-border bg-card transition-all duration-200",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Logo */}
      <div className="flex h-14 items-center gap-3 border-b border-border px-4">
        <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Brain className="h-4 w-4" />
          <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full border border-card bg-success" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <h1 className="font-mono text-sm font-bold text-foreground">
              JANUS
            </h1>
            <p className="truncate text-[10px] text-muted-foreground">
              Kohaerenz-Konstrukt
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 py-3">
        <div className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
                title={collapsed ? item.label : undefined}
              >
                <item.icon
                  className={cn(
                    "h-4 w-4 shrink-0",
                    isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                  )}
                />
                {!collapsed && (
                  <div className="overflow-hidden">
                    <span className="block truncate font-medium">
                      {item.label}
                    </span>
                    <span className="block truncate text-[10px] opacity-60">
                      {item.description}
                    </span>
                  </div>
                )}
                {isActive && !collapsed && (
                  <div className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Collapse Toggle */}
      <div className="border-t border-border p-2">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex w-full items-center justify-center rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>
    </aside>
  );
}
