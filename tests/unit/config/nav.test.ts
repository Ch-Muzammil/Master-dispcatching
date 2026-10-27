import { describe, expect, it } from "vitest";
import { findActiveNavItem, PUBLIC_NAV, ROLE_NAV } from "@/config/nav";
import { ROLES } from "@/config/roles";

describe("nav config", () => {
  it("has grouped nav for every role, scoped to the role prefix", () => {
    for (const role of ROLES) {
      expect(ROLE_NAV[role].length).toBeGreaterThan(0);
      for (const group of ROLE_NAV[role]) {
        expect(group.label.length).toBeGreaterThan(0);
        for (const item of group.items) {
          expect(item.href.startsWith(`/${role}`)).toBe(true);
          expect(item.label.length).toBeGreaterThan(0);
        }
      }
    }
  });

  it("has no duplicate hrefs", () => {
    const hrefs = ROLE_NAV.admin.flatMap((group) => group.items.map((i) => i.href));
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });

  it("finds the active item for exact and nested routes", () => {
    expect(findActiveNavItem(ROLE_NAV.admin, "/admin/services")?.label).toBe("Services");
    expect(findActiveNavItem(ROLE_NAV.admin, "/admin/services/new")?.label).toBe("Services");
    expect(findActiveNavItem(ROLE_NAV.admin, "/admin/servicesx")).toBeUndefined();
  });

  it("exposes public nav links", () => {
    expect(PUBLIC_NAV.some((i) => i.href === "/")).toBe(true);
  });
});
