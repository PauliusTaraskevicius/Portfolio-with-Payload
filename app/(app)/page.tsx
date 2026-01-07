import { Homepage } from "@/components/Homepage";
import { getQueryClient, trpc } from "@/trpc/server";
import { Projects } from "./projects/components/Projects";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Introduction } from "@/components/Introduction";
import { About } from "@/components/About";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ListProjectsViewWrapper } from "./projects/components/ListProjectsViewWrapper";
import { HomePageSkeleton } from "@/components/skeletons/HomePageSkeleton";
import { ListProjectViewSkeleton } from "@/components/skeletons/ListProjectViewSkeleton";

export default async function Home() {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc.projects.getMany.queryOptions());

  return (
    <>
      <Homepage />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<HomePageSkeleton />}>
          <ErrorBoundary fallback={<p>Error loading projects.</p>} />
          <Projects />
        </Suspense>
      </HydrationBoundary>
      <Introduction />
      <About />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<ListProjectViewSkeleton />}>
          <ErrorBoundary fallback={<p>Error loading projects.</p>} />
          <ListProjectsViewWrapper />
        </Suspense>
      </HydrationBoundary>
    </>
  );
}
