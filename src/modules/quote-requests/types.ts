import type { equipmentOptions, fleetSizeOptions } from "@/data/contact";

export const QUOTE_REQUEST_STATUSES = [
  "new",
  "contacted",
  "qualified",
  "won",
  "lost",
] as const;

export type QuoteRequestStatus = (typeof QUOTE_REQUEST_STATUSES)[number];

export type QuoteRequestEquipment = (typeof equipmentOptions)[number];

export type QuoteRequestNote = {
  id: string;
  author: string;
  body: string;
  /** ISO date string */
  createdAt: string;
};

/** A lead submitted through the public contact / quote form. */
export type QuoteRequest = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  equipment: QuoteRequestEquipment;
  fleetSize: (typeof fleetSizeOptions)[number];
  message: string;
  status: QuoteRequestStatus;
  /** ISO date string */
  receivedAt: string;
  /** ISO date string — when the next follow-up is due, if scheduled */
  followUpAt?: string;
  assignedTo?: string;
  /** Internal team notes, newest first */
  notes: QuoteRequestNote[];
};

/** List filters, parsed from the URL search params. */
export type QuoteRequestFilters = {
  q: string;
  status: QuoteRequestStatus | "all";
  equipment: QuoteRequestEquipment | "all";
  page: number;
};

export type QuoteRequestListResult = {
  items: QuoteRequest[];
  total: number;
  page: number;
  pageCount: number;
  pageSize: number;
  /** Counts per status for the tabs — ignore the status filter but respect search/equipment. */
  statusCounts: Record<QuoteRequestStatus | "all", number>;
};
