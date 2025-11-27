import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { z } from "zod";
import { Project } from "@/payload-types";

export const projectsRouter = createTRPCRouter({
  getMany: baseProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.find({
      collection: "projects",
      where: {},
      sort: "-createdAt",
    });

    const formattedData = data.docs.map((doc) => ({
      ...doc,
    }));
    return formattedData as Project[];
  }),
  getOne: baseProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const data = await ctx.db.findByID({
        collection: "projects",
        id: input.id,
      });

      return data as Project;
    }),
});
