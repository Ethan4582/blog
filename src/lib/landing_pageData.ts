import { assets } from "./asset_data";

export interface LandingPageItem {
   title: string;
   slug: string;
   date: string;
   description: string;
   image: string;             // Thumbnail for gallery cards
   gif?: string;              // GIF/video for hover preview
   images: string[];          // All images for the dedicated template page

   author?: string;
   creatorUrl?: string;
   frameworkName?: string;
   frameworkUrl?: string;
   twitterHandle?: string;
   twitterUrl?: string;

   categories?: string[];
   previewUrl?: string;       // Link for the preview button
   sourceCodeUrl?: string;    // Link for the "Use for Free" button
   hasPermission?: boolean;   // If false or undefined, show disclaimer at the bottom
}

export interface LandingPageGroup {
   title: string;
   slug: string;
   pages: LandingPageItem[];
}

export const landingPages: LandingPageGroup[] = [
   {
      title: "Portfolio",
      slug: "Portfolio",
      pages: [

         {
            title: "Amber-Media",
            slug: "amber-media",
            date: "Aug 15, 2025",
            description: "A cinematic studio website for showcasing film projects and creative work.",
            image: "https://pub-4b0a8f18a97e4b44914872dd0d22870b.r2.dev/amber/amber_hero.png",

            images: [
               "https://pub-4b0a8f18a97e4b44914872dd0d22870b.r2.dev/amber/amber_hero.png",
               'https://pub-4b0a8f18a97e4b44914872dd0d22870b.r2.dev/amber/amber-5%20(5).png',
              'https://pub-4b0a8f18a97e4b44914872dd0d22870b.r2.dev/amber/amber-5%20(4).png',
              'https://pub-4b0a8f18a97e4b44914872dd0d22870b.r2.dev/amber/amber-5%20(1).png',
               'https://pub-4b0a8f18a97e4b44914872dd0d22870b.r2.dev/amber/amber-5%20(2).png'
            ],
            author: "Thaer Swailem",
   creatorUrl: "https://x.com/ThaerSwailem",

            frameworkName: "Framer",
            frameworkUrl: "https://www.framer.com/marketplace/templates/amber/",

            twitterHandle: "@ThaerSwailem",
            twitterUrl: "https://x.com/ThaerSwailem",

            categories: ["Agency", "Portfolio"],
            previewUrl: "https://amber-media.vercel.app/",
            sourceCodeUrl: "https://github.com/Ethan4582",
            hasPermission: true,
         }
      ],
   },
   {
      title: "Health & Wellness",
      slug: "health",
      pages: [
         {
            title: "Vitalflow",
            slug: "vitalflow",
            date: "Feb 28, 2026",
            description: "Partner in health and wellness. A minimal landing page tailored for healthcare providers and virtual consultation services.",
            image: assets.tutorials.loaderSplitCounter.image,
            images: [
               assets.tutorials.loaderSplitCounter.image,
            ],
            author: "CodeGrid",
            creatorUrl: "https://codegrid.com",
            frameworkName: "React",
            frameworkUrl: "https://react.dev",
            twitterHandle: "@codegrid",
            twitterUrl: "https://twitter.com/codegrid",
            categories: ["Health", "SaaS"],
            previewUrl: "https://example.com",
            sourceCodeUrl: "https://github.com/Ethan4582",
            hasPermission: false,
         },
      ]
   }
];