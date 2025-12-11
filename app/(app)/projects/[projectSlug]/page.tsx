import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ProjectView } from "./components/ProjectView";

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
      <ProjectView projectSlug={projectSlug} />
    </HydrationBoundary>
  );
};

export default Page;
