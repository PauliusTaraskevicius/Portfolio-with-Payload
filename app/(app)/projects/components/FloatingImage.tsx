"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export const FloatingImage = ({
  hoveredProject,
  mousePosition,
  data,
}: {
  hoveredProject: string | null;
  mousePosition: { x: number; y: number };
  data: any;
}) => {
  if (!hoveredProject) return null;

  const project = data?.find((item: any) => item.id === hoveredProject);
  const imageUrl =
    typeof project?.image === "string"
      ? project.image
      : project?.image?.url || "";

  if (!imageUrl) return null;

  return (
    <motion.div
      className="pointer-events-none fixed z-50 hidden md:block"
      style={{
        left: mousePosition.x + 20,
        top: mousePosition.y - 240,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative h-[300px] w-[500px] overflow-hidden rounded-lg shadow-2xl">
        <Image
          src={imageUrl}
          alt={project?.title || ""}
          fill
          className="object-cover"
        />
      </div>
    </motion.div>
  );
};