export type Faq = {
  question: string;
  answer: string;
};

export type FaqGroup = {
  category: string;
  items: Faq[];
};

export const faqGroups: FaqGroup[] = [
  {
    category: "Services & dispatching",
    items: [
      {
        question: "What exactly does a dispatch service do?",
        answer:
          "A dispatch service runs the business side of your truck: sourcing loads, negotiating rates, handling broker setups and paperwork, tracking appointments, and managing invoicing. You stay focused on driving; we handle the freight office work that used to eat your evenings.",
      },
      {
        question: "Which equipment types do you dispatch?",
        answer:
          "We dispatch dry van, refrigerated, flatbed, step deck, RGN, and power only operations. Each equipment type has a dedicated desk with dispatchers who specialize in its freight, permits, and rate structures.",
      },
      {
        question: "Do you force me to take loads I do not want?",
        answer:
          "Never. Your dispatcher presents opportunities and you make the final call on every load. We learn your lanes, home-time schedule, and rate floor during onboarding so the loads we bring you are ones you would usually say yes to anyway.",
      },
      {
        question: "What load boards and tools do you use?",
        answer:
          "Our dispatchers work across DAT, Truckstop, and direct broker relationships built over years. Carriers get one clean dispatch sheet per load while we handle the board-hunting behind the scenes.",
      },
      {
        question: "Can you dispatch a fleet, not just a single truck?",
        answer:
          "Yes. Fleets from two to 30 or more trucks get a dedicated dispatch team, lane planning across the whole fleet, and weekly performance reviews covering gross per truck, lane mix, and broker concentration.",
      },
    ],
  },
  {
    category: "Onboarding & setup",
    items: [
      {
        question: "How fast can I start receiving loads?",
        answer:
          "Most carriers are dispatched within two to three business days of onboarding. New authorities take a little longer while insurance filings and broker setups complete; our carrier setup team helps keep that process moving.",
      },
      {
        question: "What documents do I need to onboard?",
        answer:
          "Your MC/USDOT numbers, certificate of insurance, W-9, voided check or bank letter, and a signed dispatch agreement. Our setup team walks you through everything else, including broker packets.",
      },
      {
        question: "Is there a long-term contract?",
        answer:
          "No. We work month-to-month with 30 days' notice in either direction. We would rather earn your business every month than lock you into a contract you resent.",
      },
    ],
  },
  {
    category: "Rates & billing",
    items: [
      {
        question: "How much does dispatching cost?",
        answer:
          "Our standard rate is a flat percentage of gross linehaul per load, with no setup fees or minimums. The exact percentage depends on your equipment and service level. You will get a clear, written number on your first call.",
      },
      {
        question: "Do you touch my money?",
        answer:
          "No. Brokers and shippers pay you directly, into your account. We invoice and manage paperwork, but freight revenue always flows straight to you.",
      },
      {
        question: "What about detention, layover, and TONU?",
        answer:
          "We track and pursue those claims as part of dispatching, including the documentation trail brokers need to pay them. Closing that accessorial revenue gap is part of the job.",
      },
    ],
  },
  {
    category: "Careers at Meridian",
    items: [
      {
        question: "Do I need freight experience to work here?",
        answer:
          "For dispatcher roles, yes: we want people who have lived the load boards. For load planner and coordinator roles, we hire for hunger and train hard.",
      },
      {
        question: "Are remote positions truly remote?",
        answer:
          "Yes. Night-shift coordinators and junior load planners work fully remote anywhere in the US, with company-provided equipment and planned desk coverage rotations.",
      },
      {
        question: "What does the interview process look like?",
        answer:
          "A 20-minute intro call, a practical exercise built from real anonymized freight scenarios, and then a panel with the team lead you would work with.",
      },
    ],
  },
];
