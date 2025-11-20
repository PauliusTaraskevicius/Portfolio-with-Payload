import { getQueryClient, trpc } from "@/trpc/server";

export default async function Home() {
  const queryClient = getQueryClient();
  const projects = await queryClient.fetchQuery(
    trpc.projects.getMany.queryOptions(),
  );

  return <div>
    {/* {JSON.stringify(projects, null, 2)} */}
    </div>;
}
