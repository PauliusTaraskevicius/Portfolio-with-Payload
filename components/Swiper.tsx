"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Project } from "@/payload-types";

import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface ProjectsSwiperProps {
  projects: Project[];
}

export const ProjectsSwiper = ({ projects }: ProjectsSwiperProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1600);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ y: 0, opacity: 0 }}
      animate={isLoaded ? { y: -100, opacity: 1 } : { y: 0, opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="relative flex w-full flex-col items-center gap-2 mt-20"
    >
      <h1 className="text-xs leading-4 font-semibold tracking-wider text-white/40 uppercase">
        Featured Projects
      </h1>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{ clickable: true }}
        className="w-full"
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        modules={[Navigation]}
        onSlideChange={handleSlideChange}
      >
        {projects.map((project) => (
          <SwiperSlide key={project.id}>
            {typeof project.image !== "string" && project.image?.url && (
              <div className="relative overflow-hidden rounded p-5">
                <Image
                  src={project.image.url}
                  alt={project.title || ""}
                  priority
                  className="h-full w-full object-contain"
                  height={600}
                  width={600}
                />
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Project Title */}
      <div className="text-center">
        <h3 className="text-sm font-semibold tracking-wider text-white/40 uppercase">
          {projects[activeIndex]?.title}
        </h3>
      </div>

      {/* Navigation Arrows Below */}
      <div className="flex items-center justify-center gap-4">
        <button
          className="swiper-button-prev-custom flex h-12 w-12 cursor-pointer items-center justify-center rounded-md border border-white/20 bg-transparent transition-all hover:bg-white/10"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6 text-white/40" />
        </button>

        <button
          className="swiper-button-next-custom flex h-12 w-12 cursor-pointer items-center justify-center rounded-md border border-white/20 bg-transparent transition-all hover:bg-white/10"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6 text-white/40" />
        </button>
      </div>
    </motion.div>
  );
};
