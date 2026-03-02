"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import type { Section } from "@/src/lib/blogData";

interface TableOfContentsProps {
   sections: Section[];
}

export default function TableOfContents({ sections }: TableOfContentsProps) {
   const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || "");
   const [scrollProgress, setScrollProgress] = useState(0);

   useEffect(() => {
      const handleScroll = () => {
         // Calculate overall scroll progress
         const scrollTop = window.scrollY;
         const docHeight = document.documentElement.scrollHeight - window.innerHeight;
         const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
         setScrollProgress(progress);

         // Determine which section is currently in view
         let currentSection = sections[0]?.id || "";
         for (const section of sections) {
            const element = document.getElementById(section.id);
            if (element) {
               const rect = element.getBoundingClientRect();
               if (rect.top <= 140) {
                  currentSection = section.id;
               }
            }
         }
         setActiveSection(currentSection);
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();
      return () => window.removeEventListener("scroll", handleScroll);
   }, [sections]);

   const scrollToSection = (id: string) => {
      const element = document.getElementById(id);
      if (element) {
         const top = element.getBoundingClientRect().top + window.scrollY - 100;
         window.scrollTo({ top, behavior: "smooth" });
      }
   };

   return (
      <aside className="w-[220px] min-w-[220px] h-[calc(100vh-65px)] sticky top-[65px] overflow-y-auto py-8 px-5 custom-scrollbar">
         {/* Progress Bar */}
         <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
               <span className="text-[11px] font-semibold text-white/30 uppercase tracking-widest">
                  Progress
               </span>
               <span className="text-[11px] font-mono text-white/25">
                  {Math.round(scrollProgress * 100)}%
               </span>
            </div>
            <div className="h-[3px] bg-white/[0.06] rounded-full overflow-hidden">
               <motion.div
                  className="h-full bg-gradient-to-r from-[#c8ff00] to-[#a0d900] rounded-full"
                  style={{ width: `${scrollProgress * 100}%` }}
                  transition={{ duration: 0.1 }}
               />
            </div>
         </div>

         {/* Table of Contents heading */}
         <h3 className="text-[11px] font-semibold text-white/30 uppercase tracking-widest mb-4">
            On this page
         </h3>

         {/* Section Links */}
         <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white/[0.06] rounded-full" />

            {sections.map((section) => {
               const isActive = activeSection === section.id;
               return (
                  <button
                     key={section.id}
                     onClick={() => scrollToSection(section.id)}
                     className={clsx(
                        "relative w-full text-left pl-4 py-2 text-[13px] transition-all duration-200 block cursor-pointer",
                        isActive
                           ? "text-[#c8ff00] font-medium"
                           : "text-white/35 hover:text-white/60"
                     )}
                  >
                     {isActive && (
                        <motion.div
                           layoutId="toc-active"
                           className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-5 bg-[#c8ff00] rounded-full"
                           transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        />
                     )}
                     {section.title}
                  </button>
               );
            })}
         </div>
      </aside>
   );
}
