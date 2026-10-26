import Image from "next/image";
import { Eyebrow } from "../shared";
import { siteImages } from "@/data/images";

export function CareersHero() {
  return (
    <section className="border-b bg-paper">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:py-20">
        <div>
          <Eyebrow>Careers</Eyebrow>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Work the freight, learn the craft
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            We&apos;re dispatchers, coordinators, and compliance specialists who treat trucking like a trade worth mastering. Small teams, real desks, and mentorship from people who&apos;ve lived the load boards.
          </p>
        </div>
        <Image src={siteImages.careersDriver} alt="Meridian dispatcher on a call with a driver" width={1600} height={1104} className="aspect-[16/10] w-full rounded-2xl object-cover shadow-lg" priority />
      </div>
    </section>
  );
}
