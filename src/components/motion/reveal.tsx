"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: "none" | "short" | "medium";
};

export function Reveal({ children, className, delay = "none" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    setReady(true);
    if (typeof IntersectionObserver === "undefined") {
      const frame = window.requestAnimationFrame(() => setVisible(true));
      return () => window.cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-motion-reveal
      data-motion-ready={ready || undefined}
      data-motion-visible={visible || undefined}
      className={cn(
        "motion-pending",
        delay === "short" && "motion-delay-short",
        delay === "medium" && "motion-delay-medium",
        className,
      )}
    >
      {children}
    </div>
  );
}
