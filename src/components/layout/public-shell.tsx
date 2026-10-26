import { SiteFooter } from "./SiteFooter/site-footer";
import { SiteHeader } from "./SiteHeader/site-header";

export function PublicShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <SiteHeader />
      <main className="flex flex-1 flex-col">{children}</main>
      <SiteFooter />
    </div>
  );
}
