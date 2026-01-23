import { Skeleton } from "@/components/ui/skeleton";
import { DEFAULT_LIMIT } from "@/lib/constants";

export const HomePageSkeleton = () => {
  return (
    <>
      {/* Mobile Skeleton */}
      <div className="mt-20 flex flex-col items-center justify-center gap-8 md:hidden">
        <div className="flex w-full justify-center">
          <Skeleton className="h-4 w-32 bg-white/20" />
        </div>
        <div className="flex w-full items-center justify-center px-8">
          <Skeleton className="aspect-[3/4] w-full max-w-[300px] rounded-xl bg-white/10" />
        </div>
      </div>

      {/* Desktop Skeleton */}
      <div className="hidden md:flex">
        <div className="mx-auto mt-20 flex w-full max-w-440 p-5">
          <div className="flex w-full flex-col items-center justify-center gap-8">
            <h1 className="text-xs leading-4 font-semibold tracking-wider text-white/70 uppercase">
              Featured Projects
            </h1>

            <div className="flex w-full items-center justify-center gap-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-2"
                  style={{
                    opacity: Math.max(0.3, 1 - Math.abs(index - 2) * 0.2),
                    marginTop: index === 2 ? -20 : 0, // Simulate the active lift
                  }}
                >
                  <Skeleton
                    className="rounded bg-white/10"
                    style={{
                      height: index === 2 ? 350 : 300, // Middle one slightly larger
                      width: index === 2 ? 340 : 300,
                    }}
                  />
                  <Skeleton
                    className="h-3 w-24 bg-white/10"
                    style={{
                      marginLeft: index === 2 ? 8 : 0,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
