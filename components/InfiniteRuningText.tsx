"use client";

import { motion } from "framer-motion";

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
            className="font-bebas px-5 text-6xl leading-none whitespace-nowrap text-white/20 md:text-8xl"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
};
