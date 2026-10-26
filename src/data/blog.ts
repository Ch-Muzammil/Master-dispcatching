import { siteImages } from "./images";

export type PostBlock =
  | { kind: "p"; text: string }
  | { kind: "h"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "quote"; text: string };

export type Post = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  author: string;
  authorRole: string;
  authorInitials: string;
  date: string;
  readTime: string;
  cover: string;
  coverAlt: string;
  body: PostBlock[];
};

export const postCategories = [
  "All posts",
  "Dispatch guides",
  "Market insights",
  "Compliance",
  "Company news",
] as const;

export const posts: Post[] = [
  {
    slug: "evaluate-dispatch-service",
    title: "How to Evaluate a Truck Dispatch Service Before You Sign",
    category: "Dispatch guides",
    excerpt:
      "The dispatch market is crowded with big promises and thin follow-through. Here's the checklist we'd hand a friend before they signed with anyone — including us.",
    author: "Dana Whitfield",
    authorRole: "Head of Carrier Success",
    authorInitials: "DW",
    date: "Oct 21, 2026",
    readTime: "7 min read",
    cover: siteImages.aboutOperations,
    coverAlt: "Dispatcher reviewing load boards on multiple screens",
    body: [
      { kind: "p", text: "A dispatch service becomes part of your business the moment you sign — they negotiate rates, handle brokers, and manage the freight office work that used to eat your evenings. Choosing well is one of the highest-leverage decisions an owner-operator makes." },
      { kind: "h", text: "1. Ask exactly how they get paid" },
      { kind: "p", text: "The standard model is a percentage of gross linehaul — typically 4% to 10%. Ask whether the fee includes accessorials, setup fees, cancellation fees, or minimum commitments. Your freight revenue should always land in your account first." },
      { kind: "h", text: "2. Meet the actual dispatcher, not the salesperson" },
      { kind: "p", text: "Ask for a call with the person who will work your loads. Listen for lane knowledge, negotiation instincts, and whether they ask about your home time before they ask about your truck." },
      { kind: "h", text: "3. Check how they handle bad days" },
      { kind: "p", text: "Ask who covers your truck when a dispatcher is away, how detention claims are documented, and what happens when a load goes wrong. Good answers are process-based, not personality-based." },
      { kind: "quote", text: "Show me a load you lost money on and what you did about it." },
      { kind: "h", text: "4. Verify the compliance backbone" },
      { kind: "p", text: "Ask how the service vets broker credit, stores your documents, and keeps setup packets complete enough to pass a shipper's review." },
      { kind: "h", text: "5. Start with a trial desk, not a long contract" },
      { kind: "p", text: "Month-to-month terms let trust grow naturally. A dispatch partner should earn your business every month." },
    ],
  },
  {
    slug: "spot-vs-contract-rates",
    title: "Spot Rates vs. Contract Rates: What Owner-Operators Should Know",
    category: "Market insights",
    excerpt:
      "Contract freight pays less per load but shows up every week. Spot freight pays more when it's hot and disappears when it isn't. The right answer depends on your truck, your lanes, and your risk tolerance.",
    author: "Marcus Bell",
    authorRole: "Director of Dispatch Operations",
    authorInitials: "MB",
    date: "Oct 14, 2026",
    readTime: "6 min read",
    cover: siteImages.heroFleet,
    coverAlt: "Freight pricing charts on a dispatch office screen",
    body: [
      { kind: "p", text: "Every owner-operator eventually faces the same fork: chase the spot market's best week, or lock into contract lanes that pay steadily. Getting this decision right matters more than most negotiation tactics combined." },
      { kind: "h", text: "What the difference actually is" },
      { kind: "p", text: "Spot rates are the live market price for a one-time move, set by supply and demand at booking. Contract rates are negotiated for repeated freight, usually for a month or quarter." },
      { kind: "h", text: "When spot works in your favor" },
      { kind: "list", items: ["You run regions with seasonal surges you can time", "Your fixed costs are low and your home time is flexible", "You have a dispatcher watching the board in real time"] },
      { kind: "h", text: "When contract freight wins" },
      { kind: "list", items: ["You have fixed costs that need predictable revenue", "You want home time on a schedule", "You're building toward a second truck"] },
      { kind: "h", text: "The hybrid most successful carriers run" },
      { kind: "p", text: "Cover your baseline with two or three contract lanes, then fill the gaps with spot freight at negotiated rates. You get predictability where it matters and upside where it is worth chasing." },
    ],
  },
  {
    slug: "fmcsa-compliance-checklist",
    title: "FMCSA Compliance Checklist for Small Carriers",
    category: "Compliance",
    excerpt:
      "Audits rarely ambush carriers that keep tidy records. This is the checklist our compliance team walks through with every carrier at onboarding — condensed to one page.",
    author: "Priya Raman",
    authorRole: "Compliance Lead",
    authorInitials: "PR",
    date: "Oct 6, 2026",
    readTime: "8 min read",
    cover: siteImages.serviceReefer,
    coverAlt: "Carrier paperwork and FMCSA documentation on a desk",
    body: [
      { kind: "p", text: "FMCSA compliance is less about exotic rules and more about doing boring things consistently. Most findings in small-carrier audits trace back to a handful of preventable gaps." },
      { kind: "h", text: "Authority & registration" },
      { kind: "list", items: ["MC number active and USDOT number current", "Biennial USDOT filing completed", "UCR registration filed for the current year", "BOC-3 process agent designation on file", "Operating authority insurance meets minimums"] },
      { kind: "h", text: "Driver files" },
      { kind: "list", items: ["Valid CDL with proper endorsements", "Motor vehicle record checked annually and at hire", "Driver qualification file complete", "Drug and alcohol clearinghouse queries documented"] },
      { kind: "h", text: "Equipment & operations" },
      { kind: "list", items: ["Annual vehicle inspection records current", "ELD functioning with no unexplained gaps", "Hours-of-service violations tracked", "DVIRs completed and defects corrected"] },
      { kind: "h", text: "The habit that matters most" },
      { kind: "p", text: "Pick one day each month and audit yourself against this list. Carriers who do that rarely see an audit go badly because the audit is confirming what they already know." },
    ],
  },
  {
    slug: "authority-to-first-load",
    title: "From Authority to First Load: A Practical Carrier Timeline",
    category: "Company news",
    excerpt:
      "New authority is exciting, but the first load takes more than an active MC number. Here is the sequence that gets a new carrier ready for reliable freight.",
    author: "Elena Torres",
    authorRole: "Carrier Setup Lead",
    authorInitials: "ET",
    date: "Sep 29, 2026",
    readTime: "5 min read",
    cover: siteImages.careersDriver,
    coverAlt: "Truck driver preparing for a first dispatch",
    body: [
      { kind: "p", text: "The gap between an active authority and a first revenue load is where many new carriers make costly mistakes. Thirty days of sequence beats six months of improvisation." },
      { kind: "h", text: "Week 1: Build the foundation" },
      { kind: "list", items: ["Confirm insurance is filed and the MCS-150 reflects your operation", "Join the Drug & Alcohol Clearinghouse as an employer", "Set up IFTA if you'll cross state lines regularly", "Open a dedicated business bank account"] },
      { kind: "h", text: "Week 2: Get setup-ready" },
      { kind: "p", text: "Assemble your carrier packet: W-9, COI, authority letters, bank letter, and references. A complete packet is the cheapest marketing a new carrier owns." },
      { kind: "h", text: "Week 3: Pick your first lanes deliberately" },
      { kind: "p", text: "Do not take the first load — take the right first load. Choose freight slightly below your target in lanes with strong return freight." },
      { kind: "h", text: "Week 4: Build the flywheel" },
      { kind: "list", items: ["Request broker references", "Log your actual cost per mile", "Review which lanes paid best after fuel and deadhead", "Decide whether to dispatch yourself or bring in a dispatcher"] },
      { kind: "quote", text: "The carriers who thrive in year one treat month one as an investment period, not a panic period." },
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function relatedPosts(slug: string, count = 2) {
  return posts.filter((post) => post.slug !== slug).slice(0, count);
}
