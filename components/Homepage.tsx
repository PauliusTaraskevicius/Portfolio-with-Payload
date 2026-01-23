"use client";

import { motion, useAnimation, Variants } from "framer-motion";
import { useEffect, useState, useLayoutEffect, useMemo } from "react";

// Static animation variants - defined outside component to avoid recreation
const containerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const childVariants: Variants = {
  hidden: { y: 100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.33, 1, 0.68, 1],
    },
  },
};

const LINE1 = ["Crafting", "Bold", "&"] as const;
const LINE2 = ["Memorable", "Websites"] as const;

export const Homepage = () => {
  const [shrink, setShrink] = useState(false);
  const [hideLoader, setHideLoader] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const controls = useAnimation();

  // Scroll to top and prevent scrolling on mount (before paint)
  useLayoutEffect(() => {
    // Force scroll to top immediately
    window.scrollTo(0, 0);

    // Prevent scrolling during animation
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Combined mount and animation effect
  useEffect(() => {
    setIsMounted(true);

    let timeoutIds: NodeJS.Timeout[] = [];

    const sequence = async () => {
      await new Promise<void>((resolve) => {
        const id = setTimeout(resolve, 100);
        timeoutIds.push(id);
      });
      await controls.start("visible");
      await new Promise<void>((resolve) => {
        const id = setTimeout(resolve, 100);
        timeoutIds.push(id);
      });
      setShrink(true);
      await new Promise<void>((resolve) => {
        const id = setTimeout(resolve, 1600);
        timeoutIds.push(id);
      });
      setHideLoader(true);
      document.body.style.overflow = "";
    };

    sequence();

    return () => {
      timeoutIds.forEach(clearTimeout);
    };
  }, [controls]);

  return (
    <>
      {/* Loading background */}
      {!hideLoader && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-60 bg-[#0d0d0d]"
          initial={{ opacity: 1 }}
          animate={shrink ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        />
      )}

      {/* Animated large text during loading */}
      {!hideLoader && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-61 mt-44 flex items-start justify-center"
          initial={{ opacity: 1 }}
          animate={shrink ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.div
            className="flex flex-col gap-0"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            <motion.div
              initial={{ scale: 1 }}
              animate={shrink ? { scale: 0.15 } : { scale: 1 }}
              transition={{
                duration: 1.5,
                ease: [0.76, 0, 0.24, 1],
                delay: 0.2,
              }}
              className="flex flex-col items-center gap-0 -space-y-3 lg:-space-y-4"
            >
              <div className="flex items-center justify-center gap-1">
                {LINE1.map((word, index) => (
                  <motion.div key={index} className="overflow-hidden">
                    <motion.h1
                      variants={childVariants}
                      className="font-bebas overflow-hidden text-6xl font-bold tracking-tighter text-white uppercase md:text-7xl lg:text-8xl"
                    >
                      {word}
                    </motion.h1>
                  </motion.div>
                ))}
              </div>
              <div className="flex items-center justify-center gap-1">
                {LINE2.map((word, index) => (
                  <motion.div key={index} className="overflow-hidden">
                    <motion.h1
                      variants={childVariants}
                      className="font-bebas text-6xl font-bold tracking-tighter text-white uppercase md:text-7xl lg:text-8xl"
                    >
                      {word}
                    </motion.h1>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}

      <div className="mt-20 flex items-center justify-center px-8">
        <div className="flex max-w-4xl flex-col items-center justify-center text-center">
          <h1 className="font-bebas text-6xl leading-12 font-bold tracking-tighter text-white uppercase md:text-7xl md:leading-14 lg:text-8xl lg:leading-20">
            Crafting Bold &<br />
            Memorable Websites
          </h1>

          <motion.p
            className="font-bebas text-sm leading-4 tracking-widest text-white/70 uppercase"
            initial={{ opacity: 0 }}
            animate={hideLoader ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            I'm Paulius, Freelance Fullstack Developer since 2022.
            <br />
            Based in Kaunas, Lithuania
          </motion.p>
        </div>
      </div>
    </>
  );
};
