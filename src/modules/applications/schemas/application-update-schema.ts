import { z } from "zod";
import { APPLICATION_STATUSES } from "../types";

export const NOTE_MAX_LENGTH = 2000;

export const applicationUpdateSchema = z.object({
  status: z.enum(APPLICATION_STATUSES),
  note: z
    .string()
    .trim()
    .max(NOTE_MAX_LENGTH, `Notes can be up to ${NOTE_MAX_LENGTH} characters.`),
});

export type ApplicationUpdateValues = z.infer<typeof applicationUpdateSchema>;
