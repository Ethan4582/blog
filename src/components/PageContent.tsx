"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import type { PageItem, ToggleGroup } from "@/src/lib/blogData";

interface PageContentProps {
   group: ToggleGroup;
   page: PageItem;
}

const PLACEHOLDER_PARAS = [
   "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
   "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
   "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
];

const containerVariants = {
   hidden: {},
   visible: { transition: { staggerChildren: 0.1 } },
};

const sectionVariants = {
   hidden: { opacity: 0, y: 28 },
   visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
   },
};

export default function PageContent({ group, page }: PageContentProps) {
   /* Notify Lenis that the DOM changed so it recalculates scroll height */
   const ref = useRef<HTMLDivElement>(null);

   useEffect(() => {
      window.scrollTo({ top: 0 });
   }, [page.slug]);

   return (
      <motion.div
         ref={ref}
         key={page.slug}
         variants={containerVariants}
         initial="hidden"
         animate="visible"
         className="flex-1 min-w-0 px-10 py-12"
      >
         {/* Breadcrumb */}
         <motion.div variants={sectionVariants} className="flex items-center gap-2 mb-8">
            <span className="text-[12px] text-white/25 font-medium uppercase tracking-widest">
               {group.title}
            </span>
            <span className="text-white/15 text-xs">/</span>
            <span className="text-[12px] text-[#c8ff00]/70 font-medium uppercase tracking-widest">
               {page.title}
            </span>
         </motion.div>

         {/* Page Title */}
         <motion.h1
            variants={sectionVariants}
            className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight leading-tight"
         >
            {page.title}
         </motion.h1>
         <motion.p variants={sectionVariants} className="text-white/40 text-base mb-14 leading-relaxed max-w-xl">
            Placeholder overview for {page.title} under {group.title}. Scroll down to explore all sections.
         </motion.p>

         {/* Divider */}
         <motion.div variants={sectionVariants} className="h-px bg-gradient-to-r from-white/[0.08] via-white/[0.03] to-transparent mb-14" />

         {/* Sections */}
         {page.sections.map((section, index) => (
            <motion.section
               key={section.id}
               id={section.id}
               variants={sectionVariants}
               className="mb-20 scroll-mt-28"
            >
               {/* Section label */}
               <div className="flex items-center gap-3 mb-5">
                  <span className="text-[10px] font-bold text-[#c8ff00]/50 uppercase tracking-[0.2em]">
                     {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="h-px flex-1 bg-white/[0.05]" />
               </div>

               <h2 className="text-2xl font-semibold text-white mb-5 tracking-tight">
                  {section.title}
               </h2>

               {/* Info card */}
               <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 mb-6 group hover:border-white/[0.1] hover:bg-white/[0.03] transition-all duration-300">
                  <div className="flex items-start gap-4">
                     <div className="w-10 h-10 rounded-lg bg-[#c8ff00]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-3 h-3 rounded-full bg-[#c8ff00]/60" />
                     </div>
                     <div>
                        <p className="text-[13px] font-semibold text-white/60 mb-1">{section.title}</p>
                        <p className="text-[13px] text-white/30 leading-relaxed">
                           This section covers the {section.title.toLowerCase()} topics within {page.title}.
                        </p>
                     </div>
                  </div>
               </div>

               {PLACEHOLDER_PARAS.map((para, pi) => (
                  <p key={pi} className="text-[14px] text-white/35 leading-7 mb-4">
                     {para}
                  </p>
               ))}

               {/* Code-like block */}
               <div className="mt-8 rounded-lg border border-white/[0.05] bg-[#111] overflow-hidden">
                  <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/[0.05]">
                     <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                     <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
                     <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
                     <span className="ml-3 text-[11px] text-white/20 font-mono">{section.id}.ts</span>
                  </div>
                  <div className="px-5 py-4 font-mono text-[12px] leading-6 text-white/25">
                     <span className="text-purple-400/60">export</span>{" "}
                     <span className="text-blue-400/60">const</span>{" "}
                     <span className="text-[#c8ff00]/50">{section.id.replace(/-/g, "_")}</span>{" "}
                     <span className="text-white/30">=</span>{" "}
                     <span className="text-orange-400/50">{`{`}</span>
                     <br />
                     {"  "}
                     <span className="text-white/25">name:</span>{" "}
                     <span className="text-green-400/50">"{section.title}"</span>
                     <span className="text-orange-400/50">,</span>
                     <br />
                     {"  "}
                     <span className="text-white/25">page:</span>{" "}
                     <span className="text-green-400/50">"{page.slug}"</span>
                     <span className="text-orange-400/50">,</span>
                     <br />
                     <span className="text-orange-400/50">{`}`}</span>
                     <span className="text-white/30">;</span>
                  </div>
               </div>
            </motion.section>
         ))}
      </motion.div>
   );
}
