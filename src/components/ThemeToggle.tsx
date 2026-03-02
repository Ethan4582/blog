"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import clsx from "clsx";

export default function ThemeToggle() {
   const [theme, setTheme] = useState<"light" | "dark">("dark");

   useEffect(() => {
      // Check initial preference from localStorage or default to dark
      const stored = localStorage.getItem("theme") as "light" | "dark" | null;
      const initial = stored || "dark";
      setTheme(initial);
      document.documentElement.classList.toggle("dark", initial === "dark");
   }, []);

   const toggleTheme = () => {
      const next = theme === "dark" ? "light" : "dark";
      setTheme(next);
      localStorage.setItem("theme", next);
      document.documentElement.classList.toggle("dark", next === "dark");
   };

   return (
      <button
         onClick={toggleTheme}
         className={clsx(
            "relative w-14 h-7 rounded-full p-1 transition-all duration-300 flex items-center cursor-pointer",
            theme === "dark" ? "bg-primary/20" : "bg-muted"
         )}
         aria-label="Toggle theme"
      >
         <motion.div
            animate={{ x: theme === "dark" ? 28 : 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className={clsx(
               "w-5 h-5 rounded-full flex items-center justify-center transition-colors shadow-sm",
               theme === "dark" ? "bg-primary text-primary-foreground" : "bg-white text-foreground"
            )}
         >
            {theme === "dark" ? (
               <Moon className="w-3 h-3" />
            ) : (
               <Sun className="w-3 h-3" />
            )}
         </motion.div>
         <div className="absolute inset-0 flex items-center justify-between px-2 text-[10px] uppercase font-bold pointer-events-none opacity-40">
            <span className={clsx(theme === "dark" ? "opacity-100" : "opacity-0")}></span>
            <span className={clsx(theme === "light" ? "opacity-100" : "opacity-0")}></span>
         </div>
      </button>
   );
}
