import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "@/modules/auth";
import { PageLoader } from "@/components/feedback/page-loader";

export const metadata: Metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">Sign in</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Demo sign-in: any email and password work until real authentication is connected.
        </p>
      </div>

      <Suspense fallback={<PageLoader label="Loading form" />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
