"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronsUpDown, ExternalLink, LogOut, UserRound } from "lucide-react";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth-store";
import { handleSessionExpired } from "@/lib/auth/session";
import { UserAvatar } from "@/components/ui/Avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/Sidebar";

export function AppSidebarUser() {
  const router = useRouter();
  const { isMobile, setOpenMobile } = useSidebar();
  const user = useAuthStore((state) => state.user);

  // The demo session lives in memory, so after a page refresh only the role cookie remains.
  const name = user?.name ?? "Admin";
  const email = user?.email;

  function signOut() {
    handleSessionExpired();
    toast.info("You have been signed out");
    router.replace("/login");
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton
                size="lg"
                aria-label="Open account menu"
                className="data-popup-open:bg-sidebar-accent"
              />
            }
          >
            <UserAvatar name={name} size="sm" />
            <span className="flex min-w-0 flex-1 flex-col text-left leading-tight">
              <span className="truncate text-sm font-semibold">{name}</span>
              {email ? (
                <span className="truncate text-xs text-muted-foreground">{email}</span>
              ) : null}
            </span>
            <ChevronsUpDown className="ml-auto text-muted-foreground" aria-hidden />
          </DropdownMenuTrigger>

          <DropdownMenuContent
            side={isMobile ? "top" : "right"}
            align="end"
            sideOffset={8}
            className="w-56"
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="truncate">{email ?? name}</DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              render={<Link href="/admin/account" />}
              onClick={() => setOpenMobile(false)}
            >
              <UserRound aria-hidden />
              Account
            </DropdownMenuItem>
            <DropdownMenuItem
              render={<a href="/" target="_blank" rel="noopener noreferrer" />}
            >
              <ExternalLink aria-hidden />
              View website
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onClick={signOut}>
              <LogOut aria-hidden />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
