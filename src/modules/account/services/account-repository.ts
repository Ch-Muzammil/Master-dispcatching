import { connection } from "next/server";
import { buildDemoAccountProfile, buildDemoAccountSessions } from "@/data/admin-account";
import type { AccountProfile, AccountSession } from "../types";

export async function getAccountOverview(): Promise<{
  profile: AccountProfile;
  sessions: AccountSession[];
}> {
  await connection();
  return {
    profile: buildDemoAccountProfile(),
    sessions: buildDemoAccountSessions(),
  };
}
