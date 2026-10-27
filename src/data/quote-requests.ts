import type { QuoteRequest } from "@/modules/quote-requests/types";
import { aboutTeam } from "./about";

type DemoNote = { author: string; body: string; hoursAgo: number };

type DemoRow = Omit<QuoteRequest, "receivedAt" | "followUpAt" | "notes"> & {
  receivedHoursAgo: number;
  /** Negative = follow-up already overdue. */
  followUpInHours?: number;
  notes?: DemoNote[];
};

/** DEMO DATA — people a lead can be assigned to (admin users table later). */
export const demoTeamMembers: string[] = aboutTeam.map((member) => member.name);

/** DEMO DATA — sample leads for building the admin UI before the database exists. */
const DEMO_ROWS: DemoRow[] = [
  {
    id: "qr-1012",
    name: "Marcus Delgado",
    company: "Delgado Freight LLC",
    email: "marcus@delgadofreight.com",
    phone: "(214) 555-0187",
    equipment: "Dry van",
    fleetSize: "2–5 trucks",
    message: "Running Texas to the Southeast. Looking for consistent weekly loads and help with broker packets.",
    status: "new",
    receivedHoursAgo: 1.5,
  },
  {
    id: "qr-1011",
    name: "Tanya Brooks",
    company: "Brooks Cold Chain",
    email: "tanya@brookscoldchain.com",
    phone: "(404) 555-0143",
    equipment: "Refrigerated",
    fleetSize: "6–15 trucks",
    message: "Need a reefer desk that can handle produce seasons out of Georgia and Florida.",
    status: "new",
    receivedHoursAgo: 5,
  },
  {
    id: "qr-1010",
    name: "James Whitaker",
    company: "Whitaker Hauling",
    email: "james@whitakerhauling.com",
    phone: "(615) 555-0109",
    equipment: "Flatbed",
    fleetSize: "1 truck",
    message: "New authority, 3 months in. Want help with rates and permits on oversize loads.",
    status: "contacted",
    receivedHoursAgo: 20,
    followUpInHours: -2,
    assignedTo: "Dana Whitfield",
    notes: [
      {
        author: "Dana Whitfield",
        body: "Left a voicemail. He mentioned OD permits in Tennessee and Alabama — loop in Priya before the next call.",
        hoursAgo: 6,
      },
    ],
  },
  {
    id: "qr-1009",
    name: "Sofia Ramirez",
    company: "Ramirez Transport Inc.",
    email: "sofia@ramireztransport.com",
    phone: "(602) 555-0176",
    equipment: "Power only",
    fleetSize: "2–5 trucks",
    message: "Interested in drop-and-hook power only lanes in the Southwest.",
    status: "new",
    receivedHoursAgo: 28,
  },
  {
    id: "qr-1008",
    name: "Derrick Owens",
    company: "Owens Logistics Group",
    email: "derrick@owenslogistics.com",
    phone: "(312) 555-0122",
    equipment: "Dry van",
    fleetSize: "16–30 trucks",
    message: "Fleet of 22 trucks, looking to outsource night dispatch and weekend coverage.",
    status: "qualified",
    receivedHoursAgo: 46,
    followUpInHours: 20,
    assignedTo: "Marcus Bell",
    notes: [
      {
        author: "Marcus Bell",
        body: "Discovery call done. 22 dry vans, mostly Midwest lanes. Wants night + weekend coverage only. Sending proposal tomorrow.",
        hoursAgo: 8,
      },
      {
        author: "Marcus Bell",
        body: "Booked a 30-minute discovery call for this afternoon.",
        hoursAgo: 30,
      },
    ],
  },
  {
    id: "qr-1007",
    name: "Angela Foster",
    company: "Foster & Sons Trucking",
    email: "angela@fostersons.com",
    phone: "(901) 555-0164",
    equipment: "Step deck",
    fleetSize: "2–5 trucks",
    message: "Need step deck freight out of Memphis, mostly machinery and building materials.",
    status: "contacted",
    receivedHoursAgo: 70,
    followUpInHours: -10,
    assignedTo: "Marcus Bell",
  },
  {
    id: "qr-1006",
    name: "Kevin Nguyen",
    company: "Nguyen Express",
    email: "kevin@nguyenexpress.com",
    phone: "(713) 555-0198",
    equipment: "Refrigerated",
    fleetSize: "1 truck",
    message: "Owner-operator, reefer. Want someone to handle billing and paperwork too.",
    status: "won",
    receivedHoursAgo: 96,
    assignedTo: "Dana Whitfield",
  },
  {
    id: "qr-1005",
    name: "Rachel Kim",
    company: "Summit Line Carriers",
    email: "rachel@summitline.com",
    phone: "(303) 555-0131",
    equipment: "Dry van",
    fleetSize: "6–15 trucks",
    message: "Comparing dispatch services for our Colorado fleet. Please send pricing details.",
    status: "qualified",
    receivedHoursAgo: 120,
    followUpInHours: 4,
    assignedTo: "Dana Whitfield",
  },
  {
    id: "qr-1004",
    name: "Victor Hale",
    company: "Hale Heavy Haul",
    email: "victor@haleheavyhaul.com",
    phone: "(405) 555-0157",
    equipment: "Flatbed",
    fleetSize: "6–15 trucks",
    message: "Looking for help with overdimensional permits across multiple states.",
    status: "lost",
    receivedHoursAgo: 170,
    assignedTo: "Marcus Bell",
  },
  {
    id: "qr-1003",
    name: "Lisa Morgan",
    company: "Morgan Road Lines",
    email: "lisa@morganroadlines.com",
    phone: "(816) 555-0115",
    equipment: "Dry van",
    fleetSize: "2–5 trucks",
    message: "Started with another dispatcher, not happy with communication. Want to switch.",
    status: "won",
    receivedHoursAgo: 210,
    assignedTo: "Dana Whitfield",
  },
  {
    id: "qr-1002",
    name: "Brian Castillo",
    company: "Castillo Carriers",
    email: "brian@castillocarriers.com",
    phone: "(915) 555-0138",
    equipment: "Refrigerated",
    fleetSize: "2–5 trucks",
    message: "Cross-border reefer loads out of El Paso. Do you handle Mexico-bound freight?",
    status: "lost",
    receivedHoursAgo: 260,
    assignedTo: "Andre Coleman",
  },
  {
    id: "qr-1001",
    name: "Monica Patel",
    company: "Patel Freightways",
    email: "monica@patelfreightways.com",
    phone: "(919) 555-0172",
    equipment: "Dry van",
    fleetSize: "6–15 trucks",
    message: "Need help onboarding two new drivers and setting up broker packets for the expansion.",
    status: "won",
    receivedHoursAgo: 300,
    assignedTo: "Priya Raman",
  },
  {
    id: "qr-1000",
    name: "Greg Sullivan",
    company: "Sullivan Expedited",
    email: "greg@sullivanexpedited.com",
    phone: "(502) 555-0119",
    equipment: "Other",
    fleetSize: "1 truck",
    message: "Hotshot with a 40 ft gooseneck. Is that something your team dispatches?",
    status: "contacted",
    receivedHoursAgo: 340,
    followUpInHours: 30,
    assignedTo: "Andre Coleman",
  },
  {
    id: "qr-0999",
    name: "Erin Walsh",
    company: "Walsh Brothers Transport",
    email: "erin@walshbrothers.com",
    phone: "(617) 555-0150",
    equipment: "Flatbed",
    fleetSize: "16–30 trucks",
    message: "Evaluating dispatch partners for Q1. Please share references from flatbed fleets.",
    status: "qualified",
    receivedHoursAgo: 400,
    followUpInHours: -30,
    assignedTo: "Marcus Bell",
  },
];

const HOUR = 60 * 60 * 1000;

/** Builds demo leads with dates relative to `now`, so the dashboard always looks current. */
export function buildDemoQuoteRequests(now = Date.now()): QuoteRequest[] {
  const at = (offsetHours: number) => new Date(now + offsetHours * HOUR).toISOString();

  return DEMO_ROWS.map(({ receivedHoursAgo, followUpInHours, notes = [], ...row }) => ({
    ...row,
    receivedAt: at(-receivedHoursAgo),
    followUpAt: followUpInHours === undefined ? undefined : at(followUpInHours),
    notes: notes.map((note, index) => ({
      id: `${row.id}-note-${index}`,
      author: note.author,
      body: note.body,
      createdAt: at(-note.hoursAgo),
    })),
  }));
}
