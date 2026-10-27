/**
 * DEMO DATA — admin view of FAQs until Supabase is connected.
 * Mirrors the public FAQ page.
 */
import { slugify } from "@/lib/slugify";
import type { AdminFaqGroup } from "@/modules/faqs/types";
import { faqGroups } from "./faqs";

export function buildDemoAdminFaqs(): AdminFaqGroup[] {
  return faqGroups.map((group) => ({
    id: `faqg-${slugify(group.category)}`,
    category: group.category,
    items: group.items.map((item, index) => ({
      id: `faq-${slugify(item.question).slice(0, 40) || index}`,
      question: item.question,
      answer: item.answer,
    })),
  }));
}
