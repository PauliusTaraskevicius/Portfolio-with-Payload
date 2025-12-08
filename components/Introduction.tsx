"use client";

import { useInView, motion, useScroll, useTransform } from "framer-motion";
import { Bebas_Neue } from "next/font/google";
import { useRef } from "react";
import { BsBullseye } from "react-icons/bs";
import { CgPerformance } from "react-icons/cg";
import { FaRegEye } from "react-icons/fa";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});

export const Introduction = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(scrollRef, {
    once: false,
    amount: 0.3,
  });

  const iconsIsInView = useInView(iconsRef, {
    once: false,
    amount: 0.3,
  });

  return (
    <div className="mx-auto mt-40 flex max-w-240 flex-col items-center justify-center">
      <motion.div
        ref={scrollRef}
        className="flex w-full flex-col items-center justify-center"
        initial={{ opacity: 0, y: 100 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
        transition={{
          duration: 0.8,
          ease: [0.76, 0, 0.24, 1],
        }}
      >
        <h2
          className={` ${bebasNeue.className} text-6xl font-bold tracking-tighter text-white uppercase md:text-7xl lg:text-8xl`}
        >
          I build websites
        </h2>
        <br />
        <p
          className={` ${bebasNeue.className} text-6xl font-bold tracking-tighter text-white uppercase md:text-7xl lg:text-8xl`}
        >
          At the intersection of:
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={iconsIsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
        transition={{
          duration: 0.8,
          ease: [0.76, 0, 0.24, 1],
        }}
        className="mt-40 flex w-full items-center justify-evenly"
        ref={iconsRef}
      >
        <div>
          <button className="items-center rounded-full border-2 border-white/20 p-2">
            <FaRegEye className="size-10 text-white" />
          </button>
        </div>
        <div>
          <button className="items-center rounded-full border-2 border-white/20 p-2">
            <CgPerformance className="size-10 text-white" />
          </button>
        </div>
        <div>
          <button className="items-center rounded-full border-2 border-white/20 p-2">
            <BsBullseye className="size-10 text-white" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};


const CircleIcon = ({
  icon: Icon,
  progress,
  index,
}: {
  icon: React.ComponentType<{ className?: string }>;
  progress: number;
  index: number;
}) => {
  // Each icon starts drawing at different scroll positions
  // Icon 0: 0-33%, Icon 1: 33-66%, Icon 2: 66-100%
  const startProgress = index * 0.33;
  const endProgress = startProgress + 0.33;

  // Calculate stroke progress for this specific icon
  const strokeProgress = Math.min(
    1,
    Math.max(0, (progress - startProgress) / (endProgress - startProgress))
  );

  const circumference = 2 * Math.PI * 36; // radius = 36

  return (
    <div className="relative flex items-center justify-center">
      {/* SVG Circle Border */}
      <svg
        className="absolute -rotate-90"
        width="80"
        height="80"
        viewBox="0 0 80 80"
      >
        {/* Background circle */}
        <circle
          cx="40"
          cy="40"
          r="36"
          fill="none"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="2"
        />
        {/* Animated circle */}
        <circle
          cx="40"
          cy="40"
          r="36"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - strokeProgress)}
          style={{
            transition: "stroke-dashoffset 0.1s ease-out",
          }}
        />
      </svg>
      {/* Icon */}
      <button className="relative z-10 flex items-center justify-center rounded-full p-2">
        <Icon className="size-10 text-white" />
      </button>
    </div>
  );
};