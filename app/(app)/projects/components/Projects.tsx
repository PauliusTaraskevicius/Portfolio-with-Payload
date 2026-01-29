"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import {
  useEffect,
  useState,
  useCallback,
  useMemo,
  lazy,
  Suspense,
} from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useImagePreload } from "@/components/ImagePreloadProvider";

// Lazy load Swiper - only needed on mobile
const ProjectsSwiper = lazy(() =>
  import("@/components/Swiper").then((mod) => ({
    default: mod.ProjectsSwiper,
  })),
);

// Spring config defined outside to prevent recreation
const SPRING_CONFIG = { damping: 25, stiffness: 200, mass: 0.5 } as const;

export const Projects = () => {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.projects.getMany.queryOptions());
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { areImagesReady, registerImages } = useImagePreload();

  // Mouse position tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation for cursor follower
  const cursorX = useSpring(mouseX, SPRING_CONFIG);
  const cursorY = useSpring(mouseY, SPRING_CONFIG);

  // Register all project images for preloading when data is available
  useEffect(() => {
    if (data && data.length > 0) {
      const imageUrls = data
        .map((project) =>
          typeof project.image !== "string" ? project.image?.url : null,
        )
        .filter((url): url is string => !!url);

      if (imageUrls.length > 0) {
        registerImages(imageUrls);
      }
    }
  }, [data, registerImages]);

  // Check if mobile on mount
  useEffect(() => {
    setMounted(true);
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Optimized mouse move handler - only attach on desktop
  useEffect(() => {
    if (!mounted || isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, mounted, isMobile]);

  // Memoized scale calculator
  const getScale = useCallback(
    (projectId: string, index: number, activeIdx: number) => {
      if (activeProject === null) return 1;
      if (activeProject === projectId) return 1.08;
      const distance = Math.abs(index - activeIdx);
      return Math.max(0.6, 1 - distance * 0.08);
    },
    [activeProject],
  );

  // Memoized margin calculator
  const getMargin = useCallback(
    (projectId: string, index: number, activeIdx: number) => {
      if (activeProject === null) return 0;
      if (activeProject === projectId) return 0;
      const distance = Math.abs(index - activeIdx);
      return -distance * 10;
    },
    [activeProject],
  );

  const activeIndex = useMemo(
    () => data?.findIndex((p) => p.id === activeProject) ?? -1,
    [data, activeProject],
  );

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  if (!data) {
    return notFound();
  }

  return (
    <>
      {/* Mobile swiper*/}
      <div className="mt-20 flex cursor-pointer items-center justify-center md:hidden">
        <Suspense
          fallback={
            <div className="h-[250px] w-full animate-pulse rounded bg-white/10" />
          }
        >
          <ProjectsSwiper projects={data || []} />
        </Suspense>
      </div>

      <div className="mt-40 hidden md:flex">
        {/* Cursor follower */}
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

        <motion.div
          initial={{ y: 0, opacity: 0 }}
          animate={
            areImagesReady ? { y: -100, opacity: 1 } : { y: 0, opacity: 0 }
          }
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="mx-auto mt-20 flex max-w-440 p-5"
        >
          <div className="flex w-full flex-col items-center justify-center gap-4">
            <h1 className="text-xs leading-4 font-semibold tracking-wider text-white/70 uppercase">
              Featured Projects
            </h1>

            <div className="flex w-full gap-4 text-white">
              {data?.map((project, index) => (
                <motion.div
                  key={project.id}
                  onMouseEnter={() => setActiveProject(project.id)}
                  onMouseLeave={() => setActiveProject(null)}
                  animate={{
                    scale: getScale(project.id, index, activeIndex),
                    y: activeProject === project.id ? -20 : 0,
                    marginLeft: getMargin(project.id, index, activeIndex),
                    marginRight: getMargin(project.id, index, activeIndex),
                    opacity:
                      activeProject === null || activeProject === project.id
                        ? 1
                        : Math.max(
                            0.3,
                            1 - Math.abs(index - activeIndex) * 0.15,
                          ),
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="cursor-pointer"
                >
                  <Link href={`/projects/${project.slug}`}>
                    {typeof project.image !== "string" &&
                      project.image?.url && (
                        <div className="relative h-full overflow-hidden rounded">
                          <motion.div
                            className="h-full w-full"
                            animate={{
                              scale: activeProject === project.id ? 1.05 : 1,
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
                              className="h-full w-full object-cover"
                              height={600}
                              width={1200}
                            />
                          </motion.div>
                        </div>
                      )}
                  </Link>

                  <Link href={`/projects/${project.slug}`}>
                    <motion.h2
                      className="mt-2 text-xs leading-4 font-semibold tracking-wider text-white/70 uppercase"
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
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};
