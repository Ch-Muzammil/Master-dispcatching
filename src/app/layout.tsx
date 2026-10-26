import type { Metadata } from "next";
import { Archivo, Geist_Mono, Manrope } from "next/font/google";
import { Toaster } from "@/components/ui/Sonner";
import { AppProviders } from "@/providers/app-providers";
import { cn } from "@/lib/utils";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-display",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Meridian Dispatch Group",
    template: "%s · Meridian Dispatch Group",
  },
  description:
    "Professional 24/7 truck dispatching for owner-operators and fleets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        manrope.variable,
        archivo.variable,
        geistMono.variable,
      )}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col font-sans">
        <AppProviders>{children}</AppProviders>
        <Toaster />
      </body>
    </html>
  );
}
