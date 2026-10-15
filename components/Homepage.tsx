"use client";

import { motion, useAnimation, Variants } from "framer-motion";

import { useEffect, useState, useLayoutEffect } from "react";

import { useImagePreload } from "./ImagePreloadProvider";

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

const LINE1 = ["Turning", "Ideas", "Into"] as const;
const LINE2 = ["Production-Ready", "Software"] as const;

const HEADING_SIZE = "text-[9.5vw] md:text-7xl lg:text-8xl";

export const Homepage = () => {
  const [shrink, setShrink] = useState(false);
  const [hideLoader, setHideLoader] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [textAnimationComplete, setTextAnimationComplete] = useState(false);

  const controls = useAnimation();
  const { areImagesReady } = useImagePreload();

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


  useEffect(() => {
    setIsMounted(true);

    const runTextAnimation = async () => {
      await new Promise<void>((resolve) => {
        setTimeout(resolve, 100);
      });

      await controls.start("visible");
      setTextAnimationComplete(true);
    };

    runTextAnimation();
  }, [controls]);


  useEffect(() => {
    if (!textAnimationComplete || !areImagesReady) return;

    let timeoutIds: NodeJS.Timeout[] = [];

    const completeSequence = async () => {
      // Small delay after images ready
      await new Promise<void>((resolve) => {
        const id = setTimeout(resolve, 100);
        timeoutIds.push(id);
      });

      setShrink(true);

      // Wait for shrink animation
      await new Promise<void>((resolve) => {
        const id = setTimeout(resolve, 1600);
        timeoutIds.push(id);
      });

      setHideLoader(true);
      document.body.style.overflow = "";
    };

    completeSequence();

    return () => {
      timeoutIds.forEach(clearTimeout);
    };
  }, [textAnimationComplete, areImagesReady]);

  return (
    <>
      {/* Loading background */}
      {!hideLoader && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[60] bg-[#0d0d0d]"
          initial={{ opacity: 1 }}
          animate={shrink ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        />
      )}

      {/* Animated large text during loading (decorative: the real h1 is below) */}
      {!hideLoader && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[61] mt-44 flex items-start justify-center"
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
              className={`font-bebas flex flex-col items-center gap-0 leading-[0.95] tracking-tight text-white uppercase ${HEADING_SIZE}`}
            >
              {/* Line 1 */}
              <div className="flex items-center justify-center gap-[0.25em] whitespace-nowrap">
                {LINE1.map((word, index) => (
                  <motion.div
                    key={index}
                    className="shrink-0 overflow-hidden"
                  >
                    <motion.div variants={childVariants}>{word}</motion.div>
                  </motion.div>
                ))}
              </div>

              {/* Line 2 */}
              <div className="flex items-center justify-center gap-[0.25em] whitespace-nowrap">
                {LINE2.map((word, index) => (
                  <motion.div
                    key={index}
                    className="shrink-0 overflow-hidden"
                  >
                    <motion.div variants={childVariants}>{word}</motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}

      <div className="mt-20 flex items-center justify-center px-4 md:px-8">
        <div className="flex max-w-4xl flex-col items-center justify-center text-center">
          <h1
            className={`font-bebas leading-[1.05] tracking-tight text-white uppercase ${HEADING_SIZE}`}
          >
            <span className="block whitespace-nowrap">Turning Ideas Into</span>
            <span className="block whitespace-nowrap">
              Production-Ready Software
            </span>
          </h1>

          <motion.p
            className="font-bebas mt-2 text-sm leading-4 tracking-widest text-white/70 uppercase"
            initial={{ opacity: 0 }}
            animate={hideLoader ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            I&apos;m Paulius, a Full-Stack Developer focused on building modern,
            production-ready web applications.
            <br />
            Based in Kaunas, Lithuania
          </motion.p>
        </div>
      </div>
    </>
  );
};
