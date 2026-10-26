import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";

function phoneHref(phone: string) {
  return `tel:${phone.replace(/\D/g, "")}`;
}

export function ContactDetails() {
  const cards = [
    {
      icon: Phone,
      title: "Dispatch line",
      value: siteConfig.contact.dispatchLine,
      sub: "24/7 — always a dispatcher on duty",
      href: phoneHref(siteConfig.contact.dispatchLine),
    },
    {
      icon: Mail,
      title: "Email",
      value: siteConfig.contact.email,
      sub: "Replies within one business hour",
      href: `mailto:${siteConfig.contact.email}`,
    },
    {
      icon: MapPin,
      title: "Headquarters",
      value: siteConfig.contact.address,
      sub: `Serving ${siteConfig.serviceArea}`,
    },
  ];

  return (
    <aside className="space-y-6">
      {cards.map(({ icon: Icon, title, value, sub, href }) => (
        <div key={title} className="flex gap-4 rounded-xl border bg-card p-5">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary text-accent">
            <Icon className="size-5" aria-hidden />
          </span>
          <div className="min-w-0">
            <h2 className="font-display text-sm font-bold uppercase tracking-wider text-muted-foreground">
              {title}
            </h2>
            {href ? (
              <a href={href} className="mt-1 block break-words font-semibold hover:text-primary">
                {value}
              </a>
            ) : (
              <p className="mt-1 font-semibold">{value}</p>
            )}
            <p className="text-xs text-muted-foreground">{sub}</p>
          </div>
        </div>
      ))}

      <div className="rounded-xl border bg-card p-5">
        <h2 className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wider text-muted-foreground">
          <Clock3 className="size-4 text-accent" aria-hidden />
          Hours
        </h2>
        <dl className="mt-3 space-y-2 text-sm">
          {siteConfig.hours.map((hour) => (
            <div key={hour.label} className="flex justify-between gap-5 text-sm">
              <dt className="text-muted-foreground">{hour.label}</dt>
              <dd className="text-right font-semibold text-foreground">{hour.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </aside>
  );
}
