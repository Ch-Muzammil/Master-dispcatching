import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdminPageHeader, StatusBadge } from "@/components/admin";
import {
  listAdminServices,
  SERVICE_STATUS_META,
  ServiceForm,
} from "@/modules/services";

type EditServicePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: EditServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const services = await listAdminServices();
  const service = services.find((item) => item.slug === slug);
  return { title: service ? `Edit ${service.shortTitle}` : "Service not found" };
}

export default async function EditServicePage({ params }: EditServicePageProps) {
  const { slug } = await params;
  const services = await listAdminServices();
  const service = services.find((item) => item.slug === slug);

  if (!service) notFound();

  const status = SERVICE_STATUS_META[service.status];

  return (
    <>
      <AdminPageHeader
        title={service.title}
        description="Changes go live on the website when you save a published service."
        back={{ href: "/admin/services", label: "Services" }}
        actions={<StatusBadge label={status.label} tone={status.tone} />}
      />
      <ServiceForm
        service={service}
        takenSlugs={services.filter((item) => item.id !== service.id).map((item) => item.slug)}
      />
    </>
  );
}
