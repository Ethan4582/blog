"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import HamburgerMenu from "./HamburgerMenu";
import { motion } from "framer-motion";

export default function Navbar() {
   const [menuOpen, setMenuOpen] = useState(false);

   return (
      <>
         <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-xl bg-[#0a0a0a]/80 border-b border-white/[0.06]"
         >
            <Link href="/blog" className="flex items-center gap-3 group">
               <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#c8ff00] to-[#a0d900] flex items-center justify-center text-black font-bold text-sm tracking-tight">
                  T7
               </div>
               <span className="text-white/90 font-semibold text-[15px] tracking-tight group-hover:text-white transition-colors">
                  tae7labs
               </span>
            </Link>

            <button
               onClick={() => setMenuOpen(true)}
               className="relative w-10 h-10 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] flex items-center justify-center transition-all duration-300 hover:scale-105 cursor-pointer"
               aria-label="Open menu"
            >
               <Menu className="w-[18px] h-[18px] text-white/70" />
            </button>
         </motion.header>

         <HamburgerMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      </>
   );
}
