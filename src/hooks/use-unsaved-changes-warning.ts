"use client";

import { useEffect } from "react";

/**
 * USE CASE: Warn before closing / reloading the tab while a form has unsaved edits.
 *
 * HOW TO USE:
 *   useUnsavedChangesWarning(formState.isDirty)
 *
 * Browsers show their own generic message; custom text is not supported.
 */
export function useUnsavedChangesWarning(when: boolean) {
  useEffect(() => {
    if (!when) return;

    function handleBeforeUnload(event: BeforeUnloadEvent) {
      event.preventDefault();
    }

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [when]);
}
