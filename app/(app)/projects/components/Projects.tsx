"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const Projects = () => {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.projects.getMany.queryOptions());
  const [activeProject, setActiveProject] = useState<string | null>(null);

  // Mouse position tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation for cursor follower
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const getScale = (projectId: string, index: number, activeIndex: number) => {
    if (activeProject === null) return 1;
    if (activeProject === projectId) return 1.15;

    // Calculate distance from active project
    const distance = Math.abs(index - activeIndex);
    // Higher scale reduction: 0.80, 0.60, 0.40
    return Math.max(0.3, 1 - distance * 0.2);
  };

  const activeIndex = data?.findIndex((p) => p.id === activeProject) ?? -1;

  return (
    <>
      {/* Cursor Follower */}
      <motion.div
        style={{
          left: cursorX,
          top: cursorY,
        }}
        className="pointer-events-none fixed z-50 translate-x-2 translate-y-2"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: activeProject !== null ? 1 : 0,
          scale: activeProject !== null ? 1 : 0.8,
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="text-muted-foreground text-xs leading-4 font-semibold tracking-wider uppercase">
          Open Project
        </span>
      </motion.div>

      <div className="mx-auto mt-20 flex max-w-440 p-5">
        <div className="flex w-full flex-col items-center justify-center gap-4">
          <h1 className="text-xs leading-4 font-semibold tracking-wider text-white/40 uppercase">
            Featured Works
          </h1>

          <div className="flex w-full space-x-2 text-white">
            {data?.map((project, index) => (
              <motion.div
                key={project.id}
                onMouseEnter={() => setActiveProject(project.id)}
                onMouseLeave={() => setActiveProject(null)}
                animate={{
                  scale: getScale(project.id, index, activeIndex),
                  y: activeProject === project.id ? -30 : 0,
                  opacity:
                    activeProject === null || activeProject === project.id
                      ? 1
                      : Math.max(
                          0.15,
                          1 - Math.abs(index - activeIndex) * 0.25,
                        ),
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="cursor-pointer"
              >
                {typeof project.image !== "string" && project.image?.url && (
                  <div className="relative h-full overflow-hidden rounded">
                    <motion.div
                      className="h-full w-full"
                      animate={{
                        scale: activeProject === project.id ? 1.1 : 1,
                      }}
                      transition={{
                        duration: 0.6,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <Image
                        src={project.image.url}
                        alt={project.title || ""}
                        priority
                        className="h-full object-fill"
                        height={600}
                        width={600}
                      />
                    </motion.div>
                  </div>
                )}

                <motion.h2
                  className="mt-2 text-xs leading-4 font-semibold tracking-wider text-white/40 uppercase"
                  animate={{
                    x: activeProject === project.id ? 8 : 0,
                    color:
                      activeProject === project.id
                        ? "#ffffff"
                        : "rgba(255, 255, 255, 0.8)",
                  }}
                  transition={{
                    duration: 0.4,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {project.title}
                </motion.h2>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
