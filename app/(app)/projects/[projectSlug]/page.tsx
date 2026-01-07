import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ProjectView } from "./components/ProjectView";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ProjectViewSkeleton } from "@/components/skeletons/ProjectViewSkeleton";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ projectSlug: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { projectSlug } = await params;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.projects.getOne.queryOptions({ slug: projectSlug }),
  );

  if (!projectSlug) {
    return notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<ProjectViewSkeleton />}>
        <ErrorBoundary fallback={<div>Failed to load project.</div>} />
        <ProjectView projectSlug={projectSlug} />
      </Suspense>
    </HydrationBoundary>
  );
};

export default Page;
