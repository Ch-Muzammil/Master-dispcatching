import type { UserRole } from "@/config/roles";
import { SidebarInset, SidebarProvider } from "@/components/ui/Sidebar";
import { AppSidebar, type NavBadges } from "./app-sidebar";
import { AppTopbar } from "./app-topbar";

type AppShellProps = {
  role: UserRole;
  children: React.ReactNode;
  /** Small counts next to nav items, keyed by href (e.g. new leads). */
  navBadges?: NavBadges;
  /** Default sidebar open on desktop */
  defaultSidebarOpen?: boolean;
};

/**
 * Dashboard shell: white sidebar (sheet on mobile) + sticky top bar + gray page canvas.
 * Page titles and actions belong to each page via `AdminPageHeader`.
 *
 * HOW TO USE:
 *   <AppShell role="admin" navBadges={{ "/admin/quote-requests": 3 }}>{children}</AppShell>
 */
export function AppShell({
  role,
  children,
  navBadges,
  defaultSidebarOpen = true,
}: AppShellProps) {
  return (
    <SidebarProvider defaultOpen={defaultSidebarOpen}>
      <AppSidebar role={role} badges={navBadges} />
      <SidebarInset className="min-w-0 bg-muted">
        <AppTopbar role={role} />
        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
