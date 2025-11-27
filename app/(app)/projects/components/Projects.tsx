"use client";

import Image from "next/image";
import { ProjectsGetManyOutput } from "./types";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

export const Projects = () => {
  const trpc = useTRPC();
  const data = useQuery(trpc.projects.getMany.queryOptions());

  return (
    <div className="mt-20 flex max-w-440 items-center justify-center">
      <h1 className="text-white">
        {data.data?.map((project) => (
          <div key={project.id}>
            {typeof project.image !== "string" && project.image?.url && (
              <Image
                src={project.image.url}
                height={100}
                width={100}
                alt={project.title || ""}
              />
            )}

            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <div className="flex space-x-6">
              {project.tags?.map((tag) => (
                <span key={typeof tag === "string" ? tag : tag.id}>
                  {typeof tag === "string" ? tag : tag.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </h1>
    </div>
  );
};
