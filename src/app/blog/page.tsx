import { Metadata } from "next";
import BlogHero from "@/src/components/blog/BlogHero";
import RecentTutorials from "@/src/components/blog/RecentTutorials";
import LandingPageSection from "@/src/components/blog/LandingPageSection";
import FeaturedProducts from "@/src/components/blog/FeaturedProducts";
import TutorialList from "@/src/components/blog/TutorialList";

export const metadata: Metadata = {
   title: "T7labs Blog",
   description: "Explore my latest blog posts, tutorials, and alternative products.",
};

export default function BlogIndexPage() {
   return (
      <div className="flex-1 min-w-0 bg-background overflow-y-auto custom-scrollbar relative">
         <div className="relative z-10 w-full">
            <BlogHero />
            <RecentTutorials />
            <LandingPageSection />
            <FeaturedProducts />
            <TutorialList />
         </div>
      </div>
   );
}
