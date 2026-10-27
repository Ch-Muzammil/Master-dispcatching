import { z } from "zod";
import { FAQ_LIMITS as L } from "../constants";
import type { AdminFaqItem } from "../types";

const requiredText = (label: string, max: number) =>
  z
    .string()
    .trim()
    .min(1, `${label} is required.`)
    .max(max, `${label} can be up to ${max} characters.`);

export const faqItemSchema = z.object({
  question: requiredText("Question", L.question),
  answer: requiredText("Answer", L.answer),
  groupId: z.string().min(1),
});

export type FaqItemFormValues = z.infer<typeof faqItemSchema>;

export const faqGroupSchema = z.object({
  category: requiredText("Group name", L.category),
});

export type FaqGroupFormValues = z.infer<typeof faqGroupSchema>;

export function toFaqItemFormValues(
  groupId: string,
  item?: AdminFaqItem,
): FaqItemFormValues {
  return {
    question: item?.question ?? "",
    answer: item?.answer ?? "",
    groupId,
  };
}
