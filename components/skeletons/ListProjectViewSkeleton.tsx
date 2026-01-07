import { Skeleton } from "@/components/ui/skeleton";
import { DEFAULT_LIMIT } from "@/lib/constants";

export const ListProjectViewSkeleton = () => {
  return (
    <div className="mx-auto mt-20 flex max-w-440 items-center justify-center md:mt-40">
      <div className="relative mt-1 -mb-4 w-full gap-4 p-2 md:-mb-28 lg:col-span-12">
        {/* Header Section */}
        <div className="relative flex w-full flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div className="flex w-full max-w-2xl flex-col gap-2">
            <Skeleton className="h-10 w-full max-w-[300px] bg-white/10 sm:h-12 md:h-16 lg:h-20" />
            <Skeleton className="h-10 w-3/4 max-w-[200px] bg-white/10 sm:h-12 md:h-16 lg:h-20" />
          </div>

          <Skeleton className="hidden h-8 w-64 bg-white/10 lg:flex" />
        </div>

        {/* List Section */}
        <div className="mx-auto mt-20 flex flex-col gap-6 md:mt-40 lg:w-1/2">
          {Array.from({ length: DEFAULT_LIMIT }).map((_, i) => (
            <div key={i} className="relative mb-4 pb-4">
              <Skeleton className="h-10 w-full max-w-[250px] bg-white/10 md:h-20 md:max-w-[400px]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
