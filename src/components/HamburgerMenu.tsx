"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X } from "lucide-react";

interface HamburgerMenuProps {
   isOpen: boolean;
   onClose: () => void;
}

const menuItems = [
   { label: "Projects", href: "/blog" },
   { label: "Agency", href: "/blog" },
   { label: "Expertise", href: "/blog" },
   { label: "Careers", href: "/blog" },
   { label: "Contact", href: "/blog" },
];

const socialLinks = [
   { label: "Facebook", href: "#" },
   { label: "Instagram", href: "#" },
   { label: "LinkedIn", href: "#" },
   { label: "Twitter", href: "#" },
];

const containerVariants = {
   hidden: { opacity: 0 },
   visible: {
      opacity: 1,
      transition: {
         staggerChildren: 0.06,
         delayChildren: 0.15,
      },
   },
   exit: {
      opacity: 0,
      transition: {
         staggerChildren: 0.03,
         staggerDirection: -1,
      },
   },
};

const itemVariants = {
   hidden: { y: 40, opacity: 0 },
   visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
   },
   exit: {
      y: -20,
      opacity: 0,
      transition: { duration: 0.3, ease: "easeIn" },
   },
};

export default function HamburgerMenu({ isOpen, onClose }: HamburgerMenuProps) {
   return (
      <AnimatePresence>
         {isOpen && (
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
               className="fixed inset-0 z-[999] flex flex-col"
               style={{ backgroundColor: "#c8ff00" }}
            >
               {/* Close Button */}
               <div className="flex justify-end p-6">
                  <motion.button
                     initial={{ scale: 0, rotate: -180 }}
                     animate={{ scale: 1, rotate: 0 }}
                     exit={{ scale: 0, rotate: 180 }}
                     transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                     onClick={onClose}
                     className="w-auto px-6 py-3 rounded-full bg-[#0a0a0a] text-[#c8ff00] font-semibold text-sm tracking-wider flex items-center gap-2 hover:bg-[#1a1a1a] transition-colors cursor-pointer"
                     aria-label="Close menu"
                  >
                     CLOSE
                     <X className="w-4 h-4" />
                  </motion.button>
               </div>

               {/* Menu Items */}
               <motion.nav
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex-1 flex flex-col justify-center px-10 md:px-20"
               >
                  {menuItems.map((item) => (
                     <motion.div key={item.label} variants={itemVariants}>
                        <Link
                           href={item.href}
                           onClick={onClose}
                           className="block text-[#0a0a0a] text-5xl md:text-7xl font-semibold py-2 md:py-3 hover:translate-x-4 transition-transform duration-300 tracking-tight"
                        >
                           {item.label}
                        </Link>
                     </motion.div>
                  ))}
               </motion.nav>

               {/* Social Links */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  className="px-10 md:px-20 pb-10 flex flex-wrap gap-x-16 gap-y-2"
               >
                  {socialLinks.map((link) => (
                     <a
                        key={link.label}
                        href={link.href}
                        className="text-[#0a0a0a]/70 hover:text-[#0a0a0a] text-base font-medium transition-colors"
                     >
                        {link.label}
                     </a>
                  ))}
               </motion.div>
            </motion.div>
         )}
      </AnimatePresence>
   );
}
