"use client";

import { Bebas_Neue } from "next/font/google";
import { motion, useAnimation, Variants } from "framer-motion";
import { useEffect, useState } from "react";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});

export const Homepage = () => {
  const [shrink, setShrink] = useState(false);
  const [hideLoader, setHideLoader] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
      await controls.start("visible");
      await new Promise((resolve) => setTimeout(resolve, 100));
      setShrink(true);
      await new Promise((resolve) => setTimeout(resolve, 1600));
      setHideLoader(true);
    };

    sequence();
  }, [controls]);

  const line1 = ["Crafting", "Bold", "&"];
  const line2 = ["Memorable", "Websites"];

  const container: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const child: Variants = {
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

      {/* Animated large text during loading */}
      {!hideLoader && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[61] mt-44 flex items-start justify-center"
          initial={{ opacity: 1 }}
          animate={shrink ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.div
            className="flex flex-col gap-0 overflow-hidden"
            variants={container}
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
                {line1.map((word, index) => (
                  <motion.div key={index} className="overflow-hidden">
                    <motion.h1
                      variants={child}
                      className={`${bebasNeue.className} overflow-hidden text-6xl font-bold tracking-tighter text-white uppercase md:text-7xl lg:text-8xl`}
                    >
                      {word}
                    </motion.h1>
                  </motion.div>
                ))}
              </div>
              <div className="flex items-center justify-center gap-1">
                {line2.map((word, index) => (
                  <motion.div key={index} className="overflow-hidden">
                    <motion.h1
                      variants={child}
                      className={`${bebasNeue.className} text-6xl font-bold tracking-tighter text-white uppercase md:text-7xl lg:text-8xl`}
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

      {/* Final homepage content */}
      <div className="mt-20 flex items-center justify-center px-8">
        <div className="flex max-w-4xl flex-col items-center justify-center text-center">
          <h1
            className={`${bebasNeue.className} text-6xl leading-12 font-bold tracking-tighter text-white uppercase md:text-7xl md:leading-14 lg:text-8xl lg:leading-20`}
          >
            Crafting Bold &<br />
            Memorable Websites
          </h1>

          <motion.p
            className="text-xs leading-4 tracking-wider text-white/40 uppercase"
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
