import {
  Handshake,
  MessageSquareHeart,
  Route as RouteIcon,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

export type AboutValue = {
  icon: LucideIcon;
  title: string;
  body: string;
};

export const aboutValues: AboutValue[] = [
  {
    icon: ShieldCheck,
    title: "Protect the truck first",
    body: "Every decision starts with the carrier's margin and safety record. If a load isn't good for your operation, it isn't good for us - whatever the commission.",
  },
  {
    icon: MessageSquareHeart,
    title: "Answer like a person",
    body: "No ticket queues for breakdowns. When a driver calls, they reach a dispatcher who knows their truck, lanes, and last three loads.",
  },
  {
    icon: RouteIcon,
    title: "Master the craft",
    body: "Dispatching is a trade. We train it, document it, and review it weekly - negotiation, routing, paperwork, and the judgment that ties them together.",
  },
  {
    icon: Handshake,
    title: "Month-to-month trust",
    body: "We don't lock carriers into contracts. If we earn the desk every month, we keep it - that pressure keeps us honest.",
  },
];

export const aboutTeam = [
  { name: "Dana Whitfield", role: "Head of Carrier Success", initials: "DW", bio: "14 years in freight; built our onboarding playbook from zero." },
  { name: "Marcus Bell", role: "Director of Dispatch Operations", initials: "MB", bio: "Ran a 60-truck brokerage desk before joining Meridian in 2019." },
  { name: "Priya Raman", role: "Compliance Lead", initials: "PR", bio: "Guided 100+ carriers through FMCSA audits and corrections." },
  { name: "Andre Coleman", role: "Night Desk Supervisor", initials: "AC", bio: "Former owner-operator; keeps the overnight freight moving." },
] as const;

export const aboutMilestones = [
  { year: "2017", text: "Founded in Dallas with two dispatchers and six owner-operators." },
  { year: "2019", text: "Opened the 24/7 night desk after months of carrier requests." },
  { year: "2022", text: "Launched dedicated reefer and flatbed desks; crossed 100 carriers." },
  { year: "2026", text: "140 carriers dispatched, $38M in annual freight booked." },
] as const;
