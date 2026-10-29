import type { Metadata } from "next";
import { AccountView, getAccountOverview } from "@/modules/account";

export const metadata: Metadata = { title: "Account" };

export default async function AccountPage() {
  const { profile, sessions } = await getAccountOverview();
  return <AccountView profile={profile} sessions={sessions} />;
}
