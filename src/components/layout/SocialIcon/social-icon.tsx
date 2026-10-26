import type { SocialLink } from "@/types/site";

type SocialIconProps = {
  icon: SocialLink["icon"];
  className?: string;
};

export function SocialIcon({ icon, className }: SocialIconProps) {
  const commonProps = {
    className,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": true,
  } as const;

  if (icon === "facebook") {
    return (
      <svg {...commonProps}>
        <path d="M13.5 21v-8h2.75l.4-3h-3.15V8.08c0-.87.24-1.46 1.5-1.46h1.8V3.94c-.31-.04-1.38-.14-2.63-.14-2.6 0-4.37 1.59-4.37 4.51V10H7v3h2.8v8h3.7Z" />
      </svg>
    );
  }

  if (icon === "instagram") {
    return (
      <svg {...commonProps}>
        <rect x="3" y="3" width="18" height="18" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="17.5" cy="6.5" r="1" />
      </svg>
    );
  }

  if (icon === "linkedin") {
    return (
      <svg {...commonProps}>
        <path d="M5.2 3.5a2.1 2.1 0 1 1 0 4.2 2.1 2.1 0 0 1 0-4.2ZM3.4 9h3.6v11.5H3.4V9Zm5.8 0h3.45v1.57h.05c.48-.9 1.65-1.85 3.4-1.85 3.64 0 4.31 2.4 4.31 5.52v6.26h-3.6v-5.55c0-1.32-.02-3.02-1.84-3.02-1.84 0-2.12 1.44-2.12 2.92v5.65H9.2V9Z" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <path d="M18.9 2.75h3.68l-8.04 9.2L24 21.25h-7.4l-5.8-7.59-6.64 7.59H.47l7.72-8.83L.1 2.75h7.59l5.24 6.93 5.97-6.93Zm-1.29 16.56h2.04L6.6 4.57H4.4l13.21 14.74Z" />
    </svg>
  );
}
