"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function LenisProvider({ children }: { children: React.ReactNode }) {
   const lenisRef = useRef<Lenis | null>(null);

   useEffect(() => {
      if (!lenisRef.current) {
         lenisRef.current = new Lenis({
            lerp: 0.08,
            smoothWheel: true,
         });

         function raf(time: number) {
            lenisRef.current?.raf(time);
            requestAnimationFrame(raf);
         }
         requestAnimationFrame(raf);
      }

      return () => {
         if (lenisRef.current) {
            lenisRef.current.destroy();
            lenisRef.current = null;
         }
      };
   }, []);

   return <>{children}</>;
}
