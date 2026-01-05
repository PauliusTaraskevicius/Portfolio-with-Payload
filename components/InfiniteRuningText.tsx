"use client";

import { Bebas_Neue } from "next/font/google";
import { motion } from "framer-motion";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});

export const InfiniteRuningText = () => {
  const text = [
    "Web Development",
    "UI/UX Design",
    "Coding",
    "Frontend Architecture",
    "Interactive Experiences",
  ];

  // Duplicate the array to ensure seamless loop
  const duplicatedText = [...text, ...text, ...text, ...text];

  return (
    <div className="w-full overflow-hidden">
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: "-50%" }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex shrink-0"
      >
        {duplicatedText.map((item, i) => (
          <span
            key={i}
            className={`${bebasNeue.className} text-6xl whitespace-nowrap text-white/20 md:text-8xl leading-none px-5`}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
};
