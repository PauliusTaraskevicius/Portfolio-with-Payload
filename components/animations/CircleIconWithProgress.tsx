"use client";

import { motion, useScroll, useTransform } from "framer-motion";

// Component that uses the progress value
export const CircleIconWithProgress = ({
  icon: Icon,
  label,
  index,
  scrollYProgress,
  hasCompleted,
  size = 200,
  font,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  hasCompleted: boolean;
  size?: number;
  font?: string;
}) => {
  const radius = size / 2 - 4;
  const circumference = 2 * Math.PI * radius;

  const ranges = [
    [0.1, 0.35],
    [0.35, 0.6],
    [0.6, 0.85],
  ];

  const [start, end] = ranges[index];

  const strokeDashoffset = useTransform(scrollYProgress, (p) => {
    if (hasCompleted) {
      return 0;
    }
    const strokeProgress = Math.min(
      1,
      Math.max(0, (p - start) / (end - start)),
    );
    return circumference * (1 - strokeProgress);
  });

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className="relative flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <svg
          className="absolute -rotate-90"
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="1"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.3)"
            strokeWidth="1"
            strokeLinecap="round"
            strokeDasharray={circumference}
            style={{ strokeDashoffset }}
          />
        </svg>
        <div className="relative z-10 flex flex-col items-center justify-center">
          <Icon className="size-8 text-white" />
          <span
            className={`${font} mt-2 text-lg tracking-widest text-white uppercase`}
          >
            {label}
          </span>
        </div>
      </div>
    </div>
  );
};
