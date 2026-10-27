import type { Metadata } from "next";
import { SectionPlaceholder } from "@/components/admin";

export const metadata: Metadata = { title: "Account" };

export default function AccountPage() {
  return (
    <SectionPlaceholder
      title="Account"
      description="Update your profile and change your password."
    />
  );
}
