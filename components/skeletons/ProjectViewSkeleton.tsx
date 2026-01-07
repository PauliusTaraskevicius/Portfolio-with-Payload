import { Skeleton } from "@/components/ui/skeleton";
import { DEFAULT_LIMIT } from "@/lib/constants";

export const ProjectViewSkeleton = () => {
  return (
    <div className="mx-auto mt-20 flex max-w-440 items-center justify-center p-5 text-white">
      <div className="relative flex w-full flex-col items-center justify-center gap-4">
        {/* Back Button Skeleton - Absolute on LG, static on mobile */}
        <div className="top-0 left-0 flex lg:absolute">
          <Skeleton className="h-8 w-24 bg-white/10" />
        </div>

        {/* Tags Skeleton */}
        <div className="flex gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-5 w-16 rounded-full bg-white/10" />
          ))}
        </div>

        {/* Title Skeleton */}
        <Skeleton className="h-16 w-3/4 max-w-[600px] bg-white/10 md:h-20 lg:h-24" />

        {/* Description Skeleton */}
        <div className="flex w-full max-w-140 flex-col items-center gap-2">
          <Skeleton className="h-4 w-full max-w-[400px] bg-white/10" />
          <Skeleton className="h-4 w-3/4 max-w-[300px] bg-white/10" />
        </div>

        {/* Button Skeleton */}
        <div className="mt-10">
          <Skeleton className="h-12 w-40 rounded bg-white/10" />
        </div>

        {/* Images Grid Skeleton */}
        <div className="mt-10 flex w-full flex-col items-center gap-8 lg:flex-row lg:items-start lg:justify-center">
          {Array.from({ length: DEFAULT_LIMIT }).map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              {/* Image placeholder */}
              <Skeleton className="aspect-square h-[250px] w-[300px] rounded bg-white/10 md:w-[300px] lg:w-[300px]" />
              {/* Counter text placeholder */}
              <Skeleton className="h-4 w-8 bg-white/10" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
