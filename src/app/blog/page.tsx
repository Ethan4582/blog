"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getFirstPage } from "@/src/lib/blogData";

export default function BlogIndexPage() {
   const router = useRouter();
   const firstPage = getFirstPage();

   useEffect(() => {
      router.replace(firstPage);
   }, [router, firstPage]);

   return (
      <div className="flex items-center justify-center min-h-screen text-white/20 font-mono text-sm tracking-widest uppercase text-center">
         <meta httpEquiv="refresh" content={`0; url=${firstPage}`} />
         Directing to docs...
      </div>
   );
}
