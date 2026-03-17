"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import HamburgerMenu from "./HamburgerMenu";
import ThemeToggle from "../ThemeToggle";
import { motion } from "framer-motion";

export default function Navbar() {
   const [menuOpen, setMenuOpen] = useState(false);
   const [isDark, setIsDark] = useState(false);

   useEffect(() => {
      // Check for theme in localstorage or class on html
      const checkTheme = () => {
         setIsDark(document.documentElement.classList.contains("dark"));
      };

      checkTheme();
      const observer = new MutationObserver(checkTheme);
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
      return () => observer.disconnect();
   }, []);

   return (
      <>
         <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-xl bg-background/80 border-b border-border/40"
         >
            <Link href="/blog" className="flex items-center gap-3 group">
               <div className="relative w-10 h-10 rounded-[4px] overflow-hidden shadow-lg group-hover:scale-105 transition-transform duration-300">
                  <Image
                     src={isDark ? "/assets/bluelogo.png" : "/assets/logo.png"}
                     alt="T7labs Logo"
                     fill
                     className="object-cover"
                  />
               </div>
               
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
