import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type SuccessPageContentProps = {
  jobTitle?: string;
};

export function SuccessPageContent({ jobTitle }: SuccessPageContentProps) {
  const isApplication = Boolean(jobTitle);

  return (
    <section className="flex flex-1 items-center bg-paper px-4 py-16 sm:px-6 lg:py-24">
      <div className="mx-auto w-full max-w-2xl text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Check className="size-8" strokeWidth={2.5} aria-hidden />
        </div>
        <p className="mt-6 text-sm font-bold uppercase tracking-[0.18em] text-primary">
          {isApplication ? "Application received" : "Message received"}
        </p>
        <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          {isApplication ? "Thanks for applying." : "Thanks for reaching out."}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {isApplication
            ? `Thanks for applying for the ${jobTitle} role. This is a demo — the application wasn't stored. When the database is connected, hiring will receive it here.`
            : "This is a demo — the message wasn't stored. When the database is connected, dispatch will receive it here."}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/careers"
            className={cn(buttonVariants({ size: "lg" }), "rounded-full px-7 font-bold")}
          >
            View open roles
            <ArrowRight className="size-4" aria-hidden />
          </Link>
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "rounded-full px-7 font-semibold",
            )}
          >
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
