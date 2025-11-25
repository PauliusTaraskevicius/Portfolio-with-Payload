import { Homepage } from "@/components/Homepage";
import { PageLoader } from "@/components/PageLoader";
import { getQueryClient, trpc } from "@/trpc/server";

export default async function Home() {
  const queryClient = getQueryClient();
  const projects = await queryClient.fetchQuery(
    trpc.projects.getMany.queryOptions(),
  );

  return (
    <>
    
      <Homepage />
    </>
  );
}
