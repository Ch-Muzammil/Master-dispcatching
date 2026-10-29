import type {
  AboutPageContent,
  AdminCmsPage,
  HomePageContent,
  LandingPageContent,
  LegalPageContent,
  TestimonialsContent,
} from "../types";
import { AboutPageForm } from "./about-page-form";
import { HomePageForm } from "./home-page-form";
import { LandingPageForm } from "./landing-page-form";
import { LegalPageForm } from "./legal-page-form";
import { TestimonialsForm } from "./testimonials-form";

export function PageEditor({ page }: { page: AdminCmsPage }) {
  switch (page.kind) {
    case "home":
      return <HomePageForm page={page} content={page.content as HomePageContent} />;
    case "about":
      return <AboutPageForm page={page} content={page.content as AboutPageContent} />;
    case "landing":
      return <LandingPageForm page={page} content={page.content as LandingPageContent} />;
    case "testimonials":
      return <TestimonialsForm page={page} content={page.content as TestimonialsContent} />;
    case "legal":
      return <LegalPageForm page={page} content={page.content as LegalPageContent} />;
    default:
      return null;
  }
}
