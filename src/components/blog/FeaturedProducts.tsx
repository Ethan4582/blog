"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { featuredProducts } from "@/src/lib/mockData";

export default function FeaturedProducts() {
   return (
      <section className="px-10 py-12 pb-12 border-t border-border/10">
         <div className="mb-8">
            <h2 className="text-3xl font-black text-foreground tracking-tight font-serif">
               My Other <span className="text-primary/70">Alternative Products</span>
            </h2>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredProducts.map((p, i) => (
               <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="group cursor-pointer"
               >
                  <div className="relative aspect-video rounded-3xl overflow-hidden mb-6 border border-border/10 bg-muted/20 transition-all duration-500 group-hover:border-primary/20 group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]">
                     <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                     />
                  </div>

                  <div className="space-y-3">
                     <div className="text-[10px] font-black tracking-[0.2em] uppercase text-muted-foreground/40">
                        {p.date}
                     </div>

                     <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors tracking-tight font-serif leading-tight">
                        {p.title}
                     </h3>

                     <p className="text-muted-foreground/80 text-[14px] leading-relaxed line-clamp-2 font-sans">
                        {p.description}
                     </p>
                  </div>
               </motion.div>
            ))}
         </div>
      </section>
   );
}
