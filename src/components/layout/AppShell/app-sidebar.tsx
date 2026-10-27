"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Truck } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { findActiveNavItem, ROLE_NAV } from "@/config/nav";
import { getHomeRouteForRole, type UserRole } from "@/config/roles";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/Sidebar";
import { AppSidebarUser } from "./app-sidebar-user";

export type NavBadges = Partial<Record<string, number>>;

type AppSidebarProps = {
  role: UserRole;
  badges?: NavBadges;
};

export function AppSidebar({ role, badges = {} }: AppSidebarProps) {
  const pathname = usePathname();
  const { isMobile, setOpenMobile } = useSidebar();
  const groups = ROLE_NAV[role];
  const homeHref = getHomeRouteForRole(role);
  const activeHref = findActiveNavItem(groups, pathname)?.href;

  // On mobile the sidebar is a sheet; close it once the user picks a page.
  const closeOnMobile = () => {
    if (isMobile) setOpenMobile(false);
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="h-16 justify-center border-b px-3 group-data-[collapsible=icon]:px-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              tooltip={siteConfig.name}
              className="h-11 hover:bg-transparent active:bg-transparent"
              render={<Link href={homeHref} onClick={closeOnMobile} />}
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary">
                <Truck className="size-4 text-accent" aria-hidden />
              </span>
              <span className="flex min-w-0 flex-col leading-tight">
                <span className="truncate font-display text-[0.95rem] font-bold text-foreground">
                  {siteConfig.shortName}
                </span>
                <span className="truncate text-xs text-muted-foreground">Admin portal</span>
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="py-2">
        <nav aria-label="Admin navigation">
          {groups.map((group) => (
            <SidebarGroup key={group.label} className="px-3 py-1.5 group-data-[collapsible=icon]:px-2">
              <SidebarGroupLabel className="h-7 px-2 text-[0.68rem] font-semibold tracking-wider text-muted-foreground uppercase">
                {group.label}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="gap-0.5">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = item.href === activeHref;
                    const badge = badges[item.href];
                    return (
                      <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton
                          isActive={isActive}
                          tooltip={item.label}
                          className={cn(
                            badge && "pr-10",
                            "h-9 gap-2.5 px-2.5 font-medium text-foreground/75 hover:text-foreground data-active:bg-primary data-active:font-semibold data-active:text-primary-foreground hover:data-active:bg-primary hover:data-active:text-primary-foreground data-active:[&_svg]:text-accent",
                          )}
                          render={
                            <Link
                              href={item.href}
                              aria-current={isActive ? "page" : undefined}
                              onClick={closeOnMobile}
                            />
                          }
                        >
                          <Icon aria-hidden />
                          <span>{item.label}</span>
                        </SidebarMenuButton>
                        {badge ? (
                          <SidebarMenuBadge
                            aria-label={`${badge} new`}
                            className="top-2! rounded-full bg-accent px-1.5 font-semibold text-accent-foreground peer-hover/menu-button:text-accent-foreground peer-data-active/menu-button:text-accent-foreground"
                          >
                            {badge}
                          </SidebarMenuBadge>
                        ) : null}
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </nav>
      </SidebarContent>

      <SidebarFooter className="border-t p-3 group-data-[collapsible=icon]:p-2">
        <AppSidebarUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
