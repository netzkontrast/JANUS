"use client";

import { Sidebar } from "@/components/sidebar";
import { SidebarProvider, useSidebarState } from "@/lib/sidebar-context";

function ShellContent({ children }: { children: React.ReactNode }) {
  const { collapsed } = useSidebarState();
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div
        className="flex-1 transition-all duration-200"
        style={{ marginLeft: collapsed ? "4rem" : "15rem" }}
      >
        {children}
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <ShellContent>{children}</ShellContent>
    </SidebarProvider>
  );
}
