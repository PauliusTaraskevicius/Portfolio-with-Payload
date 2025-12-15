"use client";

import { useTRPC } from "@/trpc/client";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Bebas_Neue } from "next/font/google";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});

interface ProjectViewViewProps {
  projectSlug: string;
}

export const ProjectView = ({ projectSlug }: ProjectViewViewProps) => {
  const queryClient = useQueryClient();
  const trpc = useTRPC();

  const [buttonHovered, setButtonHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [pictureCount, setPictureCount] = useState(1);

  const { data } = useSuspenseQuery(
    trpc.projects.getOne.queryOptions({ slug: projectSlug }),
  );

  return (
    <div className="mx-auto mt-20 flex max-w-440 items-center justify-center p-5 text-white">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex gap-2">
          {data?.tags?.map((tag, index) => (
            <Badge key={index}>
              {typeof tag === "string" ? tag : tag.name}
            </Badge>
          ))}
        </div>
        <h1
          className={`${bebasNeue.className} text-center text-6xl font-bold tracking-tighter text-white uppercase md:text-7xl lg:text-8xl`}
        >
          {data?.title}
        </h1>
        <div className="max-w-140 text-center">
          <p
            className={`${bebasNeue.className} text-sm tracking-widest text-white/40`}
          >
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
        <div>
          {typeof data.image !== "string" && data.image?.url && (
            <div className="relative mt-20 h-full overflow-hidden rounded">
              <Image
                src={data.image.url}
                alt={data.title || ""}
                priority
                className="h-full object-fill"
                height={400}
                width={400}
              />
              <span className="mt-6 text-white/40">/{pictureCount}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
