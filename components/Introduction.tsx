"use client";

import {
  useInView,
  motion,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Bebas_Neue } from "next/font/google";
import { useRef, useState, useEffect } from "react";
import { BsBullseye } from "react-icons/bs";
import { CgPerformance } from "react-icons/cg";
import { FaRegEye } from "react-icons/fa";
import { CircleIconWithProgress } from "./animations/CircleIconWithProgress";
import { CircleIconStatic } from "./animations/CircleIconStatic";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});

// Desktop component with scroll animation
const IntroductionDesktop = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  const isInView = useInView(textRef, {
    once: true, // Only trigger once
    amount: 0.3,
  });

  // Set hasAnimated when first in view
  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 0.85) {
      setIsComplete(true);
    } else {
      setIsComplete(false);
    }
  });

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY < 0) return;

      if (!isComplete && e.deltaY > 0) {
        const container = containerRef.current;
        if (container) {
          const rect = container.getBoundingClientRect();
          if (rect.top <= 0 && rect.bottom > window.innerHeight) {
            return;
          }
          if (rect.bottom <= window.innerHeight + 100) {
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [isComplete]);

  return (
    <div
      ref={containerRef}
      className="relative mx-auto max-w-240"
      style={{ height: "320vh" }}
    >
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center">
        <motion.div
          ref={textRef}
          className="flex w-full flex-col items-center justify-center"
          initial={{ y: 100, opacity: 0 }}
          animate={hasAnimated ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <h2
            className={`${bebasNeue.className} text-6xl font-bold tracking-tighter text-white uppercase md:text-7xl lg:text-8xl`}
          >
            I build websites
          </h2>
          <br />
          <p
            className={`${bebasNeue.className} text-6xl font-bold tracking-tighter text-white uppercase md:text-7xl lg:text-8xl`}
          >
            At the intersection of:
          </p>
        </motion.div>

        <motion.div
          className="mt-20 flex w-full items-center justify-evenly"
          initial={{ y: 100, opacity: 0 }}
          animate={hasAnimated ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
        >
          <div className="flex flex-col items-center">
            <CircleIconWithProgress
              icon={FaRegEye}
              label="Aesthetic"
              index={0}
              scrollYProgress={scrollYProgress}
              font={bebasNeue.className}
            />
          </div>
          <div className="flex flex-col items-center">
            <CircleIconWithProgress
              icon={CgPerformance}
              label="Performance"
              index={1}
              scrollYProgress={scrollYProgress}
              font={bebasNeue.className}
            />
          </div>
          <div className="flex flex-col items-center">
            <CircleIconWithProgress
              icon={BsBullseye}
              label="Strategy"
              index={2}
              scrollYProgress={scrollYProgress}
              font={bebasNeue.className}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Mobile component without scroll animation
const IntroductionMobile = () => {
  return (
    <div className="mx-auto mt-20 flex max-w-240 flex-col items-center justify-center px-4">
      <div className="flex w-full flex-col items-center justify-center">
        <h2
          className={`${bebasNeue.className} text-center text-5xl font-bold tracking-tighter text-white uppercase`}
        >
          I build websites
        </h2>
        <br />
        <p
          className={`${bebasNeue.className} text-center text-5xl font-bold tracking-tighter text-white uppercase`}
        >
          At the intersection of:
        </p>
      </div>

      {/* Venn diagram layout for mobile */}
      <div className="relative mt-20 h-[280px] w-[280px]">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
          <CircleIconStatic
            icon={CgPerformance}
            label="Performance"
            font={bebasNeue.className}
            size={130}
          />
        </div>
        <div className="absolute top-0 left-0">
          <CircleIconStatic
            icon={FaRegEye}
            label="Aesthetic"
            font={bebasNeue.className}
            size={130}
          />
        </div>
        <div className="absolute top-0 right-0">
          <CircleIconStatic
            icon={BsBullseye}
            label="Strategy"
            font={bebasNeue.className}
            size={130}
          />
        </div>
      </div>
    </div>
  );
};

export const Introduction = () => {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [mounted]);

  // Show loading placeholder during SSR/initial mount
  if (!mounted) {
    return (
      <div className="mx-auto mt-20 flex min-h-screen max-w-240 flex-col items-center justify-center">
        <h2
          className={`${bebasNeue.className} text-6xl font-bold tracking-tighter text-white uppercase md:text-7xl lg:text-8xl`}
        >
          I build websites
        </h2>
      </div>
    );
  }

  // Render appropriate version based on screen size
  if (isMobile) {
    return <IntroductionMobile />;
  }

  return <IntroductionDesktop />;
};
