"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { blogData } from "@/src/lib/blogData";
import clsx from "clsx";

export default function Sidebar() {
   const pathname = usePathname();
   // Initialize all toggles as open
   const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(
      () => {
         const initial: Record<string, boolean> = {};
         blogData.forEach((group) => {
            initial[group.slug] = true;
         });
         return initial;
      }
   );

   const toggleGroup = (slug: string) => {
      setOpenGroups((prev) => ({ ...prev, [slug]: !prev[slug] }));
   };

   return (
      <aside className="w-[260px] min-w-[260px] h-[calc(100vh-65px)] sticky top-[65px] overflow-y-auto border-r border-white/[0.06] bg-[#0a0a0a]/50 backdrop-blur-sm custom-scrollbar">
         <nav className="py-5 px-4">
            {blogData.map((group, groupIndex) => (
               <motion.div
                  key={group.slug}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: groupIndex * 0.05, duration: 0.3 }}
                  className="mb-1"
               >
                  {/* Toggle Header */}
                  <button
                     onClick={() => toggleGroup(group.slug)}
                     className={clsx(
                        "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-[13px] font-semibold tracking-wide uppercase transition-all duration-200 cursor-pointer group",
                        openGroups[group.slug]
                           ? "text-white/90 bg-white/[0.04]"
                           : "text-white/50 hover:text-white/70 hover:bg-white/[0.03]"
                     )}
                  >
                     <span>{group.title}</span>
                     <motion.div
                        animate={{ rotate: openGroups[group.slug] ? 180 : 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                     >
                        <ChevronDown className="w-3.5 h-3.5 text-white/30 group-hover:text-white/50 transition-colors" />
                     </motion.div>
                  </button>

                  {/* Pages within group */}
                  <AnimatePresence initial={false}>
                     {openGroups[group.slug] && (
                        <motion.div
                           initial={{ height: 0, opacity: 0 }}
                           animate={{ height: "auto", opacity: 1 }}
                           exit={{ height: 0, opacity: 0 }}
                           transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                           className="overflow-hidden"
                        >
                           <div className="ml-2 mt-0.5 border-l border-white/[0.06] pl-2">
                              {group.pages.map((page) => {
                                 const href = `/blog/${group.slug}/${page.slug}`;
                                 const isActive = pathname === href;

                                 return (
                                    <Link
                                       key={page.slug}
                                       href={href}
                                       className={clsx(
                                          "block px-3 py-2 rounded-md text-[13px] transition-all duration-200 relative",
                                          isActive
                                             ? "text-[#c8ff00] bg-[#c8ff00]/[0.06] font-medium"
                                             : "text-white/45 hover:text-white/75 hover:bg-white/[0.03]"
                                       )}
                                    >
                                       {isActive && (
                                          <motion.div
                                             layoutId="sidebar-active"
                                             className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[10.5px] w-[3px] h-4 bg-[#c8ff00] rounded-full"
                                             transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                          />
                                       )}
                                       {page.title}
                                    </Link>
                                 );
                              })}
                           </div>
                        </motion.div>
                     )}
                  </AnimatePresence>
               </motion.div>
            ))}
         </nav>
      </aside>
   );
}
