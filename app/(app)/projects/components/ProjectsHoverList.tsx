"use client";

import { Badge } from "@/components/ui/badge";
import { Media } from "@/payload-types";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { Bebas_Neue } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});

const getImageUrl = (
  image: string | Media | null | undefined,
): string | null => {
  if (!image) return null;
  if (typeof image === "string") return image;
  return image.url || null;
};

export const ProjectsHoverList = () => {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.projects.getMany.queryOptions());

  return (
    <div>
      {/* Mobile View */}
      <div className="mx-auto mt-20 flex max-w-440 flex-col items-center justify-between gap-5 space-y-20 overflow-hidden p-5 md:hidden">
        {data?.map((project) => (
          <div
            key={project.id}
            className="flex flex-col items-center justify-center gap-3"
          >
            <div className="flex items-center justify-center gap-2">
              {project?.tags?.map((tag, index) => (
                <Badge key={index}>
                  {typeof tag === "string" ? tag : tag.name}
                </Badge>
              ))}
            </div>
            <Link href={`/projects/${project.slug}`}>
              <span
                className={`${bebasNeue.className} text-[24px] leading-[0.9] font-semibold text-white uppercase transition hover:text-white/20`}
              >
                {project.title}
              </span>
            </Link>
          </div>
        ))}
      </div>

      {/* Desktop View - snap scrolling with images side by side */}
      <div className="mx-auto hidden h-screen max-w-440 snap-y snap-mandatory overflow-y-scroll [scrollbar-width:none] md:block [&::-webkit-scrollbar]:hidden">
        {data?.map((project) => {
          const galleryImages =
            project.gallery
              ?.map((item) => getImageUrl(item.image))
              .filter(Boolean) || [];
          const mainImage = getImageUrl(project.image);
          const allImages = mainImage
            ? [mainImage, ...galleryImages]
            : galleryImages;
          const leftImages = allImages.slice(0, 2);
          const rightImages = allImages.slice(2, 4);

          return (
            <div
              key={project.id}
              className="flex h-screen snap-start items-center justify-center px-4"
            >
              <div className="flex w-full items-center justify-center gap-6 lg:gap-10">
                {/* Left Images */}
                <div className="flex items-center gap-4">
                  {leftImages[0] && (
                    <div className="relative h-[180px] w-40 overflow-hidden rounded-lg shadow-2xl lg:h-[220px] lg:w-[200px] xl:h-[260px] xl:w-60">
                      <Image
                        src={leftImages[0] as string}
                        alt={`${project.title} image 1`}
                        fill
                        sizes="(max-width: 1024px) 160px, (max-width: 1280px) 200px, 240px"
                        className="object-cover"
                      />
                    </div>
                  )}
                  {leftImages[1] && (
                    <div className="relative h-[180px] w-40 overflow-hidden rounded-lg shadow-2xl lg:h-[220px] lg:w-[200px] xl:h-[260px] xl:w-60">
                      <Image
                        src={leftImages[1] as string}
                        alt={`${project.title} image 2`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* Center - Tags, Title, and Description */}
                <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4 text-center">
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {project?.tags?.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="border-white/30 bg-transparent text-xs tracking-widest text-white uppercase"
                      >
                        {typeof tag === "string" ? tag : tag.name}
                      </Badge>
                    ))}
                  </div>
                  <Link href={`/projects/${project.slug}`}>
                    <span
                      className={`${bebasNeue.className} text-center text-[60px] leading-[0.9] font-semibold text-white uppercase transition hover:text-white/70 lg:text-[90px] xl:text-[120px]`}
                    >
                      {project.title}
                    </span>
                  </Link>
                  {project.description && (
                    <p className="max-w-md text-center text-sm tracking-wider text-white/70 uppercase lg:text-base">
                      {project.description}
                    </p>
                  )}
                </div>

                {/* Right Images */}
                <div className="flex items-center gap-4">
                  {rightImages[0] && (
                    <div className="relative h-[180px] w-40 overflow-hidden rounded-lg shadow-2xl lg:h-[220px] lg:w-[200px] xl:h-[260px] xl:w-60">
                      <Image
                        src={rightImages[0] as string}
                        alt={`${project.title} image 3`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  {rightImages[1] && (
                    <div className="relative h-[180px] w-40 overflow-hidden rounded-lg shadow-2xl lg:h-[220px] lg:w-[200px] xl:h-[260px] xl:w-60">
                      <Image
                        src={rightImages[1] as string}
                        alt={`${project.title} image 4`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
