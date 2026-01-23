"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import Link from "next/link";
import { DialogTitle } from "@radix-ui/react-dialog";

export const ProjectsDialog = () => {
  const trpc = useTRPC();

  const { data: projects } = useQuery(trpc.projects.getMany.queryOptions());

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex cursor-pointer items-center gap-2 transition-opacity hover:opacity-70">
          <div className="h-2 w-2 rounded-full bg-white" />
          <span className="font-bebas tracking-wide text-white">
            WORKS INDEX
          </span>
        </button>
      </DialogTrigger>
      <DialogContent
        className="border-0 bg-transparent p-0"
        showCloseButton={true}
      >
        <div className="flex h-full w-full flex-col items-start justify-center gap-4 px-4 py-20 md:gap-6 md:px-12 lg:gap-8 lg:px-20">
          {projects?.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="group"
            >
              <DialogTitle className="font-bebas text-4xl font-bold tracking-tight text-white uppercase transition-opacity hover:opacity-60 md:text-5xl lg:text-6xl xl:text-7xl">
                {project.title}
              </DialogTitle>
            </Link>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
