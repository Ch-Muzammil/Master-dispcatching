import type { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin";
import { listAdminServices, ServiceForm } from "@/modules/services";

export const metadata: Metadata = { title: "New service" };

export default async function NewServicePage() {
  const services = await listAdminServices();

  return (
    <>
      <AdminPageHeader
        title="New service"
        description="Saved as a draft until you choose to publish it."
        back={{ href: "/admin/services", label: "Services" }}
      />
      <ServiceForm takenSlugs={services.map((service) => service.slug)} />
    </>
  );
}
