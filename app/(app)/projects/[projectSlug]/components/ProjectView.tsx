"use client";

import { useTRPC } from "@/trpc/client";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";

interface ProjectViewViewProps {
  projectSlug: string;
}

export const ProjectView = ({ projectSlug }: ProjectViewViewProps) => {
  const queryClient = useQueryClient();
  const trpc = useTRPC();

  const { data } = useSuspenseQuery(
    trpc.projects.getOne.queryOptions({ slug: projectSlug }),
  );

  return <div className="text-white">{data?.title}</div>;
};
