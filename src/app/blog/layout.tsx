import Sidebar from "@/src/components/navbar/Sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: "Tae7labs — Dashboard",
   description: "Explore components and documentation for Tae7labs.",
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
   return (
      <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
         <div className="flex pt-[65px]">
            {/* Left sidebar */}
            <Sidebar />
            {/* Main content area */}
            <main className="flex flex-1 min-w-0">
               {children}
            </main>
         </div>
      </div>
   );
}
