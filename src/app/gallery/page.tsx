"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { recentTutorials } from "@/src/lib/mockData";
import { ArrowUpRight } from "lucide-react";

export default function GalleryPage() {
   return (
      <div className="flex-1 min-h-screen bg-background text-foreground py-24 px-10">
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-6xl mx-auto"
         >
            <header className="mb-20">
               <h1 className="text-5xl font-black tracking-tight mb-4 font-serif">Gallery</h1>
               <p className="text-muted-foreground text-lg max-w-2xl font-sans leading-relaxed">
                  Visual explorations and creative experiments. A showcase of purely aesthetic components and detailed layouts.
               </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
               {recentTutorials.map((t, i) => (
                  <motion.div
                     key={t.id}
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: i * 0.1, duration: 0.5 }}
                     className="group relative flex flex-col bg-muted/20 rounded-2xl overflow-hidden border border-border/10 hover:border-primary/20 transition-all duration-500 shadow-sm"
                  >
                     <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                           src={t.image}
                           alt={t.title}
                           fill
                           className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                     </div>

                     <div className="p-8 flex flex-col flex-1">
                        <div className="flex items-center gap-2 mb-4">
                           <span className="text-[10px] font-black tracking-widest uppercase py-1 px-2 rounded bg-primary/5 text-primary/70">
                              {t.tag}
                           </span>
                        </div>

                        <h3 className="text-2xl font-black tracking-tight mb-3 font-serif group-hover:text-primary transition-colors">
                           {t.title}
                        </h3>

                        <p className="text-muted-foreground text-[14px] leading-relaxed mb-8 flex-1 font-sans italic">
                           "{t.galleryDescription || t.description}"
                        </p>

                        <Link
                           href={t.slug ? `/blog/${t.category.toLowerCase()}/${t.slug}` : "#"}
                           className="inline-flex items-center gap-2 text-xs font-black tracking-[0.2em] text-foreground/40 group-hover:text-primary transition-all duration-300 uppercase"
                        >
                           VIEW CASE STUDY <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                     </div>
                  </motion.div>
               ))}
            </div>
         </motion.div>
      </div>
   );
}
