import { Skeleton } from "@/components/ui/skeleton";

export const ProjectsHoverListSkeleton = () => {
  return (
    <div>
      {/* Mobile View */}
      <div className="mx-auto mt-20 flex max-w-440 flex-col items-center justify-between gap-5 space-y-20 overflow-hidden p-5 md:hidden">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center gap-3"
          >
            <div className="flex items-center justify-center gap-2">
              <Skeleton className="h-5 w-16 rounded-full bg-white/10" />
              <Skeleton className="h-5 w-16 rounded-full bg-white/10" />
            </div>
            <Skeleton className="h-8 w-48 bg-white/10" />
          </div>
        ))}
      </div>

      {/* Desktop View */}
      <div className="mx-auto hidden h-screen max-w-440 overflow-hidden md:block">
        <div className="flex h-screen items-center justify-center px-4">
          <div className="flex w-full items-center justify-center gap-6 lg:gap-10">
            {/* Left Images */}
            <div className="flex items-center gap-4">
              <Skeleton className="h-[180px] w-40 rounded-lg bg-white/10 lg:h-[220px] lg:w-[200px] xl:h-[260px] xl:w-60" />
              <Skeleton className="h-[180px] w-40 rounded-lg bg-white/10 lg:h-[220px] lg:w-[200px] xl:h-[260px] xl:w-60" />
            </div>

            {/* Center */}
            <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4 text-center">
              <div className="flex flex-wrap items-center justify-center gap-2">
                <Skeleton className="h-5 w-16 rounded-full bg-white/10" />
                <Skeleton className="h-5 w-16 rounded-full bg-white/10" />
              </div>

              <Skeleton className="h-[60px] w-[300px] bg-white/10 lg:h-[90px] lg:w-[450px] xl:h-[120px] xl:w-[600px]" />

              <div className="flex w-full max-w-md flex-col items-center gap-2">
                <Skeleton className="h-4 w-full bg-white/10" />
                <Skeleton className="h-4 w-3/4 bg-white/10" />
              </div>
            </div>

            {/* Right Images */}
            <div className="flex items-center gap-4">
              <Skeleton className="h-[180px] w-40 rounded-lg bg-white/10 lg:h-[220px] lg:w-[200px] xl:h-[260px] xl:w-60" />
              <Skeleton className="h-[180px] w-40 rounded-lg bg-white/10 lg:h-[220px] lg:w-[200px] xl:h-[260px] xl:w-60" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
