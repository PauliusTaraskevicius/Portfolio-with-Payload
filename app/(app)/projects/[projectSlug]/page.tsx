import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ProjectView } from "./components/ProjectView";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface PageProps {
  params: Promise<{ projectSlug: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { projectSlug } = await params;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.projects.getOne.queryOptions({ slug: projectSlug }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<div>Loading project...</div>}>
        <ErrorBoundary fallback={<div>Failed to load project.</div>} />
        <ProjectView projectSlug={projectSlug} />
      </Suspense>
    </HydrationBoundary>
  );
};

export default Page;
