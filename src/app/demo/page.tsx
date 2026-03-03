"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { recentTutorials } from "@/src/lib/mockData";
import { PlayCircle } from "lucide-react";

export default function DemoPage() {
   return (
      <div className="flex-1 min-h-screen bg-background text-foreground py-24 px-10">
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-5xl mx-auto"
         >
            <header className="mb-24 text-center">
               <h1 className="text-5xl font-black mb-6 tracking-tight font-serif">Interactive Demos</h1>
               <p className="text-muted-foreground text-lg max-w-xl mx-auto font-sans leading-relaxed">
                  Hands-on prototypes and functional demonstrations. Click a card to explore the interactive logic.
               </p>
            </header>

            <div className="space-y-12">
               {recentTutorials.map((t, i) => (
                  <motion.div
                     key={t.id}
                     initial={{ opacity: 0, x: -20 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: i * 0.1, duration: 0.5 }}
                     className="group relative grid grid-cols-1 md:grid-cols-[300px_1fr] bg-[#fdfdfd] dark:bg-muted/10 rounded-3xl overflow-hidden border border-border/10 hover:border-primary/30 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] cursor-pointer"
                  >
                     <div className="relative h-[240px] md:h-full overflow-hidden">
                        <Image
                           src={t.image}
                           alt={t.title}
                           fill
                           className="object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/5" />
                     </div>

                     <div className="p-10 flex flex-col justify-center">
                        <div className="mb-6">
                           <h3 className="text-xl font-bold mb-2 text-foreground/40 group-hover:text-primary transition-colors uppercase tracking-widest font-sans text-xs">
                              {t.title}
                           </h3>
                           <div className="h-px w-8 bg-primary/20 group-hover:w-12 transition-all duration-500" />
                        </div>

                        <div className="flex items-start gap-4 mb-10">
                           <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                              <PlayCircle className="w-4 h-4 text-primary" />
                           </div>
                           <p className="text-foreground/90 text-[18px] font-semibold leading-relaxed font-sans max-w-xl">
                              {t.demoInstructions || "Open the tutorial to explore the interactive demonstration."}
                           </p>
                        </div>

                        <Link
                           href={t.slug ? `/blog/${t.category.toLowerCase()}/${t.slug}` : "#"}
                           className="w-fit px-8 py-3 bg-foreground text-background dark:bg-foreground dark:text-background rounded-full text-xs font-black tracking-widest uppercase hover:scale-105 transition-transform active:scale-95 shadow-lg shadow-black/10"
                        >
                           Experience Demo
                        </Link>
                     </div>
                  </motion.div>
               ))}
            </div>
         </motion.div>
      </div>
   );
}
