"use client";

import { motion } from "framer-motion";
import { blogNavigation } from "@/src/lib/mockData";
import Link from "next/link";
import clsx from "clsx";

export default function TutorialList() {
   return (
      <section className="px-10 py-20 pb-32 border-t border-border/10">
         <div className="max-w-4xl">
            <h2 className="text-4xl font-extrabold text-foreground mb-20 tracking-tight font-serif">
               All Tutorials
            </h2>

            <div className="space-y-20">
               {blogNavigation.map((group) => (
                  <div key={group.slug} className="space-y-10">
                     <h3 className="text-[12px] font-black text-primary/40 uppercase tracking-[0.4em] font-sans">
                        {group.title}
                     </h3>

                     <div className="space-y-4">
                        {[...group.pages].reverse().map((page, idx) => {
                           const isIntro = group.slug === "getting-started" && page.slug === "intro";
                           const href = isIntro ? "/blog" : `/blog/${group.slug}/${page.slug}`;

                           return (
                              <motion.div
                                 key={page.slug}
                                 initial={{ opacity: 0, y: 10 }}
                                 whileInView={{ opacity: 1, y: 0 }}
                                 viewport={{ once: true }}
                                 transition={{ delay: idx * 0.05 }}
                              >
                                 <Link
                                    href={href}
                                    className="group grid grid-cols-[140px_1fr] items-center py-4 px-2 hover:bg-muted/30 transition-all duration-300 rounded-lg border-b border-border/5"
                                 >
                                    <div className="text-[14px] text-muted-foreground/30 font-medium group-hover:text-muted-foreground/60 transition-colors">
                                       {page.date || "March 3, 2026"}
                                    </div>

                                    <div className="text-[18px] font-bold text-foreground/80 group-hover:text-primary group-hover:pl-2 transition-all duration-300 font-serif tracking-tight">
                                       {page.title}
                                    </div>
                                 </Link>
                              </motion.div>
                           );
                        })}
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>
   );
}
