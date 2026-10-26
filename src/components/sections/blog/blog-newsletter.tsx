import { SectionHeading } from "../shared";

export function BlogNewsletter() {
  return (
    <section className="border-t bg-paper">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-16">
        <SectionHeading
          align="center"
          eyebrow="Stay sharp"
          title="One practical freight email, twice a month"
          description="New guides, rate notes, and compliance reminders. Unsubscribe whenever — we'd rather be useful than frequent."
        />
      </div>
    </section>
  );
}
