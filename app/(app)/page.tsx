import { Homepage } from "@/components/Homepage";

import { getQueryClient, trpc } from "@/trpc/server";
import { Projects } from "./projects/components/Projects";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Introduction } from "@/components/Introduction";

export default async function Home() {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc.projects.getMany.queryOptions());

  return (
    <>
      <Homepage />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Projects />
      </HydrationBoundary>
      <Introduction />
    </>
  );
}
