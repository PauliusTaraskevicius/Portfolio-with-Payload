"use client";

import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import Link from "next/link";
import { Bebas_Neue } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import dynamic from "next/dynamic";

const FloatingImage = dynamic(
  () => import("./FloatingImage").then((mod) => mod.FloatingImage),
  { ssr: false },
);

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});

export const ListProjectsView = () => {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.projects.getMany.queryOptions());
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hasAnimated, setHasAnimated] = useState(false);

  const textRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(textRef, {
    once: true,
    amount: 0.3,
  });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseEnter = (id: string) => {
    setHoveredProject(id);
  };

  const handleMouseLeave = () => {
    setHoveredProject(null);
  };

  return (
    <>
      <motion.div
        ref={textRef}
        initial={{ y: 100, opacity: 0 }}
        animate={hasAnimated ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        className="mx-auto mt-20 flex max-w-440 items-center justify-center text-center md:mt-40"
        onMouseMove={handleMouseMove}
      >
        <div className="relative mt-1 -mb-4 w-full gap-4 p-2 md:-mb-28 lg:col-span-12">
          <div className="relative flex w-full flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div className="flex max-w-2xl justify-start overflow-hidden text-center lg:text-start">
              <h2
                className={`${bebasNeue.className} text-3xl text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl`}
              >
                Here is a selection of my most recent works
              </h2>
            </div>

            <span
              className={`${bebasNeue.className} hidden text-start text-xl text-white/20 uppercase md:text-end md:text-2xl lg:flex`}
            >
              Hover on names for a closer look
            </span>
          </div>

          <div className="is-active top-0 left-0 mx-auto mt-20 flex flex-col md:mt-40 lg:w-1/2 [&.is-changing]:absolute">
            {data?.map((item) => {
              return (
                <Link
                  href={`/projects/${item.slug}`}
                  key={item.id}
                  className="relative mb-4"
                  onMouseEnter={() => handleMouseEnter(item.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="group relative block cursor-pointer pb-4">
                    <span
                      className={`${bebasNeue.className} text-[34px] font-semibold leading-[0.9] text-white uppercase transition hover:text-white/20 md:text-[78px]`}
                    >
                      {item.title}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Floating image - rendered outside to avoid hydration issues */}
      <FloatingImage
        hoveredProject={hoveredProject}
        mousePosition={mousePosition}
        data={data}
      />
    </>
  );
};