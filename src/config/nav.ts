import {
  BookOpen,
  Briefcase,
  CircleHelp,
  FileText,
  Inbox,
  LayoutDashboard,
  Settings,
  Truck,
  UserRound,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { UserRole } from "@/config/roles";
import { siteConfig } from "@/config/site";

export type NavItem = {
  label: string;
  href: string;
};

export type AppNavItem = NavItem & {
  icon: LucideIcon;
};

export type AppNavGroup = {
  label: string;
  items: AppNavItem[];
};

/**
 * Sidebar navigation per role, grouped into labelled sections.
 *
 * HOW TO USE:
 *   import { ROLE_NAV } from "@/config/nav"
 *   const groups = ROLE_NAV[user.role]
 */
export const ROLE_NAV: Record<UserRole, AppNavGroup[]> = {
  admin: [
    {
      label: "Overview",
      items: [
        { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
      ],
    },
    {
      label: "Leads",
      items: [
        { label: "Quote requests", href: "/admin/quote-requests", icon: Inbox },
        { label: "Job applications", href: "/admin/applications", icon: Users },
      ],
    },
    {
      label: "Content",
      items: [
        { label: "Services", href: "/admin/services", icon: Truck },
        { label: "Careers", href: "/admin/careers", icon: Briefcase },
        { label: "Blog", href: "/admin/blog", icon: BookOpen },
        { label: "FAQs", href: "/admin/faqs", icon: CircleHelp },
        { label: "Pages", href: "/admin/pages", icon: FileText },
      ],
    },
    {
      label: "Settings",
      items: [
        { label: "Website settings", href: "/admin/settings", icon: Settings },
        { label: "Account", href: "/admin/account", icon: UserRound },
      ],
    },
  ],
};

/** Finds the nav item that owns `pathname` (exact match or nested route). */
export function findActiveNavItem(
  groups: AppNavGroup[],
  pathname: string,
): AppNavItem | undefined {
  for (const group of groups) {
    for (const item of group.items) {
      if (pathname === item.href || pathname.startsWith(`${item.href}/`)) {
        return item;
      }
    }
  }
  return undefined;
}

export const PUBLIC_NAV: NavItem[] = [...siteConfig.navigation];
