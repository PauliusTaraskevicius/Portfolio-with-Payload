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

export const Introduction = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Detect mobile
  useEffect(() => {
    if (!mounted) return;
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [mounted]);

  const isInView = useInView(scrollRef, {
    once: false,
    amount: 0.3,
  });

  const iconsIsInView = useInView(iconsRef, {
    once: false,
    amount: 0.3,
  });

  // Track scroll progress - only use target when mounted and desktop
  const { scrollYProgress } = useScroll(
    mounted && !isMobile && containerRef.current
      ? {
          target: containerRef,
          offset: ["start start", "end end"],
        }
      : undefined,
  );

  // Check when all circles are complete
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!mounted || isMobile) return;
    if (latest >= 0.85) {
      setIsComplete(true);
      setHasCompleted(true);
    } else if (latest < 0.1) {
      setIsComplete(false);
    }
  });

  // Block scrolling down only, never block scrolling up
  useEffect(() => {
    if (!mounted || isMobile) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY < 0) return;

      if (!isComplete && !hasCompleted && e.deltaY > 0) {
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
  }, [isComplete, hasCompleted, isMobile, mounted]);

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

  // Mobile version
  if (isMobile) {
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
        <div className="relative mt-40 h-[280px] w-[280px]">
          {/* Top circle - Performance */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
            <CircleIconStatic
              icon={CgPerformance}
              label="Performance"
              font={bebasNeue.className}
              size={130}
            />
          </div>
          {/* Bottom left - Aesthetic */}
          <div className="absolute top-0 left-0">
            <CircleIconStatic
              icon={FaRegEye}
              label="Aesthetic"
              font={bebasNeue.className}
              size={130}
            />
          </div>
          {/* Bottom right - Strategy */}
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
  }

  // Desktop version with scroll animation
  return (
    <div
      ref={containerRef}
      className="relative mx-auto max-w-240"
      style={{ height: "320vh" }}
    >
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center">
        <div className="flex w-full flex-col items-center justify-center">
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
        </div>

        <div className="mt-20 flex w-full items-center justify-evenly">
          <div className="flex flex-col items-center">
            <CircleIconWithProgress
              icon={FaRegEye}
              label="Aesthetic"
              index={0}
              scrollYProgress={scrollYProgress}
              hasCompleted={hasCompleted}
              font={bebasNeue.className}
            />
          </div>
          <div className="flex flex-col items-center">
            <CircleIconWithProgress
              icon={CgPerformance}
              label="Performance"
              index={1}
              scrollYProgress={scrollYProgress}
              hasCompleted={hasCompleted}
              font={bebasNeue.className}
            />
          </div>
          <div className="flex flex-col items-center">
            <CircleIconWithProgress
              icon={BsBullseye}
              label="Strategy"
              index={2}
              scrollYProgress={scrollYProgress}
              hasCompleted={hasCompleted}
              font={bebasNeue.className}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
