"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/blog");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen text-white/20 font-mono text-sm tracking-widest">
      <meta httpEquiv="refresh" content="0; url=/blog" />
      REDIRECTING TO BLOG...
    </div>
  );
}
