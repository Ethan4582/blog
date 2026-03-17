import LandingPageGallery from "@/src/components/blog/LandingPageGallery";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: "Templates - T7labs",
   description: "Browse all landing page templates",
};

export default function LandingPagesGalleryPage() {
   return <LandingPageGallery />;
}
