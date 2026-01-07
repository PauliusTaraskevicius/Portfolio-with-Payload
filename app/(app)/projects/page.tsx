import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ProjectsHoverList } from "./components/ProjectsHoverList";
import { ProjectsHoverListSkeleton } from "@/components/skeletons/ProjectsHoverListSkeleton";

const Page = async () => {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc.projects.getMany.queryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<ProjectsHoverListSkeleton />}>
        <ErrorBoundary fallback={<div>Error loading projects.</div>} />
        <ProjectsHoverList />
      </Suspense>
    </HydrationBoundary>
  );
};

export default Page;
