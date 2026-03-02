"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import HamburgerMenu from "./HamburgerMenu";
import ThemeToggle from "./ThemeToggle";
import { motion } from "framer-motion";

export default function Navbar() {
   const [menuOpen, setMenuOpen] = useState(false);

   return (
      <>
         <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-xl bg-background/80 border-b border-border/10"
         >
            <Link href="/blog" className="flex items-center gap-3 group">
               <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-extrabold text-sm tracking-tight shadow-[0_0_20px_rgba(100,200,255,0.2)]">
                  VM
               </div>
               <span className="text-foreground/90 font-semibold text-[15px] tracking-tight group-hover:text-foreground transition-colors font-sans">
                  VeeMeet <span className="text-foreground/30 font-normal">Docs</span>
               </span>
            </Link>

            <div className="flex items-center gap-4">
               <ThemeToggle />
               <button
                  onClick={() => setMenuOpen(true)}
                  className="relative w-10 h-10 rounded-xl bg-muted/20 hover:bg-muted/40 border border-border/30 flex items-center justify-center transition-all duration-300 hover:scale-105 cursor-pointer"
                  aria-label="Open menu"
               >
                  <Menu className="w-[18px] h-[18px] text-foreground/70" />
               </button>
            </div>
         </motion.header>

         <HamburgerMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      </>
   );
}
