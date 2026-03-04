"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import type { PageItem, ToggleGroup } from "@/src/lib/mockData";
import type { PostContent } from "@/src/lib/types";
import PostHero from "@/src/components/blog/PostHero";
import { RichSection } from "@/src/components/blog/RichSection";

interface PageContentProps {
   group: ToggleGroup;
   page: PageItem;
   post: PostContent | null;
}

const containerVariants = {
   hidden: {},
   visible: { transition: { staggerChildren: 0.1 } },
};

const sectionVariants = {
   hidden: { opacity: 0, y: 28 },
   visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as any },
   },
};

export default function PageContent({ group, page, post }: PageContentProps) {
   const ref = useRef<HTMLDivElement>(null);
   const hasPost = !!post;

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
         className="flex-1 min-w-0 px-10 py-12 font-sans text-foreground"
      >
         <div className="max-w-4xl">
            {/* Hero — only when rich post data exists */}
            {hasPost && <PostHero post={post!} page={page} />}

            {/* Fallback title when no rich data */}
            {!hasPost && (
               <motion.div variants={sectionVariants} className="mb-14">
                  <h1 className="text-4xl md:text-6xl font-black text-foreground mb-4 tracking-tight leading-tight font-serif">
                     {page.title}
                  </h1>
                  <p className="text-foreground/80 text-lg mb-8 leading-relaxed max-w-2xl font-sans">
                     Placeholder overview for {page.title} under {group.title}.
                  </p>
                  <div className="h-px bg-gradient-to-r from-primary/30 via-primary/5 to-transparent shadow-[0_1px_0_0_rgba(255,255,255,0.1)]" />
               </motion.div>
            )}
         </div>

         {/* Sections */}
         <div className="max-w-4xl">
            {(hasPost ? post!.sections : page.sections).map((section, index) => (
               <motion.section
                  key={section.id}
                  id={section.id}
                  variants={sectionVariants}
                  className="mb-20 scroll-mt-24"
               >
                  <h2 className="text-2xl tracking-tight font-semibold text-foreground mb-6 font-sans">
                     {section.title || `Section ${index + 1}`}
                  </h2>

                  {hasPost && "content" in section && Array.isArray(section.content) ? (
                     <RichSection content={section.content} />
                  ) : (
                     /* Fallback for sections with no data yet */
                     <div className="rounded-2xl border border-border/40 bg-card/40 backdrop-blur-sm p-8 mb-8">
                        <div className="flex items-start gap-5">
                           <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-primary-foreground font-bold">{index + 1}</span>
                           </div>
                           <div>
                              <p className="text-sm font-bold text-foreground mb-1.5">{section.title}</p>
                              <p className="text-sm text-foreground/75 leading-relaxed max-w-lg">
                                 This section has no rich content defined in data yet.
                              </p>
                           </div>
                        </div>
                     </div>
                  )}
               </motion.section>
            ))}
         </div>
      </motion.div>
   );
}
