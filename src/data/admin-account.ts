/**
 * DEMO DATA — account profile extras and sessions until auth is wired to Supabase.
 */
import type { AccountProfile, AccountSession } from "@/modules/account/types";

const HOUR = 60 * 60 * 1000;

export function buildDemoAccountProfile(now = Date.now()): AccountProfile {
  return {
    name: "Demo User",
    email: "demo@example.com",
    role: "Administrator",
    lastLoginAt: new Date(now - 2 * HOUR).toISOString(),
    twoFactor: true,
  };
}

export function buildDemoAccountSessions(now = Date.now()): AccountSession[] {
  return [
    {
      id: "session-current",
      device: "Windows PC · Chrome",
      location: "Dallas, TX",
      lastActiveAt: new Date(now).toISOString(),
      current: true,
      kind: "desktop",
    },
    {
      id: "session-phone",
      device: "iPhone · Safari",
      location: "Dallas, TX",
      lastActiveAt: new Date(now - 2 * HOUR).toISOString(),
      current: false,
      kind: "mobile",
    },
    {
      id: "session-edge",
      device: "Windows PC · Edge",
      location: "Frisco, TX",
      lastActiveAt: new Date(now - 10 * 24 * HOUR).toISOString(),
      current: false,
      kind: "desktop",
    },
  ];
}
