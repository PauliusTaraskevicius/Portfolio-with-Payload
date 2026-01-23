"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export const About = () => {
  const aboutMeRef = useRef<HTMLDivElement>(null);
  const [buttonHovered, setButtonHovered] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  const isInView = useInView(aboutMeRef, {
    once: false,
    amount: 0.3,
  });

  // Set hasAnimated when first in view
  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  return (
    <motion.div
      ref={aboutMeRef}
      initial={{ y: 100, opacity: 0 }}
      animate={hasAnimated ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="mx-auto mt-20 flex max-w-240 flex-col items-center justify-center gap-4 px-4"
    >
      <motion.span className="font-bebas text-center text-3xl text-white md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl">
        I work with individuals studios and companies to turn their vision into
        powerful websites
      </motion.span>
      <motion.button
        className="group relative cursor-pointer overflow-hidden rounded border border-white/20 bg-[#0d0d0d] px-6 py-3 text-white"
        onMouseEnter={() => setButtonHovered(true)}
        onMouseLeave={() => setButtonHovered(false)}
      >
        <div className="flex items-center justify-center space-x-3">
          <div className="relative z-10 overflow-hidden">
            <Link href="/about">
              <p className="text-[.875em] font-semibold tracking-tight uppercase transition-transform duration-300 ease-out group-hover:-translate-y-full">
                About Me
              </p>
              <p className="absolute top-full left-0 text-[.875em] font-semibold tracking-tight uppercase transition-transform duration-300 ease-out group-hover:-translate-y-full">
                About Me
              </p>
            </Link>
          </div>
        </div>
      </motion.button>
    </motion.div>
  );
};
