"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { MobileHeader } from "./MobileHeader";
import { motion } from "framer-motion";

const links = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/projects",
    label: "Projects",
  },
  {
    href: "/about",
    label: "About",
  },
];

export const Header = () => {
  const path = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [buttonHovered, setButtonHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1600);

    return () => clearTimeout(timer);
  }, []);

  return (
    <header>
      <div className="mx-auto flex max-w-440 items-center justify-between gap-5 p-5 overflow-hidden">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={isLoaded ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <Image src="/logo.png" alt="Logo" width={60} height={60} />
        </motion.div>

        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={isLoaded ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="hidden gap-6 md:flex"
        >
          {links.map((link, index) => {
            const isActive = path === link.href;
            const isHovered = hoveredIndex === index;
            const isAnyHovered = hoveredIndex !== null;

            return (
              <Link
                key={link.href}
                href={link.href}
                className="group relative"
                onMouseEnter={() => !isActive && setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <p
                  className={cn(
                    "text-[.875em] font-semibold tracking-widest text-white uppercase transition-colors duration-300",
                    isActive
                      ? "cursor-default text-white/20"
                      : isAnyHovered && !isHovered
                        ? "text-white/20"
                        : "text-white hover:text-white",
                  )}
                >
                  {link.label}
                </p>
              </Link>
            );
          })}
        </motion.div>

        <div className="flex items-center justify-center gap-4">
          <motion.button
            className="group relative hidden cursor-pointer overflow-hidden rounded border border-white/20 bg-[#0d0d0d] px-6 py-3 text-white md:block"
            onMouseEnter={() => setButtonHovered(true)}
            onMouseLeave={() => setButtonHovered(false)}
            initial={{ x: 100, opacity: 0 }}
            animate={isLoaded ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex items-center justify-center space-x-3">
              <div className="mt-1 h-2 w-2 rounded-full bg-green-500" />
              <div className="relative z-10 overflow-hidden">
                <p className="text-[.875em] font-semibold tracking-tight uppercase transition-transform duration-300 ease-out group-hover:-translate-y-full">
                  Contact
                </p>
                <p className="absolute top-full left-0 text-[.875em] font-semibold tracking-tight uppercase transition-transform duration-300 ease-out group-hover:-translate-y-full">
                  Contact
                </p>
              </div>
            </div>
          </motion.button>
          <motion.div
            className=" md:hidden"
            initial={{ x: 100, opacity: 0 }}
            animate={isLoaded ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <MobileHeader />
          </motion.div>
        </div>
      </div>
    </header>
  );
};
