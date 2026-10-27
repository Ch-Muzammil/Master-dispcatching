"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

export type SearchParamUpdates = Record<string, string | number | null | undefined>;

/**
 * USE CASE: List filters / pagination that live in the URL (shareable, back-button friendly).
 *
 * HOW TO USE:
 *   const { searchParams, setSearchParams, isPending } = useSearchParamsState()
 *
 *   setSearchParams({ status: "new", page: null }) // null / "" removes the key
 *
 * The server page re-renders with the new params inside a transition, so the
 * current results stay visible while `isPending` is true (dim them, show a spinner).
 */
export function useSearchParamsState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  function setSearchParams(updates: SearchParamUpdates) {
    const next = new URLSearchParams(searchParams.toString());

    for (const [key, value] of Object.entries(updates)) {
      if (value === null || value === undefined || value === "") {
        next.delete(key);
      } else {
        next.set(key, String(value));
      }
    }

    const query = next.toString();
    if (query === searchParams.toString()) return;

    startTransition(() => {
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    });
  }

  return { searchParams, setSearchParams, isPending };
}
