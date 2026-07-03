import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { z } from "zod";
import { Project } from "@/payload-types";
import { getProjectsCached, getProjectBySlugCached } from "./queries";

export const projectsRouter = createTRPCRouter({
  getMany: baseProcedure.query(async () => {
    const data = await getProjectsCached();
    return data.docs as Project[];
  }),
  getOne: baseProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const data = await getProjectBySlugCached(input.slug);
      if (!data.docs.length) {
        throw new Error("Not Found");
      }
      return data.docs[0] as Project;
    }),
});
