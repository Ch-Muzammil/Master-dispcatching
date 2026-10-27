import { z } from "zod";
import { QUOTE_REQUEST_STATUSES } from "../types";

export const NOTE_MAX_LENGTH = 2000;

export const quoteRequestUpdateSchema = z.object({
  status: z.enum(QUOTE_REQUEST_STATUSES),
  /** Undefined = unassigned */
  assignedTo: z.string().optional(),
  followUpAt: z.date().optional(),
  note: z
    .string()
    .trim()
    .max(NOTE_MAX_LENGTH, `Notes can be up to ${NOTE_MAX_LENGTH} characters.`),
});

export type QuoteRequestUpdateValues = z.infer<typeof quoteRequestUpdateSchema>;
