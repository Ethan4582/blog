import Navbar from "@/src/components/Navbar";
import Sidebar from "@/src/components/Sidebar";

export const metadata = {
   title: "tae7labs — Blog",
   description: "Explore components and documentation for tae7labs.",
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
   return (
      <div className="min-h-screen bg-[#0a0a0a]">
         <Navbar />
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
