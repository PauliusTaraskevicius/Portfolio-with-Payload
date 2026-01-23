"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

import Image from "next/image";
import { ProjectsDialog } from "../../components/ProjectsDialog";

interface ProjectViewViewProps {
  projectSlug: string;
}

export const ProjectView = ({ projectSlug }: ProjectViewViewProps) => {
  const trpc = useTRPC();

  const { data } = useSuspenseQuery(
    trpc.projects.getOne.queryOptions({ slug: projectSlug }),
  );

  const allImages = [];

  if (data?.image) {
    const mainImageUrl =
      typeof data.image === "string" ? data.image : data.image?.url;
    if (mainImageUrl) {
      allImages.push(mainImageUrl);
    }
  }

  if (data?.gallery) {
    data.gallery.forEach((item: any) => {
      const imageUrl =
        typeof item.image === "string" ? item.image : item.image?.url;
      if (imageUrl) {
        allImages.push(imageUrl);
      }
    });
  }

  return (
    <div className="mx-auto mt-20 flex max-w-440 items-center justify-center p-5 text-white">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        className="relative flex flex-col items-center justify-center gap-4"
      >
        <div className="top-0 left-0 flex lg:absolute">
          <h1>
            <ProjectsDialog />
          </h1>
        </div>
        <div className="flex gap-2">
          {data?.tags?.map((tag, index) => (
            <Badge key={index}>
              {typeof tag === "string" ? tag : tag.name}
            </Badge>
          ))}
        </div>
        <h1 className="font-bebas text-center text-6xl font-bold tracking-tighter text-white uppercase md:text-7xl lg:text-8xl">
          {data?.title}
        </h1>
        <div className="max-w-140 text-center">
          <p className="font-bebas text-sm tracking-widest text-white/40">
            {data?.description}
          </p>
        </div>
        <div className="mt-10">
          <a href={data?.url || ""} target="_blank" rel="noopener noreferrer">
            <button className="group relative cursor-pointer overflow-hidden rounded border border-white/20 bg-[#0d0d0d] px-10 py-3 text-white">
              <div className="flex items-center justify-center space-x-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-green-500" />
                <div className="relative z-10 overflow-hidden">
                  <p className="text-[.875em] font-semibold tracking-tight uppercase transition-transform duration-300 ease-out group-hover:-translate-y-full">
                    See live
                  </p>
                  <p className="absolute top-full left-0 text-[.875em] font-semibold tracking-tight uppercase transition-transform duration-300 ease-out group-hover:-translate-y-full">
                    See live
                  </p>
                </div>
              </div>
            </button>
          </a>
        </div>
        <div className="mt-10 flex flex-col gap-4 lg:flex-row">
          {allImages.map((imageUrl, index) => (
            <div key={index} className="transition lg:hover:scale-125">
              <Image
                src={imageUrl}
                alt={imageUrl}
                priority={index === 0} // Only first image gets priority
                className="h-full rounded object-fill"
                height={600}
                width={600}
              />
              <span className="font-bebas text-md rounded py-2 text-white/40 lg:text-left">
                /{index + 1}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
