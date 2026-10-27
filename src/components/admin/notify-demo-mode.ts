import { toast } from "sonner";

/**
 * Honest feedback for admin actions while the portal runs on demo data.
 * Remove the call sites as each action gets wired to the database.
 *
 * HOW TO USE:
 *   notifyDemoMode("This update")  // → "Demo mode — this update wasn't saved"
 */
export function notifyDemoMode(subject: string) {
  const text = subject.charAt(0).toLowerCase() + subject.slice(1);
  toast.info(`Demo mode — ${text} wasn't saved`, {
    description: "Changes will save once the database is connected.",
  });
}
