import { Homepage } from "@/components/Homepage";

import { getQueryClient, trpc } from "@/trpc/server";
import { Projects } from "./projects/components/Projects";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Introduction } from "@/components/Introduction";
import { About } from "@/components/About";
import { ListProjectsView } from "./projects/components/ListProjectsView";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ListProjectsViewWrapper } from "./projects/components/ListProjectsViewWrapper";



export default async function Home() {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc.projects.getMany.queryOptions());

  return (
    <>
      <Homepage />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<p>Loading projects...</p>}>
          <ErrorBoundary fallback={<p>Error loading projects.</p>} />
          <Projects />
        </Suspense>
      </HydrationBoundary>
      <Introduction />
      <About />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ErrorBoundary fallback={<p>Error loading projects.</p>} />
        <Suspense fallback={<p>Loading projects...</p>}>
          <ListProjectsViewWrapper />
        </Suspense>
      </HydrationBoundary>
    </>
  );
}
