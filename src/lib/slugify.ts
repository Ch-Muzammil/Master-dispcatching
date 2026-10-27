/**
 * USE CASE: Build a URL-safe slug from a title (services, blog posts, jobs).
 *
 * HOW TO USE:
 *   slugify("Flatbed & Step Deck Dispatching") // → "flatbed-step-deck-dispatching"
 */
export function slugify(input: string): string {
  return input
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
    .replace(/-+$/g, "");
}

/** Lowercase letters/numbers separated by single hyphens. */
export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
