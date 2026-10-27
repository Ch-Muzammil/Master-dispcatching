import { redirect } from "next/navigation";
import { getHomeRouteForRole } from "@/config/roles";

export default function AdminIndexPage() {
  redirect(getHomeRouteForRole("admin"));
}
