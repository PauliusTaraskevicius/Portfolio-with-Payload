import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

const Page = async () => {
  const queryClient = getQueryClient();
  const projects = await queryClient.fetchQuery(
    trpc.projects.getMany.queryOptions(),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      Projects
    </HydrationBoundary>
  );
};

export default Page;
